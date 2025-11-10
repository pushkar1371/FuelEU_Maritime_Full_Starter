# Reflection

**What I learned**
- Keeping core logic pure made testing simple and made adapters swappable (memory → Postgres) without touching domain logic.

**Agents vs Manual**
- Agents handled repetitive scaffolding quickly; careful review was still needed for edge cases (pooling constraints, banking caps).

**Improvements Next Time**
- Add Prisma schema + migrations and a real adjusted-CB timeline.
- Expand tests for error branches and HTTP integration with Supertest.
- Harden input validation with Zod on all routers.
