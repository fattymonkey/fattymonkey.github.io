---
title: 使用 Cloudflare R2 搭建个人图床
date: 2023-03-03 08:20:06
updated: 2026-03-03 18:29:45
description: R2存储桶搭建图床，配置自定义域名、CDN缓存与CORS跨域
categories: 
  - 实操手记
tags: 
  - Markdown
  - Cloudflare
  - CDN
  - DNS
abbrlink: 10303
cover: /img/covers/practices/03.webp
---



# 第一节：写在前面

## 1.01：各种图床

长期使用 Markdown 创作的朋友，大多都有搭建个人图床的需求。市面上图床方案丰富，主要分为三类：分为商用付费存储、有限免费额度存储、第三方公共免费图床几大类。

- <font color=red>商用付费存储</font>：腾讯云 COS、阿里云 OSS 等大厂对象存储属于付费方案，采用按量计费模式。追求稳定、不想过度折腾的博主可以优先考虑，拥有成熟的访问速度与服务保障（提示：使用按量计费的对象存储承载网站图片，一定要做好防盗链配置并搭配 CDN，若遭遇恶意爬虫刷流量，极易产生高额账单）；
- <font color=red>有限免费额度存储</font>：七牛云等平台提供固定免费额度，适合体量很小的站点，但存储空间、回源流量存在上限，资源超出后需要付费扩容。
- <font color=red>第三方公共免费图床</font>：最大隐患是存续风险，服务商随时可能停运、清理外链，一旦倒闭，所有的图片都会丢失。

各类图床利弊各不相同，本文不展开横向对比，主要记录利用 Cloudflare R2 搭建免费图床的完整方案。

## 1.02：Cloudflare R2

Cloudflare R2 属于上述三类图床的第二类——有限免费额度，是 Cloudflare（云弗拉尔，简称 CF）旗下的对象存储服务，可以类比为 Cloudflare 生态内的 COS/OSS，用来存储图片、静态文件，它的优势如下：

- <font color=red>免除所有出站流量费用</font>：腾讯云 COS 等产品会对下载流量收费，存在被爬虫盗刷产生账单的风险，而 R2 无论产生多少图片访问流量，都不会收取流量费用；
- <font color=red>自带每月免费配额</font>：10GB 存储空间、千万级读写请求，绝大多数个人博客能够永久运行在免费额度内；
- 支持 S3 协议：PicGo 可以直接对接上传；
- <font color=red>域名无需备案</font>：域名托管在 Cloudflare 即可绑定自定义二级域名，不需要 ICP 备案；

同样也存在一定的缺点：

- 国内直连的速度属于中等，肯定不如腾讯云 COS 等国内供应商；
- 官方提供的`r2.dev`临时域名不适合正式站点使用；
- 虽然提供了每月免费额度，但是在开通 R2 时仍然需要添加一张支持境外扣款的银行卡，最方便的是用 VISA 卡；



# 第二节：配置图床

## 2.01：开通R2服务

登陆 [CloudFlare 官网](https://cloudflare.com)，注册后访问控制台：

![](https://img.czblogs.cn/posts/practices/03/image-20260727011445796.webp)

点击左侧边栏的“存储和数据库”，点击 R2，会收到邮箱验证，验证一下，验证过后：

![](https://img.czblogs.cn/posts/practices/03/image-20260727013904117.webp)

点击右上角的“将 R2 订阅添加到我的账户”，跳转到添加银行卡的界面：

![](https://img.czblogs.cn/posts/practices/03/image-20260727014043063.webp)

添加完以后，点击左下角的“激活 R2”，进行后续的一些验证后，开通成功：

![](https://img.czblogs.cn/posts/practices/03/image-20260727095242093.webp)

## 2.02：创建存储桶

点击上图中的“继续前往 R2”，进入 R2 控制面板：

![](https://img.czblogs.cn/posts/practices/03/image-20260727095602017.webp)

点击右上角的“创建存储桶”，接着进行下面的操作：

![](https://img.czblogs.cn/posts/practices/03/image-20260727100537692.webp)

这里的选项需要注意：

- 存储桶名称：只能小写英文、数字、横杠，创建后永久无法修改；
- 位置：选择自动即可，因为我用了科学上网，判定我的位置在北美，所以又选了一下亚太地区；
- 默认存储类：只有标准存储才享受每月免费额度，选择“不频繁访问”，低频存储不参与免费额度计费，会直接扣费；

点击“创建存储桶”以后，稍等片刻，存储桶就创建成功了：

![](https://img.czblogs.cn/posts/practices/03/image-20260727101230999.webp)

## 2.03：域名接入CF

存储桶绑定自定义域名，虽然不要求自定义域名，但是要求域名必须要接入 CloudFlare，就是将域名解析任务交给 CF。

展开左侧边栏的“域名”，点击“概览”，再点击“添加域名”：

![](https://img.czblogs.cn/posts/practices/03/image-20260727102704270.webp)

选择“连接域名”：

![](https://img.czblogs.cn/posts/practices/03/image-20260727103718544.webp)

然后进行如下配置：

![](https://img.czblogs.cn/posts/practices/03/image-20260727104057533.webp)

额外配置这里，因为域名仅用作图片图床，不需要 AI 爬虫抓取图片训练模型，建议统一收紧权限：

- 搜索：保持默认的即可；
- 代理：修改为【阻止】，禁止 AI 直接抓取图片生成问答；
- 训练：修改为【阻止】，禁止爬虫抓取图片训练 AI 大模型
- 在 robots.txt 中阻止训练：保持开启（蓝色开关）；

导入 DNS 记录这里保持自动即可，因为后面我的图床使用的是二级域名`img.czblogs.cn`，主域名`czblogs.cn`原本的解析可以保持，自动导入即可。

点击“继续”后，再点击免费下面的“选择计划”：

![](https://img.czblogs.cn/posts/practices/03/image-20260727110737791.webp)

因为我的主域名`czblogs.cn`已经在腾讯云添加过两条解析记录，所以这里会导入这两条记录：

![](https://img.czblogs.cn/posts/practices/03/image-20260727111216443.webp)

因为我图床准备使用的域名是`img.czblogs.cn`，所以主域名的解析记录不影响，直接点击“继续前往激活”：

![](https://img.czblogs.cn/posts/practices/03/image-20260727111636158.webp)

这是 CloudFlare 提供的域名NDS服务器，需要去你购买域名的平台上去修改。

登陆腾讯云控制台，打开`域名注册`->`域名管理`，找到这个域名，点击`修改`->`修改DNS服务器`，删除旧的 DNS 服务器，添加上图中 CloudFlare 提供的两个：

![](https://img.czblogs.cn/posts/practices/03/image-20260727112741041.webp)

修改完成不是立刻生效，DNS 全球传播一般 10 分钟～6 小时，最长可达 24 小时。修改完成后，回到 CloudFlare，点击“我已更新名称服务器”：

![](https://img.czblogs.cn/posts/practices/03/image-20260727112955383.webp)

然后返回到域名界面，显示活动（Active）则表示修改生效了：

![](https://img.czblogs.cn/posts/practices/03/image-20260727113219611.webp)

## 2.04：连自定义域

Cloudflare 存储桶提供了类似`xxx.r2.dev` 的测试域名，只使用这个域名的话，存在如下问题：

- 无法开启橙色代理（CDN 缓存），只能灰色直连；
- 所有图片请求每次直接回源 R2 存储桶，持续消耗 R2 读写请求额度；
- 没有 CDN 加速，国内访问速度差；
- 无法使用图片自动 WebP 转换、缓存规则、防盗链 Workers 等 CF 核心功能。

因此，我们需要给存储桶连接一个自定义的域名，也就是前面 2.03 接入到 Cloudflare 的域名。

点击侧边栏的`存储和数据库`-`R2对象存储`-`概述`，点击左上角的`设置`，在`自定义域`处点击`+添加`：

![](https://img.czblogs.cn/posts/practices/03/image-20260727121538649.webp)

然后在弹窗处输入域名`img.czblogs.cn`，如果前面域名接入配置正确，并且在全球节点都生效了以后，再点击`继续`：

![](https://img.czblogs.cn/posts/practices/03/image-20260727121704514.webp)

此时会生成一条 CNAME 记录，接着再点击`连接域`：

![](https://img.czblogs.cn/posts/practices/03/image-20260727121939228.webp)

连接后，稍等片刻，等状态由`正在初始化`变成`活动`，表示添加连接成功：

![](https://img.czblogs.cn/posts/practices/03/image-20260727123109121.webp)

## 2.05：配置CORS

CORS 就是浏览器自带安全规则，A 网站网页，默认不能直接加载 B 网站的资源（图片 / 字体 / 接口）。CORS 就是在 B 服务器写一条规则，允许哪些网站可以拉取自己的资源。CORS 只管理哪些网站能读取图片，不管理本地直接读取（比如你在Markdown编辑器中使用链接来访问，也包括在浏览器地址栏中直接输入链接来访问）。

点击 CORS策略旁边的`+添加`，然后输入策略的 json 字符串，然后点击`保存`：

![](https://img.czblogs.cn/posts/practices/03/image-20260727125729953.webp)

因为我图床中的图片大多是服务于我的 Hexo 博客网站的，所以我的配置如下：

```json
[
  {
    "AllowedOrigins": [
      "http://localhost:3000",
      "http://127.0.0.1:4000",
      "https://fattymonkey.github.io",
      "https://fattymonkey-blog-yggmquwc.edgeone.cool",
      "https://fattymonkey.com",
      "https://www.fattymonkey.com"
    ],
    "AllowedMethods": ["GET"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag", "Content-Length"],
    "MaxAgeSeconds": 86400
  }
]
```

## 2.06：切CDN代理

点击侧边栏`域名`，找到接入的域名点进去，再点击侧边栏`DNS`，查看自动生成的 CNAME 记录是否开启代理（灰色=直连R2，无法使用 CDN 缓存，务必切换橙色，默认是开启的）：

![](https://img.czblogs.cn/posts/practices/03/image-20260727130319654.webp)

## 2.07：SSL / TLS

接着点击上图中的`SSl/TLS`，确认加密模式为`完全`：

![](https://img.czblogs.cn/posts/practices/03/image-20260727131240285.webp)

## 2.08：边缘证书

![](https://img.czblogs.cn/posts/practices/03/image-20260727131904699.webp)

在边缘证书这里，进行两个修改：

- 始终使用HTTPS：开启；
- 最低TLS版本：改为 1.2；

## 2.09：缓存规则

先来说一下为什么要配置缓存规则。整个图床的底层链路是：用户浏览器 → Cloudflare 边缘节点 → 你的 R2 存储桶。在没有缓存规则的情况下，每次有人打开图片，CF 节点都要去 R2 后端拉取原图，再转发给访客。这样存在如下问题：

1. 多一次回源网络延迟，图片加载变慢
2. 持续消耗 R2 读取请求额度（虽然免费额度够用，但没必要浪费）
3. 大量重复访问，持续产生回源流量

**而配置缓存规则后：**首次访问图片时，CF 节点把图片存到就近全球边缘节点；后续再访问图片时，直接由 CF 节点返回图片，不再访问 R2 桶。

点击上图中的`缓存`→`Cache Rules`，点击右上角蓝色的`创建规则`，这部分自己搜索一个缓存规则来配置即可。



# 第三节：上传图片

Cloudflare R2 兼容标准 S3 协议，支持多种上传方式。常见方案包含 PicGo 剪贴板快捷上传、网页控制台手动上传、命令行批量上传等。结合我的工作流，本文仅介绍网页控制台上传与命令行批量上传两种方式。

- **网页控制台上传**

  无需配置 API 密钥，登录 Cloudflare R2 后台进入存储桶，直接拖拽文件上传，适合少量素材临时测试、零星图片手动管理。缺点是不适合大批量上传（不是不可以，超过 300 MB 的话就不行了），缺少自动化能力。

- **命令行批量上传（rclone）**

  依托 R2 S3 兼容接口，适合本地完成尺寸、画质、格式预处理后，整目录批量同步图片。使用前需在 R2 控制台创建具备**对象读写权限**的 API 访问令牌。rclone 跨平台可用，支持增量同步、自动创建年月前缀目录，契合博客静态图片长期管理需求。

工作流说明：我不采用 PicGo 剪贴板上传方案，所有图片统一在本地完成预处理，再批量上传至 R2，以此完整掌控图片分辨率、压缩质量，规避云端自动转码带来的画质波动。

## 3.01：控制台上传

直接在 R2 控制台拖拽图片上传，或者点击“从计算机中选择”来选择本地图片上传：

![](https://img.czblogs.cn/posts/practices/03/image-20260727144003575.webp)

比如我上传了一个名为`boy.webp`的图片：

![](https://img.czblogs.cn/posts/practices/03/image-20260727144604059.webp)

然后，在浏览器中地址栏中访问`https://img.czblogs.cn/boy.webp`，即可访问到图片了！

## 3.02：命令行上传

命令行上传图片没有 300 MB 的限制，更适合大批量的上传操作，我暂时用不到，等后面用到的时候再更新吧～～