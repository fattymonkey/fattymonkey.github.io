---
title: Hexo博客之整体搭建流程
date: 2023-04-01 07:03:10
updated: 2026-04-01 21:49:50
description: 本地安装 + 远程部署 + 域名配置
categories:
  - 静态博客
tags:
  - Hexo
  - GitHub
  - EdgeOne
  - CDN
  - DNS
abbrlink: 10401
cover: /img/covers/sitebuild/01.webp
---



# 第一节：写在前面

静态博客框架 Hexo 的基本原理：使用特定的主题，将以 Markdown 语法编写的文章转为 HTML 文件，并配合一些 CSS 和 JS 文件，一起部署到服务器上，最后用户通过访问这些静态资源来访问博客网站！

Hexo 博客的整体搭建流程主要分为下面三步：

- 第一步：本地安装，在本地安装 Hexo 程序，是用来生成和管理静态资源的，可以实现博客网站的本地预览；
- 第二步：远程部署，分为两部分
  - 部署到 GitHub Pages，实现以`xxx.github.io`来访问博客；
  - 部署到 EdgeOne Makers，实现以`xxx.edgeone.cool`来访问博客；
- 第三步：绑定域名，分为两部分
  - 解析到 GitHub Pages：是否绑定域名都可以，由自己决定，绑定域名不需要备案；
  - 解析到 EdgeOne Makers：必须绑定域名，并且域名必须完成 ICP 备案；

EdgeOne Makers 的前身是 EdgeOne Pages，在原有 Web 全栈开发能力之上，新增对 AI Agent 的原生支持，原有产品逻辑与功能保持不变。在 EdgeOne Makers 中，加速区域可以自己选择：

- 全球可用区（包含中国大陆）：国内访客由腾讯云国内 CDN 节点提供服务，海外访客调度至 EdgeOne 全球边缘节点；该方案支持国内备案域名，访问链路覆盖大陆，延迟更低；
- 全球可用区（不含中国大陆）：所有流量统一走 EdgeOne 海外边缘网络，不会调度腾讯云国内 CDN。此模式无需备案，但大陆内地用户访问会经过跨境链路，网络延迟与稳定性受跨境线路影响。

对于 EdgeOne Makers，考虑到最后的效果，肯定要选全球可用区（不含中国大陆），只需要部署完成后再进行域名备案即可。之所以我同时还将博客部署到 GitHub Pages 上，一方面是为了在域名备案的过程中能有一个网站可以被访问，另一方面也是为了方便那些因为不想备案而选择 GitHub Pages 的小伙伴。



# 第二节：本地安装

## 2.01：前提条件

在本地安装 Hexo 程序，首先需安装 Git 和 Nodejs，安装 Git 有两个用处：

1. 在使用 hexo-cli 初始化本地 Hexo 程序文件时，会默认使用 Git 从 Github 下载 Hexo 程序源文件；

2. 本地安装 Hexo 程序后，还需要使用 Git 将本地 Hexo 生成的静态博客文件上传到服务器或代码托管平台；

安装 Nodejs 也有两个用处：

1. Hexo 程序是基于 Nodejs 的，Hexo 的运行要依赖 Nodejs 环境；

2. Nodejs 自带的 npm 是安装 hexo-cli 的工具，而且后续 Hexo 程序需要的插件都要依赖 npm 下载；

关于 Git 和 Nodejs 的介绍、安装和使用，不是这篇博文的重点，需要的话可以在我的网站中搜索。

## 2.02：全局安装 hexo-cli

> hexo-cli 是 npm 中的一个软件包，封装了一些命令，它并不是 Hexo 程序，安装后，再通过它来安装 Hexo！

<font color='red'>安装 hexo-cli 一定要使用全局安装</font>！只有这样，我们才可以在本机的任何目录都能使用 hexo-cli，这样我们就可以自由地选择在哪个目录下初始化 Hexo 程序（即可以任意选择将我们的博客工程放在哪个目录下）！

打开终端，执行安装 hexo-cli 的命令：

```shell
npm install -g hexo-cli
```

![](https://img.czblogs.cn/posts/sitebuild/01/image-20260724172933771.webp)

安装时发现有四个警告，这是因为有些包安装后会自动执行后置脚本（postinstall），新版 npm 增加了安全限制，会默认拦截这类后置脚本的执行，目的是为了防止恶意包自动执行危险代码。为了解决这个问题，我查阅了大量的资料，最终在 Nodejs 的安装目录中找到关于 approve-scripts 的官方说明：

> In the current release, this field is advisory: install scripts still run by default, but installs print a list of packages whose scripts have not been reviewed. A future release will block unreviewed install scripts.

即：<font color=red>在 npm V11.16.0 中，虽然终端打印警告提示「该包安装脚本未审核」，但后置脚本（postinstall /preinstall 等）实际已经完整执行，不会被拦截阻断。</font>也就是说，压根就不需要任何操作（真的很无语），不过如果你使用的 npm 版本是12的话，那就不得不处理了！

安装完成后，直接执行如下命令，查看是否安装成功（正确输出版本号即为安装成功）：

```shell
npm list -g
```

![](https://img.czblogs.cn/posts/sitebuild/01/image-20260724173519992.webp)

成功安装后会在 /usr/local/bin 目录中创建名为 hexo 的软链接并指向 hexo-cli/bin 下面的 hexo 命令：

![](https://img.czblogs.cn/posts/sitebuild/01/image-20260724174305960.webp)

因为 /usr/local/bin 目录在系统环境变量 PATH 里面：

![](https://img.czblogs.cn/posts/sitebuild/01/image-20260724174617488.webp)

所以现在可以在任意目录下执行 hexo 命令，这就是为什么我们一定要全局安装 hexo-cli 的原因！

## 2.03：下载安装 Hexo

> 初始化 Hexo 可以理解为下载 Hexo 程序，也就相当于安装了一个免安装的程序，类似于安装 Maven 一样。

打开终端，切换到你想安装 Hexo 程序（博客工程）的目录下，执行如下命令：

```shell
hexo init 自定义文件夹名
```

注意：

- 这里使用的 hexo 命令是前面 2.2 中安装的 hexo-cli 包中自带的命令，也就是 /usr/local/bin/hexo；
- 执行这条命令时，计算机会使用 Git 从 Github 上下载 Hexo 程序到本地，所以在这之前一定要先安装 Git；
- 下载下来的 Hexo 程序会被重命名为命令中指定的文件夹名称，这个目录就是博客工程的根目录；

比如我打算把博客工程命名为`blog`，并将其放到我桌面上的`repos`文件夹中，那么：

![](https://img.czblogs.cn/posts/sitebuild/01/image-20260724182737628.webp)

其中的内容为：

![](https://img.czblogs.cn/posts/sitebuild/01/image-20260724182856672.webp)

<font color=red>**注意**</font>：从此，再使用 hexo 命令，就要切换到博客根目录下（~/repos/blog），否则使用就是 /usr/local/bin/hexo ，也就是 2.2 中全局安装的 hexo-cli 中的 hexo 命令，这就不对了！

切换到本地博客工程根目录下，执行`hexo --version`来查看安装的 Hexo 和 Nodejs 的版本信息：

![](https://img.czblogs.cn/posts/sitebuild/01/image-20260724183140506.webp)

此外，刚下载的 Hexo 程序，其中自带的 npm 包如下：

![](https://img.czblogs.cn/posts/sitebuild/01/image-20260724183245991.webp)

## 2.04：本地预览 Hexo

> 安装了 Hexo 程序后，我们就可以使用它来生成静态博客文件了，也可以在本地预览此时的博客是什么样子的。

打开终端，切换到本地博客工程根目录下，执行如下命令：

```shell
hexo server  # 也可简写成"hexo s"
```

![](https://img.czblogs.cn/posts/sitebuild/01/image-20260724183449260.webp)

此时不要关闭终端，接着打开浏览器访问`http://localhost:4000/`，可以看到此时博客的样子：

![](https://img.czblogs.cn/posts/sitebuild/01/image-20260724183725422.webp)

停止预览，可在之前的终端窗口键入 control + C 来停止（该命令在 macOS 和 Windows 中是一样）。此时 Hexo 博客网站使用的是默认的主题 landscape，在博客根目录下的 source/_post 文件夹中下有一篇《hello-world.md》文件，也就是上图中展示的这篇博文！



# 第三节：GitHub Pages

关于 GitHub Pages 的内容，可以参考 [GitHub Page 文档](https://docs.github.com/zh/pages)，我这里就不细说了，直接上操作流程。

## 3.01：创建仓库

注册 GitHub 账号后，直接创建仓库：

![](https://img.czblogs.cn/posts/sitebuild/01/image-20260724204049140.webp)

- 仓库名称用`username.github.io`形式，这样最后博客网站的网址最简洁，你也可以使用其他名称，但最后生成的网址不够简洁，而且在对网站进行个性化设置时，还会出现各种路径相关的问题，最常见的就是加载不到网站的 CSS 和 JS 文件。所以，强烈建议这种命名方式，这里的 username 指的是你的 Github 的用户名；
- Description：仓库描述可有可无；
- Choose visibility：免费账户开启 GitHub Pages，仓库必须公开；
- Add README：不需要平台自动生成，后续本地初始化仓库推送源码；
- No .gitignore：不要在这里选择模板！后续在本地 Hexo 项目根目录自行创建，控制更精准；
- Add license：开源许可证可有可无；

点击最后的 Create repository 按钮，就创建成功了：

![](https://img.czblogs.cn/posts/sitebuild/01/image-20260724205016370.webp)

## 3.02：关联仓库

打开终端，切换到本地博客根目录，先初始化本地仓库：

```shell
git init
git remote add origin https://github.com/fattymonkey/fattymonkey.github.io.git
```

然后创建 main 分支，并把本地的文件推送到仓库：

```shell
git checkout -b main
git add .
git commit -m "init repository"
git push -u origin main
```

执行过程如下：

![](https://img.czblogs.cn/posts/sitebuild/01/image-20260724212136343.webp)

**重要提示**，在本地执行 hexo init 命令生成 blog 文件夹时，里面自带了 .gitignore 文件，这个文件默认内容为：

```tex
.DS_Store
Thumbs.db
db.json
*.log
node_modules/
public/
.deploy*/
_multiconfig.yml
```

这个是 Hexo 默认的内容，可见在 main 分支上提交代码时，会忽略这些内容，尤其是 public 文件夹。

## 3.03：创建分支

由于 main 分支存放 Hexo 博客原始源码，供 EdgeOne Makers 自动构建；GitHub Pages 仅支持托管成品静态页面，无法直接编译源码。因此新建 gh-pages 分支专门存放编译后的网页资源，实现源码与站点产物隔离，作为 GitHub Pages 的发布源。

打开终端，切换到本地博客网站的根目录 ～/Desktop/repos/blog，依次执行如下命令（这些命令只执行一次）：

```shell
# 创建新分支gh-pages
git checkout --orphan gh-pages
# 清空分支内所有文件
git rm -rf .
# 空提交初始化分支
git commit --allow-empty -m "init gh-pages static branch"
# 推送至远程
git push origin gh-pages
# 切回源码分支main
git checkout main
```

![](https://img.czblogs.cn/posts/sitebuild/01/image-20260725001158933.webp)

## 3.04：安装插件

Hexo 博客使用插件 [hexo-deployer-git](https://github.com/hexojs/hexo-deployer-git) 来进行部署，打开终端切换到本地博客根目录，执行如下命令来安装：

```shell
npm install hexo-deployer-git --save
```

![](https://img.czblogs.cn/posts/sitebuild/01/image-20260725002443154.webp)

## 3.05：配置文件

安装完插件以后，打开本地博客根目录下的 _config.yml 文件，找到`deploy`配置项，进行如下配置：

```yaml
# Deployment
## Docs: https://hexo.io/docs/one-command-deployment
deploy:
  type: git
  repo: https://github.com/fattymonkey/fattymonkey.github.io.git
  branch: gh-pages
```

- type：推送的方式，固定为 git；
- repo：推送的地址，就是前面创建的 GitHub 博客仓库地址；
- branch：推送的分支，这里设置为 gh-pages，是 GitHub Page 的要求；

## 3.06：生成资源

打开终端，切换到博客根目录下，执行如下命令：

```shell
hexo clean     # 修改了_config.yml文件后，要想生效就要清理缓存（也可以简写为"hexo cl"）
hexo generate  # 编译代码，生成静态网页（也可以简写为"hexo g"）
```

![](https://img.czblogs.cn/posts/sitebuild/01/image-20260725005143857.webp)

这个命令还有其他的一些参数，官网上写的很明白：

- `-d`或`--deploy`：文件生成后立即部署网站；
- `-w`或`--watch`：监视文件变动；
- `-b`或`--bail`：生成过程中如果发生任何未处理的异常则抛出异常；
- `-f`或`--force`：强制重新生成文件，Hexo 引入了查分机制，如果`public`目录存在，那么`hexo g`只会重新生成改动的文件；
- `-c`或`--concurrency`：最大同时生成文件的数量，默认无限制；

<font color='red'>注意</font>：

- 执行 Hexo generate 后，本地博客根目录下立即生成名为 public 的文件夹，其中文件就是网站所有的静态资源；
- 执行 Hexo generate 后，本地博客根目录下还会生成名为 db.json 的缓存数据文件；
- 这两个文件都在 .gitignore 文件中，所以它们都不会被 push 到仓库中；

## 3.07：推送资源

经过上面的操作以后，还是在本地博客根目录下，执行命令：

```shell
hexo deploy  # 推送网站静态资源到配置的仓库
```

![](https://img.czblogs.cn/posts/sitebuild/01/image-20260725010718780.webp)

此时，浏览器打开 GitHub 查看仓库文件（gh-pages分支）：

![](https://img.czblogs.cn/posts/sitebuild/01/image-20260725010915160.webp)

可见原本空的分支，已经有了这些内容，这些内容跟本地博客根目录下的 public 文件夹中的内容完全一样！

## 3.09：服务配置

此时还需要配置一下仓库的 Pages 服务，进入仓库后台开启 Pages 并选定分支。

1. 打开仓库页面，点击顶部 Settings；
2. 往下滚动找到 Pages；
3. 核心设置项目：
   - Source：选择 `Deploy from a branch`；
   - Branch：下拉选择 `gh-pages`；
   - Folder：选择 `/(root)`；

4. 点击保存。

## 3.10：访问网站

此时打开浏览器，访问`fattymonkey.github.io`就可以访问博客网站了！后面发布文章后，执行如下命令即可发布：

```shell
hexo clean && hexo generate && hexo deploy
```



# 第四节：EdgeOne Makers

GitHub Pages 依托海外服务器，国内访问速度存在波动。我们额外将同一套静态站点部署至 EdgeOne Makers，依托国内边缘节点加速访问，作为博客国内访问入口。本章节讲解基于 gh-pages 分支静态资源，部署站点到 EdgeOne Makers 完整流程。

## 4.01：导入仓库

访问[腾讯云官网](https://cloud.tencent.com/)，登录后进入控制台，在侧边栏搜索“边缘安全加速平台EO”：

![](https://img.czblogs.cn/posts/sitebuild/01/image-20260725015855083.webp)

将鼠标移动到右边“快速部署 Web 应用和 AI Agents”中的“创建项目”中，选择“通过导入 Git 仓库创建”：

![](https://img.czblogs.cn/posts/sitebuild/01/image-20260725140610176.webp)

然后选择 GitHub，授权以后，选择前面创建的博客仓库：

![](https://img.czblogs.cn/posts/sitebuild/01/image-20260725140925675.webp)

点击 Install 后，输入 GitHub 账号的密码，最后跳转回页面：

![](https://img.czblogs.cn/posts/sitebuild/01/image-20260725141144388.webp)

## 4.02：配置项目

点击上图中的仓库，进入项目配置页面，进行如下配置：

![](https://img.czblogs.cn/posts/sitebuild/01/image-20260725143706439.webp)

|  配置项  |         设置值          |                             说明                             |
| :------: | :---------------------: | :----------------------------------------------------------: |
| 项目名称 |  fattymonkey.github.io  | 名称长度必须为5到50个字符，只能包含小写字母、</br>数字和连字符，并且不能以连字符开头或结尾。 |
| 加速区域 | 全球可用区 (含中国大陆) |                           按需保留                           |
| 生产分支 |        gh-pages         |            核心！绑定存放静态文件分支，不要 main             |
| 框架预设 |          Other          |         默认是Hexo，因为我不希望自动构建，选择Other          |
|  根目录  |          `./`           |                           默认不变                           |
| 输出目录 |         **`/`**         |           gh-pages 根目录就是网站根，严禁填 public           |
| 构建命令 |        全部清空         |                      不执行任何构建脚本                      |
| 安装命令 |        全部清空         |                       不执行 npm 安装                        |

在“构建命令”和“安装命令”中不输入任何命令，代表云端不执行任何命令，也就跳过自动构建的过程了。

## 4.03：开始部署

点击上图中的“开始部署”按钮，稍等片刻就部署完成了：

![](https://img.czblogs.cn/posts/sitebuild/01/image-20260725144021639.webp)

## 4.04：测试流程

经过以上的配置后，我最理想的状态是：在本地执行`hexo g -d`后，将生成的 public 文件夹推送到 gh-pages 分支，紧接着 GitHub Page 和 EdgeOne Page 都自动部署。

修改本地博客根目录下的 /source/_posts/hello-world.md 文件，然后执行命令：

```shell
hexo clean && hexo generate && hexo deploy
```

然后立马查看上图中的页面，发现项目自动开始构建，则说明流程没有问题：

![](https://img.czblogs.cn/posts/sitebuild/01/image-20260725145309307.webp)

## 4.05：访问网站

点击侧边栏的域名管理，可见 EO 给网站分配的二级域名，点击这个域名就可以访问我们的博客网站了：

![](https://img.czblogs.cn/posts/sitebuild/01/image-20260725144359577.webp)

后面发布文章后，执行如下命令即可发布：

```shell
hexo clean && hexo generate && hexo deploy
```

但是，访问以后发现一个问题：

![](https://img.czblogs.cn/posts/sitebuild/01/image-20260725162636543.webp)

这是因为访问的是 EdgeOne Page 分配的临时域名导致的，一旦绑定自定义域名后，这个弹窗提示就会自动消失。

## 4.06：预览时长

EdgeOne 分配的测试域名`https://fattymonkey-blog-yggmquwc.edgeone.cool/`，只有三个小时的访问权限，三个小时过后就会报 401。

三小时一过，如果还想预览的话，就可以到腾讯云的 EO 控制台的项目橄榄页面，点击右上角的“预览”：

![](https://img.czblogs.cn/posts/sitebuild/01/image-20260727022133601.webp)

然后点击“确认”再次授权三个小时的预览时长：

![](https://img.czblogs.cn/posts/sitebuild/01/image-20260727022250025.webp)



# 第五节：配置域名

到现在，可以使用`fattymonkey.github.io`和`https://fattymonkey-blog-yggmquwc.edgeone.cool/`这两个域名来访问我的博客了。

但这俩域名的可读性都很差，而且 EdgeOne Markers 提供的测试域名，单次授权只能用三个小时，所以都需要配置自定义域名。对于 GitHub Page，我不打算配置域名了，它本身就作为我备选的站点，我只配置 EdgeOne Markers 的域名。

## 5.01：购买域名

建议在腾讯云购买域名，价格较便宜的同时，还可附赠 DNSPod（用来配置域名解析），即使是老用户，也可以在购买域名的同时加购 DNSPod，总体而言还是比较优惠的。至于如何购买域名，就不废话了，自行登录腾讯云官网查看购买，官方文档的描述很详细！

## 5.02：买云资源

在 EdgeOne 控制台，点击侧边栏的“域名管理”，然后点击“添加自定义域名”：

![](https://img.czblogs.cn/posts/sitebuild/01/image-20260725151606887.webp)

填入自己购买的二级域名，点击下一步：

![](https://img.czblogs.cn/posts/sitebuild/01/image-20260725153906157.webp)

此时检测出域名未在工信部备案：

![](https://img.czblogs.cn/posts/sitebuild/01/image-20260725154008729.webp)

EdgeOne 要求域名必须在工信部备案，不然就没办法绑定，所以先去工信部备案。但是：

- 仅有域名并使用 EdgeOne 的情况下，不能直接办理 ICP 备案，必须购买符合备案条件的云资源；
- 符合条件的云资源包括：
  - 云服务器 CVM，标准 ECS；
  - 轻量应用服务器 Lighthouse，性价比最高
  - Serverless 云函数，特定套餐
- 云资源需要满足的条件：
  - 地域：中国大陆境内节点，中国香港、海外实例一律不能备案；
  - 计费方式：包年包月，按量计费、免费试用实例无法备案；
  - 购买时长：申请备案需选购3个月及以上的实例；
  - 剩余时长：备案审核全程实例不能过期，剩余时长 ≥ 1 个月；

为了追求最高性价比，我选择购买轻量应用服务器：

![](https://img.czblogs.cn/posts/sitebuild/01/image-20260725172007904.webp)

## 5.03：完成备案

购买了轻量应用服务器以后，根据官方要求完成备案资料提交后：

![](https://img.czblogs.cn/posts/sitebuild/01/image-20260725175023286.webp)

剩下的就是等待。

## 5.04：临时方案

因为在配置 EdgeOne Markers 时，选择的加速区域是“全球可用区（含中国大陆）”，所以绑定域名时才需要备案，假如选择的加速区域是“全球可用区（不含中国大陆）”，则域名不需要备案，但是在国内访问速度不稳定。

因为域名备案需要时间，所以在我的域名备案完成之前，我打算先把`fattymonkey.github.io`作为我网站的域名，等我的域名备案完成以后，再给 EdgeOne Markers 配置域名，那才是最终的解决方案。



# 第六节：写在后面

## 6.01：源码问题

现在，我在本地博客根目录下执行 hexo deploy 命令后，将使用 [hexo-deployer-git](https://github.com/hexojs/hexo-deployer-git) 将生成的 public 文件夹中的内容推送到 GitHub 仓库的 gh-pages 分支，然后 GitHub Page 和 EdgeOne Page 自动检测到这个分支的变化，紧接着自动部署来完成网站的发布。

作为存储 Hexo 源码的 main 分支，此时还需要我们在本地 git push 一下才能将源码推送到远程仓库，我有一个想法，就是将推送源码的动作也集成进 hexo deploy 命令，这样就不需要额外推送了。

但是我实验了很多办法都做不到，也不想在项目中增加太多的文件，所以就放弃了，反正本地的 Hexo 源码推不推送到远程仓库，影响不大。这里记录下推送的命令：

```shell
# 1. 查看所有变更（可选，强烈建议执行，确认改动符合预期）
git status

# 2. 暂存全部变更：新增、修改、删除全部纳入追踪，兼容所有改动类型
git add -A

# 3. 提交至本地Git仓库，引号内填写清晰的变更备注
git commit -m "此处填写本次更新说明"

# 4. 拉取远程最新代码（多人协作必备；单人仓库也建议保留，避免历史分叉）
git pull origin main

# 5. 将本地提交推送到远程仓库
git push origin main
```

## 6.02：发布流程

经过以上的操作，我们就搭建了一个最简单的 Hexo 博客，别人就可以通过域名来访问我们的博客了！此后，假如我们需要发布博客的话，就创建 Markdown 文件，并将其放到博客工程根目录下的`/source/_posts`中，然后依次执行如下两个命令，就可以完成博文的发布：

```shell
hexo clean    # 可简写为 hexo cl
hexo generate # 可简写为 hexo g
hexo deploy   # 可简写为 hexo d
```

现在，我们来模拟一次发布博客的过程。将本地博客工程根目录下 /source/_post/hello-word.md 文件的内容修改为：

````txt
---
title: 完成博客网站搭建流程
date: 2023-01-01 05:00:00
updated: 2026-01-01 17:00:00
---

我的 Hexo 博客搭建成功了，这是一篇用来做测试的博文（这是一段普通的文本这是一段普通的文本这是一段普通的文本这是一段普通的文本这是一段普通的文本这是一段普通的文本这是一段普通的文本）。

# 这是标题一
## 这是标题二
### 这是标题三
#### 这是标题四

> 这是一段引用文本这是一段引用文本这是一段引用文本这是一段引用文本这是一段引用文本这是一段引用文本这是一段引用文本这是一段引用文本这是一段引用文本这是一段引用文本这是一段引用文本

下面是一段 Python 代码：

```python
# 这是一段Python代码
myStr = {'a', 'b', 'c', 'd'}
    for i in myStr:
        print(i)
```

下面是一段 HTML 代码：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>页面标题</title>
</head>
<body>
	<h1>标题内容</h1>
  <p>一段正文测试文字，用于调试屏幕适配、字体样式。</p>
</body>
</html>
```

显示一个微笑的emoji表情：:smile:
````

然后打开终端，切换到本地博客根目录下，执行下面的命令：

```shell
hexo clean && hexo generate && hexo deploy
```

最后稍等片刻，浏览器访问网站，可见发布成功了：

![](https://img.czblogs.cn/posts/sitebuild/01/image-20260725180409594.webp)

## 6.03：后续优化

到现在为止，我们已经有了一个可以基本使用的博客网站了，为什么说基本呢？因为此时的 Hexo 博客还需要很多很多的折腾！比如下面这些后续操作：

- 更换主题；
- 主题的基本配置（永久链接、代码高亮、全局搜索等）；
- 主题的功能配置（评论系统等）；
- 主题美化；
- 性能优化；

这些内容都会在我后续的博文中详细介绍～～～

