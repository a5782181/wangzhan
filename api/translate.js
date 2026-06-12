const crypto = require('crypto');

const SERVICE = 'tmt';
const HOST = 'tmt.tencentcloudapi.com';

function sign(secretKey, date, service) {
  const kDate = crypto.createHmac('sha256', 'TC3' + secretKey).update(date).digest();
  const kService = crypto.createHmac('sha256', kDate).update(service).digest();
  const kSigning = crypto.createHmac('sha256', kService).update('tc3_request').digest();
  return kSigning;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { text, target, secretId: reqSecretId, secretKey: reqSecretKey } = req.body || {};
  if (!text || !target) return res.status(400).json({ error: 'Missing text or target' });
  
  const secretId = reqSecretId || process.env.TENCENT_SECRET_ID || '';
  const secretKey = reqSecretKey || process.env.TENCENT_SECRET_KEY || '';
  
  if (!secretId || !secretKey) {
    return res.status(500).json({ error: 'Translation API not configured.' });
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const date = new Date(timestamp * 1000).toISOString().split('T')[0];
  const payload = JSON.stringify({ SourceText: text, Source: 'zh', Target: target, ProjectId: 0 });

  const canonicalRequest = `POST\n/\n\ncontent-type:application/json; charset=utf-8\nhost:${HOST}\n\ncontent-type;host\n${crypto.createHash('sha256').update(payload).digest('hex')}`;
  const stringToSign = `TC3-HMAC-SHA256\n${timestamp}\n${date}/${SERVICE}/tc3_request\n${crypto.createHash('sha256').update(canonicalRequest).digest('hex')}`;
  const signingKey = sign(secretKey, date, SERVICE);
  const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');

  try {
    const response = await fetch(`https://${HOST}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `TC3-HMAC-SHA256 Credential=${secretId}/${date}/${SERVICE}/tc3_request, SignedHeaders=content-type;host, Signature=${signature}`,
        'X-TC-Action': 'TextTranslate',
        'X-TC-Version': '2018-03-21',
        'X-TC-Timestamp': timestamp.toString(),
        'X-TC-Region': 'ap-guangzhou'
      },
      body: payload
    });
    const data = await response.json();
    if (data.Response && data.Response.TargetText) {
      return res.status(200).json({ text: data.Response.TargetText });
    }
    return res.status(500).json({ error: data.Response?.Error?.Message || 'Translation failed' });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
