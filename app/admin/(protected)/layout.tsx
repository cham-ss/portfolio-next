import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { logout } from '../login/actions';
import ThemeToggle from '@/components/ThemeToggle';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Le middleware protège déjà /admin, mais on revérifie ici en défense en
  // profondeur (au cas où ce layout serait un jour rendu sans passer par le middleware).
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <i className="fas fa-shield-halved" />
          <span>Admin</span>
        </div>
        <nav className="admin-nav">
          <a href="/admin">
            <i className="fas fa-gauge" /> <span>Dashboard</span>
          </a>
          <a href="/admin/projects">
            <i className="fas fa-diagram-project" /> <span>Projects</span>
          </a>
        </nav>
        <div className="admin-sidebar-footer">
          <div className="admin-sidebar-user">
            <i className="fas fa-user-circle" />
            <span>{user.email}</span>
          </div>
          <form action={logout}>
            <button className="admin-logout-btn" type="submit">
              <i className="fas fa-arrow-right-from-bracket" /> <span>Logout</span>
            </button>
          </form>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <a href="/" className="admin-view-site">
            <i className="fas fa-arrow-left" /> Voir le site public
          </a>
          <ThemeToggle />
        </header>
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
