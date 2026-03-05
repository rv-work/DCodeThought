import type { Reply } from "@/types/comment";
import { voteReply } from "@/api/comment.api";
import { ThumbsUp, ThumbsDown, User } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { parseError } from "@/utils/parseError";

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
      const value = type === "up" ? 1 : -1;
      setLocalReply((prev) => ({
        ...prev,
        votes: [...prev.votes, { userId: "temp", value }],
      }));
    } catch (err) {
      toast.error(parseError(err));
    }
  };

  return (
    <div className="rounded-2xl bg-background-secondary/30 border border-border-subtle p-5 hover:border-blue-500/30 transition-colors">

      {/* Reply Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white shrink-0 shadow-sm">
          <User className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0 pt-0.5">
          <div className="font-extrabold text-foreground text-sm mb-1">
            {reply.userId.name}
          </div>
          <p className="text-sm text-muted leading-relaxed whitespace-pre-wrap wrap-break-word">
            {reply.text}
          </p>
        </div>
      </div>

      {/* Reply Actions */}
      <div className="flex items-center gap-3 ml-13 mt-3">
        <div className="flex items-center gap-1 bg-background/50 p-1 rounded-lg border border-border-subtle">
          <button
            onClick={() => handleVote("up")}
            className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-emerald-500/10 hover:text-emerald-500 transition-colors text-muted cursor-pointer text-xs font-bold"
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>{localReply.votes.filter((v) => v.value > 0).length}</span>
          </button>

          <div className="w-px h-3 bg-border-subtle"></div>

          <button
            onClick={() => handleVote("down")}
            className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-rose-500/10 hover:text-rose-500 transition-colors text-muted cursor-pointer text-xs font-bold"
          >
            <ThumbsDown className="w-3.5 h-3.5" />
            <span>{Math.abs(localReply.votes.filter((v) => v.value < 0).length)}</span>
          </button>
        </div>

        <div className="text-xs font-bold text-muted bg-background/30 px-2.5 py-1.5 rounded-lg border border-border-subtle">
          Score: <span className="text-foreground ml-1">{score}</span>
        </div>
      </div>
    </div>
  );
}