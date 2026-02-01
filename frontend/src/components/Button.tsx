'use client';

import React, { useTransition } from 'react';

export const Button = ({ children, onClick, ...rest }: React.ComponentProps<'button'>) => {
  const [isPending, startTransition] = useTransition();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!onClick) return;
    startTransition(() => onClick(e));
  }

  return (
    <button type="button" onClick={handleClick} disabled={isPending} className="cursor-pointer hover:opacity-60 disabled:cursor-wait" {...rest}>
      {children}
    </button>
  );
}