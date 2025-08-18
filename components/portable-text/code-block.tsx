"use client";

import { useEffect, useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Prism from "prismjs";

import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-markdown";

import "prismjs/themes/prism-tomorrow.css";

interface CodeBlockProps {
  value: {
    language?: string;
    code: string;
    filename?: string;
  };
}

export function CodeBlock({ value }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { language = "javascript", code, filename } = value;

  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="my-8 group">
      <div className="flex items-center justify-between bg-neutral-800 text-white px-4 py-2 rounded-t-lg">
        <div className="flex items-center space-x-3">
          {filename && (
            <span className="text-sm text-neutral-300">{filename}</span>
          )}
          <span className="text-xs uppercase tracking-wide text-neutral-400">
            {language}
          </span>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-neutral-300 hover:text-white"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="relative overflow-x-auto">
        <pre className={`language-${language} !mt-0 !rounded-t-none`}>
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </div>
    </div>
  );
}
