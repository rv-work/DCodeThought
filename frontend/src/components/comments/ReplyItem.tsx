import type { Reply } from "@/types/comment";
import { voteReply } from "@/api/comment.api";

type Props = {
  reply: Reply;
  commentId: string;
};

export default function ReplyItem({ reply, commentId }: Props) {
  const score = reply.votes.reduce((s, v) => s + v.value, 0);

  return (
    <div className="ml-6 border-l pl-3 mt-2">
      <div className="text-xs font-semibold">
        {reply.userId.name}
      </div>

      <div className="text-sm">{reply.text}</div>

      <div className="flex gap-2 text-xs mt-1">
        <button
          onClick={() =>
            voteReply(commentId, reply._id, "up")
          }
        >
          👍
        </button>

        <button
          onClick={() =>
            voteReply(commentId, reply._id, "down")
          }
        >
          👎
        </button>

        <span>{score}</span>
      </div>
    </div>
  );
}
