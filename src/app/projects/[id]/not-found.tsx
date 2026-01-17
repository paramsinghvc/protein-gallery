import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
      <h1 className="text-2xl font-semibold">Project not found</h1>
      <p className="mt-2 text-white/70">That project ID doesn’t exist.</p>
      <Link
        href="/explore"
        className="mt-6 inline-block text-cyan-300 hover:text-cyan-200"
      >
        Go to Explore →
      </Link>
    </div>
  );
}
