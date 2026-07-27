---
title: Github禁用HTTPS密码登录
date: 2023-03-01 07:35:10
updated: 2026-03-01 23:46:39
description: 从2021年8月13日起，GitHub正式禁用HTTPS使用账户密码登录
categories:
  - 实操手记
tags:
  - Github
abbrlink: 10301
cover: /img/covers/practices/01.webp
---



# 第一节：错误描述

## 1.1：报错信息

假如你在 2021 年 8 月 13 日前后都使用 HTTPS 方式往 Github 上提交过代码，那么你肯定遇到过类似下面的错误：

```shell
remote: Support for password authentication was removed on August 13, 2021.
```

比如，我在 Github 上创建了一个新的仓库，并且用一台新的电脑第一次往这个仓库中提交代码，当提示我输入用户名和密码的时候，我照做了（且用户名和密码都输入正确），但是结果却报错：

![](https://img.czblogs.cn/posts/practices/01/image-20260709003931310.webp)

## 1.2：分析原因

从 2021 年 8 月 13 日开始，Github 删除了对使用密码进行身份验证的支持！也就是说在 HTTPS 方式下，使用 GitHub 的用户名和密码进行验证的方式已经不能使用了，用户名是指 Github 的用户名，密码则是 Github 的登录密码！

通过查阅官方文档，我发现 <font color=red>Github 现在提交代码时使用 token（口令）来替代登录密码来进行验证！</font>即使在提交代码时要求你输入的是“Password”，你依然应该输入 token 而不是 password！



# 第二节：使用口令

## 2.1：创建口令

点击 Github 主页头像，选择`Settings`，在侧边栏的最下面找到`<>Developer settings`，点击后跳转到：

![](https://img.czblogs.cn/posts/practices/01/image-20260709004525970.webp)

展开侧边栏的`Personal access token`，并点击`Token(classic)`：

![](https://img.czblogs.cn/posts/practices/01/image-20260709004719900.webp)

跳转后，假如你还没有创建口令，依次点击`Generate new token` > `Generate new token(classic)`：

![](https://img.czblogs.cn/posts/practices/01/image-20260709005040223.webp)

然后，对即将生成的口令进行初始化设置，比如我创建一个个人使用的永远不过期的口令：

![](https://img.czblogs.cn/posts/practices/01/image-20260709005519475.webp)

解释一下这里的设置：

- Note：任意填写，因为我们可能会创建很多口令，这个用来标记不同的口令，防止忘记；
- Expiration：有效期，可选的有7天、30天、60天、90天、不限制，还可以自己定制时长；
- Select scopes：选择范围，就是说你创建的这个口令具备的权限，勾选 repo 表示赋予仓库级别的权限；

最后点击最下面的`Generate token`按钮，完成创建，页面自动生成口令：

![](https://img.czblogs.cn/posts/practices/01/image-20260709005810303.webp)

注意：口令生成以后记得保存下来，一旦离开这个页面再进来，就看不到之前生成的口令明文了

![](https://img.czblogs.cn/posts/practices/01/image-20260709010018043.webp)

友情提示：如果一旦使用过口令上传代码，那么这个口令可以在 Mac 的钥匙串访问中找回来

![](https://img.czblogs.cn/posts/practices/01/image-20260709011013295.webp)

## 2.2：使用口令

使用口令很简单，只需要在推送代码时将其作为密码来使用即可：

![](https://img.czblogs.cn/posts/practices/01/image-20260709010221587.webp)

～～

～～

～～