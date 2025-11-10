# AI Agent Workflow Log

## Agents Used

- **GitHub Copilot** – for quick inline code suggestions, especially while writing repetitive Express routes and React components.
- **ChatGPT (GPT-5)** – used as a coding partner to design architecture, debug logic, and generate documentation.
- **Cursor Agent** – for initial folder scaffolding and task-based code generation (creating boilerplate files quickly).

I mainly worked between Copilot inside VS Code and ChatGPT in the browser for reasoning and refactoring.

---

## Prompts & Outputs

### Example 1 — Backend Hexagonal Setup

**Prompt:**

> “Create a Node.js + TypeScript backend following hexagonal architecture with routes, compliance, banking, and pooling APIs using in-memory data.”

**Output:**  
It generated a well-structured folder layout (`core`, `adapters/inbound`, `adapters/outbound`, etc.) with minimal Express setup.  
I kept that structure but rewrote several parts manually to ensure clean imports and TypeScript strict-mode compliance.

---

### Example 2 — Pooling Algorithm

**Prompt:**

> “Write a greedy pooling algorithm that redistributes surplus CBs to deficit ships so that total sum ≥ 0 and no ship exits worse.”

**Output:**  
The AI gave a good starting point but didn’t handle floating-point rounding and negative exit checks.  
I added extra validation lines and tested multiple examples to make sure all ships ended with non-negative CBs.

---

## Validation / Corrections

- Ran manual checks on `/routes`, `/comparison`, and `/banking` endpoints using Postman.
- Created **Vitest** unit tests for `computeCB` and `createPool` to confirm mathematical correctness.
- Verified CB sign logic by comparing actual vs target GHG intensities.
- Removed redundant or hallucinated imports (like Prisma before the DB was added).

---

## Observations

- **Saved time:** Copilot generated 70–80% of boilerplate (Express routers, React tables, Tailwind markup).
- **Needed corrections:** Some functions from AI missed edge cases (negative CBs, invalid pool sum).
- **Combination worked best:** Cursor for structure, ChatGPT for reasoning, and Copilot for inline suggestions.
- Writing prompts precisely (mentioning file purpose and constraints) produced much cleaner outputs.

---

## Best Practices Followed

- Kept **core logic pure** (no Express inside `core/`).
- Used **TypeScript interfaces** to define ports between layers.
- Committed small, incremental changes after reviewing AI outputs.
- Used **Prettier + ESLint** to maintain consistent formatting.
- Tested and validated every agent-generated file before committing.

---

Overall, AI tools helped me move faster and stay organized, but every generated piece still required review and human judgment.  
This assignment felt like a mix of engineering and collaboration with AI.
