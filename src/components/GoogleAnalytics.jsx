import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const GA_ID = "G-50VXHT9P2V";
const CONSENT_KEY = "urban-zebra-analytics-consent";

function startAnalytics() {
  if (window.__urbanZebraAnalyticsPromise) {
    return window.__urbanZebraAnalyticsPromise;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());

  window.__urbanZebraAnalyticsPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector(`script[data-ga-id="${GA_ID}"]`);

    if (existingScript) {
      if (existingScript.dataset.loaded === "true") resolve();
      else {
        existingScript.addEventListener("load", resolve, { once: true });
        existingScript.addEventListener("error", reject, { once: true });
      }
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    script.dataset.gaId = GA_ID;
    script.addEventListener("load", () => {
      script.dataset.loaded = "true";
      window.gtag("config", GA_ID, { send_page_view: false });
      resolve();
    }, { once: true });
    script.addEventListener("error", reject, { once: true });
    document.head.appendChild(script);
  });

  return window.__urbanZebraAnalyticsPromise;
}

export default function GoogleAnalytics() {
  const location = useLocation();
  const [consent, setConsent] = useState(() => localStorage.getItem(CONSENT_KEY));

  useEffect(() => {
    if (consent !== "accepted") return;

    startAnalytics()
      .then(() => {
        window.gtag("event", "page_view", {
          page_title: document.title,
          page_location: window.location.href,
          page_path: `${location.pathname}${location.search}`,
        });
      })
      .catch(() => {
        // Site-ul rămâne funcțional chiar dacă scriptul Google este blocat.
      });
  }, [consent, location.pathname, location.search]);

  const choose = (value) => {
    localStorage.setItem(CONSENT_KEY, value);
    setConsent(value);
  };

  if (consent) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-3xl rounded-2xl border border-white/15 bg-zinc-950/95 p-4 shadow-2xl backdrop-blur sm:flex sm:items-center sm:gap-5 sm:p-5">
      <div className="flex-1">
        <p className="font-semibold text-white">Cookie-uri pentru statistici</p>
        <p className="mt-1 text-sm leading-relaxed text-white/70">
          Folosim Google Analytics numai cu acordul tău, pentru a afla ce articole sunt utile. Poți continua și fără cookie-uri de analiză.
        </p>
      </div>
      <div className="mt-4 flex flex-col gap-2 sm:mt-0 sm:min-w-[190px]">
        <button
          type="button"
          onClick={() => choose("accepted")}
          className="rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-black hover:bg-amber-300"
        >
          Acceptă statisticile
        </button>
        <button
          type="button"
          onClick={() => choose("declined")}
          className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
        >
          Doar necesare
        </button>
      </div>
    </div>
  );
}
