// validators/request.validation.js
import { z } from "zod";

// USER: create request
export const addRequestSchema = z.object({
  type: z.enum(["question", "feature"]),
  title: z.string().min(5).max(120),
  description: z.string().min(10).max(3000),

  // NEW
  leetcodeLink: z.string().url().optional(),
}).superRefine((data, ctx) => {
  if (data.type === "question" && !data.leetcodeLink) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "LeetCode link is required for question requests.",
      path: ["leetcodeLink"],
    });
  }
});

// ADMIN: mark completed / uncompleted
export const completeRequestSchema = z.object({
  completed: z.boolean(),
});
