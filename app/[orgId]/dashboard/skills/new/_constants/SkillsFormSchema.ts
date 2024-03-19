import { z } from "zod";

export const formSchema = z.object({
  skillCategoryId: z.string(),
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(200),
  author: z.string().optional(),
  isChecked: z.boolean().default(false).optional(),
  departments: z.array(z.string()).optional(),
});