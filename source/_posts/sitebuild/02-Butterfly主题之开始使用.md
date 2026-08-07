---
title: Butterfly主题之开始使用
date: 2023-04-02 19:06:18
updated: 2026-04-02 21:33:58
description: 更换Butterfly主题 + Butterfly主题基本设置
categories:
  - 建站实录
tags:
  - Hexo
  - Butterfly
abbrlink: 10402
cover: /img/covers/sitebuild/02.webp
---



# 第一节：写在前面

## 1.01：主题选择

在搭建 Hexo 博客的过程中，我尝试过很多主题，每个主题都有自己鲜明的特点。截止到我发布这篇文章，Hexo 已经有 400 多个主题了，但是其中能拿得出手的也就二十多个。如果你是第一玩 Hexo，面对这么多主题肯定得眼花缭乱，尤其像我这种完美主义者，再加上患有很严重的选择困难症，真是不知道该选择哪个好！往往是刚开始选择了一个主题并折腾了一番以后，又发现别的主题有一个很牛逼的功能，就又想换主题了，反反复复，很是折腾！

再后来慢慢折腾不动了，终于想明白了一个道理，个人博客最重要的是内容，而不是“颜值”，踏踏实实写好博文才是博客真正的魅力！但所谓“颜值即正义”，选择一个好看的主题也是第一步！经过最终的选择比较，我选择了 Butterfly 主题，主要是因为这个主题具备以下几个优势：

1. 颜值高。Butterfly 的颜值可是数一数二的，这一点只有你用过很多种主题以后才能有所体会；
2. 可扩展性强。Butterfly 自带的配置文件有一千行，集成了很丰富的外观和功能扩展，通过简单配置就可实现；
3. 社区良好。Butterfly 一直在不断更新，并且开发者是香港人，中文文档良好，遇到了问题查找解决方案比较简单；

但除此之外，我认为它还有一个不算缺点的缺点，就是它的灵活度太高了。怎么说呢？刚开始起步的时候，需要配置的东西比较零散，需要耐心！

<font color=red>友情提示</font>，我这篇博文的主要内容包括两个部分：

- 更换主题：Hexo 博客更换每个主题的方式都一样，我这篇博文是以 Butterfly 来举例的；
- 基本配置：更换主题后，需要生成基本页面、替换博主自己的资料、内置的功能需要手动配置；

## 1.02：基本环境

我本地使用的是 macOS Tahoe 25.6.2，基本软件环境如下：

![](https://img.czblogs.cn/posts/sitebuild/02/image-20260725185656664.webp)

Hexo 自带的 npm 包如下：

![](https://img.czblogs.cn/posts/sitebuild/02/image-20260725185913663.webp)

在当前所有的依赖里面，只有`hexo-deployer-git`是我自己安装的，是为了支持将本地生成的静态博客文件上传到 Github，其他的都是 Hexo 程序自带的！



# 第二节：更换主题

## 2.01：下载主题

Butterfly 主题是托管在 Github 上的：[传送门](https://github.com/jerryc127/hexo-theme-butterfly)。默认分支是开发分支 dev，我选择下载稳定版本，截止到我当前更新这篇博文的时间，最新的稳定版本是 5.6.1 ！你可以在本地博客工程的`/themes`文件夹下使用 Git 来 clone 主题文件夹，也可以从 Github 网页上直接下载。

我打算以后都不更新主题了，所以我是直接从网页上下载的，解压后得到：

![](https://img.czblogs.cn/posts/sitebuild/02/image-20260725190459892.webp)

## 2.02：更换主题

**第一步：重命名并移动**

将下载下来的主题文件夹重命名为`butterfly`，并放到本地博客工程目录下的`/themes`文件夹中。<font color=red>**注意**</font>：放到本地博客工程 /themes 文件夹中的主题文件夹必须重命名为 butteryfly，后面我会解释为什么！此外，博客根目录下的 /themes 文件夹中原本存在名为`.gitkeep`的文件，这是为了保证空文件夹能被 Git 管理，因为此时这个文件夹已经不是空的，所以这个文件也可以删除了！

**第二步：修改站点配置文件**

在本地博客工程根目录中找到并打开`_config.yml`文件，在其中找到`theme`，进行如下操作并保存：

![](https://img.czblogs.cn/posts/sitebuild/02/image-20260725191207833.webp)

**第三步：安装插件**

Butterfly 依赖模板引擎 pug 和 CSS 预处理语言 stylus，而 Hexo 程序本身自带 stylus：

![](https://img.czblogs.cn/posts/sitebuild/02/image-20260725191343458.webp)

所以只需要安装 pug，打开终端并切换到本地博客工程目录下，执行如下安装命令，安装后查看是否安装成功：

```shell
npm install hexo-renderer-pug
```

![](https://img.czblogs.cn/posts/sitebuild/02/image-20260725191702362.webp)

**第四步：清理缓存**

修改了博客根目录下的`_config.yml`文件，要想修改生效，就必须先清理缓存！

打开终端切换到本地博客工程目录下先后执行如下两条命令：

```shell
hexo clean
hexo server
```

![](https://img.czblogs.cn/posts/sitebuild/02/image-20260725191906668.webp)

**第五步：预览博客**

执行完以后，打开浏览器访问`http://localhost:4000/`，可见效果：

![](https://img.czblogs.cn/posts/sitebuild/02/image-20260725192058101.webp)

## 2.03：配置文件

更换主题后，整个博客工程中就存在了两个名为`_config.yml`的配置文件，第一个是在本地博客工程根目录下的，另一个是在于主题根目录下的。在对博客主题进行修改优化的时候，会频繁地用到这两个文件，所以**一定要区分清楚**。习惯上，我们会将前者称为<font color=red>站点配置文件</font>，将后者称为<font color=red>主题配置文件</font>！

Butterfly 有更好的处理，为减少升级主题带来的不便，可在本地博客根目录创建一个名为`_config.butterfly.yml` 的配置文件，并把主题根目录下的`_config.yml`中的内容全部复制进去。然后 Hexo 会合并这两个配置文件中的配置，如果存在同名的配置，会使用`_config.butterfly.yml` 的配置。（前面将下载主题文件夹重命名为 butterfly 也是为了这个，如果不这样的话，即使在本地博客根目录创建了`_config.butterfly.yml` 并进行了正确的配置，配置的内容也不会生效。

若采取官网建议的话，从此博客根目录下就有两个配置文件：`_config.yml`和`_config.butterfly.yml`！<font color=red>但是我不打算按照官网的处理方式，因为我后面就不打算更新主题了！</font>我决定就使用博客根目录下的主题配置文件。从现在开始：

- 博客工程根目录下的`_config.yml`文件是用来修改网站的样式行为的，称之为<font color=red>**站点配置文件**</font>；
- 博客主题根目录下的`_config.yml`文件是用来修改主题的样式行为的，称之为<font color=red>**主题配置文件**</font>；
- 博客工程根目录下的`_config.landscape.yml`文件时用来修改默认主题样式的，可以删除了；



# 第三节：基本配置

Butterfly 主题的配置文件很长，有一千行，基本上所有的配置都可以在主题配置文件中找到。

## 3.01：Front-matter

Front-matter 是 Hexo 中的概念，它是文件最上方以 `---` 分隔的区域，用于指定个别文件的变量！在写博客和主题基本设置之前，一定要先学习这部分内容！

- 首先，Hexo 中预置的 Front-matter，参看官网的[这篇博文](https://hexo.io/zh-cn/docs/front-matter)；
- 其次，Butterfly 在 Hexo 的基础上还定义了一些 Front-matter，参看 Butterfly 官方的[这篇博文](https://butterfly.js.org/posts/dc584b87/#Page-Front-matter)；

## 3.02：网站基本设置

在站点配置文件`_config.yml`的`Site`处可以配置网站的基本资料，包括如下内容：

|    参数     |                             描述                             |
| :---------: | :----------------------------------------------------------: |
|    title    |                           网站标题                           |
|  subtitle   |          副标题，在浏览器标签中跟在网站标题后面展示          |
| description |                           网站描述                           |
|  keywords   |                 网站的关键词，支持多个关键词                 |
|   author    |                  网站作者，修改为自己的名字                  |
|  language   | 网站使用的语言。使用[2个字母的ISO-639-1代码](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)，或[它的变体](https://hexo.io/docs/internationalization)，默认为`en`。参考主题来设置。 |
|  timezone   | 网站时区。Hexo 默认使用你电脑的时区，请参考[时区列表](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)进行设置，如 `America/New_York`, `Japan`, 和 `UTC` 。一般的，对于中国大陆地区可以使用 `Asia/Shanghai`。 |

比如我的配置如下：

```yaml
# Site
title: 繁体猴の客栈
subtitle: ''
description: '专注网络技术学习，记录建站踩坑经验，顺带记录日常碎片与生活感悟'
keywords: [HTML, CSS, JavaScript, Java, Linux, Python, Mac, macOS, shell]
author: Chen Zheng
language: zh-CN
timezone: 'Asia/Shanghai'
```

## 3.03：导航栏设置

导航栏可以设置三个参数，分别是：

```yaml
nav:
  # Navigation bar logo image
  logo:
  display_title: true
  display_post_title: true
  # Whether to fix navigation bar
  fixed: false
```

- logo：网站的 logo，支持图片，直接填入图片链接即可，相对路径或图片的网络URL都可以；
- display_title：是否展示网站的标题，默认是展示的；
- display_post_title：是否在滚动时显示文章标题，默认是展示的；
- fixed：是否固定导航栏，建议不固定，因为只要鼠标滚轮向上翻动页面，导航栏就会自动展示；

这部分内容可以根据自己的需要和习惯来自行修改，比如我这里就没有进行任何设置！

## 3.04：导航栏菜单

导航栏还可以展示菜单栏，需要在主题配置文件中打开设置，比如：

```yaml
menu:
  Home: / || fas fa-home
  Archives: /archives/ || fas fa-archive
  Tags: /tags/ || fas fa-tags
  Categories: /categories/ || fas fa-folder-open
  List||fas fa-list:
    Music: /music/ || fas fa-music
    Movie: /movies/ || fas fa-video
  Link: /link/ || fas fa-link
  About: /about/ || fas fa-heart
```

这里需要注意两点：

- 菜单的每个页面路径必须是 `/xxx/`，后面`||`分开，然后写图标名，如果不想显示图标，图标名可不写；
- 若主题版本大于 4.0.0，可以直接在子目录里添加`hide`来隐藏子目录，比如：`List||fas fa-list||hide:`；

这里展示的文字可以自行更改，比如我创建的菜单如下：

```yaml
# Menu 目錄
menu:
  首页: / || fas fa-home
  文章||fas fa-list:
    分类: /categories/ || fas fa-folder-open
    标签: /tags/ || fas fa-tags
    归档: /archives/ || fas fa-archive
  休闲||fas fa-list:
    照片展: /gallery/ || fas fa-images
    图书馆: /books/ || fas fa-book
    电影院: /movies/ || fas fa-video
    音乐汇: /music/ || fas fa-music
    玩游戏: /games/ || fas fa-gamepad
  友链: /link/ || fas fa-link
  留言板: /comments/ || fas fa-comment-dots
  关于我: /about/ || fas fa-heart
```

这只是展示在导航栏的菜单，对应的页面还没有（只有 Home 和 Archives 这两个是预置的），在满足主题菜单的配置规则下，我们可以任意组织自己的个性化菜单，最后还要创建对应的页面，如何创建可以查看本文 3.06！

## 3.05：创建页面

主题中给定的菜单目录是可以自己定义的，根据自己的需要设置一级目录和二级目录，这里只是配置了菜单，菜单对应的这些页面还不存在（除首页和归档页是 Hexo 自带的），需要我们自己创建！

<font color=red>**分类页**</font>

1. 打开终端，切换到博客工程根目录下，执行如下命令

   ```shell
   hexo new page categories
   ```

   执行成功以后，就会在博客根目录下的`/source`目录下生成一个名为`categories`的子文件夹，文件夹中生成了一个名为`index.md`的文件，这个文件就是最终的分类页！

2. 然后在生成的`/source/categories/index.md`中的 Front-matter 中添加`type: "categories"`：

   ```txt
   ---
   title: 分类
   date: 2023-01-01 06:00:00
   type: "categories"
   ---
   ```

3. 注意：`title`和`date`是自动生成的，我们可以任意修改这两项的值，但是必须添加`type: "categories"`，这样主题才能按照设定的 categories 布局来渲染这个页面！

<font color=red>**标签页**</font>

1. 打开终端，切换到博客工程根目录下，执行如下命令

   ```shell
   hexo new page tags
   ```

   执行成功以后，就会在博客根目录下的`/source`目录下生成一个名为`tags`的子文件夹，文件夹中生成了一个名为`index.md`的文件，这个文件就是最终的标签页！

2. 然后在生成的`/source/tags/index.md`中的 Front-matter 中添加`type: "tags"`：

   ```txt
   ---
   title: 标签
   date: 2023-01-01 06:00:00
   type: "tags"
   ---
   ```

3. 注意：`title`和`date`是自动生成的，我们可以任意修改这两项的值，但是必须添加`type: "categories"`，这样主题才能按照设定的 categories 布局来渲染这个页面！

<font color=red>**友链页**</font>

1. 打开终端，切换到博客工程根目录下，执行如下命令

   ```shell
   hexo new page link
   ```

   执行成功以后，就会在博客根目录下的`/source`目录下生成一个名为`link`的子文件夹，文件夹中生成了一个名为`index.md`的文件，这个文件就是最终的友链页！

2. 然后在生成的`/source/link/index.md`中的 Front-matter 中添加`type: "link"`：

   ```txt
   ---
   title: 优秀链接
   date: 2023-01-01 06:00:00
   type: "link"
   ---
   ```

3. 在博客根目录下的`/source/_data/`下创建名为`link.yml`的文件，并在其中按如下格式添加：

   ```yaml
   - class_name: 友情链接
     class_desc: 一些优秀的博客网站
     link_list:
       - name: 张洪Heo
         link: https://blog.zhheo.com/
         avatar: https://img02.anheyu.com/adminuploads/1/2022/09/02/6311fc38f1465.webp
         descr: 一个真正的大佬
       - name: 安知鱼
         link: https://blog.anheyu.com/
         avatar: https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg
         descr: 极致的Butterfly
       - name: Leonus
         link: https://blog.leonus.cn/
         avatar: https://q1.qlogo.cn/g?b=qq&nk=990320751&s=5
         descr: 优秀的Butterfly
   
   - class_name: 技术站点
     class_desc: 一些优秀的技术站点
     link_list:
       - name: Hexo
         link: https://hexo.io/zh-cn/
         avatar: https://d33wubrfki0l68.cloudfront.net/6657ba50e702d84afb32fe846bed54fba1a77add/827ae/logo.svg
         descr: Hexo官方网站
       - name: Butterfly
         link: https://butterfly.js.org
         avatar: https://butterfly.js.org/img/avatar.png
         descr: 美观且强大的Hexo主题
       - name: Pug
         link: https://www.pugjs.cn/
         avatar: https://www.pugjs.cn/img/logo.png
         descr: Pug模板引擎中文文档
   ```

<font color=red>**图库页**</font>

1. 打开终端，切换到博客工程根目录下，执行如下命令

   ```shell
   hexo new page gallery
   ```

   执行成功以后，就会在博客根目录下的`/source`目录下生成一个名为`gallery`的子文件夹，文件夹中生成了一个名为`index.md`的文件，这个文件就是最终的图库页！

2. 在页面中使用标签外挂来实现图片

   ```tex
   ---
   title: 照片展
   date: 2023-01-01 06:00:00
   aside: false
   ---
   
   
   <div class="gallery-group-main">
   {% galleryGroup '壁紙' '收藏的一些壁紙' '/gallery/wallpaper' https://i.loli.net/2019/11/10/T7Mu8Aod3egmC4Q.png %}
   {% galleryGroup '漫威' '关于漫威的图片' '/gallery/marvel' https://i.loli.net/2019/12/25/8t97aVlp4hgyBGu.jpg %}
   {% galleryGroup 'OH MY GIRL' '关于OH MY GIRL的图片' '/gallery/ohmygirl' https://i.loli.net/2019/12/25/hOqbQ3BIwa6KWpo.jpg %}
   </div>
   ```

3. 创建子页面。比如创建 OH MY GIRL 的子页面，则执行命令

   ```shell
   hexo new page ohmygirl
   ```

   在生成的 /blog/source/ohmygirl/index.md 文件中写入如下内容：

   ```tex
   ---
   title: OH MY GIRL
   date: 2023-01-01 06:00:00
   aside: false
   ---
   
   {% gallery %}
   ![](https://i.loli.net/2019/12/25/Fze9jchtnyJXMHN.jpg)
   ![](https://i.loli.net/2019/12/25/ryLVePaqkYm4TEK.jpg)
   ![](https://i.loli.net/2019/12/25/gEy5Zc1Ai6VuO4N.jpg)
   ![](https://i.loli.net/2019/12/25/d6QHbytlSYO4FBG.jpg)
   ![](https://i.loli.net/2019/12/25/6nepIJ1xTgufatZ.jpg)
   ![](https://i.loli.net/2019/12/25/E7Jvr4eIPwUNmzq.jpg)
   ![](https://i.loli.net/2019/12/25/mh19anwBSWIkGlH.jpg)
   ![](https://i.loli.net/2019/12/25/2tu9JC8ewpBFagv.jpg)
   {% endgallery %}
   ```

   最后将文件夹 ohmygirl 整个剪切到 gallery 文件夹中，技能实现子页面的功能了。

<font color=red>**404页面**</font>

1. 404页面不需要使用`hexo new page`命令来创建，主题内置了 404 页面；

2. 只需要在主题配置文件中打开设置即可：

   ```yaml
   # A simple 404 page
   error_404:
     enable: true
     subtitle: '您访问的页面找不到了~'
     background: /img/error-page.png
   ```

<font color=red>**说说页**</font>

- 我觉得这个页面比较鸡肋，暂时先不配置。

<font color=red>**其他页**</font>

- 对于其他的页面也是用`hexo new page`命令来生成，但是也可以直接在资源管理器或访达中手动创建这些文件夹和文件并手动编辑；
- 在自定义的页面 Front-matter 的`type`不用配置，只是分类、标签、友情链接这三个页面需要配置，因为主题对它们进行支持；
- 如果要查看详细信息，可参考 Butterfly 的官方文档：[Butterfly 文档(二) 主题页面](https://butterfly.js.org/posts/dc584b87/)；

## 3.06：网站域名

在设置之前，网站中的文章链接或者其他部分展示网站域名的地方都是默认的`http://example.com`，比如：

![](https://img.czblogs.cn/posts/sitebuild/02/image-20260726002123558.webp)

网站的域名是在站点配置文件`_config.yml`中配置的，只需要将`url`的值改为自己的域名即可：

```yaml
# URL
## Set your site url here. For example, if you use GitHub Page, set url as 'https://username.github.io/project'
url: https://fattymonkey.github.io # 域名备案完成之前，先用这个域名
permalink: :year/:month/:day/:title/
permalink_defaults:
pretty_urls:
  trailing_index: true # Set to false to remove trailing 'index.html' from permalinks
  trailing_html: true  # Set to false to remove trailing '.html' from permalinks
```

## 3.07：永久链接

Hexo 会给每一篇博文生成一个永久性链接，默认情况下，链接的内容由博文发布时间和博文文件名称组成的。

<font color='red'>常规优化</font>：常规做法是安装 [hexo-permalink-pinyin](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fviko16%2Fhexo-permalink-pinyin) 插件，它可以将博客文件名称中的中文转为拼音，各个汉子之间用符号`-`来连接，但是如果我们在日常发布中，修改了某篇博客文件中 Front-matter 的时间或者文件名后重新发布，那么原本生成的永久链接就会失效！而且假如博客文件的中文名称很长，那么永久链接就会更长！出于这两点考虑，我选择放弃这种优化方式！

<font color='red'>我的做法</font>：我选择使用 [hexo-abbrlink](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Frozbo%2Fhexo-abbrlink) 插件来为博文生成永久静态短链接！

第一步：打开终端，切换到本地博客工程根目录下，执行安装插件的命令

```shell
npm install hexo-abbrlink --save
```

安装完以后使用 npm list 查看安装的插件：

![](https://img.czblogs.cn/posts/sitebuild/02/image-20260726005534578.webp)

第二步：打开站点配置文件，先找到并修改`permalink`，并在后面增加`abbrlink`配置

```yaml
# URL
## Set your site url here. For example, if you use GitHub Page, set url as 'https://username.github.io/project'
url: https://fattymonkey.github.io # 域名备案完成之前，先用这个域名
permalink: posts/:abbrlink.html     # 修改这里，使用hexo-abbrlink生成永久链接
permalink_defaults:
pretty_urls:
  trailing_index: true # Set to false to remove trailing 'index.html' from permalinks
  trailing_html: true  # Set to false to remove trailing '.html' from permalinks

# 新增abbrlink配置，支持博文永久链接
abbrlink:
  alg: crc32      # 用于计算短链接的算法，支持crc16(默认)和crc32
  rep: dec        # URL中短链接的编码格式，支持dec(十进制，默认)和hex(十六进制)
  drafts: false   # 是否为草稿文章生成短链接，默认关闭(false)
  force: false    # 开启强制生成模式。开启后插件会忽略缓存，为所有文章重新计算短链接，即便文章已有短链接，默认关闭(false)
  writeback: true # 是否将修改后的配置写回Markdown文件头部元数据(front-matter)，默认开启(true)
```

第三步：清理缓存后再执行`hexo generate`，可见此时默认博文的永久链接为数字类型

![](https://img.czblogs.cn/posts/sitebuild/02/image-20260726011111536.webp)

此时打开博文的MD文件，可见在 Front-metter 部分自动新增了`abbrlink`项目：

![](https://img.czblogs.cn/posts/sitebuild/02/image-20260726011218159.webp)

<font color='red'>**最后效果**</font>：

- 以后，当在`_post`文件夹中创建一个新的 Markdown 文件或者复制一个 Markdown 文件过来以后，只要执行预览或者生成静态博客文件的命令，就会在 Front-matter 中自动生成`abbrlink`的配置项；
- 无论是修改博文的文件名还是修改博文的 Front-matter 中的`date`，只要不改变`abbrlink`的值，这篇博文的链接就永远不会改变，而且链接的长度不会很长；
- 我的做法：在新建文章的时候，直接在 Front-matter 中指定`abbrlink`的值，只要跟其他文章的`abbrlink`的值不重复，就不会存在问题（<font color=red>自己写的 abbrlink 的值，要大于等于 10000，否则会被覆盖</font>）；

## 3.08：代码高亮

代码相关的设置，参考[Butterfly官方文档](https://butterfly.js.org/posts/4aa8abbe/#代碼高亮主題)，官网上写的太清楚了，没有什么坑点，我就不废话了！我这里设置如下：

```yaml
code_blocks:
  theme: ocean      # 代码高亮配色主题：darker / pale night / light / ocean / false
  macStyle: true    # 是否开启 macOS 风格代码块头部
  height_limit: 150 # 代码块默认折叠高度（单位px）
  word_wrap: false  # 代码文字自动换行
  copy: true        # 显示复制代码的按钮
  language: true    # 展示代码语言标签
  shrink: false     # 代码块初始 展开/收缩 策略
  fullpage: true    # 代码全屏查看功能
```

注意：Butterfly 还支持自定义代码块主题，详细教程在官网上也有，[参考这里](https://butterfly.js.org/posts/b37b5fe3/)！我暂时选择使用hexo内置的代码高亮。

## 3.09：社交图标

Butterfly 支持 font-awesome v6 图标，但是社交图标默认是关闭的，需要自己打开。在主题配置文件中开启：

```yaml
# Formal:
#   icon: link || the description || color
social:
  fab fa-github: https://github.com/fattymonkey || Github || '#24292e'
  fas fa-envelope: mailto:1185349843@qq.com || Email || '#4a7dbe'
```

后续我会针对这部分进行魔改，可以查阅我后面的博客。

## 3.10：页面Meta

所谓的页面 Meta 设置，就是用来修改展示文章相关信息的配置，这个配置比较简单，我的配置如下：

```yaml
post_meta:
  # 在首页上的显示
  page:
    date_type: both    # 日期显示创建日期还是更新日期或都显示，created / updated / both
    date_format: date  # 显示明确时间还是相对时间，date / relative
    categories: true   # 是否显示文章分类
    tags: false        # 是否显示文章标签(标签多了的话就很丑)
    label: true        # 是否显示时间前的文字（“发表于”、“更新于”）
  # 在文章页的显示
  post:
    position: left     # 显示位置，left / center
    date_type: both    # 日期显示创建日期还是更新日期或都显示，created / updated / both
    date_format: date  # 显示明确时间还是相对时间，date / relative
    categories: true   # 是否显示文章分类（在文章页的标题下面）
    tags: true         # 是否显示文章标签（在文章页的最后）
    label: true        # 是否显示时间前的文字（“发表于”、“更新于”）
```



# 第四节：图片设置

在 Butterfly 主题中，有很多类背景图片，这些背景图片都可以在主题配置文件中进行配置！第一次设置的时候会挺迷茫的，因为和图片相关的配置项太多了。

## 4.01：网站图标

第一步，在 [favicon.io](favicon.io) 中制作网站图标文件，制作好的文件有下面这些：

```tex
android-chrome-192x192.png
android-chrome-512x512.png
apple-touch-icon.png
favicon-16x16.png
favicon-32x32.png
favicon.ico
site.webmanifest
```

第二步，在博客根目录下的 source 目录下新建名为 img 的文件夹，并在其中再新建名为 favicon 的文件夹，然后把上述文件都放入其中：

![](https://img.czblogs.cn/posts/sitebuild/02/image-20260726021745606.webp)

第三步，打开主题根目录下的 layout/includes/head.pug 文件，找到如下位置：

```pug
!=favicon_tag(theme.favicon || config.favicon)
link(rel="canonical" href=urlNoIndex(null,config.pretty_urls.trailing_index,config.pretty_urls.trailing_html))
```

在这两行中间添加如下内容：

```pug
link(rel="icon", type="image/png", sizes="16x16", href="/img/favicon/favicon-16x16.png")
link(rel="icon", type="image/png", sizes="32x32", href="/img/favicon/favicon-32x32.png")
link(rel="apple-touch-icon", sizes="180x180", href="/img/favicon/apple-touch-icon.png")
link(rel="icon", type="image/png", sizes="192x192", href="/img/favicon/android-chrome-192x192.png")
link(rel="icon", type="image/png", sizes="512x512", href="/img/favicon/android-chrome-512x512.png")
link(rel="manifest", href="/img/favicon/site.webmanifest")
meta(name="theme-color", content="#ffffff")
```

第四步，打开 source/icon/site.webmanifest 文件，将把里面`icons`下的`src`全部加上 `/img/favicon/` 前缀：

```json
{"name":"","short_name":"","icons":[{"src":"/img/favicon/android-chrome-192x192.png","sizes":"192x192","type":"image/png"},{"src":"/img/favicon/android-chrome-512x512.png","sizes":"512x512","type":"image/png"}],"theme_color":"#ffffff","background_color":"#ffffff","display":"standalone"}
```

第五步，打开主题配置文件，找到 favicon 并进行如下配置：

```yaml
favicon: /img/favicon/favicon.ico
```

第六步，打开终端切换到博客根目录下，执行如下命令即可预览：

```shell
hexo clean && hexo server
```

## 4.02：网站头像

第一步：把自己想用的头像放到本地博客根目录下的 /source/img/avatar 中（没有目录就新建）

![](https://img.czblogs.cn/posts/sitebuild/02/image-20260726023010830.webp)

第二步：在主题配置文件，搜索`avatar`，进行如下配置

```yaml
avatar:
  img: /img/avatar/boy.webp
  effect: false
```

配置项`effect`是一个特效：

- false：鼠标悬浮和离开时头像快速旋转；
- true：头像一直旋转，并且兼具鼠标悬浮和离开时头像快速旋转

## 4.03：设置头图

顶部图又叫头图（top_img），就是首页的遮罩图片和其他页面上最上部的背景图，分为非文章页和文章页两类。

<font color=red>**对于非文章页**</font>。它的取值逻辑是：

```tex
页面Front-matter中设置的top_img > 配置文件的配置项（下面6个）> 配置文件中的 default_top_img
```

配置文件中可以配置六种非文章页的顶部图：

| 配置项           | 对应页面                                   |
| ---------------- | :----------------------------------------- |
| index_img        | 首页                                       |
| archive_img      | 归档页                                     |
| tag_img          | 标签页                                     |
| tag_per_img      | 标签子页面（不同的标签可配置不同的顶部图） |
| category_img     | 分类页                                     |
| category_per_img | 分类子页面（不同的分类可配置不同的顶部图） |

所以针对非文章页的顶部图，我采取的策略是：只在主题配置文件中配置 default_top_img。这样一来：

- 所有非文章页的顶部图全部是一个；
- 如果以后想修改某个非文章页的顶部图，就直接在对应页面的 Front-matter 中设置 top_img。

第一步，将想用的图片 whale.webp 放到本地博客根目录下的 /source/img/top_img 目录中（没有就新建）；

第二步，在主题配置文件中，修改 default_top_img 配置项：

```yaml
# If the banner of page not setting, it will show the default_top_img
default_top_img: /img/top_img/whale.webp
```

<font color=red>**对于文章页**</font>。它的取值逻辑是：

```tex
Front-matter中的top_img > Front-matter中的cover > 配置文件中的cover > 配置文件中的default_top_img
```

针对文章页的顶部图，我采取的策略是：

- 在主题配置文件中配置两张默认的 cover 图，用作默认的文章封面；
- 在文章页的 Front-matter 中只配置 cover 图（因为 cover 图负责文章卡片的封面，必须设置），这样 cover 图会成为文章页的头部图；
- 后面通过我自己的魔改，修改文章页的顶部图取值逻辑（后面魔改的部分再讲）；

第一步，将想用的图片放到本地博客根目录下的 /source/img/covers 目录中（没有就新建）；

第二步，在主题配置文件中，将图片配置到 defaut_cover 配置项：

```yaml
cover:
  # Disable the cover or not
  index_enable: true    # 是否在首页文章列表展示文章封面图
  aside_enable: true    # 是否在侧边栏中展示文章封面
  archives_enable: true # 是否在归档页展示文章封面
  default_cover:
    - /img/covers/default_cover_01.webp
    - /img/covers/default_cover_02.webp
```

## 4.04：网站背景

Butterfly 主题默认的网站背景是纯白或者纯黑（浅色模式和深色模式），可以将其修改为自己想要的图片，配置跟顶部图的配置一样，修改主题配置文件中的 background 配置项即可：

```yaml
# Website Background
# Can set it to color, image URL or an array containing colors and/or image URLs
# If an array is provided, a random background will be selected from the array on each load
background: /img/background/whale.webp
```

## 4.05：页脚背景

主题页脚的图片是由配置项 footer_img 来配置的，支持如下多种效果：

| 配置值                                                       | 效果              |
| ------------------------------------------------------------ | ----------------- |
| 留空 / false                                                 | 显示默认的颜色    |
| 图片链接                                                     | 显示配置的图片    |
| 颜色值：<br/>HEX 值 - #0000FF<br/>RGB 值 - rgb(0,0,255)<br/>顔色單詞 - orange<br/>漸變色 - linear-gradient （135deg, #E2B0FF 10%, #9F44D3 100%） | 显示对应的颜色    |
| transparent                                                  | 透明              |
| true                                                         | 显示跟top_img一样 |

我选择将页脚设置为透明：

```yaml
# The background image of footer
footer_img: transparent
```



# 第五节：首页的设置

## 5.01：头图大小位置

使用默认的：

```yaml
# The top_img settings of home page
# default: top img - full screen, site info - middle
# The position of site info, eg: 300px/300em/300rem/10%
index_site_info_top:
# The height of top_img, eg: 300px/300em/300rem
index_top_img_height:
```

## 5.02：首页的副标题

配置如下：

```yaml
# 首页副标题，The subtitle on homepage
# 主题提供了在主页标题的下面展示副标题，也可以用自己语言替换副标题，或者调用第三方服务
subtitle:
  enable: true # 总开关，设置为true的同时又不设置下面的内容，那么在主页的标题下面会显示副标题
  effect: true # Typewriter Effect (打字效果)
  # Customize typed.js (配置typed.js)
  # https://github.com/mattboldt/typed.js/#customization
  typed_option:
  # source 调用第三方服务
  # source: false 关闭调用
  # source: 1 调用一言网的一句话(简体) https://hitokoto.cn/
  # source: 2 调用一句网(简体)        https://yijuzhan.com/
  # source: 3 调用今日诗词(简体)      https://www.jinrishici.com/
  # subtitle 會先显示source，再显示sub的內容
  source: false
  # 如果关闭打字效果，subtitle只会显示sub的第一行文字
  sub:
    - 凡是可能出错的事，终将会出错。 -- 墨菲定律
    - If it can go wrong,it will -- Murphy's Law
```

## 5.03：文章卡片布局

Butterfly 主题提供了 7 种首页文章卡片的布局结构，我选择使用默认的：

```yaml
# 首页文章卡片布局
# Article layout on the homepage
# 1: Cover on the left, info on the right
# 2: Cover on the right, info on the left
# 3: Cover and info alternate between left and right
# 4: Cover on top, info on the bottom
# 5: Info displayed on the cover
# 6: Masonry layout - Cover on top, info on the bottom
# 7: Masonry layout - Info displayed on the cover
index_layout: 3
```

## 5.04：主页文章节选

因为主题 UI 的关系，主页文章节选只支持自动节选和文章页 Front-matter 中的 description，我的配置如下：

```yaml
# 首页文章卡片的节选内容
# Display the article introduction on homepage
# 1: description
# 2: both (if the description exists, it will show description, or show the auto_excerpt)
# 3: auto_excerpt (default)
# false: do not show the article introduction
index_post_content:
  method: 2
  # If you set method to 2 or 3, the length need to config
  length: 500
```

我对这里没做大修改，只把 index_post_content.method 设置为 2，因为这样一来，只要我在文章的 Front-matter 中设置了 description，那么就展示 description 的内容，否则就展示文章的前 500 个字！这样比较灵活！

提示：description 不是 Hexo 内置的 Front-matter 参数，是主题 Butterfly 自建的参数！



# 第六节：文章页设置

## 6.01：TOC目录

在每一篇文章的侧边栏会有 TOC 目录，主题配置文件中可以配置它，我的配置如下：

```yaml
# TOC目录
toc:
  post: true           # 是否在文章页展示TOC目录
  page: false          # 是否在普通页展示TOC目录
  number: false        # 是否自动给TOC添加章节数(因为我编辑文章时会自己添加数字，所以设置为false)
  expand: true         # 是否默认展开TOC(我不喜欢目录收起的功能)
  style_simple: false  # 简洁模式，设置为true的话，侧边栏就只展示TOC，只对文章页有效
  scroll_percent: true # 是否展示滚动百分比
```

PS：我后期会将其进行优化，优化后的效果为——默认展开两级，当浏览到某个三级标题时，再展开对应的三级标题！

## 6.02：文章版权

使用默认的：

```yaml
# 文章版权
post_copyright:
  enable: true  # 是否启用版权声明
  decode: true  # 是否进行URL解码，为了美观，设置为true
  author_href:  # 版权栏作者名点击的跳转链接（这里不配置也可，因为站点配置文件中已配置URL）
  license: CC BY-NC-SA 4.0
  license_url: https://creativecommons.org/licenses/by-nc-sa/4.0/
```

## 6.03：打赏赞助

第一步，将微信赞赏码和支付宝收款码图片处理好，最合适的尺寸是 260*260，正方形；

第二步，将图片放到博客根目录下的 /source/img/sponsor/ 中（如果没有这个目录就新建）；

第三步，在主题配置文件中找到 reward 配置项，进行如下配置：

```yaml
# 打赏/赞助
reward:
  enable: true
  text: 支持一下
  QR_code:
    - img: /img/sponsor/weixin.webp
    #   link:
      text: 微信
    - img: /img/sponsor/zhifubao.webp
    #   link:
      text: 支付宝
```

## 6.04：在线编辑

文章在线编辑 post_edit 功能，开启后每篇文章页的标题旁边都有一个编辑按钮：

![](https://img.czblogs.cn/posts/sitebuild/02/image-20260726034648650.webp)

点击后，直接跳转到 GitHub/Gitee 在线编辑当前文章的 Markdown 源码，方便你快速修改博文，不用本地拉取仓库。我暂时先不开启这个功能。

## 6.05：相关文章

在某篇文章的最后，上一篇下一篇的后面，会给出本站的推荐文章，相关文章的推荐原理是根据当前文章的标签的比重来推荐的！默认的配置如下，我觉得没必要修改，保持默认配置：

```yaml
# 相关文章
related_post:
  enable: true
  limit: 6           # 展示的相关文章最大数量
  date_type: created # 显示文章的创建日期或更新日期，created / updated
```

## 6.06：上/下一篇

文章的结尾处，会有上一篇下一篇的卡片按钮，默认情况下，下一篇是指你当前阅读的文章的上一篇（创建时间在当前文章的前面），这是很反人类的！可以修改默认的配置来修正这种逻辑：

```yaml
# 上/下一篇
# Choose: 1 / 2 / false
# 1: The 'next post' will link to old post
# 2: The 'next post' will link to new post
# false: disable pagination
post_pagination: 2
```

## 6.07：过期提醒

假如文章过期了，可以在文章的最上面展示提醒，默认配置为：

```yaml
# 过期提醒
noticeOutdate:
  enable: false
  style: flat    # simple / flat
  limit_day: 365 # When will it be shown
  position: top  # Position: top / bottom
  message_prev: It has been
  message_next: days since the last update, the content of the article may be outdated.
```

修改为：

```yaml
# 过期提醒
noticeOutdate:
  enable: false
  style: flat    # simple / flat
  limit_day: 365 # When will it be shown
  position: top  # Position: top / bottom
  message_prev: 这篇文章距离上次更新已经有
  message_next: 天了，或许部分内容已经不够准确，请注意甄别，欢迎留言提醒！
```

## 6.08：图片描述

在 Butteryfly 中，关于图片描述有如下的配置：

```yaml
# 图片描述
photofigcaption: true
```

在 Markdown 中，插入图片的语法是`![alt text](image.jpg)`，开启了`photofigcaption`功能后，会将 Markdown 插图中的 alt 文本作为图片的标题描述，放到图片的正下方！假如没有 alt 文本的话，就不会展示了，并且也不会留出来多余的空间！

## 6.09：分享按钮

文章底部有很多分享按钮，Butterfly 内置了两种分享系统，分别是 Sharejs 和 Addtoany，默认使用 Sharejs 即可：

```yaml
# 分享系统
share:
  use: sharejs # Choose: sharejs / addtoany，Leave it empty if you don't need share
  # Share.js
  # https://github.com/overtrue/share.js
  sharejs:
    sites: facebook,x,wechat,weibo,qq
  # AddToAny
  # https://www.addtoany.com/
  addtoany:
    item: facebook,x,wechat,sina_weibo,facebook_messenger,email,copy_link
```

## 6.10：数学公式

假如博客中需要写数学公式的话，就需要用数学渲染引擎来渲染。Butterfly 提供了两种渲染引擎：MathJax 和 KaTeX，默认是不开启的。假如不需要写数学公式的话，就没必要配置这个了。我这里使用默认的（不开启）：

```yaml
# 数学公式
# About the per_page
# if you set it to true, it will load mathjax/katex script in each page
# if you set it to false, it will load mathjax/katex script according to your setting (add the 'mathjax: true' or 'katex: true' in page's front-matter)
math:
  # Choose: mathjax, katex
  # Leave it empty if you don't need math
  use:
  per_page: true
  hide_scrollbar: false
  mathjax:
    # Enable the contextual menu
    enableMenu: true
    # Choose: all / ams / none, This controls whether equations are numbered and how
    tags: none
  katex:
    # Enable the copy KaTeX formula
    copy_tex: false
```

## 6.11：大图模式

默认情况下，文章页的图片是点不开的，就固定在文章页中，但是可以开启大图查看模式，点击后可以将图片单独点开放大查看。Butterfly 提供了两种大图查看模式，我的配置如下：

```yaml
# Choose: fancybox / medium_zoom
# https://github.com/francoischalifour/medium-zoom
# https://fancyapps.com/fancybox/
# Leave it empty if you don't need lightbox
lightbox: fancybox
```

## 6.12：文章连载

文章连载功能是默认关闭的，需要在主题配置文件中打开：

```yaml
# 文章连载功能，Series
series:
  enable: false    # 总开关
  orderBy: 'title' # title or date
  order: 1         # 排序方式，1为生序，-1为降序
  number: true     # 是否在系列列表前显示序号
```

打开以后，还要在对应文章的 Front-matter 中设置`series`值。

## 6.13：乐谱代码块

abcjs 是一个将 ABC 记谱法文本渲染成可视化五线谱乐谱的 JS 库。开启后，你可以在文章 Markdown 中写入 ABC 乐谱代码块，页面自动转换成图形乐谱。

```yaml
# 乐谱代码块，暂时用不上，保持默认关闭
# ABCJS - The ABC Music Notation Plugin
# https://github.com/paulrosen/abcjs
abcjs:
  enable: false
  per_page: true
```

## 6.14：绘图语法库

Mermaid 是绘图语法库，可以在 Markdown 中用文本代码渲染流程图、时序图、甘特图、ER 关系图等图表，非常适合技术博客。

```yaml
# 绘图语法库，Mermaid，暂时用不上，保持默认的关闭
# https://github.com/mermaid-js/mermaid
mermaid:
  enable: false
  # Write Mermaid diagrams using code blocks
  code_write: false
  # built-in themes: default / forest / dark / neutral
  theme:
    light: default
    dark: dark
  # Enable "Open in New Tab" button to view diagram in a separate window
  open_in_new_tab: true
  # Enable zoom and pan interactions on diagrams
  zoom_pan: true
```

## 6.15：前端图表库

Chart.js 是前端图表库，用于在文章里渲染折线图、柱状图、饼图、雷达图等可视化图表。我暂时用不上，保持关闭：

```yaml
# 前端图表库，chartjs
# see https://www.chartjs.org/docs/latest/
chartjs:
  enable: false
  # Do not modify unless you understand how they work.
  # The default settings are only used when the MD syntax is not specified.
  # General font color for the chart
  fontColor:
    light: 'rgba(0, 0, 0, 0.8)'
    dark: 'rgba(255, 255, 255, 0.8)'
  # General border color for the chart
  borderColor:
    light: 'rgba(0, 0, 0, 0.1)'
    dark: 'rgba(255, 255, 255, 0.2)'
  # Background color for scale labels on radar and polar area charts
  scale_ticks_backdropColor:
    light: 'transparent'
    dark: 'transparent'
```

## 6.16：Note提示块

该配置控制文章内 Note 彩色提示块（警告、提示、注意框）的外观样式，也就是常用的 `{% note %}` 标签：

```yaml
# Note提示块，Note - Bootstrap Callout
note:
  # Note tag style values:
  #  - simple    bs-callout old alert style. Default.
  #  - modern    bs-callout new (v2-v3) alert style.
  #  - flat      flat callout style with background, like on Mozilla or StackOverflow.
  #  - disabled  disable all CSS styles import of note tag.
  style: flat
  icons: true
  border_radius: 3
  # Offset lighter of background in % for modern and flat styles (modern: -12 | 12; flat: -18 | 6).
  # Offset also applied to label tag variables. This option can work with disabled note tag.
  light_bg_offset: 0
```

我这里保持默认的开启和默认的样式，没做任何修改。



# 第七节：页脚的设置

Butterfly 主题的每个页面都有页脚，页脚可以用来展示信息，默认的配置如下：

```yaml
footer:
  nav:
  owner:
    enable: true
    since: 2025
  # Copyright of theme and framework
  copyright:
    enable: true
    version: true
  custom_text:
```

## 7.01：页脚菜单

页脚的菜单（导航栏）通过`footer.nav`来进行配置，我的设置如下：

```yaml
footer:
  nav:
    - content:
      - title: 直达
        item:
          - title: 我的主页
            url: /
          - title: 随机文章
            url:
          - title: 优质网站
            url:
          - title: 访客留言
            url:
    - content:
      - title: 热类
        item:
          - title: 操作系统
            url:
          - title: 技术杂谈
            url:
          - title: 实操手记
            url:
          - title: 建站实录
            url:
    - content:
      - title: 本站
        item:
          - title: 各种统计
            url:
          - title: 文章归档
            url:
          - title: 打赏列表
            url:
          - title: 开发面板
            url:
    - content:
      - title: 关于
        item:
          - title: Cookies
            url:
          - title: 版权协议
            url:
          - title: 隐私协议
            url:
          - title: 免责声明
            url:
```

这里我暂时先按照自己的想法配置一些功能页面，这些页面需要后面取生成后，再将链接填进去，起到占位符的作用。

## 7.02：博客年份

```yaml
  owner:
    enable: true
    since: 2023
```

## 7.03：框架版本

在页脚展示 Hexo 框架和 Butterfly 主题：

```yaml
  copyright:
    enable: true
    version: false
```

## 7.04：自定义文本

页脚最后可以设置一个自定义的文本，我将其设置为：

```yaml
  custom_text: 山河漫漫，伏案拾光，留存每一段瞎折腾的细碎日常
```



# 第八节：侧边栏设置

## 8.01：基本设置

```yaml
aside:
  enable: true     # 是否启用侧边栏，设置为false的话可以关闭所有的侧边栏，并且让主体内容变宽，占据侧边栏原本的空间
  hide: false      # 是否隐藏侧边栏，设置为true的话，侧边栏会被隐藏，原本显示侧边栏的地方就成了空白区域
  button: true     # 是否在右下角显示隐藏侧边栏的按钮
  mobile: true     # 是否在移动端展示侧边栏
  position: right  # 侧边栏展示位置，left/right
  # 在下面页面是否展示侧边栏
  display:
    archive: true  # 归档页是否展示侧边栏
    tag: true      # 标签页是否展示侧边栏
    category: true # 分类页是否展示侧边栏
```

## 8.02：站长信息

```yaml
  # 站长信息卡片
  card_author:
    enable: true   # 是否显示作者信息
    description: 进一步有近一步的欢喜 # 是否展示作者名称下面的文字描述，假如不设置的话，就展示站点配置文件中的description
    button:
      enable: true # 是否显示头像下面的大按钮
      icon: fab fa-github
      text: 我的GitHub
      link: https://github.com/fattymonkey
```

## 8.03：公告卡片

```yaml
  # 公告信息卡片
  card_announcement:
    enable: true   # 是否显示公告卡片
    content: 网站重建不久，功能尚未完善，正努力建设中～～ # 公告内容
```

## 8.04：最新文章

```yaml
  # 最新文章卡片
  card_recent_post:
    enable: true   # 是否显示最新文章
    limit: 5       # 显示的数量，设置为0表示显示全部
    sort: date     # 排序方式：date / updated
    sort_order:
```

## 9.05：最新评论

```yaml
  # 最新评论卡片
  card_newest_comments:
    enable: false  # 暂时关闭
    sort_order:    # 控制评论排序规则，底层由评论接口返回默认「最新在前」，随意填写容易导致排序错乱
    limit: 6       # 最多展示多少条评论，设置为0表示展示全部
    storage: 10    # 缓存时长，单位分钟，保存到本地存储，避免每次刷新都重新请求数据
    avatar: true   # 是否显示评论者头像
```

## 8.05：分类卡片

```yaml
  # 分类卡片
  card_categories:
    enable: true   # 是否显示分类卡片信息
    limit: 0       # 显示分类数量，设置为0表示显示所有分类
    expand: none   # 是否展开分类，none / true / false
    sort_order:
```

## 8.06：标签卡片

```yaml
  # 标签卡片
  card_tags:
    enable: true    # 是否显示标签卡片
    limit: 0        # 显示标签的数量，设置为0表示显示所有分类
    color: true     # 是否显示标签颜色
    custom_colors:
    orderby: random # 标签排序方式，random/name/length
    order: 1        # 排序方式，1为生序，-1为降序
    sort_order:
```

## 8.07：归档卡片

```yaml
  # 归档卡片
  card_archives:
    enable: true      # 是否显示归档卡片
    type: monthly     # 归档类型，monthly / yearly
    format: MMMM YYYY # 归档显示格式，Eg: YYYY年MM月
    order: -1         # 排序方式，1为生序，-1为降序
    limit: 8          # 显示归档文章数量，设置为0表示显示所有分类
    sort_order:
```

## 8.08：系列卡片

```yaml
  # 文章系列卡片
  card_post_series:
    enable: true        # 是否显示
    series_title: false # 是否显示系列名称，The title shows the series name
    orderBy: 'date'     # Order by title or date
    order: -1           # 排序方式，1为生序，-1为降序
```

## 8.09：网站信息

```yaml
  # 网站信息卡片
  card_webinfo:
    enable: true         # 是否显示网站信息卡片
    post_count: true     # 是否显示文章数量
    last_push_date: true # 是否显示最后更新时间
    sort_order:
    # Time difference between publish date and now
    # Formal: Month/Day/Year Time or Year/Month/Day Time
    # Leave it empty if you don't enable this feature
    runtime_date: 2023/01/01 # 网站开始运行的时间
```

## 8.10：自定义卡片

Butterfly 主题还支持在侧边栏自定义添加栏目，我这里暂时先不添加，具体教程参考官网[自定義添加欄目](https://butterfly.js.org/posts/4aa8abbe/#%E8%87%AA%E5%AE%9A%E7%BE%A9%E6%B7%BB%E5%8A%A0%E6%AC%84%E7%9B%AE)。



# 第九节：右下角按钮

## 9.01：按钮位置

当开放 chat 聊天服务后，聊天服务的按钮可能会遮挡到右下角的按钮，所以 Butterfly 主题提供了修改右下角按钮的配置项。非必要不建议设置，默认就行。（我觉得博客网站不该有在线聊天功能，所以我压根就不需要修改这个配置）

```yaml
# The distance between the bottom right button and the bottom (default unit: px)
rightside_bottom:
```

## 9.02：繁简转换

主题内置了一个简单的简繁转换功能，采用一对一的形式配对。默认是关闭的，需要在主题配置文件中开启：

```yaml
# 繁简转换按钮
translate:
  enable: true
  # The text of a button
  default: 繁
  # the language of website (1 - Traditional Chinese/ 2 - Simplified Chinese）
  defaultEncoding: 2
  # Time delay
  translateDelay: 0
  # The text of the button when the language is Simplified Chinese
  msgToTraditionalChinese: '繁'
  # The text of the button when the language is Traditional Chinese
  msgToSimplifiedChinese: '简'
```

提示：遇到一字多繁或者一字多简的情况下，会出现不能正常转换的现象。

## 9.03：阅读模式

阅读模式下，会去掉除文章外的内容，避免干扰阅读，只会出现在文章页。默认就是开启的，不用修改配置：

```yaml
# 阅读模式
readmode: true
```

## 9.04：夜间模式

夜间模式按钮默认就有，我使用默认的配置：

```yaml
# 深色模式
darkmode:
  enable: true
  # Toggle Button to switch dark/light mode
  button: true
  # Switch dark/light mode automatically
  # autoChangeMode: 1  Following System Settings, if the system doesn't support dark mode, it will switch dark mode between 6 pm to 6 am
  # autoChangeMode: 2  Switch dark mode between 6 pm to 6 am
  # autoChangeMode: false
  autoChangeMode: false
  # Set the light mode time. The value is between 0 and 24. If not set, the default value is 6 and 18
  start:
  end:
```

## 9.05：显示百分比

在页面滚动查看时（不仅是文章页），右下角按钮显示阅读的百分比，这个功能默认是关闭的，需要修改配置来开启：

```yaml
# 显示百分比，Show scroll percent in scroll-to-top button
rightside_scroll_percent: true
```

## 9.06：按钮排序

可对右下角按钮进行排序，我这里没有修改，直接使用默认的：

```yaml
# 按钮排序
# Don't modify the following settings unless you know how they work
# Choose: readmode,translate,darkmode,hideAside,toc,chat,comment
# Don't repeat the same value
rightside_item_order:
  enable: false
  # Default: readmode,translate,darkmode,hideAside
  hide:
  # Default: toc,chat,comment
  show:
```

## 9.07：弹出动画

点击右下角设置按钮，展开 / 收起设置面板时，会带有弹出位移动画；页面初次加载，右下角按钮也会有滑入动画。

```yaml
# 右下角组建弹出动画，Animation for the bottom right config button
rightside_config_animation: true
```



# 第十节：全局的设置

## 10.01：页面锚点

文章锚点这个功能在分享文章链接时还是很好用的，但是我觉得它弊大于利，所以我还是使用默认的，不开启：

```yaml
# 页面锚点
anchor:
  # When you scroll, the URL will update according to header id.
  auto_update: false
  # Click the headline to scroll and update the anchor
  click_to_scroll: false
```

## 10.02：复制行为

可设置网站是否可以复制、复制的内容是否添加版权信息，我的配置如下：

```yaml
# 复制行为
copy:
  enable: true       # 是否允许复制(设置为false后，代码块仍然可以通过点击来复制全部)
  copyright:
    enable: true     # 是否在复制的内容后面加上版权信息
    limit_count: 100 # 字数限制，当复制的文字大于这个数字的时候，才增加版权信息
```

## 10.03：字数统计

Butterfly 主题可以展示字数统计，但是该功能需要安装插件 [hexo-wordcount](https://github.com/willin/hexo-wordcount)，所以需要先安装该插件！

第一步：打开终端切换到本地博客工程根目录下，执行如下命令来安装插件

```shell
npm install hexo-wordcount --save
```

![](https://img.czblogs.cn/posts/sitebuild/02/image-20260728004145620.webp)

查看确保依赖是否安装成功：

![](https://img.czblogs.cn/posts/sitebuild/02/image-20260728004249368.webp)

第二步：打开主题配置文件，进行字数统计的配置

```yaml
# 字数统计，Need to install the hexo-wordcount plugin
wordcount:
  enable: true          # 字数统计开关
  post_wordcount: true  # 文章页是否展示字数
  min2read: true        # 文章页是否展示阅读时长
  total_wordcount: true # 侧边栏站点信息中是否展示本站总字数
```

## 10.04：访问统计

```yaml
# 不蒜子访问统计，Busuanzi count for PV / UV in site
busuanzi:
  site_uv: true # 显示独立访客数量
  site_pv: true # 显示总浏览量
  page_pv: true # 显示文章浏览量
```

注意：假如想修改这里的文字，就修改主题根目录下的`languages`中的`zh-CN.yml`文件！

## 10.05：搜索功能

Butterfly 主题提供了两种本地搜索的选项，我选择使用的是插件 [hexo-generator-search](https://github.com/wzpan/hexo-generator-search)。

第一步：打开终端切换到本地博客工程根目录下，执行如下命令来安装插件

```shell
npm install hexo-generator-search --save
```

![](https://img.czblogs.cn/posts/sitebuild/02/image-20260728005737671.webp)

查看确保依赖是否安装成功：

![](https://img.czblogs.cn/posts/sitebuild/02/image-20260728005924383.webp)

第二步：打开站点配置文件，添加如下的配置

```yaml
# 本地搜索
search:
  path: search.xml
  field: all
  content: true
```

第三步：打开主题配置文件，修改`search`配置项：

```yaml
search:
  # Choose: algolia_search / local_search / docsearch
  # leave it empty if you don't need search
  use: local_search                   # 选择使用哪一套搜索引擎
  placeholder: 请输入您要搜索的关键字     # 搜索框显示的提示词
  # Algolia Search
  algolia_search:
    hitsPerPage: 6
  # Local Search
  local_search:
    preload: false       # 是否预加载search.xml索引文件，true：用户打开页面就开始加载；false：用户打开搜索框才加载
    top_n_per_article: 1 # 每一篇文章最多提取几条匹配片段展示
    unescape: true       # 是否反转义 HTML 字符，处理文章里 &lt; &gt; 这类转义字符，适合代码量大的技术博客，防止搜索结果显示乱码
    pagination:
      enable: true       # 是否开启搜索结果分页
      hitsPerPage: 8     # 搜索弹窗里，每页最多展示8条文章结果。
    CDN: # 自定义search.xml文件的CDN地址，配合preload=false，这里留白即可
```

## 10.06：评论系统

关于评论系统，我后面会单开一篇文章来详细介绍配置，这里先跳过，保持默认配置即可。

## 10.07：在线聊天

```yaml
# 在线聊天，对于博客网站来说，我觉得没必要，保持默认配置，不开启
chat:
  # Choose: chatra/tidio/crisp/knocket
  # Leave it empty if you don't need chat
  use:
  # Chat Button [recommend]
  # It will create a button in the bottom right corner of website, and hide the origin button
  rightside_button: false
  # The origin chat button is displayed when scrolling up, and the button is hidden when scrolling down
  button_hide_show: false
# https://chatra.io/
chatra:
  id:
# https://www.tidio.com/
tidio:
  public_key:
# https://crisp.chat/en/
crisp:
  website_id:
# https://trtc.io/solutions/knocket
knocket:
  identifier:
```

## 10.08：分析统计

```yaml
# 访客分析统计，我觉得作用不大，不配置不开启（如果后期增加网站统计页面，或许可以从这里面找到灵感）
# https://tongji.baidu.com/web/welcome/login
baidu_analytics:
# https://analytics.google.com/analytics/web/
google_analytics:
# https://www.cloudflare.com/zh-tw/web-analytics/
cloudflare_analytics:
# https://clarity.microsoft.com/
microsoft_clarity:
# https://umami.is/
umami_analytics:
  enable: false
  # For self-hosted setups, configure the hostname of the Umami instance
  serverURL:
  script_name: script.js
  website_id:
  option:
  UV_PV:
    site_uv: false
    site_pv: false
    page_pv: false
    # Umami Cloud (API key) / self-hosted Umami (token)
    token:
# https://www.googletagmanager.com/
google_tag_manager:
  tag_id:
  # optional
  domain:
```

## 10.09：广告集成

主题已经集成了谷歌广告和自定义广告，对于小白建站来说，可以不用管，暂时先不配置，默认不开启即可：

```yaml
# 广告，Advertisement，暂时不开启，保持默认配置
# Google Adsense
google_adsense:
  enable: false
  auto_ads: true
  js: https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js
  client:
  enable_page_level_ads: true
# Insert ads manually
# Leave it empty if you don't need ads
ad:
  # Insert ads in the index (every three posts)
  index:
  # Insert ads in aside
  aside:
  # Insert ads in the post (before pagination)
  post:
```

## 10.10：网站验证

网站验证这里，分为两种情况：

- 情况 A：你不在乎搜索引擎流量，不主动管收录；只是自己写写博客、分享给朋友看，完全不用配置，保持默认注释状态即可，百度爬虫想爬就爬，随缘。
- 情况 B：你希望更多陌生人通过百度搜到你的技术文章，那么就得配置了，具体步骤如下
  - 去「百度搜索资源平台」注册账号
  - 添加你的域名
  - 启用这个验证配置，填入验证码，完成所有权校验
  - 之后就可以主动推送文章链接，优化收录

最好是开启，因为我当前的域名还没备案完成，所以暂时不开启，保持默认配置即可：

```yaml
# 网站验证，Verification，域名备案完成以后，再来考虑配置网站验证
site_verification:
  # - name: google-site-verification
  #   content: xxxxxx
  # - name: baidu-site-verification
  #   content: xxxxxxx
```



# 十一节：美化和特效

## 11.01：自定义主题配色

Butterfly 主题支持用户自定义颜色，我这里先不配置，保持默认配置，后面会专开一篇文章来介绍：

```yaml
# 自定义主题配色
# Theme color for customize
# Notice: color value must in double quotes like "#000" or may cause error!
# theme_color:
#   enable: true
#   main: "#49B1F5"
#   paginator: "#00c4b6"
#   button_hover: "#FF7242"
#   text_selection: "#00c4b6"
#   link_color: "#99a9bf"
#   meta_color: "#858585"
#   hr_color: "#A4D8FA"
#   code_foreground: "#F47466"
#   code_background: "rgba(27, 31, 35, .05)"
#   toc_color: "#00c4b6"
#   blockquote_padding_color: "#49b1f5"
#   blockquote_background_color: "#49b1f5"
#   scrollbar_color: "#49b1f5"
#   meta_theme_color_light: "ffffff"
#   meta_theme_color_dark: "#0d0d0d"
```

## 11.02：文章列表的样式

除了主页的文章列表样式可以修改以外（`index_layout`），主题还支持修改归档页和标签页的文章列表样式：

```yaml
# 文章列表样式（设置为index可以让分类页和标签页的文章列表跟主页一样，留空则跟归档页一样）
category_ui:
tag_ui:
```

## 11.03：界面组件的圆角

```yaml
# 界面组件圆角样式（true：开启圆角，false：关闭圆角）
rounded_corners_ui: true
```

## 11.04：文本行两端对齐

开启这个配置项，可以让文章正文部分的文字两端对齐（对最后一行无效），这样更美观，建议开启，默认是不开启的：

```yaml
# 文本行两端对齐
text_align_justify: true
```

## 11.05：头部页脚遮蔽色

为了避免图片过于鲜艳而导致文字无法阅读，默认为顶部图和页脚添加黑色遮罩：

```yaml
mask:
  header: true # 头部添加遮罩
  footer: true # 页脚添加遮罩
```

## 11.06：预加载动画配置

在页面之间跳转时，展示预加载动画，但是开启后会额外增加 JS/CSS 请求，我就保持默认不开启了：

```yaml
# 预加载动画配置
preloader:
  enable: false
  # source
  # 1. fullpage-loading
  # 2. pace (progress bar)
  source: 1
  # pace theme (see https://codebyzach.github.io/pace/)
  pace_css_url:
```

## 11.07：页面的过渡动画

开启以后，页面切换淡入动画；点击链接跳转新页面时，内容会淡入显示。但是这个要配合 Pjax 才生效，如果 Pjax 关闭的话，这个动画不会触发。因为我的网站是开启了 Pjax 的，所以这里我也开启：

```yaml
# 页面的过渡动画，Page Transition，开启的话也需要开启Pjax才有效
enter_transitions: true
```

## 11.08：默认的明暗模式

```yaml
# 默认的明暗模式 - light (default) / dark
display_mode: light
```

## 11.09：页面的美化增强

开启以后，可以控制给哪个页面的内容进行美化增强，我不喜欢这个功能，使用默认的不开启：

```yaml
# 页面的美化增强，Configuration for beautifying the content of the article
beautify:
  enable: false
  # Specify the field to beautify (site or post)
  field: post
  # Specify the icon to be used as a prefix for the title, such as '\f0c1'
  title_prefix_icon:
  # Specify the color of the title prefix icon, such as '#F47466'
  title_prefix_icon_color:
```

## 11.10：全局的字体设置

可以设置全站全局的字体族和字体大小，我觉得 Butterfly 的字体逻辑在这里是有一些问题的，就不在这进行配置，后续我会在魔改的文章中进行详细操作，主题配置文件里先保持默认的留空：

```yaml
# 全局的字体设置，Global font settings，不在这里修改，后续魔改再来分析
# Don't modify the following settings unless you know how they work
font:
  global_font_size:
  code_font_size:
  font_family:
  code_font_family:
```

## 11.11：标题专用的字体

```yaml
# 标题专用的字体，不在这里进行配置
# Font settings for the site title and site subtitle
blog_title_font:
  font_link:
  font_family:
```

## 11.12：分割线图标设置

```yaml
# 分割线图标设置，没啥改头，先随便换个图标
hr_icon:
  enable: true
  # The unicode value of Font Awesome icon, such as '\3423'
  icon: '\f0c4' # 填入FontAwesome图标的Unicode编码，格式示例：'\f0c4'
  icon_top:
```

## 11.13：打字的火花特效

```yaml
# 打字的火花特效
# https://github.com/disjukr/activate-power-mode
activate_power_mode:
  enable: true   # 总开关
  colorful: true # true：彩色火花粒子，false：单色粒子
  shake: false   # 屏幕震动效果
  mobile: true   # 移动端是否开启
```

## 11.14：背景的粒子特效

主题提供了三种特效，我选择使用第三种：

```yaml
# 背景特效，彩带飘带
# See: https://github.com/hustcc/ribbon.js
canvas_ribbon:
  enable: false
  # The size of ribbon
  size: 150
  # The opacity of ribbon (0 ~ 1)
  alpha: 0.6
  zIndex: -1
  click_to_change: false
  mobile: false
# 背景特效，飘动丝带
canvas_fluttering_ribbon:
  enable: false
  mobile: false
# 背景特效，鼠标连线粒子
# https://github.com/hustcc/canvas-nest.js
canvas_nest:
  enable: true
  color: '0,0,255' # 线条RGB颜色，蓝色
  opacity: 0.7     # 线条透明度
  # The z-index property of the background
  zIndex: -1
  # The number of lines
  count: 199        # 粒子数量，数字越大越耗性能
  mobile: false     # 移动端存在严重问题，不启用
```

## 11.15：鼠标点击的特效

主题提供了三种鼠标点击的特效，我选择使用爱心特效：

```yaml
 鼠标点击烟花特效
fireworks:
  enable: false
  zIndex: 9999
  mobile: false
# 鼠标点击爱心特效
click_heart:
  enable: true
  mobile: true
# 鼠标点击文字特效
clickShowText:
  enable: false
  text:
    # - I
    # - LOVE
    # - YOU
  fontSize: 15px
  random: false
  mobile: false
```



# 十二节：其他的设置

## 12.01：Pjax

开启 Pjax 能让站内链接跳转不整页刷新，仅替换页面主体内容；导航栏、全局播放器、侧边栏 DOM 保留，还能实现诸如切页音乐不断播这种功能。默认是关闭的，我选择开启：

```yaml
pjax:
  # 总开关
  enable: true
  # 排除的页面，列表内的页面被访问时，会强制整页刷新，不使用 Pjax，such as '/music/'
  exclude:
    # - /xxxxxx/
```

只有开启了这个，才能实现：

- 页面过渡动画，`enter_transitions`；
- 页面跳转时音乐不断播；

## 12.02：APlayer

主题内置的音乐播放器，我暂时先不开启，后面会单独记录这部分的魔改，先保持默认的关闭配置：

```yaml
# APlayer音乐播放器，Inject the css and script (aplayer/meting)
aplayerInject:
  enable: false  # 总开关
  per_page: true # true:只有页面检测到存在嵌入式播放器代码才加载播放器脚本；false:所有页面一律强制加载播放器资源
```

## 12.03：Snackbar

Snackbar 就是页面底部弹出的轻消息提示条（Toast），比如访客操作反馈、欢迎提示、复制成功等，我的配置如下：

```yaml
# Snackbar - Toast Notification
# https://github.com/polonel/SnackBar
# position: top-left / top-center / top-right / bottom-left / bottom-center / bottom-right
snackbar:
  enable: true        # 总开关
  position: top-right # top-left / top-center / top-right / bottom-left / bottom-center / bottom-right
  bg_light: '#49b1f5' # 浅色模式时的弹窗背景
  bg_dark: '#1f1f1f'  # 深色模式时的弹窗背景
```

## 12.04：Instantpage

这个配置的作用是：当鼠标悬停到链接上超过 65 毫秒时，Instantpage 会对该链接进行预加载，可以提升访问速度。访客体验更好，站内跳转感觉飞快，不需要等待加载。

但我不开启这个功能，因为哪怕访客只是鼠标划过链接、最终不点进去，网页依旧会被下载，造成额外的资源消耗：

```yaml
# Instant.page
# https://instant.page/
instantpage: false
```

## 12.05：Lazyload

图片懒加载：不在可视区域内的图片，暂时不加载；滚动到视野内再请求图片资源，有效降低首屏加载体积、加快页面打开速度。我的配置如下：

```yaml
# 图片懒加载，Lazyload
# https://github.com/verlok/vanilla-lazyload
lazyload:
  enable: true # 总开关
  native: true # 使用浏览器原生懒加载
  field: post  # 只对文章页的图片生效
  placeholder: # 占位图片地址，留空则使用默认空白占位
  blur: true   # 启用模糊渐进加载，如果不启用图片加载完成就直接出现
```

## 12.06：PWA

Progressive Web App 渐进式网页应用，我不打算开启这个功能：

```yaml
# Progressive Web App 渐进式网页应用，PWA
# See https://github.com/JLHwung/hexo-offline
pwa:
  enable: false
  manifest:
  apple_touch_icon:
  favicon_32_32:
  favicon_16_16:
  mask_icon:
```

## 12.07：Open Graph

先用大白话说明什么是 Open Graph。当你把博客文章链接转发到微信、QQ、Discord、知乎、Twitter等平台时。

- 不开启 Open Graph

  平台只能抓取纯文字链接，预览很简陋，没有封面图、简介，只有光秃秃一串网址。

- 开启 Open Graph

​	网页头部自动写入元信息。社交平台读取这些信息，生成漂亮的卡片预览。

使用默认的配置即可：

```yaml
# Open graph meta tags，社交分享预览，保持默认开启即可
# https://hexo.io/docs/helpers#open-graph
Open_Graph_meta:
  enable: true
  option:
    # twitter_card:
    # twitter_image:
    # twitter_id:
    # twitter_site:
    # google_plus:
    # fb_admins:
    # fb_app_id:
```

只要设置了`enable`为`true`，当你分享到微信、QQ、飞书等平台会自动生成 OG 数据。至于注释的这些海外账户，则不需要配置。

## 12.08：结构化数据

Structured Data，给搜索引擎（谷歌、必应）提供标准化页面信息，帮助搜索引擎识别文章类型、作者、发布时间、封面图。它的作用是优化搜索引擎收录，有机会在搜索结果展示富媒体摘要（大图、评分等增强展示）。因为开启以后只增加一小段 HTML，开销很低，所以我这里选择开启：

```yaml
# Structured Data，结构化数据，优化SEO
# https://developers.google.com/search/docs/guides/intro-structured-data
structured_data:
  enable: true
  # Alternate name for the site, used in structured data
  # Format: ['name1', 'name2']
  alternate_name:
```

## 12.09：CSS 前缀

有些 CSS 并不是所有浏览器都支持，需要增加对应的前缀才会生效。开启这个配置后，会自动为一些 CSS 增加前缀，但同时会增加 20% 的体积。

```yaml
# Add the vendor prefixes to ensure compatibility
css_prefix: true
```

## 12.10：Inject

如果你想添加额外的js、css、meta等东西，可以在主题配置文件的`Inject`里添加，支持添加到 head（`</body>`标签之前）和 bottom（`</html>`标签之前）。

注意一：在主题配置文件的`inject`中，要以标准的 html 格式添加内容；

```yaml
inject:
  head:
  	- <link rel="stylesheet" href="/self.css">
  bottom:
  	- <script src="xxxx"></script>
```

注意二：若你网站根目录不是`/`，使用本地图片时，需加上你的根目录，如网站是`https://yoursite.com/blog`，引用 css/xx.css，则设置为

```yaml
inject:
  head:
  	- <link rel="stylesheet" href="/blog/css/xx.css">
```

## 12.11：CDN

Butterfly 主题页面运行需要很多外部文件：图标库、jQuery、代码高亮 JS、Math 公式脚本等等。默认情况下，主题内置本地加载。CDN 配置作用：把这些静态资源地址替换成公共 CDN 网络链接。

简单理解：

- 不配置 CDN：访客打开网页，从你的博客服务器下载这些 js、css 文件；
- 配置 CDN：访客从「公共加速节点」下载文件。

针对我目前的博客来说，暂时先不配置 CDN，这也是 Butterfly 主题默认的行为。等以后加载缓慢了，再来优化这部分。
