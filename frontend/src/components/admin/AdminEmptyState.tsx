"use client";

type AdminEmptyStateProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
};

export default function AdminEmptyState({
  title = "No data found",
  description = "There is nothing to show here yet.",
  action,
  icon,
}: AdminEmptyStateProps) {
  return (
    <div className="card text-center animate-fade-in">
      {/* Icon */}
      <div className="flex justify-center mb-6">
        {icon || (
          <div className="w-20 h-20 rounded-2xl bg-muted/10 flex items-center justify-center">
            <svg className="w-10 h-10 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-3 mb-6">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted max-w-md mx-auto">{description}</p>
      </div>

      {/* Action */}
      {action && <div>{action}</div>}
    </div>
  );
}