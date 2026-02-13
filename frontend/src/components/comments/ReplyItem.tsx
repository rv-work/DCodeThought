import type { Reply } from "@/types/comment";
import { voteReply } from "@/api/comment.api";
import { ThumbsUp, ThumbsDown, User } from "lucide-react";
import { useState } from "react";

type Props = {
  reply: Reply;
  commentId: string;
};

export default function ReplyItem({ reply, commentId }: Props) {
  const [localReply, setLocalReply] = useState(reply);
  const score = localReply.votes.reduce((s, v) => s + v.value, 0);

  const handleVote = async (type: "up" | "down") => {
    try {
      await voteReply(commentId, localReply._id, type);
      // Optimistically update
      const value = type === "up" ? 1 : -1;
      setLocalReply((prev) => ({
        ...prev,
        votes: [...prev.votes, { userId: "temp" as any, value }],
      }));
    } catch (error) {
      console.error("Vote failed:", error);
    }
  };

  return (
    <div className="rounded-lg bg-background-secondary border border-border p-4">
      {/* Reply Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white flex-shrink-0">
          <User className="w-4 h-4" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="font-semibold text-xs mb-1">
            {reply.userId.name}
          </div>
          <p className="text-sm leading-relaxed break-words">{reply.text}</p>
        </div>
      </div>

      {/* Reply Actions */}
      <div className="flex items-center gap-2 ml-11">
        <button
          onClick={() => handleVote("up")}
          className="flex items-center gap-1 px-2 py-1 rounded-lg bg-background-tertiary hover:bg-green-500/10 hover:text-green-500 transition-all cursor-pointer text-xs"
        >
          <ThumbsUp className="w-3 h-3" />
          <span>{localReply.votes.filter((v) => v.value > 0).length}</span>
        </button>

        <button
          onClick={() => handleVote("down")}
          className="flex items-center gap-1 px-2 py-1 rounded-lg bg-background-tertiary hover:bg-red-500/10 hover:text-red-500 transition-all cursor-pointer text-xs"
        >
          <ThumbsDown className="w-3 h-3" />
          <span>
            {Math.abs(localReply.votes.filter((v) => v.value < 0).length)}
          </span>
        </button>

        <div className="text-xs font-semibold">
          Score: <span className="text-accent">{score}</span>
        </div>
      </div>
    </div>
  );
}