'use client';

import React from 'react';

export const Button = ({ children, ...rest }: React.ComponentProps<'button'>) => {
  return (
    <button type="button" className="cursor-pointer hover:opacity-60 disabled:cursor-wait" {...rest}>
      {children}
    </button>
  );
}