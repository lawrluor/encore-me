import Link from 'next/link';
import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  href: string | { pathname: string; query: Record<string, string> };
}

export const CustomLink = ({ children, className, href, ...props }: Props) => {
  return <Link href={href} className={`inline-block hover:opacity-60 transition-all duration-[0.15s] ease-in shadow-xs ${className}`} {...props}>{children}</Link>
}