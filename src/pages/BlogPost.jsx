import React from "react";
import { useParams, Link } from "react-router-dom";
import blogData from "../blogdata";

export default function BlogPost() {
  const { id } = useParams();
  const post = blogData.find((p) => String(p.id) === String(id));

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto pb-16">
        <p className="mb-4">Articolul nu a fost găsit.</p>
        <Link to="/" className="text-amber-400 underline">
          Înapoi la blog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pb-16 space-y-6">
      <Link to="/" className="text-amber-400 underline text-sm">
        ← Înapoi la blog
      </Link>

      <h1 className="text-3xl font-bold">{post.title}</h1>

      {post.image && (
        <div className="rounded-2xl overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[260px] md:h-[340px] object-cover"
          />
        </div>
      )}

      {post.date && (
        <p className="text-xs uppercase tracking-wide text-zinc-400">
          {post.date} {post.location && `• ${post.location}`}
        </p>
      )}

      {Array.isArray(post.content)
        ? post.content.map((para, i) => (
            <p key={i} className="text-zinc-100 leading-relaxed">
              {para}
            </p>
          ))
        : post.content && (
            <p className="text-zinc-100 leading-relaxed">{post.content}</p>
          )}
    </div>
  );
}
