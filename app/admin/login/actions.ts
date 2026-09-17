'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export interface LoginResult {
  error?: string;
}

export async function login(formData: FormData): Promise<LoginResult> {
  const email = String(formData.get('email') || '').trim();
  const password = String(formData.get('password') || '');
  const redirectTo = String(formData.get('redirectTo') || '/admin');

  if (!email || !password) {
    return { error: 'Email et mot de passe requis.' };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    // Message volontairement générique : ne pas révéler si c'est l'email
    // ou le mot de passe qui est incorrect (évite l'énumération de comptes).
    return { error: 'Identifiants incorrects.' };
  }

  revalidatePath('/admin', 'layout');
  redirect(redirectTo.startsWith('/admin') ? redirectTo : '/admin');
}

export async function logout(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/admin', 'layout');
  redirect('/admin/login');
}
