export function formatDate(date: string | Date) {
  const d = new Date(date);
  return d.toDateString();
}
