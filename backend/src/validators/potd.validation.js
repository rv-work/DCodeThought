import { z } from "zod";

export const addPotdSchema = z.object({
  problemId: z.string(),
  potdDate: z.string().datetime(),
});
