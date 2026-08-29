import { z } from "zod";

export const registerValidator = z.object({
  fullName: z.string().trim().min(3).max(55),
  email: z.email(),
  password: z.string().min(6),
});

export const loginValidator = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export type RegisterInputType = z.infer<typeof registerValidator>;
export type LoginInputType = z.infer<typeof loginValidator>;
