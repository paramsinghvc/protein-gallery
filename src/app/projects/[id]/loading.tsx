export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-5 w-32 rounded bg-white/10 animate-pulse" />
      <div className="h-10 w-2/3 rounded bg-white/10 animate-pulse" />
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="h-[420px] rounded-2xl bg-white/10 animate-pulse" />
        <div className="h-[420px] rounded-2xl bg-white/10 animate-pulse" />
      </div>
    </div>
  );
}
