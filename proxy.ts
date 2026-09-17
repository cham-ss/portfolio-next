import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Sécurité : ce middleware tourne côté serveur AVANT le rendu de toute page /admin.
 * Un utilisateur non authentifié ne reçoit jamais le HTML du dashboard — il est
 * redirigé vers /admin/login avant que quoi que ce soit ne soit généré.
 */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === '/admin/login';
  const isAdminRoute = pathname.startsWith('/admin');

  if (isAdminRoute && !isLoginPage && !user) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Un utilisateur déjà connecté qui va sur /admin/login est renvoyé au dashboard
  if (isLoginPage && user) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};
