---
title: 在macOS上安装配置Git
date: 2023-01-07 07:13:14
updated: 2026-01-07 22:10:41
description: 不要再瞎折腾了！这才是macOS安装Git的正确方式！
categories:
  - 操作系统
tags:
  - macOS
  - Git
abbrlink: 10007
cover: img/covers/operating/macos/07.webp
---



# 第一节：写在前面

开发人员都用过 Git，而且基本上每天都在用，但是在 Windows 和 macOS 上安装 Git 是不同的：

- 在 Windows 平台上，安装很简单，可以说是傻瓜式安装。需要主要的是：因为 Git 的官网是国外的网站，直接从官网上下载的话，经常会因为网络问题而失败，常用的解决方式就是借助淘宝的 NPM 镜像站来下载。

  友情提示：从 2022 年 05 月 31 日开始，淘宝 npm 镜像源的域名更改为：https://registry.npmmirror.com

- 在 macOS 平台上，安装 Git 有很多种方式，比如使用 Command Line Tools 或 Homebrew，虽然安装的方式有很多种，但是相对而言较简单。

这篇博文的主要内容就是介绍如何在 macOS 平台上安装配置 Git，并且解释一些 Git 的配置原理！



# 第二节：安装 Git

在 macOS 上安装 Git，不管是 Intel 芯片还是苹果芯片的电脑，最简单的方式就是通过安装命令行工具（Command Line Tools）！<font color='red'>实际上，命令行工具中内置 Git，根本不需要自己再去下载安装 Git，这也是我推荐的方式！</font>

关于如何给 macOS 安装命令行工具，以及安装命令行工具后系统的变化，都不是这篇博文的重点，在这里就不赘述了，需要的可以参考我的上一篇文章！

在安装命令行工具之前，假如你还没安装 Git 的话，这个时候执行命令`git --version`，可见系统中找不到 Git：

![](https://img.czblogs.cn/posts/operating/macos/07/image-20260707160732986.webp)

刚安装完命令行工具后，再执行该命令后可见：

![](https://img.czblogs.cn/posts/operating/macos/07/image-20260707165130410.webp)

顺便提一句，在没安装命令行工具之前，系统的`/usr/bin/`目录下就已经有名为`git`的可执行文件：

![](https://img.czblogs.cn/posts/operating/macos/07/image-20260707160854027.webp)

<font color='red'>安装完命令行工具后，这里的可执行文件就自动指向了其中安装的 Git</font>。这是 macOS 和 CLT 的处理，没必要关注！



# 第三节：配置 Git

<font color=red>**先验知识：Git 的所有配置是以文件的形式存储的！**</font>

## 3.1：Git的配置原理

Git 的配置分为系统级别、全局级别、项目级别这三个等级：

|  权重  |  中文名  | 优先级 |    配置文件     |
| :----: | :------: | :----: | :-------------: |
| system | 系统级别 |   低   | `etc/gitconfig` |
| global | 全局级别 |   中   | `~/.gitconfig`  |
| local  | 仓库级别 |   高   |  `.git/config`  |

这三层配置具有不同的优先级，假如在这三个配置文件中定义的值有冲突的话，以优先级高的为准。比如在一个项目中有仓库级别的配置，那么仓库级别的配置将发挥作用！

<font color='red'>**Git 的配置文件**</font>

- 系统配置：配置文件一般是`/etc/gitcongif`，但假如使用的是CLT中内置的Git的话，配置文件是在CLT的安装目录中，具体位置是`/Library/Developer/CommandLineTools/usr/share/git-core/gitconfig`！
- 全局配置：配置文件是`~/.gitconfig`。默认该文件不存在，除非使用安装程序进行安装并在安装过程中进行全局配置时，才会生成这个文件；如果不是的话，这个文件只有在你第一次进行全局配置时才会自动生成！
- 项目配置：配置文件就是项目目录下的`.git/config`文件。这个文件不会发生变化，不管你是在什么平台上使用什么版本的 Git，项目级别的配置文件都不会发生变化！

<font color='red'>**查看 Git 的配置**</font>

除了通过上面提到的三个配置文件来查看 Git 的配置以外，还可以使用`git config --list`来查看。比如我刚安装完命令行工具后、进行全局配置之前，查看 Git 的配置：

![](https://img.czblogs.cn/posts/operating/macos/07/image-20260707165739631.webp)

PS：当第一次在终端中执行`git config --list`命令后，会在个人文件夹生成名为`.lesshst`的文件，不知道是什么东西，反正随时可以删除！

## 3.2：配置环境变量

终端中执`git --version`命令可以直接输出 Git 版本号，使用`which`命令可见 Git 的命令是在`/usr/bin`目录下的，而这个目录本来就在 macOS 的 PATH 环境变量中：

![](https://img.czblogs.cn/posts/operating/macos/07/image-20260707170317611.webp)

这两点都说明：<font color='red'>**使用命令行工具内置的 Git，我们不需要再单独配置环境变量**</font>！

## 3.3：用户名和邮箱

对于 Git 而言，用户名和邮箱地址这两条配置很重要，每次使用 Git 提交时都会引用这两条信息，用来说明是谁提交了内容更新，所以会随更新内容一起被永久纳入历史记录！而用户名和邮箱是用户可以任意自定义的，Git 在系统配置中不可能预先设置这两个配置，<font color='red'>所以在使用 Git 之前</font>，<font color='red'>配置用户名和邮箱就是必要的操作</font>！

Git 允许你设置一个全局的用户名和邮箱，同时也允许你为每个项目设置单独的用户名和邮箱。为了方便使用，我们一般会配置一个全局的，如果有需要的话，再在项目级别配置特殊的用户名和邮箱。

配置全局用户名和邮箱，使用下面的命令：

```bash
git config --global user.name 用户名
git config --global user.email 邮箱地址
```

比如我在配置用户名和邮箱时是这样的：

![](https://img.czblogs.cn/posts/operating/macos/07/image-20260707170539094.webp)

执行了全局配置以后，在用户目录下就会生成`.gitconfig`的配置文件，文件内容为：

![](https://img.czblogs.cn/posts/operating/macos/07/image-20260707170753816.webp)

此时再通过`git config --list`命令来查看 Git 的配置：

![](https://img.czblogs.cn/posts/operating/macos/07/image-20260707170902537.webp)

若要修改用户名和邮箱配置的话，只需要修改全局配置文件的内容即可，当然也可以通过`config`命令重新设置！
