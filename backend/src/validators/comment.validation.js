import { z } from "zod";

export const addCommentSchema = z.object({
  text: z.string().min(2).max(2000),
});

export const addReplySchema = z.object({
  text: z.string().min(2).max(2000),
});

export const voteSchema = z.object({
  value: z.enum(["up", "down"]),
});
