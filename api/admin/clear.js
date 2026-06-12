const REPO = 'a5782181/wangzhan'
const FILE_PATH = 'data/site.json'

async function getSha(token) {
  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`, {
    headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' }
  })
  if (res.ok) return (await res.json()).sha
  return null
}

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
      const sha = await getSha(token)
      const data = { articles: [], plans: [], heroSlides: [], clicks: [], visits: [], lastSync: new Date().toISOString() }

      const content = Buffer.from(JSON.stringify(data, null, 2)).toString('base64')
      const body = { message: '清空点击/访问记录', content }
      if (sha) body.sha = sha

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
