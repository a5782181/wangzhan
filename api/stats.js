export default async function handler(req, res) {
  // 安全验证 - 简单 token 认证
  const token = req.headers['x-admin-token']
  if (token !== 'admin123') {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  // 生产环境请从数据库查询
  // 这里返回模拟数据作为演示
  const mockStats = {
    totalClicks: 128,
    todayClicks: 7,
    uniqueVisitors: 89,
    popularPlans: [
      { plan: '完整菜谱', count: 52 },
      { plan: '视频教程', count: 43 },
      { plan: '一对一指导', count: 18 },
      { plan: '赞助支持', count: 15 }
    ],
    recentClicks: [
      { timestamp: '2026-06-11T14:23:00Z', plan: '完整菜谱', recipeName: '锅包肉', price: '¥19.99' },
      { timestamp: '2026-06-11T13:15:00Z', plan: '视频教程', recipeName: '回锅肉', price: '¥39.99' },
      { timestamp: '2026-06-11T12:00:00Z', plan: '赞助支持', recipeName: '剁椒鱼头', price: '¥9.99' },
      { timestamp: '2026-06-11T10:45:00Z', plan: '完整菜谱', recipeName: '白切鸡', price: '¥19.99' },
      { timestamp: '2026-06-11T09:30:00Z', plan: '一对一指导', recipeName: '佛跳墙', price: '¥199' },
      { timestamp: '2026-06-10T22:00:00Z', plan: '完整菜谱', recipeName: '九转大肠', price: '¥19.99' },
      { timestamp: '2026-06-10T20:15:00Z', plan: '视频教程', recipeName: '东坡肉', price: '¥39.99' },
      { timestamp: '2026-06-10T18:30:00Z', plan: '完整菜谱', recipeName: '新疆大盘鸡', price: '¥19.99' }
    ]
  }

  return res.status(200).json(mockStats)
}
