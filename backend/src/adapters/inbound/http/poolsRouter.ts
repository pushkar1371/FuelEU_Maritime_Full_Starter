import { Router } from 'express';
import { createPool } from '../../../core/application/createPool';
import { MemoryPoolRepo } from '../../outbound/memory/repositories';

const poolRepo = MemoryPoolRepo();
export const poolsRouter = Router();

// POST /pools { year, members: [{ shipId, cb_before }] }
poolsRouter.post('/', async (req, res) => {
  const year = Number(req.body.year || '2025');
  const members = (req.body.members || []) as { shipId: string; cb_before: number }[];
  try {
    const adjusted = createPool(year, members);
    const saved = await poolRepo.create(year, adjusted);
    const sumAfter = saved.members.reduce((a, m) => a + (m.cb_after ?? 0), 0);
    res.json({ ...saved, poolSum: sumAfter });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});
