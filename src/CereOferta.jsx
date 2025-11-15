import { useState } from "react";

export default function CereOferta() {
  const [status, setStatus] = useState("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    date: "",
    budget: "",
    message: "",
    gdpr: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

const res = await fetch("/api/cere-oferta", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData)
});

console.log("STATUS", res.status);
const text = await res.text();
console.log("RESP", text);


    if (res.ok) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Cere ofertă personalizată ✈️</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input name="name" placeholder="Nume*" required onChange={handleChange} />
        <input name="email" placeholder="Email*" required onChange={handleChange} />
        <input name="phone" placeholder="Telefon*" required onChange={handleChange} />
        <input name="destination" placeholder="Destinație" onChange={handleChange} />
        <input name="date" placeholder="Perioada" onChange={handleChange} />
        <input name="budget" placeholder="Buget" onChange={handleChange} />
        <textarea name="message" placeholder="Detalii" rows="4" onChange={handleChange} />

        <label>
          <input type="checkbox" name="gdpr" required onChange={handleChange} /> Accept GDPR
        </label>

        <button type="submit">
          {status === "loading" ? "Se trimite..." : "Trimite"}
        </button>

        {status === "success" && <p style={{ color: "green" }}>Email trimis!</p>}
        {status === "error" && <p style={{ color: "red" }}>Eroare la trimitere.</p>}
      </form>
    </div>
  );
}
