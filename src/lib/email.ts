import nodemailer from "nodemailer";

interface EmailParams {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailParams) {
  const host = process.env.EMAIL_SERVER_HOST ?? "";
  const port = parseInt(process.env.EMAIL_SERVER_PORT ?? "587", 10);
  const user = process.env.EMAIL_SERVER_USER ?? "";
  const pass = process.env.EMAIL_SERVER_PASSWORD ?? "";
  const from = process.env.EMAIL_FROM ?? "noreply@example.com";
  const secure = process.env.EMAIL_SERVER_SECURE === "true";

  const transporter = nodemailer.createTransport({
    host,
    port,
    auth: { user, pass },
    secure: false,
    requireTLS: true,
    tls: {
      minVersion: "TLSv1.2",
    },
  });

  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
}
