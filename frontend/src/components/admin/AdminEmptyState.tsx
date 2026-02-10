"use client";

type AdminEmptyStateProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
};

export default function AdminEmptyState({
  title = "No data found",
  description = "There is nothing to show here yet.",
  action,
}: AdminEmptyStateProps) {
  return (
    <div className="border rounded-md p-6 text-center text-muted-foreground">
      <div className="text-lg font-medium text-foreground">
        {title}
      </div>
      <p className="text-sm mt-1">{description}</p>

      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
