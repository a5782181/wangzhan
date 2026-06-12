const REPO = 'a5782181/wangzhan'
const FILE_PATH = 'data/site.json'

const COUNTRY_NAMES = {
  CN:'中国', US:'United States', GB:'United Kingdom', JP:'日本', KR:'한국',
  TW:'Taiwan', HK:'Hong Kong', DE:'Germany', FR:'France', CA:'Canada',
  AU:'Australia', SG:'Singapore', MY:'Malaysia', TH:'Thailand', VN:'Vietnam',
  IN:'India', PH:'Philippines', ID:'Indonesia', MO:'Macau', RU:'Russia',
  BR:'Brazil', MX:'Mexico', IT:'Italy', ES:'Spain', NL:'Netherlands',
  CH:'Switzerland', SE:'Sweden', NO:'Norway', DK:'Denmark', FI:'Finland',
  NZ:'New Zealand', ZA:'South Africa', AR:'Argentina', IL:'Israel',
  PT:'Portugal', BE:'Belgium', AT:'Austria', IE:'Ireland', PL:'Poland',
  CZ:'Czech', GR:'Greece', HU:'Hungary', RO:'Romania', UA:'Ukraine',
  TR:'Turkey', SA:'Saudi Arabia', AE:'UAE', EG:'Egypt', NG:'Nigeria',
  KE:'Kenya', PK:'Pakistan', BD:'Bangladesh', LK:'Sri Lanka', MM:'Myanmar'
}

async function getFileSha(token) {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`, {
      headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' }
    })
    if (res.ok) return (await res.json()).sha
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

  const body = req.body || {}
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0] || req.socket.remoteAddress || 'unknown'

  const vercelCountry = req.headers['x-vercel-ip-country'] || ''
  const vercelCity = req.headers['x-vercel-ip-city'] || ''
  const vercelRegion = req.headers['x-vercel-ip-country-region'] || ''

  const country = body.country || COUNTRY_NAMES[vercelCountry] || vercelCountry || '未知'
  const city = (vercelCity && vercelCity !== 'Unknown' ? vercelCity : body.city) || ''

  const click = {
    time: new Date().toISOString(),
    plan: body.plan || 'unknown',
    price: body.price || 'unknown',
    recipe: body.recipeName || body.recipe || 'unknown',
    visitor: body.visitor || 'v_' + Date.now(),
    ip: ip,
    country: country,
    city: city,
    countryCode: vercelCountry || ''
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
