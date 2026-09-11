# Dingwei Battery 本地化补译方案（建议 #5）

- **对象**：`https://dingweibattery.com`（es / ar / ru 三语种知识库本地化补译）
- **日期**：2026-09-11（UTC）
- **性质**：仅方案与样例稿，**不修改线上文件**
- **实测依据**：`web_fetch` 抓取 `sitemap-0.xml`（200，application/xml）逐条比对英文与 es/ar/ru 的 knowledge URL；`web_fetch` 抓取 es 首页/工厂页/知识页定位英文残留。所有清单与残留片段均为实测结果，未臆测。

---

## 1. 缺失文章清单（实测比对结果）

**基数确认（sitemap-0.xml 实测）：**

- 英文知识库 `/knowledge/*`：**36 篇**
- es `/es/knowledge/*`：**21 篇**
- ar `/ar/knowledge/*`：**21 篇**
- ru `/ru/knowledge/*`：**21 篇**

es/ar/ru 三语种现有 21 篇**完全同构**（slug 集合一致）。英文 36 篇减去本地化 21 篇，**每个语种缺 15 篇**，共 45 篇待补（三语种 × 15）。

**缺失的 15 篇（英文 slug + 实测英文标题）：**

| # | slug | 英文标题（实测 `<title>`） | 类型 |
|---|---|---|---|
| 1 | `battery-export-documentation` | Battery export documentation | 合规/文件 |
| 2 | `battery-group-size-chart` | Battery group size chart | 参考/选型 |
| 3 | `battery-import-regulations` | Battery import regulations by market | 合规 |
| 4 | `battery-shipping-guide` | Battery shipping, compliance and warranty: the complete guide | 决策/物流 |
| 5 | `battery-sourcing-guide` | How to source OEM batteries from China: the complete guide | 决策/采购 |
| 6 | `battery-specifications-guide` | Automotive battery specifications: the complete reference | 参考 |
| 7 | `battery-storage-shelf-life` | Battery storage and shelf life | 参考/质保 |
| 8 | `battery-supplier-verification` | Battery supplier verification | 决策/验厂 |
| 9 | `battery-voltage-6v-vs-12v` | 6V vs 12V batteries: system voltage explained | 参考 |
| 10 | `battery-warranty-claim-process` | Battery warranty claim process | 质保 |
| 11 | `china-battery-industry-regions` | China battery industry regions | 行业/背景 |
| 12 | `lead-acid-battery-dangerous-goods` | Lead-acid battery dangerous-goods classification | 合规/危险品 |
| 13 | `oem-battery-cost-breakdown` | OEM battery cost breakdown | 决策/成本 |
| 14 | `oem-battery-guide` | OEM battery manufacturing: the complete guide | 决策/入门 |
| 15 | `oem-battery-vs-aftermarket` | OEM vs aftermarket batteries | 决策/选型 |

> 证据：以上 15 个 slug 均出现于 `sitemap-0.xml` 的英文 `/knowledge/*` 集合、且**未出现**于 `/es/knowledge/*`、`/ar/knowledge/*`、`/ru/knowledge/*` 集合（实测比对）。英文标题逐篇 `web_fetch` 页面 `<title>` 实测，15/15 命中 200。

---

## 2. 本地化补译计划

### 2.1 分批策略（P0 决策型优先）

| 批次 | 优先级 | 收录文章（slug） | 理由 |
|---|---|---|---|
| **P0**（第一批，决策/成本/危险品） | 高 | `oem-battery-cost-breakdown`、`oem-battery-vs-aftermarket`、`battery-sourcing-guide`、`lead-acid-battery-dangerous-goods`、`battery-shipping-guide` | 采购决策链上的关键文章，直接影响询盘转化与合规信任 |
| **P1**（第二批，验厂/资质/选型） | 中 | `battery-supplier-verification`、`oem-battery-guide`、`battery-group-size-chart`、`battery-specifications-guide` | 支撑选型与供应商评估 |
| **P2**（第三批，合规/背景/长尾） | 低 | `battery-export-documentation`、`battery-import-regulations`、`battery-storage-shelf-life`、`battery-warranty-claim-process`、`battery-voltage-6v-vs-12v`、`china-battery-industry-regions` | 长尾查询与完整性收尾 |

> 建议：P0 四语种（含英文）同批交付，每批先人工审校一篇作「样板」，再复制术语与语气到其余。

### 2.2 术语一致性（术语表模板）

建立 `es / ar / ru` 三个术语表，锁定核心术语，避免同词多译。模板（示例，正式值由母语审校定稿）：

| 英文术语 | es | ar | ru | 备注 |
|---|---|---|---|---|
| OEM (Original Equipment Manufacturer) | OEM / fabricante de equipo original | OEM / صانع المعدات الأصلية | OEM / производитель оригинального оборудования | 首现扩写，后续用 OEM |
| Private label | marca privada | علامة خاصة | частная торговая марка | |
| CCA (Cold Cranking Amps) | CCA / corriente de arranque en frío | CCA / تيار التدوير البارد | CCA / ток холодной прокрутки | |
| Lead-acid battery | batería de plomo-ácido | بطارية الرصاص الحمضية | свинцово-кислотный аккумулятор | |
| Dangerous goods | mercancías peligrosas | بضائع خطرة | опасный груз | |
| MOQ (Minimum Order Quantity) | MOQ / cantidad mínima de pedido | MOQ / الحد الأدنى للطلب | MOQ / минимальный объём заказа | |
| Lead time | plazo de entrega | مهلة التسليم | срок поставки | |
| Case size / group size | tamaño de carcasa | حجم الهيكل | типоразмер корпуса | |
| Assembly line | línea de producción | خط الإنتاج | производственная линия | |
| Quality control | control de calidad | مراقبة الجودة | контроль качества | |

> 建议把术语表存为每个语种一个 `glossary-{es,ar,ru}.md`，随内容包一并交付审校。

### 2.3 QA 门（每篇上线前必须过三道）

1. **机器翻译人工审校**：机翻初稿 → 母语审校逐段改写（去掉直译腔、贴合当地采购语境）。
2. **英文残留检查**：正则扫 `[A-Za-z]{3,}` 连续英文串 + 常见残留短语（`automated lines`、`countries`、`per day`、`approx.`、`days after order confirmation`），逐条清零。
3. **术语一致性核对**：对照术语表检查，同一术语全站统一。

---

## 3. 英文残留清理清单（实测发现）

**方法**：`web_fetch` 抓取 es 首页、es 工厂页、es 知识页（`oem-battery-moq-lead-time`）正文，定位西班牙语正文中的英文片段。

| # | 位置 | 实测英文残留片段 | 说明 |
|---|---|---|---|
| 1 | `https://dingweibattery.com/es/`（首页数据卡） | `18 automated lines`（标签，西语值 `Líneas de producción`） | 数值卡英文标签未翻译 |
| 2 | `https://dingweibattery.com/es/`（首页数据卡） | `70+ countries`（标签，西语值 `Países de exportación`） | 同上 |
| 3 | `https://dingweibattery.com/es/factory/`（制造商档案「Instalación」） | `200,000 m², 18 automated lines` | 「automated lines」残留 |
| 4 | `https://dingweibattery.com/es/factory/`（「Producción diaria」） | `40,000 batteries per day` | 「per day」残留 |
| 5 | `https://dingweibattery.com/es/factory/`（「Mercados de exportación」） | `70+ countries, vía Tianjin / Shanghai` | 「countries」残留 |
| 6 | `https://dingweibattery.com/es/knowledge/oem-battery-moq-lead-time/`（正文「Qué determina el MOQ」） | `1 × 20ft container (approx. 600–800 units, model dependent)` | 整段英文未翻译 |
| 7 | `https://dingweibattery.com/es/knowledge/oem-battery-moq-lead-time/`（正文「Qué determina el plazo de entrega」） | `30–45 days after order confirmation` | 英文短语残留 |

> 说明：ar / ru 未逐页抓取正文（本次仅对 es 做残留定位示范）；建议补译时用同一正则方法对 ar/ru 全部 21 篇 + 新增 15 篇做一次全量扫描。以上 7 处为**实测**发现的 es 残留，非穷举。

---

## 4. 样例补译（每语种 1 段）

选「**OEM battery cost breakdown**（OEM 电池成本拆解）」为样例——决策型文章，直接服务采购比价。以下为每语种开头段 + 立场句，专业外贸语气，非机翻腔。

### 4.1 Español（es）

> Cuando compara cotizaciones de baterías de plomo-ácido, la diferencia casi nunca está en el "precio" que ve en pantalla, sino en la estructura de costos que hay detrás. El plomo de las placas representa entre el 60 % y el 70 % del costo; el resto se reparte entre separadores, carcasa, terminales, formación, mano de obra y certificación. Por eso, una cotización sospechosamente baja suele significar una de tres cosas: más plomo reciclado, placas más delgadas o menos certificación y pruebas. Antes de firmar, pida que le desglosen el vínculo con el precio del plomo (por ejemplo, indexado al LME) y que le confirmen la base de la CCA y el período de garantía —es ahí donde más se "esconde" el costo.

**Posición**：*En baterías de plomo-ácido, el precio más bajo rara vez es el mejor; lo que debe preguntar es cómo se indexa el plomo, cuál es la base de la CCA y qué cubre la garantía.*

### 4.2 العربية（ar）

> حين تقارن عروض أسعار بطاريات الرصاص الحمضية، نادرًا ما يكون الفارق في «السعر» الذي تراه أمامك، بل في هيكل التكلفة الذي يقف خلفه. فالرصاص في الألواح يمثّل ما بين 60% و70% من التكلفة، والباقي يتوزّع بين العوازل والهيكل والأقطاب وعملية التشكيل والعمالة والاعتماد. لهذا فإن السعر المنخفض بشكل مريب يعني غالبًا أحد ثلاثة أمور: نسبة أعلى من الرصاص المُعاد تدويره، أو ألواح أرقّ، أو اعتماد واختبارات أقل. قبل التوقيع، اطلب تفصيل آلية ربط السعر بسعر الرصاص (مثلًا بالربط بمؤشر LME)، واطلب تأكيد أساس قياس CCA وفترة الضمان — فهناك تُخفى التكلفة أكثر من غيرها.

**الموقف**：*في بطاريات الرصاص الحمضية، السعر الأدنى نادرًا ما يكون الأفضل؛ السؤال الصحيح هو: كيف يُربط سعر الرصاص، وما أساس CCA، وماذا يغطي الضمان؟*

### 4.3 Русский（ru）

> Когда вы сравниваете предложения на свинцово-кислотные аккумуляторы, разница почти никогда не в «цене» на экране, а в структуре себестоимости за ней. Свинец в пластинах составляет 60–70 % себестоимости; остальное — сепараторы, корпус, клеммы, формовка, труд и сертификация. Поэтому подозрительно низкая цена обычно означает одно из трёх: больше переработанного свинца, тоньше пластины или меньше сертификации и испытаний. Прежде чем подписывать, попросите раскрыть механизм привязки к цене свинца (например, к индексу LME) и подтвердить базу измерения CCA и срок гарантии — именно здесь чаще всего «прячут» затраты.

**Позиция**：*В свинцово-кислотных аккумуляторах самая низкая цена редко бывает лучшей; правильно спрашивать, как индексируется свинец, какая база CCA и что покрывает гарантия.*

---

## 附：本交付物局限（如实）

- 缺失清单与英文残留为 `web_fetch` 实测；`/knowledge/` 索引页本身返回 **404**（实测），故清单以 `sitemap-0.xml` 为准。
- ar/ru 正文未逐页抓取，残留清单仅覆盖 es 3 页（首页/工厂/1 篇知识页），不具穷举性。
- 样例补译是原创改写，未经母语审校，正式发布前须按 2.3 QA 门过审。
- 术语表模板值为示例，正式值以母语审校 + 品牌方统一为准。
