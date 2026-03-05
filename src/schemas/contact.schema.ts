import { z } from "astro:schema";

export const ContactSchema = z.object({
    name: z.string()
        .min(2, "El nombre debe tener al menos 2 caracteres")
        .max(100, "El nombre es demasiado largo")
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El nombre solo puede contener letras"),
    email: z.string()
        .email("Por favor, introduce un email válido"),
    phone: z.string()
        .regex(/^(\+34|0034|34)?[6789]\d{8}$/, "Por favor, introduce un teléfono de España válido"),
    message: z.string()
        .min(10, "El mensaje debe tener al menos 10 caracteres")
        .max(1000, "El mensaje no puede exceder los 1000 caracteres")
        .or(z.literal(""))
        .or(z.null())
        .or(z.undefined())
        .transform(val => val?.trim() || "Solicito contacto por teléfono/email")
});

export type ContactInput = z.infer<typeof ContactSchema>;
