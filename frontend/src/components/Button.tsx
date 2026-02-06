'use client';

import React, { useTransition } from 'react';

interface Props extends React.ComponentProps<'button'> {
  children: React.ReactNode;
  className?: string;
}

export const Button = ({ children, type = "button", onClick, className = "", ...rest }: Props) => {
  const [isPending, startTransition] = useTransition();

  // TODO: refactor to make onClick not require browser event paramater
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!onClick) return;
    startTransition(() => onClick(e));
  }

  return (
    <button type={type} onClick={handleClick} disabled={isPending} className={`cursor-pointer hover:opacity-60 disabled:cursor-wait transition-all duration-[0.15s] ease-in shadow-2xl ${className}`} {...rest}>
      {children}
    </button>
  );
}