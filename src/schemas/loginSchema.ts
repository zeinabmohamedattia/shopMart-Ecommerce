import { z } from "zod"

export const loginSchema = z.object({
  email: z.email('invalid email').nonempty('email is required'),
  password: z.string().nonempty('password is required').min(6, 'min length is 6 chars')
})
export type FormFields = z.infer<typeof loginSchema>
