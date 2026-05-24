-- Run this inside your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  company_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  public_share_id TEXT UNIQUE NOT NULL,
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'completed',
  payload JSONB NOT NULL,
  engine_result JSONB NOT NULL,
  ai_summary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE audits ENABLE ROW LEVEL SECURITY;

-- MVP Policies: Allow anyone to insert (from our backend API) and select (for the public share page)
CREATE POLICY "Allow anonymous inserts" ON audits FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read" ON audits FOR SELECT USING (true);
