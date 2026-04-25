"use client";

import { useEffect, useState } from "react";
import { FileText, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

interface Document {
  _id: string;
  fileName: string;
  pineconeNamespace: string;
}

interface SidebarProps {
  onSelectDocument: (doc: Document) => void;
  activeDocId?: string;
  onNewUpload: () => void;
}

export function Sidebar({ onSelectDocument, activeDocId, onNewUpload }: SidebarProps) {
  const { data: session } = useSession();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDocuments = async () => {
    try {
      const res = await fetch("/api/documents");
      const data = await res.json();
      if (Array.isArray(data)) {
        setDocuments(data);
      }
    } catch (error) {
      console.error("Failed to fetch documents", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchDocuments();
    }
  }, [session]);

  if (!session) return null;

  return (
    <div className="w-64 border-r bg-muted/20 flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b space-y-4">
        <Button 
          onClick={onNewUpload} 
          className="w-full justify-start gap-2 shadow-sm"
          variant="outline"
        >
          <Plus size={16} />
          New Chat
        </Button>
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Your Documents
        </h2>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {isLoading ? (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            </div>
          ) : documents.length === 0 ? (
            <p className="text-xs text-center text-muted-foreground p-4 italic">
              No documents yet
            </p>
          ) : (
            documents.map((doc) => (
              <button
                key={doc._id}
                onClick={() => onSelectDocument(doc)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors text-left",
                  activeDocId === doc._id
                    ? "bg-primary text-primary-foreground font-medium"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                <FileText size={16} className={cn("shrink-0", activeDocId === doc._id ? "text-primary-foreground" : "text-primary")} />
                <span className="truncate">{doc.fileName}</span>
              </button>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
