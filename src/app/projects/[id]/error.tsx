'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p className="mt-2 text-white/70">{error.message}</p>
      <button
        onClick={reset}
        className="mt-4 rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
      >
        Try again
      </button>
    </div>
  );
}
