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

const payload = {
  access_key: "e6df6339-47d1-4294-bebc-a24b8f3994f2",
  subject: `Cerere ofertă de la ${formData.name}`,
  from_name: "Urban.Zebra | Formular ofertă",
  redirect: "false",
  ...formData,
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
          date: "",
          budget: "",
          message: "",
          gdpr: false,
        });
      } else {
        console.error("Web3Forms error:", data);
        setStatus("error");
      }
    } catch (err) {
      console.error("Network error:", err);
      setStatus("error");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Cere ofertă personalizată ✈️</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "20px",
        }}
      >
        <input
          name="name"
          placeholder="Nume*"
          required
          value={formData.name}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email*"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Telefon*"
          required
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          name="destination"
          placeholder="Destinație"
          value={formData.destination}
          onChange={handleChange}
        />
        <input
          name="date"
          placeholder="Perioada"
          value={formData.date}
          onChange={handleChange}
        />
        <input
          name="budget"
          placeholder="Buget"
          value={formData.budget}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Detalii"
          rows={4}
          value={formData.message}
          onChange={handleChange}
        />

        <label style={{ fontSize: "14px" }}>
          <input
            type="checkbox"
            name="gdpr"
            checked={formData.gdpr}
            onChange={handleChange}
            required
          />{" "}
          Accept GDPR
        </label>

        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Se trimite..." : "Trimite"}
        </button>

        {status === "success" && (
          <p style={{ color: "limegreen" }}>
            Mulțumim! Cererea ta a fost trimisă. Verifică emailul.
          </p>
        )}
        {status === "error" && (
          <p style={{ color: "red" }}>
            Eroare la trimitere. Încearcă din nou sau scrie-ne direct pe email.
          </p>
        )}
      </form>
    </div>
  );
}
