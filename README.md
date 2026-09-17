# Portfolio — Chamsoudine TAIROU (Next.js + Supabase)

Portfolio cybersécurité avec dashboard d'administration privé (`/admin`) connecté
à une vraie base de données Supabase (PostgreSQL + Auth + Storage).

## Développement local

```bash
npm install
cp .env.example .env.local   # puis remplis les valeurs (voir guide de config)
npm run dev
```

## Build de production

```bash
npm run build
npm run start
```

## Structure

```
app/
  page.tsx                     → page d'accueil publique (Server Component, lit Supabase)
  projects/[slug]/page.tsx     → page de détail d'un projet
  admin/
    login/                     → page de connexion (hors protection)
    (protected)/               → tout ce qui nécessite une session admin
      layout.tsx                 → sidebar + vérification de session
      page.tsx                   → dashboard (stats)
      projects/
        page.tsx                  → liste des projets (table)
        actions.ts                 → Server Actions CRUD sécurisées
        new/page.tsx                → formulaire d'ajout
        [id]/edit/page.tsx          → formulaire d'édition
proxy.ts                        → protège /admin côté serveur (ex-middleware.ts)
lib/
  supabase/client.ts            → client Supabase navigateur (clé anon uniquement)
  supabase/server.ts            → client Supabase serveur (cookies de session)
  supabase/types.ts             → typage du schéma "projects"
  projects.ts                   → lecture publique des projets (SELECT published=true)
  validation.ts                 → validation partagée client + serveur
components/
  admin/                       → composants du dashboard (formulaire, upload, table...)
  ...                          → composants du site public (inchangés)
data/
  skills.ts                    → compétences (toujours statique, volontairement)
  projects.ts                  → ancien contenu statique, gardé pour data/migrate uniquement
supabase/
  schema.sql                   → table "projects" + Row Level Security
  storage.sql                  → politiques du bucket d'images
scripts/
  migrate-projects.ts          → migre les 6 projets historiques vers Supabase
```

## Sécurité — ce qui est en place

- **RLS Postgres** : les visiteurs anonymes ne peuvent lire QUE les projets
  `published = true`. Seul un utilisateur authentifié peut lire les brouillons,
  créer, modifier ou supprimer — appliqué au niveau de la base de données,
  pas seulement du frontend.
- **`proxy.ts`** (ex-middleware) bloque toute page `/admin/*` côté serveur
  avant même qu'elle ne soit rendue, si aucune session valide n'est trouvée.
- **Chaque Server Action** (`app/admin/(protected)/projects/actions.ts`)
  revérifie l'authentification indépendamment du routing, en défense en profondeur.
- **Aucun secret côté client** : le client navigateur (`lib/supabase/client.ts`)
  n'utilise que la clé publique `anon`, jamais la clé `service_role`.
- **Validation double** (client pour le retour immédiat, serveur pour la
  vraie garantie) dans `lib/validation.ts`.
- **Upload d'images** limité en taille (4 Mo) et en type de fichier
  (jpg/png/webp/gif), stocké dans Supabase Storage (pas de blob en base).

## Configuration requise avant déploiement

Voir le guide détaillé fourni séparément pour :
1. Créer le projet Supabase
2. Exécuter `supabase/schema.sql` puis `supabase/storage.sql`
3. Créer le bucket `project-images` (public)
4. Créer ton compte administrateur
5. Configurer les variables d'environnement (`.env.example`)
6. Migrer tes projets existants (`npm run migrate:projects`)
7. Déployer sur Vercel
