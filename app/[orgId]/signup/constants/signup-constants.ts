import { z } from "zod";

export const formSchemaSignUp = z.object({
  name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(),
  password: z.string().min(3),
});