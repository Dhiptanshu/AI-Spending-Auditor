# AI Spend Audit

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Resend](https://img.shields.io/badge/Resend-black?style=for-the-badge&logo=maildotru&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)

AI Spend Audit is a lightweight SaaS style web application that helps startups and engineering teams evaluate whether they are overspending on AI tooling such as Cursor, ChatGPT, Claude, Copilot, Gemini, and API providers. Users can enter their current plans, spend, and team usage patterns to receive optimization recommendations and estimated savings opportunities.

The project is built as a production ready MVP with a focus on practical audit logic, clean UX, accessibility, and maintainable architecture.

## Technology Stack and APIs

### Frontend and Framework
* **Next.js 15 (App Router):** Chosen for file based routing, excellent deployment support, and a clean path toward server side audit generation and shareable report pages.
* **React and TypeScript:** Provides strict type safety and a robust component model, significantly reducing runtime errors and improving maintainability.
* **TailwindCSS and shadcn/ui:** Allows for rapid UI development with highly accessible, unstyled components that look professional out of the box.

### Backend and Database
* **Supabase (PostgreSQL):** Used for database persistence. It provides secure data storage, easy integrations, and strict Row Level Security to isolate private audit payloads from public viewers.

### External APIs
* **Gemini API:** Used exclusively for generating concise Executive Summaries based strictly on deterministic mathematical outputs. This prevents hallucinations and maintains trust.
* **Resend API:** Used for transactional email delivery. It handles sending the final public shareable links to users quickly and reliably.

## Project Structure

```text
src/
├── app/                  # Next.js App Router pages and API routes
│   ├── api/              # Backend endpoints for saving audits, lead capture, and AI generation
│   └── results/          # Public and private result dashboard pages
├── components/           # Reusable React components
│   ├── audit/            # Form components and tool input sections
│   ├── results/          # Dashboard visualization components
│   └── ui/               # Base shadcn/ui components
├── config/               # Pricing data and configuration constants
├── hooks/                # Custom React hooks for state management
├── lib/                  # Core utility functions and logic
│   ├── audit/            # Deterministic math engine and normalizers
│   ├── pricing/          # Spend estimation utilities
│   └── supabase/         # Database client setup
└── types/                # TypeScript interfaces and type definitions
```

## Quick Start

### Install dependencies

```bash
npm install
```

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

## Deployment

The project is designed for deployment on Vercel.

### Deploy with Vercel

```bash
vercel
```

Or connect the GitHub repository directly through the Vercel dashboard.

## Key Decisions

### 1. Chose Next.js App Router instead of a traditional SPA

I wanted file based routing, good deployment support, and a clean path toward future server side audit generation and shareable report pages. App Router also simplified route organization for the landing page, audit flow, and future public result pages.

### 2. Kept pricing metadata separate from UI components

Pricing logic and plan metadata are centralized in configuration files instead of being embedded inside React components. This keeps the future audit engine easier to test and update as vendor pricing changes.

### 3. Used local state and LocalStorage instead of introducing a global state library

At the current MVP stage, React state and LocalStorage are enough to manage the audit flow cleanly. Adding Redux, Zustand, or other state libraries this early would increase complexity without providing much benefit.

### 4. Delayed backend integration until the audit flow stabilized

I intentionally postponed Supabase and email integration until the frontend audit flow and data structures were stable. This reduced unnecessary schema changes and allowed faster iteration on the user experience first.

### 5. Prioritized maintainability over heavy UI animations

The UI focuses on readability, accessibility, and responsive layouts instead of excessive animations or decorative effects. Since the product is primarily a utility tool, clarity and speed mattered more than visual complexity.
