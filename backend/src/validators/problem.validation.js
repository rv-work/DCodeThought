import { z } from "zod";

export const addProblemSchema = z.object({
  problemNumber: z.number(),
  title: z.string().min(3),
  leetcodeLink: z.string().url(),

  tags: z.array(z.string()).default([]),

  difficulty: z.enum(["Easy", "Medium", "Hard"]),

  type: z.enum(["normal", "potd", "contest", "requested"]),

  // POTD
  potdDate: z.string().datetime().optional().nullable(),

  // Contest (optional)
  contestNumber: z.number().optional().nullable(),
  contestName: z.string().optional().nullable(),
  contestDate: z.string().datetime().optional().nullable(),
});
