import { z } from "zod";

const envSchema = z.object({
  GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1, "GOOGLE_GENERATIVE_AI_API_KEY is required"),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url("NEXT_PUBLIC_SUPABASE_URL must be a valid URL"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, "NEXT_PUBLIC_SUPABASE_ANON_KEY is required"),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, "SUPABASE_SERVICE_ROLE_KEY is required for backend API routes"),
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required for transactional emails"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("❌ Invalid environment variables:", JSON.stringify(_env.error.format(), null, 2));
  throw new Error("Invalid environment variables. Check your .env.local file.");
}

export const env = _env.data;
