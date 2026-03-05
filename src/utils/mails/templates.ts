import type { ContactInput } from "../../schemas/contact.schema";


export function generateContactEmailTemplate(data: ContactInput): string {
  const { name, email, phone, message } = data;

  return `
    <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #00bcd4;">Nueva solicitud de contacto</h2>
      <hr style="border: 0; border-top: 1px solid #eee;" />
      <p><strong>Remitente:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Teléfono:</strong> <a href="tel:${phone}">${phone}</a></p>
      <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 5px;">
        <strong>Mensaje:</strong><br />
        ${message}
      </div>
      <footer style="margin-top: 30px; font-size: 12px; color: #999;">
        Enviado desde el formulario web de CodeZone.
      </footer>
    </div>
  `;
}

export function generateClientConfirmationTemplate(data: ContactInput): string {
  const { name } = data;

  return `
    <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
      <div style="text-align: center; padding: 20px 0;">
        <h1 style="color: #00bcd4; margin: 0;">¡Hemos recibido tu mensaje!</h1>
      </div>
      <div style="padding: 20px; background: #ffffff; border-radius: 8px; border: 1px solid #eee;">
        <p>Hola <strong>${name}</strong>,</p>
        <p>Gracias por ponerte en contacto con <strong>CodeZone</strong>. Hemos recibido correctamente tus datos y un miembro de nuestro equipo revisará tu solicitud lo antes posible.</p>
        <p>Normalmente respondemos en menos de 24 horas laborables.</p>
        <div style="margin: 30px 0; text-align: center;">
          <p style="font-style: italic; color: #666;">"Transformamos tu idea en una solución digital real."</p>
        </div>
        <p>Si tienes alguna urgencia, también puedes contactarnos directamente por teléfono o WhatsApp.</p>
      </div>
      <footer style="margin-top: 30px; text-align: center; font-size: 12px; color: #999;">
        <p>&copy; ${new Date().getFullYear()} CodeZone - Desarrollo Web y Software a Medida</p>
        <p>Este es un mensaje automático, por favor no respondas directamente a este correo.</p>
      </footer>
    </div>
  `;
}
