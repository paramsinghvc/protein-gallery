'use client';

import type { Project } from '@/types/project';
import { ProjectCard } from '@/components/gallery/ProjectCard';
import { AnimatePresence, motion } from 'framer-motion';

// GalleryGrid.tsx
export default function GalleryGrid({ projects }: { projects: Project[] }) {
  return (
    <motion.section
      aria-label="Projects"
      className="h-full w-full min-w-0 overflow-y-auto overflow-x-hidden pr-2 [scrollbar-gutter:stable] grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      layout
      layoutRoot
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      <AnimatePresence mode="popLayout">
        {projects.map((p) => (
          <motion.div
            key={p.id}
            layout
            className="min-w-0"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <ProjectCard project={p} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.section>
  );
}
