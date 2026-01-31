'use client';

import React, { useFormStatus } from 'react-dom';

// import { Spinner } from './Spinner';

type FormSubmitterProps = {
  children: React.ReactNode;
}

type FormSubmitButtonProps = {
  title: string;
  spinner?: boolean;
}

export const FormSubmitter = ({ children }: FormSubmitterProps) => {
  const { pending } = useFormStatus();

  return ( 
  	<>
  		{pending ? <p>loading...</p> : children}
  	</>
  )	
}


export const FormSubmitButton = ({ title, spinner=false }: FormSubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className="p-5 bg-accent-muted cursor-pointer disabled:bg-gray-500 disabled:cursor-wait">{title}</button>
  )
}