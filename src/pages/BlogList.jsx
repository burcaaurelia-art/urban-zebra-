import React from "react";
import { Link } from "react-router-dom";
import blogPosts from "../blogData";

export default function BlogList() {
  return (
    <div className="container py-6">
      {/* Titlu + buton cere ofertă */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          <span className="text-white">Urban</span>
          <span className="gold">.Zebra</span>
        </h1>

        <Link
          to="/cere-oferta"
          className="mt-4 sm:mt-0 inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-amber-400 text-black text-sm font-semibold hover:bg-amber-300 transition-colors shadow-lg"
        >
          Cere ofertă personalizată ✈️
        </Link>
      </div>

      {/* Grid articole */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.id}`}
            className="group rounded-2xl bg-gray-900 border border-white/10 hover:border-gold/40 shadow-lg transition-all duration-300 flex flex-col overflow-hidden"
          >
            <div className="relative w-full h-56 bg-black">
              <img
                src={
                  post.image ||
                  "https://wsrv.nl/?url=https://source.unsplash.com/800x600/?romania,city"
                }
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://wsrv.nl/?url=https://source.unsplash.com/800x600/?romania,city";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h
