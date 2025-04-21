import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ILoginPayload } from "~/src/domain/interfaces/auth/ILoginPayload";
import { IRegisterPayload } from "../interfaces/auth/IRegisterPayload";

// Define the profile schema using zod
const profileSchema = z.object({
  first_name: z.string().min(1, {
    message: "First name is required",
  }),
  last_name: z.string().min(1, {
    message: "Last name is required",
  }), 
  phone_number: z
  .string()
  .regex(/^0\d{9}$/, {
    message: "Invalid Vietnam phone number format",
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
  district: z.string().min(1, {
    message: "District is required",
  }),
  province: z.string().min(1, {
    message: "Province is required",
  }),
  country: z.string().min(1, {
    message: "Country is required",
  }),
  phone_number: z
  .string()
  .regex(/^0\d{9}$/, {
    message: "Invalid Vietnam phone number format",
  }),
});

export type ShippingAddressFormType = z.infer<typeof shippingAddressSchema>;

export const ShippingAddressResolver = zodResolver(shippingAddressSchema);