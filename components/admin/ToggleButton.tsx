'use client';

import { useTransition } from 'react';

interface ToggleButtonProps {
  id: string;
  current: boolean;
  action: (id: string, current: boolean) => Promise<void>;
  labelOn: string;
  labelOff: string;
  iconOn: string;
  iconOff: string;
}

export default function ToggleButton({ id, current, action, labelOn, labelOff, iconOn, iconOff }: ToggleButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      className={`admin-status-pill ${current ? 'on' : 'off'}`}
      disabled={isPending}
      onClick={() => startTransition(async () => { await action(id, current); })}
    >
      <i className={`fas ${current ? iconOn : iconOff}`} />
      {current ? labelOn : labelOff}
    </button>
  );
}
