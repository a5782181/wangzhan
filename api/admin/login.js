export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const password = process.env.ADMIN_PASSWORD || 'dsw315210**'
  const input = req.body && req.body.password

  if (input === password) {
    return res.status(200).json({ success: true, user: 'admin' })
  }
  return res.status(401).json({ success: false, message: '密码错误' })
}
