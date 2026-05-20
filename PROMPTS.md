# PROMPTS.md

# Day 1 — Project Foundation & Architecture

## Prompt 1 — Project Scaffold Planning

### Model Used

OpenAI Codex

### Prompt

```text
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
4. Suggested app architecture for:
   - pages/routes
   - components
   - lib
   - types
   - hooks
   - services
5. Best practices for keeping this MVP clean and extensible

Do NOT generate the full app.
Only help scaffold the foundation cleanly.
```

### Why I Wrote It This Way

I intentionally constrained the model away from generating the entire application. The assignment explicitly warns against one-shot generated codebases, so I focused on using AI for structured planning and setup assistance rather than full autonomous development.

I also emphasized:

* simplicity
* maintainability
* avoiding overengineering

because early-stage MVPs can become messy quickly when AI tools generate excessive abstractions.

### What Worked

The model produced:

* a clean folder structure
* modern Next.js conventions
* reusable architecture ideas
* ESLint/Prettier setup guidance

It also suggested a scalable separation between UI components, utility logic, and future backend services.

### What Didn’t Work / Issues

The first output attempted to introduce unnecessary abstraction layers and service wrappers too early for an MVP.

I manually simplified:

* folder nesting
* helper utilities
* architecture complexity

to keep the codebase lean for Week 1 development.

---

## Prompt 2 — Landing Page Structure Planning

### Model Used

OpenAI Codex

### Prompt

```text
Help me build the initial landing page for an AI Spend Audit SaaS MVP.

Requirements:
- Next.js App Router
- TypeScript
- Tailwind
- shadcn/ui
- Modern startup aesthetic
- Mobile responsive
- Clean spacing and typography
- No animations yet

Page sections:
1. Hero section
2. Short explanation of the tool
3. “How it works” 3-step section
4. CTA button leading to /audit
5. Footer

Important:
- Prioritize readability and clean hierarchy
- Avoid excessive gradients or flashy UI
- Use reusable components
- Keep accessibility in mind

Please generate:
- component structure
- recommended UI layout
- starter code for page.tsx
- reusable section components

Do NOT generate fake backend logic.
```

### Why I Wrote It This Way

I wanted AI assistance primarily for layout acceleration and component organization, not branding or business logic decisions.

I constrained the prompt to:

* avoid unnecessary animations
* keep the design readable
* focus on accessibility
* prevent fake backend generation

This helped maintain control over the actual product direction.

### What Worked

The generated structure helped speed up:

* responsive section layout
* reusable component organization
* Tailwind spacing hierarchy

### What Didn’t Work / Issues

Some generated UI suggestions leaned too heavily into generic “AI SaaS” styling with excessive gradients and decorative effects.

I removed or simplified many of those ideas to make the interface cleaner and more product-focused.
