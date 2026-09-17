-- ============================================================
-- SCHÉMA "projects" + RLS — à exécuter dans Supabase SQL Editor
-- ============================================================

create extension if not exists "pgcrypto";

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  short_description text not null,
  description text,
  image_url text,
  technologies text[] not null default '{}',
  category text not null,
  project_date date,
  github_url text,
  demo_url text,
  documentation_url text,
  featured boolean not null default false,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Validation basique côté base (défense en profondeur, en plus de la validation app) :
alter table public.projects
  add constraint title_not_empty check (char_length(trim(title)) > 0);
alter table public.projects
  add constraint slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$');
alter table public.projects
  add constraint short_description_not_empty check (char_length(trim(short_description)) > 0);

-- updated_at automatique à chaque modification
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_projects_updated_at on public.projects;
create trigger trg_projects_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
-- Principe : le portfolio n'a qu'un seul administrateur (toi).
-- - Tout le monde (visiteurs anonymes) peut lire les projets PUBLIÉS uniquement.
-- - Seul un utilisateur authentifié (= toi, connecté via /admin/login) peut
--   créer / modifier / supprimer, et peut aussi voir les brouillons.

alter table public.projects enable row level security;

-- Lecture publique : uniquement les projets publiés
drop policy if exists "public_read_published" on public.projects;
create policy "public_read_published"
  on public.projects
  for select
  to anon
  using (published = true);

-- Lecture admin : un utilisateur connecté voit TOUT (y compris les brouillons)
drop policy if exists "authenticated_read_all" on public.projects;
create policy "authenticated_read_all"
  on public.projects
  for select
  to authenticated
  using (true);

-- Écriture admin uniquement (insert / update / delete)
drop policy if exists "authenticated_insert" on public.projects;
create policy "authenticated_insert"
  on public.projects
  for insert
  to authenticated
  with check (true);

drop policy if exists "authenticated_update" on public.projects;
create policy "authenticated_update"
  on public.projects
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "authenticated_delete" on public.projects;
create policy "authenticated_delete"
  on public.projects
  for delete
  to authenticated
  using (true);

-- Index utiles
create index if not exists idx_projects_published on public.projects (published);
create index if not exists idx_projects_featured on public.projects (featured) where featured = true;
create index if not exists idx_projects_slug on public.projects (slug);
