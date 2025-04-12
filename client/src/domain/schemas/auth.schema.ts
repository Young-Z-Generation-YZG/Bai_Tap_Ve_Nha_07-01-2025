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

// Define the profile schema using zod
const profileSchema = z.object({
  first_name: z.string().min(1, {
    message: "First name is required",
  }),
  last_name: z.string().min(1, {
    message: "Last name is required",
  }), 
})

export type ProfileFormType = z.infer<typeof profileSchema>;

export const ProfileResolver = zodResolver(profileSchema);

// Define the shipping address schema using zod
const shippingAddressSchema = z.object({
  first_name: z.string().min(1, {
    message: "First name is required",
  }),
  last_name: z.string().min(1, {
    message: "Last name is required",
  }),
  address: z.string().min(1, {
    message: "Address is required",
  }),
  city: z.string().min(1, {
    message: "City is required",
  }),
  state: z.string().min(1, {
    message: "State is required",
  }),
  phone_number: z
  .string()
  .regex(/^0\d{9}$/, {
    message: "Invalid Vietnam phone number format",
  }),
});

export type ShippingAddressFormType = z.infer<typeof shippingAddressSchema>;

export const ShippingAddressResolver = zodResolver(shippingAddressSchema);