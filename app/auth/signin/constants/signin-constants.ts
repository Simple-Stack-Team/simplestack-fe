import { z } from "zod";

export const formSchemaLogin = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});