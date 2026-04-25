# TalkingDocs v2 - Implementation Plan

## Overview
**TalkingDocs v2** is a modernization and feature expansion of the AI PDFChat application. The overarching goal is to transition from a split Vite/Express architecture to a full-stack **Next.js** application, improving SEO, performance, and developer experience. The UI/UX will be completely overhauled for a premium, responsive, and dynamic feel.

## 1. Architectural Changes

### Next.js Full-Stack App
- **Framework:** Next.js (App Router) to handle both the React frontend and the backend API routes natively within the same repository.
- **Styling & UI:** Tailwind CSS, Shadcn UI, and Framer Motion for premium aesthetics (glassmorphism, dark/light mode, micro-interactions).
- **State Management:** Zustand or React Context for robust client-side state handling (e.g., managing the current selected document, chat history).

### Authentication Strategy
- **Google Auth & JWT:** Implement authentication using **NextAuth.js (Auth.js)**.
  - Users can sign up and log in securely via Google OAuth.
  - NextAuth will be configured to use **JWT (JSON Web Tokens)** for maintaining robust session states across the Next.js frontend and API routes.
  - User profiles and metadata will be persisted in **MongoDB**.

### Database & Vector Storage
- **Primary Database:** MongoDB (via Mongoose) to store user data, chat history, and document metadata.
- **Vector Database:** Migrate from the local `hnswlib-node` to a cloud-native vector database (e.g., **Pinecone** or **MongoDB Atlas Vector Search**). This ensures that vector embeddings persist across deployments and are highly scalable in a serverless environment.

## 2. Suggested Features for v2

1. **Multi-Document Workspaces:**
   - Allow users to upload and chat with multiple PDFs simultaneously within a single "Workspace" or "Project".

2. **Persistent Conversation History:**
   - Save chat histories linked to specific documents or workspaces in MongoDB, allowing users to return to past sessions at any time.

3. **Source Citations & Page References:**
   - When the AI generates an answer, it should provide a citation (e.g., "Page 4") referencing where the information was extracted from the document.

4. **1-Click Document Summarization:**
   - Automatically generate a brief summary and "Key Takeaways" as soon as the PDF is processed, giving the user instant value before they even ask a question.

5. **Export Functionality:**
   - Allow users to export their chat logs or summaries to Markdown or PDF.

6. **Premium UI/UX (Aesthetic Overhaul):**
   - Implement a sleek, dynamic interface with deep dark mode, gradient highlights, and smooth Framer Motion transitions for chat bubbles and document uploads.

7. **OCR Integration (Optional/Future):**
   - Integrate OCR capabilities (e.g., Tesseract.js or Google Cloud Vision) to parse text from scanned PDFs or images.

## 3. AI Model Flexibility for RAG
Since we will be using the **Langchain** ecosystem, we are not locked into OpenAI. Langchain is model-agnostic, meaning we can easily swap the underlying Large Language Model (LLM) and Embedding model. For TalkingDocs v2, we can support or utilize:
- **Google Gemini (e.g., Gemini 1.5 Pro/Flash)** for large context windows.
- **Anthropic Claude 3 (Haiku/Sonnet/Opus)** for highly accurate document analysis.
- **Groq or TogetherAI** for blazing-fast, open-source models like LLaMA 3 or Mixtral.
- **Cohere** for specialized RAG and document retrieval.

We will architect the backend to easily allow swapping the model provider via environment variables.

## 4. Step-by-Step Implementation Strategy

### Phase 1: Foundation & Setup
- Initialize the Next.js project with App Router, Tailwind CSS, and TypeScript.
- Set up Shadcn UI and generic layout components (Navbar, Sidebar, Footer).
- Configure environment variables securely.

### Phase 2: Authentication & Database
- Integrate NextAuth.js for Google OAuth and JWT-based session handling.
- Connect to MongoDB to store user profiles upon successful Google Sign-in.
- Create protected routes and middleware to ensure only authenticated users can access the dashboard.

### Phase 3: Document Processing Core
- Implement file upload API route (using `next/server` and temporary local storage or cloud storage like AWS S3/Uploadthing).
- Set up Langchain with OpenAI and the chosen Cloud Vector Database (e.g., Pinecone).
- Create the embedding pipeline: PDF Parsing -> Chunking -> Embedding generation -> Vector DB storage.

### Phase 4: Chat Interface & RAG Implementation
- Build the conversational UI (Chat interface with loading states, typing animations).
- Create the `/api/chat` route to handle incoming user queries.
- Implement the Retrieval-Augmented Generation (RAG) logic: query vector DB -> retrieve context -> send to LLM -> return response to frontend.
- Implement streaming responses for a real-time ChatGPT-like experience.

### Phase 5: Polish & Deployment
- Integrate suggested features like persistent chat history and citations.
- Perform rigorous UI/UX polishing (animations, responsive testing).
- Deploy the application to Vercel.
