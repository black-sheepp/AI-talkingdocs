import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from "@/lib/mongoose";
import Document from "@/models/Document";
import User from "@/models/User";
import { v4 as uuidv4 } from "uuid";

// Langchain & Pinecone imports
import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import pdfParse from "pdf-parse";

// Initialize Pinecone
const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});
const pineconeIndex = pc.Index(process.env.PINECONE_INDEX!);

export async function POST(req: Request) {
  try {
    // 1. Authenticate User
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse FormData
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // 3. Extract text from PDF
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const pdfData = await pdfParse(buffer);
    const textContent = pdfData.text;

    // 4. Split Text into Chunks
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const docs = await textSplitter.createDocuments([textContent]);

    // 5. Generate Embeddings & Store in Pinecone
    // We create a unique namespace for this specific document
    const namespace = uuidv4();
    
    await PineconeStore.fromDocuments(docs, new OpenAIEmbeddings(), {
      pineconeIndex,
      namespace,
    });

    // 6. Save Document Metadata to MongoDB
    await connectToDatabase();
    const dbUser = await User.findOne({ email: session.user.email });
    
    const newDoc = await Document.create({
      userId: dbUser._id,
      fileName: file.name,
      pineconeNamespace: namespace,
    });

    return NextResponse.json({ 
      message: "Document uploaded and processed successfully",
      document: newDoc 
    }, { status: 200 });

  } catch (error: any) {
    console.error("Error processing document:", error);
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}
