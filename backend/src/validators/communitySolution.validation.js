import { z } from "zod";

// Validator for submitting a new community solution
export const submitCommunitySolutionSchema = z.object({
  problemId: z.string().min(24, "Invalid Problem ID"), // MongoDB ObjectId length
  approach: z.string().min(10, "Approach must be at least 10 characters long").max(3000, "Approach is too long"),
  explanation: z.string().min(10, "Explanation must be at least 10 characters long").max(5000, "Explanation is too long"),
  code: z.string().optional(),
  language: z.string().optional(),
});

// Validator for tagging/voting a solution
export const tagSolutionSchema = z.object({
  tagType: z.enum(["helpful", "simplest", "creative"], {
    errorMap: () => ({ message: "Invalid tag type. Must be helpful, simplest, or creative." }),
  }),
});