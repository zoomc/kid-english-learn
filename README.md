# 🦉 宝贝英语乐园 · Kid English

给 **5–7 岁** 孩子的英语启蒙小网站。纯静态页面，打开就能用，不用注册。

在线体验：https://kid-english-learn.cmjfire.workers.dev

## 第一期：自然拼读 Phonics

学习路线参考 Oxford Phonics World、Jolly Phonics、英国 Letters and Sounds 的进阶顺序，按「关卡 → 拼读家族 → 组合 → 代表单词」组织：

| 关卡 | 内容 | 例子 |
| --- | --- | --- |
| 1 字母发音 | 26 个字母的基本音 | s a t p i n … |
| 2 短元音 | 单词家族 | -at -an -ig -op -ug |
| 3 魔法 e | 不发音的 e 让元音读字母名 | a_e i_e o_e u_e |
| 4 辅音组合 | 双辅音字母、辅音连缀 | sh ch th, bl cl, st sp |
| 5 长元音家族 | 同一个音的多种拼法 | Long e：ee ea e_e ey y ie |
| 6 R 控制元音 | bossy r | ar, or ore oar, er ir ur |
| 7 特殊拼读 | 软 c/g、不发音字母、-le | ce ci, ge dge, kn wr mb |

每个家族里有三种玩法：

- 📖 **学一学**：每种拼法配 4 个代表单词（卡通图 + 粉色高亮），点卡片听发音；「拼一拼」把字母块一个个点亮再合起来读；可以慢速。
- 👂 **听音选图**：听单词，从三张图里选出来。
- 🧩 **选拼写**：看图听音，选出正确的拼法（比如 tr__ 是 ee 还是 ea？）。

学习进度（读过的单词、游戏最好成绩、连续学习天数、贴纸）自动保存在当前设备的浏览器里。

## 发音

用浏览器自带的英语语音（Web Speech API），可以在设置里切换美式/英式和语速。iPhone / iPad 用 Safari、电脑用 Chrome 或 Edge 效果最好。

## 本地运行

```bash
python3 -m http.server 5178 --directory public
```

然后打开 http://localhost:5178 。

## 部署（Cloudflare Workers 静态资源，免费额度内）

```bash
npm install
npx wrangler login   # 只需一次
scripts/deploy.sh
```

也可以在 GitHub Actions 里手动运行 `Deploy to Cloudflare`（需要仓库 Secrets：`CLOUDFLARE_API_TOKEN`、`CLOUDFLARE_ACCOUNT_ID`）。

## 目录

```
public/
  index.html            首页
  phonics/index.html    自然拼读目录
  phonics/family.html   拼读家族学习页（?f=long-e）
  js/phonics-data.js    课程数据：关卡、家族、组合、单词
  js/common.js          发音、音效、进度、吉祥物、撒花
  css/style.css
```

想加单词或家族，只需要改 `public/js/phonics-data.js`：单词里用方括号标出发这个音的字母，比如 `tr[ee]`、`c[a]k[e]`。

## License

MIT
