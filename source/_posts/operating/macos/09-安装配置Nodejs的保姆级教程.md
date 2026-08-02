---
title: 安装配置Nodejs的保姆级教程
date: 2023-01-09 07:25:28
updated: 2026-01-09 21:53:23
description: Mac上搭建Nodejs开发环境，可不只是安装那么简单！
categories:
  - 操作系统
tags:
  - macOS
  - Nodejs
  - npm
abbrlink: 10009
cover: img/covers/operating/macos/09.webp
---



# 第一节：什么是 Nodejs?

![](https://img.czblogs.cn/posts/operating/macos/09/image-20260707195815375.webp)

> 简单来说：Nodejs 是一个基于 Chrome V8 开发的 JavaScript 的运行环境，能够使 JavaScript 脱离浏览器运行！

Node.js 是 2009 的时候由大神 Ryan Dahl 开发的。Ryan 的本职工作是用 C++ 写服务器，后来他总结出一个经验，一个高性能服务器应该是满足“事件驱动，非阻塞 I/O”模型的。C++ 开发起来比较麻烦，于是 Ryan 就想找一种更高级的语言，以便快速开发。

可以说有两点促成了 Nodejs 的诞生。首先第一点，Ryan 发现 JS 语言本身的特点就是事件驱动并且是非阻塞 I/O 的，跟他的思路正是绝配；第二点，Chrome 的 JS 引擎，也就是 V8 引擎是开源的，而且性能特别棒。于是 Ryan 就基于  Chrome V8 开发了 Node.js 。

注意：Node.js 听起来好像是个 JS 库，其实不然，Node.js 是使用 C++ 开发的，到官网 [http://nodejs.org](https://link.zhihu.com/?target=http%3A//nodejs.org) 可以看到！所以说：<font color='red'>Node.js不是库，而是一个运行环境，或者说是一个JS语言解释器！</font>

## 1.1：执行JS代码

以前 JavaScript 只能运行在浏览器中，Node.js 出现之后，不管是服务器上还是我们自己的笔记本，只要是你安装了 Nodejs，就可以运行 JavaScrip t代码了！

比如，安装完 Nodejs 以后，进入命令行以后执行命令`node`进入 Nodejs 环境以后，执行命令：

```shell
1 + 1
```

这段JS代码就是简单的执行加法操作，回车后就可以看到代码正确执行了。

跟 python 相同，我们还可以将JS代码编写在`.js`文件中，然后使用 Nodejs 环境直接执行改文件。比如在`test.js`文件中编写如下代码：

```js
console.log("hello");
```

然后在命令行中这样执行：

```shell
node test.js
```

此时“hello”会被打印出来，而这种执行过程跟浏览器没有一毛钱关系，<font color='red'>Nodejs使得JS代码脱离了浏览器的限制！</font>

PS：当然 Nodejs 跟浏览器还是有一些细微的区别的，这里我们先不关注。

## 1.2：内置包管理器

Nodejs 的出现，引发了前后端开发的爆发（尤其是前端），众多的 JS 开发者贡献了非常多的开源代码，所有这些优秀的代码就凝结成了一个仓库——世界上最大的包管理器 npm！

Python 有一个很优秀的包管理器 pip，通过 pip 可以获取其他 Python 开发者写好的优秀代码，并将其引用到我们自己的项目中来。npm 同样如此，它是 Nodejs 的包管理器，通过 npm 我们可以简单的获取其他开发者的优秀代码，并将其引用到我们的项目中，避免“重复造轮子”！<font color='red'>跟 pip 一样，npm 既是一个代码库，也是一个程序，当系统安装上 Nodejs 以后，会内置安装 npm</font>！

比如，安装完 Nodejs 后，我们想使用 npm 安装一个名为 moment 的代码库，就可以直接执行命令：

```shell
npm install moment
```

这个命令可以直接把 moment 这个包从 npm 的软件包仓库中下载这个包并安装到本地，而在 npm 仓库中还有这数以万计的类似 moment 这样的包！



# 第二节：下载安装

## 2.1：下载

浏览器访问[Nodejs的官网](https://nodejs.org/)：

![](https://img.czblogs.cn/posts/operating/macos/09/image-20260707200142613.webp)

点击获取：

![](https://img.czblogs.cn/posts/operating/macos/09/image-20260707200421013.webp)

带有 LTS 的版本是长期维护的稳定版本，带有 Current 的版本是当前开发版本。一般情况下，选择 LTS 版本的下载。点击上图右下角的“macOS安装程序(.pkg)”，下载安装包，下载下来的是一个`.pkg`的安装程序：

![](https://img.czblogs.cn/posts/operating/macos/09/image-20260707200831818.webp)

## 2.2：安装

直接双击下载下来的安装程序，进入安装程序：

![](https://img.czblogs.cn/posts/operating/macos/09/image-20260707201325087.webp)

- 安装程序会安装 node，并将其安装到`/usr/local/bin/node`目录；
- 安装程序会安装 npm，并将其安装到`/usr/local/bin/npm`目录；

- 假如你此前没使用过`/usr/local`目录的话，此时这个目录应该是空的（比如我在安装前，这个目录就是空的）；

点击上图中右下角的“继续”，会展示软件许可协议：

![](https://img.czblogs.cn/posts/operating/macos/09/image-20260707201548418.webp)

点击上图中的“继续”，接着点击“同意”：

![](https://img.czblogs.cn/posts/operating/macos/09/image-20260707201735193.webp)

然后点击“安装”：

![](https://img.czblogs.cn/posts/operating/macos/09/image-20260707202049404.webp)

假如此时点击“自定义”，我们看到安装程序会安装 Node.js 和 npm：

![](https://img.czblogs.cn/posts/operating/macos/09/image-20260707202210358.webp)

这里不需要修改，直接点击“安装”，输入机器开机密码后，即可进入自动安装！最后点击“关闭”来完成安装：

![](https://img.czblogs.cn/posts/operating/macos/09/image-20260707202343336.webp)

## 2.3：配置

为了能在命令行中使用 Nodejs，我们需要确认安装的 node 和 npm 在我们的系统的环境变量 PATH 中。但是这两者的安装位置`/usr/local/bin/`本身就在 Mac 的环境变量 PATH 中，这是系统预置的：

![](https://img.czblogs.cn/posts/operating/macos/09/image-20260707202526563.webp)

<font color='red'>也就是说：使用安装程序安装的Nodejs，不需要我们再自己手动的设置环境变量了！</font>

## 2.4：检查

打开终端，查看 node 和 npm 的版本号，假如能正确查看到版本号，则说明安装成功：

![](https://img.czblogs.cn/posts/operating/macos/09/image-20260707203314101.webp)

安装的 Nodejs 的所有的文件都安装到`/usr/local`目录中（这个目录原本是空的）！



# 第三节：额外配置

当使用 npm 来安装第三方软件包的时候，有局部安装和全局安装两种安装类型，对应的命令分别是：

```shell
npm install 软件包名
npm install -g 软件包名
```

前者表示局部安装，后者表示全局安装！使用“<font color='red'>npm root</font>”命令可以查看局部安装和全局安装的目标目录：

![](https://img.czblogs.cn/posts/operating/macos/09/image-20260707203507813.webp)

友情提示：

- 局部安装时，软件包会被安装到执行安装命令的目录下（假如执行安装命令的路径下有`node_modules`），或者被安装到用户目录下的`node_modules`文件夹中（假如执行安装命令的路径下没有`node_modules`）；
- 全局安装时，软件包会被安装到`/usr/local/lib/mode_modules`文件夹中；

## 3.1：局部安装

在局部安装之前，用户目录下的文件目录是这样的（用户目录下的`.npm`文件是只要执行`npm`命令就会产生的）：

![](https://img.czblogs.cn/posts/operating/macos/09/image-20260707204542985.webp)

下面，我们试着在用户目录下局部安装一个名为`moment`库，在用户目录下执行`npm install moment`：

![](https://img.czblogs.cn/posts/operating/macos/09/image-20260707204711207.webp)

PS：其实安装的时候，终端中会有进度条展示，但是网速比较快的话，基本捕捉不到进度条！

此时查看用户目录，可见这里会产生三个新的文件（用户目录下的`.npm`文件是只要执行`npm`命令就会产生或更新）：

![](https://img.czblogs.cn/posts/operating/macos/09/image-20260707204827141.webp)

<font color=red>友情提醒</font>：其中安装的 moment 包就放在`node_modules`文件夹中，使用`npm uninstall moment`命令卸载时，只会将`~/node_modules/`中的`moment`文件夹删掉，上图中新生成的这三个文件夹不会被删除！

<font color='red'>**综上**</font>：

- 使用局部安装的方式，不需要额外的任何配置；
- 局部安装时，软件包会被安装到执行安装命令的目录下（假如执行安装命令的路径下有`node_modules`），或者被安装到当前用户目录下的`node_modules`文件夹中（假如执行安装命令的路径下没有`node_modules`）；

## 3.2：全局安装

局部安装时，会在安装目录下生成`node_modules`目录，但是全局安装的目标目录`/usr/local/lib/node_modules`本身就存在（package-local.json 和 package.json不存在），并且里面本身就存在两个包（这是自带的两个包）：

![](https://img.czblogs.cn/posts/operating/macos/09/image-20260707205053422.webp)

直接执行命令`npm install -g moment`来全局安装 moment 包：

![](https://img.czblogs.cn/posts/operating/macos/09/image-20260707205227907.webp)

执行报错！因为执行全局安装时，npm 会默认将软件包安装到`/usr/local/lib/node_modules/`目录下，但是从`/usr`到`/usr/local/lib/node_modules/`这些目录的权限全是`drwxr-xr-x`，并且权限属主是 root、属组是 wheel！

PS：macOS 系统的权限控制

- macOS 系统中有 staff、admin、wheel 这三种用户组；
- staff：所有的用户都属于这个组，这是用户的一个超集；
- admin：这个组中的用户可以使用`su`或`sudo`切换到 root 用户，只需要输入自己的密码即可，不用 root 密码；
- wheel：这个组只有一个 root 用户，是 root 用户的专属组；

所以，对于`drwxr-xr-x`而言，正常情况下 admin 用户对它不具备写的权限！这也是为什么上面会报错的原因！

解决这个问题，有两种思路：

- 方法一：使用`sudo npm install -g moment`命令代替`npm install -g moment`

    root 用户对`/usr/local/lib/node_modules/`有写的权限，所以使用`sudo`让管理员用户暂时具备 root 用户的权限，这样就可以完成安装了！虽然这样可以成功安装软件包到`/usr/local/lib/node_modules/`中，但是这种方式是不可取的！因为`sudo`只对当前命令有效，假如我们执行的是更新语句的话，分为卸载和安装两个步骤，`sudo`只对卸载旧版本有效，对安装新版本就无效了，所以不能使用这种方式；

    <font color=red>我们在使用 npm 进行全局安装时，应该尽量避免甚至完全不用`sudo`！</font>

- 方法二：修改`/usr/local/lib/node_modules/`的权限，让其他用户（包括 admin）对该目录具备写权限

    因为 admin 对`node_modules`的所有上级目录都具备可执行权限，在这种情况下，只要它再对`node_modules`具备写的权限，那么 admin 就可以写这个目录了，这是 Linux 的权限机制！
    
    <font color=red>显然这种方式更可取，这样在安装的时候就可以不用`sudo`了，而且可以一劳永逸！</font>
    

具体的操作步骤：

1. 打开终端，执行如下命令

   ```shell
   sudo chmod 757 /usr/local/lib/node_modules
   ```

   这一步是为了让 admin 用户对`/usr/local/lib/node_modules/`具备写的权限！

2. 打开终端，继续执行命令

   ```shell
   sudo chmod 757 /usr/local/bin
   ```

   因为在全局安装时，经常需要在`/usr/local/bin`中创建一些软连接，并让它们指向下载的包中的真实的命令，所以我们同时需要让当前用户（admin）对`/usr/local/bin`也具备写的权限！这一步就是做这个的。

这样一来，使用全局安装时，就能将软件安装到`/usr/local/lib/node_modules/`中了，并且以后不管是下载、安装还是更新，都能一劳永逸！比如此时我全局安装和卸载 moment 包都可以成功：

![](https://img.czblogs.cn/posts/operating/macos/09/image-20260707210450502.webp)

<font color='red'>**综上**</font>：安装完 Nodejs 后，使用全局安装之前，需要使用如下两个命令来改变文件的权限，仅此而已

```zsh
sudo chmod 757 /usr/local/lib/node_modules
sudo chmod 757 /usr/local/bin
```

在使用 npm 全局安装包的时候，就单纯的安装操作而言，我们直接使用`sudo` 配合`-g`参数就可以安装完成，后续也不影响对所安装软件包的使用（因为管理员用户对这个目录具备读的权限），但是为了简化每一次的安装和卸载，所以我修改了`/usr/local/lib/node_modules/`的权限；其次，为了能顺利在`/usr/local/bin`中创建能指向安装包中的命令的软连接，还需要修改`/usr/local/bin`的权限。二者缺一不可，一劳永逸！

全局安装时，包会被安装到`/usr/local/lib/node_modules/`目录下（目录本就存在，但要修改该权限）；

<font color='red'>**注意**</font>：全局安装的包，在卸载时也需要使用`-g`参数来全局卸载！

## 3.3：换镜像源

执行命令`npm config get registry`可以查看 npm 的镜像源，默认的镜像源是：

![](https://img.czblogs.cn/posts/operating/macos/09/image-20260707210623428.webp)

默认的镜像源是国外的，有时候我们在国内使用 npm 默认的镜像源时，会因为网络问题导致失败。在这种情况下我们可以更换为国内的镜像源，常见的 npm 镜像源有如下三种：

- 腾讯镜像源：http://mirrors.cloud.tencent.com/npm/
- 淘宝镜像源：https://registry.npmmirror.com
- 华为镜像源：https://mirrors.huaweicloud.com/repository/npm/

此外，更换镜像源的方式有两种：

- <font color='red'>暂时修改镜像源</font>

  比如使用淘宝源全局下载 moment，可以执行如下命令：

  ```zsh
  npm --registry https://registry.npmmirror.com install -g moment
  ```

  这种方式不会修改 npm 默认的镜像源，下次使用`npm install`命令来安装时，依然使用 npm 默认的镜像源！而卸载的时候就不需要指定镜像源了：

  ```zsh
  npm uninstall -g moment
  ```

- <font color='red'>永久修改镜像源</font>

  我们可以永久修改 npm 镜像源，这样一来每次都可以使用我们配置的镜像源来下载，而不用指定镜像源：

  ```zsh
  npm config set registry=https://registry.npmmirror.com
  ```

  对 npm 进行了自己的配置后，会在用户目录下生成名为`.npmrc`的隐藏文件，以“key=value”的形式记录配置！
  
  注意这里不要添加`-g`参数，如果添加了的话，就只是修改了全局安装时的镜像源，局部安装的镜像源没有修改！

PS：我们还可以使用 npm 安装 cnpm，因为 cnpm 默认使用淘宝源，但我不推荐，因为 cnpm 的安装目录比较奇怪！

## 3.4：更新npm

一般 Nodejs 中自带的 npm 不是最新的，需要更新 npm。比如前面我第一次使用 npm 安装 moment 时，就给出了提示：

![](https://img.czblogs.cn/posts/operating/macos/09/image-20260707204711207.webp)

假如第一次忽略了这个版本提醒，后面就不会提醒了，除非你删除了用户目录下的`.npm`文件后再执行`npm`命令！

可以使用命令`npm view npm version`来查看当前 npm 的最新版本，比如我这里：

![](https://img.czblogs.cn/posts/operating/macos/09/image-20260707211007521.webp)

但是此时若直接执行更新命令`npm install -g npm@10.2.1`的话，会出现错误：

![](https://img.czblogs.cn/posts/operating/macos/09/image-20260707211234051.webp)

其实这里的问题跟本文 3.2 中的情况是相同的，同样需要处理权限问题，我这里就不再赘述了（我觉得其实也没必要更新它，只要不删除用户目录下的`.npm`文件的话，以后在使用它的时候不会再提示更新）！



# 第四节：常用命令

npm 的命令都采用`命令`+`参数`的形式！

## 4.1：帮助

在 npm 中，有一个最重要的命令，就是`npm help`，这个命令可以查看所有其他 npm 命令的用法：

![](https://img.czblogs.cn/posts/operating/macos/09/image-20260707211744997.webp)

假如要查看某个特定命令的用法，可以使用`npm help 命令`，比如查看`config`命令：

```zsh
npm help config
```

## 4.2：配置

- 使用`npm config set key=value`进行配置，比如：

  ```zsh
  npm config set registry=https://registry.npmmirror.com  # 这里的等号也可以用空格替代
  ```

- 使用`npm config get key`查看配置，比如：

  ```zsh
  npm config get registry # 假如要查看多个，可以用空格隔开
  ```

所有的使用细节，可以使用`npm config --help`来查看大概用法，使用`npm help config`来查看详细用法！

## 4.3：安装

安装指定包，默认是局部安装，`-g`参数表示全局安装：

```zsh
npm install [-g] package
```

## 4.4：更新

更新指定包，默认是局部更新，`-g`参数表示全局更新：

```zsh
npm update [-g] package
```

## 4.4：卸载

卸载指定包，默认是局部卸载，`-g`参数表示全局卸载：

```zsh
npm uninstall [-g] package
```

## 4.5：查看

查看当前安装的软件包，默认查看局部安装的软件包，`-g`参数表示查看全局安装的软件包：

```zsh
npm list [-g]
```

查看软件包的安装位置，默认是查看局部安装位置，`-g`参数表示查看全局安装位置：

```zsh
npm root [-g]
```

查看具体某个软件包的安装位置：

```zsh
npm root package
```

～～

～～

～～
