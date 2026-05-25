# Test Coverage Report: AI Spend Audit Engine

This document outlines the automated testing strategy and coverage for the core AI Spend Audit Engine. The engine calculates deterministically verified savings and generates audit recommendations based on normalized data.

## Testing Infrastructure

- **Framework**: `vitest` (High-performance, Next.js path-alias compatible)
- **Environment**: Node (Pure TypeScript business logic)
- **Execution**:
  - Full Suite: `npm run test` or `npx vitest run`
  - Development (Watch Mode): `npx vitest`

## Engine Test Suite

The test suite currently contains **6 comprehensive tests** that explicitly verify the integrity of the math, normalization logic, and recommendation heuristics. These tests are completely decoupled from React or the DOM.

### 1. Data Normalization (`src/lib/audit/__tests__/normalize.test.ts`)
The normalization layer is responsible for converting raw UI inputs into a verified mathematical baseline (the `NormalizedAuditPayload`).

- **Test 1: Standard Plan Hydration & Math Verification**
  - **Purpose**: Verifies that when a standard tool (e.g., Cursor) is provided, the engine correctly looks up official pricing, applies it per-seat, and accurately sets the expected discrepancy to `$0`.
- **Test 2: Price Discrepancy Detection (Overpayment)**
  - **Purpose**: Verifies that if a user manually declares a monthly spend higher than the standard retail cost for their seat count, the `spendDiscrepancyAmount` captures the precise financial difference.

### 2. Annual Billing Heuristic (`src/lib/audit/rules/__tests__/check-annual-billing.test.ts`)
This module validates the recommendation logic for annual contract arbitrage.

- **Test 3: Cheaper Annual Equivalent Detection**
  - **Purpose**: Evaluates a payload containing a monthly subscription and asserts that the engine mathematically computes the annual equivalent cost, formulates a precise rationale, and registers the expected `monthlySavings`.
- **Test 4: Annual Billing Avoidance (False Positives)**
  - **Purpose**: Ensures that if a tool is already declared with an `annual` billing cycle, the rule immediately returns no recommendations.

### 3. Spend Discrepancy Heuristic (`src/lib/audit/rules/__tests__/check-price-discrepancy.test.ts`)
This module validates the recommendation logic for identifying "ghost seats" or billing errors.

- **Test 5: Standard Price Discrepancy Flagging**
  - **Purpose**: Asserts that when a strictly positive `spendDiscrepancyAmount` is identified, a high-confidence recommendation is generated to investigate the overpayment.
- **Test 6: Safe Ignorance of Legacy Pricing (Negative Discrepancy)**
  - **Purpose**: A critical edge-case test. It asserts that if the user's declared spend is *less* than official pricing (e.g., custom enterprise deal, legacy pricing), the rule safely ignores it and does not falsely accuse the user of overpaying.

## Why the Engine Was Tested Independently

The audit engine was intentionally designed as a pure TypeScript pipeline completely decoupled from React components and browser state.

This allowed the recommendation logic to be tested deterministically without mocking the DOM, browser APIs, or asynchronous UI interactions.

Because the savings calculations directly influence financial recommendations, deterministic reproducibility was prioritized over UI-level integration testing during the MVP stage.

## Critical Edge Cases Covered

The suite intentionally tests edge cases that could create misleading financial recommendations:

- Negative pricing discrepancies caused by legacy enterprise discounts
- Existing annual billing plans incorrectly receiving duplicate optimization recommendations
- Tools with custom pricing overrides
- Zero-savings audit scenarios
- Empty recommendation arrays
- Mixed billing cycles across tools

## Continuous Integration Strategy

GitHub Actions automatically runs linting, typechecking, and the Vitest suite on every push.

This ensures recommendation logic changes cannot silently introduce incorrect financial calculations before deployment.

## Future Test Expansion

If the project evolved beyond MVP scope, the next testing priorities would include:

- End-to-end Playwright flows for the complete audit journey
- API contract testing for persistence and sharing routes
- Snapshot testing for public result pages
- Accessibility regression testing
- Load testing for concurrent audit execution
