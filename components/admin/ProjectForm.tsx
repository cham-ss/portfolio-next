'use client';

import { FormEvent, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { CATEGORIES, slugify, validateProject, type ProjectFormValues } from '@/lib/validation';
import ImageUpload from './ImageUpload';
import type { ProjectRow } from '@/lib/supabase/types';
import type { ActionResult } from '@/app/admin/(protected)/projects/actions';

interface ProjectFormProps {
  action: (formData: FormData) => Promise<ActionResult>;
  initialProject?: ProjectRow;
  submitLabel: string;
}

export default function ProjectForm({ action, initialProject, submitLabel }: ProjectFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalMessage, setGlobalMessage] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(!!initialProject);

  const [title, setTitle] = useState(initialProject?.title || '');
  const [slug, setSlug] = useState(initialProject?.slug || '');

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setGlobalMessage(null);

    const formData = new FormData(e.currentTarget);
    const values: ProjectFormValues = {
      title: String(formData.get('title') || ''),
      slug: String(formData.get('slug') || ''),
      shortDescription: String(formData.get('shortDescription') || ''),
      description: String(formData.get('description') || ''),
      category: String(formData.get('category') || ''),
      technologies: String(formData.get('technologies') || ''),
      projectDate: String(formData.get('projectDate') || ''),
      githubUrl: String(formData.get('githubUrl') || ''),
      demoUrl: String(formData.get('demoUrl') || ''),
      documentationUrl: String(formData.get('documentationUrl') || ''),
      published: formData.get('published') === 'on',
      featured: formData.get('featured') === 'on',
    };

    const clientErrors = validateProject(values);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }
    setErrors({});

    startTransition(async () => {
      const result = await action(formData);
      // Si l'action réussit, elle redirige elle-même côté serveur.
      if (result && !result.success) {
        setErrors(result.errors || {});
        if (result.message) setGlobalMessage(result.message);
      }
    });
  }

  return (
    <form className="admin-project-form" onSubmit={handleSubmit} noValidate>
      {globalMessage && (
        <div className="admin-form-error">
          <i className="fas fa-triangle-exclamation" /> {globalMessage}
        </div>
      )}

      <div className="admin-form-grid">
        <div className="admin-form-main">
          <div className="form-group">
            <label htmlFor="title">Project title *</label>
            <input
              id="title"
              name="title"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
            />
            {errors.title && <span className="admin-field-error">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="slug">Slug *</label>
            <input
              id="slug"
              name="slug"
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(e.target.value);
              }}
              required
            />
            {errors.slug && <span className="admin-field-error">{errors.slug}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="shortDescription">Short description *</label>
            <textarea
              id="shortDescription"
              name="shortDescription"
              defaultValue={initialProject?.short_description}
              maxLength={220}
              required
              style={{ minHeight: 70 }}
            />
            {errors.shortDescription && <span className="admin-field-error">{errors.shortDescription}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Full description</label>
            <textarea
              id="description"
              name="description"
              defaultValue={initialProject?.description || ''}
              style={{ minHeight: 140 }}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select id="category" name="category" defaultValue={initialProject?.category || CATEGORIES[0]} required>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.category && <span className="admin-field-error">{errors.category}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="projectDate">Project date</label>
              <input
                type="date"
                id="projectDate"
                name="projectDate"
                defaultValue={initialProject?.project_date || ''}
              />
              {errors.projectDate && <span className="admin-field-error">{errors.projectDate}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="technologies">Technologies (séparées par des virgules)</label>
            <input
              id="technologies"
              name="technologies"
              placeholder="React, Node.js, MongoDB"
              defaultValue={initialProject?.technologies?.join(', ') || ''}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="githubUrl">GitHub URL</label>
              <input type="url" id="githubUrl" name="githubUrl" defaultValue={initialProject?.github_url || ''} />
              {errors.githubUrl && <span className="admin-field-error">{errors.githubUrl}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="demoUrl">Live Demo URL</label>
              <input type="url" id="demoUrl" name="demoUrl" defaultValue={initialProject?.demo_url || ''} />
              {errors.demoUrl && <span className="admin-field-error">{errors.demoUrl}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="documentationUrl">Documentation URL</label>
            <input
              type="url"
              id="documentationUrl"
              name="documentationUrl"
              defaultValue={initialProject?.documentation_url || ''}
            />
            {errors.documentationUrl && <span className="admin-field-error">{errors.documentationUrl}</span>}
          </div>
        </div>

        <div className="admin-form-side">
          <div className="admin-form-side-block">
            <label>Image</label>
            <ImageUpload name="imageUrl" initialUrl={initialProject?.image_url} />
          </div>

          <div className="admin-form-side-block">
            <label className="admin-checkbox-row">
              <input type="checkbox" name="published" defaultChecked={initialProject?.published ?? false} />
              Published
            </label>
            <label className="admin-checkbox-row">
              <input type="checkbox" name="featured" defaultChecked={initialProject?.featured ?? false} />
              Featured
            </label>
          </div>
        </div>
      </div>

      <div className="admin-form-actions">
        <button type="button" className="admin-btn-ghost-sm" onClick={() => router.push('/admin/projects')}>
          Cancel
        </button>
        <button className="btn-admin-primary" type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <i className="fas fa-spinner fa-spin" /> Saving...
            </>
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </form>
  );
}
