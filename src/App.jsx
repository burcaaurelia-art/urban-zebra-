import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import BlogList from "./components/BlogList.jsx";
import BlogPost from "./components/BlogPost.jsx";
import CereOferta from "./CereOferta.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />

      <main className="pt-[120px] px-4 flex-1 transition-all duration-300">
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/cere-oferta" element={<CereOferta />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
