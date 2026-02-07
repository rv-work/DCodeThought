import { z } from "zod";

export const addRequestSchema = z.object({
  type: z.enum(["question", "feature"]),
  title: z.string().min(5).max(120),
  description: z.string().min(10).max(3000),
});
