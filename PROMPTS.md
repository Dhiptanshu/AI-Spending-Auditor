# PROMPTS.md

## Day 1

### Prompt 1

Used Codex to help scaffold the initial project structure.

#### Prompt

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
4. Suggested app architecture
5. Best practices for keeping this MVP clean and extensible

Do NOT generate the full app.
Only help scaffold the foundation cleanly.
```

#### Why I Used This Prompt

I wanted help setting up the project foundation quickly without generating the whole application automatically. I specifically asked for a simple structure because AI tools tend to overcomplicate early-stage projects.

#### What Was Useful

The output helped with:

* Folder organization
* Tailwind and shadcn setup
* TypeScript structure
* Reusable component planning

It also helped standardize linting and formatting setup early.

#### What I Changed Manually

Some suggestions introduced too many abstractions for an MVP. I removed unnecessary wrappers and simplified parts of the structure before continuing development.

---

### Prompt 2

Used Codex to help structure the landing page.

#### Prompt

```text
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

* Section hierarchy
* Responsive spacing
* Reusable UI sections

#### What Did Not Work Well

Some styling suggestions looked too generic and overly “AI SaaS” themed. I simplified the UI and removed unnecessary visual effects.

---

## Day 2

### Prompt 1

Used Codex to design the audit form architecture and pricing configuration structure.

#### Prompt

```text
I am building the audit input system for an AI Spend Audit application.

Stack:
- Next.js App Router
- TypeScript
- Tailwind
- shadcn/ui

The form needs to support these tools and plans (refer from PRICING_DATA.md):

- Cursor (Hobby / Pro / Business / Enterprise)
- GitHub Copilot (Individual / Business / Enterprise)
- Claude (Free / Pro / Max / Team / Enterprise / API direct)
- ChatGPT (Plus / Team / Enterprise / API direct)
- Anthropic API direct
- OpenAI API direct
- Gemini (Pro / Ultra / API)
- Windsurf
- v0

For each tool:
- selected plan
- monthly spend
- seat count

Global fields:
- team size
- primary use case:
  - coding
  - writing
  - data
  - research
  - mixed

Requirements:
- Strong TypeScript typing
- Easy to extend later
- Form validation support
- LocalStorage persistence later
- Mobile responsive
- Reusable form sections
- Pricing configuration should be centralized and reusable later for the audit engine
- Avoid duplicated configuration data

Recommended Architecture:

Do NOT hardcode pricing directly inside components.

Instead create:
- src/config/pricing.ts
- optionally later: src/config/tools.ts

Pricing configuration should support:
- fixed pricing
- usage-based API pricing
- enterprise custom pricing
- source URLs
- verification dates
- pricing model metadata

Enterprise/custom pricing requirements:
- Users should be able to override pricing manually
- Custom values should persist for the browser session/local storage

Please help generate:
1. TypeScript interfaces
2. Suggested form data structure
3. Tool + plan configuration structure
4. Recommended constants/config approach
5. Component breakdown
6. Validation strategy
7. Suggestions for organizing future pricing metadata and audit rules

Do not generate the full UI yet.
Focus on scalable architecture for the form and audit engine.
```

#### Why I Used This Prompt

I wanted to finalize the data structure before continuing UI development. The audit engine and pricing comparisons depend heavily on consistent configuration design, so I focused on architecture before implementation.

#### What Was Useful

The output helped organize:

* Tool and plan metadata
* Shared pricing configuration
* TypeScript interfaces
* Reusable form structures
* Future audit rule separation

It also helped avoid duplicating pricing logic inside components.

#### What I Changed Manually

Some suggestions introduced additional abstraction layers that felt unnecessary for an MVP. I simplified parts of the configuration structure and reduced nesting where possible.

---

### Prompt 2

Used Codex to structure the main audit form page.

#### Prompt

```text
Help me build the main /audit page for an AI Spend Audit SaaS application.

Requirements:
- Next.js App Router
- TypeScript
- Tailwind
- shadcn/ui
- Responsive layout
- Clean B2B SaaS styling

The page should include:
1. Page heading and short description
2. Dynamic list of AI tools
3. Add/remove tool functionality
4. Inputs for:
   - tool
   - plan
   - monthly spend
   - seats
5. Team size input
6. Primary use case dropdown
7. CTA button to generate audit

Important:
- Use reusable components
- Keep state manageable
- Avoid unnecessary abstraction
- No backend integration yet

Generate:
- component structure
- starter implementation
- reusable form section example
```

#### Why I Used This Prompt

The goal was to build the audit input experience incrementally while maintaining reusable UI patterns and manageable form state.

#### What Was Useful

The generated suggestions helped with:

* Dynamic tool row handling
* Responsive form layouts
* Reusable form sections
* Mobile spacing and hierarchy

#### What Did Not Work Well

Some generated component patterns relied on unnecessary prop drilling and over-segmented the form into too many files. I consolidated parts of the structure to keep development faster and easier to maintain.

---

### Prompt 3

Used Codex to design LocalStorage persistence safely.

#### Prompt

```text
Help me add LocalStorage persistence for a multi-section React form in Next.js.

Requirements:
- Persist form state across reloads
- Avoid hydration mismatch issues
- TypeScript support
- Safe parsing and fallback defaults

Current structure:
- audit form with dynamic tool entries
- team size
- use case

Please suggest:
1. Best persistence approach
2. Reusable hook structure
3. Hydration-safe implementation
4. Error handling strategy

Do not introduce external state libraries unless necessary.
```

#### Why I Used This Prompt

The assignment specifically required form persistence across reloads, so I wanted a lightweight solution that worked cleanly with Next.js App Router and client-side rendering.

#### What Was Useful

The output helped with:

* Hydration-safe LocalStorage handling
* State initialization patterns
* Fallback parsing logic
* Reducing unnecessary re-renders

#### What I Changed Manually

I avoided introducing additional state libraries because the form state was still manageable with React hooks and local component state.

---

### Prompt 4

Used Gemini 3.1 Pro (Low) to improve form UX, accessibility, and validation.

#### Prompt

```text
Help improve the UX and validation for a SaaS audit form.

Requirements:
- Clean inline validation
- Mobile friendly inputs
- Accessible labels
- Prevent invalid spend values
- Good empty states
- Clear CTA hierarchy

The form includes:
- tool selection
- pricing inputs
- seat counts
- team size
- use case

Please suggest:
1. Validation rules
2. UX improvements
3. Accessibility considerations
4. Loading/disabled button states
5. Common form mistakes to avoid

Focus on maintainable engineering decisions.
```

#### Why I Used This Prompt

I wanted to improve the usability of the form before continuing backend and audit engine work. Since the product depends heavily on user input quality, validation and accessibility were important early considerations.

#### What Was Useful

The output helped improve:

* Numeric input validation
* Mobile responsiveness
* Inline validation messaging
* CTA clarity
* Accessibility considerations

#### What Did Not Work Well

Some suggestions introduced interactions that felt too complex for an MVP workflow. I simplified several UX ideas to keep the interface focused and fast to complete.

---

## Day 3

### Prompt 1

Used Gemini 3.1 Pro (Low) to finalize the pricing configuration and normalized audit input layer.

#### Prompt

```text
I am building an AI Spend Audit SaaS application using:
- Next.js App Router
- TypeScript
- TailwindCSS
- shadcn/ui

Current progress:
- Dynamic audit form completed
- zod + react-hook-form validation completed
- LocalStorage persistence completed
- Accessibility and UX improvements completed
- Dynamic tool rows and pricing overrides completed

Supported tools:
- Cursor
- GitHub Copilot
- Claude
- ChatGPT
- Anthropic API
- OpenAI API
- Gemini
- Windsurf
- v0

Goal of this segment:
Build the foundational pricing configuration and normalized audit input layer for the audit engine.

Requirements:
- Centralized pricing metadata
- Strong TypeScript typing
- No pricing logic inside React components
- Support:
  - monthly pricing
  - annual effective pricing
  - API pricing
  - enterprise/custom pricing
  - user-overridden pricing
  - billing cycle metadata
  - source URLs
  - verification dates

Please help generate:
1. Recommended TypeScript pricing types
2. Suggested structure for:
   - src/config/pricing.ts
   - src/config/tools.ts
3. Recommended normalized audit input structure
4. Suggestions for:
   - pricing normalization
   - override resolution
   - billing cycle handling
   - effective monthly cost calculation
5. Suggestions for maintainability and future scaling

Avoid:
- frontend UI generation
- React components
- unnecessary abstractions

Focus on scalable architecture for the audit engine.
```

#### Why I Used This Prompt

The audit engine depends heavily on consistent pricing metadata and normalized input structures. I wanted to separate business logic from form state early so calculations and recommendation rules would remain easier to test and maintain later.

#### What Was Useful

The output helped organize:

* Pricing metadata structures
* Billing cycle handling
* Override pricing logic
* Normalized audit payloads
* Separation between form state and business logic

#### What I Changed Manually

Some suggested configuration patterns introduced unnecessary nesting and generic abstractions. I simplified several structures to keep the audit engine easier to reason about during iteration.

---

### Prompt 2

Used Gemini 3.1 Pro (Low) to design the recommendation engine and savings calculation architecture.

#### Prompt

```text
I am now building the core audit engine for an AI Spend Audit SaaS application.

Current form flow already supports:
- validated audit input
- dynamic tool entries
- pricing overrides
- LocalStorage persistence

The audit engine should evaluate:
- whether users are overpaying
- whether a lower plan fits their usage
- whether another tool may be cheaper for similar workflows
- annual billing savings opportunities
- enterprise overprovisioning
- unused or excessive seat counts
- API vs subscription mismatches

Requirements:
- Pure TypeScript utility functions
- No React dependencies
- Easy unit testing
- Explainable recommendation logic
- Finance-readable recommendations
- Maintainable architecture

Please help generate:
1. Suggested audit engine architecture
2. Audit result TypeScript types
3. Savings calculation structure
4. Recommendation object structure
5. Suggested separation between:
   - recommendation rules
   - savings calculations
   - formatting logic
6. Strategies for generating explainable recommendations

Avoid:
- AI-generated recommendation logic
- frontend UI
- black-box scoring systems

Focus on deterministic and maintainable business logic.
```

#### Why I Used This Prompt

I wanted the recommendation system to stay deterministic and explainable instead of becoming a vague “AI optimization” layer. Since the assignment specifically emphasizes defensible reasoning, I focused on maintainable rule-based business logic.

#### What Was Useful

The output helped with:

* Recommendation object structure
* Savings calculation organization
* Separation between calculation and formatting logic
* Rule-based engine planning
* Edge case considerations

#### What I Changed Manually

Some recommendation patterns became too aggressive or speculative for realistic startup spend optimization. I intentionally simplified the recommendation scope to keep results more trustworthy and explainable.

---

### Prompt 3

Used Gemini 3.1 Pro (Low) to plan recommendation rules and unit testing strategy.

#### Prompt

```text
I am designing the recommendation rule layer and test coverage for an AI Spend Audit application.

The audit engine should generate realistic and financially defensible recommendations for startup founders and engineering managers.

Supported use cases:
- coding
- writing
- data
- research
- mixed

Please help generate:
1. Recommendation rule categories
2. Examples of:
   - overprovisioned plans
   - enterprise overuse
   - annual billing opportunities
   - overlapping tool usage
   - API vs subscription inefficiencies
3. Suggestions for recommendation prioritization
4. Edge cases that could produce inaccurate recommendations
5. Cases where the engine should recommend no changes
6. Suggested unit test structure
7. Best first unit tests for:
   - savings calculations
   - billing cycle handling
   - override pricing
   - enterprise pricing
   - invalid or incomplete input

Avoid:
- frontend testing
- vague AI-generated advice
- unnecessary testing complexity

Focus on explainable recommendation logic and reliable business-logic testing.
```

#### Why I Used This Prompt

The recommendation rules are the core of the product, so I wanted to think carefully about where the engine should stay conservative versus where it should actively suggest optimizations. I also wanted to begin test coverage early before the audit engine became more complex.

#### What Was Useful

The output helped with:

* Rule prioritization ideas
* No-savings scenarios
* Edge case handling
* Early unit test planning
* Test organization structure

#### What I Changed Manually

Some generated recommendation rules assumed too much about user workflows without enough supporting data. I narrowed the logic to more defensible recommendations tied directly to pricing and seat utilization.

---

## Day 4

### Prompt 1

Used Gemini 3.1 Pro (Low) to design the results page architecture and audit data flow.

#### Prompt

```text
Project Context:

I am building the results experience for an AI Spend Audit SaaS application.

Current stack:
- Next.js 15 App Router
- TypeScript
- TailwindCSS
- shadcn/ui
- Vitest

Current progress:
- Dynamic audit form completed
- LocalStorage persistence completed
- Pricing metadata layer completed
- Normalization layer completed
- Pure recommendation engine completed
- Savings calculations completed
- Unit tests and CI configured

Current audit engine output already includes:
- per-tool recommendations
- monthly savings
- annual savings
- recommendation reasons
- optimization flags

Goal of this segment:
Build the architecture and data flow for the results page.

Requirements:
- Results page should only render precomputed audit results
- No business logic inside React UI components
- Clean separation between:
  - audit engine
  - result formatting
  - UI rendering
- Mobile responsive
- Screenshot-friendly layout
- Easy to extend later with public shareable URLs

Please help generate:
1. Recommended results page architecture
2. Suggested TypeScript result types
3. Suggested folder/component structure for:
   - app/results
   - components/results
4. Best practices for:
   - passing audit result data
   - serializing result payloads
   - formatting currency and savings
5. Suggestions for keeping UI components presentation-focused
6. Suggestions for loading/error states

Avoid:
- unnecessary charts
- business logic inside components
- overengineered state management

Focus on maintainable SaaS-style results architecture.
```

#### Why I Used This Prompt

The recommendation engine was already generating deterministic audit results, so I wanted to focus on building a clean presentation layer instead of mixing additional logic into React components. I also wanted the results flow to remain extensible for future public shareable URLs.

#### What Was Useful

The output helped with:

* Results page structure
* Presentation-focused component boundaries
* Currency formatting organization
* Audit result serialization
* Loading and error handling patterns

#### What I Changed Manually

Some suggested layouts leaned too heavily toward dashboard-style analytics interfaces. I simplified the hierarchy to keep the results page focused on actionable recommendations and readability.

---

### Prompt 2

Used Gemini 3.1 Pro (Low) to improve the savings summary hero section and recommendation card UX.

#### Prompt

```text
Project Context:

I am now building the visual audit results UI for an AI Spend Audit SaaS application.

The audit engine already generates:
- current monthly spend
- optimized monthly spend
- estimated annual savings
- recommendation reasons
- per-tool optimization suggestions

The assignment requires:
- a strong savings summary hero section
- per-tool recommendation breakdowns
- clear financial impact visibility
- screenshot-friendly design

Goal of this segment:
Build the core audit results presentation layer.

Requirements:
- Large and clear savings hero section
- Per-tool recommendation cards
- Mobile responsive layout
- B2B SaaS visual quality
- Strong readability and hierarchy
- Honest recommendation presentation

Each recommendation card should show:
- tool name
- current plan
- recommended action
- monthly savings
- annual savings
- concise reasoning

Please help generate:
1. Suggested layout hierarchy for the results page
2. Hero section UX recommendations
3. Recommendation card structure
4. Suggestions for:
   - visual hierarchy
   - savings emphasis
   - typography
   - responsive layout
5. Suggestions for severity or priority indicators
6. Recommendations for:
   - empty states
   - no-savings scenarios
   - already-optimized users
7. Suggestions for screenshot/share-friendly layouts

Avoid:
- overdesigned dashboards
- unnecessary graphs
- excessive animations
- fake savings exaggeration

Focus on clarity, credibility, and strong SaaS UX.
```

#### Why I Used This Prompt

The assignment specifically emphasized visual quality and shareability of the audit results page, so I focused on making the savings presentation feel credible, readable, and useful rather than overly decorative.

#### What Was Useful

The output helped with:

* Hero section hierarchy
* Recommendation card organization
* Responsive spacing
* Savings visibility
* No-savings messaging
* Screenshot-friendly presentation

#### What I Changed Manually

Some visual suggestions introduced too many dashboard-style elements that distracted from the actual recommendations. I simplified the layout to emphasize readability and decision-making instead.

---

### Prompt 3

Used Gemini 3.1 Pro (Low) to design the AI-generated summary flow and conditional CTA logic.

#### Prompt

```text
Project Context:

I am integrating AI-generated summaries and conditional conversion flows into an AI Spend Audit SaaS application.

Current audit engine output already includes:
- deterministic recommendations
- savings calculations
- recommendation reasons
- optimization summaries

The AI layer should ONLY summarize existing deterministic outputs.
It should NOT invent recommendations or savings numbers.

Assignment requirements:
- Generate ~100-word personalized summaries
- Gracefully handle API failures
- Fall back to deterministic templated summaries
- Surface Credex prominently for high-savings users
- Stay honest for already-optimized stacks

Goal of this segment:
Build the AI summary architecture and conversion CTA logic.

Requirements:
- Use Anthropic API or another LLM
- Keep deterministic audit logic separate
- Graceful fallback handling
- Clear conditional CTA behavior
- Maintain user trust

Please help generate:
1. Suggested AI summary architecture
2. Best practices for:
   - passing audit data into prompts
   - preventing hallucinated savings
   - fallback summary handling
3. Suggestions for:
   - prompt structure
   - summary tone
   - summary length
4. Conditional CTA strategies for:
   - high savings users
   - medium savings users
   - low/no savings users
5. Suggestions for trustworthy conversion messaging
6. Suggestions for handling API loading/error states

Avoid:
- AI-generated financial calculations
- aggressive sales messaging
- vague summaries
- overcomplicated AI pipelines

Focus on trustworthy AI-assisted summarization and realistic SaaS conversion UX.
```

#### Why I Used This Prompt

The assignment explicitly required AI-generated summaries, but I wanted the recommendation logic itself to remain deterministic and explainable. I focused on using AI only as a presentation layer over already-validated audit calculations.

#### What Was Useful

The output helped with:

* AI summary architecture
* Fallback summary handling
* Prompt safety considerations
* Conditional CTA planning
* Trustworthy conversion messaging
* API failure handling

#### What I Changed Manually

Some CTA recommendations felt too sales-oriented for a utility-focused product. I adjusted the messaging to remain more transparent and aligned with the audit results themselves.

---

### Prompt 4

Used Gemini 3.1 Pro (Low) to improve production polish, responsiveness, and accessibility for the results experience.

#### Prompt

```text
Project Context:

I am polishing the results experience for an AI Spend Audit SaaS application before moving into backend persistence and public shareable URLs.

Current progress:
- Audit engine completed
- Recommendation rules completed
- Savings calculations completed
- Results page architecture completed
- AI summary integration in progress

Goal of this segment:
Improve production readiness, responsiveness, and perceived quality of the results experience.

Requirements:
- Mobile-first responsive layout
- Screenshot-friendly presentation
- Fast loading UX
- Accessible UI
- Professional SaaS polish
- Future-ready for public shareable URLs

Please help generate:
1. Suggestions for:
   - mobile responsiveness
   - spacing consistency
   - typography hierarchy
   - loading skeletons
   - transitions
2. Accessibility recommendations for:
   - screen readers
   - semantic structure
   - focus states
   - contrast
3. Suggestions for:
   - screenshot-friendly layouts
   - Open Graph preview readiness
   - future public sharing support
4. Recommendations for:
   - optimistic loading states
   - empty states
   - failure states
5. Suggestions for avoiding:
   - layout shifts
   - cluttered dashboards
   - misleading savings presentation
6. Suggestions for preparing the app for:
   - lead capture
   - backend persistence
   - public result pages later

Avoid:
- unnecessary visual complexity
- excessive animations
- redesigning the audit engine
- overengineering

Focus on production-quality SaaS polish and maintainable frontend architecture.
```

#### Why I Used This Prompt

At this stage, the core audit logic was already functioning correctly, so the focus shifted toward improving perceived quality, responsiveness, accessibility, and readiness for future sharing and backend integrations.

#### What Was Useful

The output helped with:

* Responsive layout improvements
* Accessibility refinements
* Loading state UX
* Open Graph preparation ideas
* Screenshot-friendly structure
* Layout consistency

#### What I Changed Manually

Some suggestions introduced animations and transitions that felt unnecessary for a utility-focused SaaS workflow. I simplified several interactions to prioritize speed, clarity, and maintainability.
