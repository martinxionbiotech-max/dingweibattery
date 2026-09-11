# Dingwei Battery 技术收尾方案（建议 #6）

- **对象**：`https://dingweibattery.com`（Astro 静态站 + Cloudflare）
- **日期**：2026-09-11（UTC）
- **性质**：仅产出可直接交技术团队执行的工件，**不修改线上文件、不改 DNS**
- **对应审计项**：P2-5（www 301）、P2-6（sitemap lastmod + hreflang）、P2-8 / P3（CSP、ACAO、security.txt）

---

## 1. www → apex 301（Cloudflare Redirect Rules）

**现状（实测）**：`https://www.dingweibattery.com/` 返回 200（无跳转），仅靠 `<link rel="canonical" href="https://dingweibattery.com/">` 补救；`http://dingweibattery.com` 已正确 301 到 https。

**方案**：在 Cloudflare 用 **Redirect Rules**（动态单条规则，无需写 Page Rules 多条），保留完整路径与查询串。

| 配置项 | 值 |
|---|---|
| 规则名称 | `www-to-apex-301` |
| 当传入请求匹配 | 自定义筛选表达式（见下） |
| 表达式 | `(http.host eq "www.dingweibattery.com")` |
| 动作 | `Dynamic redirect`（动态重定向） |
| 状态码 | `301`（永久） |
| 目标 URL | `concat("https://dingweibattery.com", http.request.uri.path, iif(http.request.uri.query != "", concat("?", http.request.uri.query), ""))` |
| 保留查询字符串 | 是（通过上面目标 URL 显式拼接） |

**说明**：
- `http.request.uri.path` 保留路径（含尾斜杠语义）；`iif(...)` 拼接查询串，无查询串时不加 `?`。
- 部署后验证：`curl -sI https://www.dingweibattery.com/oem/` 应返回 `301 Location: https://dingweibattery.com/oem/`；带查询串 `?x=1` 应保留为 `https://dingweibattery.com/oem/?x=1`。
- 若团队习惯 Page Rules，也可用单条 Forwarding URL：`www.dingweibattery.com/*` → `https://dingweibattery.com/$1`（301）。推荐 Redirect Rules（更精确、不吞路径）。

---

## 2. sitemap 补 `lastmod` + hreflang 备用链接

**现状（实测）**：`sitemap-0.xml` 283 个 `<url>`，**无 `<lastmod>`**（0 个）、无 `changefreq`/`priority`；已声明 `xhtml` 命名空间但**无 `<xhtml:link>` hreflang 备用链接**。

**修正示例**（以知识页 `oem-battery-cost-breakdown` 为一组，展示多语言 hreflang 备用链接 + lastmod 结构）：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://dingweibattery.com/knowledge/oem-battery-cost-breakdown/</loc>
    <lastmod>2026-09-10</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="https://dingweibattery.com/knowledge/oem-battery-cost-breakdown/"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://dingweibattery.com/es/knowledge/oem-battery-cost-breakdown/"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://dingweibattery.com/ar/knowledge/oem-battery-cost-breakdown/"/>
    <xhtml:link rel="alternate" hreflang="ru" href="https://dingweibattery.com/ru/knowledge/oem-battery-cost-breakdown/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://dingweibattery.com/knowledge/oem-battery-cost-breakdown/"/>
  </url>
</urlset>
```

**要点**：
- `<lastmod>` 用 `YYYY-MM-DD`，取自站点实际发布/更新日期（型号页已有 `dateModified`，可直接同步）。
- hreflang 备用链接要求**双向一致**：每个语种 URL 都要作为独立 `<url>` 出现，并各自带上完整 5 组 hreflang 备用链接（含 `x-default` 指向英文）。
- 现有命名空间已声明 `xhtml`，无需改 `<urlset>` 属性即可直接加 `<xhtml:link>`。
- 中文版上线时，每组再加 `hreflang="zh"`（`zh-CN` 别名可选）。

---

## 3. CSP 收紧（去 `unsafe-inline`）

**现状（实测响应头）**：存在 `content-security-policy`，但含 `'unsafe-inline'`（script 与 style），被内联削弱。

**建议 CSP 值（静态站，无第三方脚本）**：

```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'
```

**代价与前置改造（Astro 静态站）**：
- 现有首页含 **1 个内联 `<script>`**（实测），须改为外部 `.js` 文件（Astro 会 hash 打包为 `/_astro/*.js`）后再收紧，否则该脚本被 CSP 拦截。
- 内联样式（若有）改为外部 CSS；Astro 默认把 `<style>` 打进 hash CSS，通常已是外部文件。
- 保留 `frame-ancestors 'none'`（与现有 `x-frame-options: DENY` 一致）；`img-src` 保留 `data:` 以兼容 favicon/data-URI 图片。
- Cloudflare `speculation-rules` 预取为响应头，不触发 CSP，无需豁免。
- **验证**：上线前用浏览器 Console 检查无 CSP 违规告警（`Refused to execute inline script` 等），并确认 `/tools/battery-finder`、`/tools/compare` 等有交互的页功能正常。

> 若团队短期内不打算把内联脚本外置，可先保留 `script-src 'self' 'unsafe-inline'` 作为过渡，但**不建议**长期保留——`unsafe-inline` 会基本抵消 script CSP 的防护价值。

---

## 4. security.txt（可直接用）

**现状（实测）**：`/.well-known/security.txt` 返回 **404**。

**部署位置**：`https://dingweibattery.com/.well-known/security.txt`（Cloudflare 静态资源，`Content-Type: text/plain`）。

**内容（可直接粘贴）**：

```
Contact: mailto:martin@dinweys.com
Expires: 2027-09-11T00:00:00.000Z
Preferred-Languages: en, es, zh-CN
Canonical: https://dingweibattery.com/.well-known/security.txt
```

**说明**：
- `Contact` 使用现有邮箱 `martin@dinweys.com`（已决策不做迁移）。
- `Expires` 设为未来日期（2027-09-11，当前审计日 2026-09-11 起一年）；到期前记得滚动更新，否则安全研究者会视为失联。
- `Preferred-Languages` 按站点语种 + 主体背景设为 `en, es, zh-CN`（可自行增删）。
- `Canonical` 指向自身，避免多处副本歧义。
- 可选：另在 `https://dingweibattery.com/security.txt` 放同内容并 302 到 `/.well-known/security.txt`（非必须）。

---

## 5. （可选）`access-control-allow-origin: *` 移除

**现状（实测响应头）**：HTML 响应含 `access-control-allow-origin: *`。

**结论**：静态站 HTML 无跨域 API 读取需求，`*` 无必要，且对含认证资源属过度放开（本 HTML 无认证，风险低但无收益）。**建议移除**该响应头。

**做法**：
- 若该头来自 Cloudflare Transform Rules / Response Header Modification，删除对应规则即可。
- 若来自源站/Astro 中间件，移除 `Access-Control-Allow-Origin: *` 输出。
- 未来若真需要跨域读取（如把 `battery-models.json` 提供给第三方前端跨域调用），再按需为特定 origin 加白名单（如 `Access-Control-Allow-Origin: https://example.com`），而非 `*`。

---

## 附：证据与红线

- 现状均为 `curl` / `web_fetch` 实测：`www` 200 无跳转、`sitemap-0.xml` 0 个 `<lastmod>`、CSP 含 `unsafe-inline`、`access-control-allow-origin: *`、`/.well-known/security.txt` 404。
- **红线**：本文仅产出配置工件，未修改线上文件、未改 DNS、未改 Cloudflare 规则。
- 以上 Cloudflare 表达式与 CSP 值需在 staging/预览环境验证后上线；`security.txt` 的 `Expires` 日期需由品牌方确认后定稿。
