import { Router } from 'express';
import { MemoryRouteRepo } from '../../outbound/memory/repositories';
import { compare } from '../../../core/application/computeComparison';

const routeRepo = MemoryRouteRepo();
export const routesRouter = Router();

routesRouter.get('/', async (_req, res) => {
  const all = await routeRepo.getAll();
  res.json(all);
});

routesRouter.post('/:id/baseline', async (req, res) => {
  const { id } = req.params;
  await routeRepo.setBaseline(id);
  res.json({ ok: true });
});

routesRouter.get('/comparison', async (_req, res) => {
  const baseline = await routeRepo.getBaseline();
  if (!baseline) return res.status(400).json({ error: 'Baseline not set' });
  const all = await routeRepo.getAll();
  const others = all.filter((r) => r.id !== baseline.id);
  const result = compare(baseline.ghgIntensity, others.map((r) => ({ id: r.id, ghg: r.ghgIntensity })));
  res.json({ baseline: { id: baseline.id, ghgIntensity: baseline.ghgIntensity }, comparisons: result });
});
