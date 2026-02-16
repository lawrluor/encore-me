// For buttons inside forms (with type="submit")

'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';

// import { Spinner } from './Spinner';

interface FormSubmitterProps extends React.ComponentProps<'button'> {
  children: React.ReactNode;
  className?: string;
}

interface FormSubmitButtonProps extends React.ComponentProps<'button'> {
  children: React.ReactNode;
  className?: string;
}

export const FormSubmitter = ({ children, className = "", ...props }: FormSubmitterProps) => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" {...props} disabled={pending} className={`cursor-pointer hover:opacity-60 disabled:cursor-wait disabled:opacity-60 ${className}`}>{children}</button>
  )
}

export const FormSubmitButton = ({ children, className = "", ...props }: FormSubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} {...props} className={`h-44 px-10 bg-accent rounded-md cursor-pointer hover:opacity-60 disabled:opacity-60 disabled:cursor-wait ${className}`}>{children}</button>
  )
}