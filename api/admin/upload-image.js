const REPO = 'a5782181/wangzhan'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const token = process.env.GITHUB_TOKEN
  if (!token) return res.status(200).json({ success: false, message: '未配置GitHub Token' })

  const { image, filename } = req.body || {}
  if (!image || !filename) return res.status(200).json({ success: false, message: '缺少数据' })

  const filePath = 'images/hero/' + filename.replace(/[^a-zA-Z0-9._-]/g, '')

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const metaRes = await fetch(`https://api.github.com/repos/${REPO}/contents/${filePath}`, {
        headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' }
      })
      let sha = null
      if (metaRes.ok) sha = (await metaRes.json()).sha

      const base64 = image.includes('base64,') ? image.split('base64,')[1] : image
      const body = { message: '上传轮播图', content: base64 }
      if (sha) body.sha = sha

      const putRes = await fetch(`https://api.github.com/repos/${REPO}/contents/${filePath}`, {
        method: 'PUT',
        headers: { 'Authorization': `token ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (putRes.ok) {
        const url = `https://raw.githubusercontent.com/${REPO}/main/${filePath}`
        return res.status(200).json({ success: true, url })
      }
      if (putRes.status === 409 && attempt < 2) continue
      const err = await putRes.json()
      return res.status(200).json({ success: false, message: err.message || '上传失败' })
    } catch (e) {
      if (attempt < 2) continue
      return res.status(200).json({ success: false, message: e.message })
    }
  }
}
