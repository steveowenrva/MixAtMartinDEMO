'use client'
import { useState } from 'react'

export default function Admin() {
  const [form, setForm] = useState({
    title: '', artist: '', genres: '', moods: '',
    licenses: '[{"type":"Web","cost":50}]', audioFile: ''
  })

  async function submit() {
    await fetch('/api/songs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    alert('Saved')
  }

  return (
    <main className="p-8">
      <h1 className="text-xl font-bold mb-4">Admin</h1>
      {Object.keys(form).map(key => (
        <input
          key={key}
          placeholder={key}
          className="border p-2 mb-2 w-full"
          onChange={e => setForm({ ...form, [key]: e.target.value })}
        />
      ))}
      <button onClick={submit} className="bg-black text-white px-4 py-2">
        Save Song
      </button>
    </main>
  )
}