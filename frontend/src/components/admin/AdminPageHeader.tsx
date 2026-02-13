export default function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 animate-fade-in-up opacity-0" style={{ animationDelay: "0.1s" }}>
      <div>
        <h1 className="text-3xl font-bold mb-1">{title}</h1>
        {description && <p className="text-muted">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}