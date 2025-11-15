import { useState } from "react";

export default function CereOferta() {
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

  const [status, setStatus] = useState("idle");

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
      access_key: "e6df6339-47d1-4294-bebc-a24b8f3994f2", // cheia ta Web3Forms
      subject: `Cerere ofertă de la ${formData.name}`,
      from_name: "Urban.Zebra | Formular ofertă",
      ...formData,
      gdpr: formData.gdpr ? "DA" : "NU",
      // ATENTIE: NU punem redirect aici, lăsăm Web3Forms doar să răspundă în JSON
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
        console.error("Web3Forms response:", data);
        setStatus("error");
      }
    } catch (err) {
      console.error("Network error:", err);
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-2 py-1 bg-[#f4f6ff] text-black border border-black text-sm";

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-lg font-semibold mb-4">
        Cere ofertă personalizată ✈️
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-sm">
        <input
          className={inputClass}
          name="name"
          placeholder="Nume*"
          required
          value={formData.name}
          onChange={handleChange}
        />
        <input
          className={inputClass}
          type="email"
          name="email"
          placeholder="Email*"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input
          className={inputClass}
          name="phone"
          placeholder="Telefon"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          className={inputClass}
          name="destination"
          placeholder="Destinație"
          value={formData.destination}
          onChange={handleChange}
        />
        <input
          className={inputClass}
          name="date"
          placeholder="Perioada"
          value={formData.date}
          onChange={handleChange}
        />
        <input
          className={inputClass}
          name="budget"
          placeholder="Buget"
          value={formData.budget}
          onChange={handleChange}
        />
        <textarea
          className={`${inputClass} min-h-[120px]`}
          name="message"
          placeholder="Detalii"
          value={formData.message}
          onChange={handleChange}
        />

        <label className="flex items-center gap-2 text-xs mt-2">
          <input
            type="checkbox"
            name="gdpr"
            checked={formData.gdpr}
            onChange={handleChange}
            required
          />
          <span>Accept GDPR</span>
        </label>

        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-3 border border-white px-4 py-1 text-sm hover:bg-white hover:text-black transition disabled:opacity-60"
        >
          {status === "loading" ? "Se trimite..." : "Trimite"}
        </button>

        {status === "success" && (
          <p className="text-green-400 text-xs mt-2">
            Mulțumim! Cererea ta a fost trimisă. ✨
          </p>
        )}
        {status === "error" && (
          <p className="text-red-400 text-xs mt-2">
            Eroare la trimitere. Încearcă din nou sau scrie-ne direct pe email.
          </p>
        )}
      </form>
    </div>
  );
}
