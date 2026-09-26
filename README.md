# 建平中学 · 社团巡礼

上海市建平中学社团与校园活动展示网站，包含学校主页、社团风采、930 游园会和 JPTI 人格测试四个页面。项目为纯静态网站，不需要构建工具或后端，源码托管在 GitHub，并由 Netlify 自动部署。

## 功能总览

全站共用 `site-tools.css` 和 `site-tools.js`，提供统一的导航、响应式布局、日间 / 夜间主题和中文 / English 切换。主题与语言选择会保存在浏览器 `localStorage` 中。

Netlify 通过根目录的 `_redirects` 提供以下访问路径：

| 页面 | 路径 |
| --- | --- |
| 学校主页 | `/` |
| 社团风采 | `/club` |
| 930 游园会 | `/yyh` |
| JPTI 人格测试 | `/jpti` |

## 页面说明

### 学校主页 `index.html`

- 建平中学整体形象与“社团巡礼”主题展示
- 学校简要介绍与基础数据
- JEEK 信息社固定置顶入口
- 每次加载时从社团宣传图池中随机抽取社团，填充其余圆形宣传入口
- 宣传图支持“原比例 / 正方形”展示模式，桌面端悬停查看，移动端左右滑动浏览
- 顶部导航可进入社团风采、游园会和 JPTI 页面

### 社团风采 `club.html`

集中展示学校社团，支持按社团名称、分类、简介、标签、关键词等实时搜索。社团超过 12 个时可通过“展开更多社团”查看完整列表。

点击任意社团卡片会打开详情弹窗，展示：

- 社团名称、分类与标签
- 详细介绍、关键词和宣传信息
- 活动掠影 / 社团海报
- 联系文字或联系方式图片

### 930 游园会 `yyh.html`

按班级展示 930 游园会的活动看点与海报，沿用社团风采页的视觉风格：

- 桌面端每行五张卡片，按 25 级（高二）和 26 级（高一）分栏展示，共 30 个班级
- 每张卡片显示班级编号、年级、活动看点和 1–3 个活动标签，海报按 3:4 比例裁切并懒加载
- 支持按年级筛选，以及按班级编号、主题、玩法或关键词实时搜索
- 支持桌游棋牌、解谜推理、诗词文史、剧本沉浸、语言表达、手工创作、音乐、益智专注、闯关集章、学科知识、班级联动、派对互动等标签筛选
- 搜索覆盖海报上的文字，`poster-text.js` 保存了各班海报的 OCR 索引，搜「诸葛亮」「五子棋」这类只出现在海报上的词也能找到对应班级
- 点击卡片打开详情弹窗，展示班级信息、活动看点和完整班级海报（部分班级有多张海报）
- 支持 `#2501` 形式的锚点直达对应班级

### JPTI 人格测试 `jpti.html`

面向建平学生的校园风格人格小测试：

- 35 道程度题按 EI、NS、TF、JP 四个维度分组并随机打乱
- 选择答案后自动进入下一题，也可手动切换上一题 / 下一题
- 提供进度条、维度提示、重新测试和一键返回首页
- 根据答案计算四字母类型，并给出类型代号、名称、描述和倾向百分比
- 绝大多数类型展示对应的校园画像图片；ISFP、ESTP 两种类型会尝试请求前置摄像头展示“实时画像”，需要浏览器摄像头权限

## 技术栈

- 原生 HTML5、CSS3、JavaScript
- 无框架、无构建步骤、无第三方运行时依赖
- 响应式布局，适配桌面与移动端
- 本地图片资源与全站共享工具脚本
- Python + RapidOCR 仅用于离线生成游园会海报文字索引

## 目录结构

```text
.
├── index.html                 # 学校主页
├── club.html                  # 社团风采
├── yyh.html                   # 930 游园会
├── jpti.html                  # JPTI 人格测试
├── site-tools.css             # 全站共享样式（主题、导航、响应式）
├── site-tools.js              # 主题切换与中英文文案
├── poster-text.js             # 游园会海报文字索引（自动生成）
├── _redirects                 # Netlify 干净路径配置
├── tools/                     # 海报文字索引生成脚本
│   ├── poster-text-rapidocr.py
│   ├── build-poster-text.js
│   └── poster-text-manual.json
├── 海报(1)/
│   ├── 25级/                  # 高二各班游园会海报
│   └── 26级/                  # 高一各班游园会海报
├── README.md
├── favicon.ico
├── apple-touch-icon.png
├── *.jpg / *.png              # 首页、社团与 JPTI 使用的图片
└── zonglan.docx               # 社团信息原始汇总文档
```

## 本地预览

直接双击打开 `index.html` 即可预览。由于跨页面跳转和摄像头相关功能在部分本地环境中可能受限，推荐启动一个静态服务器：

```bash
cd "C:/Users/lovel/Documents/JP club"
python -m http.server 8000
```

然后访问 `http://localhost:8000`。

## 部署

1. 将代码推送到 GitHub 仓库。
2. 在 Netlify 中导入该仓库并部署。
3. 构建命令留空，发布目录设为 `/`。
4. `_redirects` 会自动提供 `/club`、`/yyh` 和 `/jpti` 访问路径。

推送到 GitHub 的 `main` 分支后，Netlify 会自动部署新版本。

## 内容维护

### 社团信息

- 社团数据保存在 `club.html` 内联的 `allClubs` 数组中，新增或修改社团时编辑对应对象。
- 社团卡片图、活动海报、联系方式图等为仓库根目录的本地图片，通过 `img`、`img2`、`contactImg` 字段引用。
- 首页宣传图池定义在 `index.html` 的 `posterClubs` 数组中，可控制随机展示哪些社团。

### 游园会信息

- 班级数据保存在 `yyh.html` 的 `CLASSES` 数组中，包含班级编号、年级、主题、活动看点、标签和海报文件等字段。
- 海报原图放在 `海报(1)/25级` 和 `海报(1)/26级`，文件名以班级编号开头；新增海报后同步更新 `CLASSES` 数组。
- 班级标签保存在 `CLASS_TAGS` 对象中，可筛选标签清单是 `YYH_TAGS`，英文标签文案在 `TAG_EN` 对象中。

### 海报文字索引

`poster-text.js` 由 `tools/poster-text-rapidocr.py`（RapidOCR / PP-OCR 模型）和 `tools/build-poster-text.js` 生成。海报更新后重新生成：

```bash
python tools/poster-text-rapidocr.py --root "海报(1)" --out .tmp-poster-text.txt
node tools/build-poster-text.js .tmp-poster-text.txt poster-text.js
```

识别依赖（一次性安装）：

```bash
python -m pip install rapidocr-onnxruntime onnxruntime opencv-python-headless pyclipper shapely pillow numpy
```

网络较慢时可以使用镜像：`-i https://repo.huaweicloud.com/repository/pypi/simple`。

OCR 结果只用于搜索，不直接展示。个别海报以图形为主、识别不出文字（如 2515），或识别残缺（如 2506），这类文案写进 `tools/poster-text-manual.json`（键为班级编号），生成索引时会与 OCR 结果合并，重新跑 OCR 不会丢失手工补充内容。

### 全站文案与测试题目

- JPTI 的题目在 `jpti.html` 的 `originalQuestions` 中，类型解释在 `results` 中。
- JPTI 类型画像按 `intj.jpg`、`entp.jpg` 等小写类型名存放在仓库根目录。
- 中英文文案集中在 `site-tools.js` 的 `dict` 对象中，`[data-i18n]` 属性负责页面元素与文案键的映射。
