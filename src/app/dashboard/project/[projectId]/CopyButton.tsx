"use client";

import { useState } from "react";

interface CopyButtonProps {
  text: string;
  label: string;
  className?: string;
}

export function CopyButton({ text, label, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error al copiar:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`px-4 py-2 text-white text-sm rounded transition-all duration-300 ${
        copied 
          ? 'bg-green-600 hover:bg-green-700' 
          : className || 'bg-blue-600 hover:bg-blue-700'
      }`}
    >
      {copied ? (
        <span className="flex items-center gap-2">
          ✓ Copiado
        </span>
      ) : (
        label
      )}
    </button>
  );
}