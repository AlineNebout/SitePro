import { z } from "zod";

// --- Login ---
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "L'email est requis")
    .email("Email invalide"),
  password: z
    .string()
    .min(1, "Le mot de passe est requis"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// --- Registration ---
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Le nom est requis")
      .max(100, "Le nom ne peut pas dépasser 100 caractères"),
    email: z
      .string()
      .min(1, "L'email est requis")
      .email("Email invalide"),
    password: z
      .string()
      .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    confirmPassword: z
      .string()
      .min(1, "La confirmation du mot de passe est requise"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

// --- Password Reset ---
export const passwordResetSchema = z.object({
  email: z
    .string()
    .min(1, "L'email est requis")
    .email("Email invalide"),
});

export type PasswordResetFormData = z.infer<typeof passwordResetSchema>;
