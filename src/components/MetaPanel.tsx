import type { Project } from '@/types/project';

export default function MetaPanel({ project }: { project: Project }) {
  return (
    <aside className="card">
      <div className="card-header">
        <div className="text-sm font-semibold text-slate-900">
          Project metadata
        </div>
      </div>

      <div className="card-body space-y-6 text-sm">
        {/* Basic metadata */}
        <dl className="space-y-3">
          <Row label="Category" value={project.category} />
          <Row label="Partner" value={project.partner} />
          <Row label="Published" value={project.publishedDate} />
          <Row
            label="Target"
            value={
              project.target.pdb
                ? `${project.target.name} (PDB ${project.target.pdb})`
                : project.target.name
            }
          />
        </dl>

        {/* Metrics */}
        {project.metrics && Object.keys(project.metrics).length > 0 ? (
          <section className="border-t border-slate-200 pt-5">
            <SectionTitle>Metrics</SectionTitle>
            <div className="mt-3 space-y-2">
              {Object.entries(project.metrics).map(([k, v]) => (
                <Row key={k} label={k} value={v} />
              ))}
            </div>
          </section>
        ) : null}

        {/* Tags */}
        {project.tags?.length ? (
          <section className="border-t border-slate-200 pt-5">
            <SectionTitle>Tags</SectionTitle>

            {/* tray for visual separation */}
            <div className="flex flex-wrap gap-2 mt-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 leading-none shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>
        ) : null}

        {/* Links */}
        {project.links?.length ? (
          <section className="border-t border-slate-200 pt-5">
            <SectionTitle>Links</SectionTitle>
            <ul className="mt-3 space-y-2">
              {project.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-cyan-700 hover:text-cyan-800 underline underline-offset-4"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </aside>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-6">
      <dt className="shrink-0 text-slate-500">{label}</dt>
      <dd className="min-w-0 text-right font-medium text-slate-900 break-words">
        {value}
      </dd>
    </div>
  );
}
