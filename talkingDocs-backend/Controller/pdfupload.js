const PDFLoader = require("langchain/document_loaders/fs/pdf").PDFLoader; // Import PDFLoader for loading PDF documents
const RecursiveCharacterTextSplitter = require("langchain/text_splitter").RecursiveCharacterTextSplitter; // Import a text splitter module
const OpenAIEmbeddings = require("langchain/embeddings/openai").OpenAIEmbeddings; // Import OpenAI embeddings for text
const HNSWLib = require("langchain/vectorstores/hnswlib").HNSWLib; // Import HNSWLib for vector storage
const RetrievalQAChain = require("langchain/chains").RetrievalQAChain; // Import a retrieval question-answering chain
const OpenAI = require("langchain/llms/openai").OpenAI; // Import OpenAI's language model

const User = require("../Model/user"); 
const fs = require("fs"); 
const path = require("path"); 

// Load environment variables from a .env file
require("dotenv").config();

// Create a new OpenAI instance with a specific model
const model = new OpenAI({
	modelName: "gpt-3.5-turbo",
});

let vectorStoreRetriever;

// function to handle PDF file uploads
module.exports.pdfUpload = async function (req, res) {
	console.log(req.params.id);
	// Find a user by their ID
	const user = await User.findById(req.params.id);

	// Handle file uploads using Multer middleware
	User.uploadedPDF(req, res, async function (err) {
		if (err) {
			console.log("Multer error", err);
			return res.status(500).json({ error: "File upload failed" });
		}

		if (req.file) {
			// if (user.pdf_location) {
			// 	fs.unlinkSync(path.join(__dirname, "..", "/Public/Upload", user.pdf_location));
			// }

			// Update the user's PDF location
			user.pdf_location = "/" + req.file.filename;
		}
		user.save();
		console.log(req.file);

		// Get the full path to the uploaded PDF file
		const docPath = path.join(__dirname, "..", "/Public/Upload", user.pdf_location);

		// Load the PDF document from the specified path
		const loader = new PDFLoader(docPath);

		// Initialize a splitter function to split the PDF text into chunks
		const PDF = await loader.load();
		const splitter = new RecursiveCharacterTextSplitter({
			chunkSize: 1000,
			chunkOverlap: 20,
		});

		// Create chunks from the PDF document
		const slittedPDF = await splitter.splitDocuments(PDF);

		// Initialize OpenAI embeddings
		const embeddings = new OpenAIEmbeddings({
			openAIApiKey: process.env.OPENAI_API_KEY, // Use the OpenAI API key from environment variables
		});

		// Create a vector store from the split PDF chunks using HNSWLib
		const vectorStore = await HNSWLib.fromDocuments(slittedPDF, embeddings);

		// Store the vector store retriever for later use
		vectorStoreRetriever = vectorStore.asRetriever();

		console.log(slittedPDF);

		// Return a success response
		return res.status(200).json({ message: "File uploaded successfully", fileUploaded: true });
	});
};

// function to handle questions and answers for talking documents
module.exports.QnA_TalkingDocs = async function (req, res) {
	const queryQue = req.body.query; // Get the user's query from the request
	console.log("Received query:", queryQue);

	// Check if the vector store retriever is initialized
	if (!vectorStoreRetriever) {
		console.log("Vector store retriever not initialized");
		return res.status(500).json({ error: "Vector store retriever not initialized" });
	}

	// Create a retrieval question-answering chain using the specified model and vector store retriever
	const chain = RetrievalQAChain.fromLLM(model, vectorStoreRetriever);

	// Call the chain with the user's query
	const acknowledgement = await chain.call({
		query: queryQue,
	});

	console.log(acknowledgement);
	// Return the acknowledgement as a response
	return res.status(200).json({ message: "Question acknowledged", acknowledgement });
};
