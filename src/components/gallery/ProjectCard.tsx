'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import type { Project } from '@/types/project';

export function ProjectCard({
  project,
  subtitle,
}: {
  project: Project;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
    >
      <Link
        href={`/projects/${project.id}`}
        className={clsx(
          'group block overflow-hidden rounded-2xl',
          'border border-slate-200 bg-white shadow-sm',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 focus-visible:ring-offset-2'
        )}
      >
        <div className="aspect-[16/10] overflow-hidden bg-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/${project.imageUrl}`}
            alt={project.title ?? project.id}
            className="h-full w-full object-cover will-change-transform transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>

        <div className="p-4">
          <div className="text-xs font-medium text-slate-500">
            {project.category} <span className="mx-1 text-slate-300">•</span>{' '}
            {project.publishedDate}
          </div>

          <h3 className="mt-1 truncate text-base font-semibold tracking-tight text-slate-900">
            {project.title ?? project.id}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm text-slate-600">
            {subtitle ?? project.description ?? ''}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className={clsx(
                  'inline-flex max-w-full items-center rounded-full',
                  'border border-slate-200 bg-slate-50 px-2.5 py-1',
                  'text-[11px] font-medium text-slate-700'
                )}
              >
                <span className="min-w-0 truncate">{t}</span>
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
