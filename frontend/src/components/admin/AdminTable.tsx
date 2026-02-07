type Column<T> = {
  key: keyof T;
  label: string;
};

export default function AdminTable<T extends { _id: string }>({
  columns,
  data,
  onDelete,
}: {
  columns: Column<T>[];
  data: T[];
  onDelete?: (id: string) => void;
}) {
  return (
    <table className="w-full border text-sm">
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={String(c.key)} className="border p-2 text-left">
              {c.label}
            </th>
          ))}
          {onDelete && <th className="border p-2">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row._id}>
            {columns.map((c) => (
              <td key={String(c.key)} className="border p-2">
                {String(row[c.key])}
              </td>
            ))}
            {onDelete && (
              <td className="border p-2">
                <button
                  onClick={() => onDelete(row._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
