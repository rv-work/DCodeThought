import Link from "next/link";
import { IProblem } from "@/lib/types";

export default function POTDCard({ potd }: { potd: IProblem }) {
  return (
    <Link
      href={`/user/problems/${potd.slug}`}
      className="
          block p-5 border border-primary rounded-lg 
          shadow-card bg-card hover:bg-primary hover:text-white 
          transition
      "
    >
      <h2 className="text-xl font-semibold mb-2">🔥 Today’s POTD</h2>

      <p className="font-medium">
        {potd.problemNumber}. {potd.title}
      </p>

      <p className="text-sm opacity-80 mt-1">
        Difficulty: {potd.difficulty}
      </p>
    </Link>
  );
}
