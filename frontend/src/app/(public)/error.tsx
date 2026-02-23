'use client';

import { ButtonWithTransition } from "@/components/ButtonWithTransition";

interface ErrorDigest extends Error {
  digest?: string;
}

interface Props {
  error: ErrorDigest;
  reset: () => void;
}

const ErrorBoundary = ({ error, reset }: Props) => {
  console.error(error);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <p className="">Something went wrong. Please try again.</p>
      <div className="mt-10">
        <ButtonWithTransition className="h-44 bg-accent rounded-sm px-10" onClick={reset}>Try again</ButtonWithTransition>
      </div>
    </div>
  )
}

export default ErrorBoundary;