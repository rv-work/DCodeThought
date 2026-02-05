import { z } from "zod";

export const addCommentSchema = z.object({
  problemId: z.string(),
  text: z.string().min(1).max(500),
});

export const addReplySchema = z.object({
  commentId: z.string(),
  text: z.string().min(1).max(500),
});

export const likeDislikeSchema = z.object({
  commentId: z.string(),
});
