import { z } from "zod";

export const solutionSchema = z.object({
  problemId: z.string(),

  myThought: z.string().min(10),
  engThought: z.string().optional(),

  hints: z.array(z.string()).default([]),

  code: z.record(z.string(), z.string()).optional(),

  youtubeLink: z.string().url().optional(),
});
