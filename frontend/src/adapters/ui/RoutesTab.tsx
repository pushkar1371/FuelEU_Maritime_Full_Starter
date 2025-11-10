import React, { useEffect, useMemo, useState } from 'react';
import type { Route } from '../../core/domain/types';
import { apiClient } from '../infrastructure/apiClient';

export default function RoutesTab() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [filters, setFilters] = useState({ vesselType: '', fuelType: '', year: '' });

  const fetchRoutes = async () => {
    const data = await apiClient.getRoutes();
    setRoutes(data);
  };
  useEffect(() => { fetchRoutes(); }, []);

  const filtered = useMemo(() => routes.filter(r => (
    (!filters.vesselType || r.vesselType === filters.vesselType) &&
    (!filters.fuelType || r.fuelType === filters.fuelType) &&
    (!filters.year || r.year === Number(filters.year))
  )), [routes, filters]);

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <select className="border p-2 rounded" value={filters.vesselType} onChange={e=>setFilters(s=>({...s, vesselType: e.target.value}))}>
          <option value="">Vessel</option>
          {[...new Set(routes.map(r=>r.vesselType))].map(v=>(<option key={v} value={v}>{v}</option>))}
        </select>
        <select className="border p-2 rounded" value={filters.fuelType} onChange={e=>setFilters(s=>({...s, fuelType: e.target.value}))}>
          <option value="">Fuel</option>
          {[...new Set(routes.map(r=>r.fuelType))].map(v=>(<option key={v} value={v}>{v}</option>))}
        </select>
        <select className="border p-2 rounded" value={filters.year} onChange={e=>setFilters(s=>({...s, year: e.target.value}))}>
          <option value="">Year</option>
          {[...new Set(routes.map(r=>r.year))].map(v=>(<option key={v} value={v}>{v}</option>))}
        </select>
      </div>

      <table className="min-w-full bg-white rounded shadow overflow-hidden">
        <thead>
          <tr className="bg-slate-100 text-left">
            {['routeId','vesselType','fuelType','year','ghgIntensity','fuelConsumption(t)','distance(km)','totalEmissions(t)','baseline','actions'].map(h=> (
              <th key={h} className="px-3 py-2 text-sm font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map(r => (
            <tr key={r.id} className="border-t">
              <td className="px-3 py-2">{r.routeId}</td>
              <td className="px-3 py-2">{r.vesselType}</td>
              <td className="px-3 py-2">{r.fuelType}</td>
              <td className="px-3 py-2">{r.year}</td>
              <td className="px-3 py-2">{r.ghgIntensity.toFixed(2)}</td>
              <td className="px-3 py-2">{r.fuelConsumptionTons}</td>
              <td className="px-3 py-2">{r.distanceKm}</td>
              <td className="px-3 py-2">{r.totalEmissionsTons}</td>
              <td className="px-3 py-2">{r.isBaseline ? '✅' : ''}</td>
              <td className="px-3 py-2">
                <button className="px-3 py-1 border rounded" onClick={async()=>{ await apiClient.setBaseline(r.id); await fetchRoutes(); }}>Set Baseline</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
