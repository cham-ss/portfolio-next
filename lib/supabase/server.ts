import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from './types';

/**
 * Client Supabase pour Server Components / Server Actions / Route Handlers.
 * Lit/écrit la session via les cookies HTTP-only gérés par Supabase — le token
 * de session n'est JAMAIS accessible en JavaScript côté client.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Appelé depuis un Server Component (pas une Server Action) :
            // l'écriture de cookie est ignorée, le middleware s'en charge.
          }
        },
      },
    }
  );
}
