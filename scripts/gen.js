const fs = require('fs');
const path = require('path');

const recipes = [
  {
    id: 'dongbei-guobaorou', name: '锅包肉', region: '东北', regionFull: '东北地区', diff: '中', time: '40分钟', emoji: '🥩', color: '#2c3e50', color2: '#e74c3c',
    desc: '锅包肉是东北传统名菜，外酥里嫩，酸甜可口，是东北人宴客必备的一道硬菜。',
    ingredients: ['猪里脊肉 300g', '土豆淀粉 150g', '白糖 3大勺', '白醋 2大勺', '番茄酱 1大勺', '胡萝卜丝 适量', '葱姜丝 适量', '盐 少许', '料酒 1大勺'],
    steps: ['里脊肉切成3mm厚片，用刀背拍松，加盐、料酒腌制15分钟', '土豆淀粉加水调成糊，静置30分钟后倒掉上层清水', '腌好的肉片均匀裹上淀粉糊', '油温六成热，下肉片炸至金黄捞出', '油温升至八成热，复炸30秒至酥脆', '锅中留底油，下葱姜丝、胡萝卜丝爆香', '加入白糖、白醋、番茄酱炒匀', '下炸好的肉片快速翻炒均匀即可'],
    tips: '土豆淀粉一定要用东北产的，炸出来才酥脆。第一遍炸熟，第二遍炸酥，这是关键。'
  },
  {
    id: 'sichuan-huiguorou', name: '回锅肉', region: '川渝', regionFull: '四川地区', diff: '低', time: '30分钟', emoji: '🥓', color: '#c0392b', color2: '#e74c3c',
    desc: '回锅肉是川菜之首，肥而不腻，香辣下饭，是最经典的川味家常菜。',
    ingredients: ['五花肉 300g', '蒜苗 3根', '郫县豆瓣酱 1大勺', '豆豉 1小勺', '姜片 3片', '料酒 1大勺', '白糖 1小勺', '生抽 1大勺'],
    steps: ['五花肉冷水下锅，加姜片、料酒煮至八分熟', '捞出放凉，切成薄片', '蒜苗切成斜段，蒜白和蒜叶分开', '锅烧热不放油，下肉片煸炒至出油卷起呈灯盏窝状', '把肉推到一边，下豆瓣酱炒出红油', '加入豆豉、蒜白翻炒', '加入生抽、白糖调味，最后下蒜叶翻炒几下即可'],
    tips: '肉煮到筷子能插透即可，不要煮太烂。肉片切得越薄越好。'
  },
  {
    id: 'hunan-duojiaoyutou', name: '剁椒鱼头', region: '湘菜', regionFull: '湖南地区', diff: '中', time: '50分钟', emoji: '🐟', color: '#e74c3c', color2: '#c0392b',
    desc: '剁椒鱼头是湘菜代表作，鲜辣开胃，鱼肉嫩滑，剁椒的香辣完美渗入鱼头。',
    ingredients: ['胖头鱼头 1个', '剁椒 200g', '姜末 1大勺', '蒜末 1大勺', '葱花 适量', '蒸鱼豉油 2大勺', '料酒 2大勺', '白胡椒粉 少许', '食用油 3大勺'],
    steps: ['鱼头去鳃洗净，从中间劈开但不要切断', '用料酒、白胡椒粉抹匀鱼头内外，腌制15分钟', '剁椒挤去多余水分，与姜末、蒜末拌匀', '盘底铺姜片、葱段，放上鱼头', '将剁椒均匀铺在鱼头上', '水开后上锅蒸15分钟', '蒸好后倒掉盘中多余汤汁，淋上蒸鱼豉油', '撒上葱花，浇上热油即可'],
    tips: '鱼头一定要新鲜。剁椒要选湖南本地产的。'
  },
  {
    id: 'shandong-jiuzhuan', name: '九转大肠', region: '鲁菜', regionFull: '山东地区', diff: '高', time: '2小时', emoji: '🥨', color: '#8e44ad', color2: '#9b59b6',
    desc: '九转大肠是鲁菜经典名菜，色泽红润，五味俱全，制作工艺精细复杂。',
    ingredients: ['猪大肠 1000g', '白醋 适量', '面粉 适量', '葱姜蒜 适量', '生抽 2大勺', '老抽 1大勺', '白糖 2大勺', '香醋 1大勺', '料酒 2大勺', '砂仁粉 少许', '肉桂粉 少许', '花椒油 1大勺'],
    steps: ['大肠用白醋和面粉反复揉搓清洗至无异味', '将大肠套成多层，用牙签固定', '冷水下锅，加葱姜料酒煮40分钟', '捞出放凉，切成2cm的段', '锅中少油，下白糖炒至枣红色', '下大肠段翻炒上色', '加生抽、老抽、香醋、料酒、葱姜蒜', '加水没过大肠，小火慢炖40分钟', '大火收汁，撒砂仁粉、肉桂粉', '淋花椒油出锅'],
    tips: '洗大肠是最关键的一步。套肠时要耐心，套得越紧口感越好。'
  },
  {
    id: 'yunnan-qiguoji', name: '汽锅鸡', region: '云南', regionFull: '云南地区', diff: '低', time: '2小时', emoji: '🍲', color: '#27ae60', color2: '#2ecc71',
    desc: '汽锅鸡是云南名菜，利用蒸汽凝结原理烹饪，汤清味鲜，原汁原味。',
    ingredients: ['土鸡 1只', '姜片 5片', '枸杞 1小把', '红枣 5颗', '盐 适量', '白胡椒粉 少许'],
    steps: ['鸡洗净剁成块，用开水焯烫去血水', '将鸡块放入汽锅，铺上姜片', '加入枸杞、红枣', '汽锅下方坐一口煮着开水的锅，接口处密封', '大火烧开后转中火，蒸2小时', '开盖加盐和白胡椒粉调味即可'],
    tips: '一定要用正宗的建水紫陶汽锅。鸡要用土鸡。整个过程不能开盖。'
  },
  {
    id: 'xibei-dapanji', name: '新疆大盘鸡', region: '西北', regionFull: '西北地区', diff: '中', time: '1小时', emoji: '🍗', color: '#d35400', color2: '#e67e22',
    desc: '新疆大盘鸡是西北名菜，鸡肉鲜嫩，土豆软糯，汤汁浓郁，拌面一绝。',
    ingredients: ['鸡腿肉 500g', '土豆 3个', '青红椒 各1个', '洋葱 1个', '干辣椒 10个', '花椒 1小把', '八角 2个', '桂皮 1小块', '姜蒜 适量', '郫县豆瓣酱 2大勺', '生抽 2大勺', '老抽 1大勺', '白糖 1大勺', '宽面 200g'],
    steps: ['鸡肉剁块焯水，土豆切滚刀块', '锅中多油，下白糖炒至焦糖色，下鸡块翻炒上色', '下姜蒜、干辣椒、花椒、八角、桂皮炒香', '加入郫县豆瓣酱炒出红油', '加生抽、老抽翻炒均匀', '加入热水没过鸡块，大火烧开转中小火炖20分钟', '下土豆块继续炖15分钟', '另一锅煮宽面至八分熟捞出铺盘底', '下青红椒、洋葱翻炒1分钟收汁', '连肉带汁浇在宽面上即可'],
    tips: '大盘鸡的汁要稍微多留一些，拌面才好吃。'
  },
  {
    id: 'guangdong-baizaiji', name: '白切鸡', region: '粤菜', regionFull: '广东地区', diff: '中', time: '1小时', emoji: '🍗', color: '#2980b9', color2: '#3498db',
    desc: '白切鸡是粤菜经典，皮爽肉滑，原汁原味，最能体现鸡肉本鲜。',
    ingredients: ['三黄鸡 1只', '姜 1大块', '葱 3根', '料酒 2大勺', '冰水 足量', '蘸料：姜末、葱花、盐、花生油'],
    steps: ['鸡处理干净，沥干水分', '锅中水烧开，加姜片、葱段、料酒', '手提鸡头，将鸡身浸入开水中烫10秒，提起，重复3次', '将鸡完全浸入水中，关火，盖上盖子焖30分钟', '用筷子插入鸡腿最厚处，无血水流出即熟', '立即捞出放入冰水中浸泡10分钟', '取出沥干，斩件装盘', '姜剁成蓉，加葱花、盐，淋上滚烫花生油做蘸料'],
    tips: '鸡要选2-3斤的三黄鸡。关键是"浸"不是"煮"。冰水浸泡不能省。'
  },
  {
    id: 'nongjia-xiaochaoji', name: '农家小炒肉', region: '湘菜', regionFull: '湖南农村', diff: '低', time: '20分钟', emoji: '🌶️', color: '#e74c3c', color2: '#c0392b',
    desc: '农家小炒肉是湖南农家最常见的家常菜，香辣开胃，做法简单却味道极好。',
    ingredients: ['五花肉 250g', '青尖椒 8个', '大蒜 5瓣', '豆豉 1小勺', '生抽 1大勺', '老抽 1小勺', '盐 少许', '食用油 适量'],
    steps: ['五花肉切薄片，青椒斜切成圈，大蒜拍碎', '锅烧热不放油，下青椒干煸至表面起虎皮纹，盛出', '锅中少油，下五花肉煸炒至出油卷起', '下大蒜、豆豉爆香', '下煸好的青椒翻炒', '加生抽、老抽、盐调味，大火翻炒几下即可'],
    tips: '辣椒要先干煸才香。五花肉一定要煸透。全程大火，动作要快。'
  },
  {
    id: 'henan-hulatang', name: '河南胡辣汤', region: '中原', regionFull: '河南地区', diff: '中', time: '1.5小时', emoji: '🥣', color: '#7f8c8d', color2: '#95a5a6',
    desc: '胡辣汤是河南人的早餐灵魂，麻辣鲜香，浓稠暖胃，一碗下肚全身舒坦。',
    ingredients: ['牛羊肉 150g', '面粉 200g', '粉条 1把', '豆腐皮 1张', '海带丝 适量', '花生米 适量', '胡椒粉 2大勺', '辣椒粉 1大勺', '五香粉 1小勺', '姜末 1大勺', '香醋 1大勺', '盐 适量', '香油 少许'],
    steps: ['面粉加水和成面团，醒面30分钟', '盆中加水，反复揉洗面团，洗出面筋，面水备用', '面筋上锅蒸10分钟，切小块', '牛羊肉切丝，加料酒腌制', '锅中炒香姜末，下肉丝炒变色', '加入高汤或水烧开', '下面筋、豆腐皮丝、海带丝、花生米、粉条', '慢慢倒入洗面水，边倒边搅至浓稠', '加入胡椒粉、辣椒粉、五香粉、盐调味', '出锅前淋醋和香油'],
    tips: '洗面筋是胡辣汤的灵魂。胡椒要多放。'
  },
  {
    id: 'fujian-fozhutiaoqiang', name: '佛跳墙', region: '闽菜', regionFull: '福建地区', diff: '高', time: '8小时', emoji: '🏺', color: '#f39c12', color2: '#f1c40f',
    desc: '佛跳墙是闽菜之冠，选料考究，汇集山珍海味，汤浓味厚，被誉为天下第一汤。',
    ingredients: ['鲍鱼 6只', '海参 2条', '花胶 2片', '干贝 20g', '火腿 50g', '鸡腿 1个', '猪蹄 半只', '香菇 6朵', '冬笋 1个', '姜片 5片', '葱段 3段', '料酒 100ml', '高汤 足量'],
    steps: ['鲍鱼、海参、花胶提前泡发处理干净', '鸡腿、猪蹄焯水，火腿切块', '冬笋切片，香菇泡发', '坛底铺姜片、葱段', '按顺序分层码入食材', '加入料酒和高汤至八分满', '坛口用荷叶密封，盖紧盖子', '大火烧开转小火炖4-6小时', '开盖撇去浮油，调味即可'],
    tips: '食材的泡发是关键。各种食材要分层码放，耐煮的放下层。全程小火。'
  },
  {
    id: 'dongbei-suanbai', name: '东北酸菜炖排骨', region: '东北', regionFull: '东北农村', diff: '低', time: '1.5小时', emoji: '🍖', color: '#2c3e50', color2: '#34495e',
    desc: '酸菜炖排骨是东北农村的冬季暖菜，酸香开胃，排骨软烂，越炖越入味。',
    ingredients: ['猪排骨 500g', '东北酸菜 500g', '粉条 1把', '姜片 4片', '葱段 2段', '八角 2个', '花椒 10粒', '盐 适量', '生抽 1大勺'],
    steps: ['排骨冷水下锅焯水去血沫', '酸菜洗净，挤干水分，切成细丝', '锅中少油，下酸菜丝煸炒出香味', '将排骨和炒好的酸菜放入砂锅', '加姜片、葱段、八角、花椒', '加足量热水，大火烧开转小火炖1小时', '下粉条继续炖10分钟至透明', '加盐和生抽调味即可'],
    tips: '酸菜要选东北本地产的。酸菜丝一定要先炒一下。越炖越好吃。'
  },
  {
    id: 'taiwan-luroufan', name: '台湾卤肉饭', region: '台湾', regionFull: '台湾地区', diff: '低', time: '1.5小时', emoji: '🍚', color: '#e91e63', color2: '#c2185b',
    desc: '卤肉饭是台湾国民美食，卤汁香浓，肥瘦相间，一口米饭一口卤肉，幸福满满。',
    ingredients: ['五花肉 500g', '红葱头 5个', '蒜末 1大勺', '生抽 4大勺', '老抽 2大勺', '冰糖 1大勺', '五香粉 1小勺', '白胡椒粉 少许', '米酒 2大勺', '鸡蛋 4个'],
    steps: ['五花肉切成小肉条', '红葱头切薄片，炸至金黄酥脆制成油葱酥', '锅中少油，下五花肉条煸炒至出油变色', '下蒜末炒香', '加生抽、老抽、冰糖、米酒', '加入没过肉的热水，大火烧开', '转小火炖1小时', '加五香粉和白胡椒粉', '收汁至浓稠，浇在米饭上', '撒上油葱酥即可'],
    tips: '肉一定要用刀切条。红葱头是灵魂。卤肉饭要稍微咸一点。'
  },
  {
    id: 'yunnan-nuosuanyu', name: '云南酸木瓜煮鱼', region: '云南', regionFull: '云南农村', diff: '低', time: '40分钟', emoji: '🐠', color: '#27ae60', color2: '#16a085',
    desc: '酸木瓜煮鱼是云南特色菜，酸木瓜的果酸让鱼肉鲜嫩无比，汤汁酸爽开胃。',
    ingredients: ['草鱼 1条', '酸木瓜 1个', '番茄 2个', '姜片 5片', '蒜 5瓣', '小米辣 5个', '香茅草 2根', '盐 适量', '鱼露 1大勺', '香菜 适量'],
    steps: ['鱼处理干净切块，用盐和姜片腌制', '酸木瓜切片', '番茄切块，蒜拍碎，小米辣切圈', '锅中少油，下姜蒜小米辣爆香', '下番茄炒出汁', '加入酸木瓜片翻炒', '加足量热水烧开', '下鱼块和香茅草，煮8-10分钟', '加鱼露和盐调味', '撒香菜出锅'],
    tips: '酸木瓜要在云南特产店买。没有香茅草可用柠檬叶代替。'
  },
  {
    id: 'guizhou-suanlayu', name: '贵州酸汤鱼', region: '贵州', regionFull: '贵州地区', diff: '中', time: '1小时', emoji: '🐟', color: '#1abc9c', color2: '#16a085',
    desc: '酸汤鱼是贵州招牌菜，红酸汤酸辣鲜香，鱼肉嫩滑，是苗族侗族的传统美味。',
    ingredients: ['稻花鱼 2条', '红酸汤 200ml', '番茄 2个', '木姜子 1小勺', '姜片 5片', '蒜 5瓣', '辣椒面 1大勺', '盐 适量', '木姜子油 几滴', '香菜 适量', '豆芽 200g'],
    steps: ['鱼处理干净，用盐和料酒腌制', '锅中少油，下姜蒜番茄炒香', '倒入红酸汤，加适量水烧开', '放入木姜子、辣椒面', '下鱼煮10分钟', '另起锅烫豆芽铺碗底', '鱼连汤倒入碗中', '滴木姜子油，撒香菜即可'],
    tips: '红酸汤是贵州特产。木姜子是灵魂，不能省略。'
  },
  {
    id: 'shanxi-yangroupaomo', name: '羊肉泡馍', region: '西北', regionFull: '陕西地区', diff: '中', time: '3小时', emoji: '🫕', color: '#d35400', color2: '#e67e22',
    desc: '羊肉泡馍是陕西名吃，汤浓肉烂，馍筋光韧，一碗下肚暖身又暖心。',
    ingredients: ['羊肉 500g', '羊骨 500g', '死面饼 2个', '粉丝 1把', '香菜 适量', '葱花 适量', '姜 1大块', '花椒 1小把', '八角 2个', '桂皮 1小块', '草果 2个', '盐 适量', '辣椒酱 适量', '糖蒜 适量'],
    steps: ['羊骨和羊肉冷水浸泡2小时去血水', '羊骨焯水后加水大火烧开，撇去浮沫', '加入花椒、八角、桂皮、草果、姜片，小火炖2小时', '下羊肉继续炖1小时至肉烂', '捞出羊肉切块', '死面饼掰成黄豆大小', '锅中加羊肉汤烧开，下馍粒煮2分钟', '下粉丝和羊肉片煮1分钟', '撒葱花、香菜，配辣椒酱和糖蒜'],
    tips: '馍一定要用手掰。羊肉汤要熬到奶白色。'
  },
  {
    id: 'guangxi-luosifen', name: '柳州螺蛳粉', region: '广西', regionFull: '广西地区', diff: '中', time: '1小时', emoji: '🍜', color: '#16a085', color2: '#1abc9c',
    desc: '螺蛳粉是广西柳州名小吃，酸辣鲜爽臭香并存，让人欲罢不能。',
    ingredients: ['干米粉 200g', '螺蛳汤料 1包', '酸笋 50g', '酸豆角 30g', '炸腐竹 适量', '花生米 适量', '木耳丝 适量', '辣椒油 适量', '醋 1大勺', '青菜 几片'],
    steps: ['干米粉冷水泡软', '锅中加水烧开，下米粉煮至无硬芯', '另起锅，倒入螺蛳汤料，加水烧开', '加入酸笋、酸豆角、木耳丝煮2分钟', '将煮好的米粉捞入碗中', '浇上螺蛳汤', '码上炸腐竹、花生米、烫好的青菜', '加辣椒油和醋即可'],
    tips: '酸笋是灵魂。干米粉一定要提前泡。'
  },
  {
    id: 'zhejiang-dongpoyazhu', name: '东坡肉', region: '江南', regionFull: '浙江地区', diff: '中', time: '3小时', emoji: '🍖', color: '#e67e22', color2: '#d35400',
    desc: '东坡肉是杭州名菜，以苏东坡命名，色泽红亮，入口即化，肥而不腻。',
    ingredients: ['五花肉 500g', '绍兴黄酒 200ml', '生抽 3大勺', '老抽 1大勺', '冰糖 50g', '葱 3根', '姜 1大块', '八角 2个'],
    steps: ['五花肉整块冷水下锅，煮10分钟定型', '捞出切成4cm见方的方块', '砂锅底铺葱段和姜片', '肉皮朝下码入锅中', '倒入黄酒、生抽、老抽', '加入冰糖和八角', '大火烧开转小火盖盖炖2小时', '将肉翻面，继续炖30分钟', '开盖大火收汁至浓稠即可'],
    tips: '一定要用绍兴黄酒。五花肉要选三层肥两层瘦的。全程不能加水。'
  },
  {
    id: 'hubei-doupi', name: '武汉三鲜豆皮', region: '华中', regionFull: '湖北地区', diff: '高', time: '1小时', emoji: '🫓', color: '#34495e', color2: '#2c3e50',
    desc: '三鲜豆皮是武汉名小吃，外皮金黄酥脆，内馅鲜香软糯，是老武汉的早餐记忆。',
    ingredients: ['绿豆 100g', '大米 100g', '糯米 300g', '五花肉丁 100g', '香菇丁 50g', '笋丁 50g', '香干丁 3块', '生抽 2大勺', '老抽 1大勺', '盐 适量', '葱花 适量'],
    steps: ['绿豆和大米浸泡4小时，磨成米浆', '糯米蒸熟备用', '五花肉丁煸炒出油，下香菇丁、笋丁、香干丁', '加生抽、老抽、盐炒成馅料', '平底锅刷油，舀一勺米浆摊成圆形薄皮', '在皮上铺一层糯米饭', '再铺上一层馅料', '用锅铲将四边折起包好', '翻面煎至两面金黄酥脆', '切块撒葱花即可'],
    tips: '米浆不能太稠也不能太稀。糯米要蒸得稍微硬一点。'
  }
];

function generateHTML(recipe) {
  const diffLabel = recipe.diff + '难度';
  const desc = recipe.desc;

  const ingredientsHTML = recipe.ingredients.map(item => `      <div class="ingredient-item">${item}</div>`).join('\n');
  const stepsHTML = recipe.steps.map((item, i) => `      <div class="step"><div class="step-num">${i + 1}</div><div class="step-text">${item}</div></div>`).join('\n');

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${recipe.name} - ${recipe.regionFull} - 乡村味道</title>
<meta name="description" content="${desc}">
<link rel="stylesheet" href="/css/style.css">
</head>
<body>

<header class="header">
  <div class="header-inner">
    <a href="/" class="header-logo"><span class="icon">🥢</span> 乡村味道</a>
    <nav class="header-nav">
      <a href="/">首页</a>
      <a href="/#all">全部菜谱</a>
    </nav>
  </div>
</header>

<div class="detail-wrapper">
  <div class="detail-hero" style="background:linear-gradient(135deg,${recipe.color},${recipe.color2})">
    <div class="bg">${recipe.emoji}</div>
    <div class="overlay"></div>
    <div class="info">
      <a href="/" class="back">← 返回菜谱列表</a>
      <h1>${recipe.name}</h1>
      <div class="tags">
        <span class="tag">${recipe.regionFull}</span>
        <span class="tag">${diffLabel}</span>
        <span class="tag">🕐 ${recipe.time}</span>
      </div>
    </div>
  </div>

  <div class="detail-content">
    <div class="detail-meta">
      <div class="item"><span class="icon">🕐</span><span class="val">${recipe.time}</span></div>
      <div class="item"><span class="icon">🔥</span><span class="val">${recipe.diff}难度</span></div>
      <div class="item"><span class="icon">📍</span><span class="val">${recipe.regionFull}</span></div>
    </div>

    <p class="desc">${desc}</p>

    <h2>食材</h2>
    <div class="ingredient-grid">
${ingredientsHTML}
    </div>

    <h2>步骤</h2>
    <div class="steps">
${stepsHTML}
    </div>

    <div class="tip-box">💡 ${recipe.tips}</div>

    <div class="support-section">
      <h3>支持我们继续分享更多菜谱</h3>
      <p class="sub">您的支持是我们探索更多冷门乡土菜的动力</p>
      <div class="support-grid">
        <div class="support-card primary" onclick="trackClick('完整菜谱PDF','¥19.99','${recipe.name}')">
          <div class="icon">📖</div>
          <div class="name">获取完整菜谱</div>
          <div class="price">¥19.99</div>
          <div class="desc">PDF版本，含详细技巧</div>
        </div>
        <div class="support-card" onclick="trackClick('视频教程','¥39.99','${recipe.name}')">
          <div class="icon">🎬</div>
          <div class="name">观看视频教程</div>
          <div class="price">¥39.99</div>
          <div class="desc">高清视频，手把手教学</div>
        </div>
        <div class="support-card" onclick="trackClick('赞助支持','¥9.99','${recipe.name}')">
          <div class="icon">☕</div>
          <div class="name">请我们喝杯茶</div>
          <div class="price">¥9.99</div>
          <div class="desc">随心赞助，感谢支持</div>
        </div>
        <div class="support-card" onclick="trackClick('一对一带做','¥199','${recipe.name}')">
          <div class="icon">👨‍🍳</div>
          <div class="name">一对一带做</div>
          <div class="price">¥199</div>
          <div class="desc">视频连线，实时指导</div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="modal-mask" id="paymentModal">
  <div class="modal-box">
    <div class="icon">🙏</div>
    <h3>感谢您的关注</h3>
    <p>这是演示页面，实际不会扣款。<br>您的点击记录已保存。</p>
    <button class="btn-close" onclick="closeModal()">我知道了</button>
  </div>
</div>
<div class="toast" id="toast"></div>

<footer class="footer">
  <div class="footer-inner">
    <div>
      <div class="footer-brand">🥢 乡村味道</div>
      <div class="footer-desc">致力于记录和分享中国各地农村家常菜。</div>
    </div>
    <div class="footer-links">
      <div class="footer-col"><h4>探索</h4><a href="/">全部菜谱</a><a href="#">关于我们</a></div>
    </div>
  </div>
  <div class="footer-bottom">© 2026 中国乡村味道 · 演示项目</div>
</footer>

<script src="/js/main.js"></script>
</body>
</html>`;
}

const outputDir = path.join(__dirname, '..', 'recipes');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

recipes.forEach(recipe => {
  const html = generateHTML(recipe);
  const filePath = path.join(outputDir, recipe.id + '.html');
  fs.writeFileSync(filePath, html, 'utf8');
  console.log('Generated: ' + recipe.id + '.html');
});

console.log('\nDone! Generated ' + recipes.length + ' recipe files.');
