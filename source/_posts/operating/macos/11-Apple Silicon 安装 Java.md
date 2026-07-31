---
title: Apple Silicon 安装 Java
date: 2023-01-11 06:12:28
updated: 2026-01-11 22:37:11
description: 当下选择什么版本的JDK？如何下载安装和配置？
categories:
  - 操作系统
tags:
  - macOS
  - Java
  - JDK
abbrlink: 10011
cover: img/covers/operating/macos/11.webp
---



# 第一节：先验知识

## 1.1：检查环境

在安装软件之前检查是否已经安装了想要安装的软件，是一个必要的习惯，首先执行`java -version`来检查下：

![](https://img.czblogs.cn/posts/operating/macos/11/image-20260707232404135.webp)

若没有显示 JDK 版本号，说明系统中没有 Java 环境！当然，没有显示也不能完全表示系统中不存在 Java，也许是安装了以后没有配置 Java 环境，所以打开访达搜索`Java`关键字，发现系统中也没有名称中包含“Java”字样的文件夹（只有`/Library/Java`，这个文件夹是系统自带的，它的两个子文件夹都是空的，所以其中也没有安装 JDK），这就说明当前系统中不存在 Java 环境！

## 1.2：系统内置

实际上，系统自带的文件夹`/Library/Java`就是预留给用户来安装 Java 环境的！

## 1.3：版本选择

很多刚接触 Mac 搭建 Java 环境的同学，会被 OpenJDK、Oracle JDK、Eclipse Temurin 三个名词搞晕，其实三者是“源码、原厂打包、第三方纯净打包”的从属关系：

- **OpenJDK**：Java 的官方开源基础代码库，相当于所有 JDK 的“原材料”，完全开源免费，任何人都能下载源码编译打包成可用的 JDK；
- **Oracle JDK**：甲骨文公司基于 OpenJDK 源码，二次加工打包的商用发行版。早年旧版本（JDK8 早期小版本）无商用收费限制，但从 2019 年起更新授权协议，新版 JDK8、JDK17 均变更规则；
- **Eclipse Temurin**：由 Eclipse 基金会旗下 Adoptium 项目维护，同样基于原生 OpenJDK 源码编译，只保留开发必需功能，剔除 Oracle 专属商业组件，是面向开发者、永久免费的标准化发行版。

除此之外，优先选择 JDK17，它是长期支持 LTS 版本，维护周期更长、安全补丁持续更新；新增大量简化开发的语法特性，垃圾回收性能更强，主流新版开发框架均以 JDK17 为最低运行标准。搭配开源免费的 Temurin 发行版，无商用收费风险，同时完美兼容新旧项目，适配 Intel 与 M 系列 Mac 芯片，是当下 Java 开发环境最优选择。

# 第二节：安装配置

## 2.1：下载

访问[Eclipse Temurin 官网](https://adoptium.net/)，找到 Temurin17 的下载位置，点击下载：

![](https://img.czblogs.cn/posts/operating/macos/11/image-20260708000851140.webp)

下载下来的是一个`.pkg`的安装包：

![](https://img.czblogs.cn/posts/operating/macos/11/image-20260708001830144.webp)

## 2.2：安装

直接双击下载下来的安装包：

![](https://img.czblogs.cn/posts/operating/macos/11/image-20260708002036127.webp)

点击“继续”后，接着点“继续”：

![](https://img.czblogs.cn/posts/operating/macos/11/image-20260708002235697.webp)

然后点击“同意”：

![](https://img.czblogs.cn/posts/operating/macos/11/image-20260708002348605.webp)

点击“自定义”可以查看详情：

![](https://img.czblogs.cn/posts/operating/macos/11/image-20260708002454700.webp)

继续点“安装”，然后根据提示输入开机密码，即可开始安装：

![](https://img.czblogs.cn/posts/operating/macos/11/image-20260708002552960.webp)

安装完成后，点击“关闭”即可：

![](https://img.czblogs.cn/posts/operating/macos/11/image-20260708002651794.webp)

## 2.3：检查

安装完成后，打开终端执行命令`java -version`后，显示 JDK 的版本号，则表示安装完成：

![](https://img.czblogs.cn/posts/operating/macos/11/image-20260708003318689.webp)

## 2.4：配置

暂时先不进行任何配置。

## 2.5：总结

实际上，对于这种安装包的形式，我不是很赞成，实际上我更喜欢使用压缩包的形式，这种形式的 JDK 只需要解压到系统中的`/Library/Java/JavaVirtualMachines/`中就可以了，连环境变量都不用配置（我也不知道为啥，哈哈哈）！









