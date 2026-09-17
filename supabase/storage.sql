-- ============================================================
-- STORAGE — bucket "project-images"
-- ============================================================
-- Étape manuelle préalable requise dans l'interface Supabase :
-- Storage > New bucket > nom: "project-images" > Public bucket: ON
-- (voir instructions détaillées données à la fin de la conversation)
--
-- Ensuite, exécute ce SQL pour autoriser :
-- - la lecture publique des images (nécessaire pour les afficher sur le site)
-- - l'upload / suppression uniquement par un utilisateur authentifié (toi)

drop policy if exists "public_read_project_images" on storage.objects;
create policy "public_read_project_images"
  on storage.objects
  for select
  to public
  using (bucket_id = 'project-images');

drop policy if exists "authenticated_upload_project_images" on storage.objects;
create policy "authenticated_upload_project_images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'project-images');

drop policy if exists "authenticated_update_project_images" on storage.objects;
create policy "authenticated_update_project_images"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'project-images');

drop policy if exists "authenticated_delete_project_images" on storage.objects;
create policy "authenticated_delete_project_images"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'project-images');
