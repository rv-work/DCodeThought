import { z } from "zod";

export const addContestSchema = z.object({
  contestNumber: z.number(),
  contestName: z.string().min(3),
  contestDate: z.string().datetime(),

  problems: z
    .array(z.string().min(1))
    .length(4, "Contest must have exactly 4 problems")
    .refine(
      (arr) => new Set(arr).size === 4,
      "Contest problems must be unique"
    ),
});
