````md
# AI Spend Audit

AI Spend Audit is a lightweight SaaS-style web application that helps startups and engineering teams evaluate whether they are overspending on AI tooling such as Cursor, ChatGPT, Claude, Copilot, Gemini, and API providers. Users can enter their current plans, spend, and team usage patterns to receive optimization recommendations and estimated savings opportunities.

The project is being built as a production-style MVP with a focus on practical audit logic, clean UX, accessibility, and maintainable frontend architecture rather than a one-shot generated demo application.

---

## Quick Start

### Install dependencies

```bash
npm install
````

### Run locally

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Run production build

```bash
npm run start
```

### Lint

```bash
npm run lint
```

---

## Deployment

The project is designed for deployment on Vercel.

### Deploy with Vercel

```bash
vercel
```

Or connect the GitHub repository directly through the Vercel dashboard.

---

## Decisions

### 1. Chose Next.js App Router instead of a traditional SPA

I wanted file-based routing, good deployment support, and a clean path toward future server-side audit generation and shareable report pages. App Router also simplified route organization for the landing page, audit flow, and future public result pages.

### 2. Kept pricing metadata separate from UI components

Pricing logic and plan metadata are centralized in configuration files instead of being embedded inside React components. This keeps the future audit engine easier to test and update as vendor pricing changes.

### 3. Used local state and LocalStorage instead of introducing a global state library

At the current MVP stage, React state and LocalStorage are enough to manage the audit flow cleanly. Adding Redux, Zustand, or other state libraries this early would increase complexity without providing much benefit.

### 4. Delayed backend integration until the audit flow stabilized

I intentionally postponed Supabase and email integration until the frontend audit flow and data structures were stable. This reduced unnecessary schema changes and allowed faster iteration on the user experience first.

### 5. Prioritized maintainability over heavy UI animations

The UI focuses on readability, accessibility, and responsive layouts instead of excessive animations or decorative effects. Since the product is primarily a utility tool, clarity and speed mattered more than visual complexity.

```
```
