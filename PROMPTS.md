# PROMPTS.md

## Day 1

### Prompt 1

Used Codex to help scaffold the initial project structure.

#### Prompt

```text id="frgj0u"
You are helping me build a production-quality MVP for a startup-style web app called an AI Spend Audit tool.

Tech stack:
- Next.js 15 App Router
- TypeScript
- TailwindCSS
- shadcn/ui
- ESLint
- Prettier

Goals:
- Initialize a clean scalable project structure
- Keep architecture simple and maintainable
- No overengineering
- Use modern conventions
- Mobile-first responsive setup

Please generate:
1. Recommended folder structure
2. Initial setup commands
3. Tailwind + shadcn setup steps
4. Suggested app architecture
5. Best practices for keeping this MVP clean and extensible

Do NOT generate the full app.
Only help scaffold the foundation cleanly.
```

#### Why I Used This Prompt

I wanted help setting up the project foundation quickly without generating the whole application automatically. I specifically asked for a simple structure because AI tools tend to overcomplicate early-stage projects.

#### What Was Useful

The output helped with:

* Folder organization.
* Tailwind and shadcn setup.
* TypeScript structure.
* Reusable component planning.

It also helped standardize linting and formatting setup early.

#### What I Changed Manually

Some suggestions introduced too many abstractions for an MVP. I removed unnecessary wrappers and simplified parts of the structure before continuing development.

---

### Prompt 2

Used Codex to help structure the landing page.

#### Prompt

```text id="j7d6l0"
Help me build the initial landing page for an AI Spend Audit SaaS MVP.

Requirements:
- Next.js App Router
- TypeScript
- Tailwind
- shadcn/ui
- Modern startup aesthetic
- Mobile responsive

Page sections:
1. Hero section
2. Tool explanation
3. How it works
4. CTA section
5. Footer

Prioritize readability and reusable components.
Do not generate backend logic.
```

#### Why I Used This Prompt

The goal was to speed up layout work and component organization while still making design decisions manually.

#### What Was Useful

The generated structure gave a decent starting point for:

* Section hierarchy.
* Responsive spacing.
* Reusable UI sections.

#### What Did Not Work Well

Some styling suggestions looked too generic and overly “AI SaaS” themed. I simplified the UI and removed unnecessary visual effects.
