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

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const metaRes = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`, {
        headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' }
      })
      if (!metaRes.ok) return res.status(200).json({ success: false, message: '读取失败' })
      const meta = await metaRes.json()
      const sha = meta.sha

      const blobRes = await fetch(meta.git_url, {
        headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' }
      })
      if (!blobRes.ok) return res.status(200).json({ success: false, message: '读取失败' })
      const blob = await blobRes.json()
      const existing = JSON.parse(Buffer.from(blob.content, 'base64').toString())

      const data = {
        articles: existing.articles || [],
        plans: existing.plans || [],
        heroSlides: existing.heroSlides || [],
        clicks: [],
        visits: [],
        lastSync: new Date().toISOString()
      }

      const content = Buffer.from(JSON.stringify(data, null, 2)).toString('base64')
      const body = { message: '清空点击/访问记录', content, sha }

      const writeRes = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`, {
        method: 'PUT',
        headers: { 'Authorization': `token ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (writeRes.ok) return res.status(200).json({ success: true, message: '已清空' })
      if (writeRes.status === 409 && attempt < 2) continue
      return res.status(200).json({ success: false, message: '清空失败' })
    } catch (e) {
      if (attempt < 2) continue
      return res.status(200).json({ success: false, message: e.message })
    }
  }
}
