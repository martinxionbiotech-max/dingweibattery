# Dingwei Battery — 外部可发现性方案与素材（建议 #1）

- **对象**：`https://dingweibattery.com`（B2B 外贸 OEM 铅酸蓄电池供应商）
- **日期**：2026-09-11（UTC）
- **性质**：仅产出**方案与素材**，**不注册任何平台、不修改任何线上文件**（无凭证、属外部动作）
- **背景依据**：审计报告 P1-1「品牌与公司在线存在感几乎为零」；站内 AIO 已上乘，瓶颈在站外

---

## 0. 核心判断（一句话）

站点内部做得再好，搜索引擎与 AI 引擎「不知道这个站」就白搭。本方案按**「低成本建立可验证第三方档案 → 数据资产制造引用与回链 → 行业目录沉淀权威」**三步推进，先花小钱验证平台，再用数据换取引用。

---

## 1. B2B 平台入驻方案（优先级排序 + 定位 + 资料清单）

> 平台政策与费用为 2026-09-11 通过 `web_search` 核实的公开信息，**金额均为第三方转述/区间值，非官方报价单**，最终以平台官方商务确认为准。三平台均对「汽车/电池」类目有额外资质审核（电池属危险品相关类目），需提前备好 MSDS 与体系证书。

### 1.1 优先级与定位

| 排序 | 平台 | 定位 | 适合 Dingwei 的理由 | 费用参考（供应商侧） |
|---|---|---|---|---|
| **1（首选）** | **Alibaba International** | 全球流量最大、买家最集中的 B2B 入口，适合快速起量、接 RFQ | 目标客户（海外品牌商/批发商）默认第一个搜这里；铅酸电池类目买家询盘量大；已支持多语言与 RFQ | Gold Supplier 年费第三方转述区间 **约 $2,999–$4,700/年**（部分区域有区域价/代理价），另有运营/关键词广告（KWA）额外预算；Verified Supplier 更高（约 $12,500/年 转述） |
| **2（第二）** | **Made-in-China.com** | 制造业/工业品类供应商密度更强、审核更严，适合「工厂背书」 | 第三方现场审核（SGS/Bureau Veritas 类）更利于证明「真工厂」而非贸易商；机械/工业品类买家质量高 | 供应商 Premium/Audited Supplier 会员费为**报价制**（官方不公示统一价，需商务洽谈）；买家侧 Premium 约 $199.90/年（与供应商无关） |
| **3（第三）** | **Global Sources** | 侧重「已验证供应商 + 线下展会（香港）」，买家以欧美成熟采购为主 | 品牌信任背书强、竞品数量少、价格竞争没那么卷；适合配合香港展做精准获客 | Verified Supplier 会员费为**报价制**，官方不公示；线下展位另计费 |

**排序理由（诚实）**：
- Alibaba 流量最大，**先用它验证「这个品类的线上询盘到底有多少」**，即便要花年费；
- Made-in-China 的「真工厂审核」对 Dingwei（有 IATF 16949/ISO 体系 + 自有工厂）是**低成本高可信的加分项**，尤其能对冲 Alibaba 上「贸易商冒充工厂」的杂音；
- Global Sources 更偏「展会 + 精准买家」，适合**第二阶段**，等有稳定询盘与预算后再投。

> ⚠️ **关于 Alibaba「Gold Supplier」状态的诚实说明**：多个第三方来源（如 jingsourcing.com）指出 Alibaba 曾在 2021 年淡化「Gold Supplier」称谓、向「Verified Supplier」体系迁移；另有来源（smartbuy.alibaba.com）仍以 Gold Supplier 名义描述 $2,999 起步。**称谓与价格在不同区域/时期有漂移，最终以 Alibaba 官方商务经理报价为准**。本方案按「存在付费会员 + 第三方验证」这一稳定事实来规划，不纠缠具体称谓。

### 1.2 入驻所需资料清单（三平台通用，Dingwei 均已具备或可快速补齐）

**主体与资质（必备）**：
1. 营业执照（晋州成光电源有限公司）+ 英文翻译件
2. 公司英文名与中文 legalName 一致性：**Jinzhou Chengguang Power Technology Co., Ltd.（晋州成光电源有限公司）**，品牌 **Dingwei Battery**
3. 体系证书扫描件：**IATF 16949、ISO 9001、ISO 45001、OHSAS 18001**（逐张准备，三平台都可在档案中挂证书展示）
4. 出口资质：外贸经营者备案、海关进出口货物收发货人备案（如已有）
5. 银行账户证明（平台对公验证常用）

**产品与合规（电池类目重点）**：
6. 产品目录：23 款型号（JIS/DIN/EN）+ 图 + 规格表（可直接用现有 `/data/battery-models.json` 导出）
7. **MSDS（安全技术说明书）**：富液铅酸电池属危险品，平台上传产品时必填
8. 危包证 / 运输鉴定报告（如出口已有）
9. 产品实拍图与工厂实拍图（提升信任与搜索权重）

**业务信息**：
10. 公司档案文案（见第 2 节，中英双语）
11. 主联系邮箱（`martin@dinweys.com`）
12. 官网链接（`https://dingweibattery.com`）——**回链 + 信任双收益**
13. MOQ、交期、主要出口市场、年产能等业务参数

---

## 2. 公司档案文案（中英双语，各 200–300 字，用于平台注册）

> 严格基于审计报告已核实的真实资质，**不添加任何额外认证/荣誉**。成立年份、体系、产线数、出口国家数均沿用站点 `/factory/` 页已公开的信息；「18 条产线」「70+ 国家」为站点自身陈述，平台注册时建议与工厂台账核对后再定稿。

### 2.1 中文版（约 280 字）

> 晋州成光电源有限公司成立于 2002 年，是一家位于河北晋州的汽车铅酸蓄电池制造商，拥有 18 条自动化产线，产品出口 70 多个国家。公司持有 IATF 16949、ISO 9001、ISO 45001、OHSAS 18001 体系认证，并通过自有品牌 Dingwei Battery 面向海外品牌商、批发商与整车售后渠道提供 OEM 代工与贴牌合作。
>
> 产品线覆盖启动型（SLI）、AGM、EFB 与重载商用四大系列，符合 JIS、DIN/EN 主流标准，并可定制开发北美 BCI、澳洲 N 型、南非类型号等区域规格。我们坚持如实标注 CCA 测试基准与型号数据来源，以稳定的一致品质与可追溯产能，服务长期复购客户。

### 2.2 English (about 280 words)

> Founded in 2002, Jinzhou Chengguang Power Technology Co., Ltd. (Chengguang Power Tech) is a lead-acid automotive battery manufacturer based in Jinzhou, Hebei, China. The company operates 18 automated production lines and exports to more than 70 countries. It holds IATF 16949, ISO 9001, ISO 45001, and OHSAS 18001 certifications, and supplies OEM and private-label batteries to overseas brands, distributors, and aftermarket channels through its own brand, Dingwei Battery.
>
> The product range covers SLI (starting), AGM, EFB, and heavy-duty commercial batteries, compliant with JIS and DIN/EN standards, with regional specifications (North American BCI, Australian N-type, South African type codes) available on request. We publish CCA test baselines and model data sources transparently, and stand on consistent quality and traceable capacity for long-term repeat business.

---

## 3. 数据集发布方案（battery-models.json，CC-BY-4.0 → GitHub + Kaggle + HuggingFace）

> 目的：把站内已 schema 化的 `battery-models.json`（23 款、`CC-BY-4.0`、`updated: 2026-09-03`）变成**可被第三方引用、可产生回链、可被 AI 训练语料发现**的公开数据资产。这是「用数据换权威」的零营销成本路径。

### 3.1 三平台分工

| 平台 | 角色 | 关键动作 | 回链/引用价值 |
|---|---|---|---|
| **GitHub** | 权威源仓库（canonical） | 建 `dingweibattery/battery-models` 仓库，放 `battery-models.json` + `README.md` + `LICENSE`（CC-BY-4.0）+ 数据字典 | 稳定引用 URL、版本历史、Issues 接收修正反馈，是另外两平台的「源头」 |
| **Kaggle** | 数据科学社区分发 | 上传同源数据集，选 **CC BY 4.0**，写 Dataset 描述与来源 | 触达数据科学/ML 人群，Kaggle 域名权威高，回链权重好 |
| **HuggingFace** | AI/ML 生态分发（LLM 训练语料可达） | 建 Dataset repo，`README.md` 顶部 YAML 设 `license: cc-by-4.0` | 直连 AI 生态，利于 LLM 语料收录与引用，是 AIO「站外被发现」的最短路径 |

**发布顺序**：先 GitHub（定稿 + 版本控制）→ 再 Kaggle / HuggingFace（同源同步，README 互链到 GitHub 与官网 `/data/`）。

### 3.2 README 模板（三平台通用，按平台微调）

```markdown
---
# HuggingFace 数据集卡片 YAML（仅 HF 需要，置于 README 顶部）
license: cc-by-4.0
language:
  - en
task_categories:
  - other
tags:
  - batteries
  - lead-acid
  - automotive
  - oem
size_categories:
  - n<1K
---

# Dingwei Battery Model Database (battery-models)

Machine-readable specifications for lead-acid automotive battery models
manufactured by Jinzhou Chengguang Power Technology Co., Ltd.
(brand: Dingwei Battery).

- **License**: CC-BY-4.0
- **Source**: https://dingweibattery.com/data/battery-models.json
- **Last updated**: 2026-09-03
- **Records**: 23 models (JIS / DIN-EN standards)

## Fields (schema)

| Field | Type | Meaning | Notes |
|---|---|---|---|
| `model` | string | Model identifier (e.g. `65D26`) | |
| `aliases` | array | Equivalent/alternate names (e.g. H6 = LN3 = DIN66) | |
| `standard` | string | Standard system: JIS / DIN-EN / BCI / AS / SA | |
| `standard_code` | string | Standard reference (e.g. JIS D 5301, EN 50342) | |
| `voltage` | number | Nominal voltage (V) | |
| `capacity_ah` | number | Nominal capacity (Ah) | |
| `c20_ah` | number | 20-hour-rate capacity (Ah) | Standard comparison baseline |
| `cca` | number | Cold Cranking Amps (A) | Reference value only |
| `cca_basis` | string | CCA test basis (e.g. -15°C JIS / -18°C EN) | **Do not cross-compare across bases** |
| `cca_confidence` | string | CCA confidence: PARTIALLY_VERIFIED / REFERENCE | |
| `rc_min` | number\|null | Reserve Capacity (minutes) | May be null |
| `dimensions_mm` | object | length × width × height (mm) | |
| `case_size` | string | Case size code (D23/D26/D31/H5–H8…) | |
| `terminal` / `polarity` | string\|null | Terminal type / polarity | Currently null in source; confirm with factory |
| `technology` | string | Maintenance-free / AGM / EFB | |
| `application` | string | Intended vehicle application | |
| `weight_kg` | number | Weight (kg) | |
| `oem_available` / `private_label_available` | boolean | OEM / private-label availability | |
| `source` | string | Data source (quotation / standard / competitor datasheet) | |
| `confidence` | string | Overall confidence level | |
| `verified_date` | string | Last verification date | |

## Provenance & confidence

- Values are **reference values**, not a commercial offer. Final
  specifications are subject to factory measurement and quotation.
- CCA values carry a `cca_confidence` flag. `REFERENCE` = from public
  standards/competitor datasheets, not yet factory-verified.
- No prices are published in this dataset (consistent with the source
  site's stated policy).

## Citation

If you use this dataset, please attribute:
"Dingwei Battery battery-models dataset (CC-BY-4.0), Jinzhou Chengguang
Power Technology Co., Ltd., https://dingweibattery.com/data/battery-models.json"
```

### 3.3 发布步骤（人工执行清单）

1. **GitHub**：新建公开仓库 → 上传 `battery-models.json` + `README.md` + `LICENSE`（CC-BY-4.0 全文）→ 仓库描述写明品牌与来源 → 在官网 `/data/` 页或 `llms.txt` 加一句「Dataset also on GitHub/Kaggle/HuggingFace」回链（需仓库权限）。
2. **Kaggle**：`Create → New Dataset` → 上传同源文件 → License 下拉选 **CC BY 4.0** → 描述粘贴 README 关键段 + 官网/GitHub 链接。
3. **HuggingFace**：新建 Dataset repo → 上传 JSON → `README.md` 顶部加 YAML（`license: cc-by-4.0`）→ 卡片正文贴 README → 链接官网与 GitHub。
4. **一致性维护**：三个平台的 JSON 与官网 `/data/battery-models.json` 保持同源；更新时同步 bump `updated` 字段与 `verified_date`。

> ⚠️ 红线：**不要把 `dingwei-bci-models-draft.json`（11 款 BCI/AS/SA 草稿）发上平台**——那是 `REFERENCE` 级未核实草稿，发布会污染数据资产。等工厂复核改 `PARTIALLY_VERIFIED` 后再并入正式 JSON 一并发布。

---

## 4. 行业目录 / 协会清单 + 回链建设策略

### 4.1 行业协会与组织（铅酸电池相关，`web_search` 核实存在）

| 组织 | 缩写 | 定位 | 对 Dingwei 的价值 |
|---|---|---|---|
| Battery Council International | BCI | 北美电池行业主导协会（Group 号标准方） | 若做北美市场，会员/目录收录是强信任信号；其 BCI Group 尺寸也是数据库权威来源 |
| Association of European Automotive and Industrial Battery Manufacturers | EUROBAT | 欧洲汽车/工业电池协会 | 欧洲市场信任 + 政策/合规信息源 |
| International Lead Association | ILA | 全球铅行业组织 | 铅酸电池可持续/回收议题背书 |
| Consortium for Battery Innovation | CBI | 电池创新联盟（研究型） | 技术内容引用与权威外链 |
| Canadian Battery Association | CBA | 加拿大电池协会 | 北美补充目录 |
| NAATBatt International | — | 北美先进电池联盟 | 技术/行业曝光 |
| Portable Rechargeable Battery Association | PRBA | 便携/可充电池 | 相关性较低，可选 |

> 说明：以上为**行业组织清单**，多数为付费会员制；「目录收录/会员」属外部动作，本交付物仅列清单，不代注册。是否入会需按目标市场 ROI 决策。

### 4.2 行业目录（可免费/低成本提交档案，制造回链）

- **通用 B2B 目录**：Alibaba / Made-in-China / Global Sources（见第 1 节）外的长尾目录（如 Kompass、Europages、EC21、TradeIndia 等）——免费或低价档可先铺，主要价值是「NAP 一致性 + 基础回链」。
- **电池垂直目录/站点**：电池规格数据站（batterystuff、batteryequivalents、batterysharks 等）——**不以买链接方式**，而是通过「开放数据 + 正确规格」被这些站引用（见 4.3）。
- **公司信息平台**：企业信息库（企查查/天眼查国内版、Crunchbase 国际版、LinkedIn 公司主页）——统一 NAP（名称/地址/电话/邮箱）是 AI 知识图谱识别的底层基础。

### 4.3 回链建设策略（诚实、无灰帽）

1. **数据资产回链（最高 ROI）**：发布 `battery-models.json` 到 GitHub/Kaggle/HF（第 3 节），数据被引用时自然产生回链与品牌提及——这是「用开放数据换权威」，不是买链接。
2. **NAP 一致性**：所有平台/目录的**公司名、品牌名、地址、邮箱域、电话**必须与官网 JSON-LD 完全一致（详见任务 #3 品牌一致性清单），避免 AI 知识图谱出现「Dingwei vs dinweys」实体分裂。
3. **行业内容合作**：向铅酸电池行业博客/媒体投稿技术文章（复用知识库内容：容器数学、再订货点、危险品合规），署名并回链官网——E-E-A-T 与回链双收益。
4. **协会/展会曝光**：入会后在协会会员目录展示官网；香港 Global Sources 展等线下场景沉淀可被引用的品牌页面。
5. **避免**：买链接、垃圾目录批量提交、论坛灌水——铅酸电池属 B2B 决策链长的品类，黑帽回链收益低且反噬信任。

---

## 附：本交付物局限（如实）

- 平台费用均为第三方转述/区间，**未**与平台官方商务确认，实际报价可能不同，落地前需询价。
- 未注册任何平台、未提交任何目录（无凭证 + 属外部动作），本文件仅为方案与可复用素材。
- 「18 条产线」「70+ 国家」沿用站点自身陈述，注册前建议与工厂台账核对。
- 行业组织清单为公开信息核实结果，是否具备会员资格/费用以各组织官方为准。
