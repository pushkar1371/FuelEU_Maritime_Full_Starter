import React, { useState } from 'react';
import RoutesTab from './adapters/ui/RoutesTab';
import CompareTab from './adapters/ui/CompareTab';
import BankingTab from './adapters/ui/BankingTab';
import PoolingTab from './adapters/ui/PoolingTab';
import { Tabs } from './adapters/ui/Tabs';

export default function App() {
  const [active, setActive] = useState('routes');
  const tabs = [
    { id: 'routes', label: 'Routes' },
    { id: 'compare', label: 'Compare' },
    { id: 'banking', label: 'Banking' },
    { id: 'pooling', label: 'Pooling' }
  ];
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Fuel EU Compliance Dashboard</h1>
      <p className="text-slate-600 mb-6">Hexagonal architecture • React + Tailwind • Express (TS)</p>
      <Tabs tabs={tabs} active={active} onChange={setActive} />
      {active === 'routes' && <RoutesTab />}
      {active === 'compare' && <CompareTab />}
      {active === 'banking' && <BankingTab />}
      {active === 'pooling' && <PoolingTab />}
    </div>
  );
}
