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
      <div className="va-tabs">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`px-4 py-2 font-medium text-sm transition-colors rounded-t-md ${
              active === t.id
                ? "bg-white text-blue-600 border-t-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            aria-label={`Cambiar a ${t.label}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-b-md border border-gray-200 shadow-sm p-6">
        {tabs.map((t) => (
          <div key={t.id} className={active === t.id ? "block" : "hidden"}>
            {t.content}
          </div>
        ))}
      </div>
    </div>
  );
}
