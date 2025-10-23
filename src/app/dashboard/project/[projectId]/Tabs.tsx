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
                ? "bg-white/15 backdrop-blur-xl text-white border-white/50 shadow-lg scale-[1.02] z-10"
                : "bg-white/5 backdrop-blur-sm text-white/60 border-transparent hover:bg-white/10 hover:text-white"
            }`}
            aria-label={`Cambiar a ${t.label}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white/10 backdrop-blur-2xl rounded-2xl rounded-tl-xl border border-white/30 shadow-xl p-6 -mt-px text-white">
        {tabs.map((t) => (
          <div key={t.id} className={active === t.id ? "block" : "hidden"}>
            {t.content}
          </div>
        ))}
      </div>
    </div>
  );
}
