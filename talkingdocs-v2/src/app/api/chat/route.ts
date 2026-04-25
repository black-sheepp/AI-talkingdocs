import { NextRequest } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { PineconeStore } from "@langchain/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Pinecone } from "@pinecone-database/pinecone";
// @ts-expect-error - types resolution issue in bundler mode
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
// @ts-expect-error - types resolution issue in bundler mode
import { createRetrievalChain } from "langchain/chains/retrieval";
import Message from "@/models/Message";
import connectToDatabase from "@/lib/mongoose";

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { messages, namespace, documentId } = await req.json();

    if (!namespace || !documentId) {
      return new Response(JSON.stringify({ error: "Missing document information" }), { status: 400 });
    }

    const currentMessageContent = messages[messages.length - 1].content;

    // Save user message to DB
    await connectToDatabase();
    await Message.create({
      documentId,
      role: "user",
      content: currentMessageContent,
    });

    // Initialize Vector Store for Retrieval
    const pineconeIndex = pc.Index(process.env.PINECONE_INDEX!);
    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings(),
      { pineconeIndex, namespace }
    );

    const retriever = vectorStore.asRetriever({ k: 4 });

    // Initialize the LLM
    const llm = new ChatOpenAI({
      modelName: "gpt-3.5-turbo",
      streaming: true,
      temperature: 0,
    });

    // Create the Prompt
    const prompt = PromptTemplate.fromTemplate(`
      You are TalkingDocs, a helpful AI assistant that answers questions based strictly on the provided context from a document.
      If you don't know the answer or the context doesn't contain the information, say "I don't have enough information in the document to answer that." Do not hallucinate.

      Context:
      {context}

      Question:
      {input}

      Answer:
    `);

    // Create Chains
    const combineDocsChain = await createStuffDocumentsChain({
      llm,
      prompt,
    });

    const retrievalChain = await createRetrievalChain({
      retriever,
      combineDocsChain,
    });

    // We can't directly use LangChainAdapter with the full RetrievalChain out-of-the-box easily without manual streaming iteration, 
    // but we can stream the event chunks directly using the standard Web API Response stream.
    
    const stream = await retrievalChain.stream({
      input: currentMessageContent,
    });

    // Create a readable stream that the Vercel AI SDK frontend can consume
    const readableStream = new ReadableStream({
      async start(controller) {
        let fullResponse = "";
        for await (const chunk of stream) {
          if (chunk.answer) {
            const text = chunk.answer;
            fullResponse += text;
            controller.enqueue(new TextEncoder().encode(text));
          }
        }
        
        // Save assistant response to DB
        if (fullResponse) {
          await Message.create({
            documentId,
            role: "assistant",
            content: fullResponse,
          });
        }

        controller.close();
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (e: any) {
    console.error("Chat Error:", e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
