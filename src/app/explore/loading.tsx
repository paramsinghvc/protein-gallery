export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-9 w-40 rounded bg-white/10 animate-pulse" />
      <div className="h-20 rounded-2xl bg-white/10 animate-pulse" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="h-[320px] rounded-2xl bg-white/10 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
