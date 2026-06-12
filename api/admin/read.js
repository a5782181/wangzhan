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
    const metaRes = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`, {
      headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' }
    })
    if (!metaRes.ok) return res.status(200).json({ success: true, data: { articles: [], plans: [], heroSlides: [], clicks: [], visits: [] } })

    const meta = await metaRes.json()
    const blobRes = await fetch(meta.git_url, {
      headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' }
    })
    if (!blobRes.ok) return res.status(200).json({ success: true, data: { articles: [], plans: [], heroSlides: [], clicks: [], visits: [] } })

    const blob = await blobRes.json()
    const data = JSON.parse(Buffer.from(blob.content, 'base64').toString())
    return res.status(200).json({ success: true, data })
  } catch (e) {
    return res.status(200).json({ success: false, message: e.message })
  }
}
