import clsx from 'clsx';

export default function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        'rounded-2xl border border-slate-200 bg-white shadow-card',
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="border-b border-slate-200 px-5 py-4">{children}</div>;
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-semibold text-slate-900">{children}</h2>;
}

export function CardBody({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={clsx('px-5 py-4', className)}>{children}</div>;
}
