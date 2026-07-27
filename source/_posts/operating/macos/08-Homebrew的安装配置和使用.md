---
title: Homebrew的安装配置和使用
date: 2023-01-08 08:13:14
updated: 2026-01-08 22:34:47
description: 详细记录在macOS上安装配置Homebrew，避坑！！！
categories:
  - 操作系统
tags:
  - macOS
  - Homebrew
abbrlink: 10008
cover: img/covers/operating/macos/08.webp
---



# 第一节：写在前面

Homebrew 是 macOS 平台上最常用也是最好用的一个包管理工具，使用它给 Mac 下载、安装、卸载软件时，基本上都只需要一条命令，如果你是一位使用 Mac 的开发者，还没有安装 Homebrew 的话，那就太不应该了！

这里我要先声明两点：

- 英特尔芯片的 Mac 安装 Homebrew 是很简单的，默认安装位置是`/usr/local`，我这里就不再赘述了；

- 苹果芯片的 Mac 刚出来的时候，安装 Homebrew 是比较复杂的。第一，安装目录跟英特尔芯片不同，默认安装的位置是`/opt/homebrew`；第二，需要处理一些文件夹的权限问题，但随着 Homebrew 的版本更新，虽然默认的安装位置没变，但是截止到我写这篇博文的时间，也就是 2023 年 9 月 8 日，已经不需要再额外处理权限问题了！


这篇博文详细记录了如何在苹果芯片的 macOS 上安装和使用支持 ARM 架构的 Homebrew！



# 第二节：检测环境

在安装 Homebrew 之前，先查看目录`/opt/`下面没有名为`homebrew`的子目录，我这是一台新电脑，显然没有：

![](https://img.czblogs.cn/posts/operating/macos/08/image-20260707171318279.webp)

其次，还需要在终端中执行命令`brew --version`来检测是否存在 Homebrew，当然也不会有的：

![](https://img.czblogs.cn/posts/operating/macos/08/image-20260707171444241.webp)

PS：在安装软件之前检测本机是否已经安装了要安装的软件，这是一个必要的操作，也是一个好习惯！



# 第三节：安装条件

打开[Homebrew的官网](https://brew.sh/index_zh-cn)，首页赫然展示的就是安装 Homebrew 的命令：

![](https://img.czblogs.cn/posts/operating/macos/08/image-20260707172455152.webp)

在安装之前，点击上图左下角的`installation options`（安装选项），可见：

![](https://img.czblogs.cn/posts/operating/macos/08/image-20260707172700401.webp)

这是安装 Homebrew 时，macOS 需要满足的条件：

- 搭载 Apple 芯片或 Intel 芯片的 macOS（废话）；
- macOS 的版本至少要在 14 以上；
- 必须提前安装命令行开发者工具（CLT）；
- 必须使用 Bourne-again shell（Bash）终端来安装，Mac 是自带 bash 终端的，即`/bin/bash`；

其中第三条：<font color='red'>必须提前安装命令行开发者工具</font>！使用 Mac 的开发者肯定都得安装 CLT，这是 Mac 开发者要做的第一件事，我不信还有人的Mac没有安装 CLT！！！

除了官网上说明的这四个条件外，<font color=red>还有一个重要的隐形条件：网络问题</font>！因为使用命令来安装的话，电脑需要去访问网站[https://raw.githubusercontent.com](https://raw.githubusercontent.com)，所以你需要保证你的电脑能够访问这个网址，否则就需要使用科学上网了！



# 第四节：安装程序

新版本的苹果终端默认使用的是 zsh，但官网提供的安装命令的最开头带有`/bin/bash`，即指定用`/bin/bash`来执行命令，所以不用再单独打开`/bin/bash`来执行命令，而是直接打开终端，将官网的安装命令完整复制进去：

![](https://img.czblogs.cn/posts/operating/macos/08/image-20260707175054233.webp)

按下回车后，会提示输入开机密码：

![](https://img.czblogs.cn/posts/operating/macos/08/image-20260707175422447.webp)

输入密码并回车（键入的密码并不会出现在终端中，只管正确输入即可），开始安装：

![](https://img.czblogs.cn/posts/operating/macos/08/image-20260707180042674.webp)

此时键入回车键，继续安装，直到最后安装成功：

![](https://img.czblogs.cn/posts/operating/macos/08/image-20260707180821182.webp)

从这里可以看出来，Homebrew安装成功了！查看目录`/opt`中的内容，可以看到安装的 Homebrew：

![](https://img.czblogs.cn/posts/operating/macos/08/image-20260707181211312.webp)



# 第五节：配置环境

根据安装程序给出的提示，此时 Homebrew 并不在环境变量中，并且还给出了如何配置环境变量的方法：

![](https://img.czblogs.cn/posts/operating/macos/08/image-20260707181708797.webp)

但是我发现并不需要配置环境变量：

![](https://img.czblogs.cn/posts/operating/macos/08/image-20260707182253359.webp)

查看系统的PATH变量以后，才发现：

![](https://img.czblogs.cn/posts/operating/macos/08/image-20260707182439205.webp)

可见，安装程序已经默认将`/opt/homebrew/bin`里面所有的命令都添加到系统 PATH 变量中了，所以压根就不需要再另外配置！



# 第六节：使用细节

这一节的主要内容是分析 Homebrew 的使用细节，比如使用`brew install 软件包`来安装软件时，软件被安装到了系统的什么位置，以及创建了什么样的软连接，再比如使用`brew uninstall 软件包`来卸载软件时的细节！

## 6.1：软件安装

在 Homebrew 的官网上有这么一段描述：

![](https://img.czblogs.cn/posts/operating/macos/08/image-20260707193943088.webp)

Homebrew 会将软件安装到“独立目录”，通过配图可知，所谓的独立目录就是`/opt/homebrew/Cellar`！

我们可以做一个实验！打开终端，执行命令：

```shell
brew install tree
```

执行的情况为：

![](https://img.czblogs.cn/posts/operating/macos/08/image-20260707194219961.webp)

通过比对系统前后的文件，发现命令`brew install tree`做了下面两件事:

第一：软件包被安装到`/opt/homebrew/Cellar`目录中了（这个目录原本是空的）；

第二：在`/opt/homebrew/bin`下面创建了一个名为`tree`的软连接，链接至安装的软件包中的真实命令

![](https://img.czblogs.cn/posts/operating/macos/08/image-20260707194441972.webp)

<font color=red>即：使用 Homebrew 安装软件时，只会影响 Homebrew 自己的安装目录，不会影响到系统中其他任何目录！</font>

因为在安装 Homebrew 时，安装程序已经将`/opt/homebrew/bin`添加到系统变量 PATH 中了，所以新安装的软件 tree 也就可以直接使用了！

## 6.2：软件卸载

使用命令`brew uninstall 软件包`卸载软件时，就会将安装时做的那两件事“复原”，这里就不赘述了！

～～

～～

～～
