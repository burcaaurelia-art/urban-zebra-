import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur">
      <nav className="container flex items-center justify-between py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1">
          <span className="text-2xl font-extrabold tracking-tight text-white">
            Urban
          </span>
          <span className="text-2xl font-extrabold tracking-tight gold">
            .Zebra
          </span>
        </Link>

        {/* Meniu + buton */}
        <div className="flex items-center gap-6">
          {/* Linkuri meniu simple */}
          <div className="hidden sm:flex items-center gap-4 text-sm">
            <Link
              to="/"
              className="text-white/80 hover:text-gold transition-colors"
            >
              Blog
            </Link>

            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-white/80 hover:text-gold transition-colors"
            >
              Instagram
            </a>

            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer"
              className="text-white/80 hover:text-gold transition-colors"
            >
              Facebook
            </a>
          </div>

          {/* Buton Cere ofertă */}
          <Link
            to="/cere-oferta"
            className="inline-flex items-center justify-center px-4 sm:px-5 py-2 rounded-full bg-amber-400 text-black text-xs sm:text-sm font-semibold hover:bg-amber-300 transition-colors shadow-md"
          >
            Cere ofertă ✈️
          </Link>
        </div>
      </nav>
    </header>
  );
}
