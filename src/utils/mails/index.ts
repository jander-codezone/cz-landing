import nodemailer from "nodemailer";

const senderEmail = import.meta.env.CODEZONE_EMAIL || process.env.CODEZONE_EMAIL;
const senderEmailPassword = import.meta.env.CODEZONE_EMAIL_PASSWORD || process.env.CODEZONE_EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
    host: "smtp.serviciodecorreo.es",
    port: 465,
    secure: true,
    pool: true,
    auth: {
        user: senderEmail,
        pass: senderEmailPassword,
    },
});

export async function receiveMail(
    from: string,
    to: string,
    subject: string,
    html: string,
    replyTo?: string
) {
    if (!to) {
        console.error("Mail Error: No recipient address (CODEZONE_EMAIL is likely missing in env)");
        return { data: null, error: new Error("No hay destinatario configurado") };
    }

    try {
        const info = await transporter.sendMail({
            from,
            to,
            subject,
            html,
            replyTo,
        });

        return { data: info, error: null };
    } catch (error) {
        console.error("Nodemailer Error:", error);
        return { data: null, error: error as Error };
    }
}