import React from 'react'
import { useParams, Link } from 'react-router-dom'
import blogPosts from '../blogData'

export default function BlogPost(){
  const { id } = useParams()
  const post = blogPosts.find(p => p.id === parseInt(id))
  if(!post){ return <div className="container py-16 text-center text-white/70">Articolul nu a fost găsit.</div> }
  return (
    <div className="pb-16">
      <div className="relative w-full h-[60vh] bg-black">
        <img src={post.image || 'https://wsrv.nl/?url=https://source.unsplash.com/1600x900/?city'} alt={post.title}
             className="absolute inset-0 w-full h-full object-cover"
             onError={(e)=>{ e.currentTarget.src='https://wsrv.nl/?url=https://source.unsplash.com/1600x900/?romania,city'; }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-white max-w-3xl px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-2 gold drop-shadow-lg">{post.title}</h1>
          <p className="text-white/70 text-sm">{post.date}</p>
        </div>
      </div>
      <div className="container max-w-3xl pt-10 text-white/90 leading-relaxed">
        <Link to="/" className="inline-block mb-8 text-white/70 hover:text-gold transition">← Înapoi la <span className="gold">Urban.Zebra</span></Link>
        <div className="whitespace-pre-line text-base md:text-lg">{post.content}</div>
      </div>
    </div>
  )
}
