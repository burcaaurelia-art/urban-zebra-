import { useState } from "react";

export default function CereOferta() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    period: "",
    budget: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const payload = {
      access_key: "efdd6f339-47d1-4294-bebc-a24b8f3994f2",
      subject: `Cerere ofertă de la ${formData.name}`,
      from_name: "Urban.Zebra | Formular ofertă",
      ...formData
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          destination: "",
          period: "",
          budget: "",
          message: ""
        });
      } else {
        setStatus("error");
        console.log("Eroare Web3Forms:", data);
      }
    } catch (error) {
      console.log("Eroare:", error);
      setStatus("error");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Cere ofertă personalizată ✈️</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input name="name" placeholder="Nume" required value={formData.name} onChange={handleChange} />
        <input name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
        <input name="phone" placeholder="Telefon" required value={formData.phone} onChange={handleChange} />
        <input name="destination" placeholder="Destinație" required value={formData.destination} onChange={handleChange} />
        <input name="period" placeholder="Perioadă" required value={formData.period} onChange={handleChange} />
        <input name="budget" placeholder="Buget" required value={formData.budget} onChange={handleChange} />
        <textarea name="message" placeholder="Detalii" value={formData.message} onChange={handleChange}></textarea>

        <button type="submit">Trimite</button>
      </form>

      {status === "success" && <p style={{ color: "green" }}>Trimis cu succes!</p>}
      {status === "error" && <p style={{ color: "red" }}>Eroare la trimitere. Încearcă din nou.</p>}
      {status === "loading" && <p style={{ color: "gray" }}>Se trimite...</p>}
    </div>
  );
}
