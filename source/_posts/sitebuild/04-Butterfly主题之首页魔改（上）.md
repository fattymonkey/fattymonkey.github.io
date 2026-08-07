---
title: Butterfly主题之首页魔改（上）
date: 2023-04-04 08:06:18
updated: 2026-04-04 19:33:58
description: 给Butterfly主题首页进行细致的个性化魔改
categories:
  - 建站实录
tags:
  - Hexo
  - Butterfly
  - Stylus
  - Pug
abbrlink: 10404
cover: img/covers/sitebuild/04.webp
---



{% note warning %}

声明：我这里魔改的 Butterfly 版本是 5.6.1，其他版本可能存在偏差，请注意甄别！

{% endnote %}



# 第一节：自定义样式

在魔改主题的时候，避免不了的就是修改样式（修改主题源码或者新增自己的样式），修改源码就不说了，那么该怎么增加自己的样式文件呢？在 Butterfly 主题中，增加自定义样式有两种方式，下面分别介绍一下！

## 1.01：样式注入

样式注入是 Butterfly 提供和推荐的一种方式，主题的配置文件中，暴露出一个配置项`inject`：

```yaml
# Inject
# Insert the code to head (before '</head>' tag) and the bottom (before '</body>' tag)
inject:
  head:
    # - <link rel="stylesheet" href="/xxx.css">
  bottom:
    # - <script src="xxxx"></script>
```

首先，在主题根目录（博客根目录也可以）下的`/source/css/`文件夹中创建自己的样式文件，比如`custom.styl`；

然后，在主题配置文件的`inject`中进行如下配置：

![](https://img.czblogs.cn/posts/sitebuild/04/image-20260728183316996.webp)

这样一来，当执行`hexo generate`命令后，会在博客根目录下生成`/css/custom.css`文件，并被引入到项目中！

## 1.02：源码引入

使用样式注入时，最终会产生额外的样式文件（除原本的`index.css`以外），而下面这个做法则不会产生多余的样式文件，会将文件中自定义的样式代码合并到`index.css`文件中！

首先，最终生成的`index.css`文件是由主题根目录下的`/source/css/index.styl`文件生成的，在最后增加：

```stylus
// 引入自定义样式
@import '_custom/*'
```

然后在主题根目录下的`/source/css/`中创建一个名为`_custom`的文件夹，并在其中新建文件`custom.styl`，这样一来，不管以后在该文件夹中添加任意样式文件，都会被引入到`/source/css/index.styl`文件中，并且编译生成的样式代码会放在网站 index.css 的最后。

## 1.03：我的选择

对于这两种方式，根本的区别在于前者会生成多个样式文件，后者只会生成一个。如果不考虑主题升级，我强烈建议使用第二种方式，因为这样的话，浏览器只有一次 CSS HTTP 请求。后面所有的魔改，如果需要自定义样式，我都会用源码引入的方式将其引入到我的博客项目中！



# 第二节：主题的颜色

作为一个深度强迫症，对于主题颜色这种能明显体现主题特点的部分，毫无疑问是要修改的！Butterfly 主题有深色模式和浅色模式两种，先来分析一下主题原本的颜色实现逻辑！

## 2.01：默认逻辑

首先，在 /source/css/var.styl 文件中定义颜色变量，比如：

```yaml
$body-bg = #fff
$font-black = #4C4948
```

浅色模式的颜色取自文件 /source/css/_global/index.styl 中的`:root`，比如：

```stylus
:root
  --global-bg: $body-bg
  --font-color: $font-black
  --hr-border: lighten($theme-hr-color, 50%)
  --hr-before-color: lighten($theme-hr-color, 30%)
```

深色模式的颜色取自文件 /source/css/_mode/darkmode.styl 中的`data-theme='dark'`：

```stylus
if hexo-config('darkmode.enable') || hexo-config('display_mode') == 'dark'
  [data-theme='dark']
    --global-bg: darken(#121212, 2)
    --font-color: alpha(#FFFFFF, .7)
    --hr-border: alpha(#FFFFFF, .4)
    --hr-before-color: alpha(#FFFFFF, .7)
```

最后，在主题 UI 相应的`.styl`文件中，在设置颜色时通过`var()`来适配不同模式的颜色值，如`var(--global-bg)`。

## 2.02：我的思路

我的思路如下：

- 将自定义主题颜色（深/浅）全部定义到 themes/butterfly/source/css/var.styl 中，然后在上述两个文件中通过变量名来获取不同的颜色值；
- 对于适配深浅模式的颜色，先在上述两个文件中定义同名的全局变量（形如`--monkey-card-bg`），然后在对应的样式代码中使用`var`来获取（如`var(--monkey-card-bg)`）；
- 这样一来，后面要修改某个颜色的时候，就只需要修改 var.styl 这一个文件就可以了。

至于细节的实现，我这里就不详细记载了（~~修改的地方比较多，不好记录~~）。



# 第三节：设置一图流

## 3.01：何为一图流

Butterfly 首页由导航栏、顶部图、网站背景、页脚这四部分组成，经过前面的设置：

- 网站默认的头图`default_top_img: /img/top_img/whale.webp`；
- 网站背景`background: /img/background/whale.webp`；
- 页脚透明`footer_img: transparent`；
- 头图和页脚的遮蔽色`mask->header: true`和`mask->footer: true`：

现在的样式如下：

![](https://img.czblogs.cn/posts/sitebuild/04/image-20260728182656189.webp)

所谓一图流，就是将整个网站都设置为一张图，具体就是：

- 去掉网站默认的头图；
- 页脚透明带有遮罩（上图中的效果，已经不需要修改了）；

## 3.02：设置一图流

**第一步：在主题设置文件中，设置网站背景图片（之前已经设置过，保持不变）**

```yaml
# Website Background
# Can set it to color, image URL or an array containing colors and/or image URLs
# If an array is provided, a random background will be selected from the array on each load
background: /img/whale.webp
```

**第二步：在主题配置文件中，取消默认顶部图的配置（之前设置过的，现在取消）**

```yaml
# If the banner of page not setting, it will show the default_top_img
default_top_img: # /img/top_img/whale.webp 设置一图流后，取消默认头图
```

**第三步：在主题配置文件中，设置透明+遮罩（之前已经设置过，保持不变）**

```yaml
# The background image of footer
footer_img: transparent
```

```yaml
mask:
  header: true # 头部添加遮罩
  footer: true # 页脚添加遮罩
```

**第四步：修改主题样式，取消顶部图背景颜色**

主题提供的配置：

- `disable_top_img`：顶部图全局开关，默认 false。若设置为 true 的话，页面顶部图完全消失，顶部图原本应该占的位置也完全消失，看起来不美观；
- `default_top_img`：默认的顶部图，默认留空。若配置的话，当没有其他配置干扰的情况下，所有页面的顶部图都是这个；
- `index_img`、`archive_img`、`tag_img`、`tag_per_img`、`category_img`、`category_per_img`，这几个配置项默认留空，若配置的话，对应页面的顶部图就展示为配置的图片；
- 对于菜单页，如果在 Front-matter 中设置了`top_img`，顶部图显示为配置的图片，若没有，显示主题默认蓝色；
- 对于文章页，如果在 Front-matter 中设置`top_img`或`cover`，顶部图显示为配置的图片（前者优先级高），否则显示主题默认蓝色；

可见，只要取消顶部图位置加载系统默认蓝色，并且不设置`top_img`和`cover`，那就可以实现顶部图透明了。打开主题根目录下的 /source/css/_layout/head.styl 文件，找到下面这段，并删掉第4行的背景颜色样式：

```stylus
#page-header
  position: relative
  width: 100%
  background-color: $light-blue // 删掉这一行
  background-position: center center
  background-size: cover
  background-repeat: no-repeat
  transition: all .5s
```

**第五步：关于文章页的处理**

经过以上的魔改后，所有的页面都成为一图流了（前提是这些页面不设置`top_img`和`cover`），对于首页等菜单页而言，不设置`top_img`是一图流的基本要求；对于文章页而言，`cover`是必须设置的，因为它负责所有文章卡片的填充。

但现在有个问题：一旦文章页设置了`cover`，或主题配置文件中设置了默认的`cover`，那么文章页的顶部图就会展示配置的图片，也就是说，文章页没实现一图流。

对于文章页是否展示顶部图，各有各的看法，有人认为文章页展示 cover 图比较好，有人认为文章页不展示 cover 才是完整的一图流。我的逻辑是：如果我想给这篇文章显示顶部图，我就配置 top_img，如果我不想，就不配置 top_img，也就是说，仅通过 top_img 来决定文章页的顶部图。

打开主题根目录下的 /source/layout/includes/header/index.pug 文件，进行如下修改：

![](https://img.czblogs.cn/posts/sitebuild/04/image-20260728184316206.webp)

## 3.03：优化一图流

存在问题：顶部图和页脚的遮蔽色是固定不变的，但是针对不同的网站背景，需要调整不同的遮蔽色

解决办法：遮蔽色分为浅色模式和深色模式两种，按照本文 2.2 中的思路来进行调整。

**第一步：在全局变量文件中自定义遮蔽色**

在 /themes/butterfly/source/css/var.styl 文件中添加两个遮蔽色：

```stylus
$monkey-black = #000000
$monkey-light-mark-bg = alpha($monkey-black, .5)
$monkey-dark-mark-bg = alpha($monkey-black, .2)
```

**第二步：在深浅模式的变量文件中定义同名变量**

打开 themes/butterfly/source/css/_global/index.styl 文件，新增定义：

```stylus
--monkey-mark-bg: $monkey-light-mark-bg
```

打开 themes/butterfly/source/css/_mode/darkmode.styl 文件，新增定义：

```stylus
--monkey-mark-bg: $monkey-dark-mark-bg
```

**第三步：在对应的组件中，修改遮蔽色**

修改头部遮蔽色，打开文件 themes/butterfly/source/css/_layout/head.styl 文件，找到下面这段并修改

```stylus
  if hexo-config('mask.header')
    &:not(.not-top-img):before
      position: absolute
      width: 100%
      height: 100%
      // 修改为自定义颜色
      background-color: var(--monkey-mark-bg)
      content: ''
```

修改页脚遮蔽色，打开文件 themes/butterfly/source/css/_layout/footer.styl 文件，找到下面这段并修改

```stylus
  if hexo-config('footer_img') != false && hexo-config('mask.footer')
    &:before
      position: absolute
      width: 100%
      height: 100%
      // 修改为自定义颜色
      background-color: var(--monkey-mark-bg)
      content: ''
```

## 3.04：卡片透明度

<font color=red>一图流的“终极形态”就是将博客中所有的卡片都设置为半透明</font>！Butterfly 主题的页面都是由一个个卡片组装起来的，将这些卡片设置为半透明以后，会让网站的背景图片更完美的呈现出来！

**第一步：在全局变量文件中自定义卡片背景**

在 /themes/butterfly/source/css/var.styl 文件中添加两个卡片背景色：

```stylus
$monkey-white = #FFFFFF
$monkey-light-card-bg = alpha($monkey-white, .75)
$monkey-dark-card-bg = alpha(#121212, .6)
```

**第二步：在深浅模式的变量文件中定义同名变量**

打开 themes/butterfly/source/css/_global/index.styl 文件，新增定义：

```stylus
--monkey-card-bg: $monkey-light-card-bg
```

打开 themes/butterfly/source/css/_mode/darkmode.styl 文件，新增定义：

```stylus
--monkey-card-bg: $monkey-dark-card-bg
```

**第三步：修改卡片背景色**

比如修改主页文章列表的卡片时，先找到设定它样式的文件 themes/butterfly/source/css/_page/homepage.styl，发现里面没有对应的代码，只找到了：

![](https://img.czblogs.cn/posts/sitebuild/04/image-20260729135923859.webp)

这才发现，原来 Butterfly 主题所有卡片样式都在 themes/butterfly/source/css/_global/function.styl 中定义的，修改为：

```stylus
// card hover
.cardHover
  background: var(--monkey-card-bg) // 自定义卡片背景
  box-shadow: var(--card-box-shadow)
  transition: all .3s
  addBorderRadius(8)
```



# 第四节：设置字体栈

## 4.01：先验知识

网页的字体是通过`font-family`来设定的，Butterfly 主题在`/source/css/var.styl`文件中定义了一些变量：

```stylus
// font
$chineseFont = $language == 'zh-CN' ? 'Microsoft YaHei' : 'Microsoft JhengHei'
$default-font-family = -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Lato, Roboto, 'PingFang SC', $chineseFont, sans-serif
$default-code-font = consolas, Menlo, monospace, 'PingFang SC', $chineseFont, sans-serif
$font-family = hexo-config('font.font_family') ? unquote(hexo-config('font.font_family')) : $default-font-family
$code-font-family = hexo-config('font.code_font_family') ? unquote(hexo-config('font.code_font_family')) : $default-code-font
$site-name-font = hexo-config('blog_title_font.font_family') && unquote(hexo-config('blog_title_font.font_family'))
```

然后在`/source/css/_global/index.styl`中进行了设定：

```stylus
body
  position: relative
  overflow-y: scroll
  min-height: 100%
  background: var(--global-bg)
  color: var(--font-color)
  font-size: var(--global-font-size)
  font-family: $font-family
  line-height: $text-line-height
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
  scroll-behavior: smooth
```

`font-family`的工作原理我就不废话了，总而言之，Butterfly 主题总能匹配到访客本地浏览器安装的字体，不需要从网上另行加载字体并用来显示！

可见，默认情况下，Butterfly 主题会针对不同的系统使用不同的字体，比如在 Mac 上使用的是`-apple-system`，即苹果系统默认的字体，而在 Windows 上，则至少会有微软雅黑来兜底！

## 4.02：我的执念

最一开始，我无法忍受我的博客在不同的访客那里展示的字体不同，强迫症推动我去研究网站字体的相关知识，如字体选择（研究了各种常见的字体）、字体引入（浏览器如何引入字体）、字体设置（样式文件设置字体族）等。但一番折腾下来，我慢慢觉得自定义字体似乎是一件没那么必要的事情，因为：

1. 自定义字体，浏览器需加载额外的字体文件，中文字体文件一般很大，会严重拖慢网页加载速度（主要原因）；
2. 我相中的字体都不能免费商用，比如苹方（PingFang SC）等优秀字体；

所以我就放弃了。但随着魔改的深入，我越来越想把主题的字体换掉，并且意识到应该在魔改的一开始就把字体换掉，因为字体对整体的主题效果影响很大！这是我一直以来的执念，但苦于中文字体文件过大（严重拖慢网页加载速度）这个硬伤，我一直忍着！

直到有一天，我突然灵感一现，既然字体文件中是一个个字形（Glyphs），那整个字体文件中一定包含了大量我网站中没有用到的字符，这部分字符对于我而言就是多余的。这样的话，为什么不能只保留我网站中用到的字符，而把这些多余的字符删掉呢？这样的话我的字体文件不就小很多了吗？说干就干。

## 4.03：下载字体

我选择的字体是 Glow Sans（未来荧黑），访问它的 [GitHub官方地址](https://github.com/welai/glow-sans)，在 Releases 页进行下载：

![](https://img.czblogs.cn/posts/sitebuild/04/image-20260729152022007.webp)

选择下载 Normal（标准宽度）字体文件，解压后会得到多个文件：

```tex
GlowSansSC-Normal-Bold.otf
GlowSansSC-Normal-Book.otf
GlowSansSC-Normal-ExtraBold.otf
GlowSansSC-Normal-ExtraLight.otf
GlowSansSC-Normal-Heavy.otf
GlowSansSC-Normal-Light.otf
GlowSansSC-Normal-Medium.otf
GlowSansSC-Normal-Regular.otf
GlowSansSC-Normal-Thin.otf
```

每个文件对应不同字重（粗细）：

| 文件名后缀 | 字重英文   | 数字权重 | 视觉效果                 | Butterfly 主题使用情况                                       |
| ---------- | ---------- | -------- | ------------------------ | ------------------------------------------------------------ |
| Thin       | Thin       | 100      | 极细                     | 极少用，不建议网页加载                                       |
| ExtraLight | ExtraLight | 200      | 超细                     | 基本不用，移动端渲染脆弱                                     |
| Light      | Light      | 300      | 细体                     | 次要小字可选                                                 |
| Regular    | Regular    | 400      | 标准常规                 | 传统正文基准                                                 |
| Book       | Book       | 450      | 介于常规和中等粗之间     | <font color=red>正文首选</font>，屏幕阅读舒适感优于 Regular  |
| Medium     | Medium     | 500      | 中等粗                   | 不必加载                                                     |
| Bold       | Bold       | 700      | 标准粗体                 | <font color=red>粗体首选</font>，标题、导航栏、正文加粗等用这套字重 |
| ExtraBold  | ExtraBold  | 800      | 超粗，厚重醒目           | 必选：首页标题、文章封面大字                                 |
| Heavy      | Heavy      | 900      | 最重黑度，视觉冲击力极强 | 超大标题、标语                                               |

整个 Butterfly 主题只要求了两种字重：normal 和 bold，也就是 400 和 700，但是因为未来荧黑的 450 阅读感更好，选择用 450 的替代 400。所以这些文件中，我只需要 GlowSansSC-Normal-Book.otf 和 GlowSansSC-Normal-Bold.otf。

## 4.04：创建目录

在博客根目录下的 source 文件夹中新建名为 fonts 的文件夹，并将需要的字体文件放入其中：

![](https://img.czblogs.cn/posts/sitebuild/04/image-20260729161819915.webp)

## 4.05：安装工具

为了实现我的设想，至少需要两个工具：

- [cheerio](https://cheerio.js.org/)：提取网页中用到的所有文字；
- [fonttools](https://github.com/fonttools/fonttools)：根据已有的字体，裁剪全量的字体文件，并最终输出 woff2 格式的字体文件；

打开终端，直接执行如下命令来全局安装 cheerio：

```shell
npm install -g cheerio
```

![](https://img.czblogs.cn/posts/sitebuild/04/image-20260729195517294.webp)

工具 fonttools 可以通过 pip 来安装：

```shell
pip3 install fonttools
```

![](https://img.czblogs.cn/posts/sitebuild/04/image-20260729183408725.webp)

此外，运行 fonttools 还需要依赖 brotli，所以还得安装它：

```shell
pip3 install brotli
```

![](https://img.czblogs.cn/posts/sitebuild/04/image-20260729183707302.webp)

## 4.06：创建脚本

首先，在本地博客根目录下的 source/fonts 文件夹中创建名为 /scripts/extract-font-glyphs.js 的脚本文件，这个脚本用来给 cheerio 提供参数的，作用是将全站用到的字形都提取到 /source/fonts/all-font-glyphs.txt 文件中：

```javascript
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// 生成的静态页面根目录
const publicDir = path.resolve(__dirname, '../../public');
// 输出：全站去重字符清单
const charOutputFile = path.join(__dirname, 'all-font-glyphs.txt');

let allRawText = '';

// 递归遍历读取所有html页面文字
function scanAllHtml(dirPath) {
  const fileList = fs.readdirSync(dirPath);
  fileList.forEach(fileName => {
    const fullFilePath = path.join(dirPath, fileName);
    const stat = fs.statSync(fullFilePath);
    // 递归进入子文件夹
    if (stat.isDirectory()) {
      scanAllHtml(fullFilePath);
      return;
    }
    // 只处理html后缀文件
    if (!fileName.endsWith('.html')) return;
    try {
      const htmlContent = fs.readFileSync(fullFilePath, 'utf8');
      const $ = cheerio.load(htmlContent, {
        decodeEntities: false,
        scriptingEnabled: false
      });
      // 移除不需要的区块，避免抓取脚本、样式、代码
      $('script, style, noscript, template, pre, figure.highlight').remove();

      // 页面正文
      allRawText += $('body').text();
      // 追加 alt title aria-label 文字
      $('[alt]').each((_, el) => allRawText += $(el).attr('alt') || '');
      $('[title]').each((_, el) => allRawText += $(el).attr('title') || '');
      $('[aria-label]').each((_, el) => allRawText += $(el).attr('aria-label') || '');
    } catch (err) {
      console.warn(`文件解析跳过：${fullFilePath}，错误：${err.message}`);
    }
  });
}

// 执行全站扫描
scanAllHtml(publicDir);

// 只保留中文字符【重要！你原版脚本缺少这一步，混杂大量符号英文】
const chineseReg = /[\u4e00-\u9fa5]/g;
const onlyChineseList = allRawText.match(chineseReg) || [];

// 字符去重
const uniqueCharSet = new Set(onlyChineseList);
const uniqueCharString = [...uniqueCharSet].sort().join('');

// 自动创建目录，解决文件夹不存在报错
fs.mkdirSync(path.dirname(charOutputFile), { recursive: true });
fs.writeFileSync(charOutputFile, uniqueCharString, 'utf8');

console.log(`  ===================== ✅ 全站字形提取已经完成,共收集：${uniqueCharString.length} 个汉字 =`);
```

## 4.07：裁剪流程

**第一步：生成全站的静态网页**

打开终端，切换到本地博客根目录下，执行如下命令：

```shell
hexo clean && hexo generate
```

**第二步：切到脚本所在目录**

```shell
cd source/fonts/
```

**第三步：执行文字提取脚本，生成 all-font-glyphs.txt 文件**

```shell
NODE_PATH=$(npm root -g) node extract-font-glyphs.js
```

![](https://img.czblogs.cn/posts/sitebuild/04/image-20260729201723873.webp)

**第四步：裁剪常规字体文件，输出 woff2 字体文件到当前目录**

接着执行如下命令：

```shell
pyftsubset GlowSansSC-Normal-Book.otf --text-file=all-font-glyphs.txt --flavor=woff2 --output-file=GlowSansSC-Normal-Book.woff2
```

![](https://img.czblogs.cn/posts/sitebuild/04/image-20260729202451477.webp)

**第五步：裁剪粗体字体文件，输出 woff2 字体文件到当前目录**

接着执行如下命令：

```shell
pyftsubset GlowSansSC-Normal-Bold.otf --text-file=all-font-glyphs.txt --flavor=woff2 --output-file=GlowSansSC-Normal-Bold.woff2
```

完成全部操作后，此时 fonts 文件夹中就生成了裁剪后的 woff2 文件，且文件很小（300 KB 左右）。

**第六步：引入字体**

打开本文 1.02 中创建的 custom.styl 文件，写入如下内容（将字体引入到网页中）：

```stylus
// 未来荧黑常规400字重
@font-face
  font-family: "GlowSansSC"
  src: url("/fonts/GlowSansSC-Normal-Book.woff2") format("woff2")
  font-weight: 400
  font-style: normal
  font-display: swap

// 未来荧黑粗体700字重
@font-face
  font-family: "GlowSansSC"
  src: url("/fonts/GlowSansSC-Normal-Bold.woff2") format("woff2")
  font-weight: 700
  font-style: normal
  font-display: swap
```

**第七步：设置字体栈**

打开 themes/source/css/var.styl 文件，在变量`$default-font-family`值的最前面，添加`GlowSansSC`即可。

经过这样以后，将博客 deploy 后，网站中所有的字体（包括英文字体）就变成未来荧黑了！

## 4.08：封装命令

在这之前，对网站进行修改或增加新文章后，我需要执行下面三个命令来发布：

```shell
hexo clean && hexo genarate && hexo deploy
```

但是现在，增加了裁剪字体的逻辑，那么在 genarate 和 deploy 之间就得多执行如下命令：

```shell
cd source/fonts
NODE_PATH=$(npm root -g) node extract-font-text.js
pyftsubset GlowSansSC-Normal-Regular.otf --text-file=chars.txt --flavor=woff2 --output-file=GlowSansSC-Normal-Regular.woff2
pyftsubset GlowSansSC-Normal-Bold.otf --text-file=chars.txt --flavor=woff2 --output-file=GlowSansSC-Normal-Bold.woff2
cd ../../
```

这就很麻烦了，发布一次文章都得累死。为了简化字体裁剪，可以将这一系列命令封装进一个命令，我选择使用 Hexo 自定义命令的方式来实现。

**第一步：创建脚本**

在博客根目录下创建目录 scripts，并在其中创建文件 font-file-subset.js，在该文件中写入如下内容：

```javascript
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// 注册自定义命令：hexo font
hexo.extend.console.register(
  'font',
  '自动提取全站文字，裁剪源字体文件并生成新的字体文件',
  function () {
    console.log('\n  ===================== ✅ 启动字体文件裁剪任务 =====================');
    try {
      // 博客根目录（当前终端执行目录，稳定可靠）
      const blogDir = process.cwd();
      // 字体目录 source/fonts
      const fontSourceDir = path.resolve(blogDir, './source/fonts');
      // 输出目录
      const bookFontPath = path.resolve(fontSourceDir, 'GlowSansSC-Normal-Book.woff2');
      const boldFontPath = path.resolve(fontSourceDir, 'GlowSansSC-Normal-Bold.woff2');
      // 静态页面目录 public
      const publicDir = path.resolve(blogDir, './public');

      // 前置校验1：public 必须存在
      if (!fs.existsSync(publicDir)) {
        throw new Error('  ===================== ❌ public文件夹不存在，请先执行hexo generate =====================');
      }
      // 前置校验2：public内必须有html页面
      const publicFiles = fs.readdirSync(publicDir);
      const hasHtml = publicFiles.some(file => file.endsWith('.html'));
      if (!hasHtml) {
        throw new Error('  ===================== ❌ public内没有html文件，页面生成不完整 =====================');
      }
      // 前置校验3：字体目录存在
      if (!fs.existsSync(fontSourceDir)) {
        throw new Error('  ===================== ❌ 字体目录 source/fonts 不存在 =====================');
      }

      // 切换工作目录到字体文件夹，方便执行相对路径命令
      process.chdir(fontSourceDir);

      // 1. 删除旧woff2字体文件
      if (fs.existsSync(bookFontPath)) {
        try {
          fs.unlinkSync(bookFontPath);
          console.log('  ===================== ✅ 已删常规书本字体文件 =====================');
        } catch (err) {
          console.warn('  ===================== ⚠️ 常规书本字体删除失败：', err.message);
        }
      }
      if (fs.existsSync(boldFontPath)) {
        try {
          fs.unlinkSync(boldFontPath);
          console.log('  ===================== ✅ 已删常规粗体字体文件 =====================');
        } catch (err) {
          console.warn('  ===================== ⚠️ 常规粗体字体删除失败：', err.message);
        }
      }

      // 2. 删除临时字符文件
      const tempCharFile = path.resolve(fontSourceDir, 'all-font-glyphs.txt');
      if (fs.existsSync(tempCharFile)) {
        try {
          fs.unlinkSync(tempCharFile);
          console.log('  ===================== ✅ 已删除旧临时字符文件 =====================');
        } catch (err) {
          console.warn('  ===================== ⚠️ 临时字符文件删除失败：', err.message);
        }
      }

      // 3. 运行字符提取脚本（使用绝对路径，稳定无路径坑）
      const extractScriptPath = path.resolve(fontSourceDir, 'extract-font-glyphs.js');
      try {
        execSync(`NODE_PATH=$(npm root -g) node ${extractScriptPath}`, { stdio: 'inherit' });
        console.log('  ===================== ✅ 已生成新临时字符文件 =====================');
      } catch (err) {
        throw new Error(`  ===================== ❌ 字符提取脚本执行失败：${err.message}`);
      }

      // 4. 裁剪常规字重（输出同目录，去掉../fonts）
      try {
        execSync(
          'pyftsubset GlowSansSC-Normal-Book.otf --text-file=all-font-glyphs.txt --flavor=woff2 --output-file=GlowSansSC-Normal-Book.woff2',
          { stdio: ['inherit', 'inherit', 'ignore'] }
        );
        if (fs.existsSync(bookFontPath)) {
          console.log('  ===================== ✅ 生成常规书本字体文件 =====================');
        } else {
          throw new Error('未输出常规woff2文件');
        }
      } catch (err) {
        throw new Error(`  ===================== ❌ 常规书本字体裁剪失败：${err.message}`);
      }

      // 5. 裁剪粗体字重（输出同目录，去掉../fonts）
      try {
        execSync(
          'pyftsubset GlowSansSC-Normal-Bold.otf --text-file=all-font-glyphs.txt --flavor=woff2 --output-file=GlowSansSC-Normal-Bold.woff2',
          { stdio: ['inherit', 'inherit', 'ignore'] }
        );
        if (fs.existsSync(boldFontPath)) {
          console.log('  ===================== ✅ 生成常规粗体字体文件 =====================');
        } else {
          throw new Error('未输出粗体woff2文件');
        }
      } catch (err) {
        throw new Error(`  ===================== ❌ 常规粗体字体裁剪失败：${err.message}`);
      }

      console.log('  ===================== 🎉 字体裁剪任务执行完毕 =====================');

    } catch (error) {
      console.error('  ===================== ❌ 字体裁剪任务终止执行：', error.message);
    }
  }
);

// 新增：注册别名 hexo f，直接调用上面的 font 命令
hexo.extend.console.register(
  'f',
  '自动提取全站文字，裁剪源字体文件并生成新的字体文件（等价 hexo font）',
  function(args) {
    return this.call('font', args);
  }
);
```

有这个文件，我们就自定义了`Hexo font`和`hexo f`命令。打开终端，切换到博客根目录下，在 generate 后执行：

![](https://img.czblogs.cn/posts/sitebuild/04/image-20260729205513166.webp)

至此，全站字体修改完成，以后部署博客只需要执行：

```shell
hexo clean && hexo generate && hexo font && hexo deploy
```

或者：

```shell
hexo cl && hexo g && hexo f && hexo d
```

## 4.09：忽略文件

存在问题：执行 generate 和 deploy 命令时，发现 Hexo 会带上 fonts 文件中的所有文件，实际上这并不需要。

解决办法：在站点配置文件中使用`exclude`来配置不需要 Hexo 处理的文件

```yaml
exclude:
  - fonts/*.txt
  - fonts/*.otf
```

同时，在博客根目录下的 .ignore 文件中，添加要忽略的字体文件：

```tex
source/fonts/*.otf
source/fonts/*.txt
```

## 4.10：英文字体

我选择的英文字体是 [Nimbus Sans L](https://www.fontsquirrel.com/fonts/nimbus-sans-l)，直接在官网上下载即可，文件本身就很小，所以不需要裁剪.基本步骤跟设置未来荧黑的步骤差不多：

第一步：转为 woff2 格式（使用在线工具 [https://transfonter.org/](https://transfonter.org/)）

第二步：将转换的 woff2 文件放入博客根目录下的 /source/fonts/ 目录下；

第三步：在主题根目录下的 /source/css/_custom/custom.styl 中增加 @font-face 来引入字体；

```stylus
// Nimbus Sans L 常规400字重
@font-face
  font-family: "NimbusSanL"
  src: url("/fonts/NimbusSanL-Reg.woff2") format("woff2")
  font-weight: 400
  font-style: normal
  font-display: swap

// Nimbus Sans L 粗体700字重
@font-face
  font-family: "NimbusSanL"
  src: url("/fonts/NimbusSanL-Bol.woff2") format("woff2")
  font-weight: 700
  font-style: normal
  font-display: swap
```

第四步：修改主题根目录下的 /source/css/var.styl 文件，将引入的 NimbusSanL 字体配置进字体栈。

## 4.11：代码字体

代码块字体采用默认的配置，这里就不做记录了。

# 第五节：字体的大小

## 5.01：主题的逻辑

更换了字体以后，总觉得网站整体的字体都变小了，在修改之前，先来看一下 Butterfly 主题字号设置的基本逻辑。

最终页面的 index.css 文件是由 themes/butterfly/source/css/index.styl 生成的：

```stylus
if hexo-config('css_prefix')
  @import 'nib'
// 基础浏览器标准化
@import '_third-party/normalize.min.css'
// project
@import 'var'
@import '_global/*'
@import '_highlight/highlight'
@import '_page/*'
@import '_layout/*'
@import '_tags/*'
@import '_mode/*'
// search
@import '_search/index'
// 引入自定义样式
@import '_custom/*'
```

可见，只要我们按照这个文件的生成顺序去找对应的文件中的字号设置，就能搞明白浏览器的字体是如何设置的了。

**第一个：normalize.min.css**

该文件是基础浏览器标准化，它规定了标题正文等字体，仅仅是打底，后续存在相同设定时，这里的设置会被覆盖。

**第二个：themes/butterfly/source/css/var.styl**

改文件中定了主题要用的字号，这里设定了根字号（如果不在主题配置中修改，则默认14px）：

![](https://img.czblogs.cn/posts/sitebuild/04/image-20260730103054317.webp)

**第三个：index.styl 和 function.styl**

这两个文件在 themes/butterfly/source/css/_global 文件夹中，前者设定了页面的基础字号：

![](https://img.czblogs.cn/posts/sitebuild/04/image-20260730105531364.webp)

后者的主要作用是提供定义了不同屏幕尺寸，在不同尺寸屏幕中的字号还需要到具体的业务模块中去设置：

![](https://img.czblogs.cn/posts/sitebuild/04/image-20260730113938087.webp)

## 5.02：主题根字号

主题默认的根字号是 14px：

![](https://img.czblogs.cn/posts/sitebuild/04/image-20260802215555812.webp)

## 5.03：响应式断点

针对不同尺寸的屏幕，页面会有不同的布局，这就是响应式布局，Butterfly 的响应式断点定义在 function.styl 中。主题默认的响应断点有：600、768、900、1024、2000，对于移动端只有一个小于 600 的适配，我为了更好的移动端体验，在原有的基础上，新增了移动端更细致的断点。

打开 function.styl 文件，增加如下代码：

```stylus
/*
新增移动端屏幕的适配
*/
maxWidth375() // iPhone SE2 / SE3
  @media screen and (max-width: 375px)
    {block}
minWidth376()
  @media screen and (min-width: 376px)
    {block}

maxWidth390() // iPhone 12/13/14 标准版/Pro
  @media screen and (max-width: 390px)
    {block}
minWidth391()
  @media screen and (min-width: 391px)
    {block}

maxWidth393() // iPhone 15/16/17 标准版/Pro
  @media screen and (max-width: 393px)
    {block}
minWidth394()
  @media screen and (min-width: 394px)
    {block}

maxWidth430() // iPhone14/15/16 Plus / Pro Max
  @media screen and (max-width: 430px)
    {block}
minWidth431()
  @media screen and (min-width: 431px)
    {block}

maxWidth440() // iPhone 17 Plus / Pro Max
  @media screen and (max-width: 440px)
    {block}
minWidth441()
  @media screen and (min-width: 441px)
    {block}

maxWidth480()
  @media screen and (max-width: 480px)
    {block}
minWidth481()
  @media screen and (min-width: 481px)
    {block}

minWidth601() // 为了保持跟主题原生逻辑一致，这里再加一个
  @media screen and (min-width: 601px)
    {block}
```

只有定义了这个，我们在具体的组件样式文件中，才能直接使用，使用方式：

```stylus
+maxWidth上限()
  选择器
    属性: 值
```



# 第六节：阿里的图标

## 6.01：默认图标

Butterfly 主题支持 [Font-Awesome V7](https://fontawesome.com/icons?from=io) 图标。首先，主题根目录下的`plugins.yml`文件中指定了：

```yaml
fontawesome:
  name: '@fortawesome/fontawesome-free'
  file: css/all.min.css
  other_name: font-awesome
  version: 7.3.1
```

只需在使用时，用`<i class="fas fa-github"></i>`来引用就可以了，这里的`fas fa-github`就是 Awesome 的图标名，名称可以到官网上去找。除了使用默认的 Awesome 图标，我们还可以自己引入阿里图标来使用。

## 6.02：挑选图标

访问 [阿里图标库 iconfont.cn](https://www.iconfont.cn/)，搜到想要的图标，将其添加到购物车，然后统一添加到项目中，比如我添加了 13个：

![](https://img.czblogs.cn/posts/sitebuild/04/image-20260731133242091.webp)

## 6.03：下载图标

下载图标的 Font class 文件：

![](https://img.czblogs.cn/posts/sitebuild/04/image-20260731140143185.webp)

下载下来的文件解压后，只保留下面的文件，其余的都删除：

```tex
iconfont.css
iconfont.ttf
iconfont.woff
iconfont.woff2
```

## 6.04：图标文件

将`iconfont.ttf`、`iconfont.woff`和`iconfont.woff2`这三个文件，放到博客根目录下的`/source/icons/`中（如果没有就新建）：

![](https://img.czblogs.cn/posts/sitebuild/04/image-20260731135551541.webp)

## 6.05：配置CSS

修改 iconfont.css 中的原始内容为下面这样（主要是图标文件的路径），然后将其转换为 stylus 代码，最后整个内容都复制到 custom.styl 文件的最后：

```css
// 引入阿里图标
@font-face
  font-family "iconfont"
  src url('/icons/iconfont.woff2?t=1785494740304') format('woff2'),
      url('/icons/iconfont.woff?t=1785494740304') format('woff'),
      url('/icons/iconfont.ttf?t=1785494740304') format('truetype')
  font-display swap

.iconfont
  font-family "iconfont" !important
  font-size 16px
  font-style normal
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale

.icon-square-douyin:before
  content "\e61b"

.icon-circle-weibo:before
  content "\e6f5"

.icon-circle-github:before
  content "\e60d"

.icon-circle-rss:before
  content "\e777"

.icon-circle-gitee:before
  content "\e600"

.icon-circle-zhihu:before
  content "\ecb2"

.icon-circle-weixin:before
  content "\e61f"

.icon-circle-youxiang:before
  content "\e62e"

.icon-circle-qq:before
  content "\e64c"

.icon-square-qq:before
  content "\e625"

.icon-square-weibo:before
  content "\e6c3"

.icon-square-weixin:before
  content "\e6ba"

.icon-square-youxiang:before
  content "\e623"
```

## 6.06：使用方式

经过以上的操作，阿里图标就已经引入到博客网站了，只需要在页面中使用下面的方式来引用就可以了：

```html
<i class="iconfont icon-square-github"></i>
```

至于图标的颜色，可在对应的 CSS 样式去设定。



# 第七节：侧边栏魔改

首页的侧边栏有很多的卡片，Butterfly 页提供了自定义侧边栏的功能，[官方文档](https://butterfly.js.org/posts/4aa8abbe/?highlight=aside#%E8%A8%AA%E5%95%8F%E4%BA%BA%E6%95%B8-busuanzi-UV-%E5%92%8C-PV)中的描述是“可自行决定哪个项目需要显示，可决定位置，也可以设置不显示侧边栏”，并且基本的设置都可以在主题配置文件中的`aside`进行配置！

## 7.01：站长信息

站长信息卡片建议保留，里面的内容都可以配置来实现，其中社交图标的配置在主题配置文件中的`social`：

```yaml
# Formal:
#   icon: link || the description || color
social:
  fab fa-github: https://github.com/fattymonkey || Github || '#24292e'
  fas fa-envelope: mailto:1185349843@qq.com || Email || '#4a7dbe'
```

这是默认的图标，参考本文第六节引入阿里图标的操作，我在这里配置为：

```yaml
# Formal:
#   icon: link || the description || color
social:
  # fab fa-github: https://github.com/fattymonkey || Github || '#24292e'
  # fas fa-envelope: mailto:1185349843@qq.com || Email || '#4a7dbe'
  iconfont icon-square-youxiang: mailto:1185349843@qq.com || 给我发邮件 || '#FF8901'
  iconfont icon-square-weibo: https://weibo.com/u/5102287461 || 访问我的微博 || '#E6162D'
  iconfont icon-square-douyin: https://v.douyin.com/bmpNaH4XdmI || 访问我的抖音 || '#000000'
```

## 7.02：字体居中

修改了网站的字体后，发现侧边栏站长信息卡片上的 GitHub 图标和文字“我的GitHub”在水平方向上没有对齐，文字偏高了，这是因为字体和图标的基线不一致导致的，我这里直接将文字往下拉一些。

打开`/themes/butterfly/source/css/_layout/aside.styl`文件，增加下面的代码：

![](https://img.czblogs.cn/posts/sitebuild/04/image-20260802230051684.webp)

这个方案是临时方案，因为整个博客网站中还存在其他地方有类似的问题，暂时先改这一个，后面更新根治的办法。

## 7.03：社交弹窗

现在站长信息卡片上有三个社交链接，但是我还是想加上微信和 QQ 的链接，能让用户点击的时候，弹窗显示二维码。但是主题原生不支持这种方式，所以我需要自己来增加弹窗。

**第一步：放置二维码图片**

将二维码图片放到博客根目录下的 /source/img/social/ 中：

![](https://img.czblogs.cn/posts/sitebuild/04/image-20260731204133019.webp)

**第二步：增加弹窗的组件**

首先，在 themes/butterfly/layout/includes/ 中新建一个名为 qrmodal.pug 的文件，用来写弹窗的页面元素：

```pug
div.qr-modal#qrModal
  div.qr-modal-inner
    span.qr-close x
    p#qr-title
    img#qr-img(alt="社交二维码")
```

然后，因为我需要把弹窗的 DOM 元素放到 body 里面，页面的结构是由 themes/butterfly/layout/includes/layout.pug 决定的，我打算把弹窗组件放到 rightside 和 additional-js 中间，所以找到下面的代码：

```pug
include ./rightside.pug
include ./additional-js.pug
```

在这两行中间添加一行：

```pug
include ./qrmodal.pug
```

**第三步：修改图标的逻辑**

在 themes/butterfly/layout/includes/header/social.pug，找到下面的代码：

```pug
a.social-icon(href=href target="_blank" title=iconTitle)
  i(class=icon style=iconStyle)
```

这说明所有的标签被点击时，都会新开标签页来展示，但是我想要它在当前页面展示，所以将其修改为：

```pug
if link.startsWith('javascript:')
    a.social-icon(href=href title=iconTitle)
      i(class=icon style=iconStyle)
  else
    a.social-icon(href=href target="_blank" title=iconTitle)
      i(class=icon style=iconStyle)
```

**第四步：编辑弹窗的样式**

在 /themes/butterfly/source/css/_custom/custom.styl 文件的末尾增加如下代码，用来设定弹窗的样式：

```stylus
/*! 设定社交二维码弹窗的样式 */
.qr-modal
  display: none
  position: fixed
  inset: 0
  background: rgba(0,0,0,0.72)
  z-index: 9999
  align-items: center
  justify-content: center
  backdrop-filter: blur(4px)
.qr-modal.show
  display: flex
.qr-modal-inner
  position: relative
  background: #fff
  padding: 32px 28px
  border-radius: 16px
  text-align: center
  box-shadow: 0 8px 30px rgba(0,0,0,0.22)
  max-width: 320px
.qr-close
  position: absolute
  right: 16px
  top: 12px
  font-size: 26px
  cursor: pointer
  color: #888
  width: 32px
  height: 32px
  display flex
  align-items center
  justify-content center
  border-radius: 50%
  transition: all 0.2s ease
  &:hover
    background rgba(0,0,0,0.08)
    color: #222
#qr-title
  font-size: 16px
  margin: 0 0 16px
  color: #333
#qr-img
  width: 220px
  border-radius: 8px
// 适配Butterfly暗色模式
[data-theme="dark"]
  .qr-modal-inner
    background: #242424
  #qr-title
    color: #e5e5e5
  .qr-close
    color: #aaa
    &:hover
      background rgba(255,255,255,0.1)
      color: #fff
```

**第五步：增加弹窗的逻辑脚本**

在 /themes/butterfly/source/js/ 目录中新建 qr-popup.js 脚本文件，填入如下内容：

```javascript
// 将函数挂载window，满足 href="javascript:getCode()" 调用
window.getCode = function(type) {
  const popover = document.getElementById('qrModal')
  const titleDom = document.getElementById('qr-title')
  const imgDom = document.getElementById('qr-img')

  const qrAsset = {
    weixin: {
      title: '扫码添加我的微信',
      src: '/img/social/weixincode.webp'
    },
    qq: {
      title: '扫码添加我的QQ',
      src: '/img/social/qqcode.webp'
    }
  }

  const assetInfo = qrAsset[type]
  titleDom.innerText = assetInfo.title
  imgDom.src = assetInfo.src

  popover.classList.add('show')
}

// 关闭弹窗公共函数
function closeQRModal() {
  const popover = document.getElementById('qrModal')
  popover.classList.remove('show')
}

// 1.点击右上角 × 关闭
document.addEventListener('click', e => {
  if (e.target.classList.contains('qr-close')) {
    closeQRModal()
  }
})

// 2.点击遮罩空白区域关闭（点击弹窗内部不会关闭）
document.addEventListener('click', e => {
  const popover = document.getElementById('qrModal')
  if (e.target === popover) {
    closeQRModal()
  }
})

// PJax切换页面自动关闭弹窗
document.addEventListener('pjax:complete', () => {
  closeQRModal()
})
```

然后打开 /themes/butterfly/layout/includes/additional-js.pug 文件，添加引入脚本的代码（注意缩进）：

```pug
// 加载社交弹窗的脚本
script(src=url_for('/js/qr-popup.js'))
```

**第六步：配置图标**

在主题配置文件的 social 处增加微信和 QQ 的配置：

```yaml
# Formal:
#   icon: link || the description || color
social:
  # fab fa-github: https://github.com/fattymonkey || Github || '#24292e'
  # fas fa-envelope: mailto:1185349843@qq.com || Email || '#4a7dbe'
  iconfont icon-square-youxiang: mailto:1185349843@qq.com || 给我发邮件 || '#FF8901'
  iconfont icon-square-weibo: https://weibo.com/u/5102287461 || 访问我的微博 || '#E6162D'
  iconfont icon-square-douyin: https://v.douyin.com/bmpNaH4XdmI || 访问我的抖音 || '#000000'
  iconfont icon-square-weixin: javascript:getCode('weixin') || 扫码添加我的微信 || '#0CC161'
  iconfont icon-square-qq: javascript:getCode('qq') || 扫码添加我的QQ || '#0FB8F6'
```

## 7.04：图标大小

默认的图标大小是 16 px，在 custom.styl 中有定义，如果将这里的 16px 改成 1em 的话，就使用博客全局的根字号 14 px 了。同时，在 blog/themes/butterfly/source/css/_layout/aside.styl 中，针对社交链接，单独设置了social-icon 的大小为 1.4 em，所以此时社交图标的大小是 19.6 px，我的做法是修改这两个地方。

第一，将 custom.styl 中的默认图标大小设置为 1em：

```stylus
.iconfont
  font-family "iconfont" !important
  font-size 1em
  font-style normal
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
```

第二，将 social-icon 的大小设置为 1.5 em，最终图标大小 21 px：

```stylus
.social-icon
  margin: 0 10px
  color: var(--font-color)
  font-size 1.5em
```

## 7.05：标签卡片

默认情况下，标签卡片上的标签是左对齐的，这不是很美观，我打算把它改成两边对齐。

打开 /themes/butterfly/source/css/_layout/aside.styl 文件，增加下面几行即可：

![](https://img.czblogs.cn/posts/sitebuild/04/image-20260801163209459.webp)

## 7.06：网站信息

网站信息卡片上的文字，可以在文件`themes/butterfly/languages/zh-CN.yml`中进行自定义修改，不再赘述。



# 第八节：页脚的魔改

在本系列的第二篇文章[《Butterfly主题之开始使用》](https://www.fattymonkey.com/post/10302.html)中，我根据官方文档对页脚部分先进行了最基本的配置，是这样的：

![](https://img.czblogs.cn/posts/sitebuild/04/image-20260730005635263.webp)

## 8.01：跳转问题

在页脚导航栏配置站内的网页后（不管配置的是相对路径还是绝对路径），当点击这个链接时，浏览器会跳转到一个新的标签页来访问。显然这是不合理的，正确的行为应该是自动判断点击的链接是否是站内页面，如果是站内页面就不应该新开标签页来访问，而是在当前标签页直接跳转。

打开`themes/butterfly/layout/includes/footer.pug` 文件，找到：

```pug
a(href=url_for(subitem.url), target='_blank' title=subitem.title)= subitem.title
```

然后用下面这三行去替换这一行（注意代码缩进）：

```pug
- const linkUrl = url_for(subitem.url)
- const isExternal = linkUrl.startsWith('http')
a(href=linkUrl, target= isExternal ? '_blank' : '_self', title=subitem.title)= subitem.title
```

这样，只要再配置相对路径，则会在当前标签页打开，配置绝对路径，则会用新标签页打开。

## 8.02：随机文章

之前，添加“随机文章”非常简单，只需要安装 hexo-random-post 插件，并在站点配置文件中简单配置下就可以了。但是现在这个插件已经在 npm 中下架，所以就不能使用这种方式了。

我的实现方式是：在 Hexo 渲染时把所有文章链接一次性输出到页面全局变量，点击随机文章直接从数组取值，不需安装插件，也无需网络等待。

**第一步：在博客根目录下的 /source/js/ 中新建 random-post.js 文件**

```javascript
// 全局缓存文章链接数组，页面刷新前永久保存
window.__articleUrls = window.__articleUrls || [];

function goRandom(){
  // 如果缓存里已有数据，直接随机跳转，不用重新拉取归档
  if(window.__articleUrls.length > 0){
    const idx = Math.floor(Math.random() * window.__articleUrls.length);
    location.href = window.__articleUrls[idx];
    return;
  }

  // 缓存为空，自动后台请求归档页面抓取链接，不用手动点开归档
  fetch('/archives')
  .then(res => res.text())
  .then(html => {
    const dom = new DOMParser().parseFromString(html, 'text/html');
    const links = dom.querySelectorAll('.article-sort-item-info a.article-sort-item-title');
    window.__articleUrls = Array.from(links).map(el => el.href);
    if(window.__articleUrls.length === 0){
      alert("未读取到文章");
      return;
    }
    const idx = Math.floor(Math.random() * window.__articleUrls.length);
    location.href = window.__articleUrls[idx];
  })
  .catch(err => {
    alert("获取文章列表失败，请刷新页面");
    console.error(err);
  })
}
```

**第二步：在主题根目录下的 /layout/includes/head.pug 文件，添加如下代码**

```pug
// 加载随机文章的脚本
script(src=url_for('/js/random-post.js'))
```

**第三步：修改主题根目录下的 /layout/includes/footer.pug 中的逻辑**

![](https://img.czblogs.cn/posts/sitebuild/04/image-20260730010955926.webp)

**第四步：在主题配置文件中配置标签的路径**

![](https://img.czblogs.cn/posts/sitebuild/04/image-20260730011209299.webp)

## 8.03：字体对齐

页脚的标题和子菜单是左对齐的，我希望将其设置为垂直对齐。修改主题根目录下的 /source/css/_layout/footer.styl：

![](https://img.czblogs.cn/posts/sitebuild/04/image-20260730020647094.webp)

## 8.04：屏幕适配

页脚设置了四个大类，用浏览器访问时四个分类平铺展开，但是当用手机访问时，发现页脚这个地方很别扭：

![](https://img.czblogs.cn/posts/sitebuild/04/image-20260730021119238.webp)

这是因为 Butterfly 原生的适配屏幕有点问题。修改`themes/butterfly/source/css/_layout/footer.styl`：

![](https://img.czblogs.cn/posts/sitebuild/04/image-20260802232627805.webp)

## 8.05：社交横栏

**第一步：增加页面元素**

在`themes/butterfly/source/layout/includes/footer.pug`中`if nav`的下面添加代码：

```pug
.footer_social
  a.social_link(href="mailto:1185349843@qq.com" title="邮箱")
    i.iconfont.icon-circle-youxiang
  a.social_link(href="javascript:getCode('weixin')" title="微信" rel="noopener nofollow")
    i.iconfont.icon-circle-weixin
  a.social_link(href="javascript:getCode('qq')" title="QQ" rel="noopener nofollow")
    i.iconfont.icon-circle-qq
  a.social_link(href="https://weibo.com/u/5102287461" title="微博" target="_blank" rel="noopener nofollow")
    i.iconfont.icon-circle-weibo
  //- 回到顶部头像
  img.footer_mini_logo.entered.loading(style="border-radius:50%" src="/img/avatar/boy.webp" onclick="btf.scrollToDest(0,500)" title="返回顶部")
  a.social_link(href="https://gitee.com/fattymonkey" title="Gitee" target="_blank" rel="noopener nofollow")
    i.iconfont.icon-circle-gitee
  a.social_link(href="https://www.zhihu.com/people/fattymonkey" title="知乎" target="_blank" rel="noopener nofollow")
    i.iconfont.icon-circle-zhihu
  a.social_link(href="https://github.com/fattymonkey" title="GitHub" target="_blank" rel="noopener nofollow")
    i.iconfont.icon-circle-github
  a.social_link(href="/atom.xml" title="RSS" target="_blank" rel="noopener nofollow")
    i.iconfont.icon-circle-rss
```

**第二步：设置横栏样式**

打开 themes/butterfly/source/css/_layout/footer.styl 文件，在`#footer`的下一层，添加如下样式代码（注意缩进）：

```stylus
/* ================================================= 页脚顶部社交图标区域 ================================================= */
.footer_social
  display: flex
  justify-content: space-between
  margin: 0 auto
  padding: 20px 40px 0 40px
  max-width: 1200px
  width: 100%
  /* 适配小屏幕 */
  +maxWidth768()
    padding: 20px 10px 0 10px

  /* 1.八个社交链接 */
  a.social_link
    display: flex
    margin: 1rem auto
    border-radius: 3rem
    width: 2em // a标签宽度
    height: 2em // a标签高度
    justify-content: center
    align-items: center
    transition: transform .3s
    .iconfont
      font-size: 2em // 跟a标签一样大
    /* 在默认屏幕（大屏幕）上使用放大和过渡效果 */
    &:hover
      transform: scale(1.5)
      transition: all .3s ease 0s
      -webkit-transform: scale(1.5) //-webkit-解决浏览器兼容问题
      -webkit-transition: all .5s ease 0s
    /* 在小屏幕上取消放大和过渡效果 */
    +maxWidth768()
      &:hover
        transform: none
        transition: none
        -webkit-transform: none /* 针对WebKit浏览器的取消放大效果 */
  /* 2.中间返回顶部的头像 */
  img.footer_mini_logo
    width: 4rem
    height: 4rem
    margin: 0 auto
    cursor: pointer
    transition: cubic-bezier(0, 0, 0, 1.29) .5s
    /* 在默认屏幕（大屏幕）上使用放大和过渡效果 */
    &:hover
      transform: scale(1.4)
      transition: all .3s ease 0s
      -webkit-transform: scale(1.5) //-webkit-解决浏览器兼容问题
      -webkit-transition: all .5s ease 0s
    /* 在小屏幕上取消放大和过渡效果 */
    +maxWidth768()
      &:hover
        transform: none
        transition: none
        -webkit-transform: none /* 针对WebKit浏览器的取消放大效果 */
```

## 5.08：RSS订阅

创建社交横栏中的 RSS 订阅页面，需要先安装插件。

第一步：终端切换到博客根目录下执行

```shell
npm install hexo-generator-feed --save
```

第二步：打开站点配置文件，增加下面的配置

```yaml
# RSS订阅
feed:
  enable: true
  type: atom
  path: atom.xml
  limit: 20 # 订阅源最多显示20篇最新文章，0=全部
  content: false # RSS内包含完整文章内容，false只显示摘要
  content_limit: 140 # 摘要截断字数，content:false时生效
  autodiscovery: true # 浏览器自动识别RSS订阅按钮
```

第三步：终端切换到博客根目录下执行

```shell
hexo clean && hexo generate
```

然后在本地博客根目录中的 /public 文件夹中，能看到 atom.xml 文件，即代表 RSS 功能正常。需要注意的是：此时你使用`hexo server`启动本地预览时，点击 RSS 订阅的按钮，此时展示的`atom.xml`中的中文可能是乱码的，不要慌，此时你再去点击部署到远程的 RSS 订阅，发现不存在乱码问题，所以不用慌，不影响正常使用！至于为什么本地预览会出现乱码，就不得而知了～～









































