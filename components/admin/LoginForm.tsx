'use client';

import { FormEvent, useState, useTransition } from 'react';
import type { LoginResult } from '@/app/admin/login/actions';

interface LoginFormProps {
  loginAction: (formData: FormData) => Promise<LoginResult>;
  redirectTo: string;
}

export default function LoginForm({ loginAction, redirectTo }: LoginFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set('redirectTo', redirectTo);
    setError(null);

    startTransition(async () => {
      const result = await loginAction(formData);
      if (result?.error) setError(result.error);
      // En cas de succès, loginAction() appelle redirect() côté serveur,
      // Next.js s'occupe de la navigation automatiquement.
    });
  }

  return (
    <div className="admin-auth-page">
      <div className="admin-auth-card">
        <div className="admin-auth-logo">
          <i className="fas fa-shield-halved" />
          <span>Admin</span>
        </div>
        <h1>Connexion</h1>
        <p className="admin-auth-sub">Accès réservé à l&apos;administrateur du portfolio.</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required autoComplete="username" autoFocus />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" name="password" required autoComplete="current-password" />
          </div>

          {error && (
            <div className="admin-form-error" role="alert">
              <i className="fas fa-triangle-exclamation" /> {error}
            </div>
          )}

          <button className="btn-submit" type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <i className="fas fa-spinner fa-spin" /> Connexion...
              </>
            ) : (
              <>
                <i className="fas fa-right-to-bracket" /> Sign in
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
