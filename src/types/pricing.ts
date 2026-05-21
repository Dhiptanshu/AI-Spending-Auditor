export type CurrencyCode = "USD" | "INR";

export type BillingCadence = "monthly" | "annual" | "usage";

export type PricingModel =
  | "free"
  | "per-user"
  | "per-seat"
  | "usage-based"
  | "hybrid"
  | "custom";

export type ToolCategory = "coding" | "writing" | "research" | "data" | "mixed";

export type ToolId =
  | "cursor"
  | "github-copilot"
  | "claude"
  | "chatgpt"
  | "anthropic-api"
  | "openai-api"
  | "gemini"
  | "windsurf"
  | "v0";

export type PriceSource = {
  url: string;
  verifiedAt: string;
};

export type FixedPrice = {
  kind: "fixed";
  amountMonthly: number;
  currency: CurrencyCode;
  billingCadence: Exclude<BillingCadence, "usage">;
  estimatedUsdMonthly?: number;
};

export type UsagePriceUnit =
  | "input-tokens"
  | "output-tokens"
  | "cached-input-tokens"
  | "cache-write-tokens"
  | "cache-read-tokens";

export type UsagePrice = {
  kind: "usage";
  unit: UsagePriceUnit;
  pricePerMillionTokens: number;
  currency: CurrencyCode;
};

export type CustomPrice = {
  kind: "custom";
  reason:
    | "enterprise"
    | "negotiated"
    | "manual-override"
    | "missing-public-api-pricing";
};

export type PricingEntry = FixedPrice | UsagePrice | CustomPrice;

export type ToolPlanConfig = {
  id: string;
  label: string;
  aliases?: string[];
  pricingModel: PricingModel;
  pricing: PricingEntry[];
  allowsManualOverride?: boolean;
  requiresCustomPricing?: boolean;
  source: PriceSource;
  metadata?: {
    isApiPlan?: boolean;
    isDeprecated?: boolean;
    supportsAnnualBilling?: boolean;
    notes?: string;
  };
};

export type ToolPricingConfig = {
  id: ToolId;
  name: string;
  category: ToolCategory;
  plans: ToolPlanConfig[];
};
