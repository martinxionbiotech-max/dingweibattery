# Dingwei Battery — 数据一致性修复交付物（建议 #4）

- **对象**：`https://dingweibattery.com`（营销文案 vs `/data/battery-models.json` 数据库）
- **日期**：2026-09-11
- **性质**：仅产出「新增型号数据草稿」与「收窄文案替代措辞」，**未修改任何线上文件**

---

## 1. 问题确认

站点营销文案宣称「覆盖 **JIS、DIN、BCI、AS、SA 五大标准**」，但实测 `battery-models.json`（23 款）实际只有：

| 标准 | 现有型号数 | 型号示例 |
|---|---|---|
| JIS（D 5301） | 14 | 65D26 / 80D26 / 105D31 / 55B24 / N150 / N200 / N100… |
| DIN/EN（EN 50342） | 9 | H5 / H6 / H7 / H8 / DIN70 / DIN72 / DIN75 / DIN80 / DIN100 |
| **BCI** | **0** | — |
| **AS（澳洲）** | **0** | — |
| **SA（南非/SAE）** | **0** | — |

**结论**：宣称「五大标准」与可引用数据（只有两大标准）不一致，会削弱对北美/澳新/南非采购商的信任。修复有两条路，二选一或都做：

- **路线 A（补数据）**：为数据库补充 BCI/AS/SA 型号 → 见 `dingwei-bci-models-draft.json`。
- **路线 B（收窄文案）**：把「覆盖五大标准」改为与实际一致的表述 → 见第 3 节。

---

## 2. 新增型号数据草稿（路线 A）

已产出：`/home/openclaw/.openclaw/workspace-main/dingwei-bci-models-draft.json`

共 **11 款**草稿，字段与现有 schema 完全对齐：

| 标准 | 型号 | 电压 | 容量(Ah) | CCA | 尺寸(mm) | 来源 |
|---|---|---|---|---|---|---|
| BCI | Group 24 | 12V | 70 | 550 | 260×173×225 | BCI 24 size chart |
| BCI | Group 27 | 12V | 90 | 750 | 306×173×225 | batteryequivalents |
| BCI | Group 31 | 12V | 100 | 900 | 330×173×240 | BCI 31 size chart |
| BCI | Group 48 (H6) | 12V | 72 | 730 | 278×175×190 | batterysharks + H6 cross-ref |
| BCI | Group 49 (H8) | 12V | 96 | 900 | 353×175×190 | batterysharks + H8 cross-ref |
| BCI | Group 65 | 12V | 75 | 850 | 306×192×192 | batterysharks + batteryequivalents |
| AS | N70ZZ | 12V | 85 | 720 | 305×171×202 | Century/Yuasa N70ZZ MF datasheet |
| AS | N70 | 12V | 75 | 680 | 305×171×202 | Exide Endurance N70 datasheet |
| SA | 646 | 12V | 58 | 465 | 242×175×190 | Alberton Battery Mart + Kariba |
| SA | 657 (657C) | 12V | 80 | 800 | 276×175×190 | battery.co.za + Willard/Kariba |
| SA | 668 | 12V | 80 | 730 | 278×175×190 | Goldwagen + Kariba |

### 关键约束（务必人工复核）
- **全部标 `REFERENCE` 置信度**，来源为公开标准/竞品 datasheet，**未**经晋州成光技术团队实测确认。
- **端子/极性**：现有数据库这两项均为 `null`；草稿中 BCI/AS/SA 统一写了「SAE top-post (typical; verify)」，需工厂确认实际端子类型（BCI Group 24/27/31 常见 SAE 顶部端子，部分有 Marine 双端子；SA 类型号为欧式/南非式端子需核实）。
- **CCA 值**：BCI/AS/SA 的 CCA 测试基准为 SAE J537（-18°C），与现有 JIS（-15°C）/EN（-18°C）基准不同，不可直接横向比较，需在正式页面标注基准。
- **Group 24 尺寸**：公开来源有差异（标准车用约 260×173×225mm，深循环变体 237×173×173mm），草稿取车用主流值，需按工厂实际开模确认。

### 关于「SA」标准的诚实说明
「SA」在铅酸电池行业语境有歧义，可能是：
1. **SAE**（美国汽车工程师学会，SAE J537 冷启动标准）——是一种**测试评级基准**，不是外壳规格体系；
2. **South Africa**（南非类型号 646/647/652/657/668…）——是一套**型号命名体系**。

草稿按「南非类型号」落地了 3 款（最可执行的解释），同时把 BCI 系列的 CCA 基准统一标为 SAE J537，两义都覆盖。**建议正式文案中把「SA」明确写为「South Africa / SAE」或直接改为「SAE 冷启动评级」，避免歧义。**

---

## 3. 收窄文案替代措辞（路线 B，若暂不补数据）

**原文（需改）**：
> 覆盖 JIS、DIN、BCI、AS、SA 五大标准

**替代 A（诚实收窄，推荐）**：
> 产品线覆盖 JIS（日本工业标准）与 DIN/EN（欧洲标准）两大主流体系，并可按客户要求开发 BCI（北美）、澳洲 N 型与南非类型号等区域标准规格。

**替代 B（更短）**：
> 现有型号数据库覆盖 JIS 与 DIN/EN 标准；BCI、AS、SA 等区域标准可按 OEM 项目定制开发。

**替代 C（面向北美/澳新采购商，配合路线 A 补数据后再用）**：
> 覆盖 JIS、DIN/EN、BCI（Group 24/27/31/48/49/65）、澳洲 N 型与南非类型号等多区域标准。

> 建议：**先上替代 A**（零成本、立即消除不一致），待数据草稿经工厂复核后，再切换为替代 C 并同步上线补数据。

---

## 4. 下一步人工部署动作

1. **工厂技术团队**逐项复核 `dingwei-bci-models-draft.json` 中 11 款的容量/CCA/尺寸/端子/重量，确认实际可生产；
2. 复核通过后，将 `confidence` 由 `REFERENCE` 改为 `PARTIALLY_VERIFIED`，`source` 补入工厂实测记录；
3. 合并进正式 `battery-models.json`，并按现有 `/data/{model}/` 模板为每个新型号生成详情页 + Product JSON-LD；
4. 更新 `battery-finder` 工具的标准筛选选项（新增 BCI/AS/SA）；
5. 同步替换营销文案（先替代 A，后视情况切替代 C）。

---

## 5. 证据来源（如实）

- `battery-models.json` 字段结构 + 23 款型号：`web_fetch` 实测 `https://dingweibattery.com/data/battery-models.json`（200，application/json）。
- BCI Group 24/27/31/48/49/65 尺寸/容量/CCA：`batteryequivalents.com/bci-battery-group-size-chart.html`、`batterysharks.com/blog/bci-group-numbers`、`bslbatt.com`、`batterystuff.com/kb/tools/bci-battery-group-sizes.html`。
- AS（澳洲）N70ZZ/N70：`centurybatteries.com.au/products/n70zz-mf`、`yuasabatteries.com.au/products/n70zz-mf`、`exidebatteries.com.au/product/exide-n70zz`。
- SA（南非）646/657/668：`albertonbatterymart.co.za/646-car-battery`、`battery.co.za/product/657c`、`karibabatteries.co.za`、`goldwagen.com`。
- 注：`crt.sh` 证书透明查询仍 502（本次未使用）。
