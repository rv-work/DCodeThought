export default function AdminPageHeader({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-xl font-bold">{title}</h1>
      {action}
    </div>
  );
}
