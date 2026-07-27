---
title: 新版Mac安装Python的最佳实践
date: 2023-01-10 06:12:28
updated: 2026-01-10 22:37:11
description: 详解在新版的Mac上安装python3的详细过程和思考
categories:
  - 操作系统
tags:
  - macOS
  - Python
  - CLT
abbrlink: 10010
cover: img/covers/operating/macos/10.webp
---



# 第一节：先验知识

## 1.1：内置python环境

旧版本的 macOS 中，在`/System/Library/Frameworks`下面有一个名为`Python.framework`的文件夹，这个文件夹内安装的就是 python2，但是从 12.3 开始，这个文件夹被移除了，相应的内置 python 环境也不复存在！

如今，即使在新版本的 macOS 中，在`/usr/bin`下面仍然有一个名为`python3`的可执行文件：

![](https://img.czblogs.cn/posts/operating/macos/10/image-20260707212106883.webp)

这个文件在所有版本的 macOS 系统中都存在，只是默认情况下是没有用的，即使`/usr/bin`目录在环境变量中，但是在执行 python3 命令时仍然会提示你当前系统没有 python 环境。

需要注意的是：若你安装了命令行工具——Command Line Tools，那么`/usr/bin/python3`就会“变得可用”，它会指向 CLT 内置的 python3！当我们安装完 CLT 后，在终端中：

![](https://img.czblogs.cn/posts/operating/macos/10/image-20260707224938847.webp)

所以，没安装命令行工具时，新版本的 macOS 中是没有 python 环境的，不管是 python2 还是python3；但一旦安装了命令行工具后，macOS 自带的 `/usr/bin/python3` 就会变得可用！

## 1.2：CLT中的python

那么安装 CLT 后，python3 被安装到哪里去了呢？其实它被安装到如下的位置了：

![](https://img.czblogs.cn/posts/operating/macos/10/image-20260707212813366.webp)

至于为什么安装命令行工具后，`/usr/bin/python3`会指向这里，那就是 macOS 底层的处理了，没必要关心！

## 1.3：放弃内置python

即然命令行工具中内置了 python3，那么安装完命令行工具后，我们还有必要去自己安装 python3 吗？答案是：肯定有必要！为什么这么说呢，我个人认为主要有如下两个原因。

第一：命令行工具自带的 python3 是简化版的，版本较低，而且不会附带官方文档和 IDLE 等；而自己安装的话，不仅可以自由选择版本，而且还可以附带文档和 IDLE 等。

第二：使用命令行工具自带的 python3 可能会出现意料之外的问题。比如 pip3 的更新问题，直接更新的话，会在用户目录下生成 site-packages 文件夹，这样一来系统中就有了两个 site-packages 文件夹了；假如绕开权限（使用 sudo 前缀）来更新的话，虽然可以卸载旧版本的 pip3 ，但是在安装新的 pip3 时，会在`/Library`中产生名为 Python 的文件夹，并在其中继续生成 site-packages 文件夹，并没有将新的 site-packages 文件夹放到旧版 site-packages 的位置，此外还会在`/usr/local/bin`中生成 pip3 和 pip。虽然都不影响使用，但这无形之中在系统中添加了好多零零散散的目录，看起来很烦！假如后面产生和依赖相关的问题，势必会对定位问题产生不必要的困扰。

综合以上两点，我最终放弃了命令行内置的 python3，在我日常的开发中，我选择使用自己安装的 python3！<font color=red>友情提示</font>：假如你将命令行内置的 python3 作为基础环境，每次都是使用它来创建虚拟环境，然后在项目中继续使用的是你创建的虚拟环境，那命令行工具中内置的 python3 还是可以用的！



# 第二节：下载安装

## 2.1：版本选择

截止到我写这篇文章，python 已经更新到 3.14 了，我选择 3.12 中较新的一个版本 3.12.10。官网找到下载链接：

![](https://img.czblogs.cn/posts/operating/macos/10/image-20260707222756593.webp)

下载下来的是一个`.pkg`格式的安装程序：

![](https://img.czblogs.cn/posts/operating/macos/10/image-20260707223006238.webp)

## 2.2：安装步骤

双击安装包，进行傻瓜式安装即可：

![](https://img.czblogs.cn/posts/operating/macos/10/image-20260707223231559.webp)

点击上图中的“继续”：

![](https://img.czblogs.cn/posts/operating/macos/10/image-20260707223345889.webp)

接着点击上图中的“继续”（在这之前我点击保存到桌面）：

![](https://img.czblogs.cn/posts/operating/macos/10/image-20260707223548039.webp)

接着点击上图中的“继续”（在这之前我点击保存到桌面）：

![](https://img.czblogs.cn/posts/operating/macos/10/image-20260707223754263.webp)

点击“同意”后：

![](https://img.czblogs.cn/posts/operating/macos/10/image-20260707223843514.webp)

点击“自定义”，可见：

![](https://img.czblogs.cn/posts/operating/macos/10/image-20260707223935599.webp)

这里不要取消勾选任何东西，直接点击“安装”，然后输入开机密码，开始安装：

![](https://img.czblogs.cn/posts/operating/macos/10/image-20260707224120044.webp)

安装完成后，点击“关闭”：

![](https://img.czblogs.cn/posts/operating/macos/10/image-20260707224210813.webp)

点击“关闭”按钮后，桌面会自动跳出一个访达页面：

![](https://img.czblogs.cn/posts/operating/macos/10/image-20260707224423289.webp)

这说明：安装程序会在`/Application`下面生成一个名为“Python 3.12”的文件夹，文件夹中的内容如上图所示！

## 2.3：验证结果

在安装python3.12之前（也是在安装命令行工具以后）是这样的：

![](https://img.czblogs.cn/posts/operating/macos/10/image-20260707224938847.webp)

而在安装python3.12之后是这样的：

![](https://img.czblogs.cn/posts/operating/macos/10/image-20260707225041111.webp)

可见，此时系统默认的 python3 是手动安装的 3.12.10，而不是之前系统默认的 3.9.6（CLT 中内置的）！这就说明我们的安装是成功的！安装的位置就是`/library/Frameworks/Python.framework`目录！

## 2.4：安装位置

通过在终端中执行`which python3`命令，我们可以看到安装的python位置：

![](https://img.czblogs.cn/posts/operating/macos/10/image-20260707225411958.webp)

假如要卸载的话，首先要删除的就是`/Library/Frameworks/Python.framework`文件！

## 2.5：环境变量

使用安装程序来安装的 python3，是不需要配置环境变量的！为什么呢？安装程序会在用户目录下生成名为`.zprofile`的文件，文件内容为：

![](https://img.czblogs.cn/posts/operating/macos/10/image-20260707225638780.webp)

假如用户目录下原本就有这个文件，安装程序就会在这个文件后面写入同样的内容。这个内容的意思就是把用户安装的 python 命令放到系统 PATH 变量的最前面：

![](https://img.czblogs.cn/posts/operating/macos/10/image-20260707225915905.webp)

那`/Library/Frameworks/Python.framework/Versions/3.12/bin`中都有哪些命令呢？如下：

![](https://img.czblogs.cn/posts/operating/macos/10/image-20260707230108644.webp)

所以此时我们不需要配置环境变量，因为位于`/Library/Frameworks/Python.framework/Versions/3.12/bin`中的这些命令已经被放到系统 PATH 变量的最前面了！

## 2.6：符号连接

安装程序还会在`/usr/local/bin`目录下创建一些符号链接，这些链接指向安装的命令：

![](https://img.czblogs.cn/posts/operating/macos/10/image-20260707230414862.webp)

而`/Library/Frameworks/Python.framework/Versions/3.12/bin`中安装的这些命令原本就已经在系统的 PATH 中了，而且`/usr/local/bin`还在`/usr/bin`（命令行内置 python3 命令所在位置）的前面，再一次保证了我们不需要自己配置环境变量！



# 第三节：更新 pip3

## 3.1：系统中的

不管是通过命令行工具安装的还是我们自己通过安装程序安装的 python3，都会自带 pip3：

![](https://img.czblogs.cn/posts/operating/macos/10/image-20260707230655391.webp)

显然，当前系统默认的 pip3 是我们自己安装的 python3 中的！

注意：跟 python 一样，在终端中使用 pip 的时候也需要使用`pip3`来替代`pip`，使用`pip`是无效的：

![](https://img.czblogs.cn/posts/operating/macos/10/image-20260707230818388.webp)

## 3.2：查看依赖

使用`pip3 list`可以查看当前 python3 环境都安装了哪些第三方库：

![](https://img.czblogs.cn/posts/operating/macos/10/image-20260707230928360.webp)

这个命令只能检测到当前 python3 环境可以使用的第三方库和模块，不包括内建的和标准的！可见当前只有一个 pip 库：

![](https://img.czblogs.cn/posts/operating/macos/10/image-20260707231347672.webp)

记住 site-packages 这个路径，后面我们通过 pip3 下载安装的第三方库和模块都会被放到这里！

## 3.3：最终做法

跟命令行工具内置的 pip3 一样，使用安装程序安装的 python3 内置的 pip3 的版本有时候也需要更新。

回忆：我们尝试更新命令行工具自带的 pip3 时，会有如下问题

- 直接更新的话，因为的权限问题，首先会导致原本的 pip3 卸载不掉，其次会将新的 pip3 安装到用户目录下，虽然不影响使用，但此时系统中会存在两个 site-packages 文件夹，当前 python3 可以使用这两个文件夹中的资源；
- 使用`sudo`来更新的话，虽然可以将原本的 pip3 卸载，但却没有把新版的 pip3 安装到旧版的 pip3 位置，而是安装到了`/Library/Python/site-packages`中了，并且会在`/usr/local/bin`中生成 pip3 和 pip 命令指向这里。假如这样的话，那么以后每次使用 pip3 都要在前面加上`sudo`，而且安装最后系统还是会给出提示“Running pip as the 'root' user can result in broken permissions and conflicting behaviour with the system package manager”，所以最终放弃这种方案；

而更新自己安装的 python3 中自带的 pip3 时，就不会遇到这样的问题，直接使用终端中提示的命令就可以更新成功！

<font color='red'>但是，更新以后终端中可以同时识别“pip3”和“pip”这两个命令</font>！这是因为新版的 pip 会同时安装`pip`和`pip3`两个命令，所以我干脆就不更新了，理由有三：

- 不更新也能使用，又不是必须的，只是会出现更新的提示；
- 今后不打算直接使用系统默认的 python3，而是用它来创建虚拟环境（即使更新了系统默认的 pip3，创建的虚拟环境对应的 pip3 依然是新安装时未更新的 pip3 版本，所以从这方面看，更新 pip3 也是没必要的）；
- 在 macOS 上，我更愿意用“pip3”而非“pip”（因为在命令行中我们也只能使用“python3”而不是“python”，就要整整齐齐，装逼就要装个整套的）；



# 第四节：总结归纳

## 4.1：安装所得

在整个手动安装 python3 的过程中，安装程序总共做了下面几件事：

- 生成`/Application/Python 3.12`文件；

- 生成`/Library/Frameworks/Python.framework`文件，这是实际安装的 python3 文件；

- 生成`~/.zprofile`文件，将安装的 python3 添加到环境变量中。假如系统中原本就有这个文件，就会在文件末尾追加配置环境的内容

- 生成一些链接，在`/usr/local/bin`中；

  这些链接指向`/Library/Frameworks/Python.framework/Versions/3.12/bin`中的命令；

假如要卸载的话，只需要去复原上面这四项即可！

## 4.2：系统环境

经过安装命令行工具 CLT 和手动安装 python 3.12.10，此时系统中有两个版本的 python3 环境：

- /Library/Developer/CommandLineTools/Library/Frameworks/Python.framework/Versions/3.9
- /Library/Frameworks/Python.framework/Versions/3.12

前者是命令行工具中内置的，后者是我们手动安装的，而且此时如下的 python3 命令都是指向我们自己安装的：

- /Library/Frameworks/Python.framework/Versions/3.12/bin/python3.12
- /Library/Frameworks/Python.framework/Versions/3.12/bin/python3
- /usr/local/bin/python3
- /usr/local/bin/python3

而如下的 pip3 指向我们手动安装的 pip3：

- /Library/Frameworks/Python.framework/Versions/3.12/bin/pip3
- /Library/Frameworks/Python.framework/Versions/3.12/bin/pip3
- /usr/local/bin/pip3
- /usr/local/bin/pip3

此时，在终端中直接使用 pip3 命令来安装依赖时，依赖会被安装到如下目录：

- /Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages
