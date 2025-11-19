import React from "react";
import { Link } from "react-router-dom";
import blogPosts from "../blogData";

export default function BlogList() {
  return (
    <div className="container py-6">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10 tracking-tight">
        <span className="text-white">Urban</span>
        <span className="gold">.Zebra</span>
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => {
          return (
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
                  <h2 className="font-semibold text-lg mb-1 text-white group-hover:text-gold transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-white/60 text-sm mb-2">{post.date}</p>
                  <p className="text-white/80 text-sm leading-snug line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
