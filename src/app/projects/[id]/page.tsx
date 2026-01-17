import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { loadProjects } from '@/utils/loadProjects';
import Markdown from '@/components/Markdown';
import MetaPanel from '@/components/MetaPanel';
import MolstarSection from './MolstarSection';

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const projects = await loadProjects();
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  const pdb =
    project.target.pdb ?? project.proteins.find((x) => x.pdb)?.pdb ?? null;

  return (
    <div className="space-y-8 h-full overflow-auto px-8 pb-4">
      {/* Back */}
      <div>
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 active:scale-[0.99] transition"
        >
          <span aria-hidden>←</span>
          Back to explore
        </Link>
      </div>

      {/* Hero */}
      <section className="card overflow-hidden">
        <div className="grid gap-6 p-6 lg:grid-cols-[1fr_380px] lg:items-start">
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {project.title}
            </h1>

            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              <span className="font-semibold text-slate-900">
                {project.category}
              </span>
              <span className="mx-2 text-slate-300">•</span>
              <span className="text-slate-700">{project.partner}</span>
              <span className="mx-2 text-slate-300">•</span>
              <span>{project.publishedDate}</span>
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.slice(0, 10).map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
            <Image
              src={`/${project.imageUrl}`}
              alt={project.title}
              width={760}
              height={520}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Main */}
      <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
        {/* Left */}
        <div className="space-y-6">
          {/* Viewer */}
          <section className="card overflow-hidden">
            <div className="card-header flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-900">
                3D Structure
              </div>
              <div className="text-xs font-medium text-slate-500">
                {pdb ? `PDB ${pdb}` : 'No structure'}
              </div>
            </div>

            {/* Don’t pad around Mol* too much – it already has UI density */}
            <div className="p-4 sm:p-5">
              {pdb ? (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <MolstarSection pdbId={pdb} />
                </div>
              ) : (
                <p className="text-sm text-slate-600">
                  No PDB structure is available for this project’s
                  target/proteins.
                </p>
              )}
            </div>
          </section>

          {/* Overview */}
          <section className="card">
            <div className="card-header">
              <div className="text-sm font-semibold text-slate-900">
                Overview
              </div>
            </div>

            <div className="p-5">
              <Markdown markdown={project.description} />
            </div>
          </section>
        </div>

        {/* Right */}
        <div className="space-y-6 lg:sticky lg:top-24">
          <MetaPanel project={project} />
        </div>
      </div>
    </div>
  );
}
