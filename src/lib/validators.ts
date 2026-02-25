import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address").max(254, "Email is too long"),
  phone: z.string().max(20, "Phone number is too long").optional(),
  service: z.string().min(1, "Please select a service").max(50, "Service name is too long"),
  city: z.string().max(100, "City name is too long").optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000, "Message is too long (5000 characters max)"),
  contactMethod: z.enum(["email", "phone"]).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const askExpertSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address").max(254, "Email is too long"),
  question: z.string().min(10, "Question must be at least 10 characters").max(5000, "Question is too long (5000 characters max)"),
});

export type AskExpertFormData = z.infer<typeof askExpertSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address").max(254, "Email is too long"),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
