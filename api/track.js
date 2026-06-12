const REPO = 'a5782181/wangzhan'
const FILE_PATH = 'data/site.json'

async function readRaw(token) {
  const res = await fetch(`https://raw.githubusercontent.com/${REPO}/main/${FILE_PATH}?t=${Date.now()}`)
  if (res.ok) return await res.json()
  return { articles: [], plans: [], heroSlides: [], clicks: [], visits: [] }
}

async function getSha(token) {
  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`, {
    headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' }
  })
  if (res.ok) return (await res.json()).sha
  return null
}

async function writeWithRetry(token, data, sha, record, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const content = Buffer.from(JSON.stringify(data, null, 2)).toString('base64')
    const body = { message: '自动记录点击数据', content }
    if (sha) body.sha = sha

    const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`, {
      method: 'PUT',
      headers: { 'Authorization': `token ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    if (res.ok) return true
    if (res.status === 409 && attempt < maxRetries - 1) {
      const fresh = await readRaw(token)
      sha = await getSha(token)
      data = fresh
      if (!data.clicks) data.clicks = []
      if (!data.visits) data.visits = []
      if (record.type === 'visit') {
        const today = new Date().toISOString().slice(0, 10)
        const alreadyToday = data.visits.some(v => v.visitor === record.visitor && v.ip === record.ip && v.time && v.time.slice(0, 10) === today)
        if (!alreadyToday) data.visits.push(record)
      } else {
        data.clicks.push(record)
        if (data.clicks.length > 500) data.clicks = data.clicks.slice(-500)
      }
      data.lastSync = new Date().toISOString()
      continue
    }
    return false
  }
  return false
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const token = process.env.GITHUB_TOKEN
  if (!token) return res.status(200).json({ success: true, message: '未配置Token，仅记录日志' })

  const body = req.body || {}
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0] || req.socket.remoteAddress || 'unknown'

  const vercelCountry = req.headers['x-vercel-ip-country'] || ''
  const vercelCity = req.headers['x-vercel-ip-city'] || ''
  const vercelRegion = req.headers['x-vercel-ip-country-region'] || ''

  const country = body.country || COUNTRY_NAMES[vercelCountry] || vercelCountry || '未知'
  const city = (vercelCity && vercelCity !== 'Unknown' ? vercelCity : body.city) || ''

  const record = {
    time: new Date().toISOString(),
    type: body.type || 'click',
    visitor: body.visitor || 'v_' + Date.now(),
    ip: ip,
    country: country,
    city: city,
    countryCode: vercelCountry || ''
  }

  if (record.type !== 'visit') {
    record.plan = body.plan || 'unknown'
    record.price = body.price || 'unknown'
    record.recipe = body.recipeName || body.recipe || 'unknown'
    record.page = body.page || ''
  } else {
    record.page = body.page || ''
  }

  try {
    const [siteData, sha] = await Promise.all([readRaw(token), getSha(token)])
    if (!siteData.clicks) siteData.clicks = []
    if (!siteData.visits) siteData.visits = []
    if (record.type === 'visit') {
      const today = new Date().toISOString().slice(0, 10)
      const alreadyToday = siteData.visits.some(v => v.visitor === record.visitor && v.ip === record.ip && v.time && v.time.slice(0, 10) === today)
      if (!alreadyToday) siteData.visits.push(record)
    } else {
      siteData.clicks.push(record)
      if (siteData.clicks.length > 500) siteData.clicks = siteData.clicks.slice(-500)
    }
    siteData.lastSync = new Date().toISOString()
    const ok = await writeWithRetry(token, siteData, sha, record)
    if (ok) return res.status(200).json({ success: true, message: '已记录并同步' })
    return res.status(200).json({ success: true, message: '已记录' })
  } catch (e) {
    console.error('[TRACK ERROR]', e.message)
    return res.status(200).json({ success: true, message: '已记录' })
  }
}
