import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ILoginPayload } from "~/src/domain/interfaces/auth/ILoginPayload";
import { IRegisterPayload } from "../interfaces/auth/IRegisterPayload";

// Define the login schema using zod
const loginSchema = z.object({
  email: z.string().min(1, {
    message: "Email is required",
  }).email({
    message: "Please enter a valid email",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
} satisfies Record<keyof ILoginPayload, any>);

export type LoginFormType = z.infer<typeof loginSchema>;

export const LoginResolver = zodResolver(loginSchema);

const registerSchema = z.object({
  first_name: z.string().min(1, {
    message: "First name is required",
  }),
  last_name: z.string().min(1, {
    message: "Last name is required",
  }),
  email: z.string().min(1, {
    message: "Email is required",
  }).email({
    message: "Please enter a valid email",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  confirm_password: z.string().min(1, {
    message: "Confirm password is required",
  }),
  phone_number: z.string().min(1, {
    message: "Phone number is required",
  }),
} satisfies Record<keyof IRegisterPayload, any>);

export type RegisterFormType = z.infer<typeof registerSchema>;

export const RegisterResolver = zodResolver(registerSchema);
