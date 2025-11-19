import React from "react";
import { Link } from "react-router-dom";
import blogData from "../blogdata";

export default function BlogList() {
  return (
    <div className="max-w-6xl mx-auto pb-16">
      <h1 className="text-3xl font-bold mb-8">Articole recente</h1>

      <div className="grid gap-6 md:grid-cols-3">
        {blogData.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.id}`}
            className="block bg-zinc-900 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-transform duration-200"
          >
            {post.image && (
              <div className="h-40 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <p className="text-xs uppercase tracking-wide text-zinc-400 mb-1">
                {post.location || post.category}
              </p>
              <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
              {post.excerpt && (
                <p className="text-sm text-zinc-300 line-clamp-3">
                  {post.excerpt}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
