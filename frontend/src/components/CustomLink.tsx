import Link from 'next/link';
import React from 'react';

type Props = {
  children: React.ReactNode;
  href: string;
}

export const CustomLink = ({ children, href, ...props }: Props) => {
  return <Link href={href} className="hover:opacity-60 transition-all duration-[0.15s] ease=in" {...props}>{children}</Link>
}