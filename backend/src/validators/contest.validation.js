import { z } from "zod";

export const addContestSchema = z.object({
  contestNumber: z.number(),
  contestName: z.string(),
  contestDate: z.string().datetime(),
  problems: z.array(z.string()).length(4),
});
