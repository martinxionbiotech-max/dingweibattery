# Dingwei Battery 中文版上线前核对清单

- **对象**：`https://dingweibattery.com`（拟上线中文版 `/zh/` 前的核对清单）
- **日期**：2026-09-11（UTC）
- **性质**：仅核对清单，**不部署、不修改线上站点**（无 repo/托管访问）
- **整合来源**：审计报告（dingweibattery-aio-audit.md）、中文内容包（dingwei-zh-content-v3.md）、数据一致性（dingwei-data-consistency.md）、上一轮审核结论
- **使用说明**：勾选框由人工在执行时打勾。邮箱已决策**保持 `martin@dinweys.com`（不做迁移）**，本清单不含邮箱迁移项。

---

## A. 上线前必须完成（阻塞项，未勾完不得发布）

### A1. 关键数字核实（来自上一轮审核结论）

- [ ] **「18 条产线」**：与工厂台账核对实际自动化产线数量。当前站点 `/factory/` 页陈述「18 automated lines」，中文稿沿用了该数字，需工厂确认。
- [ ] **「70+ 国家」**：与出口报关/客户台账核对实际出口国家数量。当前站点陈述「70+ countries」，中文稿沿用，需工厂确认。
- [ ] **「N 系列最高 1100A CCA」**：与 N100/N150/N200 型号实测数据核对最高冷启动电流是否确为 1100A，并注明测试基准（JIS -15°C / EN -18°C）。中文稿 `dingwei-zh-content-v3.md` 重载商用段落已写「冷启动电流最高 1100A」。

> 证据：以上三处均来自站点 `/factory/` 页与中文稿自述，非第三方实测；注册/上线前须以工厂记录为准（见审计「B6 多语言情况」与 zh-content-v3「附：本交付物局限」）。

### A2. 数据—能力一致性（与 dingwei-data-consistency.md 同步解决）

- [ ] **澳洲 N70/N70ZZ、南非 646/657/668 型号**：中文版规格表（`/zh/data/`）若引用这些型号，须先解决「`battery-models.json` 无 AS/SA 型号」的不一致。
  - [ ] 决策：走**路线 A（补数据）**还是**路线 B（收窄文案）**？建议先上路线 B 替代 A 措辞（零成本消除不一致），待 `dingwei-bci-models-draft.json` 经工厂复核后再补数据切路线 C。
  - [ ] 若走路线 A：`dingwei-bci-models-draft.json` 中 11 款（BCI Group 24/27/31/48/49/65 + AS N70/N70ZZ + SA 646/657/668）的容量/CCA/尺寸/端子/重量须**工厂逐项复核**，将 `confidence` 由 `REFERENCE` 改为 `PARTIALLY_VERIFIED` 后方可上线。
- [ ] **营销文案「覆盖五大标准」**：中文版不得再写「覆盖 JIS、DIN、BCI、AS、SA 五大标准」（与 23 款数据库只有 JIS/DIN/EN + N 系列不符）。改用数据一致性文档「替代 A」诚实措辞：*「覆盖 JIS 与 DIN/EN 两大主流体系，并可按客户要求开发 BCI（北美）、澳洲 N 型与南非类型号等区域标准规格。」*
- [ ] **「SA」标准歧义**：中文版若提「SA」，明确写为「南非类型号 / SAE 冷启动评级」两义，避免歧义（见 data-consistency 文档「关于 SA 标准的诚实说明」）。

### A3. 第一人称实体资质声明核对

- [ ] **IATF 16949 证书**：核对证书有效期（是否在有效期内）与持证主体是否为「晋州成光电源有限公司（Jinzhou Chengguang Power Technology Co., Ltd.）」。
- [ ] **ISO 9001 / ISO 45001 / OHSAS 18001**：逐张核对证书有效期与持证主体。注意：OHSAS 18001 已被 ISO 45001 取代，若仅剩 45001 有效，中文稿应如实写，不并列保留过期表述。
- [ ] **厂址**：核对「河北省晋州市 Maju Industrial Park（马于工业区）」中文表述与实际营业执照地址一致。

> 证据：资质声明均来自站点 `/factory/` 页与首页 JSON-LD（Organization），证书有效期无法从页面验证，须向工厂索取证书扫描件核对。

### A4. 中文版技术部署核对项（沿用 zh-content-v3 实施清单）

- [ ] **hreflang 补 `zh`**：中文页加 `<link rel="alternate" hreflang="zh">`（可加 `zh-CN` 别名 + `x-default` 保持英文）；英文/es/ar/ru 各页**反向**补 `zh` 备用链接，保证双向一致。
- [ ] **sitemap 补中文 URL**：`/zh/*` 全部加入 `sitemap-0.xml`，同时补 `lastmod`（顺带解决审计 P2-6，见 dingwei-tech-cleanup.md）。
- [ ] **canonical**：每张中文页 canonical 指向对应 `/zh/.../`（带尾斜杠），不指向英文页。
- [ ] **JSON-LD 同步**：中文页同步输出 Product / FAQPage / BreadcrumbList / Organization JSON-LD（`inLanguage` 标 `zh-CN`）。
- [ ] **meta robots / ai-train**：中文页不加 noindex；保留 `<meta name="ai-train" content="no">` 与全站一致。
- [ ] **导航加语言切换**：加「中文（简体）」入口。
- [ ] **中文页无英文残留**：上线前抽检中文页正文，清理未翻译英文片段（参考 es 页教训，见 dingwei-localization-plan.md 第三节）。
- [ ] **llms.txt 补中文段**：追加中文站点段落（含 `/zh/data/`、`/zh/knowledge/`）。robots.txt 无需改（全开放 + AI 爬虫已允许）。
- [ ] **QA 抽检**：hreflang 双向一致、canonical 正确、中文页无 noindex、JSON-LD 正常输出。

### A5. 邮箱（已决策，仅确认，不做迁移）

- [x] **邮箱保持 `martin@dinweys.com`**（已决定，不迁移到 @dingweibattery.com）。
- [ ] （可选，上线后可迭代）在页面/关于页明确「dinweys.com」与「Dingwei」两域关系，消除拼写漂移的信任歧义——非阻塞项。

---

## B. 上线后可迭代（非阻塞）

- [ ] **知识库中文全量补齐**：中文版首批 10 篇（zh-content-v3 已产出）之外，其余 26 篇英文知识文章第二期补译。
- [ ] **E-E-A-T 署名**：中文知识文章署名具名工程师/质检负责人并附履历（可选增强）。
- [ ] **BCI/AS/SA 数据补全**（若 A2 选路线 B）：待工厂复核后补数据 + 更新 battery-finder 标准筛选选项。
- [ ] **external-discoverability 同步**：中文版上线后，配合 `dingwei-external-discoverability.md` 在中文本土 B2B 平台（如阿里巴巴国际站中文站、1688、百度爱采购）建立档案，制造中文语境引用与回链。

---

## C. 证据与红线

- 本清单整合的三项「上一轮审核结论」来自 dingweibattery-aio-audit.md（P1/P2 问题）与 dingwei-data-consistency.md、dingwei-zh-content-v3.md。
- **红线**：仅产出清单，未修改任何线上文件、未改 DNS、未做邮箱迁移。
- 「18 条产线」「70+ 国家」「1100A CCA」为站点自述，上线前以工厂台账/实测为准；证书有效期以证书扫描件为准。
