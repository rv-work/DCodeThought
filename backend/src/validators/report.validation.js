// validators/report.validation.js
import { z } from "zod";

export const addReportSchema = z.object({
  title: z.string().min(5).max(120),
  description: z.string().min(10).max(3000),
  screenshot: z.string().url().optional().nullable(),
});
