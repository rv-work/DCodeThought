export default function StatCard({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div className="p-5 rounded-lg bg-card border border-border shadow-card">
      <p className="text-sm text-muted dark:text-muted-dark">{label}</p>
      <h3 className="text-3xl font-bold mt-1">{value}</h3>
    </div>
  );
}
