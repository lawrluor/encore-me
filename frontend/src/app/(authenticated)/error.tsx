'use client';

import { Button } from "@/components/Button";

const ErrorBoundary = ({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) => {
  console.error(error);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <p className="">Something went wrong. Please try again.</p>
      <div className="mt-10">
        <Button className="h-44 bg-accent rounded-sm px-10" onClick={() => reset()}>Try again</Button>
      </div>
    </div>
  )
}

export default ErrorBoundary;