// 自然拼读课程数据（参考 Oxford Phonics World / Jolly Phonics / UK Letters and Sounds 的进阶顺序）
// 结构：关卡 level → 拼读家族 family → 组合 pattern → 单词 word
// 单词里用方括号标出发这个音的字母：tr[ee]、c[a]k[e]、c[at]
// say：给浏览器语音读的“发音”文字；没有就读第一个单词
window.PHONICS = {
  levels: [
    {
      id: 'letters', no: 1, title: 'Letter Sounds', zh: '字母发音', icon: '🔤', color: '#FF8A5B',
      desc: '先认识 26 个字母的“小声音”，每个字母都有自己的发音，和字母名字不一样哦。',
      families: [
        {
          id: 'satpin', title: 's a t p i n', zh: '第一组字母', icon: '🐍', sound: null, say: null,
          tip: 's 像蛇在嘶嘶叫，t 像钟在滴答，p 像爆米花噗噗响！',
          patterns: [
            { id: 's', label: 's', sound: '/s/', say: 'sss', words: [
              { w: '[s]un', e: '☀️', zh: '太阳' },
              { w: '[s]nake', e: '🐍', zh: '蛇' },
              { w: '[s]ock', e: '🧦', zh: '袜子' },
            ] },
            { id: 'a', label: 'a', sound: '/æ/', words: [
              { w: '[a]pple', e: '🍎', zh: '苹果' },
              { w: '[a]nt', e: '🐜', zh: '蚂蚁' },
              { w: '[a]lligator', e: '🐊', zh: '鳄鱼' },
            ] },
            { id: 't', label: 't', sound: '/t/', words: [
              { w: '[t]iger', e: '🐯', zh: '老虎' },
              { w: '[t]ent', e: '⛺', zh: '帐篷' },
              { w: '[t]urtle', e: '🐢', zh: '乌龟' },
            ] },
            { id: 'p', label: 'p', sound: '/p/', words: [
              { w: '[p]ig', e: '🐷', zh: '猪' },
              { w: '[p]anda', e: '🐼', zh: '熊猫' },
              { w: '[p]izza', e: '🍕', zh: '披萨' },
            ] },
            { id: 'i', label: 'i', sound: '/ɪ/', words: [
              { w: '[i]nsect', e: '🐛', zh: '昆虫' },
              { w: '[i]ll', e: '🤒', zh: '生病' },
              { w: '[i]nch', e: '📏', zh: '英寸' },
            ] },
            { id: 'n', label: 'n', sound: '/n/', say: 'nnn', words: [
              { w: '[n]ose', e: '👃', zh: '鼻子' },
              { w: '[n]ut', e: '🥜', zh: '坚果' },
              { w: '[n]oodles', e: '🍜', zh: '面条' },
            ] },
          ],
        },
        {
          id: 'ckehrmd', title: 'c k e h r m d', zh: '第二组字母', icon: '🐱', sound: null, say: null,
          tip: 'c 和 k 是双胞胎，声音一样：“k”！m 要闭上嘴巴嗯嗯嗯。',
          patterns: [
            { id: 'c', label: 'c', sound: '/k/', words: [
              { w: '[c]at', e: '🐱', zh: '猫' },
              { w: '[c]ow', e: '🐮', zh: '奶牛' },
              { w: '[c]ake', e: '🎂', zh: '蛋糕' },
            ] },
            { id: 'k', label: 'k', sound: '/k/', words: [
              { w: '[k]ite', e: '🪁', zh: '风筝' },
              { w: '[k]ey', e: '🔑', zh: '钥匙' },
              { w: '[k]angaroo', e: '🦘', zh: '袋鼠' },
            ] },
            { id: 'e', label: 'e', sound: '/e/', words: [
              { w: '[e]gg', e: '🥚', zh: '鸡蛋' },
              { w: '[e]lephant', e: '🐘', zh: '大象' },
              { w: '[e]nvelope', e: '✉️', zh: '信封' },
            ] },
            { id: 'h', label: 'h', sound: '/h/', words: [
              { w: '[h]at', e: '🎩', zh: '帽子' },
              { w: '[h]orse', e: '🐴', zh: '马' },
              { w: '[h]ouse', e: '🏠', zh: '房子' },
            ] },
            { id: 'r', label: 'r', sound: '/r/', words: [
              { w: '[r]abbit', e: '🐰', zh: '兔子' },
              { w: '[r]ainbow', e: '🌈', zh: '彩虹' },
              { w: '[r]ing', e: '💍', zh: '戒指' },
            ] },
            { id: 'm', label: 'm', sound: '/m/', say: 'mmm', words: [
              { w: '[m]oon', e: '🌙', zh: '月亮' },
              { w: '[m]onkey', e: '🐵', zh: '猴子' },
              { w: '[m]ilk', e: '🥛', zh: '牛奶' },
            ] },
            { id: 'd', label: 'd', sound: '/d/', words: [
              { w: '[d]og', e: '🐶', zh: '狗' },
              { w: '[d]uck', e: '🦆', zh: '鸭子' },
              { w: '[d]oor', e: '🚪', zh: '门' },
            ] },
          ],
        },
        {
          id: 'goulfb', title: 'g o u l f b', zh: '第三组字母', icon: '🐐', sound: null, say: null,
          tip: 'f 像轮胎漏气 fff，l 的舌头要顶在上牙后面。',
          patterns: [
            { id: 'g', label: 'g', sound: '/g/', words: [
              { w: '[g]oat', e: '🐐', zh: '山羊' },
              { w: '[g]ift', e: '🎁', zh: '礼物' },
              { w: '[g]orilla', e: '🦍', zh: '大猩猩' },
            ] },
            { id: 'o', label: 'o', sound: '/ɒ/', words: [
              { w: '[o]ctopus', e: '🐙', zh: '章鱼' },
              { w: '[o]tter', e: '🦦', zh: '水獭' },
              { w: '[o]x', e: '🐂', zh: '公牛' },
            ] },
            { id: 'u', label: 'u', sound: '/ʌ/', say: 'uh', words: [
              { w: '[u]mbrella', e: '☂️', zh: '雨伞' },
              { w: '[u]p', e: '⬆️', zh: '向上' },
              { w: '[u]nder', e: '⬇️', zh: '在下面' },
            ] },
            { id: 'l', label: 'l', sound: '/l/', say: 'lll', words: [
              { w: '[l]ion', e: '🦁', zh: '狮子' },
              { w: '[l]emon', e: '🍋', zh: '柠檬' },
              { w: '[l]eaf', e: '🍃', zh: '叶子' },
            ] },
            { id: 'f', label: 'f', sound: '/f/', say: 'fff', words: [
              { w: '[f]ish', e: '🐟', zh: '鱼' },
              { w: '[f]ox', e: '🦊', zh: '狐狸' },
              { w: '[f]ork', e: '🍴', zh: '叉子' },
            ] },
            { id: 'b', label: 'b', sound: '/b/', words: [
              { w: '[b]all', e: '⚽', zh: '球' },
              { w: '[b]ee', e: '🐝', zh: '蜜蜂' },
              { w: '[b]ear', e: '🐻', zh: '熊' },
            ] },
          ],
        },
        {
          id: 'jzwvyxq', title: 'j z w v y x q', zh: '第四组字母', icon: '🦓', sound: null, say: null,
          tip: 'z 像小蜜蜂嗡嗡嗡；x 的声音在单词的结尾，像 fox 的尾巴 ks。',
          patterns: [
            { id: 'j', label: 'j', sound: '/dʒ/', words: [
              { w: '[j]uice', e: '🧃', zh: '果汁' },
              { w: '[j]acket', e: '🧥', zh: '夹克' },
              { w: '[j]eans', e: '👖', zh: '牛仔裤' },
            ] },
            { id: 'z', label: 'z', sound: '/z/', say: 'zzz', words: [
              { w: '[z]ebra', e: '🦓', zh: '斑马' },
              { w: '[z]ip', e: '🤐', zh: '拉链' },
              { w: '[z]ero', e: '0️⃣', zh: '零' },
            ] },
            { id: 'w', label: 'w', sound: '/w/', words: [
              { w: '[w]atch', e: '⌚', zh: '手表' },
              { w: '[w]olf', e: '🐺', zh: '狼' },
              { w: '[w]ater', e: '💧', zh: '水' },
            ] },
            { id: 'v', label: 'v', sound: '/v/', say: 'vvv', words: [
              { w: '[v]an', e: '🚐', zh: '面包车' },
              { w: '[v]iolin', e: '🎻', zh: '小提琴' },
              { w: '[v]olcano', e: '🌋', zh: '火山' },
            ] },
            { id: 'y', label: 'y', sound: '/j/', words: [
              { w: '[y]o-yo', e: '🪀', zh: '悠悠球' },
              { w: '[y]ellow', e: '💛', zh: '黄色' },
              { w: '[y]arn', e: '🧶', zh: '毛线' },
            ] },
            { id: 'x', label: 'x', sound: '/ks/', words: [
              { w: 'fo[x]', e: '🦊', zh: '狐狸' },
              { w: 'bo[x]', e: '📦', zh: '盒子' },
              { w: 'si[x]', e: '6️⃣', zh: '六' },
            ] },
            { id: 'q', label: 'qu', sound: '/kw/', words: [
              { w: '[qu]een', e: '👸', zh: '女王' },
              { w: '[qu]estion', e: '❓', zh: '问题' },
              { w: '[qu]ack', e: '🦆', zh: '嘎嘎叫' },
            ] },
          ],
        },
      ],
    },
    {
      id: 'short-vowels', no: 2, title: 'Short Vowels', zh: '短元音（单词家族）', icon: '🧩', color: '#E8912D',
      desc: '学会短元音，用“单词家族”一口气读出一串词：c-at, h-at, b-at！',
      families: [
        {
          id: 'short-a', title: 'Short a', zh: '短 a 家族', icon: '🐱', sound: null, say: null,
          tip: '嘴巴张大“啊”一下就是短 a。换个开头字母，就是新单词！',
          patterns: [
            { id: 'at', label: '-at', sound: '/æt/', say: 'at', words: [
              { w: 'c[at]', e: '🐱', zh: '猫' },
              { w: 'h[at]', e: '🎩', zh: '帽子' },
              { w: 'b[at]', e: '🦇', zh: '蝙蝠' },
              { w: 'r[at]', e: '🐀', zh: '老鼠' },
            ] },
            { id: 'an', label: '-an', sound: '/æn/', say: 'an', words: [
              { w: 'm[an]', e: '👨', zh: '男人' },
              { w: 'p[an]', e: '🍳', zh: '平底锅' },
              { w: 'v[an]', e: '🚐', zh: '面包车' },
              { w: 'c[an]', e: '🥫', zh: '罐头' },
            ] },
            { id: 'ap', label: '-ap', sound: '/æp/', say: 'app', words: [
              { w: 'm[ap]', e: '🗺️', zh: '地图' },
              { w: 'c[ap]', e: '🧢', zh: '鸭舌帽' },
              { w: 'n[ap]', e: '😴', zh: '小睡' },
              { w: 't[ap]', e: '🚰', zh: '水龙头' },
            ] },
            { id: 'ag', label: '-ag', sound: '/æg/', say: 'agg', words: [
              { w: 'b[ag]', e: '👜', zh: '包' },
              { w: 'fl[ag]', e: '🚩', zh: '旗子' },
              { w: 't[ag]', e: '🏷️', zh: '标签' },
              { w: 'w[ag]', e: '🐕', zh: '摇尾巴' },
            ] },
          ],
        },
        {
          id: 'short-e', title: 'Short e', zh: '短 e 家族', icon: '🐔', sound: null, say: null,
          tip: '短 e 像轻轻说“哎”，嘴巴微微张开：e e e！',
          patterns: [
            { id: 'et', label: '-et', sound: '/et/', say: 'ett', words: [
              { w: 'j[et]', e: '✈️', zh: '喷气飞机' },
              { w: 'n[et]', e: '🥅', zh: '网' },
              { w: 'w[et]', e: '💦', zh: '湿的' },
              { w: 'p[et]', e: '🐶', zh: '宠物' },
            ] },
            { id: 'en', label: '-en', sound: '/en/', say: 'enn', words: [
              { w: 'h[en]', e: '🐔', zh: '母鸡' },
              { w: 'p[en]', e: '🖊️', zh: '钢笔' },
              { w: 't[en]', e: '🔟', zh: '十' },
              { w: 'm[en]', e: '👬', zh: '男人们' },
            ] },
            { id: 'ed', label: '-ed', sound: '/ed/', say: 'Ed', words: [
              { w: 'b[ed]', e: '🛏️', zh: '床' },
              { w: 'r[ed]', e: '🔴', zh: '红色' },
              { w: 'sl[ed]', e: '🛷', zh: '雪橇' },
              { w: 't[ed]dy', e: '🧸', zh: '泰迪熊' },
            ] },
            { id: 'eg', label: '-eg', sound: '/eg/', say: 'egg', words: [
              { w: 'l[eg]', e: '🦵', zh: '腿' },
              { w: 'b[eg]', e: '🙏', zh: '乞求' },
              { w: 'p[eg]', e: '📌', zh: '钉子' },
              { w: '[eg]g', e: '🥚', zh: '鸡蛋' },
            ] },
          ],
        },
        {
          id: 'short-i', title: 'Short i', zh: '短 i 家族', icon: '🐷', sound: null, say: null,
          tip: '短 i 像小老鼠“吱”：i i i，嘴巴扁扁的，别读成“爱”哦。',
          patterns: [
            { id: 'it', label: '-it', sound: '/ɪt/', say: 'it', words: [
              { w: 's[it]', e: '🪑', zh: '坐' },
              { w: 'h[it]', e: '🔨', zh: '打' },
              { w: 'k[it]', e: '🧰', zh: '工具箱' },
              { w: 'p[it]', e: '🕳️', zh: '坑' },
            ] },
            { id: 'in', label: '-in', sound: '/ɪn/', say: 'in', words: [
              { w: 'p[in]', e: '📍', zh: '大头针' },
              { w: 'b[in]', e: '🗑️', zh: '垃圾桶' },
              { w: 'f[in]', e: '🦈', zh: '鱼鳍' },
              { w: 'w[in]', e: '🏆', zh: '赢' },
            ] },
            { id: 'ig', label: '-ig', sound: '/ɪg/', say: 'igg', words: [
              { w: 'p[ig]', e: '🐷', zh: '猪' },
              { w: 'd[ig]', e: '⛏️', zh: '挖' },
              { w: 'b[ig]', e: '🐘', zh: '大的' },
              { w: 'tw[ig]', e: '🌿', zh: '小树枝' },
            ] },
            { id: 'ip', label: '-ip', sound: '/ɪp/', say: 'ip', words: [
              { w: 'l[ip]', e: '👄', zh: '嘴唇' },
              { w: 'sh[ip]', e: '🚢', zh: '轮船' },
              { w: 'z[ip]', e: '🤐', zh: '拉链' },
              { w: 'ch[ip]', e: '🍟', zh: '薯条' },
            ] },
          ],
        },
        {
          id: 'short-o', title: 'Short o', zh: '短 o 家族', icon: '🐸', sound: null, say: null,
          tip: '短 o 像张大嘴巴看牙医：o o o！',
          patterns: [
            { id: 'ot', label: '-ot', sound: '/ɒt/', say: 'ott', words: [
              { w: 'h[ot]', e: '🥵', zh: '热的' },
              { w: 'p[ot]', e: '🍲', zh: '锅' },
              { w: 'd[ot]', e: '⚫', zh: '圆点' },
              { w: 'rob[ot]', e: '🤖', zh: '机器人' },
            ] },
            { id: 'op', label: '-op', sound: '/ɒp/', say: 'opp', words: [
              { w: 'h[op]', e: '🐇', zh: '跳' },
              { w: 't[op]', e: '🔝', zh: '顶部' },
              { w: 'p[op]', e: '🍿', zh: '爆米花' },
              { w: 'c[op]', e: '👮', zh: '警察' },
            ] },
            { id: 'og', label: '-og', sound: '/ɒg/', say: 'ogg', words: [
              { w: 'd[og]', e: '🐶', zh: '狗' },
              { w: 'fr[og]', e: '🐸', zh: '青蛙' },
              { w: 'f[og]', e: '🌫️', zh: '雾' },
              { w: 'j[og]', e: '🏃', zh: '慢跑' },
            ] },
            { id: 'ox', label: '-ox', sound: '/ɒks/', say: 'ox', words: [
              { w: 'b[ox]', e: '📦', zh: '盒子' },
              { w: 'f[ox]', e: '🦊', zh: '狐狸' },
              { w: '[ox]', e: '🐂', zh: '公牛' },
              { w: 'mailb[ox]', e: '📫', zh: '邮箱' },
            ] },
          ],
        },
        {
          id: 'short-u', title: 'Short u', zh: '短 u 家族', icon: '🐛', sound: null, say: null,
          tip: '短 u 像被轻轻打了肚子“呃”：u u u！',
          patterns: [
            { id: 'ug', label: '-ug', sound: '/ʌg/', say: 'ugg', words: [
              { w: 'b[ug]', e: '🐛', zh: '虫子' },
              { w: 'h[ug]', e: '🤗', zh: '拥抱' },
              { w: 'm[ug]', e: '☕', zh: '马克杯' },
              { w: 'pl[ug]', e: '🔌', zh: '插头' },
            ] },
            { id: 'un', label: '-un', sound: '/ʌn/', say: 'un', words: [
              { w: 's[un]', e: '☀️', zh: '太阳' },
              { w: 'r[un]', e: '🏃', zh: '跑' },
              { w: 'f[un]', e: '🎉', zh: '好玩' },
              { w: 'b[un]', e: '🍞', zh: '小面包' },
            ] },
            { id: 'ut', label: '-ut', sound: '/ʌt/', say: 'utt', words: [
              { w: 'c[ut]', e: '✂️', zh: '剪' },
              { w: 'n[ut]', e: '🥜', zh: '坚果' },
              { w: 'h[ut]', e: '🛖', zh: '小屋' },
              { w: 'sh[ut]', e: '🚪', zh: '关上' },
            ] },
            { id: 'ub', label: '-ub', sound: '/ʌb/', say: 'ub', words: [
              { w: 't[ub]', e: '🛁', zh: '浴缸' },
              { w: 'c[ub]', e: '🐻', zh: '幼崽' },
              { w: 'r[ub]', e: '🧽', zh: '擦' },
              { w: 's[ub]', e: '🥪', zh: '潜艇三明治' },
            ] },
          ],
        },
      ],
    },
    {
      id: 'magic-e', no: 3, title: 'Magic E', zh: '魔法 e', icon: '🪄', color: '#A66CFF',
      desc: '单词结尾的 e 不发音，却有魔法：能让前面的元音“喊出自己的名字”！',
      families: [
        {
          id: 'magic-e', title: 'Magic e', zh: '魔法 e', icon: '🪄', sound: null, say: null,
          tip: '结尾的 e 是魔法棒，一挥，元音就念自己的名字：cap 变 cape！',
          patterns: [
            { id: 'a_e', label: 'a_e', sound: '/eɪ/', say: 'ay', words: [
              { w: 'c[a]k[e]', e: '🎂', zh: '蛋糕' },
              { w: 'g[a]m[e]', e: '🎮', zh: '游戏' },
              { w: 'l[a]k[e]', e: '🏞️', zh: '湖' },
              { w: 'pl[a]n[e]', e: '✈️', zh: '飞机' },
            ] },
            { id: 'i_e', label: 'i_e', sound: '/aɪ/', say: 'eye', words: [
              { w: 'k[i]t[e]', e: '🪁', zh: '风筝' },
              { w: 'b[i]k[e]', e: '🚲', zh: '自行车' },
              { w: 'r[i]c[e]', e: '🍚', zh: '米饭' },
              { w: 'f[i]v[e]', e: '5️⃣', zh: '五' },
            ] },
            { id: 'o_e', label: 'o_e', sound: '/əʊ/', say: 'oh', words: [
              { w: 'h[o]m[e]', e: '🏠', zh: '家' },
              { w: 'n[o]s[e]', e: '👃', zh: '鼻子' },
              { w: 'b[o]n[e]', e: '🦴', zh: '骨头' },
              { w: 'r[o]s[e]', e: '🌹', zh: '玫瑰' },
            ] },
            { id: 'u_e', label: 'u_e', sound: '/juː/', say: 'you', words: [
              { w: 'c[u]b[e]', e: '🧊', zh: '方块' },
              { w: 'c[u]t[e]', e: '🥰', zh: '可爱的' },
              { w: 't[u]n[e]', e: '🎵', zh: '曲调' },
              { w: 'h[u]g[e]', e: '🐘', zh: '巨大的' },
            ] },
          ],
        },
      ],
    },
    {
      id: 'digraphs-blends', no: 4, title: 'Digraphs & Blends', zh: '辅音组合', icon: '🔗', color: '#1FA89A',
      desc: '两个字母凑在一起，有的变成新声音（sh），有的各念各的、快快连读（bl）。',
      families: [
        {
          id: 'digraphs-1', title: 'sh ch th wh', zh: '双字母组合 1', icon: '🐑', sound: null, say: null,
          tip: 'sh 是“嘘——”安静；th 要把舌头轻轻伸出来；ch 像火车“切切切”。',
          patterns: [
            { id: 'sh', label: 'sh', sound: '/ʃ/', say: 'shh', words: [
              { w: '[sh]eep', e: '🐑', zh: '绵羊' },
              { w: '[sh]ip', e: '🚢', zh: '轮船' },
              { w: '[sh]ark', e: '🦈', zh: '鲨鱼' },
              { w: '[sh]ell', e: '🐚', zh: '贝壳' },
            ] },
            { id: 'ch', label: 'ch', sound: '/tʃ/', words: [
              { w: '[ch]air', e: '🪑', zh: '椅子' },
              { w: '[ch]eese', e: '🧀', zh: '奶酪' },
              { w: '[ch]erry', e: '🍒', zh: '樱桃' },
              { w: '[ch]icken', e: '🐔', zh: '鸡' },
            ] },
            { id: 'th', label: 'th', sound: '/θ/', words: [
              { w: '[th]umb', e: '👍', zh: '拇指' },
              { w: '[th]ree', e: '3️⃣', zh: '三' },
              { w: '[th]ink', e: '💭', zh: '想' },
              { w: 'ba[th]', e: '🛁', zh: '洗澡' },
            ] },
            { id: 'wh', label: 'wh', sound: '/w/', words: [
              { w: '[wh]ale', e: '🐳', zh: '鲸鱼' },
              { w: '[wh]ite', e: '⬜', zh: '白色' },
              { w: '[wh]eat', e: '🌾', zh: '小麦' },
              { w: '[wh]isper', e: '🤫', zh: '小声说' },
            ] },
          ],
        },
        {
          id: 'digraphs-2', title: 'ck ng nk ph', zh: '双字母组合 2', icon: '🦆', sound: null, say: null,
          tip: 'ck 在词尾像 k；ng 声音从鼻子里出来；ph 听起来就是 f。',
          patterns: [
            { id: 'ck', label: 'ck', sound: '/k/', words: [
              { w: 'du[ck]', e: '🦆', zh: '鸭子' },
              { w: 'so[ck]', e: '🧦', zh: '袜子' },
              { w: 'clo[ck]', e: '⏰', zh: '钟' },
              { w: 'tru[ck]', e: '🚚', zh: '卡车' },
            ] },
            { id: 'ng', label: 'ng', sound: '/ŋ/', say: 'ing', words: [
              { w: 'ri[ng]', e: '💍', zh: '戒指' },
              { w: 'ki[ng]', e: '👑', zh: '国王' },
              { w: 'so[ng]', e: '🎵', zh: '歌' },
              { w: 'ba[ng]', e: '💥', zh: '砰' },
            ] },
            { id: 'nk', label: 'nk', sound: '/ŋk/', words: [
              { w: 'ba[nk]', e: '🏦', zh: '银行' },
              { w: 'si[nk]', e: '🚰', zh: '水槽' },
              { w: 'sku[nk]', e: '🦨', zh: '臭鼬' },
              { w: 'tha[nk]', e: '🙏', zh: '感谢' },
            ] },
            { id: 'ph', label: 'ph', sound: '/f/', words: [
              { w: '[ph]one', e: '📱', zh: '手机' },
              { w: '[ph]oto', e: '📷', zh: '照片' },
              { w: 'dol[ph]in', e: '🐬', zh: '海豚' },
              { w: 'gra[ph]', e: '📈', zh: '图表' },
            ] },
          ],
        },
        {
          id: 'l-blends', title: 'L blends', zh: 'L 开头组合', icon: '🌸', sound: null, say: null,
          tip: '两个字母要连在一起快快读：b-l → bl，每个声音都要听得见。',
          patterns: [
            { id: 'bl', label: 'bl', sound: '/bl/', words: [
              { w: '[bl]ock', e: '🧱', zh: '积木块' },
              { w: '[bl]ue', e: '🔵', zh: '蓝色' },
              { w: '[bl]ack', e: '⬛', zh: '黑色' },
              { w: '[bl]ow', e: '💨', zh: '吹' },
            ] },
            { id: 'cl', label: 'cl', sound: '/kl/', words: [
              { w: '[cl]ock', e: '⏰', zh: '钟' },
              { w: '[cl]ap', e: '👏', zh: '拍手' },
              { w: '[cl]own', e: '🤡', zh: '小丑' },
              { w: '[cl]oud', e: '☁️', zh: '云' },
            ] },
            { id: 'fl', label: 'fl', sound: '/fl/', words: [
              { w: '[fl]ag', e: '🚩', zh: '旗子' },
              { w: '[fl]ower', e: '🌸', zh: '花' },
              { w: '[fl]y', e: '🪰', zh: '苍蝇' },
              { w: '[fl]ame', e: '🔥', zh: '火焰' },
            ] },
            { id: 'gl', label: 'gl', sound: '/gl/', words: [
              { w: '[gl]asses', e: '👓', zh: '眼镜' },
              { w: '[gl]ove', e: '🧤', zh: '手套' },
              { w: '[gl]obe', e: '🌍', zh: '地球仪' },
              { w: '[gl]ow', e: '✨', zh: '发光' },
            ] },
            { id: 'pl', label: 'pl', sound: '/pl/', words: [
              { w: '[pl]ane', e: '✈️', zh: '飞机' },
              { w: '[pl]ant', e: '🌱', zh: '植物' },
              { w: '[pl]ate', e: '🍽️', zh: '盘子' },
              { w: '[pl]ug', e: '🔌', zh: '插头' },
            ] },
            { id: 'sl', label: 'sl', sound: '/sl/', words: [
              { w: '[sl]ed', e: '🛷', zh: '雪橇' },
              { w: '[sl]eep', e: '😴', zh: '睡觉' },
              { w: '[sl]ow', e: '🐢', zh: '慢' },
              { w: '[sl]ice', e: '🍕', zh: '一片' },
            ] },
          ],
        },
        {
          id: 'r-blends', title: 'R blends', zh: 'R 开头组合', icon: '🦀', sound: null, say: null,
          tip: 'r 要把舌头卷一卷，和前面的字母手拉手：br cr dr fr gr tr。',
          patterns: [
            { id: 'br', label: 'br', sound: '/br/', words: [
              { w: '[br]ead', e: '🍞', zh: '面包' },
              { w: '[br]ush', e: '🖌️', zh: '刷子' },
              { w: '[br]idge', e: '🌉', zh: '桥' },
              { w: '[br]oom', e: '🧹', zh: '扫帚' },
            ] },
            { id: 'cr', label: 'cr', sound: '/kr/', words: [
              { w: '[cr]ab', e: '🦀', zh: '螃蟹' },
              { w: '[cr]own', e: '👑', zh: '皇冠' },
              { w: '[cr]ayon', e: '🖍️', zh: '蜡笔' },
              { w: '[cr]ocodile', e: '🐊', zh: '鳄鱼' },
            ] },
            { id: 'dr', label: 'dr', sound: '/dr/', words: [
              { w: '[dr]um', e: '🥁', zh: '鼓' },
              { w: '[dr]ess', e: '👗', zh: '连衣裙' },
              { w: '[dr]ink', e: '🥤', zh: '喝' },
              { w: '[dr]agon', e: '🐉', zh: '龙' },
            ] },
            { id: 'fr', label: 'fr', sound: '/fr/', words: [
              { w: '[fr]og', e: '🐸', zh: '青蛙' },
              { w: '[fr]ies', e: '🍟', zh: '薯条' },
              { w: '[fr]iend', e: '👫', zh: '朋友' },
              { w: '[fr]uit', e: '🍓', zh: '水果' },
            ] },
            { id: 'gr', label: 'gr', sound: '/gr/', words: [
              { w: '[gr]apes', e: '🍇', zh: '葡萄' },
              { w: '[gr]een', e: '🟢', zh: '绿色' },
              { w: '[gr]ass', e: '🌱', zh: '草' },
              { w: '[gr]andma', e: '👵', zh: '奶奶' },
            ] },
            { id: 'tr', label: 'tr', sound: '/tr/', words: [
              { w: '[tr]ee', e: '🌳', zh: '树' },
              { w: '[tr]uck', e: '🚚', zh: '卡车' },
              { w: '[tr]ain', e: '🚂', zh: '火车' },
              { w: '[tr]ash', e: '🗑️', zh: '垃圾' },
            ] },
          ],
        },
        {
          id: 's-blends', title: 'S blends', zh: 'S 开头组合', icon: '🕷️', sound: null, say: null,
          tip: 's 在前面像小蛇领路：sn sp st sw sk sm，后面的声音紧紧跟上。',
          patterns: [
            { id: 'sn', label: 'sn', sound: '/sn/', words: [
              { w: '[sn]ake', e: '🐍', zh: '蛇' },
              { w: '[sn]ail', e: '🐌', zh: '蜗牛' },
              { w: '[sn]ow', e: '❄️', zh: '雪' },
              { w: '[sn]ack', e: '🍿', zh: '零食' },
            ] },
            { id: 'sp', label: 'sp', sound: '/sp/', words: [
              { w: '[sp]oon', e: '🥄', zh: '勺子' },
              { w: '[sp]ider', e: '🕷️', zh: '蜘蛛' },
              { w: '[sp]ace', e: '🚀', zh: '太空' },
              { w: '[sp]in', e: '🌀', zh: '旋转' },
            ] },
            { id: 'st', label: 'st', sound: '/st/', words: [
              { w: '[st]ar', e: '⭐', zh: '星星' },
              { w: '[st]op', e: '🛑', zh: '停' },
              { w: '[st]eak', e: '🥩', zh: '牛排' },
              { w: '[st]ory', e: '📖', zh: '故事' },
            ] },
            { id: 'sw', label: 'sw', sound: '/sw/', words: [
              { w: '[sw]an', e: '🦢', zh: '天鹅' },
              { w: '[sw]im', e: '🏊', zh: '游泳' },
              { w: '[sw]eet', e: '🍬', zh: '甜的' },
              { w: '[sw]eater', e: '🧥', zh: '毛衣' },
            ] },
            { id: 'sk', label: 'sk', sound: '/sk/', words: [
              { w: '[sk]ate', e: '⛸️', zh: '溜冰' },
              { w: '[sk]irt', e: '👗', zh: '裙子' },
              { w: '[sk]y', e: '🌤️', zh: '天空' },
              { w: '[sk]i', e: '🎿', zh: '滑雪' },
            ] },
            { id: 'sm', label: 'sm', sound: '/sm/', words: [
              { w: '[sm]ile', e: '😊', zh: '微笑' },
              { w: '[sm]ell', e: '👃', zh: '闻' },
              { w: '[sm]oke', e: '💨', zh: '烟' },
              { w: '[sm]all', e: '🤏', zh: '小的' },
            ] },
          ],
        },
        {
          id: 'end-blends', title: 'End blends', zh: '结尾组合', icon: '🏖️', sound: null, say: null,
          tip: '有些组合住在单词的结尾：hand, lamp, tent, list，两个声音要一起收尾。',
          patterns: [
            { id: 'nd', label: '-nd', sound: '/nd/', words: [
              { w: 'ha[nd]', e: '✋', zh: '手' },
              { w: 'sa[nd]', e: '🏖️', zh: '沙子' },
              { w: 'frie[nd]', e: '👫', zh: '朋友' },
              { w: 'ba[nd]', e: '🎸', zh: '乐队' },
            ] },
            { id: 'mp', label: '-mp', sound: '/mp/', words: [
              { w: 'la[mp]', e: '💡', zh: '台灯' },
              { w: 'ca[mp]', e: '🏕️', zh: '露营' },
              { w: 'ju[mp]', e: '🦘', zh: '跳' },
              { w: 'chi[mp]', e: '🐒', zh: '黑猩猩' },
            ] },
            { id: 'nt', label: '-nt', sound: '/nt/', words: [
              { w: 'te[nt]', e: '⛺', zh: '帐篷' },
              { w: 'a[nt]', e: '🐜', zh: '蚂蚁' },
              { w: 'pai[nt]', e: '🎨', zh: '颜料' },
              { w: 'mi[nt]', e: '🌿', zh: '薄荷' },
            ] },
            { id: 'st', label: '-st', sound: '/st/', words: [
              { w: 'li[st]', e: '📝', zh: '清单' },
              { w: 've[st]', e: '🦺', zh: '背心' },
              { w: 'fi[st]', e: '✊', zh: '拳头' },
              { w: 'be[st]', e: '🥇', zh: '最好的' },
            ] },
          ],
        },
      ],
    },
    {
      id: 'vowel-teams', no: 5, title: 'Vowel Teams', zh: '长元音家族', icon: '🌈', color: '#4C8DFF',
      desc: '两个元音（或元音加字母）抱成团，一起发出长长的声音。这是自然拼读最重要的一关！',
      families: [
        {
          id: 'long-a', title: 'Long a', zh: '长 a', icon: '🎂', sound: '/eɪ/', say: 'ay',
          tip: 'a 喊出自己的名字“诶”！a_e、ai、ay、eigh 都是同一个声音。',
          patterns: [
            { id: 'a_e', label: 'a_e', words: [
              { w: 'c[a]k[e]', e: '🎂', zh: '蛋糕' },
              { w: 'sn[a]k[e]', e: '🐍', zh: '蛇' },
              { w: 'gr[a]p[e]s', e: '🍇', zh: '葡萄' },
              { w: 'f[a]c[e]', e: '😀', zh: '脸' },
            ] },
            { id: 'ai', label: 'ai', words: [
              { w: 'r[ai]n', e: '🌧️', zh: '雨' },
              { w: 'tr[ai]n', e: '🚂', zh: '火车' },
              { w: 'sn[ai]l', e: '🐌', zh: '蜗牛' },
              { w: 'br[ai]n', e: '🧠', zh: '大脑' },
            ] },
            { id: 'ay', label: 'ay', words: [
              { w: 'd[ay]', e: '🌞', zh: '白天' },
              { w: 'pl[ay]', e: '🎮', zh: '玩' },
              { w: 'h[ay]', e: '🌾', zh: '干草' },
              { w: 'p[ay]', e: '💰', zh: '付钱' },
            ] },
            { id: 'eigh', label: 'eigh', words: [
              { w: '[eigh]t', e: '8️⃣', zh: '八' },
              { w: 'sl[eigh]', e: '🛷', zh: '雪橇' },
              { w: 'w[eigh]', e: '⚖️', zh: '称重' },
              { w: 'n[eigh]', e: '🐴', zh: '马嘶声' },
            ] },
          ],
        },
        {
          id: 'long-e', title: 'Long e', zh: '长 e', icon: '🐝', sound: '/iː/', say: 'ee',
          tip: '像笑着说“衣——”。ee 和 ea 最常见，最后几个是少见的小伙伴。',
          patterns: [
            { id: 'ee', label: 'ee', words: [
              { w: 'b[ee]', e: '🐝', zh: '蜜蜂' },
              { w: 'tr[ee]', e: '🌳', zh: '树' },
              { w: 'sh[ee]p', e: '🐑', zh: '绵羊' },
              { w: 'f[ee]t', e: '🦶', zh: '脚' },
            ] },
            { id: 'ea', label: 'ea', words: [
              { w: 'l[ea]f', e: '🍃', zh: '叶子' },
              { w: 'p[ea]ch', e: '🍑', zh: '桃子' },
              { w: 's[ea]', e: '🌊', zh: '大海' },
              { w: 't[ea]', e: '🍵', zh: '茶' },
            ] },
            { id: 'e_e', label: 'e_e', words: [
              { w: 'th[e]s[e]', e: '👇', zh: '这些' },
              { w: 'sc[e]n[e]', e: '🎬', zh: '场景' },
              { w: 'Chin[e]s[e]', e: '🀄', zh: '中文' },
              { w: 'P[e]t[e]', e: '👦', zh: '皮特' },
            ] },
            { id: 'ey', label: 'ey', words: [
              { w: 'k[ey]', e: '🔑', zh: '钥匙' },
              { w: 'monk[ey]', e: '🐵', zh: '猴子' },
              { w: 'hon[ey]', e: '🍯', zh: '蜂蜜' },
              { w: 'turk[ey]', e: '🦃', zh: '火鸡' },
            ] },
            { id: 'y', label: 'y', words: [
              { w: 'happ[y]', e: '😊', zh: '开心' },
              { w: 'bab[y]', e: '👶', zh: '宝宝' },
              { w: 'bunn[y]', e: '🐰', zh: '小兔子' },
              { w: 'cand[y]', e: '🍬', zh: '糖果' },
            ] },
            { id: 'ie', label: 'ie', words: [
              { w: 'cook[ie]', e: '🍪', zh: '饼干' },
              { w: 'f[ie]ld', e: '🌾', zh: '田野' },
              { w: 'sh[ie]ld', e: '🛡️', zh: '盾牌' },
              { w: 'p[ie]ce', e: '🧩', zh: '一块' },
            ] },
          ],
        },
        {
          id: 'long-i', title: 'Long i', zh: '长 i', icon: '🪁', sound: '/aɪ/', say: 'eye',
          tip: 'i 喊出自己的名字“爱”！i_e、igh、ie、y 都读 /aɪ/。',
          patterns: [
            { id: 'i_e', label: 'i_e', words: [
              { w: 'k[i]t[e]', e: '🪁', zh: '风筝' },
              { w: 'b[i]k[e]', e: '🚲', zh: '自行车' },
              { w: 'm[i]c[e]', e: '🐭', zh: '老鼠们' },
              { w: 'sm[i]l[e]', e: '😊', zh: '微笑' },
            ] },
            { id: 'igh', label: 'igh', words: [
              { w: 'l[igh]t', e: '💡', zh: '灯' },
              { w: 'n[igh]t', e: '🌙', zh: '夜晚' },
              { w: 'f[igh]t', e: '🥊', zh: '打架' },
              { w: 'r[igh]t', e: '✅', zh: '对的' },
            ] },
            { id: 'ie', label: 'ie', words: [
              { w: 'p[ie]', e: '🥧', zh: '派' },
              { w: 't[ie]', e: '👔', zh: '领带' },
              { w: 'fr[ie]s', e: '🍟', zh: '薯条' },
              { w: 'cr[ie]d', e: '😭', zh: '哭了' },
            ] },
            { id: 'y', label: 'y', words: [
              { w: 'fl[y]', e: '🪰', zh: '苍蝇' },
              { w: 'cr[y]', e: '😢', zh: '哭' },
              { w: 'sk[y]', e: '🌤️', zh: '天空' },
              { w: 'sp[y]', e: '🕵️', zh: '间谍' },
            ] },
          ],
        },
        {
          id: 'long-o', title: 'Long o', zh: '长 o', icon: '🏠', sound: '/əʊ/', say: 'oh',
          tip: 'o 喊出自己的名字“欧”！嘴巴圆圆的。',
          patterns: [
            { id: 'o_e', label: 'o_e', words: [
              { w: 'h[o]m[e]', e: '🏠', zh: '家' },
              { w: 'c[o]n[e]', e: '🍦', zh: '冰淇淋筒' },
              { w: 'b[o]n[e]', e: '🦴', zh: '骨头' },
              { w: 'r[o]s[e]', e: '🌹', zh: '玫瑰' },
            ] },
            { id: 'oa', label: 'oa', words: [
              { w: 'b[oa]t', e: '⛵', zh: '小船' },
              { w: 'c[oa]t', e: '🧥', zh: '外套' },
              { w: 'g[oa]t', e: '🐐', zh: '山羊' },
              { w: 's[oa]p', e: '🧼', zh: '肥皂' },
            ] },
            { id: 'ow', label: 'ow', words: [
              { w: 'sn[ow]', e: '❄️', zh: '雪' },
              { w: 'yell[ow]', e: '💛', zh: '黄色' },
              { w: 'rainb[ow]', e: '🌈', zh: '彩虹' },
              { w: 'sl[ow]', e: '🐢', zh: '慢' },
            ] },
            { id: 'oe', label: 'oe', words: [
              { w: 't[oe]', e: '🦶', zh: '脚趾' },
              { w: 'd[oe]', e: '🦌', zh: '母鹿' },
              { w: 'tomat[oe]s', e: '🍅', zh: '西红柿' },
              { w: 'potat[oe]s', e: '🥔', zh: '土豆' },
            ] },
          ],
        },
        {
          id: 'long-u', title: 'Long u', zh: '长 u', icon: '🧊', sound: '/uː/ /juː/', say: 'oo',
          tip: 'u 喊出自己的名字“优”，有时像“呜”。',
          patterns: [
            { id: 'u_e', label: 'u_e', words: [
              { w: 'c[u]b[e]', e: '🧊', zh: '方块' },
              { w: 'c[u]t[e]', e: '🥰', zh: '可爱的' },
              { w: 'r[u]l[e]', e: '📏', zh: '规则' },
              { w: 't[u]n[e]', e: '🎵', zh: '曲调' },
            ] },
            { id: 'ue', label: 'ue', words: [
              { w: 'bl[ue]', e: '🔵', zh: '蓝色' },
              { w: 'gl[ue]', e: '🧴', zh: '胶水' },
              { w: 'cl[ue]', e: '🔍', zh: '线索' },
              { w: 'tr[ue]', e: '✅', zh: '真的' },
            ] },
            { id: 'ew', label: 'ew', words: [
              { w: 'n[ew]', e: '🆕', zh: '新的' },
              { w: 'scr[ew]', e: '🔩', zh: '螺丝' },
              { w: 'st[ew]', e: '🍲', zh: '炖菜' },
              { w: 'fl[ew]', e: '🕊️', zh: '飞了' },
            ] },
            { id: 'ui', label: 'ui', words: [
              { w: 'fr[ui]t', e: '🍓', zh: '水果' },
              { w: 'j[ui]ce', e: '🧃', zh: '果汁' },
              { w: 's[ui]t', e: '🤵', zh: '西装' },
              { w: 'cr[ui]se', e: '🚢', zh: '游轮' },
            ] },
          ],
        },
        {
          id: 'oo', title: 'oo', zh: 'oo 的两种声音', icon: '🌙', sound: null, say: null,
          tip: 'oo 有长短两个声音：moon 嘴巴嘟起拉长，book 嘴巴放松变短。',
          patterns: [
            { id: 'oo-long', label: 'oo', sound: '/uː/', say: 'oo', words: [
              { w: 'm[oo]n', e: '🌙', zh: '月亮' },
              { w: 'sp[oo]n', e: '🥄', zh: '勺子' },
              { w: 'b[oo]t', e: '🥾', zh: '靴子' },
              { w: 't[oo]th', e: '🦷', zh: '牙齿' },
            ] },
            { id: 'oo-short', label: 'oo', sound: '/ʊ/', words: [
              { w: 'b[oo]k', e: '📖', zh: '书' },
              { w: 'f[oo]t', e: '🦶', zh: '脚' },
              { w: 'c[oo]k', e: '👩‍🍳', zh: '做饭' },
              { w: 'l[oo]k', e: '👀', zh: '看' },
            ] },
          ],
        },
        {
          id: 'ow-ou', title: 'ow / ou', zh: 'ow ou 哎哟声', icon: '🐮', sound: '/aʊ/', say: 'ow',
          tip: '被针扎到会喊“哎哟 ow！”——ou 和 ow 都是这个声音。',
          patterns: [
            { id: 'ou', label: 'ou', words: [
              { w: 'h[ou]se', e: '🏠', zh: '房子' },
              { w: 'm[ou]se', e: '🐭', zh: '老鼠' },
              { w: 'cl[ou]d', e: '☁️', zh: '云' },
              { w: 'm[ou]th', e: '👄', zh: '嘴巴' },
            ] },
            { id: 'ow', label: 'ow', words: [
              { w: 'c[ow]', e: '🐮', zh: '奶牛' },
              { w: '[ow]l', e: '🦉', zh: '猫头鹰' },
              { w: 'cl[ow]n', e: '🤡', zh: '小丑' },
              { w: 'cr[ow]n', e: '👑', zh: '皇冠' },
            ] },
          ],
        },
        {
          id: 'oi-oy', title: 'oi / oy', zh: 'oi oy 声音', icon: '🧸', sound: '/ɔɪ/', say: 'oy',
          tip: 'oi 住在单词中间，oy 住在单词结尾，声音一样“噢咿”。',
          patterns: [
            { id: 'oi', label: 'oi', words: [
              { w: 'c[oi]n', e: '🪙', zh: '硬币' },
              { w: '[oi]l', e: '🛢️', zh: '油' },
              { w: 'p[oi]nt', e: '👉', zh: '指' },
              { w: 'n[oi]se', e: '🔊', zh: '噪音' },
            ] },
            { id: 'oy', label: 'oy', words: [
              { w: 'b[oy]', e: '👦', zh: '男孩' },
              { w: 't[oy]', e: '🧸', zh: '玩具' },
              { w: 'j[oy]', e: '😄', zh: '快乐' },
              { w: 'cowb[oy]', e: '🤠', zh: '牛仔' },
            ] },
          ],
        },
        {
          id: 'aw-au', title: 'aw / au / al', zh: 'aw au al 声音', icon: '🪚', sound: '/ɔː/', say: 'aw',
          tip: 'aw 在词尾，au 在词中，al 在 ball 里，它们都读“奥”。',
          patterns: [
            { id: 'aw', label: 'aw', words: [
              { w: 'p[aw]', e: '🐾', zh: '爪子' },
              { w: 's[aw]', e: '🪚', zh: '锯子' },
              { w: 'str[aw]', e: '🥤', zh: '吸管' },
              { w: 'y[aw]n', e: '🥱', zh: '打哈欠' },
            ] },
            { id: 'au', label: 'au', words: [
              { w: 's[au]sage', e: '🌭', zh: '香肠' },
              { w: '[au]tumn', e: '🍂', zh: '秋天' },
              { w: 's[au]cer', e: '🛸', zh: '飞碟' },
              { w: 'l[au]nch', e: '🚀', zh: '发射' },
            ] },
            { id: 'al', label: 'al', words: [
              { w: 'b[al]l', e: '⚽', zh: '球' },
              { w: 'w[al]l', e: '🧱', zh: '墙' },
              { w: 't[al]l', e: '🦒', zh: '高的' },
              { w: 's[al]t', e: '🧂', zh: '盐' },
            ] },
          ],
        },
      ],
    },
    {
      id: 'r-controlled', no: 6, title: 'R-Controlled Vowels', zh: 'R 控制元音', icon: '🚗', color: '#E8556D',
      desc: 'r 是霸道的“小霸王”，它一来，前面的元音就要改变声音。',
      families: [
        {
          id: 'ar', title: 'ar', zh: 'ar 声音', icon: '🚗', sound: '/ɑː/', say: 'are',
          tip: '张大嘴巴“啊——”，像医生检查喉咙：car, star！',
          patterns: [
            { id: 'ar', label: 'ar', words: [
              { w: 'c[ar]', e: '🚗', zh: '汽车' },
              { w: 'st[ar]', e: '⭐', zh: '星星' },
              { w: 'sh[ar]k', e: '🦈', zh: '鲨鱼' },
              { w: 'sc[ar]f', e: '🧣', zh: '围巾' },
            ] },
          ],
        },
        {
          id: 'or', title: 'or', zh: 'or 声音', icon: '🍴', sound: '/ɔː/', say: 'or',
          tip: 'or、ore、oar、our 拼法不同，声音相同：“奥”。',
          patterns: [
            { id: 'or', label: 'or', words: [
              { w: 'f[or]k', e: '🍴', zh: '叉子' },
              { w: 'h[or]se', e: '🐴', zh: '马' },
              { w: 'c[or]n', e: '🌽', zh: '玉米' },
              { w: 'st[or]m', e: '⛈️', zh: '暴风雨' },
            ] },
            { id: 'ore', label: 'ore', words: [
              { w: 'st[ore]', e: '🏪', zh: '商店' },
              { w: 'sh[ore]', e: '🏖️', zh: '海岸' },
              { w: 'sn[ore]', e: '😴', zh: '打呼噜' },
              { w: 'm[ore]', e: '➕', zh: '更多' },
            ] },
            { id: 'oar', label: 'oar', words: [
              { w: 'r[oar]', e: '🦁', zh: '吼叫' },
              { w: 'b[oar]', e: '🐗', zh: '野猪' },
              { w: 's[oar]', e: '🦅', zh: '翱翔' },
              { w: '[oar]', e: '🚣', zh: '桨' },
            ] },
            { id: 'our', label: 'our', words: [
              { w: 'f[our]', e: '4️⃣', zh: '四' },
              { w: 'c[our]t', e: '🏀', zh: '球场' },
              { w: 'p[our]', e: '🥛', zh: '倒' },
              { w: 'f[our]teen', e: '🔢', zh: '十四' },
            ] },
          ],
        },
        {
          id: 'er', title: 'er ir ur ear', zh: 'er ir ur 声音', icon: '🐦', sound: '/ɜː/', say: 'err',
          tip: 'er、ir、ur、ear 是四个长得不一样的“四胞胎”，都读“呃儿”。',
          patterns: [
            { id: 'er', label: 'er', words: [
              { w: 'h[er]', e: '👩', zh: '她' },
              { w: 'f[er]n', e: '🌿', zh: '蕨' },
              { w: 'h[er]d', e: '🐄', zh: '牛群' },
              { w: 'g[er]m', e: '🦠', zh: '细菌' },
            ] },
            { id: 'ir', label: 'ir', words: [
              { w: 'g[ir]l', e: '👧', zh: '女孩' },
              { w: 'b[ir]d', e: '🐦', zh: '鸟' },
              { w: 'sh[ir]t', e: '👕', zh: '衬衫' },
              { w: 'th[ir]d', e: '🥉', zh: '第三' },
            ] },
            { id: 'ur', label: 'ur', words: [
              { w: 't[ur]tle', e: '🐢', zh: '乌龟' },
              { w: 'p[ur]ple', e: '🟣', zh: '紫色' },
              { w: 'ch[ur]ch', e: '⛪', zh: '教堂' },
              { w: 'n[ur]se', e: '👩‍⚕️', zh: '护士' },
            ] },
            { id: 'ear', label: 'ear', words: [
              { w: '[ear]th', e: '🌍', zh: '地球' },
              { w: 'l[ear]n', e: '📚', zh: '学习' },
              { w: 's[ear]ch', e: '🔍', zh: '搜索' },
              { w: 'p[ear]l', e: '🦪', zh: '珍珠' },
            ] },
          ],
        },
        {
          id: 'air', title: 'air', zh: 'air 声音', icon: '🧚', sound: '/eə/', say: 'air',
          tip: '像说“诶儿”。air、are、ear、ere 都读这个声音。',
          patterns: [
            { id: 'air', label: 'air', words: [
              { w: 'ch[air]', e: '🪑', zh: '椅子' },
              { w: 'h[air]', e: '💇', zh: '头发' },
              { w: 'f[air]y', e: '🧚', zh: '仙女' },
              { w: 'st[air]s', e: '🪜', zh: '楼梯' },
            ] },
            { id: 'are', label: 'are', words: [
              { w: 'squ[are]', e: '🟦', zh: '正方形' },
              { w: 'sh[are]', e: '🤝', zh: '分享' },
              { w: 'sc[are]', e: '😱', zh: '吓' },
              { w: 'c[are]', e: '🤗', zh: '关心' },
            ] },
            { id: 'ear', label: 'ear', words: [
              { w: 'b[ear]', e: '🐻', zh: '熊' },
              { w: 'p[ear]', e: '🍐', zh: '梨' },
              { w: 'underw[ear]', e: '🩲', zh: '内裤' },
            ] },
            { id: 'ere', label: 'ere', words: [
              { w: 'wh[ere]', e: '❓', zh: '哪里' },
              { w: 'th[ere]', e: '👉', zh: '那里' },
              { w: 'everywh[ere]', e: '🌍', zh: '到处' },
            ] },
          ],
        },
        {
          id: 'ear', title: 'ear eer ere', zh: 'ear 声音', icon: '👂', sound: '/ɪə/', say: 'ear',
          tip: '像说“衣儿”。ear、eer、ere 都读这个声音。',
          patterns: [
            { id: 'ear', label: 'ear', words: [
              { w: '[ear]', e: '👂', zh: '耳朵' },
              { w: 'y[ear]', e: '📅', zh: '年' },
              { w: 'f[ear]', e: '😨', zh: '害怕' },
              { w: 'b[ear]d', e: '🧔', zh: '胡子' },
            ] },
            { id: 'eer', label: 'eer', words: [
              { w: 'd[eer]', e: '🦌', zh: '鹿' },
              { w: 'ch[eer]', e: '📣', zh: '欢呼' },
              { w: 'engin[eer]', e: '👷', zh: '工程师' },
            ] },
            { id: 'ere', label: 'ere', words: [
              { w: 'h[ere]', e: '📍', zh: '这里' },
              { w: 'sph[ere]', e: '🔮', zh: '球体' },
            ] },
          ],
        },
      ],
    },
    {
      id: 'tricky', no: 7, title: 'Tricky Spellings', zh: '特殊拼读', icon: '🕵️', color: '#5BA13A',
      desc: '有些字母会变声音、会“隐身”。学会这些小秘密，拼写就更厉害了！',
      families: [
        {
          id: 'soft-c', title: 'Soft c', zh: '软 c', icon: '🧊', sound: '/s/', say: null,
          tip: 'c 后面跟 e、i、y，就变成 s 的声音，像变身了！',
          patterns: [
            { id: 'ce', label: 'ce', words: [
              { w: 'i[ce]', e: '🧊', zh: '冰' },
              { w: 'mi[ce]', e: '🐭', zh: '老鼠们' },
              { w: 'ri[ce]', e: '🍚', zh: '米饭' },
              { w: 'di[ce]', e: '🎲', zh: '骰子' },
            ] },
            { id: 'ci', label: 'ci', words: [
              { w: '[ci]rcle', e: '⭕', zh: '圆' },
              { w: '[ci]ty', e: '🏙️', zh: '城市' },
              { w: '[ci]rcus', e: '🎪', zh: '马戏团' },
              { w: 'pen[ci]l', e: '✏️', zh: '铅笔' },
            ] },
            { id: 'cy', label: 'cy', words: [
              { w: '[cy]cle', e: '🚴', zh: '骑车' },
              { w: 'spi[cy]', e: '🌶️', zh: '辣的' },
              { w: 'jui[cy]', e: '🍊', zh: '多汁的' },
              { w: 'fan[cy]', e: '💎', zh: '华丽的' },
            ] },
          ],
        },
        {
          id: 'soft-g', title: 'Soft g', zh: '软 g', icon: '🦒', sound: '/dʒ/', say: null,
          tip: 'g 后面跟 e、i，常常变成 j 的声音；dge 也是 j。',
          patterns: [
            { id: 'ge', label: 'ge', words: [
              { w: '[ge]m', e: '💎', zh: '宝石' },
              { w: 'pa[ge]', e: '📄', zh: '页' },
              { w: 'oran[ge]', e: '🍊', zh: '橙子' },
              { w: 'hu[ge]', e: '🐘', zh: '巨大的' },
            ] },
            { id: 'gi', label: 'gi', words: [
              { w: '[gi]raffe', e: '🦒', zh: '长颈鹿' },
              { w: 'ma[gi]c', e: '🪄', zh: '魔法' },
              { w: 'en[gi]ne', e: '🚂', zh: '发动机' },
              { w: '[gi]ngerbread', e: '🍪', zh: '姜饼' },
            ] },
            { id: 'dge', label: 'dge', words: [
              { w: 'bri[dge]', e: '🌉', zh: '桥' },
              { w: 'fri[dge]', e: '🧊', zh: '冰箱' },
              { w: 'ba[dge]', e: '🏅', zh: '徽章' },
              { w: 'fu[dge]', e: '🍫', zh: '软糖' },
            ] },
          ],
        },
        {
          id: 'silent', title: 'Silent letters', zh: '哑音字母', icon: '🤫', sound: null, say: null,
          tip: '有的字母会“躲起来”不出声：knee 里的 k、write 里的 w、lamb 里的 b。',
          patterns: [
            { id: 'kn', label: 'kn', sound: '/n/', words: [
              { w: '[kn]ee', e: '🦵', zh: '膝盖' },
              { w: '[kn]ife', e: '🔪', zh: '刀' },
              { w: '[kn]ot', e: '🪢', zh: '结' },
              { w: '[kn]ock', e: '🚪', zh: '敲' },
            ] },
            { id: 'wr', label: 'wr', sound: '/r/', words: [
              { w: '[wr]ite', e: '✍️', zh: '写' },
              { w: '[wr]ap', e: '🎁', zh: '包裹' },
              { w: '[wr]ist', e: '⌚', zh: '手腕' },
              { w: '[wr]ong', e: '❌', zh: '错的' },
            ] },
            { id: 'mb', label: 'mb', sound: '/m/', words: [
              { w: 'la[mb]', e: '🐑', zh: '小羊' },
              { w: 'thu[mb]', e: '👍', zh: '拇指' },
              { w: 'cli[mb]', e: '🧗', zh: '爬' },
              { w: 'cru[mb]', e: '🍞', zh: '面包屑' },
            ] },
          ],
        },
        {
          id: 'le-ending', title: '-le ending', zh: '-le 结尾', icon: '🍎', sound: '/əl/', say: null,
          tip: '单词结尾的 -le 读轻轻的“欧”：apple, candle，别漏掉它哦。',
          patterns: [
            { id: 'le', label: '-le', words: [
              { w: 'app[le]', e: '🍎', zh: '苹果' },
              { w: 'cand[le]', e: '🕯️', zh: '蜡烛' },
              { w: 'turt[le]', e: '🐢', zh: '乌龟' },
              { w: 'puzz[le]', e: '🧩', zh: '拼图' },
            ] },
          ],
        },
      ],
    },
  ],
};
