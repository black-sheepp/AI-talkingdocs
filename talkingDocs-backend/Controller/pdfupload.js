const PDFLoader = require("langchain/document_loaders/fs/pdf").PDFLoader;
const RecursiveCharacterTextSplitter = require("langchain/text_splitter").RecursiveCharacterTextSplitter;
const OpenAIEmbeddings = require("langchain/embeddings/openai").OpenAIEmbeddings;
const HNSWLib = require("langchain/vectorstores/hnswlib").HNSWLib;
const RetrievalQAChain = require("langchain/chains").RetrievalQAChain;
const OpenAI = require("langchain/llms/openai").OpenAI;

const User = require("../Model/user");
const fs = require("fs");
const path = require("path");
// dotenv configuration
require("dotenv").config();

const model = new OpenAI({
	modelName: "gpt-3.5-turbo",
});

let vectorStoreRetriever;

module.exports.pdfUpload = async function (req, res) {
	console.log(req.params.id);
	const user = await User.findById(req.params.id);

	User.uploadedPDF(req, res, async function (err) {
		if (err) {
			console.log("Multer error", err);
			return res.status(500).json({ error: "File upload failed" });
		}

		if (req.file) {
			if (user.pdf_location) {
				fs.unlinkSync(path.join(__dirname, "..", "/Public/Upload", user.pdf_location));
			}
			user.pdf_location = "/" + req.file.filename;
		}
		user.save();
		console.log(req.file);
		const docPath = path.join(__dirname, "..", "/Public/Upload", user.pdf_location);

		// load PDF from Document folder
		const loader = new PDFLoader(docPath);

		// splitter function
		const PDF = await loader.load();
		const splitter = new RecursiveCharacterTextSplitter({
			chunkSize: 1000,
			chunkOverlap: 20,
		});

		// created chunks from PDF
		const slittedPDF = await splitter.splitDocuments(PDF);

		const embeddings = new OpenAIEmbeddings({
			openAIApiKey: process.env.OPENAI_API_KEY, // In Node.js defaults to process.env.OPENAI_API_KEY
		});

		const vectorStore = await HNSWLib.fromDocuments(slittedPDF, embeddings);

		vectorStoreRetriever = vectorStore.asRetriever();

		console.log(slittedPDF);

		return res.status(200).json({ message: "File uploaded successfully", fileUploaded: true });
	});
};

module.exports.QnA_TalkingDocs = async function (req, res) {
	const queryQue = req.body.query;
	console.log("Received query:", queryQue);

	if (!vectorStoreRetriever) {
		console.log("Vector store retriever not initialized");
		return res.status(500).json({ error: "Vector store retriever not initialized" });
	}

	const chain = RetrievalQAChain.fromLLM(model, vectorStoreRetriever); 

	const acknowledgement = await chain.call({
		query: queryQue,
	});

	console.log(acknowledgement);
	return res.status(200).json({ message: "Question acknowledged", acknowledgement });
};

