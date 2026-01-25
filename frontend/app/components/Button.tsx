'use client';

import React from 'react';

export const Button = ({ children, ...rest }: React.ComponentProps<'button'>) => {
  return (
    <button className="cursor-pointer disabled:cursor-wait" type="button" {...rest}>
      {children}
    </button>
  );
}