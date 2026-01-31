'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';

// import { Spinner } from './Spinner';

interface FormSubmitterProps extends React.ComponentProps<'button'> {
  children: React.ReactNode;
  className?: string;
}

type FormSubmitButtonProps = {
  title: string;
}

export const FormSubmitter = ({ children, className = "", ...props }: FormSubmitterProps) => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" {...props} disabled={pending} className={`disabled:cursor-wait disabled:opacity-60 ${className}`}>{children}</button>
  )
}

export const FormSubmitButton = ({ title }: FormSubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className="p-5 bg-accent-muted cursor-pointer hover:opacity-60 disabled:opacity-60 disabled:cursor-wait">{title}</button>
  )
}