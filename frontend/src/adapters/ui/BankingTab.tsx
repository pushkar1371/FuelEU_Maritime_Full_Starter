import React, { useState } from 'react';
import { apiClient } from '../infrastructure/apiClient';

export default function BankingTab() {
  const [shipId, setShipId] = useState('SHIP-1');
  const [year, setYear] = useState(2025);
  const [kpi, setKpi] = useState<{ cb_before?: number; applied?: number; cb_after?: number; error?: string }>({});

  const fetchCB = async () => {
    const r = await apiClient.getCB(year, shipId);
    setKpi({ cb_before: r.cb_before });
  };

  const doBank = async () => {
    const r = await apiClient.bank(shipId, year);
    if ((r as any).error) setKpi({ error: (r as any).error }); else setKpi(r);
  };

  const doApply = async () => {
    const amt = Number(prompt('Amount to apply?'));
    if (!amt) return;
    const r = await apiClient.applyBank(shipId, year, amt);
    if ((r as any).error) setKpi({ error: (r as any).error }); else setKpi(r);
  };

  const disableBank = !kpi.cb_before || (kpi.cb_before ?? 0) <= 0;

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-center">
        <input className="border p-2 rounded" value={shipId} onChange={e=>setShipId(e.target.value)} />
        <input className="border p-2 rounded w-28" type="number" value={year} onChange={e=>setYear(Number(e.target.value))} />
        <button className="px-3 py-2 border rounded" onClick={fetchCB}>Get CB</button>
        <button className="px-3 py-2 border rounded disabled:opacity-50" onClick={doBank} disabled={disableBank}>Bank Surplus</button>
        <button className="px-3 py-2 border rounded" onClick={doApply}>Apply Banked</button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded shadow p-3"><div className="text-xs text-slate-500">cb_before</div><div className="text-lg">{kpi.cb_before?.toFixed?.(2) ?? '-'}</div></div>
        <div className="bg-white rounded shadow p-3"><div className="text-xs text-slate-500">applied</div><div className="text-lg">{kpi.applied?.toFixed?.(2) ?? '-'}</div></div>
        <div className="bg-white rounded shadow p-3"><div className="text-xs text-slate-500">cb_after</div><div className="text-lg">{kpi.cb_after?.toFixed?.(2) ?? '-'}</div></div>
      </div>

      {kpi.error && <div className="text-red-600">{kpi.error}</div>}
    </div>
  );
}
