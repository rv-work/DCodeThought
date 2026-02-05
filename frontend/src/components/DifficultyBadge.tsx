export default function DifficultyBadge({ level }: { level: string }) {
  const colors: any = {
    Easy: "bg-green-100 text-green-700 border-green-300",
    Medium: "bg-yellow-100 text-yellow-700 border-yellow-300",
    Hard: "bg-red-100 text-red-700 border-red-300",
  };

  return (
    <span
      className={`
        px-2 py-1 rounded text-xs border 
        ${colors[level] || "bg-gray-100 text-gray-700 border-gray-300"}
      `}
    >
      {level}
    </span>
  );
}
