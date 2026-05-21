import type { ToolPricingConfig } from "@/types/pricing";

const VERIFIED_AT = "2026-05-21";

export const TOOL_PRICING_CONFIG = [
  {
    id: "cursor",
    name: "Cursor",
    category: "coding",
    plans: [
      {
        id: "hobby",
        label: "Hobby",
        pricingModel: "free",
        pricing: [
          {
            kind: "fixed",
            amountMonthly: 0,
            currency: "USD",
            billingCadence: "monthly",
          },
        ],
        source: { url: "https://cursor.com/pricing", verifiedAt: VERIFIED_AT },
      },
      {
        id: "individual-pro",
        label: "Individual Pro",
        aliases: ["Pro"],
        pricingModel: "per-user",
        pricing: [
          {
            kind: "fixed",
            amountMonthly: 20,
            currency: "USD",
            billingCadence: "monthly",
          },
          {
            kind: "fixed",
            amountMonthly: 16,
            currency: "USD",
            billingCadence: "annual",
          },
        ],
        allowsManualOverride: true,
        source: { url: "https://cursor.com/pricing", verifiedAt: VERIFIED_AT },
        metadata: {
          supportsAnnualBilling: true,
          notes: "$16/user/month when billed yearly.",
        },
      },
      {
        id: "individual-pro-plus",
        label: "Individual Pro+",
        pricingModel: "per-user",
        pricing: [
          {
            kind: "fixed",
            amountMonthly: 60,
            currency: "USD",
            billingCadence: "monthly",
          },
          {
            kind: "fixed",
            amountMonthly: 48,
            currency: "USD",
            billingCadence: "annual",
          },
        ],
        allowsManualOverride: true,
        source: { url: "https://cursor.com/pricing", verifiedAt: VERIFIED_AT },
        metadata: {
          supportsAnnualBilling: true,
          notes: "$48/user/month when billed yearly.",
        },
      },
      {
        id: "individual-ultra",
        label: "Individual Ultra",
        pricingModel: "per-user",
        pricing: [
          {
            kind: "fixed",
            amountMonthly: 200,
            currency: "USD",
            billingCadence: "monthly",
          },
          {
            kind: "fixed",
            amountMonthly: 160,
            currency: "USD",
            billingCadence: "annual",
          },
        ],
        allowsManualOverride: true,
        source: { url: "https://cursor.com/pricing", verifiedAt: VERIFIED_AT },
        metadata: {
          supportsAnnualBilling: true,
          notes: "$160/user/month when billed yearly.",
        },
      },
      {
        id: "teams",
        label: "Teams",
        aliases: ["Business"],
        pricingModel: "per-user",
        pricing: [
          {
            kind: "fixed",
            amountMonthly: 40,
            currency: "USD",
            billingCadence: "monthly",
          },
          {
            kind: "fixed",
            amountMonthly: 32,
            currency: "USD",
            billingCadence: "annual",
          },
        ],
        allowsManualOverride: true,
        source: { url: "https://cursor.com/pricing", verifiedAt: VERIFIED_AT },
        metadata: {
          supportsAnnualBilling: true,
          notes: "$32/user/month when billed yearly.",
        },
      },
      {
        id: "enterprise",
        label: "Enterprise",
        pricingModel: "custom",
        pricing: [{ kind: "custom", reason: "enterprise" }],
        allowsManualOverride: true,
        requiresCustomPricing: true,
        source: { url: "https://cursor.com/pricing", verifiedAt: VERIFIED_AT },
      },
    ],
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    category: "coding",
    plans: [
      {
        id: "free",
        label: "Free",
        pricingModel: "free",
        pricing: [
          {
            kind: "fixed",
            amountMonthly: 0,
            currency: "USD",
            billingCadence: "monthly",
          },
        ],
        source: {
          url: "https://github.com/features/copilot/plans",
          verifiedAt: VERIFIED_AT,
        },
      },
      {
        id: "pro",
        label: "Pro",
        aliases: ["Individual"],
        pricingModel: "per-user",
        pricing: [
          {
            kind: "fixed",
            amountMonthly: 10,
            currency: "USD",
            billingCadence: "monthly",
          },
        ],
        allowsManualOverride: true,
        source: {
          url: "https://github.com/features/copilot/plans",
          verifiedAt: VERIFIED_AT,
        },
      },
      {
        id: "pro-plus",
        label: "Pro+",
        pricingModel: "per-user",
        pricing: [
          {
            kind: "fixed",
            amountMonthly: 39,
            currency: "USD",
            billingCadence: "monthly",
          },
        ],
        allowsManualOverride: true,
        source: {
          url: "https://github.com/features/copilot/plans",
          verifiedAt: VERIFIED_AT,
        },
      },
      {
        id: "business",
        label: "Business",
        pricingModel: "per-user",
        pricing: [
          {
            kind: "fixed",
            amountMonthly: 19,
            currency: "USD",
            billingCadence: "monthly",
          },
        ],
        allowsManualOverride: true,
        source: {
          url: "https://github.com/features/copilot/plans",
          verifiedAt: VERIFIED_AT,
        },
      },
      {
        id: "enterprise",
        label: "Enterprise",
        pricingModel: "per-user",
        pricing: [
          {
            kind: "fixed",
            amountMonthly: 39,
            currency: "USD",
            billingCadence: "monthly",
          },
        ],
        allowsManualOverride: true,
        source: {
          url: "https://github.com/features/copilot/plans",
          verifiedAt: VERIFIED_AT,
        },
      },
    ],
  },
  {
    id: "claude",
    name: "Claude",
    category: "mixed",
    plans: [
      {
        id: "free",
        label: "Free",
        pricingModel: "free",
        pricing: [
          {
            kind: "fixed",
            amountMonthly: 0,
            currency: "USD",
            billingCadence: "monthly",
          },
        ],
        source: { url: "https://claude.com/pricing", verifiedAt: VERIFIED_AT },
      },
      {
        id: "pro",
        label: "Pro",
        pricingModel: "per-user",
        pricing: [
          {
            kind: "fixed",
            amountMonthly: 20,
            currency: "USD",
            billingCadence: "monthly",
          },
          {
            kind: "fixed",
            amountMonthly: 17,
            currency: "USD",
            billingCadence: "annual",
          },
        ],
        allowsManualOverride: true,
        source: { url: "https://claude.com/pricing", verifiedAt: VERIFIED_AT },
        metadata: {
          supportsAnnualBilling: true,
          notes: "$17/user/month when billed yearly.",
        },
      },
      {
        id: "max",
        label: "Max",
        pricingModel: "per-user",
        pricing: [
          {
            kind: "fixed",
            amountMonthly: 100,
            currency: "USD",
            billingCadence: "monthly",
          },
        ],
        allowsManualOverride: true,
        source: { url: "https://claude.com/pricing", verifiedAt: VERIFIED_AT },
        metadata: {
          notes: "Public pricing lists Max as starting from $100/user/month.",
        },
      },
      {
        id: "team-standard",
        label: "Team Standard Seat",
        aliases: ["Team"],
        pricingModel: "per-seat",
        pricing: [
          {
            kind: "fixed",
            amountMonthly: 25,
            currency: "USD",
            billingCadence: "monthly",
          },
          {
            kind: "fixed",
            amountMonthly: 20,
            currency: "USD",
            billingCadence: "annual",
          },
        ],
        allowsManualOverride: true,
        source: {
          url: "https://claude.com/pricing#team-&-enterprise",
          verifiedAt: VERIFIED_AT,
        },
        metadata: {
          supportsAnnualBilling: true,
          notes: "$20/seat/month when billed annually.",
        },
      },
      {
        id: "team-premium",
        label: "Team Premium Seat",
        pricingModel: "per-seat",
        pricing: [
          {
            kind: "fixed",
            amountMonthly: 125,
            currency: "USD",
            billingCadence: "monthly",
          },
          {
            kind: "fixed",
            amountMonthly: 100,
            currency: "USD",
            billingCadence: "annual",
          },
        ],
        allowsManualOverride: true,
        source: {
          url: "https://claude.com/pricing#team-&-enterprise",
          verifiedAt: VERIFIED_AT,
        },
        metadata: {
          supportsAnnualBilling: true,
          notes: "$100/seat/month when billed annually.",
        },
      },
      {
        id: "enterprise",
        label: "Enterprise",
        pricingModel: "hybrid",
        pricing: [
          {
            kind: "fixed",
            amountMonthly: 20,
            currency: "USD",
            billingCadence: "monthly",
          },
          { kind: "custom", reason: "negotiated" },
        ],
        allowsManualOverride: true,
        requiresCustomPricing: true,
        source: {
          url: "https://claude.com/pricing#team-&-enterprise",
          verifiedAt: VERIFIED_AT,
        },
        metadata: { notes: "$20/seat plus API-based usage pricing." },
      },
      {
        id: "api-direct",
        label: "API direct",
        pricingModel: "usage-based",
        pricing: [
          {
            kind: "usage",
            unit: "input-tokens",
            pricePerMillionTokens: 3,
            currency: "USD",
          },
          {
            kind: "usage",
            unit: "output-tokens",
            pricePerMillionTokens: 15,
            currency: "USD",
          },
          {
            kind: "usage",
            unit: "cache-write-tokens",
            pricePerMillionTokens: 3.75,
            currency: "USD",
          },
          {
            kind: "usage",
            unit: "cache-read-tokens",
            pricePerMillionTokens: 0.3,
            currency: "USD",
          },
        ],
        allowsManualOverride: true,
        source: {
          url: "https://claude.com/pricing#api",
          verifiedAt: VERIFIED_AT,
        },
        metadata: {
          isApiPlan: true,
          notes:
            "Uses Sonnet 4.6 standard API pricing as the default app-level API option.",
        },
      },
    ],
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    category: "mixed",
    plans: [
      {
        id: "free",
        label: "Free",
        pricingModel: "free",
        pricing: [
          {
            kind: "fixed",
            amountMonthly: 0,
            currency: "USD",
            billingCadence: "monthly",
          },
        ],
        source: { url: "https://chatgpt.com/pricing", verifiedAt: VERIFIED_AT },
      },
      {
        id: "plus",
        label: "Plus",
        pricingModel: "per-user",
        pricing: [
          {
            kind: "fixed",
            amountMonthly: 1999,
            currency: "INR",
            billingCadence: "monthly",
            estimatedUsdMonthly: 20.78,
          },
        ],
        allowsManualOverride: true,
        source: { url: "https://chatgpt.com/pricing", verifiedAt: VERIFIED_AT },
      },
      {
        id: "team",
        label: "Team",
        aliases: ["Business"],
        pricingModel: "per-user",
        pricing: [
          {
            kind: "fixed",
            amountMonthly: 2250,
            currency: "INR",
            billingCadence: "monthly",
            estimatedUsdMonthly: 23.39,
          },
          {
            kind: "fixed",
            amountMonthly: 1800,
            currency: "INR",
            billingCadence: "annual",
            estimatedUsdMonthly: 18.71,
          },
        ],
        allowsManualOverride: true,
        source: {
          url: "https://chatgpt.com/business/business-plan",
          verifiedAt: VERIFIED_AT,
        },
        metadata: {
          supportsAnnualBilling: true,
          notes: "Business plan is INR 1,800/user/month when billed annually.",
        },
      },
      {
        id: "enterprise",
        label: "Enterprise",
        pricingModel: "custom",
        pricing: [{ kind: "custom", reason: "enterprise" }],
        allowsManualOverride: true,
        requiresCustomPricing: true,
        source: {
          url: "https://chatgpt.com/business/enterprise",
          verifiedAt: VERIFIED_AT,
        },
      },
      {
        id: "api-direct",
        label: "API direct",
        pricingModel: "usage-based",
        pricing: [
          {
            kind: "usage",
            unit: "input-tokens",
            pricePerMillionTokens: 2.5,
            currency: "USD",
          },
          {
            kind: "usage",
            unit: "cached-input-tokens",
            pricePerMillionTokens: 0.25,
            currency: "USD",
          },
          {
            kind: "usage",
            unit: "output-tokens",
            pricePerMillionTokens: 15,
            currency: "USD",
          },
        ],
        allowsManualOverride: true,
        source: {
          url: "https://openai.com/api/pricing",
          verifiedAt: VERIFIED_AT,
        },
        metadata: {
          isApiPlan: true,
          notes:
            "Uses GPT-5.4 standard API pricing as the default ChatGPT API-direct option.",
        },
      },
    ],
  },
  {
    id: "anthropic-api",
    name: "Anthropic API Direct",
    category: "mixed",
    plans: [
      {
        id: "claude-opus-4-7",
        label: "Claude Opus 4.7",
        pricingModel: "usage-based",
        pricing: [
          {
            kind: "usage",
            unit: "input-tokens",
            pricePerMillionTokens: 5,
            currency: "USD",
          },
          {
            kind: "usage",
            unit: "cache-write-tokens",
            pricePerMillionTokens: 6.25,
            currency: "USD",
          },
          {
            kind: "usage",
            unit: "cache-read-tokens",
            pricePerMillionTokens: 0.5,
            currency: "USD",
          },
          {
            kind: "usage",
            unit: "output-tokens",
            pricePerMillionTokens: 25,
            currency: "USD",
          },
        ],
        allowsManualOverride: true,
        source: {
          url: "https://platform.claude.com/docs/en/about-claude/pricing",
          verifiedAt: VERIFIED_AT,
        },
        metadata: { isApiPlan: true },
      },
      {
        id: "claude-sonnet-4-6",
        label: "Claude Sonnet 4.6",
        pricingModel: "usage-based",
        pricing: [
          {
            kind: "usage",
            unit: "input-tokens",
            pricePerMillionTokens: 3,
            currency: "USD",
          },
          {
            kind: "usage",
            unit: "cache-write-tokens",
            pricePerMillionTokens: 3.75,
            currency: "USD",
          },
          {
            kind: "usage",
            unit: "cache-read-tokens",
            pricePerMillionTokens: 0.3,
            currency: "USD",
          },
          {
            kind: "usage",
            unit: "output-tokens",
            pricePerMillionTokens: 15,
            currency: "USD",
          },
        ],
        allowsManualOverride: true,
        source: {
          url: "https://platform.claude.com/docs/en/about-claude/pricing",
          verifiedAt: VERIFIED_AT,
        },
        metadata: { isApiPlan: true },
      },
      {
        id: "claude-haiku-4-5",
        label: "Claude Haiku 4.5",
        pricingModel: "usage-based",
        pricing: [
          {
            kind: "usage",
            unit: "input-tokens",
            pricePerMillionTokens: 1,
            currency: "USD",
          },
          {
            kind: "usage",
            unit: "cache-write-tokens",
            pricePerMillionTokens: 1.25,
            currency: "USD",
          },
          {
            kind: "usage",
            unit: "cache-read-tokens",
            pricePerMillionTokens: 0.1,
            currency: "USD",
          },
          {
            kind: "usage",
            unit: "output-tokens",
            pricePerMillionTokens: 5,
            currency: "USD",
          },
        ],
        allowsManualOverride: true,
        source: {
          url: "https://platform.claude.com/docs/en/about-claude/pricing",
          verifiedAt: VERIFIED_AT,
        },
        metadata: { isApiPlan: true },
      },
    ],
  },
  {
    id: "openai-api",
    name: "OpenAI API Direct",
    category: "mixed",
    plans: [
      {
        id: "gpt-5-5",
        label: "GPT-5.5",
        pricingModel: "usage-based",
        pricing: [
          {
            kind: "usage",
            unit: "input-tokens",
            pricePerMillionTokens: 5,
            currency: "USD",
          },
          {
            kind: "usage",
            unit: "cached-input-tokens",
            pricePerMillionTokens: 0.5,
            currency: "USD",
          },
          {
            kind: "usage",
            unit: "output-tokens",
            pricePerMillionTokens: 30,
            currency: "USD",
          },
        ],
        allowsManualOverride: true,
        source: {
          url: "https://openai.com/api/pricing",
          verifiedAt: VERIFIED_AT,
        },
        metadata: { isApiPlan: true },
      },
      {
        id: "gpt-5-4",
        label: "GPT-5.4",
        pricingModel: "usage-based",
        pricing: [
          {
            kind: "usage",
            unit: "input-tokens",
            pricePerMillionTokens: 2.5,
            currency: "USD",
          },
          {
            kind: "usage",
            unit: "cached-input-tokens",
            pricePerMillionTokens: 0.25,
            currency: "USD",
          },
          {
            kind: "usage",
            unit: "output-tokens",
            pricePerMillionTokens: 15,
            currency: "USD",
          },
        ],
        allowsManualOverride: true,
        source: {
          url: "https://openai.com/api/pricing",
          verifiedAt: VERIFIED_AT,
        },
        metadata: { isApiPlan: true },
      },
      {
        id: "gpt-5-4-mini",
        label: "GPT-5.4 mini",
        pricingModel: "usage-based",
        pricing: [
          {
            kind: "usage",
            unit: "input-tokens",
            pricePerMillionTokens: 0.75,
            currency: "USD",
          },
          {
            kind: "usage",
            unit: "cached-input-tokens",
            pricePerMillionTokens: 0.075,
            currency: "USD",
          },
          {
            kind: "usage",
            unit: "output-tokens",
            pricePerMillionTokens: 4.5,
            currency: "USD",
          },
        ],
        allowsManualOverride: true,
        source: {
          url: "https://openai.com/api/pricing",
          verifiedAt: VERIFIED_AT,
        },
        metadata: { isApiPlan: true },
      },
    ],
  },
  {
    id: "gemini",
    name: "Gemini",
    category: "mixed",
    plans: [
      {
        id: "free",
        label: "Free",
        pricingModel: "free",
        pricing: [
          {
            kind: "fixed",
            amountMonthly: 0,
            currency: "USD",
            billingCadence: "monthly",
          },
        ],
        source: {
          url: "https://gemini.google/subscriptions",
          verifiedAt: VERIFIED_AT,
        },
      },
      {
        id: "pro",
        label: "Google AI Pro",
        aliases: ["Pro"],
        pricingModel: "per-user",
        pricing: [
          {
            kind: "fixed",
            amountMonthly: 1950,
            currency: "INR",
            billingCadence: "monthly",
            estimatedUsdMonthly: 20.25,
          },
        ],
        allowsManualOverride: true,
        source: {
          url: "https://gemini.google/subscriptions",
          verifiedAt: VERIFIED_AT,
        },
      },
      {
        id: "ultra-5x",
        label: "Google AI Ultra 5x",
        aliases: ["Ultra"],
        pricingModel: "per-user",
        pricing: [
          {
            kind: "fixed",
            amountMonthly: 6500,
            currency: "INR",
            billingCadence: "monthly",
            estimatedUsdMonthly: 67.5,
          },
        ],
        allowsManualOverride: true,
        source: {
          url: "https://gemini.google/subscriptions",
          verifiedAt: VERIFIED_AT,
        },
      },
      {
        id: "ultra-20x",
        label: "Google AI Ultra 20x",
        pricingModel: "per-user",
        pricing: [
          {
            kind: "fixed",
            amountMonthly: 19500,
            currency: "INR",
            billingCadence: "monthly",
            estimatedUsdMonthly: 202.5,
          },
        ],
        allowsManualOverride: true,
        source: {
          url: "https://gemini.google/subscriptions",
          verifiedAt: VERIFIED_AT,
        },
      },
      {
        id: "api",
        label: "API",
        pricingModel: "custom",
        pricing: [{ kind: "custom", reason: "missing-public-api-pricing" }],
        allowsManualOverride: true,
        requiresCustomPricing: true,
        source: {
          url: "https://gemini.google/subscriptions",
          verifiedAt: VERIFIED_AT,
        },
        metadata: {
          isApiPlan: true,
          notes:
            "API pricing was not present in PRICING_DATA.md; require user-entered monthly spend.",
        },
      },
    ],
  },
  {
    id: "windsurf",
    name: "Windsurf",
    category: "coding",
    plans: [
      {
        id: "free",
        label: "Free",
        pricingModel: "free",
        pricing: [
          {
            kind: "fixed",
            amountMonthly: 0,
            currency: "USD",
            billingCadence: "monthly",
          },
        ],
        source: {
          url: "https://windsurf.com/pricing",
          verifiedAt: VERIFIED_AT,
        },
      },
      {
        id: "pro",
        label: "Pro",
        pricingModel: "per-user",
        pricing: [
          {
            kind: "fixed",
            amountMonthly: 20,
            currency: "USD",
            billingCadence: "monthly",
          },
        ],
        allowsManualOverride: true,
        source: {
          url: "https://windsurf.com/pricing",
          verifiedAt: VERIFIED_AT,
        },
      },
      {
        id: "max",
        label: "Max",
        pricingModel: "per-user",
        pricing: [
          {
            kind: "fixed",
            amountMonthly: 200,
            currency: "USD",
            billingCadence: "monthly",
          },
        ],
        allowsManualOverride: true,
        source: {
          url: "https://windsurf.com/pricing",
          verifiedAt: VERIFIED_AT,
        },
      },
    ],
  },
  {
    id: "v0",
    name: "v0",
    category: "coding",
    plans: [
      {
        id: "free",
        label: "Free",
        pricingModel: "free",
        pricing: [
          {
            kind: "fixed",
            amountMonthly: 0,
            currency: "USD",
            billingCadence: "monthly",
          },
        ],
        source: { url: "https://v0.app/pricing", verifiedAt: VERIFIED_AT },
      },
      {
        id: "team",
        label: "Team",
        pricingModel: "per-user",
        pricing: [
          {
            kind: "fixed",
            amountMonthly: 30,
            currency: "USD",
            billingCadence: "monthly",
          },
        ],
        allowsManualOverride: true,
        source: { url: "https://v0.app/pricing", verifiedAt: VERIFIED_AT },
      },
      {
        id: "business",
        label: "Business",
        pricingModel: "per-user",
        pricing: [
          {
            kind: "fixed",
            amountMonthly: 100,
            currency: "USD",
            billingCadence: "monthly",
          },
        ],
        allowsManualOverride: true,
        source: { url: "https://v0.app/pricing", verifiedAt: VERIFIED_AT },
      },
      {
        id: "enterprise",
        label: "Enterprise",
        pricingModel: "custom",
        pricing: [{ kind: "custom", reason: "enterprise" }],
        allowsManualOverride: true,
        requiresCustomPricing: true,
        source: { url: "https://v0.app/pricing", verifiedAt: VERIFIED_AT },
      },
    ],
  },
] as const satisfies ToolPricingConfig[];
