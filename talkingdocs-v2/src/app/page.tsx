"use client";

import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { ChatInterface } from "@/components/ChatInterface";
import { Sidebar } from "@/components/Sidebar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Home() {
  const [activeDoc, setActiveDoc] = useState<{ _id: string; namespace: string; fileName: string } | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSelectDocument = (doc: any) => {
    setActiveDoc({
      _id: doc._id,
      namespace: doc.pineconeNamespace,
      fileName: doc.fileName
    });
    setIsSidebarOpen(false); // Close mobile sidebar on selection
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden relative">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar 
          onSelectDocument={handleSelectDocument} 
          activeDocId={activeDoc?._id}
          onNewUpload={() => {
            setActiveDoc(null);
            setIsSidebarOpen(false);
          }}
        />
      </div>

      {/* Mobile Sidebar Trigger */}
      <div className="md:hidden absolute top-4 left-4 z-40">
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger className="flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background/80 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground">
            <Menu size={20} />
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar 
              onSelectDocument={handleSelectDocument} 
              activeDocId={activeDoc?._id}
              onNewUpload={() => {
                setActiveDoc(null);
                setIsSidebarOpen(false);
              }}
            />
          </SheetContent>
        </Sheet>
      </div>
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted/20 overflow-hidden">
        {!activeDoc ? (
          <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500 pt-12 md:pt-0">
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
            
            <div className="bg-card/50 backdrop-blur-md border rounded-2xl p-2 shadow-xl ring-1 ring-foreground/5">
              <FileUpload onUploadSuccess={(doc) => handleSelectDocument(doc)} />
            </div>
          </div>
        ) : (
          <div className="w-full max-w-6xl h-full flex items-center justify-center animate-in fade-in zoom-in-95 duration-500 py-4 pt-16 md:pt-4">
            <ChatInterface 
              key={activeDoc._id}
              documentId={activeDoc._id}
              namespace={activeDoc.namespace} 
              fileName={activeDoc.fileName} 
            />
          </div>
        )}
      </main>
    </div>
  );
}
