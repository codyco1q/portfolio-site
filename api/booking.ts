import type { VercelRequest, VercelResponse } from '@vercel/node'

const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL ?? ''

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!MAKE_WEBHOOK_URL) {
    return res.status(500).json({ error: 'Webhook URL not configured' })
  }

  try {
    const { name, email, date, time, startDateTime, notes } = req.body ?? {}

    if (!name || !email || !date || !time) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const upstream = await fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, date, time, startDateTime, notes }),
    })

    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: 'Upstream request failed' })
    }

    return res.status(200).json({ ok: true })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}
