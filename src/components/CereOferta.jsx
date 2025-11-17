import React, { useState } from "react";

export default function CereOferta() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telefon: "",
    tip: "",
    perioada: "",
    buget: "",
    detalii: "",
    gdpr: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // verificăm GDPR
    if (!formData.gdpr) {
      setStatus("Te rog să accepți GDPR înainte de a trimite formularul.");
      return;
    }

    setIsSubmitting(true);
    setStatus("");

    // mapăm câmpurile din formular la ce așteaptă API-ul
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.telefon,
      destination: formData.tip,
      date: formData.perioada,
      budget: formData.buget,
      message: formData.detalii,
    };

    try {
      const res = await fetch("/api/cere-oferta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("Cererea a fost trimisă cu succes! 🎉");
        // resetăm formularul
        setFormData({
          name: "",
          email: "",
          telefon: "",
          tip: "",
          perioada: "",
          buget: "",
          detalii: "",
          gdpr: false,
        });
      } else {
        setStatus("Eroare la trimitere. Încearcă din nou sau scrie-mi direct pe email.");
      }
    } catch (error) {
      console.error("Eroare la trimitere:", error);
      setStatus("A apărut o eroare de rețea. Încearcă din nou.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Cere ofertă personalizată ✈️</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nume"
          required
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="telefon"
          placeholder="Telefon"
          required
          value={formData.telefon}
          onChange={handleChange}
        />

        <input
          type="text"
          name="tip"
          placeholder="Destinație / tip vacanță"
          value={formData.tip}
          onChange={handleChange}
        />

        <input
          type="text"
          name="perioada"
          placeholder="Perioada (ex: 01.02.2026)"
          value={formData.perioada}
          onChange={handleChange}
        />

        <input
          type="text"
          name="buget"
          placeholder="Buget estimativ"
          value={formData.buget}
          onChange={handleChange}
        />

        <textarea
          name="detalii"
          placeholder="Detalii (preferințe, plecare din ce oraș, etc.)"
          value={formData.detalii}
          onChange={handleChange}
        />

        <label style={{ color: "#fff", display: "block", marginTop: "8px" }}>
          <input
            type="checkbox"
            name="gdpr"
            checked={formData.gdpr}
            onChange={handleChange}
            style={{ marginRight: "6px" }}
          />
          Accept prelucrarea datelor conform GDPR.
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Trimit..." : "Trimite"}
        </button>
      </form>

      {status && (
        <p style={{ color: "#f87171", marginTop: "10px" }}>
          {status}
        </p>
      )}
    </div>
  );
}
