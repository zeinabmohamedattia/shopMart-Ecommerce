import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().nonempty("name is required").min(3,'name must be at least 3 chars'),

  email: z.string()
    .nonempty("email is required")
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"invalid email"),

  password: z.string()
    .nonempty("password is required")
    .min(6, "min length is 6 chars"),

  rePassword: z.string()
    .nonempty("confirm password is required"),

  phone: z.string()
    .nonempty("phone is required")
    .regex(/^01[0-2,5]{1}[0-9]{8}$/, "invalid Egyptian phone number"),
}).refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "passwords do not match",
  });

export type FormFields = z.infer<typeof registerSchema>