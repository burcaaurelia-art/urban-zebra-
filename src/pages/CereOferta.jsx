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

    if (!formData.gdpr) {
      setStatus("Te rog să accepți GDPR înainte de a trimite formularul.");
      return;
    }

    setIsSubmitting(true);
    setStatus("");

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
      const res = await fetch("/api/CereOferta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("Cererea a fost trimisă cu succes! 🎉");
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
        setStatus(
          "Eroare la trimitere. Încearcă din nou sau scrie-mi direct pe email."
        );
      }
    } catch (error) {
      console.error("Eroare la trimitere:", error);
      setStatus("A apărut o eroare de rețea. Încearcă din nou.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto pb-16">
      <h2 className="text-2xl font-bold mb-6">Cere ofertă personalizată ✈️</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Nume"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-zinc-900 rounded-md border border-zinc-700 outline-none"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-zinc-900 rounded-md border border-zinc-700 outline-none"
        />

        <input
          type="text"
          name="telefon"
          placeholder="Telefon"
          required
          value={formData.telefon}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-zinc-900 rounded-md border border-zinc-700 outline-none"
        />

        <input
          type="text"
          name="tip"
          placeholder="Destinație / tip vacanță"
          value={formData.tip}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-zinc-900 rounded-md border border-zinc-700 outline-none"
        />

        <input
          type="text"
          name="perioada"
          placeholder="Perioada (ex: 01.02.2026)"
          value={formData.perioada}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-zinc-900 rounded-md border border-zinc-700 outline-none"
        />

        <input
          type="text"
          name="buget"
          placeholder="Buget estimativ"
          value={formData.buget}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-zinc-900 rounded-md border border-zinc-700 outline-none"
        />

        <textarea
          name="detalii"
          placeholder="Detalii (preferințe, oraș plecare, etc.)"
          value={formData.detalii}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-zinc-900 rounded-md border border-zinc-700 outline-none min-h-[120px]"
        />

        <label className="flex items-center gap-2 text-sm text-zinc-200 mt-2">
          <input
            type="checkbox"
            name="gdpr"
            checked={formData.gdpr}
            onChange={handleChange}
          />
          Accept prelucrarea datelor conform GDPR.
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-2 py-2 rounded-md bg-amber-400 text-black font-semibold disabled:opacity-60"
        >
          {isSubmitting ? "Trimit..." : "Trimite"}
        </button>
      </form>

      {status && (
        <p className="mt-4 text-sm text-red-400">
          {status}
        </p>
      )}
    </div>
  );
}
