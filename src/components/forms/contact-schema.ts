import { z } from "zod";

export const buildingTypes = ["Office", "Retail", "Logistics", "Cold storage", "Campus", "Hotel", "Hospital", "EV depot", "Mixed-use", "Other"] as const;
export const contactMethods = ["Email", "Phone", "Video call"] as const;

const optionalText = (max: number) => z.string().trim().max(max, `Please keep this under ${max} characters.`).optional().or(z.literal(""));

/** Shared by the contact form (client) and /api/contact (server). */
export const contactSchema = z
  .object({
    name: z.string().trim().min(2, "Enter your name.").max(120),
    email: z.string().trim().min(1, "Enter your work email.").email("Enter an email address in the format name@company.com.").max(200),
    company: z.string().trim().min(2, "Enter your company or organisation.").max(160),
    role: optionalText(120),
    country: z.string().trim().min(2, "Enter the country where the building is.").max(80),
    buildingType: z.enum(buildingTypes, { errorMap: () => ({ message: "Choose the type of building." }) }),
    buildingCount: z
      .string()
      .trim()
      .min(1, "Enter the number of buildings.")
      .regex(/^\d{1,5}$/, "Enter a whole number, for example 1 or 12."),
    annualEnergy: optionalText(80),
    bms: optionalText(160),
    goal: z.string().trim().min(10, "Tell us a little about what you want to improve (at least 10 characters).").max(2000),
    contactMethod: z.enum(contactMethods, { errorMap: () => ({ message: "Choose how you would like us to contact you." }) }),
    phone: optionalText(40),
    // Honeypot — hidden from people; checked server-side before validation.
    website: z.string().max(500).optional(),
  })
  .superRefine((v, ctx) => {
    if (v.contactMethod === "Phone" && !(v.phone && /^[+()\d\s-]{6,}$/.test(v.phone))) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["phone"], message: "Enter a phone number so we can call you." });
    }
  });

export type ContactInput = z.infer<typeof contactSchema>;
