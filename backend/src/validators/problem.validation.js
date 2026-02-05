import { z } from "zod";

export const addProblemSchema = z.object({
  problemNumber: z.number(),
  title: z.string(),
  leetcodeLink: z.string().url(),
  tags: z.array(z.string()).default([]),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),

  isPOTD: z.boolean().default(false),
  potdDate: z.string().datetime().optional().nullable(),

  isContest: z.boolean().default(false),
  contestNumber: z.number().optional().nullable(),
  contestName: z.string().optional().nullable(),
  contestDate: z.string().datetime().optional().nullable(),
});
