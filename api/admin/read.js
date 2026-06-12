const REPO = 'a5782181/wangzhan'
const FILE_PATH = 'data/site.json'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()

  const token = process.env.GITHUB_TOKEN
  if (!token) return res.status(200).json({ success: false, message: '未配置GitHub Token' })

  try {
    const ghRes = await fetch(`https://raw.githubusercontent.com/${REPO}/main/${FILE_PATH}?t=${Date.now()}`)
    if (ghRes.ok) {
      const data = await ghRes.json()
      return res.status(200).json({ success: true, data })
    }
    return res.status(200).json({ success: true, data: { articles: [], plans: [], heroSlides: [], clicks: [], visits: [] } })
  } catch (e) {
    return res.status(200).json({ success: false, message: e.message })
  }
}
