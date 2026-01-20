'use client';

import React from 'react';

type Props = {
  children: React.ReactNode;
  callback: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ callback, children, ...rest }: Props) => {
  return (
    <button className="cursor-pointer disabled:cursor-wait" type="button" onClick={callback} {...rest}>
      {children}
    </button>
  );
}