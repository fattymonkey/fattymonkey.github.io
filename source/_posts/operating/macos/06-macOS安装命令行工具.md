---
title: macOS安装命令行工具
date: 2023-01-06 07:13:14
updated: 2026-01-06 23:52:21
description: Command Line Tools —— 搭建Mac开发环境的第一步
categories:
  - 操作系统
tags:
  - macOS
  - CLT
abbrlink: 10006
cover: img/covers/operating/macos/06.webp
---



# 第一节：写在前面

## 1.1：什么是命令行工具

命令行工具（Command Line Tools）是 macOS 上至关重要的插件，苹果官方是这么介绍它的：下载 macOS SDK、标题和构建工具（如 Apple LLVM 编译器和 Make），能助您轻松安装开源软件或在终端内的 UNIX 上进行开发。macOS 可以在您首次尝试构建软件时自动下载这些工具，您也可以随时在下载页面找到它们。

简单地说，命令行工具有两个用处：

- <font color='red'>使用Mac电脑终端开发软件</font>；
- <font color='red'>让开源软件能够顺利安装</font>；

简单来说，Command Line Tools 就是一个小型独立包，为 macOS 终端用户提供了很多常用的工具、实用程序和一些编译器，包括但不限于 svn、git、make、gcc、clang、perl、size、strip、cpp、python3...

在使用 Mac 终端进行开发的时候，需要用到比如 Git 之类的工具！在 macOS 系统中原本就存在一些命令，也就是可执行文件，在`/usr/bin`目录下的那些常用命令，如 git 和 python3 等，这些命令虽然原本就存在，但是并不能使用！如：

![](https://img.czblogs.cn/posts/operating/macos/06/image-20260707154336934.webp)

再比如：

![](https://img.czblogs.cn/posts/operating/macos/06/image-20260707154446724.webp)

这些命令本身就存在，但是在使用的时候，Mac 终端会给出如下提示：

![](https://img.czblogs.cn/posts/operating/macos/06/image-20260707154609289.webp)

这些工具会在我们安装完命令行开发者工具以后，就能正常使用了！

## 1.2：我的电脑系统版本

我这里安装命令行工具的 macOS 版本是 macOS Tahoe 26.5.2 版。



# 第二节：安装配置

下载安装 Command Line Tools 有两种方式：

- 第一种是去 Apple 开发者网站上去下载，下载之前需要先免费注册成为 Apple 开发者，然后再登陆下载；
- 第二种方式比较简单，可以通过 Mac 自带的终端，执行命令来安装（国内可能会因为网络问题而失败）；

## 2.1：下载安装

这里我选择使用第二种方式。打开终端，执行如下命令：

```zsh
xcode-select --install
```

按下回车键的时候，终端会给出提示：

![](https://img.czblogs.cn/posts/operating/macos/06/image-20260707161015458.webp)

点击安装，会弹出安装字体的提示，点击下载：

![](https://img.czblogs.cn/posts/operating/macos/06/image-20260707161112430.webp)

接着会弹出协议，点击“同意”：

![](https://img.czblogs.cn/posts/operating/macos/06/image-20260707161155168.webp)

然后会自动查找并下载软件（刚开始展示的下载时间很长）：

![](https://img.czblogs.cn/posts/operating/macos/06/image-20260707161233869.webp)

但是网络好的话，很快就展示真实的下载时长了：

![](https://img.czblogs.cn/posts/operating/macos/06/image-20260707161307112.webp)

下载完成后会自动安装：

![](https://img.czblogs.cn/posts/operating/macos/06/image-20260707161809041.webp)

待安装完成后，点击“完成”即可：

![](https://img.czblogs.cn/posts/operating/macos/06/image-20260707162045186.webp)

## 2.2：安装位置

安装命令行工具之前，在`/Library`目录下，以`D`开头的目录只有`DirectoryServices`、`Documentation`、`DriverExtensions`这三个：

![](https://img.czblogs.cn/posts/operating/macos/06/image-20260707155602786.webp)

安装完以后，就会在`/Library`下生成`Developer/CommandLineTools`的新目录，目录中的内容如下：

- `Library`：安装的依赖库，我这里只能看到 python 的依赖库；
- `SDKs`：Apple APP 开发依赖的开发环境；
- `usr`：这个文件夹的内容是很多的，在它里面有很多的命令和依赖等，主要是 gcc、pip3、git 等等；

注意：在这里的`/CommandLineTools/Library/Frameworks/Python3.framework/Versions`中安装了 python3 ！

## 2.3：环境变量

在没安装命令行工具之前，macOS 的环境变量为：

![](https://img.czblogs.cn/posts/operating/macos/06/image-20260707155731686.webp)

而安装完以后，macOS的环境变量为：

![](https://img.czblogs.cn/posts/operating/macos/06/image-20260707162649403.webp)

可见此时系统环境变量和PATH变量没有任何变化！那么看起来我们需要配置环境变量才能使用安装的工具了。但是不配置环境变量的情况下，我们直接使用：

![](https://img.czblogs.cn/posts/operating/macos/06/image-20260707162812292.webp)

可见，此时可以直接使用命令行工具中的工具了，根本就不需要配置环境变量！

## 2.4：个人思考

首先，我们先来看一下在终端中使用的这些命令来自哪里：

![](https://img.czblogs.cn/posts/operating/macos/06/image-20260707162908244.webp)

可见，原本在`/usr/bin`中就存在的命令变得可用了，查看一下这俩命令：

![](https://img.czblogs.cn/posts/operating/macos/06/image-20260707163653925.webp)

可见原本在`/usr/bin`目录中的命令没有任何变化，即`/usr/bin`中那些系统原本就存在但是无法使用的命令并没有指向 CLT 中安装的命令。更为重要的是，查看 CLT 目录中的这些命令，它们也没有指向`/usr/bin/`目录中的那些命令！这就很奇怪了，为什么在`/Library/Developer/CommandLineTools/`中安装的这些命令可以被终端找到并使用呢？？？

其实这里就没必要关注这个问题了，即然 Mac 在`/usr/bin`目录中预留了`python3`和`pip3`等命令（虽然不能默认是不能使用的），而且命令行开发者工具又是为 macOS 量身定做，那么他们肯定在我们不得知的地方进行了特殊的处理，把`/usr/bin`目录中的，命令“重定向”到`/Library/Developer/CommandLineTools/`中安装的这些命令了！