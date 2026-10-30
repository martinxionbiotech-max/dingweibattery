# Markdown 内容协商实施报告

- **站点**：Dingwei Battery（dingweibattery.com · Astro · Cloudflare Pages）
- **实施批**：HTTP Markdown content negotiation（`Accept: text/markdown`，同 URL 返回 HTML/MD）
- **日期**：2026-10-30
- **状态**：本地完成，**未部署生产 / 未做生产测试**（如实声明，见 §14）

> **Git 前提纠正**：任务描述称「本地领先 origin 3 个提交」。`git fetch` 后实测相反——本地 `HEAD` 落后 `origin/main` **3 个提交**（`git rev-list --left-right --count HEAD...origin/main` = `0 3`，即 0 个本地独有、3 个远端独有），工作区干净。本批先 `git merge --ff-only origin/main` 快进到 `ee58d14`，在其上实施并提交推送。那 3 个提交（`d2828d2`、`0b89d0e`、`ee58d14`）**本就在 origin 上已推送**，无需「一并推送」——已保留在历史中，零本地工作丢失。

---

## 1. 项目架构（发现）

- **框架**：Astro `5.7.0`，纯静态输出（`output: 'static'`），`build.format: 'directory'`。
- **尾斜杠策略**：`trailingSlash: 'always'`——所有页面 URL 以 `/` 结尾，路由为目录索引（`dist/a/b/index.html` → `/a/b/`）。
- **多语言**：`i18n` 5 个 locale——`en`（默认，**无前缀**）、`es`、`ar`、`ru`、`zh`（`prefixDefaultLocale: false`）。语言路由为**目录前缀**（`/es/`、`/ar/`、`/ru/`、`/zh/`），无子域名、无查询串语言参数。
- **站点域名**：`site: 'https://dingweibattery.com'`。
- **运行环境**：Node `v24.20.0`，npm `11.19.0`。
- **部署目标**：Cloudflare Pages（无 `wrangler.toml`、无 `.github/workflows`；推断为 CF Pages 面板直连 GitHub：`npm run build` + 输出目录 `dist`）。
- **现有请求拦截**：`functions/` 目录**不存在**，无 `_middleware.js`、无 `_worker.js`、无高级模式 Worker。→ 本批为**新建** Pages Functions（非扩展）。
- **既有 AI readiness 层（本批共存、不覆盖）**：
  - `scripts/generate-markdown.mjs`——构建期把 sitemap 页面的 `<main>` 用 turndown 转成 **Markdown 镜像**（`dist/markdown/{path}.md` + `dist/markdown/index.md` + `dist/llms-full.txt`，480 条）。
  - `public/_headers`——安全响应头 + `Content-Signal: ai-train=no, search=yes, ai-input=yes` + `/markdown/*`、`/llms-full.txt` 的 `Content-Type`/缓存头。
  - `public/_redirects`——`/sitemap.xml → /sitemap-index.xml 301`。
  - `public/llms.txt`——镜像/主页/数据/工具/知识/多语言导航。
  - `public/robots.txt`——全放行 + AI 爬虫显式放行 + sitemap 指向。
- **页面构成**：491 个 HTML = `404.html` + 490 内容页（每语言 98 × 5）。内容页含首页、公司/合规/政策页、`knowledge/*`（37 篇知识文）、`compare/*`（对比页）、`data/[model]`（35 型号 × 5 语言）、`applications/*`、`markets/*`、`oem/*`、`tools/*`（筛选/对比工具，交互式）。

## 2. 检查的文件

`package.json`、`astro.config.mjs`、`.gitignore`、`.git/config`；`scripts/generate-markdown.mjs`（既有镜像生成器，参考其路由枚举与 turndown 配置，未复用其脚本体）；`src/pages/**`（含 `es/ar/ru/zh/**` 多语言目录、`data/[model]`、`compare/*`、`tools/*`、`knowledge/*`、`markets/*`、`applications/*`）；`src/layouts/{BaseLayout,ArticleLayout}.astro`；`src/components/**`；`public/{_headers,_redirects,robots.txt,llms.txt,404.html,favicon.svg}`；`dist/` 构建产物（491 HTML、sitemap、镜像）；以及 `functions/`（确认不存在）。

## 3. 新建 / 修改的文件

| 类型 | 路径 | 说明 |
|---|---|---|
| 新建 | `functions/_middleware.js` | Pages Functions 中间件，Accept 协商逻辑 |
| 新建 | `scripts/generate-negotiation-markdown.mjs` | 构建期 HTML→Markdown sidecar + manifest 生成 + 校验 |
| 新建 | `scripts/test-negotiation.mjs` | 本地协商测试（模拟 `env.ASSETS`） |
| 新建 | `docs/md-negotiation-report.md` | 本报告 |
| 修改 | `package.json` | `build` 脚本追加 `&& node scripts/generate-negotiation-markdown.mjs` |

**构建期产物（`dist/` 已 gitignore，不提交）**：`dist/**/index.md`（480 个 sidecar）+ `dist/_md/manifest.json`。既有镜像 `dist/markdown/**` 与 `dist/llms-full.txt` 不受影响。

## 4. 现有 Functions / Worker 扩展情况

**无。** 仓库此前无任何 `functions/`、`_middleware.js`、`_worker.js`。本批直接新建 `functions/_middleware.js`，未覆盖任何既有请求拦截架构。既有 `_headers`/`_redirects` 由 CF Pages 平台在静态资产层应用，与本中间件共存（中间件仅对 HTML 文档合并 `Vary: Accept`、对 MD 响应设置内容/缓存头，不重写 `_headers`/`_redirects`）。

## 5. 扫描的 HTML 页数

`astro build` 产出 **491** 个 HTML（490 内容页 + `404.html`），全部扫描。

## 6. 生成的 Markdown 页数

**480** 个（`dist/**/index.md` sidecar，与 `index.html` 同级）。

分语言：**en 96 · es 96 · ar 96 · ru 96 · zh 96 = 480**（每语言 98 页 − 2 工具页 = 96）。

## 7. 排除的页数及理由

- **11 个**：`404.html`（错误页 + `noindex`）+ 10 个交互式工具页（`tools/battery-finder`、`tools/compare` × 5 语言——非信息内容页，与 sitemap 排除口径一致）。
- 全站除 `404.html` 外**无任何 `noindex` / `robots` meta**（`grep` 验证），无重复 canonical 变体（所有页面 canonical 均自指绝对 URL）。资格判定按页面元数据（canonical、noindex）而非仅文件名。

## 8. 转换依赖

- **HTML→Markdown**：`turndown@7.2.4`——**已是 devDependency**，且被既有镜像生成器使用（本仓既有方案），**零新增依赖、未联网安装**。
- **未用 `parse5`**：`parse5` 仅为 Astro 传递依赖，从本包 `require('parse5')` 直接解析失败（`ERR_PACKAGE_PATH_NOT_EXPORTED`）。故按 skill「复用已有合适依赖」原则选用 turndown，与本仓既有架构一致（与 filterhub 的 parse5+自写序列化器方案**不同**——本仓以 turndown 为准）。
- 内容源为 `<main id="main">`（回退 `<main>`），天然排除页头/页脚/nav/cookie/装饰；转换**只在构建期执行**，运行期零转换。

## 9. 清单（manifest）位置

`dist/_md/manifest.json`（构建期自动生成，URL → MD 资产路径映射，480 条）。与既有 `/markdown/` 镜像系统**区分**：镜像在 `dist/markdown/`，协商 sidecar 在 `dist/**/index.md`，manifest 在 `dist/_md/`。

## 10. URL 归一化策略

- `dist/index.html` → `/`；`dist/a/b/index.html` → `/a/b/`（尾斜杠，与 `trailingSlash: always` 一致）。
- manifest 键为尾斜杠 URL，值指向实存文件（`/index.md`、`/es/index.md`、`/data/55b24/index.md`）。
- 中间件查找容忍缺尾斜杠：先查 `pathname`，再查 `pathname + '/'`。
- **多语言路径归一**：语言目录（`/es/`、`/ar/`、`/ru/`、`/zh/`）作为普通路径段处理，manifest 键自然区分语言（`/es/` vs `/`），无特殊归一、不改公开 URL。
- **不映射查询串**（只用 `URL.pathname`）；**防路径穿越**（仅查 manifest 白名单 + `isSafeAssetPath()`：`/` 开头且不含 `..`）。

## 11. 协商行为

| 请求 Accept | 响应 |
|---|---|
| `text/markdown` | Markdown（`text/markdown; charset=utf-8`） |
| `text/markdown; q=1.0` | Markdown |
| `text/markdown; q=0` | HTML |
| `text/html` | HTML |
| （缺失 / 不支持） | HTML |
| `text/html, text/markdown`（同 q 平局） | **HTML**（确定性平局 → HTML 默认） |
| `text/html;q=0.5, text/markdown;q=0.9` | Markdown（md q 更高） |

- `q` 值按 RFC 解析（`q=0` 视为显式拒绝 → HTML；不用简单子串判断）。
- MD 响应头：`Content-Type: text/markdown; charset=utf-8` + `Vary: Accept` + `Cache-Control: no-store`。
- HTML 响应：原样保留状态/头/缓存，仅**合并** `Vary: Accept`（不覆盖既有 Vary）。
- 资产经 `env.ASSETS.fetch()` 解析；manifest/资产缺失 → 安全回退 HTML；无递归（`env.ASSETS.fetch` 直达静态资产存储，不重入 Functions）。

## 12. 缓存策略

- **HTML**：缓存行为保留（Astro 静态构建本身不加 `Cache-Control`，由 CF Pages 默认策略处理），仅合并 `Vary: Accept`。
- **Markdown**：`Cache-Control: no-store`（生产缓存键分离**尚未验证**前保守）。
- **静态资产**：完全不动（不加 Vary、不改缓存）。
- **未全站禁缓存**。

## 13. 本地测试结果（如实标注环境）

**环境：未安装 `wrangler`，用 `scripts/test-negotiation.mjs` 模拟 `env.ASSETS`（从 `dist/` 提供静态文件），并直接 import 真实 `functions/_middleware.js` 的 `onRequest` 执行。** 验证协商逻辑本身，**不等于**生产 Pages Functions 已通过。

结果：**24/24 通过**，覆盖：
- `GET /` → 200 `text/html`、原始 HTML、`Vary: Accept`；
- `GET /` + `Accept: text/markdown` → 200 `text/markdown; charset=utf-8`、`Vary: Accept`、真实 Markdown；
- 型号页 `/data/55b24/` 协商返回正确条目（55B24）；本地化 `/es/` 在其自身路由返回 Markdown；
- `q=0` → HTML；`Accept: text/html` → HTML；平局 → HTML；`md q>html q` → Markdown；
- MD `Cache-Control: no-store`；HTML 无 `no-store`；
- 缺失路由 → HTML 回退；`/404.html`、`/tools/compare/`（排除工具）→ 保持 HTML；缺尾斜杠 → 仍协商 MD；查询串忽略；静态资产不加 Vary；
- manifest 可读、480 条。

## 14. 生产测试结果

**未部署生产，未执行生产测试。** 本仓库无 `wrangler`、无部署凭证/管线配置。生产测试须在部署后按 skill §11 Test 1–8 重跑；在完成生产缓存键分离验证前，MD 维持 `no-store`。另须在生产验证：`_headers`/`_redirects` 与 `env.ASSETS.fetch()` 的交互（本地模拟不覆盖该平台层）。

## 15. SEO / AIO 完整性验证

- **canonical**：未改动（HTML 侧生成，本批未触碰任何模板/配置）。
- **sitemap**：`sitemap-0.xml`（480 URL）由 `@astrojs/sitemap` 生成，**未改动**；验证含 **0 个 `.md`** → MD 未入 sitemap。
- **robots.txt**：未改动。
- **redirects / headers**：`_redirects`、`_headers` 未改动。
- **索引性 / 内链**：未改动（未删改任何页面源文件、导航或内链）。
- **与其它技术区分**：本实现为 **HTTP 内容协商**（同 URL 按 Accept 返回 HTML/MD），与既有 `llms.txt`（发现/导航，未动）、`/markdown/` **镜像**（独立 URL 的静态 MD，未动）、`robots.txt`（爬虫指令，未动）、Cloudflare 原生 Markdown for Agents（平台特性，**未启用、未推荐**，Free 计划可用性未验证）严格区分且共存。

## 16. 已知限制

1. 本地测试为**模拟** `env.ASSETS`，非真实 Pages 运行时（缺 `wrangler`）。
2. 生产**缓存键分离未验证** → MD 维持 `no-store`（保守）。
3. `dist/_md/manifest.json` 与 `.md` sidecar 是公开静态资产（可被直接抓取 `/*.md`），无害但不隐（与既有 `/markdown/*.md` 镜像同理）。
4. MD 顶部 `>` 引用的是被 Astro 截断至 ~155 字符的 meta description（保留原文事实，仅长度截断）。
5. 保留 `<main>` 内的面包屑行（如「Knowledge · OEM」「Model data / JIS」）作为章节上下文，未单独剥离。
6. 中间件对**所有**请求生效（含静态资产），但仅对 `text/markdown` 请求触发 manifest 读取、仅对 HTML 文档加 Vary，正常请求开销可忽略。
7. 数据型号页标题取自 `<title>`（如「55B24 Battery Specifications」），其 `<main>` H1 中的「— JIS … | Dingwei Battery」长尾已随去重 H1 移除（规格信息仍在正文/规格表中）。

## 17. 精确回滚指令

1. **git 回滚整批**（推荐）：
   ```bash
   git revert <本批提交 hash>   # 或 git reset --hard <本批前一个提交>
   git push
   ```
2. **手工回滚**（逐文件）：
   - 删除 `functions/_middleware.js`（恢复「无 Functions」状态）；
   - `package.json` 的 `build` 改回 `"build": "astro build && node scripts/generate-markdown.mjs"`；
   - 删除 `scripts/generate-negotiation-markdown.mjs`、`scripts/test-negotiation.mjs`；
   - 删除 `docs/md-negotiation-report.md`；
   - 重新 `npm run build`（`astro build` 自动清空 `dist/`，sidecar 与 manifest 随之消失）。
3. 无需回滚任何页面源文件、`robots.txt`、`sitemap`、`llms.txt`、`_headers`、`_redirects`、既有镜像生成器（本批未改动它们）。
