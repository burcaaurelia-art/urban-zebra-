import { useState } from "react";

export default function CereOferta() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destinatie: "",
    data: "",
    buget: "",
    message: "",
    gdpr: false,
  });

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
    setStatus("loading");

    const payload = {
      access_key: "e7d6f339-47d1-4294-bebc-a24b8f3994f2",
      subject: `Cerere ofertă de la ${formData.name}`,
      from_name: "Urban.Zebra | Formular ofertă",
      ...formData,
      gdpr: formData.gdpr ? "DA" : "NU", 
      redirect: "0"   // ⚠️ prevenim redirectul care cauza 404
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
          destinatie: "",
          data: "",
          buget: "",
          message: "",
          gdpr: false,
        });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="cere-oferta-container">
      <h2>Cere ofertă personalizată ✈️</h2>

      <form onSubmit={handleSubmit} className="formular-oferta">
        <input
          type="text"
          name="name"
          placeholder="Nume complet"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Telefon"
          value={formData.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="destinatie"
          placeholder="Destinație"
          value={formData.destinatie}
          onChange={handleChange}
        />

        <input
          type="text"
          name="data"
          placeholder="Data plecare"
          value={formData.data}
          onChange={handleChange}
        />

        <input
          type="number"
          name="buget"
          placeholder="Buget"
          value={formData.buget}
          onChange={handleChange}
        />

        <textarea
          name="message"
          placeholder="Detalii"
          value={formData.message}
          onChange={handleChange}
        ></textarea>

        <label className="checkbox-gdpr">
          <input
            type="checkbox"
            name="gdpr"
            checked={formData.gdpr}
            onChange={handleChange}
            required
          />
          Accept GDPR
        </label>

        <button type="submit">Trimite</button>
      </form>

      {status === "success" && (
        <p style={{ color: "lightgreen" }}>
          Mesaj trimis cu succes! Te vom contacta în curând.
        </p>
      )}

      {status === "error" && (
        <p style={{ color: "red" }}>
          Eroare la trimitere. Încearcă din nou.
        </p>
      )}
    </div>
  );
}
