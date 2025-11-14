// api/cere-oferta.js

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Vercel îți pune deja body-ul JSON în req.body
  console.log("FORM BODY:", req.body);

  // Deocamdată nu trimitem email, doar confirmăm succesul
  return res.status(200).json({ success: true });
}
