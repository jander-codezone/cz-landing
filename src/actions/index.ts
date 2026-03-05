import { ActionError, defineAction } from "astro:actions";
import { ContactSchema } from "../schemas/contact.schema";
import { receiveMail } from "../utils/mails";
import { generateContactEmailTemplate, generateClientConfirmationTemplate } from "../utils/mails/templates";

const SENDER_EMAIL = import.meta.env.CODEZONE_EMAIL || process.env.CODEZONE_EMAIL;

export const server = {
  sendMail: defineAction({
    accept: "form",
    input: ContactSchema,
    handler: async (input) => {
      // 1. Verificación de configuración del servidor
      if (!SENDER_EMAIL) {
        console.error("[CRITICAL] SENDER_EMAIL not configured in environment");
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Configuración del servidor incompleta (EMAIL_MISSING)",
        });
      }

      try {
        // 2. Enviar correo interno a CodeZone
        const adminHtml = generateContactEmailTemplate(input);
        const { data: adminData, error: adminError } = await receiveMail(
          `CodeZone Contacto <${SENDER_EMAIL}>`,
          SENDER_EMAIL,
          "🚀 Nueva solicitud de cliente - CodeZone",
          adminHtml,
          input.email // replyTo: permite responder directamente al cliente
        );

        if (adminError) throw adminError;

        // 3. Enviar correo de confirmación al cliente
        const clientHtml = generateClientConfirmationTemplate(input);
        await receiveMail(
          `CodeZone <${SENDER_EMAIL}>`,
          input.email,
          "¡Hemos recibido tu solicitud! - CodeZone",
          clientHtml
        );

        return {
          success: true,
          message: "Email enviado con éxito",
          ref: adminData?.messageId, // Devolvemos el ID del mensaje para rastreo
        };

      } catch (err: any) {
        // 3. Manejo de errores centralizado en el Action
        console.error("[MAIL_ACTION_ERROR]", err);

        throw new ActionError({
          code: "BAD_REQUEST",
          message: err.message || "No se pudo procesar tu solicitud. Inténtalo más tarde.",
        });
      }
    }
  })
};