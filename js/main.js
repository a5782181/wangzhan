const API='/api'
const IMG='images/recipes/'
const R=[
  {id:'dongbei-guobaorou',n:'锅包肉',r:'东北',rf:'东北地区',d:'中',t:'40分钟',e:'🥩',c1:'#2c3e50',c2:'#e74c3c',img:IMG+'guobaorou.jpg',ds:'东北硬菜代表，外酥里嫩，酸甜适口。',ig:['猪里脊肉 300g','土豆淀粉 150g','白糖 3大勺','白醋 2大勺','番茄酱 1大勺','胡萝卜丝 适量','葱姜丝 适量','盐 少许','料酒 1大勺'],sp:['里脊肉切成3mm厚片，用刀背拍松，加盐、料酒腌制15分钟','土豆淀粉加水调成糊，静置30分钟后倒掉上层清水','腌好的肉片均匀裹上淀粉糊','油温六成热，下肉片炸至金黄捞出','油温升至八成热，复炸30秒至酥脆','锅中留底油，下葱姜丝、胡萝卜丝爆香','加入白糖、白醋、番茄酱炒匀','下炸好的肉片快速翻炒均匀即可'],tp:'土豆淀粉一定要用东北产的，炸出来才酥脆。'},
  {id:'sichuan-huiguorou',n:'回锅肉',r:'川渝',rf:'四川地区',d:'低',t:'30分钟',e:'🥓',c1:'#c0392b',c2:'#e74c3c',img:IMG+'huiguorou.jpg',ds:'四川家常菜第一名，肥而不腻，配饭神器。',ig:['五花肉 300g','蒜苗 3根','郫县豆瓣酱 1大勺','豆豉 1小勺','姜片 3片','料酒 1大勺','白糖 1小勺','生抽 1大勺'],sp:['五花肉冷水下锅，加姜片、料酒煮至八分熟','捞出放凉，切成薄片','蒜苗切成斜段，蒜白和蒜叶分开','锅烧热不放油，下肉片煸炒至出油卷起呈灯盏窝状','把肉推到一边，下豆瓣酱炒出红油','加入豆豉、蒜白翻炒','加入生抽、白糖调味，最后下蒜叶翻炒几下即可'],tp:'肉煮到筷子能插透即可。'},
  {id:'hunan-duojiaoyutou',n:'剁椒鱼头',r:'湘菜',rf:'湖南地区',d:'中',t:'50分钟',e:'🐟',c1:'#e74c3c',c2:'#c0392b',img:IMG+'duojiaoyutou.jpg',ds:'湘菜经典名菜，鲜辣开胃。',ig:['胖头鱼头 1个','剁椒 200g','姜末 1大勺','蒜末 1大勺','葱花 适量','蒸鱼豉油 2大勺','料酒 2大勺','白胡椒粉 少许','食用油 3大勺'],sp:['鱼头去鳃洗净，从中间劈开但不要切断','用料酒、白胡椒粉抹匀鱼头内外，腌制15分钟','剁椒挤去多余水分，与姜末、蒜末拌匀','盘底铺姜片、葱段，放上鱼头','将剁椒均匀铺在鱼头上','水开后上锅蒸15分钟','蒸好后倒掉盘中多余汤汁，淋上蒸鱼豉油','撒上葱花，浇上热油即可'],tp:'鱼头一定要新鲜。'},
  {id:'shandong-jiuzhuan',n:'九转大肠',r:'鲁菜',rf:'山东地区',d:'高',t:'2小时',e:'🥨',c1:'#8e44ad',c2:'#9b59b6',img:IMG+'jiuzhuandachang.jpg',ds:'鲁菜中的功夫菜，酸甜苦辣咸五味俱全。',ig:['猪大肠 1000g','白醋 适量','面粉 适量','葱姜蒜 适量','生抽 2大勺','老抽 1大勺','白糖 2大勺','香醋 1大勺','料酒 2大勺','砂仁粉 少许','肉桂粉 少许','花椒油 1大勺'],sp:['大肠用白醋和面粉反复揉搓清洗至无异味','将大肠套成多层，用牙签固定','冷水下锅，加葱姜料酒煮40分钟','捞出放凉，切成2cm的段','锅中少油，下白糖炒至枣红色','下大肠段翻炒上色','加生抽、老抽、香醋、料酒、葱姜蒜','加水没过大肠，小火慢炖40分钟','大火收汁，撒砂仁粉、肉桂粉','淋花椒油出锅'],tp:'洗大肠是最关键的一步。'},
  {id:'yunnan-qiguoji',n:'汽锅鸡',r:'云南',rf:'云南地区',d:'低',t:'2小时',e:'🍲',c1:'#27ae60',c2:'#2ecc71',img:IMG+'qiguoji.jpg',ds:'云南建水独有的烹饪方法，不加一滴水。',ig:['土鸡 1只','姜片 5片','枸杞 1小把','红枣 5颗','盐 适量','白胡椒粉 少许'],sp:['鸡洗净剁成块，用开水焯烫去血水','将鸡块放入汽锅，铺上姜片','加入枸杞、红枣','汽锅下方坐一口煮着开水的锅，接口处密封','大火烧开后转中火，蒸2小时','开盖加盐和白胡椒粉调味即可'],tp:'一定要用正宗的建水紫陶汽锅。'},
  {id:'xibei-dapanji',n:'新疆大盘鸡',r:'西北',rf:'西北地区',d:'中',t:'1小时',e:'🍗',c1:'#d35400',c2:'#e67e22',img:IMG+'dapanji.jpg',ds:'新疆名菜，鸡肉鲜嫩，土豆绵软，配上宽面。',ig:['鸡腿肉 500g','土豆 3个','青红椒 各1个','洋葱 1个','干辣椒 10个','花椒 1小把','八角 2个','桂皮 1小块','姜蒜 适量','郫县豆瓣酱 2大勺','生抽 2大勺','老抽 1大勺','白糖 1大勺','宽面 200g'],sp:['鸡肉剁块焯水，土豆切滚刀块','锅中多油，下白糖炒至焦糖色，下鸡块翻炒上色','下姜蒜、干辣椒、花椒、八角、桂皮炒香','加入郫县豆瓣酱炒出红油','加生抽、老抽翻炒均匀','加入热水没过鸡块，大火烧开转中小火炖20分钟','下土豆块继续炖15分钟','另一锅煮宽面至八分熟捞出铺盘底','下青红椒、洋葱翻炒1分钟收汁','连肉带汁浇在宽面上即可'],tp:'大盘鸡的汁要稍微多留一些。'},
  {id:'guangdong-baizaiji',n:'白切鸡',r:'粤菜',rf:'广东地区',d:'中',t:'1小时',e:'🍗',c1:'#2980b9',c2:'#3498db',img:IMG+'baizaiji.jpg',ds:'广东人待客的至高礼遇。皮爽肉滑，原汁原味。',ig:['三黄鸡 1只','姜 1大块','葱 3根','料酒 2大勺','冰水 足量','蘸料：姜末、葱花、盐、花生油'],sp:['鸡处理干净，沥干水分','锅中水烧开，加姜片、葱段、料酒','手提鸡头，将鸡身浸入开水中烫10秒，提起，重复3次','将鸡完全浸入水中，关火，盖上盖子焖30分钟','用筷子插入鸡腿最厚处，无血水流出即熟','立即捞出放入冰水中浸泡10分钟','取出沥干，斩件装盘','姜剁成蓉，加葱花、盐，淋上滚烫花生油做蘸料'],tp:'鸡要选2-3斤的三黄鸡。'},
  {id:'nongjia-xiaochaoji',n:'农家小炒肉',r:'湘菜',rf:'湖南农村',d:'低',t:'20分钟',e:'🌶️',c1:'#e74c3c',c2:'#c0392b',img:IMG+'xiaochaoji.jpg',ds:'湖南农村最家常的一道菜，极其下饭。',ig:['五花肉 250g','青尖椒 8个','大蒜 5瓣','豆豉 1小勺','生抽 1大勺','老抽 1小勺','盐 少许','食用油 适量'],sp:['五花肉切薄片，青椒斜切成圈，大蒜拍碎','锅烧热不放油，下青椒干煸至表面起虎皮纹，盛出','锅中少油，下五花肉煸炒至出油卷起','下大蒜、豆豉爆香','下煸好的青椒翻炒','加生抽、老抽、盐调味，大火翻炒几下即可'],tp:'辣椒要先干煸才香。全程大火。'},
  {id:'henan-hulatang',n:'河南胡辣汤',r:'中原',rf:'河南地区',d:'中',t:'1.5小时',e:'🥣',c1:'#7f8c8d',c2:'#95a5a6',img:IMG+'hulatang.jpg',ds:'河南人早起的灵魂，一碗胡辣汤配油条。',ig:['牛羊肉 150g','面粉 200g','粉条 1把','豆腐皮 1张','海带丝 适量','花生米 适量','胡椒粉 2大勺','辣椒粉 1大勺','五香粉 1小勺','姜末 1大勺','香醋 1大勺','盐 适量','香油 少许'],sp:['面粉加水和成面团，醒面30分钟','盆中加水，反复揉洗面团，洗出面筋，面水备用','面筋上锅蒸10分钟，切小块','牛羊肉切丝，加料酒腌制','锅中炒香姜末，下肉丝炒变色','加入高汤或水烧开','下面筋、豆腐皮丝、海带丝、花生米、粉条','慢慢倒入洗面水，边倒边搅至浓稠','加入胡椒粉、辣椒粉、五香粉、盐调味','出锅前淋醋和香油'],tp:'洗面筋是灵魂。胡椒要多放。'},
  {id:'fujian-fozhutiaoqiang',n:'佛跳墙',r:'闽菜',rf:'福建地区',d:'高',t:'8小时',e:'🏺',c1:'#f39c12',c2:'#f1c40f',img:IMG+'fozhutiaoqiang.jpg',ds:'闽菜之王，集山珍海味之大成。',ig:['鲍鱼 6只','海参 2条','花胶 2片','干贝 20g','火腿 50g','鸡腿 1个','猪蹄 半只','香菇 6朵','冬笋 1个','姜片 5片','葱段 3段','料酒 100ml','高汤 足量'],sp:['鲍鱼、海参、花胶提前泡发处理干净','鸡腿、猪蹄焯水，火腿切块','冬笋切片，香菇泡发','坛底铺姜片、葱段','按顺序分层码入食材','加入料酒和高汤至八分满','坛口用荷叶密封，盖紧盖子','大火烧开转小火炖4-6小时','开盖撇去浮油，调味即可'],tp:'食材的泡发是关键。全程小火。'},
  {id:'dongbei-suanbai',n:'酸菜炖排骨',r:'东北',rf:'东北农村',d:'低',t:'1.5小时',e:'🍖',c1:'#2c3e50',c2:'#34495e',img:IMG+'suancaipaigu.jpg',ds:'东北农村冬天必备菜，酸爽解腻。',ig:['猪排骨 500g','东北酸菜 500g','粉条 1把','姜片 4片','葱段 2段','八角 2个','花椒 10粒','盐 适量','生抽 1大勺'],sp:['排骨冷水下锅焯水去血沫','酸菜洗净，挤干水分，切成细丝','锅中少油，下酸菜丝煸炒出香味','将排骨和炒好的酸菜放入砂锅','加姜片、葱段、八角、花椒','加足量热水，大火烧开转小火炖1小时','下粉条继续炖10分钟至透明','加盐和生抽调味即可'],tp:'酸菜要选东北本地产的。'},
  {id:'taiwan-luroufan',n:'台湾卤肉饭',r:'台湾',rf:'台湾地区',d:'低',t:'1.5小时',e:'🍚',c1:'#e91e63',c2:'#c2185b',img:IMG+'luroufan.jpg',ds:'台湾平民美食之王。',ig:['五花肉 500g','红葱头 5个','蒜末 1大勺','生抽 4大勺','老抽 2大勺','冰糖 1大勺','五香粉 1小勺','白胡椒粉 少许','米酒 2大勺','鸡蛋 4个'],sp:['五花肉切成小肉条','红葱头切薄片，炸至金黄酥脆制成油葱酥','锅中少油，下五花肉条煸炒至出油变色','下蒜末炒香','加生抽、老抽、冰糖、米酒','加入没过肉的热水，大火烧开','转小火炖1小时','加五香粉和白胡椒粉','收汁至浓稠，浇在米饭上','撒上油葱酥即可'],tp:'红葱头是灵魂。'},
  {id:'yunnan-nuosuanyu',n:'酸木瓜煮鱼',r:'云南',rf:'云南农村',d:'低',t:'40分钟',e:'🐠',c1:'#27ae60',c2:'#16a085',img:IMG+'suanmuguazhuyu.jpg',ds:'云南少数民族的乡土名菜。',ig:['草鱼 1条','酸木瓜 1个','番茄 2个','姜片 5片','蒜 5瓣','小米辣 5个','香茅草 2根','盐 适量','鱼露 1大勺','香菜 适量'],sp:['鱼处理干净切块，用盐和姜片腌制','酸木瓜切片','番茄切块，蒜拍碎，小米辣切圈','锅中少油，下姜蒜小米辣爆香','下番茄炒出汁','加入酸木瓜片翻炒','加足量热水烧开','下鱼块和香茅草，煮8-10分钟','加鱼露和盐调味','撒香菜出锅'],tp:'酸木瓜要在云南特产店买。'},
  {id:'guizhou-suanlayu',n:'贵州酸汤鱼',r:'贵州',rf:'贵州地区',d:'中',t:'1小时',e:'🐟',c1:'#1abc9c',c2:'#16a085',img:IMG+'suantangyu.jpg',ds:'贵州苗族传统名菜，红酸汤是灵魂。',ig:['稻花鱼 2条','红酸汤 200ml','番茄 2个','木姜子 1小勺','姜片 5片','蒜 5瓣','辣椒面 1大勺','盐 适量','木姜子油 几滴','香菜 适量','豆芽 200g'],sp:['鱼处理干净，用盐和料酒腌制','锅中少油，下姜蒜番茄炒香','倒入红酸汤，加适量水烧开','放入木姜子、辣椒面','下鱼煮10分钟','另起锅烫豆芽铺碗底','鱼连汤倒入碗中','滴木姜子油，撒香菜即可'],tp:'红酸汤是贵州特产。木姜子是灵魂。'},
  {id:'shanxi-yangroupaomo',n:'羊肉泡馍',r:'西北',rf:'陕西地区',d:'中',t:'3小时',e:'🫕',c1:'#d35400',c2:'#e67e22',img:IMG+'yangroupaomo.jpg',ds:'西安名吃，羊肉汤的醇厚与掰碎的馍完美结合。',ig:['羊肉 500g','羊骨 500g','死面饼 2个','粉丝 1把','香菜 适量','葱花 适量','姜 1大块','花椒 1小把','八角 2个','桂皮 1小块','草果 2个','盐 适量','辣椒酱 适量','糖蒜 适量'],sp:['羊骨和羊肉冷水浸泡2小时去血水','羊骨焯水后加水大火烧开，撇去浮沫','加入花椒、八角、桂皮、草果、姜片，小火炖2小时','下羊肉继续炖1小时至肉烂','捞出羊肉切块','死面饼掰成黄豆大小','锅中加羊肉汤烧开，下馍粒煮2分钟','下粉丝和羊肉片煮1分钟','撒葱花、香菜，配辣椒酱和糖蒜'],tp:'馍一定要用手掰。'},
  {id:'guangxi-luosifen',n:'柳州螺蛳粉',r:'广西',rf:'广西地区',d:'中',t:'1小时',e:'🍜',c1:'#16a085',c2:'#1abc9c',img:IMG+'luosifen.jpg',ds:'广西柳州街头小吃之王。',ig:['干米粉 200g','螺蛳汤料 1包','酸笋 50g','酸豆角 30g','炸腐竹 适量','花生米 适量','木耳丝 适量','辣椒油 适量','醋 1大勺','青菜 几片'],sp:['干米粉冷水泡软','锅中加水烧开，下米粉煮至无硬芯','另起锅，倒入螺蛳汤料，加水烧开','加入酸笋、酸豆角、木耳丝煮2分钟','将煮好的米粉捞入碗中','浇上螺蛳汤','码上炸腐竹、花生米、烫好的青菜','加辣椒油和醋即可'],tp:'酸笋是灵魂。'},
  {id:'zhejiang-dongpoyazhu',n:'东坡肉',r:'江南',rf:'浙江地区',d:'中',t:'3小时',e:'🍖',c1:'#e67e22',c2:'#d35400',img:IMG+'dongporou.jpg',ds:'苏东坡流传千年的名菜。',ig:['五花肉 500g','绍兴黄酒 200ml','生抽 3大勺','老抽 1大勺','冰糖 50g','葱 3根','姜 1大块','八角 2个'],sp:['五花肉整块冷水下锅，煮10分钟定型','捞出切成4cm见方的方块','砂锅底铺葱段和姜片','肉皮朝下码入锅中','倒入黄酒、生抽、老抽','加入冰糖和八角','大火烧开转小火盖盖炖2小时','将肉翻面，继续炖30分钟','开盖大火收汁至浓稠即可'],tp:'一定要用绍兴黄酒。'},
  {id:'hubei-doupi',n:'武汉三鲜豆皮',r:'华中',rf:'湖北地区',d:'高',t:'1小时',e:'🫓',c1:'#34495e',c2:'#2c3e50',img:IMG+'doupi.jpg',ds:'武汉过早摊上的王牌。',ig:['绿豆 100g','大米 100g','糯米 300g','五花肉丁 100g','香菇丁 50g','笋丁 50g','香干丁 3块','生抽 2大勺','老抽 1大勺','盐 适量','葱花 适量'],sp:['绿豆和大米浸泡4小时，磨成米浆','糯米蒸熟备用','五花肉丁煸炒出油，下香菇丁、笋丁、香干丁','加生抽、老抽、盐炒成馅料','平底锅刷油，舀一勺米浆摊成圆形薄皮','在皮上铺一层糯米饭','再铺上一层馅料','用锅铲将四边折起包好','翻面煎至两面金黄酥脆','切块撒葱花即可'],tp:'米浆不能太稠也不能太稀。'}
]

const dc=v=>v==='低'?'lv1':v==='中'?'lv2':'lv3'
const dl=v=>v==='低'?t('diff_easy'):v==='中'?t('diff_mid'):t('diff_hard')

let _cloudData=null
let _cloudLoaded=false
async function loadCloudData(){
  if(_cloudLoaded)return _cloudData
  _cloudLoaded=true
  try{
    const res=await fetch('https://raw.githubusercontent.com/a5782181/wangzhan/main/data/site.json?t='+Date.now())
    if(res.ok){
      _cloudData=await res.json()
      localStorage.setItem('articles',JSON.stringify(_cloudData.articles||[]))
      localStorage.setItem('plans',JSON.stringify(_cloudData.plans||[]))
      localStorage.setItem('heroSlides',JSON.stringify(_cloudData.heroSlides||[]))
      return _cloudData
    }
  }catch(e){}
  return null
}

function getArticles(){return JSON.parse(localStorage.getItem('articles')||'[]')}
function getPlans(){return JSON.parse(localStorage.getItem('plans')||'[{"key":"完整菜谱PDF","name":"📖 完整菜谱PDF","price":"19.99","enabled":true},{"key":"视频教程","name":"🎬 视频教程","price":"39.99","enabled":true},{"key":"赞助支持","name":"☕ 赞助支持","price":"9.99","enabled":true},{"key":"一对一带做","name":"👨‍🍳 一对一带做","price":"199","enabled":true}]')}
function getHeroSlides(){return JSON.parse(localStorage.getItem('heroSlides')||'[]')}

function getAllRecipes(){
  const articles=getArticles()
  const custom=articles.map(a=>({
    id:a.id,n:a.name,r:a.region,rf:a.region+'地区',d:a.diff,t:a.time,e:'🍽️',
    c1:'#666',c2:'#888',img:a.img||'',ds:a.desc||'',ig:a.ingredients||[],sp:a.steps||[],tp:'',_custom:true
  }))
  const ids=new Set(custom.map(c=>c.id))
  const builtIn=R.filter(r=>!ids.has(r.id))
  const all=[...custom,...builtIn]
  return all
}

function hotCard(r){
  const name=tr(r.id,'n')||r.n
  const imgHtml=r.img
    ?`<img src="${r.img}" alt="${name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="card-img-fallback" style="display:none;background:linear-gradient(135deg,${r.c1},${r.c2})"><span class="em">${r.e}</span></div>`
    :`<div class="card-img-fallback" style="display:flex;background:linear-gradient(135deg,${r.c1},${r.c2})"><span class="em">${r.e}</span></div>`
  const onclick=r._custom?`showDetail('${r.id}')`:`location.href='recipes/${r.id}.html'`
  return `<div class="hot-card" onclick="${onclick}">
    <div class="hot-card-img">${imgHtml}</div>
    <div class="hot-card-name">${name}</div>
  </div>`
}

function card(r){
  const name=tr(r.id,'n')||r.n
  const desc=tr(r.id,'ds')||r.ds
  const region=trRegion(r.r)||r.r
  const time=trTime(r.t)
  const imgHtml=r.img
    ?`<img src="${r.img}" alt="${name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="card-img-fallback" style="display:none;background:linear-gradient(135deg,${r.c1},${r.c2})"><span class="em">${r.e}</span></div>`
    :`<div class="card-img-fallback" style="display:flex;background:linear-gradient(135deg,${r.c1},${r.c2})"><span class="em">${r.e}</span></div>`
  const onclick=r._custom?`showDetail('${r.id}')`:`location.href='recipes/${r.id}.html'`
  return `<div class="card" onclick="${onclick}">
    <div class="card-img">
      ${imgHtml}
      <span class="tag">${region}</span>
      <span class="lv ${dc(r.d)}">${dl(r.d)}</span>
    </div>
    <div class="card-bd">
      <h3>${name}</h3>
      <div class="ds">${desc}</div>
    </div>
  </div>`
}

function getUnlocked(){return JSON.parse(localStorage.getItem('unlocked')||'[]')}
function unlockArticle(id){const u=getUnlocked();if(!u.includes(id)){u.push(id);localStorage.setItem('unlocked',JSON.stringify(u))}}

function showDetail(id){
  const articles=getArticles()
  const a=articles.find(x=>x.id===id)
  if(!a)return
  const plans=getPlans().filter(p=>p.enabled)
  const lang=getLang()
  const name=tr(id,'n')||a.name
  const desc=tr(id,'ds')||a.desc
  const region=trRegion(a.region)||a.region
  const time=trTime(a.time)
  const ingArr=(lang!=='zh'&&a['ingredients_'+lang])?a['ingredients_'+lang]:(a.ingredients||[])
  const stepArr=(lang!=='zh'&&a['steps_'+lang])?a['steps_'+lang]:(a.steps||[])
  const stepsHtml=stepArr.map((s,i)=>`<div class="stp"><div class="stp-n">${i+1}</div><div class="stp-t">${s}</div></div>`).join('')
  const ingredHtml=ingArr.map(i=>`<div class="ig-i">${i}</div>`).join('')
  const isPaid=a.paid||false
  const isUnlocked=getUnlocked().includes(id)
  const showFull=!isPaid||isUnlocked
  const contentHtml=showFull
    ?`<p style="color:#555;line-height:1.8;margin-bottom:16px">${desc}</p>
      ${ingredHtml?`<h3 style="font-size:16px;font-weight:700;margin:20px 0 10px;padding-left:10px;border-left:3px solid #1890ff">${t('ing_title')}</h3><div class="ig">${ingredHtml}</div>`:''}
      ${stepsHtml?`<h3 style="font-size:16px;font-weight:700;margin:20px 0 10px;padding-left:10px;border-left:3px solid #1890ff">${t('step_title')}</h3>${stepsHtml}`:''}`
    :`<p style="color:#555;line-height:1.8;margin-bottom:16px">${desc}</p>
      <div class="sup" style="margin-top:16px"><h3 style="font-size:16px;font-weight:700;margin-bottom:4px">${t('locked_title')}</h3><p class="sub" style="font-size:13px;color:#999;margin-bottom:16px">${t('locked_desc')}</p><div class="sup-g" style="justify-content:center">${plans.map(p=>{
        const em=p.key.includes('PDF')?'📖':p.key.includes('视频')?'🎬':p.key.includes('赞助')?'☕':'👨‍🍳'
        return `<div class="sup-c" onclick="showPay('${p.key}','${convertPrice(p.price,lang)}','${a.name}','${a.id}')"><div class="em">${em}</div><div class="nm">${trPlanName(p.name)}</div><div class="pr">${convertPrice(p.price,lang)}</div></div>`
      }).join('')}</div></div>`
  const supHtml=showFull?`<div class="sup" style="margin-top:24px"><h3 style="font-size:16px;font-weight:700;margin-bottom:4px">${t('sup_title')}</h3><p class="sub" style="font-size:13px;color:#999;margin-bottom:16px">${t('sup_sub')}</p><div class="sup-g" style="justify-content:center">${plans.map(p=>{
    const em=p.key.includes('PDF')?'📖':p.key.includes('视频')?'🎬':p.key.includes('赞助')?'☕':'👨‍🍳'
    const ds=p.key.includes('PDF')?t('sup_pdf_ds'):p.key.includes('视频')?t('sup_video_ds'):p.key.includes('赞助')?t('sup_support_ds'):t('sup_vip_ds')
    return `<div class="sup-c" onclick="showPay('${p.key}','${convertPrice(p.price,lang)}','${a.name}','${a.id}')"><div class="em">${em}</div><div class="nm">${trPlanName(p.name)}</div><div class="pr">${convertPrice(p.price,lang)}</div><div class="ds">${ds}</div></div>`
  }).join('')}</div></div>`:''
  const modal=document.createElement('div')
  modal.className='modal on'
  modal.id='detailModal'
  modal.onclick=function(e){if(e.target===this)closeDetail()}
  document.body.style.overflow='hidden'
  modal.innerHTML=`<div style="background:#fff;border-radius:0;max-width:900px;width:100%;height:100vh;overflow-y:auto;padding:0;position:relative" id="detailBox">
    <button onclick="closeDetail()" style="position:fixed;top:16px;right:24px;background:rgba(0,0,0,.6);color:#fff;border:none;border-radius:50%;width:40px;height:40px;font-size:22px;cursor:pointer;z-index:9999;display:flex;align-items:center;justify-content:center">×</button>
    <div style="padding:16px 32px"><a onclick="closeDetail()" style="font-size:13px;color:rgba(255,255,255,.7);cursor:pointer">${t('back')}</a></div>
    <div style="position:relative;height:320px;background:linear-gradient(135deg,#666,#888);display:flex;align-items:center;justify-content:center">
      ${a.img?`<img src="${a.img}" style="width:100%;height:100%;object-fit:cover">`:`<span style="font-size:80px">🍽️</span>`}
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,transparent 30%,rgba(0,0,0,.65))"></div>
      <div style="position:absolute;bottom:24px;left:32px;color:#fff"><h2 style="font-size:28px;font-weight:700;margin-bottom:6px">${name}</h2><span style="font-size:14px;opacity:.85">${t('region')}: ${region} · ${t('time')}: ${time} ${a.diff==='低'?'· '+t('diff_easy'):a.diff==='中'?'· '+t('diff_mid'):'· '+t('diff_hard')}</span></div>
    </div>
    <div style="padding:32px 40px 48px" id="detailContent">${contentHtml}${supHtml}</div>
  </div>`
  document.body.appendChild(modal)
}

function loadHot(){
  const el=document.getElementById('hotRow')
  if(!el)return
  const all=getAllRecipes()
  el.innerHTML=all.slice(0,6).map(hotCard).join('')
}

function loadGrid(f){
  const el=document.getElementById('grid')
  if(!el)return
  const all=getAllRecipes()
  const list=f?all.filter(r=>r.r===f):all
  el.innerHTML=list.map(card).join('')
}

function setupTabs(){
  const all=getAllRecipes()
  const regions=[...new Set(all.map(r=>r.r))]
  const tabsEl=document.getElementById('tabs')
  if(!tabsEl)return
  tabsEl.innerHTML=`<button class="tab on" data-r="">${t('tab_all')}</button>`+regions.map(r=>`<button class="tab" data-r="${r}">${trRegion(r)||r}</button>`).join('')
  tabsEl.querySelectorAll('.tab').forEach(t=>{
    t.onclick=()=>{
      tabsEl.querySelectorAll('.tab').forEach(x=>x.classList.remove('on'))
      t.classList.add('on')
      loadGrid(t.dataset.r||null)
      const title=document.getElementById('gridTitle')
      if(title)title.textContent=t.dataset.r||'全部菜谱'
    }
  })
}

function setupHero(){
  const customSlides=getHeroSlides()
  const heroEl=document.querySelector('.hero')
  if(!heroEl)return
  if(customSlides.length>0){
    const slidesHtml=customSlides.map((s,i)=>{
      const clickAction=s.linkId?`onclick="showDetail('${s.linkId}')"`:''
      return`<div class="hero-slide${i===0?' active':''}" ${clickAction} style="cursor:${s.linkId?'pointer':'default'}"><div class="hero-slide-bg" style="background:${s.img?`url(${s.img}) center/cover`:`linear-gradient(135deg,${s.c1||'#1a1a2e'},${s.c2||'#16213e'})`}"></div><div class="hero-slide-overlay"></div><div class="hero-content"><span class="hero-tag">${s.tag||'精选'}</span><div class="hero-title">${s.title||''}</div><div class="hero-desc">${s.desc||''}</div><a href="#hot" class="hero-btn">立即查看</a></div></div>`
    }).join('')
    const dotsHtml=customSlides.map((_,i)=>`<span class="hero-dot${i===0?' active':''}" data-i="${i}"></span>`).join('')
    heroEl.innerHTML=slidesHtml+`<div class="hero-dots">${dotsHtml}</div>`
  }
  const slides=heroEl.querySelectorAll('.hero-slide')
  const dots=heroEl.querySelectorAll('.hero-dot')
  if(!slides.length)return
  let cur=0
  function go(i){slides[cur].classList.remove('active');dots[cur].classList.remove('active');cur=i;slides[cur].classList.add('active');dots[cur].classList.add('active')}
  dots.forEach(d=>d.onclick=()=>go(+d.dataset.i))
  setInterval(()=>go((cur+1)%slides.length),5000)
}

function applyPrices(){
  const plans=getPlans()
  const lang=getLang()
  document.querySelectorAll('.sup-c').forEach(el=>{
    const nm=el.querySelector('.nm')
    if(!nm)return
    const name=nm.textContent
    const plan=plans.find(p=>name.includes(p.key.replace('完整菜谱PDF','完整菜谱').replace('赞助支持','喝杯茶'))||name.includes(p.name))
    if(plan){
      const pr=el.querySelector('.pr')
      if(pr)pr.textContent=convertPrice(plan.price,lang)
      nm.textContent=plan.name
      el.style.display=plan.enabled?'':'none'
    }
  })
  document.querySelectorAll('.sup-g').forEach(g=>{
    const visible=[...g.children].filter(c=>c.style.display!=='none')
    if(visible.length===0)g.parentElement.style.display='none'
  })
  document.querySelectorAll('.sup-c[onclick*="showPay"]').forEach(el=>{
    const onclick=el.getAttribute('onclick')
    const match=onclick.match(/showPay\('([^']+)',\s*'([^']+)'/)
    if(match){
      const planKey=match[1]
      const plan=plans.find(p=>p.key===planKey)
      if(plan){
        const pr=el.querySelector('.pr')
        if(pr)pr.textContent=convertPrice(plan.price,lang)
        el.style.display=plan.enabled?'':'none'
      }
    }
  })
}

function closeDetail(){
  const m=document.getElementById('detailModal')
  if(m)m.remove()
  document.body.style.overflow=''
}

function showPay(plan,price,name,articleId){
  const modal=document.createElement('div')
  modal.className='modal on'
  modal.id='payModal'
  modal.onclick=function(e){if(e.target===this)this.remove()}
  modal.innerHTML=`<div style="background:#fff;border-radius:12px;max-width:420px;width:90%;padding:32px 24px;text-align:center;box-shadow:0 8px 32px rgba(0,0,0,.2)">
    <div style="font-size:36px;margin-bottom:8px">💳</div>
    <h3 style="font-size:18px;font-weight:700;margin-bottom:4px">Checkout</h3>
    <p style="font-size:13px;color:#888;margin-bottom:16px">${name} - ${plan}</p>
    <div style="font-size:32px;font-weight:700;color:#1890ff;margin-bottom:20px">${price}</div>
    <div style="background:#f8f8f8;border-radius:8px;padding:14px;margin-bottom:16px;text-align:left">
      <div style="display:flex;justify-content:space-between;font-size:12px;color:#888;margin-bottom:6px"><span>${t('item')}</span><span>${plan}</span></div>
      <div style="display:flex;justify-content:space-between;font-size:12px;color:#888;margin-bottom:6px"><span>${t('recipe')}</span><span>${name}</span></div>
      <div style="display:flex;justify-content:space-between;font-size:15px;font-weight:700;color:#333;border-top:1px solid #e8e8e8;padding-top:10px;margin-top:10px"><span>${t('total')}</span><span style="color:#f5222d">${price}</span></div>
    </div>
    <div style="text-align:left;margin-bottom:16px">
      <p style="font-size:12px;color:#888;margin-bottom:10px;font-weight:600">${t('payment_method')}</p>
      <label style="display:flex;align-items:center;gap:10px;padding:10px 12px;border:2px solid #1890ff;border-radius:8px;margin-bottom:8px;cursor:pointer;background:#f0f7ff">
        <input type="radio" name="payMethod" value="paypal" checked style="accent-color:#1890ff">
        <span style="font-size:20px">🅿️</span>
        <span style="font-size:13px;font-weight:600;color:#333">PayPal</span>
      </label>
      <label style="display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid #e8e8e8;border-radius:8px;margin-bottom:8px;cursor:pointer">
        <input type="radio" name="payMethod" value="visa" style="accent-color:#1890ff">
        <span style="font-size:20px">💳</span>
        <span style="font-size:13px;font-weight:600;color:#333">Visa</span>
      </label>
      <label style="display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid #e8e8e8;border-radius:8px;margin-bottom:8px;cursor:pointer">
        <input type="radio" name="payMethod" value="mastercard" style="accent-color:#1890ff">
        <span style="font-size:20px">🔴</span>
        <span style="font-size:13px;font-weight:600;color:#333">Mastercard</span>
      </label>
      <label style="display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid #e8e8e8;border-radius:8px;margin-bottom:8px;cursor:pointer">
        <input type="radio" name="payMethod" value="applepay" style="accent-color:#1890ff">
        <span style="font-size:20px">🍎</span>
        <span style="font-size:13px;font-weight:600;color:#333">Apple Pay</span>
      </label>
      <label style="display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid #e8e8e8;border-radius:8px;cursor:pointer">
        <input type="radio" name="payMethod" value="googlepay" style="accent-color:#1890ff">
        <span style="font-size:20px">🔵</span>
        <span style="font-size:13px;font-weight:600;color:#333">Google Pay</span>
      </label>
    </div>
    <div style="display:flex;gap:10px">
      <button onclick="document.getElementById('payModal').remove()" style="flex:1;padding:12px;border:1px solid #ddd;border-radius:8px;background:#fff;color:#666;font-size:14px;cursor:pointer">${t('cancel')}</button>
      <button onclick="confirmPay('${plan}','${price}','${name}','${articleId||''}')" style="flex:2;padding:12px;border:none;border-radius:8px;background:#1890ff;color:#fff;font-size:14px;font-weight:600;cursor:pointer">${t('pay_now')}</button>
    </div>
  </div>`
  document.body.appendChild(modal)
  modal.querySelectorAll('input[name=payMethod]').forEach(r=>{
    r.onchange=function(){
      modal.querySelectorAll('label').forEach(l=>{l.style.border='1px solid #e8e8e8';l.style.background=''})
      this.closest('label').style.border='2px solid #1890ff'
      this.closest('label').style.background='#f0f7ff'
    }
  })
}

async function confirmPay(plan,price,name,articleId){
  document.getElementById('payModal').remove()
  const visitor=localStorage.getItem('vid')||('v_'+Date.now()+'_'+Math.random().toString(36).slice(2,8))
  localStorage.setItem('vid',visitor)
  let ipInfo={ip:'unknown',country:'unknown',city:'unknown'}
  try{
    const ipRes=await fetch('https://ipapi.co/json/')
    const ipData=await ipRes.json()
    ipInfo={ip:ipData.ip||'unknown',country:ipData.country_name||'unknown',city:ipData.city||'unknown',cc:ipData.country_code||''}
  }catch(e){}
  const click={time:new Date().toISOString(),plan,price,recipe:name,visitor,...ipInfo}
  const clicks=JSON.parse(localStorage.getItem('clicks')||'[]')
  clicks.push(click)
  localStorage.setItem('clicks',JSON.stringify(clicks))
  try{await fetch(`${API}/track`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({plan,price,recipeName:name,page:location.pathname,...ipInfo})})}catch(e){}
  if(articleId)unlockArticle(articleId)
  const thankModal=document.createElement('div')
  thankModal.className='modal on'
  thankModal.id='thankModal'
  thankModal.onclick=function(e){if(e.target===this)this.remove()}
  thankModal.innerHTML=`<div style="background:#fff;border-radius:12px;max-width:360px;width:90%;padding:36px 28px;text-align:center;box-shadow:0 8px 32px rgba(0,0,0,.2)">
    <div style="font-size:48px;margin-bottom:12px">🙏</div>
    <h3 style="font-size:17px;font-weight:700;margin-bottom:6px">${t('thank_title')}</h3>
    <p style="font-size:13px;color:#888;margin-bottom:12px;line-height:1.6">${t('thank_desc')}</p>
    ${articleId?`<p style="font-size:14px;color:#52c41a;font-weight:600;margin-bottom:16px">${t('unlocked')}</p>`:''}
    <button onclick="closeAndRefresh('${articleId||''}')" style="padding:10px 32px;border:none;border-radius:6px;background:#1890ff;color:#fff;font-size:14px;cursor:pointer">${t('got_it')}</button>
  </div>`
  document.body.appendChild(thankModal)
}

function closeAndRefresh(articleId){
  document.getElementById('thankModal').remove()
  if(articleId){
    closeDetail()
    showDetail(articleId)
  }
}

async function translateDetailContent(id,a){
  const lang=getLang()
  const content=document.getElementById('detailContent')
  if(!content)return
  const igItems=content.querySelectorAll('.ig-i')
  const stItems=content.querySelectorAll('.stp-t')
  for(const el of igItems){
    const original=el.textContent
    el.textContent=await getCachedTranslation(original,lang)
  }
  for(const el of stItems){
    const original=el.textContent
    el.textContent=await getCachedTranslation(original,lang)
  }
}

async function recordVisit(){
  const visitor=localStorage.getItem('vid')||('v_'+Date.now()+'_'+Math.random().toString(36).slice(2,8))
  localStorage.setItem('vid',visitor)
  let ipInfo={ip:'unknown',country:'unknown',city:'unknown',cc:''}
  try{
    const ipRes=await fetch('https://ipapi.co/json/')
    const ipData=await ipRes.json()
    ipInfo={ip:ipData.ip||'unknown',country:ipData.country_name||'unknown',city:ipData.city||'unknown',cc:ipData.country_code||''}
  }catch(e){}
  const visit={time:new Date().toISOString(),type:'visit',visitor,...ipInfo,page:location.pathname}
  const visits=JSON.parse(localStorage.getItem('visits')||'[]')
  const today=new Date().toISOString().slice(0,10)
  const alreadyToday=visits.some(v=>v.visitor===visitor&&v.time&&v.time.slice(0,10)===today)
  if(!alreadyToday){
    visits.push(visit)
    localStorage.setItem('visits',JSON.stringify(visits))
  }
}

window.onload=async()=>{
  await loadCloudData()
  await recordVisit()
  initI18n()
  loadHot()
  loadGrid()
  setupTabs()
  setupHero()
  applyPrices()
}
