import type { ToolId } from "@/types/pricing";

export const PRIMARY_USE_CASES = [
  "coding",
  "writing",
  "data",
  "research",
  "mixed",
] as const;

export type PrimaryUseCase = (typeof PRIMARY_USE_CASES)[number];

export const SUPPORTED_AUDIT_TOOL_IDS = [
  "cursor",
  "github-copilot",
  "claude",
  "chatgpt",
  "anthropic-api",
  "openai-api",
  "gemini",
  "windsurf",
  "v0",
] as const satisfies ToolId[];
