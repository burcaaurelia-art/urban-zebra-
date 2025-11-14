import { Resend } from "resend";

/**
 * Vercel serverless function for /api/cere-oferta
 * Works cu Vite + React.
 */
export default async function handler(req, res) {
  // Acceptăm doar POST din formular
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Vercel pune deja datele în req.body
  const {
    name = "-",
    email = "-",
    phone = "-",
    destination = "-",
    date = "-",
    budget = "-",
    message = "-",
  } = req.body || {};

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: process.env.FROM_EMAIL || "onboarding@resend.dev",
      to: process.env.CONTACT_TARGET_EMAIL,
      subject: `Cerere ofertă de la ${name}`,
      html: `
        <h2>Cerere ofertă personalizată</h2>
        <p><strong>Nume:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Destinație:</strong> ${destination}</p>
        <p><strong>Perioadă:</strong> ${date}</p>
        <p><strong>Buget:</strong> ${budget}</p>
        <p><strong>Mesaj:</strong><br>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("EROARE RESEND:", error);
    return res
      .status(500)
      .json({ success: false, error: error?.message || "Server error" });
  }
}
