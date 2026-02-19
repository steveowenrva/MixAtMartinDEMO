'use client'
import { useEffect, useState } from 'react'

export default function Home() {
  const [songs, setSongs] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/songs').then(r => r.json()).then(setSongs)
  }, [])

  const filtered = songs.filter((s: any) =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.artist.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Music Licensing Database</h1>
      <input
        placeholder="Search…"
        className="border p-2 mb-4 w-full"
        onChange={e => setSearch(e.target.value)}
      />

      <table className="w-full border">
        <thead>
          <tr className="border-b">
            <th>Play</th><th>Title</th><th>Artist</th><th>Genres</th><th>Moods</th><th>Licenses</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((song: any) => (
            <tr key={song.id} className="border-b">
              <td>
                <audio controls src={`/audio/${song.audioFile}`} />
              </td>
              <td>{song.title}</td>
              <td>{song.artist}</td>
              <td>{song.genres}</td>
              <td>{song.moods}</td>
              <td>
                {JSON.parse(song.licenses).map((l: any) => (
                  <div key={l.type}>{l.type}: ${l.cost}</div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}