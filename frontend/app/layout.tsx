import type { Metadata } from "next";
import { Inter } from "next/font/google";

// import { AuthProvider } from "./context/AuthProvider";
import { QueryProvider } from "./providers/QueryProvider";

import "./globals.css";

const inter = Inter({
  variable: "--inter",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Encore Me",
  description: "For audiences to share a stage with live musicians",
};

export default function RootLayout({ children }: Readonly<{ children?: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${inter.variable} antialiased`}
      >
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
