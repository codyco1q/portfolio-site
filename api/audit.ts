import type { VercelRequest, VercelResponse } from '@vercel/node'

const AUDIT_WEBHOOK_URL = process.env.AUDIT_WEBHOOK_URL ?? ''
const FALLBACK_EMAIL = 'codyaxton@outlook.com'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!AUDIT_WEBHOOK_URL) {
    return res.status(500).json({ error: 'Audit webhook URL not configured' })
  }

  try {
    const { name, email, website } = req.body ?? {}

    if (!name || !email) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const upstream = await fetch(AUDIT_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: 'New Automation Audit Request',
        _template: 'table',
        _captcha: 'false',
        type: 'audit-request',
        name,
        email,
        website: website ?? '',
      }),
    })

    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: 'Upstream request failed' })
    }

    return res.status(200).json({ ok: true })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}
