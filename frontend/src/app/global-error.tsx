'use client'

import { Inter } from "next/font/google";

import { Button } from "../components/Button";

import "./globals.css";

const inter = Inter({
  variable: "--inter",
  subsets: ["latin"],
  weight: ["400"],
});

export default function GlobalError({
  // error,
  reset,
}: {
  // error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${inter.variable} antialiased`}>
        <main className="flex flex-col items-center justify-center h-screen">
          <h2>Something went wrong. Please try again later.</h2>
          <div className="mt-10">
            <Button className="h-44 bg-accent rounded-sm px-10" onClick={() => reset()}>Try again</Button>
          </div>
        </main>
      </body>
    </html>
  )
}