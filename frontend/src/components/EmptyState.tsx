export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-10 text-muted dark:text-muted-dark">
      {message}
    </div>
  );
}
