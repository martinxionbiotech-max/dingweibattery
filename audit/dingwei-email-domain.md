# Dingwei Battery — 邮箱域统一方案（建议 #3）

> ⚠️ **已作废（2026-09-11 用户决定）**：保持原邮箱 `martin@dinweys.com`，不做域名统一迁移。本文档仅存档备查，不再作为执行依据。

- **对象**：`https://dingweibattery.com`（主域）与 `dinweys.com`（现用邮箱域）
- **日期**：2026-09-11（UTC）
- **性质**：仅产出**方案与清单**，**不修改任何 DNS/线上文件、不实际迁移邮箱**（无托管/域名控制台访问）
- **背景依据**：审计报告 P1-3「邮箱域不一致 + 主域无 MX」——联系邮箱 `martin@dinweys.com` 走腾讯企业邮 MX，而 `dingweibattery.com` **无 MX 记录**；`dinweys` 与品牌 `Dingwei` 拼写漂移

---

## 0. 问题一句话

品牌是 `Dingwei`，主站是 `dingweibattery.com`，但对外邮箱是 `martin@dinweys.com`（多了一个「n」、少了「battery」，且主域不接收邮件）。这是信任与品牌一致性的隐患，也让 AI 知识图谱难以把邮箱与品牌/公司绑定成同一实体。

---

## 1. 两条 MX 配置路径对比（核实结论）

> 两条路径均为 2026-09-11 通过 `web_search` 核实的公开用法，非实控操作。

| 维度 | **A：腾讯企业邮（exmail.qq.com）** | **B：Cloudflare Email Routing** |
|---|---|---|
| 定位 | 完整企业邮箱（收发、多账号、管理后台） | 免费**收信转发**（把 `@dingweibattery.com` 邮件转发到已有邮箱） |
| 成本 | **基础版免费**（邮箱账号数无上限、1G/账号、2G 中转站、2G 企业网盘）；专业版 ¥950/年起（无限容量等） | **免费**（转发到现有邮箱，无独立邮箱账号） |
| 收发能力 | 完整收发（含 SMTP 发信、IMAP/POP、客户端） | **只能收+转发**；发信需另配 SMTP（如复用现有邮箱的发信通道） |
| MX 记录 | `mxbiz1.qq.com`（优先级 5）、`mxbiz2.qq.com`（优先级 10），需另加 CNAME/TXT(SPF) | 在 Cloudflare 面板「Email Routing」引导下自动生成 MX + SPF(TXT)，通常指向 `route*.mx.cloudflare.net` 系列 |
| 前置条件 | 需用微信扫码注册管理员 → 添加并验证 `dingweibattery.com` 域名所有权 → 设 MX | 域名需在 Cloudflare 账户下（**Dingwei 已用 Cloudflare NS，天然满足**） |
| 适配 Dingwei | ✅ **推荐**：与现有 `dinweys.com` 同体系（已在用腾讯企业邮），迁移平滑 | ⚠️ 仅转发、无独立收发，适合「过渡期收信兜底」，不适合作为正式对外邮箱 |

### 1.1 推荐结论：**路径 A（腾讯企业邮）为主，路径 B（Cloudflare Email Routing）做过渡兜底**

- `dinweys.com` 已经在用腾讯企业邮，**同一套体系迁移到 `dingweibattery.com` 学习成本最低**，且能获得「完整收发 + 多账号 + 业务邮箱」能力（腾讯企业邮基础版免费，最多可建 3 个业务邮箱）。
- 迁移窗口期（MX 切换、SPF/DKIM 配置、全站文案更新）内，可先开 **Cloudflare Email Routing** 做 `@dingweibattery.com` 的**收信兜底转发**，避免漏信；待腾讯企业邮 MX 生效后再关闭兜底或保留为冗余。

---

## 2. 迁移步骤（从 dinweys.com → dingweibattery.com）

### 阶段 0：前置核对（不要跳过）
1. 确认 `dingweibattery.com` 域名管理权限（Cloudflare 账户）与腾讯企业邮管理员权限均在手上。
2. 清点 `martin@dinweys.com` 当前的：历史邮件是否需要迁移、是否还有**其它对外公开的 dinweys 邮箱地址**（如 sales@、info@）、哪些平台/目录/合同已登记该邮箱。
3. 确认目标邮箱地址形态，例如 `martin@dingweibattery.com`（或 `sales@` / `info@` / `contact@`）。

### 阶段 1：在腾讯企业邮添加主域
4. 登录腾讯企业邮管理后台（exmail.qq.com，企业微信「协作 → 邮件」）。
5. 「域名管理」→ 添加 `dingweibattery.com` → 按提示完成域名所有权验证（DNS 加 TXT/CNAME）。
6. 在 Cloudflare DNS 面板为 `dingweibattery.com` 添加 MX 记录：
   - `mxbiz1.qq.com`（优先级 5）
   - `mxbiz2.qq.com`（优先级 10）
   - 删除/确认无其它 MX（主域原无 MX，通常无需删）。
7. 添加 SPF(TXT)：`v=spf1 include:spf.mail.qq.com ~all`（按腾讯后台最新提示为准）；后续补 DKIM。
8. 等待 MX 生效（通常 2–24 小时），后台验证通过后创建 `martin@dingweibattery.com` 账号（账号前缀创建后一般仅可改一次，确认后再建）。

### 阶段 2：过渡期兜底（可选，防漏信）
9. 在 Cloudflare「Email Routing」开通 `dingweibattery.com`，设一条转发规则把 `martin@dingweibattery.com → martin@dinweys.com`（或其它收件箱），在腾讯 MX 完全生效前兜底。

### 阶段 3：别名 + 迁移历史
10. 若需保留 `dinweys.com` 收信，在腾讯企业邮将 `dinweys.com` 域名保持绑定，并给 `martin@dingweibattery.com` 设置别名/转发，使旧地址发来的信仍能收到（过渡期 3–6 个月）。
11. 将 `martin@dinweys.com` 历史邮件按腾讯「邮箱搬家/迁移」功能迁到新账号（如需）。

### 阶段 4：全站与外部点位更新（见第 3 节清单）→ 再观察旧地址是否还有来信 → 关闭 dinweys 兜底（可选保留别名）。

---

## 3. 全站需要更新的联系点位清单

> 以下点位基于审计报告已确认的站点结构（首页/联系页/JSON-LD/页脚），落地时以仓库实际文件逐一定位。

| # | 点位 | 现状（审计证据） | 需改为 |
|---|---|---|---|
| 1 | 联系页 `/contact/`（及 `/es/contact/`、`/ar/contact/`、`/ru/contact/`） | `martin@dinweys.com` | `martin@dingweibattery.com` |
| 2 | 全站页脚（若含邮箱） | 需核对是否含 dinweys 邮箱 | 统一为 `@dingweibattery.com` |
| 3 | **Organization JSON-LD（全站 2 份）** | 需核对 `email` 字段是否含 dinweys | 更新 `email` 为 `@dingweibattery.com`；品牌 JSON-LD 与制造商 JSON-LD 邮箱保持一致 |
| 4 | 联系页/首页 WhatsApp 深链 | `https://wa.me/8613323237275`（保持不变） | 无变化（电话不变） |
| 5 | `llms.txt` | 若含联系方式段落 | 同步邮箱 |
| 6 | 各型号页/知识页 CTA（若含邮箱） | 需 grep `dinweys` 全仓库 | 全部替换 |
| 7 | 隐私/条款页（`/privacy/`、`/terms/`） | 若含联系邮箱 | 同步 |
| 8 | `/data/battery-models.json` 及 schema 描述 | 若含 publisher 邮箱 | 同步（可选） |

**执行提示**：落地前在仓库内 `grep -rn "dinweys" .` 全量检索，确保无遗漏；替换后 `grep -rn "dinweys" .` 应为空（或仅保留过渡期别名说明）。

---

## 4. 品牌一致性核对清单（域名 / 邮箱 / 公司名 / 制造商名 / 地址）

> 目标：让搜索引擎与 AI 知识图谱把「品牌 Dingwei Battery = 制造商 Jinzhou Chengguang Power Tech = 域名 dingweibattery.com = 邮箱 @dingweibattery.com」识别为**同一实体**，消除分裂。

| 维度 | 统一为 | 现状/风险 |
|---|---|---|
| **品牌名** | `Dingwei Battery`（英文）、`Dingwei Battery（品牌）` | 已统一；注意不要出现 `Dinwey` 变体 |
| **主域名** | `dingweibattery.com` | ✅ 已是 |
| **制造商英文名** | `Jinzhou Chengguang Power Technology Co., Ltd.`（或 `Chengguang Power Tech Co., Ltd.`） | JSON-LD 已用；各平台档案需与之一致 |
| **制造商中文 legalName** | `晋州成光电源有限公司` | JSON-LD 已含；国内平台/目录保持一致 |
| **成立年份** | `2002`（foundingDate） | 已在 JSON-LD；平台档案统一 |
| **联系邮箱域** | `@dingweibattery.com` | ⚠️ **当前为 `martin@dinweys.com`，本次修复核心** |
| **电话/WhatsApp** | `+86 133 2323 7275` | 保持不变，全平台统一 |
| **地址** | 晋州成光电源有限公司注册地址（以 JSON-LD `address` 为准） | 全平台/目录用同一地址表述 |
| **制造商↔品牌关系** | 制造商 `manufacturer` 关联品牌（JSON-LD 已正确声明） | 各平台档案中明确「Brand: Dingwei Battery, manufactured by Chengguang Power Tech」 |

**核对方法（人工）**：以官网 JSON-LD 为「权威 NAP 基准」，逐一核对 Alibaba/Made-in-China/Global Sources/行业目录/LinkedIn/企查查 上的名称、地址、邮箱、电话是否与基准完全一致。

---

## 附：本交付物局限（如实）

- 未实际登录 Cloudflare 或腾讯企业邮控制台，以上为**方案与清单**，MX/SPF/DKIM 具体值以两家服务后台实时提示为准。
- 腾讯企业邮「免费版可建 3 个业务邮箱、1G/账号」等细节为 2026-09-11 官方页面与第三方教程转述，产品规格可能调整，落地前以 `exmail.qq.com` 实时页面为准。
- 全站联系点位清单基于审计报告已确认的结构推导，**未**对仓库文件逐一 grep（无仓库访问），落地时需以实际文件全量检索兜底。
