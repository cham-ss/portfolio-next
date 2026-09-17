import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './types';

/**
 * Client Supabase utilisé dans les Client Components (formulaires, upload d'image, login).
 * N'utilise QUE la clé publique "anon" — jamais la clé service_role côté client.
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
