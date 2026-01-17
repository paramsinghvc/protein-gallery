'use client';

export default function ExploreHeader({
  title,
  description,
  count,
}: {
  title: string;
  description: string;
  count: number;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h1>
        <p className="mt-1 text-sm text-slate-600">{description}</p>
      </div>

      <div
        className="inline-flex items-center self-end rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600 shadow-sm sm:py-1.5"
        aria-live="polite"
      >
        <span className="font-medium text-slate-900">{count}</span>
        <span className="ml-1">result{count === 1 ? '' : 's'}</span>
      </div>
    </div>
  );
}
