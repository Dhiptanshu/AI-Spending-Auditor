## Day 1 — 2026-05-20

**Hours worked:** 4

**What I did:** Set up the Next.js 15 project foundation with TypeScript, TailwindCSS, shadcn/ui, ESLint, and Prettier. Built the initial AI Spend Audit landing page, added route shells for the audit and results flows, and created the first lightweight frontend state architecture for persisted audit drafts.

**What I learned:** Keeping the MVP architecture small makes the app easier to reason about. Local state plus localStorage is enough for the first audit flow, and the actual audit calculation logic should stay isolated from React so it can be tested or moved server-side later.

**Blockers / what I'm stuck on:** Turbopack build and dev commands can hit Windows sandbox process-spawning issues, so some checks need to run outside the sandbox. Browser extensions also caused hydration warnings by injecting attributes into the HTML.

**Plan for tomorrow:** Build the first usable audit form UI, wire it to the existing draft persistence hook, and keep the recommendation engine as a separate pure-function boundary.

## Day 2 — 2026-05-21

**Hours worked:** 5

**What I did:** Built the first usable version of the audit form flow. Added dynamic tool entry sections with support for multiple AI products and plans, created centralized pricing/config metadata structures, and improved TypeScript models for future audit calculations. Implemented LocalStorage persistence for audit drafts and added validation improvements for spend values, seat counts, and required fields. Refined the mobile layout and accessibility of the form inputs and CTA flow.

**What I learned:** Separating pricing metadata from UI components makes the future audit engine easier to maintain. Building the form architecture before implementing recommendation logic reduced unnecessary rework. Accessibility and validation decisions also become easier when input structures stay consistent across tool sections.

**Blockers / what I'm stuck on:** Some form state updates became difficult to manage cleanly once dynamic tool rows and custom pricing overrides were added. I also had to simplify a few component abstractions because the generated structure became harder to reason about during iteration.

**Plan for tomorrow:** Start building the audit recommendation engine using centralized pricing/config data. Implement initial savings calculations, recommendation rules, and pure utility functions that can later be unit tested independently from the UI.

## Day 3 — 2026-05-22

**Hours worked:** 5

**What I did:** Architected and implemented the core Audit Recommendation Engine as a pure functional pipeline decoupled from the UI. I built a data normalization layer to hydrate raw form inputs into deterministic math. Then, I authored four independent rule heuristics: Annual Billing arbitrage, Price Discrepancy detection (ghost seats), Tool Consolidation (identifying overlapping tools), and Enterprise Tier overprovisioning. Finally, I successfully integrated a testing framework and wrote a comprehensive suite of automated tests covering the engine's edge cases. I also added a professional testing documentation file and set up a continuous integration pipeline that runs linting, typechecking, and tests.

**What I learned:** Building the logic layer as a headless array of pure functions made it incredibly easy to test and extend. By avoiding mocks and simply passing structured data objects into the tests, the unit tests run extremely fast and provide immense confidence. Creating specific string formatter utilities also keeps the "finance-readable" logic perfectly separated from the math calculations.

**Blockers / what I'm stuck on:** GitHub Actions and local Windows environments occasionally drift (e.g., `&&` in PowerShell vs Bash), and `npm install` for test dependencies took longer than expected. Had a minor slip up with some stale `any` casts in the React hook form dependency arrays, but cleaned them up with ESLint.

**Plan for tomorrow:** Dive into the results dashboard UI. Map over the output of the recommendation engine and render the metrics, savings calculations, and recommendation cards in a beautiful, professional layout.

## Day 4 — 2026-05-23

**Hours worked:** 4

**What I did:** Architected and implemented the entire Results Dashboard presentation layer. Built the core metrics summary and a scalable recommendation card system featuring dynamic severity indicators, distinct rationale displays, and split annual vs. monthly savings projections. Additionally, I successfully integrated an AI summarization layer utilizing the Vercel AI SDK to securely read the deterministic mathematical output and generate concise, professional insights. I added graceful API failure states, loading skeletons to prevent layout shifts, and a highly conditional Call-to-Action conversion pipeline that adjusts its messaging based on the user's specific savings tier. Finally, I documented the theoretical SaaS scaling architecture required for public sharing and backend persistence.

**What I learned:** Offloading AI generation to a secure server route and providing it with strictly formatted, pre-calculated numbers is the best way to prevent hallucinations and maintain trust. Implementing graceful degradation (falling back to deterministic strings when the AI API fails) ensures the user experience never breaks during peak load or API rate limits. Building the UI sequentially based on the decoupled Engine made connecting the data flow incredibly smooth.

**Blockers / what I'm stuck on:** Navigating AI SDK updates and dealing with minor API rate limits caused some hiccups, but having the fallback architecture in place made it a non-issue. Encountered minor TypeScript strictness issues between component property types and the engine's data model, but resolved them quickly without touching the core logic.

**Plan for tomorrow:** Move into backend persistence architecture. Implement a database layer to start permanently storing audits, generating unique shareable URLs, and gating access behind a lead capture email form.

## Day 5 — 2026-05-24

**Hours worked:** 5

**What I did:** Architected and implemented the entire Backend Persistence, Lead Capture, and Public Sharing pipelines. I initialized a Supabase PostgreSQL database with strict Row Level Security (RLS) to securely isolate private audit payloads from public viewers. I built a frictionless inline "Lead Capture Gate" that blurs recommendations to capture emails post-value, and wired it up to a Resend transactional email flow. I created fully server-rendered public result routes with dynamic OpenGraph metadata for rich social previews. Finally, I hardened the entire application for production by adding strict Zod environment variable validation, a bot-blocking invisible honeypot, and enforcing LLM prompt limits.

**What I learned:** Supabase's upsert and Service Role APIs make building backend pipelines incredibly fast, but careful attention must be paid to React component lifecycles when moving from "draft" states to "persisted" states. Deprecated react-hook-form key mapping can cause silent performance bugs that are tricky to debug, but upgrading to the native id property solved it instantly. Strict Zod env validation is an absolute must-have before launching Next.js applications to avoid confusing runtime errors.

**Blockers / what I'm stuck on:** Navigating minor PowerShell curl syntax quirks and a trailing-slash typo in a Supabase URL, but the robust server-side error logging made it trivial to diagnose. React Hook Form required a strict useRef hydration lock to prevent focus jumping, which was a great learning experience in React render lifecycles.

**Plan for tomorrow:** Project complete! Ready to launch to the public, market the tool, and potentially expand the heuristic engine with more rules as user data rolls in.
