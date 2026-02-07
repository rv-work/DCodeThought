import { z } from "zod";

export const addRequestSchema = z.object({
  type: z.enum(["feature", "question"]),
  title: z.string().min(5),
  description: z.string().min(10),
});

export const voteRequestSchema = z.object({
  action: z.enum(["up", "down"]),
});

export const completeRequestSchema = z.object({
  completed: z.boolean(),
});
