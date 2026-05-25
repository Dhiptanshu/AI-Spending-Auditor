# Week 1 Reflection

### 1. The hardest bug you hit this week, and how you debugged it

The most brutal bug I hit this week was a severe UX issue involving React Hook Form and Next.js 15. Every time a user interacted with a dynamic row in the "Tool Stack" form—like changing a dropdown from 'Monthly' to 'Annual'—the browser's viewport would aggressively scroll-snap to the absolute top of the page. It made the form completely unusable.

Initially, I hypothesized it was a routing issue with Next.js navigation intercepting scrolls, or a global state re-render destroying the DOM tree. I tried debouncing the inputs, removing direct change listeners, and wrapping components in memoization functions. Nothing worked. The form state was persisting correctly, but the UX was broken.

I finally debugged it by aggressively logging the React component lifecycles. I realized that the entire dynamic row wrapper was actually unmounting and remounting on every single keystroke. When the DOM node containing the actively focused input was destroyed, the browser lost its anchor and snapped to the top. The root cause? When rendering the dynamic array of fields, I was iterating over the array using a custom identifier or the array index for the unique component key. I changed the code to strictly bind the exact unique identifier generated internally by the form library. This allowed React to reconcile the DOM perfectly, preventing the remounts. The scroll-jump instantly disappeared.

### 2. A decision you reversed mid-week, and what made you reverse it

Mid-week, I completely reversed my strategy on how to use AI for the core product. Initially, the plan was to take the raw JSON of a user's tool stack, pass it into an LLM via the Vercel AI SDK, and prompt the AI to "find savings and return a JSON of recommendations."

I reversed this decision entirely after a few hours of testing. I realized it was a fundamentally brittle and dangerous architecture for a B2B finance tool. The LLM would confidently hallucinate prices, fail at basic multiplication, or recommend canceling essential infrastructure simply because it didn't recognize the tool name. It lacked deterministic rigor. 

I pivoted hard and built a pure-TypeScript rules engine instead. The engine calculates savings deterministically against a hardcoded, verified pricing manifest. I then restricted the LLM's role exclusively to the presentation layer: it reads the finalized, mathematically-sound audit output and writes a professional 3-sentence B2B executive summary. This reversal traded the "magic" of an AI black box for trust, accuracy, and reproducibility, which ultimately saved the credibility of the MVP.

### 3. What you would build in week 2 if you had it

If I had a second week, I would evolve the product from a "single-player calculator" into a persistent B2B SaaS platform. 

First, I would introduce proper authentication (Clerk or NextAuth) and a multi-tenant PostgreSQL schema (via Drizzle or Prisma). Instead of forcing users to manually type out their stack, the priority would be building API integrations with Google Workspace or Okta to automatically ingest and sync active SaaS seats across an organization. 

I would also build historical dashboards. A CTO doesn't just want a snapshot; they want to see how their spend drifts month-over-month. I'd implement automated monthly audits that run in the background, firing off a transactional email alert if a new, unmanaged tool crosses a specific threshold (e.g., shadow IT detection). Finally, I would build a web-scraper running on a recurring schedule to automatically update the static pricing configuration, ensuring our baseline math is never out of date when vendors quietly change their plans.

### 4. How you used AI tools

Codex (powered by GPT-5.5) was most useful during the initial project setup and architectural planning phase. I used it heavily for scaffolding the Next.js 15 application, setting up TypeScript, Tailwind, the component library, linting, and organizing the first clean folder structure for the MVP. It accelerated repetitive setup work that could normally consume several hours. 

Later in the week, I leaned heavily on Claude and Gemini as pair programmers, transitioning between the two depending on the task. Gemini 3.1 Pro was exceptionally fast and reliable for generating repetitive validation schemas, data hydration logic, and handling the core API integrations. Meanwhile, Claude Sonnet 4.6, with its advanced reasoning capabilities enabled, proved superior for complex refactoring, high-end visual redesign passes, and orchestrating the premium "operating console" UI aesthetic.

However, I strictly did not trust any of these models with architectural state management, financial math, or routing logic. 

One specific instance where the AI was completely wrong was when I asked it to generate a heuristic rule to detect "Duplicate Tools" in the user's stack. It confidently handed me a block of code that ran a basic array filter checking if two tools shared the exact same string name. What the AI missed entirely was the billing context. A company might legitimately have "GitHub Copilot" on an Annual enterprise contract for backend engineers, and a Monthly floating seat plan for contractors. The AI's naive string-matching threw massive false positives and completely corrupted the savings math. I caught this by running my own edge-case tests, deleted the AI's logic entirely, and hand-wrote the duplicate-detection system using stable grouping and explicit billing cycle checks.

### 5. Self-rating on a 1–10 scale

**Discipline: 9**
I aggressively scoped down the MVP, ruthlessly cutting shiny features like dynamic web scraping and OAuth integrations to focus purely on shipping a reliable, deterministic audit pipeline.

**Code Quality: 8**
The pure-function rules engine is rock-solid, fully decoupled, and heavily tested with Vitest, though some of the React components carry minor technical debt from rapid prototyping.

**Design Sense: 8**
Shifting away from generic component library defaults to a tight, high-contrast, "operating console" aesthetic (heavily inspired by Vercel and Linear) drastically elevated the B2B feel of the product.

**Problem Solving: 9**
Recognizing early on that LLMs are terrible at financial math and immediately pivoting to a hybrid deterministic-engine architecture saved the product's entire value proposition.

**Entrepreneurial Thinking: 9**
Instead of just building a calculator, I baked in a lead-capture gate and shareable public URLs, turning a standard utility tool into a natural viral loop and a legitimate B2B sales wedge.
