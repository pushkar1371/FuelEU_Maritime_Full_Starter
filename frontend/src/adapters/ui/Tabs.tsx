import React from 'react';

type Tab = { id: string; label: string };

export const Tabs = ({ tabs, active, onChange }: { tabs: Tab[]; active: string; onChange: (id: string) => void }) => (
  <div className="flex gap-2 border-b border-slate-200 mb-4">
    {tabs.map((t) => (
      <button
        key={t.id}
        onClick={() => onChange(t.id)}
        className={`px-4 py-2 rounded-t-2xl ${active === t.id ? 'bg-white border border-b-0' : 'bg-slate-100 border-transparent'} border-slate-200`}
      >
        {t.label}
      </button>
    ))}
  </div>
);
