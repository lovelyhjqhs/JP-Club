# 建平中学 · 社团巡礼

上海市建平中学社团展示网站。项目由纯静态 HTML / CSS / JavaScript 构成，不需要构建工具或后端，通过 GitHub 托管源码并由 Netlify 自动部署。

## 页面

### 学校主页 `index.html`

- 建平中学整体形象与“社团巡礼”主题展示
- 学校简要介绍与基础数据
- JEEK 信息社、学生公司、篮球社、社会学社、魔幻化学社等社团快捷入口
- 通过顶部导航进入社团风采或 JPTI 页面

### 社团风采 `club.html`

集中展示学校社团，支持按名称、标签、关键词搜索，以及按全部、艺术、科技、体育、文化筛选。社团超过 12 个时可通过“展开更多社团”查看完整列表。

点击任意社团卡片会打开详情弹窗，展示：

- 社团名称、分类与标签
- 详细介绍、关键词和宣传信息
- 活动掠影 / 社团海报
- 联系文字或联系方式图片

网站还提供 `/club` 干净路径，通过 `_redirects` 指向 `club.html`。

### JPTI 人格测试 `jpti.html`

面向建平学生的校园风格人格小测试：

- 题目按 EI、NS、TF、JP 等维度分组并随机打乱
- 支持上一题 / 下一题、进度条和重新测试
- 根据答案计算四字母类型并给出类型代号、名称、描述和校园画像

## 技术栈

- 原生 HTML5、CSS3、JavaScript
- 无框架、无构建步骤、无第三方依赖
- 响应式布局，适配桌面与移动端
- 本地图片资源

## 目录结构

```text
.
├── index.html              # 学校主页
├── club.html               # 社团风采
├── jpti.html               # JPTI 人格测试
├── _redirects              # Netlify 重定向：/club -> /club.html
├── README.md
├── favicon.ico
├── apple-touch-icon.png
├── *.jpg / *.png           # 首页与各社团使用的图片
└── zonglan.docx            # 社团信息原始汇总文档
```

## 本地预览

直接双击打开 `index.html` 即可预览；跨页面跳转在部分浏览器中可能受本地文件限制，推荐启动一个静态服务器：

```bash
cd "C:/Users/lovel/Documents/JP club"
python -m http.server 8000
```

然后访问 `http://localhost:8000`。

## 部署

1. 将代码推送到 GitHub 仓库。
2. 在 Netlify 中导入该仓库并部署。
3. 构建命令留空，发布目录设为 `/`。
4. 仓库根目录的 `_redirects` 会自动启用 `/club` 干净路径。

推送到 GitHub 的 `main` 分支后，Netlify 会自动构建并更新线上网站。

## 维护内容

- 社团数据保存在 `club.html` 内联的 `allClubs` 数组中，新增或修改社团时可编辑对应对象。
- 社团卡片图、活动海报、联系方式图等均为仓库根目录的本地图片文件，通过 `img`、`img2`、`contactImg` 字段引用。
- 首页重点社团的圆形入口与快捷卡片指向 `club.html#<社团 id>`。
- JPTI 的题目在 `jpti.html` 的 `originalQuestions` 中，类型解释在 `results` 中。
