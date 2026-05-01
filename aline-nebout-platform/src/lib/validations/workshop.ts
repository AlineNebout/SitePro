import { z } from "zod";

export const workshopRegistrationSchema = z.object({
  name: z
    .string()
    .min(1, "Le nom est requis")
    .max(100, "Le nom ne peut pas dépasser 100 caractères"),
  email: z
    .string()
    .min(1, "L'email est requis")
    .email("Email invalide"),
  phone: z
    .string()
    .min(1, "Le téléphone est requis")
    .regex(
      /^[\d\s+()-]{10,}$/,
      "Numéro de téléphone invalide"
    ),
  message: z
    .string()
    .max(500, "Le message ne peut pas dépasser 500 caractères")
    .optional()
    .default(""),
});

export type WorkshopRegistrationFormData = z.infer<typeof workshopRegistrationSchema>;
