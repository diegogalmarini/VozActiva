"use client";

import { useState, ReactNode } from "react";

interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  initialId?: string;
}

export default function Tabs({ tabs, initialId }: TabsProps) {
  const [active, setActive] = useState(initialId ?? tabs[0]?.id);

  return (
    <div className="w-full">
      <div className="flex gap-1 mb-0">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`px-5 py-3 font-medium text-sm transition-all duration-300 rounded-t-xl border-t-2 ${
              active === t.id
                ? "bg-white/80 backdrop-blur-xl text-blue-600 border-blue-600 shadow-lg scale-[1.02] z-10"
                : "bg-white/30 backdrop-blur-sm text-gray-500 border-transparent hover:bg-white/50 hover:text-gray-700"
            }`}
            aria-label={`Cambiar a ${t.label}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white/80 backdrop-blur-xl rounded-2xl rounded-tl-xl border border-white/50 shadow-xl p-6 -mt-px">
        {tabs.map((t) => (
          <div key={t.id} className={active === t.id ? "block" : "hidden"}>
            {t.content}
          </div>
        ))}
      </div>
    </div>
  );
}
