import React, { useEffect, useState } from 'react';
import { apiClient } from '../infrastructure/apiClient';
import type { ComparisonRow } from '../../core/domain/types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function CompareTab() {
  const [baseline, setBaseline] = useState<{ id: string; ghgIntensity: number } | null>(null);
  const [rows, setRows] = useState<ComparisonRow[]>([]);

  useEffect(() => {
    apiClient.getComparison().then((data) => {
      setBaseline(data.baseline);
      setRows(data.comparisons);
    });
  }, []);

  return (
    <div className="space-y-4">
      <div className="text-sm text-slate-600">Target (2025): <b>89.3368 gCO₂e/MJ</b></div>
      <table className="min-w-full bg-white rounded shadow overflow-hidden">
        <thead>
          <tr className="bg-slate-100 text-left">
            {['routeId','ghgIntensity','% diff','compliant'].map(h=> (<th key={h} className="px-3 py-2 text-sm font-semibold">{h}</th>))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={r.id} className="border-t">
              <td className="px-3 py-2">#{idx+1}</td>
              <td className="px-3 py-2">{r.ghgIntensity.toFixed(2)}</td>
              <td className="px-3 py-2">{r.percentDiff.toFixed(2)}%</td>
              <td className="px-3 py-2">{r.compliant ? '✅' : '❌'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="h-72 bg-white rounded shadow p-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={rows.map((r, i) => ({ name: `R${i+1}`, ghg: r.ghgIntensity }))}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="ghg" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
