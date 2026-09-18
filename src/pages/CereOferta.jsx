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
    website: "",
    gdpr: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("");
  const today = new Date().toISOString().slice(0, 10);

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
      setStatusType("error");
      return;
    }

    if (formData.plecare && formData.intoarcere && formData.intoarcere < formData.plecare) {
      setStatus("Data întoarcerii trebuie să fie după data plecării.");
      setStatusType("error");
      return;
    }

    setIsSubmitting(true);
    setStatus("");
    setStatusType("");

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
      website: formData.website,
    };

    try {
      const res = await fetch("/api/trimite", {
        method: "POST",
        cache: "no-store",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setStatus("Cererea a fost trimisă cu succes! 🎉");
        setStatusType("success");
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
          website: "",
          gdpr: false,
        });
      } else {
        setStatus(
          "Eroare la trimitere. Încearcă din nou sau scrie-mi direct pe email."
        );
        setStatusType("error");
      }
    } catch (error) {
      console.error("Eroare la trimitere:", error);
      setStatus("A apărut o eroare de rețea. Încearcă din nou.");
      setStatusType("error");
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
            required
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
              placeholder="Vârste copii (ex:5,8)"
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
              min={today}
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
              min={formData.plecare || today}
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

        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Nu completa acest câmp</label>
          <input
            id="website"
            type="text"
            name="website"
            tabIndex="-1"
            autoComplete="off"
            value={formData.website}
            onChange={handleChange}
          />
        </div>

        {/* GDPR */}
        <label className="flex items-center gap-2 text-sm text-zinc-200 mt-2">
          <input
            type="checkbox"
            name="gdpr"
            checked={formData.gdpr}
            onChange={handleChange}
          />
          Accept folosirea datelor pentru pregătirea și comunicarea ofertei solicitate.
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

      {status && (
        <div
          role="status"
          className={`mt-4 rounded-lg border p-3 text-sm ${
            statusType === "success"
              ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
              : "border-red-400/40 bg-red-400/10 text-red-300"
          }`}
        >
          <p>{status}</p>
          {statusType === "error" && (
            <a
              href="https://wa.me/40754612036"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block font-semibold underline"
            >
              Trimite cererea direct pe WhatsApp
            </a>
          )}
        </div>
      )}
    </div>
  );
}
