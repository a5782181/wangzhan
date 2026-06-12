export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const data = req.body || {}
  const record = {
    timestamp: new Date().toISOString(),
    plan: data.plan || 'unknown',
    price: data.price || 'unknown',
    recipeName: data.recipeName || 'unknown',
    page: data.page || 'unknown',
    ip: (req.headers['x-forwarded-for'] || '').split(',')[0] || req.socket.remoteAddress,
    userAgent: req.headers['user-agent'] || '',
    referer: req.headers['referer'] || ''
  }

  console.log('[TRACK]', JSON.stringify(record))

  return res.status(200).json({ success: true, message: '已记录' })
}
