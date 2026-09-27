# AGENTS.md — Beijing-Gourmet-site

面向所有在这个仓库干活的人与 AI（Hermes、ChatGPT、Meta AI …）。动手前先读这份。

## 这是什么
北京美食自助餐厅官网（8228 E 61st St, Tulsa, OK）：5 个纯静态页面 ——
`index.html` / `prices.html` / `location.html` / `faq.html` / `contact.html`。
线上：https://yanbing2026.github.io/Beijing-Gourmet-site/

## 构建
**没有构建步骤**：plain HTML + `style.css` + vanilla `script.js`。无 package.json、无打包器、无生成器。
不要引入框架。
本地预览：`python3 -m http.server 8000`
配色/字体 = `style.css` 顶部 `:root` 的 CSS 变量。

## 测试
没有任何自动化测试。改完自己在浏览器里点一遍：导航、轮播、contact 表单、地图链接。

## 发布
GitHub Pages，source = `main` / 根目录（legacy），另外 `.github/workflows/deploy.yml` 也会部署。
**合并到 `main` 约 1 分钟就上线。**
已知小毛病：legacy branch build 与 workflow 同时开着，一次 push 可能跑两次相同部署；仓库没有 `.nojekyll`。

## 没有生成文件，但有两样是手工维护的
- `og-image.jpg`：用 ffmpeg 做的 1200×630 分享图 —— **电话/地址/标语变了要重做**，否则分享卡片是旧的。
- `sitemap.xml`：手工维护；加/删页面要同步。
- 换轮播图后同步改 `index.html` 里的 `alt` 与 caption（读屏和 Google Images 都靠它）。

## 流程（main 已保护）
1. 开分支 → 提交 → 开 PR。**不要直接推 `main`**（已禁止直推/强推/删分支，对管理员同样生效）——直推就是直接改线上。
2. PR 里写清改了什么 + 你手点验证过哪些页面。
3. 仓库里不放任何密钥（`contact` 表单若有第三方 key，一律走外部配置，不进 git）。
