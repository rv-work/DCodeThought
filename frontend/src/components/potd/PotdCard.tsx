import Link from "next/link";
import type { PotdProblem } from "@/types/potd";

export default function PotdCard({
  potd,
}: {
  potd: PotdProblem;
}) {
  return (
    <Link
      href={`/problems/${potd.slug}`}
      className="border p-4 rounded block hover:bg-gray-50 dark:hover:bg-gray-900"
    >
      <div className="text-xs">
        {new Date(potd.potdDate).toDateString()}
      </div>

      <div className="font-semibold">
        #{potd.problemNumber} {potd.title}
      </div>

      <div className="text-xs mt-1 flex gap-2">
        <span>{potd.difficulty}</span>
      </div>
    </Link>
  );
}
