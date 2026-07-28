---
title: Butterfly主题之评论系统
date: 2023-04-03 06:06:18
updated: 2026-04-03 19:33:58
description: Hexo + Butterfly + Twikoo，保姆级教程
categories:
  - 建站实录
tags:
  - Hexo
  - Butterfly
  - Twikoo
  - MongoDB
  - Twikoo
  - Netlify
abbrlink: 10403
cover: img/covers/sitebuild/03.webp
---



# 第一节：评论系统

静态博客没有后台，自然也就没有数据库，所以静态博客的硬伤就是评论系统，Hexo 如此，Hugo 也是如此！由于我个人在搭建 Hexo 博客之前也没用过静态博客，所以对市面上五花八门的第三方评论系统也没有亲身体会过（~~没有实践就没有发言权~~）！

好在网上有很多经验丰富的博主，他们给出了一些总结性的见解，我主要参考了下面这些大神的文章：

- [《静态博客评论系统的选择》](https://eallion.com/comments/)—— [小小的大蜗牛](https://eallion.com/)；
- [《静态博客有哪些评论系统？》](https://yoouu.cn/2022-11-10-comment-system-for-static-blog/)—— [SunSeekerX](https://yoouu.cn/)

现总结如下，第三方评论系统主要分为三类：

- <font color=red>第一类：基于 SaaS 的评论解决方案，无需部署，引入 API 就可以使用的第三方评论系统</font>

  包括 Disqus、多说、来必力等，其中 Disqus 就是目前最优秀的评论系统。久经考验，服务稳定，体验良好。不仅限于博客，在各行各业的网站上都能看到它的身影。但是迫于中国的网络环境，在境内并不能使用原生 Disqus，所以不建议面向中文读者的网站使用 Disqus。

- <font color=red>第二类：基于 Github Issues 的评论系统，依靠 Github 提供服务</font>

  包括 Gitalk、Gitment、Utterances，其中比较推荐的是 Utterances，因为跟其他两个相比，这个评论系统要求的用户权限很少，其他两个要的用户权限很大，存在很大的安全问题！但是，他们依托于 Github 的服务，同样会因为网络问题在国内受限。

- <font color=red>第三类：基于 PaaS 的评论系统，需要自己部署在诸如 LeanCloud 这类平台上</font>

  包括 Valine 和它的一些衍生品，现在这类评论系统很火爆，部署简单，容易上手，有很多保姆级别的教程，还有数不胜数的自定义样式，连小白也能轻松配置。

  但是伴随着 Valine 流行度的上升和用户下沉，它的问题也慢慢浮现。比如它不再开源、安全问题越来越多、它依赖的后端 LeanCloud 限流，LeanCloud 自己也出过安全问题，处于这些考虑，基本上就可以放弃 Valine 了！

  但是在种种情况下，Valine 的衍生品就来了，各路豪杰纷纷表示要重新创造轮子，在网上也能搜到不少半成品，目前有两个比较优秀 -- Twikoo 和 Waline

  Twikoo 采用腾讯云开发 CloudBase 作为后端数据库（当然也可以使用其他的平台），隐私安全，但是可能部署起来没那么简单；而 Waline 诞生的主要原因就是为了解决 Valine 的安全性问题。



# 第二节：写在前面

## 2.01：主题内置

Butterfly 5.5.5 内置支持的评论系统有如下这些：

- Disqus；
- Disqusjs；
- Livere（来必力）；
- Gitalk；
- Valine；
- Waline；
- Utterances；
- Facebook Comments；
- Twikoo；
- Giscus；
- Remark42；
- Artalk；

## 2.02：我的选择

主题原生支持的评论系统有很多，我们需要做个选择。首先排除掉 gitalk、disqus、disqusjs；来必力就算了，当初号称国内最大的多说都倒了，更别说这个来自韩国的了；valine 还好，但是限流比较严重；剩下比较主流的就是 Twikoo 和 Waline 了，我们可以从这两个中选择一个！

我选择的是 [Twikoo](https://twikoo.js.org)，这个评论系统现在非常火，使用它的人非常多，而且它的官方文档是中文的，它的优点非常多，而缺点基本上只有一个，就是不支持 IE 浏览器（估计现在也没有人使用 IE 浏览器了），所以这个缺点可以忽略。关于 Twikoo 的详细介绍，可以直接查看官网。

总之，跟其他评论系统相比 Twikoo 具备以下特点：

- 免费且开源，正是因为开源，所以才值得信任；
- 没有广告，不像 Disqus 这种带广告的，恶心至极；
- 匿名性好，不强制要求评论者登录社交账号；
- 有新的评论时，站长可以收到即时通知，比如邮箱和微信；
- 游客的评论被回复时，游客也可以收到邮件提醒；
- 支持评论数据的导入和导出；

[Twikoo的官方文档](https://twikoo.js.org)是中文的，非常友好！此外，使用 Twikoo 的人非常多，假如遇到了问题去网上找解决方案也是比较方便的，所以我才选择了它！

像 Twikoo 这类 web app 的配置思路大致是：数据库负责储存数据，deploy 平台通过执行代码来将其变为 app，最后连接到博客从而在网页显示出来。所以必须按顺序操作，每一步都需要前一步得到的信息从而连接到一起！

## 2.03：配置流程

访问 Twikoo 的[快速上手](https://twikoo.js.org/quick-start.html)，可见 Hexo 博客配置 Twikoo 评论系统，总体而言分为两个部分：

- 云函数部署；
- 前端部署；

## 2.04：版本一致

千万要注意一点，就是部署时要注意<font color=red>保持二者版本一致</font>！部署之前我们还不知道云函数部分的版本，但是本地的前端版本我们可以知道。打开主题根目录下的 plugins.yml 文件，可以找到前端版本：

![](https://img.czblogs.cn/posts/sitebuild/03/image-20260728164748696.webp)

后面部署完成以后，假如发现部署失败，可以先检查下版本号是否一致！



# 第三节：云函数部署

## 3.01：选择部署平台

Twikoo 的云函数支持多种部署平台，官网上有说明，我们来分析一下各种部署平台的优劣：

- 腾讯云一键部署：部署简单，但是仅支持按量计费环境，也就是说，当免费资源用尽后将会产生费用；
- 腾讯云手动部署：需付费购买开发环境才能部署，但现在计费方式进行了修改，免费资源用尽以后采取按量计费；
- 腾讯云命令行部署：仅针对具有 Nodejs 开发经验的开发者；
- Vercel 部署：免费，在中国大陆访问速度较慢甚至无法访问，但是可以通过绑定自己的域名来提高访问速度；
- Railway 部署：部署简单，有免费额度，但不足以支持一个月的运行，适合全球访问；
- Zeabur 部署：需要绑定支付宝或信用卡，部署简单，适合中国大陆访问，免费计划环境随时可能会被删除。
- Netlify 部署：有充足的免费额度，中国大陆访问速度不错。
- Hugging Face 部署：免费，中国大陆访问速度不错。允许通过 Cloudflare Tunnels 自定义域名。
- AWS Lambda 部署：全球最大的云平台，适合已经使用 AWS 全家桶的用户。
- Cloudflare workers 部署：部署需使用命令行，冷启动时间较短，功能有部分限制。
- 私有部署：适用于有服务器的用户，需要自行申请 HTTPS 证书。
- 私有部署（Docker）：适用于有服务器的用户，需要自行申请 HTTPS 证书。

首先，从访问速度来看，首选腾讯云的平台。但是这些平台都是需要收费的，并且都是按量计费，一旦网站被恶意攻击刷流量的话，可能一觉醒来就欠了平台好多钱，所以我放弃了腾讯云平台，虽然它优秀的访问速度是很大的吸引力！

其次，私有部署也不是很好的选择，首先你需要购买服务器，先不说云服务器昂贵的价格让我望而却步，而且还需要自己申请 SSL 证书，还要实名认证，整体上部署起来很复杂，所以基本上可以放弃了！

再有，因为各种原因，Railway、Zeabur、AWS Lambda、Cloudflare workers 这四个也都排除掉。现在看来，能选的就只有 Vercel、Netlify、Hugging Face 这三个了。但是：

- Vercel 的官方域名`*.vercel.app`在中国大陆访问速度较慢甚至无法访问，需要绑定自己的域名，排除；
- Hugging Face 部署的环境，由于默认的邮件端口被屏蔽，无法使用邮件功能，排除；

所以最后，我只有一个选择，那就是 Netlify。

## 3.02：注册云数据库

要注册的是 MongoDB Atlas，它是一个云数据库平台，云 MongoDB 的本质是把数据库安装在远程服务器上，并对外暴露一个服务地址，我们用这个服务地址来连接数据库进行操作。访问 [MongoDB Atlas 官网注册页](https://www.mongodb.com/cloud/atlas/register) 进行注册，具体的操作步骤就不废话了。提示：在注册的过程中会默认创建 Project 和 Cluster：

- Project：项目，Project 相当于文件夹，在里面可以新建多个数据库集群 Cluster；
- Cluster：数据库集群，这个就是数据库实例，免费账户只能创建一个数据库集群；

为了演示的准确性，我把注册过程中创建的项目和集群都删掉了，重新创建来记录这部分操作。

## 3.03：创建 Project

点击左侧栏的 All Projects，点击 Create new project，然后填写一个 project name：

![](https://img.czblogs.cn/posts/sitebuild/03/image-20260715201632891.webp)

点击 Next，接着点击 Create Project：

![](https://img.czblogs.cn/posts/sitebuild/03/image-20260715201815394.webp)

完成创建后，可见创建的 Project0：

![](https://img.czblogs.cn/posts/sitebuild/03/image-20260715201945899.webp)

## 3.04：创建 Cluster

集群（Cluster）就是最底层的数据库实例，点击上图页面中间的 Create，进入创建集群：

![](https://img.czblogs.cn/posts/sitebuild/03/image-20260715203026599.webp)

这里的 Region 选择 us-east 而不选择更近的香港或新加坡，是因为：Twikoo后端跑在 Netlify Functions（Lambda），是函数去主动连接 MongoDB Atlas，延迟取决于：函数所在机房和集群机房的距离，和你网站的访客在哪无关！

创建数据库成功以后，紧接着 MongoDB Atlas 会指引我们去连接数据库：

![](https://img.czblogs.cn/posts/sitebuild/03/image-20260715204126484.webp)

我这里不用它的指引，选择自己配置，所以点击上图中 Close 即可：

![](https://img.czblogs.cn/posts/sitebuild/03/image-20260715204535730.webp)

## 3.05：创建数据库用户

点击上图中的左侧栏下面的 Database & Network Access，然后点击页面中心的 Add New Database User：

![](https://img.czblogs.cn/posts/sitebuild/03/image-20260715204816042.webp)

第一步，验证方式选择密码验证：

![](https://img.czblogs.cn/posts/sitebuild/03/image-20260715205120987.webp)

第二步，填入用户名和密码（注意：这里的密码要保存好，后面不好找）：

![](https://img.czblogs.cn/posts/sitebuild/03/image-20260715205801361.webp)

第三步，Database User Privileges 选择 Built-in-Role 的 Atlas admin：

![](https://img.czblogs.cn/posts/sitebuild/03/image-20260715210136916.webp)

最后点击 Add User，完成创建：

![](https://img.czblogs.cn/posts/sitebuild/03/image-20260715210435997.webp)

## 3.06：添加网络白名单

新建的集群（数据库）默认只允许被当前访问的电脑 IP 地址访问（点击上图中侧边栏的 IP Access List 可查看）：

![](https://img.czblogs.cn/posts/sitebuild/03/image-20260715210754879.webp)

因为 Vercel / Netlify / Lambda 的出口地址不固定，所以必须为集群配置一个允许任何 IP 地址访问的白名单。

点击上图中的 +ADD IP ACCESS 按钮，添加一个`0.0.0.0/0`的 IP 地址：

![](https://img.czblogs.cn/posts/sitebuild/03/image-20260715211434961.webp)

稍等片刻，等配置生效：

![](https://img.czblogs.cn/posts/sitebuild/03/image-20260715211600408.webp)

## 3.07：获取链接字符串

返回 Project Overview 页面，点击下图中的连接按钮：

![](https://img.czblogs.cn/posts/sitebuild/03/image-20260715211901090.webp)

连接方式选择 Drivers，记录下来连接字符串：

![](https://img.czblogs.cn/posts/sitebuild/03/image-20260715212242032.webp)

将连接字符串中的 `<db_password>` 修改为刚刚创建的数据库密码，并保存下来，这个就是最终的连接字符串！

## 3.08：申请并登录平台

申请并登录 [Netlify](https://app.netlify.com/)，创建一个 Team（建议用 GitHub 账号登录）：

![](https://img.czblogs.cn/posts/sitebuild/03/image-20260715212946648.webp)

## 3.09：复刻GitHub仓库

浏览器访问 [twikoojs/twikoo-netlify](https://github.com/twikoojs/twikoo-netlify) ，点击 fork 按钮将这个仓库 fork 到自己的 GitHub 上：

![](https://img.czblogs.cn/posts/sitebuild/03/image-20260715213307437.webp)

信息选择默认的即可，直接点击 Create fork 按钮：

![](https://img.czblogs.cn/posts/sitebuild/03/image-20260715213557925.webp)

然后这个仓库就在自己的 GitHub 中了：

![](https://img.czblogs.cn/posts/sitebuild/03/image-20260715213833047.webp)

## 3.10：平台中创建项目

返回 Netlify 首页，选择 Import a Git repository 来创建 Project，点击 GitHub 按钮：

![](https://img.czblogs.cn/posts/sitebuild/03/image-20260715214706961.webp)

然后安装源码：

![](https://img.czblogs.cn/posts/sitebuild/03/image-20260715214946114.webp)

然后需要输入 GitHub 密码来验证，验证成功以后：

![](https://img.czblogs.cn/posts/sitebuild/03/image-20260715215136859.webp)

## 3.11：平台中部署项目

点击上图中的红色方框位置，进入 Project 的配置页面。先配置项目名称：

![](https://img.czblogs.cn/posts/sitebuild/03/image-20260715215926444.webp)

往下拉，然后点击 Add environment variables，选择 Add key/value pairs，Key 输入 `MONGODB_URI`，Value 则输入前面 3.07 中得到的最终的数据库连接字符串：

![](https://img.czblogs.cn/posts/sitebuild/03/image-20260715220456104.webp)

最后，点击上图中的 Deploy ping-lun 按钮，开始部署项目，部署完成后：

![](https://img.czblogs.cn/posts/sitebuild/03/image-20260715220904629.webp)

点击上图中的链接，浏览器跳转，显示如下情况表明部署成功了：

![](https://img.czblogs.cn/posts/sitebuild/03/image-20260715221140563.webp)

这里的`https://ping-lun.netlify.app/.netlify/functions/twikoo`就是你的<font color=red>**环境id**</font>！



# 第四节：前端部署

因为 Butterfly 主题本身提供了对 Twikoo 的支持，所以前端配置就简单很多了！

## 4.01：开启评论

打开主题配置文件，配置 Twikoo 为我们博客的评论系统：

```yaml
comments:
  # Up to two comments system, the first will be shown as default
  # Leave it empty if you don't need comments
  # Choose: Disqus/Disqusjs/Livere/Gitalk/Valine/Waline/Utterances/Facebook Comments/Twikoo/Giscus/Remark42/Artalk
  # Format of two comments system : Disqus,Waline
  use: Twikoo            # 指定启用哪一套评论系统
  # Display the comment name next to the button
  text: true             # 页面评论切换按钮上，是否显示文字名称，配置为true，按钮上显示“评论”二字
  # Lazyload: The comment system will be load when comment element enters the browser's viewport.
  # If you set it to true, the comment count will be invalid
  lazyload: false        # 评论懒加载，如果开启了，评论数量统计将实效
  # Display comment count in post's top_img
  count: false           # 是否在文章页的顶部图封面区域，显示本篇文章评论数量
  # Display comment count in Home Page
  card_post_count: false # 是否在博客首页文章卡片上，显示每篇文章评论数量
```

## 4.02：配置环境

打开主题配置文件，配置 Twikoo 的环境 id：

```yaml
# Twikoo
# https://github.com/imaegoo/twikoo
twikoo:
  envId: https://ping-lun.netlify.app/.netlify/functions/twikoo # 环境id，即Twikoo后端服务地址
  region:        # 留空，配置了反而会报错
  visitor: false # 是否开启Twikoo访客统计，不开启，因为我们不用Twikoo统计访问量
  option:        # Twikoo 原生 JS 的自定义参数，用来微调评论框细节，不自定义的话，暂时留空
```

## 4.03：预览评论

此时打开终端，切换到本地博客根目录下，执行如下命令：

```shell
hexo clean && hexo generate && hexo deploy
```

然后访问你的博客，任意打开一篇博文，可见加载的评论系统：

![](https://img.czblogs.cn/posts/sitebuild/03/image-20260716013019702.webp)



# 第五节：后续配置

## 5.01：配置密码

第一次使用的时候，点击上图中的设置按钮（齿轮按钮，在“发送”二字下面）：

![](https://img.czblogs.cn/posts/sitebuild/03/image-20260716013329005.webp)

自己设置一个密码，然后点击注册，然后就可以进入 Twikoo 的后台管理了：

![](https://img.czblogs.cn/posts/sitebuild/03/image-20260716013736127.webp)

这里就是 Twikoo 管理面板，在这里我们可以进行评论管理、配置管理、导入、导出这几类操作。

<font color=red>**重要提示**</font>：配置好以后，一定要点击保存！！！一定要点击右上角的退出登录！！！

## 5.02：升级版本

从上图可以看到，我们当前的前端版本和云函数的版本不一致，还记得本文 2.04 中说的吗？实际上我们应该保持云函数和前端的版本一致，如果不一致会出现意料之外的问题，可能我这里两者的版本差距很小，所以也没什么问题。

但是我看这个很难受，所以决定把它们的版本弄一致。云函数降级比较麻烦，所以我们可以通过给 Butterfly 主题内置的前端版本升级到 1.7.14 就可以了。

打开博客根目录下的`plugins.yml`文件，找到`twikoo`配置项，将`version`的值改为 1.7.14：

```yaml
twikoo:
  name: twikoo
  file: dist/twikoo.all.min.js
  version: 1.7.14
```

然后在博客根目录下执行命令后，强制刷新浏览器缓存，可见警告消失：

```shell
hexo clean && hexo generate && hexo deploy
```

## 5.03：通用设置

通用配置的部分很简单，基本没什么坑点，我这里就简单记录说明一下：

- `SITE_NAME`：网站名称，设置为自己的网站名称即可

- `SITE_URL`：网站地址，设置为自己的博客网址即可

- `BLOGGER_NICK`：博主的名称，按照自己的需求设置

- `BLOGGER_EMAIL`：博主的邮箱地址，用于邮件通知、博主标识

- `COMMENT_PAGE_SIZE`：评论列表分页大小，默认为 8

- `MASTER_TAG`：博主标识自定义文字，默认为 “博主”

- `COMMENT_BG_IMG`：评论框自定义背景图片 URL 地址

- `GRAVATAR_CDN`：自定义头像 CDN 地址，我这里选择使用默认的值。

  可选的值有 cn.gravatar.com、cravatar.cn、sdn.geekzu.org、gravatar.loli.net

- `DEFAULT_GRAVATAR`：默认的头像显示，我这里选择使用默认的。

  可选的有："404"、"mp"、"identicon"、"monsterid"、"wavatar"、"retro"、"robohash"、"blank"，默认"identicon"

- `COMMENT_PLACEHOLDER`：评论框提示信息，可用`<br>`换行，默认为空。比如我设置的是：

  ```text
  留下正确的邮箱才可以收到回复哦～～<br>在昵称处输入QQ号可以自动识别头像、昵称和邮箱
  ```

- `DISPLAYED_FIELDS`：界面上展示的输入框，默认：nick,mail,link

- `REQUIRED_FIELDS`：评论必填信息。

  假如设为`nick,mail,link`代表全必填，设为`none` 代表全选填，默认`nick,mail`

- `HIDE_ADMIN_CRYPT`：隐藏管理面板入口。

  设置一个“暗号”，只有在“昵称”一栏输入该“暗号”时，管理面板入口才会显示，留空则不隐藏管理面板入口

## 5.04：图床设置

插件这里就是配置 Twikoo 图床的，Twikoo 评论系统支持图片上传，默认是不开启的。但是它只支持它规定的几种图床，不支持自定义的图床，所以我这里暂时不开启上传图片的功能。

## 5.05：隐私设置

隐私设置只有两个，我的配置如下：

![](https://img.czblogs.cn/posts/sitebuild/03/image-20260716022344208.webp)

## 5.06：反垃圾

暂时不配置。

## 5.07：人机验证

暂时不配置。

## 5.08：即时通知

不配置即时通知。

## 5.09：邮件通知

邮件通知的配置很简单，这里给出一个我的模板供参考：

MAIL_TEMPLATE：

```text
亲爱的${PARENT_NICK}，您好，您在${SITE_NAME}(${SITE_URL})上的评论收到了回复！！！<br><br><br>您的评论内容如下：${PARENT_COMMENT}<br>${NICK}对您的评论做出了如下回复：${COMMENT}<br>点击<a href='${POST_URL}'>这里</a>可以查看详细内容<br><br>友情提示：如果您对这里的链接不放心，可直接访问我的博客网站并搜索关键字查找相应的文章，然后在评论区查找相关评论！
```

MAIL_TEMPLATE_ADMIN：

```text
昵称：${NICK}<br>邮箱：${MAIL}<br>评论：${COMMENT}<br><br>点击<a href='${POST_URL}'>这里</a>查看详情<br>
```

～～持续更新

～～持续更新

～～持续更新
