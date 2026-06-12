const fs = require('fs')
const path = require('path')

const recipes = [
  {
    id: 'dongbei-guobaorou', name: '锅包肉', region: '东北', regionFull: '东北地区',
    difficulty: '中', time: '40分钟', emoji: '🥩',
    desc: '东北硬菜代表，外酥里嫩，酸甜适口。起源于哈尔滨，是宴席必备的名菜。',
    ingredients: ['猪里脊肉 300g','土豆淀粉 150g','白糖 3大勺','白醋 2大勺','番茄酱 1大勺','胡萝卜丝 适量','葱姜丝 适量','盐 少许','料酒 1大勺'],
    steps: ['里脊肉切成3mm厚片，用刀背拍松，加盐、料酒腌制15分钟','土豆淀粉加水调成糊，静置30分钟后倒掉上层清水','腌好的肉片均匀裹上淀粉糊','油温六成热，下肉片炸至金黄捞出','油温升至八成热，复炸30秒至酥脆','锅中留底油，下葱姜丝、胡萝卜丝爆香','加入白糖、白醋、番茄酱炒匀','下炸好的肉片快速翻炒均匀即可'],
    tips: '土豆淀粉一定要用东北产的，炸出来才酥脆。第一遍炸熟，第二遍炸酥，这是锅包肉外酥里嫩的关键。肉片要薄，炸的时间要短。',
    color: '#2c3e50', color2: '#e74c3c'
  },
  {
    id: 'sichuan-huiguorou', name: '回锅肉', region: '川渝', regionFull: '四川地区',
    difficulty: '低', time: '30分钟', emoji: '🥓',
    desc: '四川家常菜第一名，每家每户都有自己的做法。肥而不腻，配饭神器。',
    ingredients: ['五花肉 300g','蒜苗 3根','郫县豆瓣酱 1大勺','豆豉 1小勺','姜片 3片','料酒 1大勺','白糖 1小勺','生抽 1大勺'],
    steps: ['五花肉冷水下锅，加姜片、料酒煮至八分熟（约20分钟）','捞出放凉，切成薄片（约3mm）','蒜苗切成斜段，蒜白和蒜叶分开','锅烧热不放油，下肉片煸炒至出油卷起呈灯盏窝状','把肉推到一边，下豆瓣酱炒出红油','加入豆豉、蒜白翻炒','加入生抽、白糖调味，最后下蒜叶翻炒几下即可'],
    tips: '肉煮到筷子能插透即可，不要煮太烂。肉片切得越薄越好。正宗的回锅肉一定要用郫县豆瓣酱。',
    color: '#c0392b', color2: '#e74c3c'
  },
  {
    id: 'hunan-duojiaoyutou', name: '剁椒鱼头', region: '湘菜', regionFull: '湖南地区',
    difficulty: '中', time: '50分钟', emoji: '🐟',
    desc: '湘菜经典名菜，鲜辣开胃。鱼头的鲜嫩与剁椒的香辣完美融合。',
    ingredients: ['胖头鱼头 1个（约1.5kg）','剁椒 200g','姜末 1大勺','蒜末 1大勺','葱花 适量','蒸鱼豉油 2大勺','料酒 2大勺','白胡椒粉 少许','食用油 3大勺'],
    steps: ['鱼头去鳃洗净，从中间劈开但不要切断','用料酒、白胡椒粉抹匀鱼头内外，腌制15分钟','剁椒挤去多余水分，与姜末、蒜末拌匀','盘底铺姜片、葱段，放上鱼头','将剁椒均匀铺在鱼头上','水开后上锅蒸15分钟','蒸好后倒掉盘中多余汤汁，淋上蒸鱼豉油','撒上葱花，浇上热油即可'],
    tips: '鱼头一定要新鲜，眼睛凸起透亮的最好。剁椒要选湖南本地产的，咸度够就不用额外加盐。',
    color: '#e74c3c', color2: '#c0392b'
  },
  {
    id: 'shandong-jiuzhuan', name: '九转大肠', region: '鲁菜', regionFull: '山东地区',
    difficulty: '高', time: '2小时', emoji: '🥨',
    desc: '鲁菜中的功夫菜，工序复杂，口感丰富。酸、甜、苦、辣、咸五味俱全。',
    ingredients: ['猪大肠 1000g','白醋 适量','面粉 适量','葱姜蒜 适量','生抽 2大勺','老抽 1大勺','白糖 2大勺','香醋 1大勺','料酒 2大勺','砂仁粉 少许','肉桂粉 少许','花椒油 1大勺'],
    steps: ['大肠用白醋和面粉反复揉搓清洗至无异味','将大肠套成多层（套三遍），用牙签固定','冷水下锅，加葱姜料酒煮40分钟','捞出放凉，切成2cm的段','锅中少油，下白糖炒至枣红色','下大肠段翻炒上色','加生抽、老抽、香醋、料酒、葱姜蒜','加水没过大肠，小火慢炖40分钟','大火收汁，撒砂仁粉、肉桂粉','淋花椒油出锅'],
    tips: '洗大肠是最关键的一步，一定要洗干净但不能把油全部洗掉。套肠时要耐心，套得越紧口感越好。',
    color: '#8e44ad', color2: '#9b59b6'
  },
  {
    id: 'yunnan-qiguoji', name: '汽锅鸡', region: '云南', regionFull: '云南地区',
    difficulty: '低', time: '2小时', emoji: '🍲',
    desc: '云南建水独有的烹饪方法，不加一滴水，全靠蒸汽凝结成汤。原汁原味，鲜美无比。',
    ingredients: ['土鸡 1只（约1.5kg）','姜片 5片','枸杞 1小把','红枣 5颗','盐 适量','白胡椒粉 少许'],
    steps: ['鸡洗净剁成块，用开水焯烫去血水','将鸡块放入汽锅，铺上姜片','加入枸杞、红枣','汽锅下方坐一口煮着开水的锅，接口处密封','大火烧开后转中火，蒸2小时','开盖加盐和白胡椒粉调味即可'],
    tips: '一定要用正宗的建水紫陶汽锅。鸡要用土鸡或走地鸡，不能用饲料鸡。整个过程不能开盖，否则功亏一篑。',
    color: '#27ae60', color2: '#2ecc71'
  },
  {
    id: 'xibei-dapanji', name: '新疆大盘鸡', region: '西北', regionFull: '西北地区',
    difficulty: '中', time: '1小时', emoji: '🍗',
    desc: '新疆名菜，融合了西北人的豪爽。鸡肉鲜嫩，土豆绵软，配上宽面，一道菜管饱。',
    ingredients: ['鸡腿肉 500g','土豆 3个','青红椒 各1个','洋葱 1个','干辣椒 10个','花椒 1小把','八角 2个','桂皮 1小块','姜蒜 适量','郫县豆瓣酱 2大勺','生抽 2大勺','老抽 1大勺','白糖 1大勺','宽面 200g'],
    steps: ['鸡肉剁块焯水，土豆切滚刀块，青红椒切片','锅中多油，下白糖炒至焦糖色，下鸡块翻炒上色','下姜蒜、干辣椒、花椒、八角、桂皮炒香','加入郫县豆瓣酱炒出红油','加生抽、老抽翻炒均匀','加入热水没过鸡块，大火烧开转中小火炖20分钟','下土豆块继续炖15分钟','另一锅煮宽面至八分熟捞出铺盘底','下青红椒、洋葱翻炒1分钟收汁','连肉带汁浇在宽面上即可'],
    tips: '大盘鸡的汁要稍微多留一些，拌面才好吃。土豆要选绵的品种，炖到沙沙的程度最香。',
    color: '#d35400', color2: '#e67e22'
  },
  {
    id: 'guangdong-baizaiji', name: '白切鸡', region: '粤菜', regionFull: '广东地区',
    difficulty: '中', time: '1小时', emoji: '🍗',
    desc: '广东人待客的至高礼遇。皮爽肉滑，原汁原味，蘸料是灵魂。',
    ingredients: ['三黄鸡 1只（约1.2kg）','姜 1大块','葱 3根','料酒 2大勺','冰水 足量','蘸料：姜末、葱花、盐、花生油'],
    steps: ['鸡处理干净，沥干水分','锅中水烧开，加姜片、葱段、料酒','手提鸡头，将鸡身浸入开水中烫10秒，提起，重复3次','将鸡完全浸入水中，关火，盖上盖子焖30分钟','用筷子插入鸡腿最厚处，无血水流出即熟','立即捞出放入冰水中浸泡10分钟（皮会变脆）','取出沥干，斩件装盘','姜剁成蓉，加葱花、盐，淋上滚烫花生油做蘸料'],
    tips: '鸡要选2-3斤的三黄鸡或清远鸡。焖的时间要根据鸡的大小调整，关键是"浸"不是"煮"。冰水浸泡这步不能省，鸡皮才会爽脆。',
    color: '#2980b9', color2: '#3498db'
  },
  {
    id: 'nongjia-xiaochaoji', name: '农家小炒肉', region: '湘菜', regionFull: '湖南农村',
    difficulty: '低', time: '20分钟', emoji: '🌶️',
    desc: '湖南农村最家常的一道菜，看似简单但极其下饭。各家各户都有自己的独门配方。',
    ingredients: ['五花肉 250g','青尖椒 8个','大蒜 5瓣','豆豉 1小勺','生抽 1大勺','老抽 1小勺','盐 少许','食用油 适量'],
    steps: ['五花肉切薄片，青椒斜切成圈，大蒜拍碎','锅烧热不放油，下青椒干煸至表面起虎皮纹，盛出','锅中少油，下五花肉煸炒至出油卷起','下大蒜、豆豉爆香','下煸好的青椒翻炒','加生抽、老抽、盐调味，大火翻炒几下即可'],
    tips: '辣椒要先干煸才香。五花肉一定要煸透，把油逼出来，吃起来才不腻。这道菜全程大火，动作要快。',
    color: '#e74c3c', color2: '#c0392b'
  },
  {
    id: 'henan-hulatang', name: '河南胡辣汤', region: '中原', regionFull: '河南地区',
    difficulty: '中', time: '1.5小时', emoji: '🥣',
    desc: '河南人早起的灵魂，一碗胡辣汤配油条，神仙都不换。浓稠辛辣，暖胃驱寒。',
    ingredients: ['牛羊肉 150g','面粉 200g','粉条 1把','豆腐皮 1张','海带丝 适量','花生米 适量','胡椒粉 2大勺','辣椒粉 1大勺','五香粉 1小勺','姜末 1大勺','香醋 1大勺','盐 适量','香油 少许'],
    steps: ['面粉加水和成面团，醒面30分钟','盆中加水，反复揉洗面团，洗出面筋，面水备用','面筋上锅蒸10分钟，切小块','牛羊肉切丝，加料酒腌制','锅中炒香姜末，下肉丝炒变色','加入高汤或水烧开','下面筋、豆腐皮丝、海带丝、花生米、粉条','慢慢倒入洗面水，边倒边搅至浓稠','加入胡椒粉、辣椒粉、五香粉、盐调味','出锅前淋醋和香油'],
    tips: '洗面筋是胡辣汤的灵魂，面水既是增稠剂又是鲜味的来源。胡椒要多放，这是胡辣汤的"胡"字由来。正宗河南胡辣汤用牛肉或羊肉。',
    color: '#7f8c8d', color2: '#95a5a6'
  },
  {
    id: 'fujian-fozhutiaoqiang', name: '佛跳墙', region: '闽菜', regionFull: '福建地区',
    difficulty: '高', time: '8小时', emoji: '🏺',
    desc: '闽菜之王，集山珍海味之大成。坛启荤香飘四邻，佛闻弃禅跳墙来。',
    ingredients: ['鲍鱼 6只','海参 2条','花胶 2片','干贝 20g','火腿 50g','鸡腿 1个','猪蹄 半只','香菇 6朵','冬笋 1个','姜片 5片','葱段 3段','料酒 100ml','高汤 足量'],
    steps: ['鲍鱼、海参、花胶提前泡发处理干净','鸡腿、猪蹄焯水，火腿切块','冬笋切片，香菇泡发','坛底铺姜片、葱段','按顺序分层码入食材：鸡腿、猪蹄垫底，中间放鲍鱼海参等，最上面放香菇','加入料酒和高汤至八分满','坛口用荷叶密封，盖紧盖子','大火烧开转小火炖4-6小时','开盖撇去浮油，调味即可'],
    tips: '食材的泡发是关键，尤其是海参和花胶。各种食材要分层码放，耐煮的放下层。全程小火，保持微沸即可。没有坛子用砂锅也行。',
    color: '#f39c12', color2: '#f1c40f'
  }
]

const template = (r) => `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${r.name} - ${r.regionFull} - 乡村味道</title>
<meta name="description" content="${r.desc}">
<link rel="stylesheet" href="/css/style.css">
</head>
<body>
<nav>
  <div class="container">
    <a href="/" class="logo">🥢 乡村味道</a>
    <div class="links"><a href="/">← 返回首页</a></div>
  </div>
</nav>
<div class="recipe-detail">
  <a href="/" class="back">← 返回菜谱列表</a>
  <h1>${r.name}</h1>
  <span class="region-tag">${r.regionFull} · ${r.difficulty === '高' ? '功夫菜' : r.difficulty === '中' ? '家常菜' : '快手菜'}</span>
  <div class="hero-img" style="background:linear-gradient(135deg,${r.color},${r.color2});display:flex;align-items:center;justify-content:center;color:white;font-size:4em;">${r.emoji}</div>
  <div class="info-bar">
    <span>🕐 ${r.time}</span>
    <span>🔥 ${r.difficulty}难度</span>
  </div>
  <p style="font-size:1.05em;color:#555;margin-bottom:25px;">${r.desc}</p>
  <h2>📝 食材</h2>
  <ul>${r.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
  <h2>👨‍🍳 步骤</h2>
  <ol>${r.steps.map(s => `<li>${s}</li>`).join('')}</ol>
  <div class="tip">💡 ${r.tips}</div>
  <div class="support-section">
    <h3>❤️ 支持我们继续分享更多菜谱</h3>
    <p>您的支持是我们探索更多冷门乡土菜的动力</p>
    <div class="support-options">
      <button class="support-btn primary" onclick="trackClick('完整菜谱PDF','¥19.99','${r.name}')">获取完整菜谱 <span class="price">¥19.99</span></button>
      <button class="support-btn secondary" onclick="trackClick('视频教程','¥39.99','${r.name}')">观看视频教程 <span class="price">¥39.99</span></button>
      <button class="support-btn secondary" onclick="trackClick('赞助支持','¥9.99','${r.name}')">请我们喝杯茶 <span class="price">¥9.99</span></button>
      <button class="support-btn secondary" onclick="trackClick('一对一带做','¥199','${r.name}')">一对一带做 <span class="price">¥199</span></button>
    </div>
  </div>
</div>
<div id="paymentModal" class="payment-modal">
  <div class="modal-content">
    <div class="modal-icon">🙏</div>
    <h3>感谢您的支持！</h3>
    <p>这是演示支付页面，实际不会扣款。<br>您的点击记录已保存，帮助我们了解大家的需求。</p>
    <button class="btn-close" onclick="closeModal()">我知道了</button>
  </div>
</div>
<div id="toast" class="payment-toast"></div>
<footer>
  <div class="container">
    <p>中国乡村味道 - 致力于记录和分享中国各地农村家常菜</p>
    <p style="margin-top:8px;font-size:0.8em;opacity:0.7">这是一个演示项目，用于测试用户付费意愿</p>
  </div>
</footer>
<script src="/js/main.js"></script>
</body>
</html>`

// Generate all recipe pages
recipes.forEach(r => {
  const filePath = path.join(__dirname, 'recipes', `${r.id}.html`)
  fs.writeFileSync(filePath, template(r))
  console.log(`Generated: recipes/${r.id}.html`)
})

console.log(`\n✅ Generated ${recipes.length} recipe pages!`)
