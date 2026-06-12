const REPO = 'a5782181/wangzhan'
const FILE_PATH = 'data/site.json'

async function readLatest(token) {
  const metaRes = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`, {
    headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' }
  })
  if (!metaRes.ok) return { data: { articles: [], plans: [], heroSlides: [], clicks: [], visits: [] }, sha: null }
  const meta = await metaRes.json()
  const blobRes = await fetch(meta.git_url, {
    headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' }
  })
  if (!blobRes.ok) return { data: { articles: [], plans: [], heroSlides: [], clicks: [], visits: [] }, sha: meta.sha }
  const blob = await blobRes.json()
  const data = JSON.parse(Buffer.from(blob.content, 'base64').toString())
  return { data, sha: meta.sha }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const token = process.env.GITHUB_TOKEN
  if (!token) return res.status(200).json({ success: false, message: '未配置GitHub Token' })

  const incoming = req.body
  if (!incoming) return res.status(200).json({ success: false, message: '无数据' })

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const { data: existing, sha } = await readLatest(token)

      const merged = {
        articles: incoming.articles !== undefined ? incoming.articles : existing.articles,
        plans: incoming.plans !== undefined ? incoming.plans : existing.plans,
        heroSlides: incoming.heroSlides !== undefined ? incoming.heroSlides : existing.heroSlides,
        clicks: existing.clicks || [],
        visits: existing.visits || [],
        lastSync: new Date().toISOString()
      }

      const content = Buffer.from(JSON.stringify(merged, null, 2)).toString('base64')
      const body = { message: '后台管理 - 更新网站数据', content }
      if (sha) body.sha = sha

      const putRes = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`, {
        method: 'PUT',
        headers: { 'Authorization': `token ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (putRes.ok) return res.status(200).json({ success: true, message: '已推送到 GitHub' })
      if (putRes.status === 409 && attempt < 2) continue
      const err = await putRes.json()
      return res.status(200).json({ success: false, message: err.message || '推送失败' })
    } catch (e) {
      if (attempt < 2) continue
      return res.status(200).json({ success: false, message: e.message })
    }
  }
}
