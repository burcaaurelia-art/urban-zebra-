import React, { useState } from "react";

export default function CereOferta() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telefon: "",
    vacantaTip: "",
    adulti: "",
    copii: "",
    varsteCopii: "",
    tip: "",
    plecare: "",
    intoarcere: "",
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

    // combinăm plecare + întoarcere într-un singur text pentru email
    let perioadaText = "";
    if (formData.plecare && formData.intoarcere) {
      perioadaText = `${formData.plecare} – ${formData.intoarcere}`;
    } else if (formData.plecare || formData.intoarcere) {
      perioadaText = formData.plecare || formData.intoarcere;
    }

    // construim mesajul astfel încât să includă tip vacanță + persoane + detalii
    const persoaneText = `Persoane: ${formData.adulti || "0"} adulți, ${
      formData.copii || "0"
    } copii${
      formData.varsteCopii
        ? ` (vârste copii: ${formData.varsteCopii})`
        : ""
    }`;

    const tipVacantaText = `Tip vacanță: ${
      formData.vacantaTip || "nespecificat"
    }`;

    const customMessage = `${tipVacantaText}\n${persoaneText}\n\nDetalii suplimentare:\n${
      formData.detalii || "-"
    }`;

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.telefon,
      vacationType: formData.vacantaTip,
      destination: formData.tip,
      date: perioadaText,
      budget: formData.buget,
      message: customMessage,
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
          vacantaTip: "",
          adulti: "",
          copii: "",
          varsteCopii: "",
          tip: "",
          plecare: "",
          intoarcere: "",
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
        {/* NUME */}
        <input
          type="text"
          name="name"
          placeholder="Nume"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-zinc-900 rounded-md border border-zinc-700 outline-none"
        />

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-zinc-900 rounded-md border border-zinc-700 outline-none"
        />

        {/* TELEFON */}
        <input
          type="text"
          name="telefon"
          placeholder="Telefon"
          required
          value={formData.telefon}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-zinc-900 rounded-md border border-zinc-700 outline-none"
        />

        {/* TIP VACANȚĂ */}
        <div>
          <label className="block text-sm text-zinc-300 mb-1">
            Ce tip de vacanță vă doriți?
          </label>
          <select
            name="vacantaTip"
            value={formData.vacantaTip}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-zinc-900 rounded-md border border-zinc-700 outline-none"
          >
            <option value="">Selectați...</option>
            <option value="Relaxare">Relaxare</option>
            <option value="Aventură">Aventură</option>
            <option value="City break">City break</option>
            <option value="All-inclusive">All-inclusive</option>
            <option value="Culturală">Culturală</option>
            <option value="Croazieră">Croazieră</option>
            <option value="Circuit">Circuit</option>
            <option value="Altele">Altele</option>
          </select>
        </div>

        {/* CÂTE PERSOANE */}
        <div>
          <label className="block text-sm text-zinc-300 mb-1">
            Câte persoane vor călători? (adulți, copii, vârste)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="number"
              name="adulti"
              min="1"
              placeholder="Adulți"
              value={formData.adulti}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-zinc-900 rounded-md border border-zinc-700 outline-none"
            />
            <input
              type="number"
              name="copii"
              min="0"
              placeholder="Copii"
              value={formData.copii}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-zinc-900 rounded-md border border-zinc-700 outline-none"
            />
            <input
              type="text"
              name="varsteCopii"
              placeholder="Vârste copii (ex: 5, 8)"
              value={formData.varsteCopii}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-zinc-900 rounded-md border border-zinc-700 outline-none"
            />
          </div>
        </div>

        {/* DESTINAȚIE */}
        <input
          type="text"
          name="tip"
          placeholder="Destinație dorită"
          value={formData.tip}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-zinc-900 rounded-md border border-zinc-700 outline-none"
        />

        {/* Perioadă: plecare + întoarcere */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-zinc-300 mb-1">
              Data plecare
            </label>
            <input
              type="date"
              name="plecare"
              value={formData.plecare}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-zinc-900 rounded-md border border-zinc-700 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-300 mb-1">
              Data întoarcere
            </label>
            <input
              type="date"
              name="intoarcere"
              value={formData.intoarcere}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-zinc-900 rounded-md border border-zinc-700 outline-none"
            />
          </div>
        </div>

        {/* BUGET */}
        <input
          type="text"
          name="buget"
          placeholder="Buget estimativ"
          value={formData.buget}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-zinc-900 rounded-md border border-zinc-700 outline-none"
        />

        {/* DETALII */}
        <textarea
          name="detalii"
          placeholder="Detalii (preferințe, oraș plecare, etc.)"
          value={formData.detalii}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-zinc-900 rounded-md border border-zinc-700 outline-none min-h-[120px]"
        />

        {/* GDPR */}
        <label className="flex items-center gap-2 text-sm text-zinc-200 mt-2">
          <input
            type="checkbox"
            name="gdpr"
            checked={formData.gdpr}
            onChange={handleChange}
          />
          Accept prelucrarea datelor conform GDPR.
        </label>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-2 py-2 rounded-md bg-amber-400 text-black font-semibold disabled:opacity-60"
        >
          {isSubmitting ? "Trimit..." : "Trimite"}
        </button>
      </form>

      {status && <p className="mt-4 text-sm text-red-400">{status}</p>}
    </div>
  );
}
