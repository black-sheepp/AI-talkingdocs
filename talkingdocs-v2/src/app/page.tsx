"use client";

import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { ChatInterface } from "@/components/ChatInterface";

export default function Home() {
  const [activeDoc, setActiveDoc] = useState<{ namespace: string; fileName: string } | null>(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] px-4 py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
      {!activeDoc ? (
        <>
          <div className="text-center space-y-6 max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
              Step into the future of <br className="hidden sm:block" />
              <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
                document interaction
              </span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-muted-foreground">
              Experience the thrill as your documents come alive, engaging in a dynamic conversation. Upload a PDF below to start chatting instantly.
            </p>
          </div>
          
          <div className="w-full max-w-4xl mx-auto">
            <FileUpload onUploadSuccess={(doc) => setActiveDoc({ namespace: doc.pineconeNamespace, fileName: doc.fileName })} />
          </div>
        </>
      ) : (
        <div className="w-full max-w-6xl mx-auto animate-in fade-in zoom-in-95 duration-500">
          <ChatInterface namespace={activeDoc.namespace} fileName={activeDoc.fileName} />
          
          <div className="mt-8 text-center">
            <button 
              onClick={() => setActiveDoc(null)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
            >
              Upload a different document
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
