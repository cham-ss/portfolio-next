'use client';

import { useState, useTransition } from 'react';

interface DeleteProjectButtonProps {
  projectId: string;
  projectTitle: string;
  deleteAction: (id: string) => Promise<void>;
}

export default function DeleteProjectButton({ projectId, projectTitle, deleteAction }: DeleteProjectButtonProps) {
  const [confirming, setConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (confirming) {
    return (
      <div className="admin-confirm-inline">
        <span>Supprimer « {projectTitle} » ?</span>
        <button
          className="admin-btn-danger-sm"
          disabled={isPending}
          onClick={() => startTransition(async () => { await deleteAction(projectId); })}
        >
          {isPending ? '...' : 'Delete'}
        </button>
        <button className="admin-btn-ghost-sm" onClick={() => setConfirming(false)} disabled={isPending}>
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button className="admin-icon-btn danger" title="Delete" onClick={() => setConfirming(true)}>
      <i className="fas fa-trash" />
    </button>
  );
}
