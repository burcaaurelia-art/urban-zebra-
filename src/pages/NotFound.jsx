import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container py-20 text-center">
      <p className="gold text-sm font-semibold uppercase tracking-widest">404</p>
      <h1 className="mt-3 text-3xl font-bold">Pagina nu a fost găsită</h1>
      <p className="mt-3 text-white/60">Adresa poate fi greșită sau pagina a fost mutată.</p>
      <Link to="/" className="mt-6 inline-flex rounded-full bg-amber-400 px-6 py-2.5 font-semibold text-black">
        Înapoi la articole
      </Link>
    </div>
  );
}
