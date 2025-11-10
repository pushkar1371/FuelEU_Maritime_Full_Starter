import { Router } from 'express';
import { MemoryBankingRepo, MemoryComplianceRepo } from '../../outbound/memory/repositories';
import { bankSurplus } from '../../../core/application/bankSurplus';
import { applyBanked } from '../../../core/application/applyBanked';
import { randomUUID } from 'node:crypto';

const bankingRepo = MemoryBankingRepo();
const complianceRepo = MemoryComplianceRepo();
export const bankingRouter = Router();

// GET /banking/records?shipId&year
bankingRouter.get('/records', async (req, res) => {
  const shipId = String(req.query.shipId || 'SHIP-1');
  const year = Number(req.query.year || '2025');
  const list = await bankingRepo.list(shipId, year);
  res.json(list);
});

// POST /banking/bank { shipId, year }
bankingRouter.post('/bank', async (req, res) => {
  const shipId = String(req.body.shipId || 'SHIP-1');
  const year = Number(req.body.year || '2025');
  const current = await complianceRepo.get(shipId, year);
  const cb = current?.cb_gco2eq ?? 0;
  try {
    const amount = bankSurplus(cb);
    await bankingRepo.add({ id: randomUUID(), shipId, year, amount_gco2eq: amount });
    res.json({ cb_before: cb, applied: amount, cb_after: 0 });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

// POST /banking/apply { shipId, year, amount }
bankingRouter.post('/apply', async (req, res) => {
  const shipId = String(req.body.shipId || 'SHIP-1');
  const year = Number(req.body.year || '2025');
  const amount = Number(req.body.amount || 0);
  const current = await complianceRepo.get(shipId, year);
  const deficit = current?.cb_gco2eq ?? -1; // assume deficit if missing
  const available = await bankingRepo.totalAvailable(shipId, year);
  try {
    const { applied, cb_after } = applyBanked(deficit, available, amount);
    await complianceRepo.upsert({ shipId, year, cb_gco2eq: cb_after });
    res.json({ cb_before: deficit, applied, cb_after });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});
