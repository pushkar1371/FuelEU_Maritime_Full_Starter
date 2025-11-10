# AI Agent Workflow Log

## Agents Used
- GitHub Copilot (inline boilerplate)
- Cursor Agent (task scaffolding)
- Claude Code / GPT for refactoring and tests

## Prompts & Outputs
- **Scaffold Hexagonal TS backend**: "Create Express (TypeScript) server exposing /routes,/compliance,/banking,/pools; split into core domain and ports."
- **Refine pooling logic**: "Greedy allocation so that sum ≥ 0, deficits not worse, surplus not negative; add unit tests."

## Validation / Corrections
- Verified CB sign by unit test comparing 88 vs 91 gCO₂e/MJ.
- Ensured /banking/apply checks `requested ≤ available`.
- Adjusted pool validation to prevent negative exits.

## Observations
- Agents accelerated boilerplate (routers, types) and test scaffolding.
- Occasional hallucinations on Prisma types avoided by keeping in-memory first.
- Combining inline completions + chat refactors worked best.

## Best Practices Followed
- Wrote use-cases pure and unit-testable.
- Kept framework code out of core.
- Iterated with small, verifiable steps.
