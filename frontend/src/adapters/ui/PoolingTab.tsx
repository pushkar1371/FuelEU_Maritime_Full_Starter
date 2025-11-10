import React, { useState } from 'react';
import { apiClient } from '../infrastructure/apiClient';

export default function PoolingTab() {
  const [year, setYear] = useState(2025);
  const [members, setMembers] = useState<{ shipId: string; cb_before: number }[]>([
    { shipId: 'A', cb_before: 5000 },
    { shipId: 'B', cb_before: -1200 },
    { shipId: 'C', cb_before: -800 }
  ]);
  const [result, setResult] = useState<any>(null);

  const sum = members.reduce((a, m) => a + m.cb_before, 0);
  const valid = sum >= 0;

  const update = (i: number, field: keyof (typeof members)[number], value: string) => {
    const next = [...members];
    (next[i] as any)[field] = field === 'cb_before' ? Number(value) : value;
    setMembers(next);
  };

  const addMember = () => setMembers((m) => [...m, { shipId: `S${m.length + 1}`, cb_before: 0 }]);

  const create = async () => {
    if (!valid) return alert('Pool sum must be ≥ 0');
    const r = await apiClient.createPool(year, members);
    setResult(r);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-center">
        <input className="border p-2 rounded w-28" type="number" value={year} onChange={e=>setYear(Number(e.target.value))} />
        <span className={`px-2 py-1 rounded text-sm ${valid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>Pool Sum: {sum.toFixed(2)}</span>
        <button className="px-3 py-2 border rounded" onClick={addMember}>Add Member</button>
        <button className="px-3 py-2 border rounded disabled:opacity-50" disabled={!valid} onClick={create}>Create Pool</button>
      </div>

      <table className="min-w-full bg-white rounded shadow overflow-hidden">
        <thead>
          <tr className="bg-slate-100 text-left">
            {['Ship','CB Before'].map(h=> (<th key={h} className="px-3 py-2 text-sm font-semibold">{h}</th>))}
          </tr>
        </thead>
        <tbody>
          {members.map((m, i) => (
            <tr key={i} className="border-t">
              <td className="px-3 py-2">
                <input className="border p-1 rounded" value={m.shipId} onChange={e=>update(i,'shipId',e.target.value)} />
              </td>
              <td className="px-3 py-2">
                <input className="border p-1 rounded w-36" type="number" value={m.cb_before} onChange={e=>update(i,'cb_before',e.target.value)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {result && (
        <div className="bg-white rounded shadow p-3">
          <div className="font-semibold mb-2">Result Pool #{result.poolId.slice(0,8)}</div>
          <ul className="list-disc ml-5">
            {result.members.map((m: any) => (
              <li key={m.shipId}>{m.shipId}: {m.cb_after?.toFixed?.(2)}</li>
            ))}
          </ul>
          <div className="mt-2 text-sm text-slate-600">Pool Sum After: {result.poolSum?.toFixed?.(2)}</div>
        </div>
      )}
    </div>
  );
}
