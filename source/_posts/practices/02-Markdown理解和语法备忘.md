---
title: Markdown理解和语法备忘
date: 2023-03-02 09:31:19
updated: 2026-03-02 23:58:41
description: 详解Markdown是什么，并记录其常用语法
categories:
  - 实操手记
tags:
  - Markdown
abbrlink: 10302
cover: /img/covers/practices/02.webp
---



# 第一节：基本概述

## 1.1：它是什么

> Markdown 是一种轻量级的标记语言，可用于在纯文本文档中添加格式化元素，允许人们使用易读易写的纯文本格式编写文档。Markdown 由 John Gruber 于 2004 年创建，如今已成为世界上最受欢迎的标记语言之一。

最开始的时候，人们使用记事本来编辑文档，但是后来发现纯文本文档真的太单调了！然后，Word 闪亮登场，从此 Word 就成为了编辑文本文档的主要工具，在 Word 中人们可以对任意的文字进行排版美化，比如设置各级标题以及文字的大小和颜色。Word 丰富多彩的文本样式，让它成为了主流的文本信息传播手段。但随着网络的发展，Word 文件过于笨重的缺点就暴露出来了，此时又诞生了 HTML，它可以使用轻量级的标记来实现文本文档的渲染，但是它的渲染功能依赖于解释环境（浏览器就是最常见的解释器），在信息传播的过程中没有那么随心所欲。

对于平时需要进行大量码字的人而言，显然笨重的 Word 和依赖浏览器的 HTML 都不符合他们的诉求。因此，诞生了 Markdown，它跟 HTML 语法一样，也是使用各种标记来实现文本样式的渲染，但是跟 HTML 相比，它更加轻量级，更加简单！在电脑系统中，Markdown 文本文件就是以`md`或`MD`为扩展名的文件！

<font color=red>假如你对 HTML 有基本的了解，那么此时你就可以将 Markdown 理解为简化版的 HTML ！并且在 Markdown 文本中可以直接使用 HTML 元素而无需转译！</font>

## 1.2：使用场景

由于 Markdown 轻量化、易读、易写的特性，并且对于图片、图表、数学公式等都有支援，目前许多网站都广泛使用它来撰写说明文档或是用于论坛上发表讯息，最常见的就是代码托管平台（比如国外的 Github 和国内的 Gitee）都采用 Markdown 语法来撰写 README 文件。当前，国内外比较知名的平台和大厂，也逐渐将 Markdown 作为文档标准！

此外，不管是学生、老师，亦或者是其他工作者，基本上有做笔记和码字需求的人，只要接触到 Markdown 以后，基本上都会被它的魅力折服，我们可以拿它来做笔记、演讲文稿、写博客......

## 1.3：它的优势

Markdown 有如下最明显的优势：

1. 语法简单，没有什么学习成本，能轻松在码字的同时做出美观大方的排版；
2. 纯文本，易读易写，可以方便地纳入版本控制；
3. 让使用者可以专注于文字内容本身；

举个例子，假如你想在你的文档中编辑一个一级标题和一个二级标题，那么你只需要在 Markdown 文件中键入如下内容：

```text
# 这是标题一
## 这是标题二
```

这是一段<font color=red>纯文本</font>，当把它拿到可以解释 Markdown 语法的编辑器中时，它就变成了网页中的标题样式。一个`#`加一个`空格`则表示标题一，两个`#`加一个`空格`则表示标题二，以此类推......因此在 Markdown 中要想键入各个等级的标题，仅仅使用`#`和空格就可以实现了！

此外，现在一些优秀的 Markdown 编辑器，将它的编辑和解释结合，实现了更加便捷的编辑和展示效果！其中以 Typora 为代表。 在 Typora 中，当你键入`Ctrl`+`1`的快捷键，就可以在光标所在那一行（自然行，包括自动折行）的内容前面添加一个`#`及空格，直接将其设为一级标题，并且能实现“所键即所得”（能直接渲染出 Markdown 的样式而不改变 Markdown 源码）！

## 1.4：它的局限

Markdown 是纯文本文件，所以其本身不能存储图片，只能存储图片的链接！Markdown 插入图片的语法是：

```text
![](图片路径)
```

然后 Markdown 的编辑器在解析这段内容的时候，会自动将引用的图片放到这里，实现“图文并茂”！图片路径可以是相对路径或绝对路径，大多数情况下，我们在 Markdown 中插入图片时都是使用的相对路径，那么在传输文件的时候，若想要对方也能在该 Markdown 中看到我们插入的图片，就必须把图片也传过去，而且要求 Markdown 文件和图片所在的文件夹的相对位置不能改变，我认为这是 Markdown 目前最大的局限！

<font color=red>PS</font>：我们可以使用图床来解决这个问题，但是图床不是我这篇博文的重点，省略！



# 第二节：基本语法

Markdown 简洁的语法，号称半小时就可以掌握，学习成本很低，所有的语法在它的[官网](https://markdown.com.cn/intro.html)或[菜鸟驿站](https://www.runoob.com/markdown/md-tutorial.html)中学得，我这里记录了一些我常用的 Markdown 语法，虽不全面，但是够我个人使用了，方便以后我来查询。

PS：官网提供了在线 Markdown 编辑器，在左边输入 Markdown 文本，在右边能直接展示出相应的效果，[网址在这](https://markdown.com.cn/editor/)！

## 2.1：标题

Markdown 提供了六级标题，第 n 级标题就使用连续的 n 个`#`加上一个空格，后面跟上标题文本

```text
 # 标题一
 ## 标题二
 ### 标题三
 #### 标题四
 ##### 标题五
 ###### 标题六
```

PS：原始的 Markdown 只有三级标题，后来扩展到六级标题（因为 Markdown 的理念就是简化文本编辑，更多级的标题有悖于这个理论，所以最多只有六级标题）。

## 2.2：斜体

使用一对`*`包裹的文本，会被解析为斜体：

```text
*要斜体的文本*
```

## 2.3：粗体

使用一对`**`包裹的文本，会被解析为加粗字体：

```text
**要加粗的文本**
```

## 2.4：引用

对于引用的文本，可以使用`>`和一个`空格`引出：

```text
> 引用的文本
```

## 2.5：列表

有序列表：

```text
1. first item
2. second item
3. third item
```

无序列表：

```text
- first item
- second item
- third item
```

注意：<font color=red>数字或-跟后面的列表内容之间有且仅有一个空格！</font>

## 2.6：代码

```text
`code`
```

PS：这里的符号是键盘 Tab 键上方的那个符号（英文输入模式）！

## 2.7：链接

```text
[展示的文本](链接的地址)
```

或者：

```text
<链接的地址>
```

PS：后一种方式表示展示的文本和链接的地址相同！

## 2.8：图片

```text
![alt text](image.jpg)
```

这里的地址可以是绝对路径或相对路径，也可以是网上任意可用的图片 URL！

## 2.9：分隔线

使用三个连续的`-`来表示分隔线：

```text
---
```

## 2.10：删除线

使用一对`~~`包裹的文本，会被添加删除线：

```text
~~文本~~
```

## 2.11：内嵌HTML

对于Markdown涵盖范围之外的标签，都可以直接在文件里面用HTML本身。如需使用HTML，不需要额外标注这是HTML或是Markdown，只需HTML标签添加到Markdown文本中即可（反过来则不可以）。

<font color=red>**第一类：行级标签**</font>

HTML 的行级內联标签如 `<span>`和`<cite>`不受限制，可以在 Markdown 的段落、列表或是标题里任意使用。依照个人习惯，甚至可以不用 Markdown 格式，而采用 HTML 标签来格式化。例如：如果你比较喜欢 HTML 的 `<a>` 或 `<img>` 标签的话，可以直接使用这些标签，而不用 Markdown 提供的链接或是图片语法。当你需要更改元素的属性时（例如为文本指定颜色或更改图像的宽度），使用 HTML 标签更方便些。

HTML 行级內联标签和区块标签不同，在內联标签的范围内， Markdown 的语法是可以解析的。

```text
This **word** is bold. This <em>word</em> is italic.
```

<font color=red>**第二类：块状标签**</font>

区块元素──比如 `<div>`、`<table>`、`<pre>`、`<p>` 等标签，必须在前后加上空行，以便于内容区分。而且这些元素的开始与结尾标签，不可以用 tab 或是空白来缩进。Markdown 会自动识别这区块元素，避免在区块标签前后加上没有必要的 `<p>` 标签。

例如，在 Markdown 文件里加上一段 HTML 表格：

```text
This is a regular paragraph.

<table>
    <tr>
        <td>Foo</td>
    </tr>
</table>

This is another regular paragraph.
```

<font color=red>**注意**</font>：Markdown语法在HTML区块标签中将不会被进行处理，也就是说，你不能在HTML块标签中使用Markdown语法！



# 第三节：扩展语法

## 3.1：表格

- 基本语法

  使用三个或多个连字符（`-`）创建每列的标题，并使用管道（`|`）分隔每列，可以选择在表的任一端添加管道：

  ```text
  | Syntax      | Description |
  | ----------- | ----------- |
  | Header      | Title       |
  | Paragraph   | Text        |

- 对齐方式

  基本语法创建的表格，文本都是左对齐的，可以通过在标题行中的连字符的左侧，右侧或两侧添加冒号（`:`），将列中的文本对齐到左侧，右侧或中心：

  ```text
  | Syntax      | Description | Test Text     |
  | :---        |    :----:   |          ---: |
  | Header      | Title       | Here's this   |
  | Paragraph   | Text        | And more      |
  ```

  这三列分别表示左对齐、居中对齐、右对齐。

## 3.2：脚注

脚注的使用频率很低，采用`[^数字]`用来表示脚注，比如在文本中使用`[^数字]`来添加一个标记：

```text
Here's a sentence with a footnote. [^1]
```

然后就可以在页脚处来表明脚注来源了：

```text
[^1]: This is the footnote.
```

## 3.3：代码块

代码块使用如下的方式：

````text
```代码语言
这是代码
```
````

比如一段Python代码：

````text
```python
nums = {1, 2, 3}
for i in nums:
    print(i)
```
````

## 3.4：定义列表

除了前面的有序列表和无序列表以外，我们还可以自定义列表：

```text
First Term
: This is the definition of the first term.

Second Term
: This is one definition of the second term.
: This is another definition of the second term.
```

类似于 HTML 中的：

```html
<dl>
  <dt>First Term</dt>
  <dd>This is the definition of the first term.</dd>
  <dt>Second Term</dt>
  <dd>This is one definition of the second term. </dd>
  <dd>This is another definition of the second term.</dd>
</dl>
```

## 3.5：标题编号

所谓标题编号，就是给标题自定义一个id选择器。比如：

```text
### 标题三 {#custom-id}
```

相当于 HTML 中的：

```html
<h3 id="custom-id">标题三</h3>
```

这样一来，其他网站中要想跳转到被编号的标题为止，可以在编号所在网页完整的 URL 后面添加`#custom-id`来链接！

## 3.6：任务列表

所谓任务列表，就是在一个普通列表的前面会有方括号，其中会有对号表示完成的内容，比如：

```text
- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media
```

`x`表示已经完成的任务（效果上是☑️），留空则表示未完成。

～～

～～

～～

