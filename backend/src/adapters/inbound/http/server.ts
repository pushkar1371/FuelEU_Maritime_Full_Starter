import express from 'express';
import cors from 'cors';
import { routesRouter } from './routesRouter';
import { complianceRouter } from './complianceRouter';
import { bankingRouter } from './bankingRouter';
import { poolsRouter } from './poolsRouter';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/routes', routesRouter);
app.use('/compliance', complianceRouter);
app.use('/banking', bankingRouter);
app.use('/pools', poolsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Backend running on http://localhost:${port}`));
