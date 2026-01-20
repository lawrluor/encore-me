'use client';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = ({ error, reset }: Props) => {
  return <div>
    <p>An unexpected error occurred</p>
    <p>{error.message}</p>
    <button onClick={reset}>Try again</button>
  </div>
}

export default Error;