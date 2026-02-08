// validators/report.validation.js
import { z } from "zod";

// USER: create report
export const addReportSchema = z.object({
  title: z.string().min(5).max(120),
  description: z.string().min(10).max(3000),
  screenshot: z.string().url().optional().nullable(),
});

// ADMIN: resolve / unresolve report
export const resolveReportSchema = z.object({
  resolved: z.boolean(),
});
