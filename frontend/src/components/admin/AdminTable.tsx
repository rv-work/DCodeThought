import Link from "next/link";

type Column<T> = {
  key: keyof T;
  label: string;
};

export default function AdminTable<T extends { _id: string }>({
  columns,
  data,
  onDelete,
  editPath = "/admin",
}: {
  columns: Column<T>[];
  data: T[];
  onDelete?: (id: string) => void;
  editPath?: string;
}) {
  return (
    <div className="card overflow-hidden p-0 animate-fade-in-up opacity-0" style={{ animationDelay: "0.2s" }}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-subtle bg-background-tertiary/50">
              {columns.map((c) => (
                <th
                  key={String(c.key)}
                  className="px-6 py-4 text-left text-xs font-semibold text-muted uppercase tracking-wider"
                >
                  {c.label}
                </th>
              ))}
              <th className="px-6 py-4 text-right text-xs font-semibold text-muted uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {data.map((row, idx) => (
              <tr
                key={row._id}
                className="hover:bg-background-tertiary transition-colors duration-200 animate-fade-in-up opacity-0"
                style={{ animationDelay: `${0.1 * idx}s` }}
              >
                {columns.map((c) => (
                  <td key={String(c.key)} className="px-6 py-4 text-sm">
                    {String(row[c.key])}
                  </td>
                ))}
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`${editPath}/${row._id}/edit`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all duration-300 text-sm font-medium cursor-pointer group"
                    >
                      <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </Link>

                    {onDelete && (
                      <button
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this item?")) {
                            onDelete(row._id);
                          }
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 text-sm font-medium cursor-pointer group"
                      >
                        <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}