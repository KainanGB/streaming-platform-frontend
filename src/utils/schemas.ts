import { z } from "zod"

export const userFormSchema = z.object({
  username: z.string().optional(),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(4, {
    message: "Please enter a minimum 4 caracters password",
  }),
})

export const userRefreshTokenSchema = z.object({
  token: z.string(),
})
