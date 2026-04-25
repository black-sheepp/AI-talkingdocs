"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { setTheme, theme } = useTheme();

  return (
    <nav className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="container flex h-14 items-center justify-between mx-auto px-4">
        <Link href="/" className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg hidden sm:inline-block">
            TalkingDocs
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button variant="outline" className="hidden sm:flex">
            Sign In
          </Button>
        </div>
      </div>
    </nav>
  );
}
