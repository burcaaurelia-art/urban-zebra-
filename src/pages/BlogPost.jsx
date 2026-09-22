import React from 'react'
import { useParams, Link } from 'react-router-dom'
import blogPosts from '../blogData'

function renderTravelGuide(content) {
  const inline = (text) =>
    text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*\n]+)\*/g, '<em>$1</em>')
      .replace(
        /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-amber-400 font-semibold underline decoration-amber-400/50 underline-offset-4 hover:text-amber-300">$1 ↗</a>'
      )

  const lines = content.trim().split('\n')
  const html = []

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim()

    if (!line) continue
    if (line === '---') {
      html.push('<hr />')
      continue
    }
    if (line.startsWith('<')) {
      html.push(line)
      continue
    }
    if (line.startsWith('|')) {
      const rows = []
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        rows.push(lines[i].trim())
        i += 1
      }
      i -= 1
      const dataRows = rows.filter((row) => !/^\|[\s:|-]+\|$/.test(row))
      const cells = dataRows.map((row) =>
        row.slice(1, -1).split('|').map((cell) => inline(cell.trim()))
      )
      if (cells.length) {
        html.push(
          '<table><thead><tr>' +
            cells[0].map((cell) => `<th>${cell}</th>`).join('') +
            '</tr></thead><tbody>' +
            cells.slice(1).map((row) =>
              '<tr>' + row.map((cell) => `<td>${cell}</td>`).join('') + '</tr>'
            ).join('') +
            '</tbody></table>'
        )
      }
      continue
    }
    if (line.startsWith('- ')) {
      const items = []
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(`<li>${inline(lines[i].trim().slice(2))}</li>`)
        i += 1
      }
      i -= 1
      html.push(`<ul>${items.join('')}</ul>`)
      continue
    }
    html.push(`<p>${inline(line)}</p>`)
  }

  return html.join('')
}

export default function BlogPost() {
  const { id } = useParams()
  const post = blogPosts.find(p => p.id === parseInt(id))

  if (!post) {
    return <div className="container py-16 text-center text-white/70">Articolul nu a fost găsit.</div>
  }

  return (
    <div className="container py-8">
      <Link to="/" className="text-white/70 hover:text-white">← Înapoi la <span className="gold">Urban.Zebra</span></Link>

      <img
        src={post.image}
        alt={post.title}
        className="w-full h-64 object-cover rounded-2xl my-6 border border-white/10"
      />

      <h1 className="text-3xl font-bold mb-2 gold">{post.title}</h1>
      <p className="text-white/60 mb-6 text-sm">{post.date}</p>

      {/* Aici e schimbarea importantă */}
      <div
        className="article-content leading-relaxed text-white/90 prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{
          __html: [14, 15, 16].includes(post.id)
            ? renderTravelGuide(post.content)
            : post.content.replace(/\n/g, '<br/>')
        }}
      />
    </div>
  )
}
