const REPO = 'a5782181/wangzhan'
const FILE_PATH = 'data/site.json'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const token = process.env.GITHUB_TOKEN
  if (!token) return res.status(200).json({ success: false, message: '未配置GitHub Token' })

  try {
    const ghRes = await fetch(`https://raw.githubusercontent.com/${REPO}/main/${FILE_PATH}?t=${Date.now()}`)
    let data = { articles: [], plans: [], heroSlides: [], clicks: [], visits: [] }
    if (ghRes.ok) data = await ghRes.json()

    data.clicks = []
    data.visits = []
    data.lastSync = new Date().toISOString()

    const shaRes = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`, {
      headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' }
    })
    let sha = null
    if (shaRes.ok) sha = (await shaRes.json()).sha

    const content = Buffer.from(JSON.stringify(data, null, 2)).toString('base64')
    const body = { message: '清空点击/访问记录', content }
    if (sha) body.sha = sha

    const writeRes = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`, {
      method: 'PUT',
      headers: { 'Authorization': `token ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    if (writeRes.ok) return res.status(200).json({ success: true, message: '已清空' })
    return res.status(200).json({ success: false, message: '清空失败' })
  } catch (e) {
    return res.status(200).json({ success: false, message: e.message })
  }
}
