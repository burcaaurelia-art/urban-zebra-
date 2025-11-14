const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = (req, res) => {
  if (req.method !== "POST") {
    res.statusCode = 405;
    return res.json({ message: "Method not allowed" });
  }

  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", async () => {
    try {
      const data = JSON.parse(body || "{}");
      const {
        name = "-",
        email = "-",
        phone = "-",
        destination = "-",
        date = "-",
        budget = "-",
        message = "-",
      } = data;

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

      res.statusCode = 200;
      return res.json({ success: true });
    } catch (error) {
      console.error("EROARE RESEND:", error);
      res.statusCode = 500;
      return res.json({ success: false });
    }
  });
};
