'use client';

import { useRef, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

const MAX_SIZE_MB = 4;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

interface ImageUploadProps {
  name: string; // nom du champ hidden qui portera l'URL finale
  initialUrl?: string | null;
}

export default function ImageUpload({ name, initialUrl }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(initialUrl || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string>(initialUrl || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Format non supporté. Utilise JPG, PNG, WEBP ou GIF.');
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Fichier trop volumineux (max ${MAX_SIZE_MB} Mo).`);
      return;
    }

    // Preview immédiate avant même la fin de l'upload
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);
    setUploading(true);

    try {
      const supabase = createClient();
      const ext = file.name.split('.').pop();
      const path = `${crypto.randomUUID()}.${ext}`;

      const { error: uploadError } = await supabase.storage.from('project-images').upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('project-images').getPublicUrl(path);
      setUrl(data.publicUrl);
    } catch (err) {
      setError(
        err instanceof Error
          ? `Échec de l'upload : ${err.message}`
          : "Échec de l'upload. Vérifie que le bucket 'project-images' existe et est public."
      );
      setPreview(initialUrl || null);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="admin-image-upload">
      <input type="hidden" name={name} value={url} />
      <div className="admin-image-upload-preview" onClick={() => fileInputRef.current?.click()}>
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Aperçu" />
        ) : (
          <div className="admin-image-upload-placeholder">
            <i className="fas fa-image" />
            <span>Cliquer pour choisir une image</span>
          </div>
        )}
        {uploading && (
          <div className="admin-image-upload-overlay">
            <i className="fas fa-spinner fa-spin" /> Upload...
          </div>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept={ALLOWED_TYPES.join(',')}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <button type="button" className="admin-btn-ghost-sm" onClick={() => fileInputRef.current?.click()}>
        <i className="fas fa-upload" /> {preview ? "Changer l'image" : 'Choisir une image'}
      </button>
      {error && (
        <div className="admin-form-error small">
          <i className="fas fa-triangle-exclamation" /> {error}
        </div>
      )}
    </div>
  );
}
