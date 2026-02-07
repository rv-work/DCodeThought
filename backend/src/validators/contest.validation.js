import { z } from "zod";

export const addContestSchema = z.object({
  contestNumber: z.number(),
  contestName: z.string().min(3),
  contestDate: z.string().datetime(),

  problems: z
    .array(z.string())
    .length(4, "Contest must have exactly 4 problems"),
});
