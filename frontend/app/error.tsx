'use client';

import Link from "next/link";

const Error = () => {
  return (<h2 className="text-red-500">Something went wrong. Please try again later. <Link href="/">Back to home</Link></h2>)
}

export default Error;