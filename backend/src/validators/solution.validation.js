import { z } from "zod";

export const solutionSchema = z.object({
  problemId: z.string(),
  myThought: z.string(),
  engThought: z.string(),

  code: z.object({
    java: z.string().optional(),
    cpp: z.string().optional(),
    python: z.string().optional(),
    js: z.string().optional(),
  }),

  youtubeLink: z.string().url().optional(),
});
