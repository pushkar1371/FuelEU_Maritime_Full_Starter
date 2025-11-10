import { Router } from 'express';
import { MemoryComplianceRepo, MemoryRouteRepo } from '../../outbound/memory/repositories';
import { computeCB } from '../../../core/application/computeCB';

const routeRepo = MemoryRouteRepo();
const complianceRepo = MemoryComplianceRepo();
export const complianceRouter = Router();

// GET /compliance/cb?shipId&year
complianceRouter.get('/cb', async (req, res) => {
  const shipId = String(req.query.shipId || 'SHIP-1');
  const year = Number(req.query.year || '2025');

  // For demo: compute CB from a route of that year (or first route)
  const all = await routeRepo.getAll();
  const candidate = all.find((r) => r.year === year) || all[0];
  const { cb } = computeCB(candidate.ghgIntensity, candidate.fuelConsumptionTons);
  const record = { shipId, year, cb_gco2eq: cb };
  await complianceRepo.upsert(record);
  res.json({ cb_before: cb });
});

// GET /compliance/adjusted-cb?shipId&year
complianceRouter.get('/adjusted-cb', async (req, res) => {
  const shipId = String(req.query.shipId || 'SHIP-1');
  const year = Number(req.query.year || '2025');
  const current = await complianceRepo.get(shipId, year);
  res.json({ shipId, year, cb_after: current?.cb_gco2eq ?? 0 });
});
