const REPO = 'a5782181/wangzhan'
const FILE_PATH = 'data/site.json'

async function getFileSha(token) {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`, {
      headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' }
    })
    if (res.ok) {
      const data = await res.json()
      return data.sha
    }
  } catch (e) {}
  return null
}

async function readData(token) {
  try {
    const res = await fetch(`https://raw.githubusercontent.com/${REPO}/main/${FILE_PATH}`)
    if (res.ok) return await res.json()
  } catch (e) {}
  return { articles: [], plans: [], heroSlides: [], clicks: [], visits: [] }
}

async function writeData(token, data, sha) {
  const content = Buffer.from(JSON.stringify(data, null, 2)).toString('base64')
  const body = { message: '自动记录点击数据', content }
  if (sha) body.sha = sha
  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`, {
    method: 'PUT',
    headers: { 'Authorization': `token ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  return res.ok
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const token = process.env.GITHUB_TOKEN
  if (!token) return res.status(200).json({ success: true, message: '未配置Token，仅记录日志' })

  const data = req.body || {}
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0] || req.socket.remoteAddress || 'unknown'

  const click = {
    time: new Date().toISOString(),
    plan: data.plan || 'unknown',
    price: data.price || 'unknown',
    recipe: data.recipeName || data.recipe || 'unknown',
    visitor: data.visitor || 'v_' + Date.now(),
    ip: ip,
    country: data.country || '未知',
    city: data.city || ''
  }

  try {
    const [siteData, sha] = await Promise.all([readData(token), getFileSha(token)])
    if (!siteData.clicks) siteData.clicks = []
    siteData.clicks.push(click)
    if (siteData.clicks.length > 500) siteData.clicks = siteData.clicks.slice(-500)
    siteData.lastSync = new Date().toISOString()
    const ok = await writeData(token, siteData, sha)
    if (ok) return res.status(200).json({ success: true, message: '已记录并同步' })
    return res.status(200).json({ success: true, message: '已记录' })
  } catch (e) {
    console.error('[TRACK ERROR]', e.message)
    return res.status(200).json({ success: true, message: '已记录' })
  }
}
