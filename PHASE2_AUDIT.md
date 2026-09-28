# Dingwei Battery — Phase 2 审计报告（PHASE2_AUDIT）

**日期**：2026-09-28 · **流程**：SCAN → AUDIT → FIX → BUILD → RE-SCAN → VERIFY
**站点**：https://dingweibattery.com + https://docs.dingweibattery.com

---

## 审计范围

- en 页面 64 个（全语言 325 个 astro 页，ar/es/ru/zh 四语言）
- 数据库：34 个电池型号（battery-models-seed.json）
- Schema：BaseLayout(Organization) / index(WebSite+BreadcrumbList) / data(Product+Dataset) / 部分页面 BreadcrumbList
- Knowledge Hub：37 篇
- Compare：7 组对比（en 6 组 + index）
- OEM 商业页：/oem/ /oem/car-batteries/ /oem/truck-batteries/ /private-label/ /factory/ /shipping-compliance/ /warranty/

## Entity 现状（已基本健康）

| 实体 | 定义 | 状态 |
|---|---|---|
| Brand | `Dingwei Battery`（site.ts BRAND 常量）| ✅ 全站统一，无「Dingwei Battery Co.」变体 |
| Manufacturer | `Chengguang Power Tech Co., Ltd.`（legalNameZh 晋州成光电源有限公司）| ✅ 202+ 处一致 |
| Chengguang Energy | 不存在 | ✅ 0 处（无混淆风险）|
| Organization schema | 使用 MANUFACTURER.name | ✅ 正确（法人实体）|

## P0 Critical（必须修复）

### P0-1: Product schema `availability: InStock` 无证据
- **URL**: /data/[model]/（全部 34 个型号页）
- **Problem**: schema 声明 `availability: InStock`，但这是 OEM/询价产品，页面无库存声明，商业 CTA 是询价模式
- **Evidence**: src/pages/data/[model]/index.astro:103；页面显示「Indicative minimum unit price From US$80」+ 询价 CTA
- **Fix**: 移除 availability（询价产品不声明库存）；price 保留（页面可见指示价，schema 与可见内容一致）
- **Impact**: 消除 Rich Results 误判风险，符合任务书「不要伪造 availability」

### P0-2: Finder 描述型号数错误（23 vs 34）
- **URL**: /tools/battery-finder/
- **Problem**: meta description 硬编码「Filter 23 reference battery models」，数据库实际 34 个
- **Fix**: 动态计数或改文案（去掉硬编码数字）
- **Impact**: 数据一致性；description 准确

## P1 Important

### P1-1: 7 个孤儿页（无内链指向）
- /applications/light-commercial-vehicle
- /compare/105d31-vs-115d31
- /compare/55b24-vs-65b24
- /compare/agm-vs-efb
- /knowledge/why-same-ah-different-cca
- /privacy
- /terms
- **Fix**: 从相关页面补内链（compare index→各对比页、首页/知识页→privacy/terms、应用页互链）

### P1-2: 数据状态标注已达标（核查确认）
- confidence: REFERENCE(20) / PARTIALLY_VERIFIED(14)；verification_status LEVEL 1-4
- CCA basis 正确区分 JIS(-15°C)/EN(-18°C)/SAE J537(-18°C)
- fitment 已标注「compatible reference — not an OEM-confirmed fitment」✅

### P1-3: 危险品声明已达标（核查确认）
- 已正确区分铅酸(Class 8, UN 2794/2800) vs 锂电(Class 9, UN 3480/3481)，无绝对化结论 ✅

## P2 Enhancement（有价值项）

- WebSite schema 已在各语言首页 ✅
- Dataset schema 已在 /data/ 索引 ✅
- Title 抽查合格（无关键词堆砌）✅

---

**结论**：站点基础健康。P0 仅 2 项（availability 移除 + finder 数字），P1 核心是孤儿页补链。
