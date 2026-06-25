import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Server-only Supabase client using the service-role key. It bypasses RLS, so
 * it must NEVER be imported into a client component.
 *
 * Returns null when the service-role key is not configured, so callers can
 * fail gracefully instead of crashing at import time.
 */
export const getSupabaseAdmin = (): SupabaseClient | null => {
  if (!url || !serviceKey) return null;

  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
};
