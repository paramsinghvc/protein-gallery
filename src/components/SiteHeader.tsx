'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const nav = [
  { href: '/showcase', label: 'Showcase' },
  { href: '/explore', label: 'Explore' },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-5 sm:px-8">
        {/* Logo */}
        <Link
          href="/showcase"
          className="flex items-center gap-3 font-semibold tracking-tight"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500 text-white">
            L
          </span>
          <span className="text-base hidden sm:block sm:text-lg">
            Latent Labs Protein Gallery
          </span>
        </Link>

        {/* Navigation */}
        <nav aria-label="Primary" className="flex items-center gap-2">
          {nav.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + '/');

            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'rounded-full px-5 py-2 text-sm transition',
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-700 font-medium'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
