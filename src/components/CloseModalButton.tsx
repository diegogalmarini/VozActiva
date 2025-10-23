"use client";

import { useRouter } from "next/navigation";

export default function CloseModalButton({ href = "/" }: { href?: string }) {
  const router = useRouter();

  const onClose = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(href);
    }
  };

  return (
    <button
      type="button"
      onClick={onClose}
      aria-label="Cerrar"
      className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/80 border border-white/40 backdrop-blur-md shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 text-gray-700 hover:text-gray-900"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M6.225 4.811a1 1 0 011.414 0L12 9.172l4.361-4.361a1 1 0 011.414 1.414L13.414 10.586l4.361 4.361a1 1 0 01-1.414 1.414L12 12l-4.361 4.361a1 1 0 01-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 010-1.414z" />
      </svg>
    </button>
  );
}
