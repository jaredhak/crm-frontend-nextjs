import { useEffect, useState } from "react"

const BACKEND_URL = "https://crm-project-production-875a.up.railway.app"

export default function Home() {
  const [leads, setLeads] = useState([])
  const [newLead, setNewLead] = useState({ name: "", phone: "", source: "", notes: "" })

  useEffect(() => {
    fetch(`${BACKEND_URL}/leads`).then(res => res.json()).then(setLeads)
  }, [])

  const handleChange = (e) => {
    setNewLead({ ...newLead, [e.target.name]: e.target.value })
  }

  const addLead = async () => {
    await fetch(`${BACKEND_URL}/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLead)
    })
    setNewLead({ name: "", phone: "", source: "", notes: "" })
    const res = await fetch(`${BACKEND_URL}/leads`)
    const data = await res.json()
    setLeads(data)
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>CRM Dashboard</h1>
      <div style={{ marginBottom: 16 }}>
        <input name="name" placeholder="Name" value={newLead.name} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={newLead.phone} onChange={handleChange} />
        <input name="source" placeholder="Source" value={newLead.source} onChange={handleChange} />
        <input name="notes" placeholder="Notes" value={newLead.notes} onChange={handleChange} />
        <button onClick={addLead}>Add Lead</button>
      </div>
      <ul>
        {leads.map((lead) => (
          <li key={lead.id}>{lead.name} — {lead.phone}</li>
        ))}
      </ul>
    </div>
  )
}
