# Reflection on Using AI Agents

Working on this project gave me a clear understanding of how AI tools can actually become part of a developer’s workflow instead of just being a shortcut.  
I used GitHub Copilot, ChatGPT, and Cursor at different stages of development — and I realized that each tool plays a different role if used thoughtfully.

---

## What I Learned

I learned how to approach a project like an architect rather than just a coder.  
Designing the backend using a **Hexagonal Architecture** made me understand how clean separation between the domain, application, and adapters helps keep code testable and easier to extend later.  
While AI tools gave me structure and syntax quickly, the real work was still in thinking about data flow, business logic, and making sure each part communicated properly.

I also learned that AI is best used for ideas and patterns — not final answers.  
Every snippet needed review, testing, and sometimes complete rewriting.  
This helped me become more analytical about the code being produced.

---

## Efficiency Gains vs Manual Coding

AI agents definitely saved a lot of time in setting up repetitive or boilerplate tasks — like creating routers, React components, and TypeScript interfaces.  
Normally, those things take hours, but with Copilot and ChatGPT, I could get a working version in minutes and then focus on refining logic.  
However, when it came to critical parts such as the **compliance balance (CB)** formula or **pooling logic**, manual reasoning and debugging were still essential.  
So overall, AI made the process faster, but not mindless — it helped me spend more time on thinking rather than typing.

---

## Improvements Next Time

If I redo this project, I’d integrate a real **PostgreSQL database** using Prisma instead of an in-memory setup, and add **input validation with Zod** for every endpoint.  
I’d also like to create more unit tests for banking and pooling edge cases, and maybe automate test data generation using an AI script.  
On the frontend, I’d experiment with better chart visualizations and accessibility improvements.

---

In short, using AI felt like working with a very fast but inexperienced teammate — it can speed you up, but only if you stay in control and review everything carefully.  
This project helped me understand how to combine **AI assistance** with **human judgment** to build cleaner, more reliable software.
