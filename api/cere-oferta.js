import { Resend } from "resend";

export default async function handler(req, res) {
  // Acceptăm doar POST
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Citiți manual body-ul (doar așa funcționează în Vercel fără framework)
  let body = "";
  await new Promise((resolve) => {
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", resolve);
  });

  let data;
  try {
    data = JSON.parse(body);
  } catch (e) {
    return res.status(400).json({ message: "Invalid JSON body" });
  }

  const {
    name,
    email,
    phone,
    destination,
    date,
    budget,
    message,
  } = data;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: process.env.FROM_EMAIL,
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
        <p><strong>Mesaj:</strong> ${message}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("EROARE RESEND: ", err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
