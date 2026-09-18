import { Resend } from "resend";

const clean = (value, maxLength = 1000) =>
  String(value ?? "-")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, maxLength) || "-";

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TARGET_EMAIL) {
    console.error("Lipsesc RESEND_API_KEY sau CONTACT_TARGET_EMAIL.");
    return res.status(500).json({ success: false });
  }

  let data = req.body ?? {};

  if (typeof data === "string") {
    try {
      data = JSON.parse(data);
    } catch {
      return res.status(400).json({ success: false, message: "Invalid JSON" });
    }
  }

  if (data.website) {
    return res.status(200).json({ success: true });
  }

  const name = clean(data.name, 120);
  const email = clean(data.email, 200);
  const phone = clean(data.phone, 60);
  const destination = clean(data.destination, 200);
  const date = clean(data.date, 100);
  const budget = clean(data.budget, 100);
  const message = clean(data.message, 4000);

  if (name === "-" || email === "-" || phone === "-") {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || "onboarding@resend.dev",
      to: process.env.CONTACT_TARGET_EMAIL,
      replyTo: email,
      subject: `Cerere ofertă de la ${name}`,
      html: `
        <h2>Cerere ofertă personalizată</h2>
        <p><strong>Nume:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Destinație:</strong> ${destination}</p>
        <p><strong>Perioadă:</strong> ${date}</p>
        <p><strong>Buget:</strong> ${budget}</p>
        <p><strong>Mesaj:</strong><br>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("EROARE RESEND:", error);
      return res.status(502).json({ success: false });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("EROARE RESEND:", error);
    return res.status(500).json({ success: false });
  }
}
