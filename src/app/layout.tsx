import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import SiteHeader from '../components/SiteHeader';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Protein Design Showcase',
  description: 'Gallery of protein design projects powered by Latent Labs',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen h-full overflow-hidden`}
      >
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[999] focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        <div className="flex h-screen flex-col">
          <SiteHeader />
          <main
            id="content"
            className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10 flex-1 overflow-hidden"
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
