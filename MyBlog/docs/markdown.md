---
title: markdown用法
date: 2020-05-28
tags:
- 插件
---

::: tip 摘要
这里记录一些typora中markdown基本用法。
:::


# 一级标题 （ctrl + 1）

## 二级标题 （ctrl + 2）

### 标题升级（ctrl + +）



## **字体**

### **加粗** （输入crtl + B ）

### *倾斜* ( 输入ctrl + i)

### <u>下划线</u> (输入ctrl + u)



## **高亮**

==在内容左右两边输入\=\===



## **代码块**

输入```（在键盘的左上角，1的旁边）再加上编程语言或者shell命令

```java
代码块
    输入```（在键盘的左上角，1的旁边）再加上编程语言或者shell命令，例如：
    ```java(表示要输入Java的代码块)
```



## **列表**

* 无序列表 （输入*和一个空格）

- 无序列表（输入-和一个空格）

  

## **脚注**

这里有个脚注[^脚注]

==输入[^]在里面加上内容== 



## **分割线**

---

1、输入---再按回车就出现分割线

2、输入***再按下回车就出现分割线



##  **目录**

  输入[toc]再按下回车就会生成目录

[toc]

## **链接**

Markdown支持两种风格的链接：内联和引用

在这两种风格中，链接文本都是以方括号[]来分隔的

要创建一个内联链接，请在链接文本的方括号之后使用一组常规的括号，在括号内，放入你想要链接指向的URL，以及链接的可选标题，用引号包围。输入[链接名]加上(网址)

[木木的个人学习空间](http://www.pikamumu.xyz)



## 插入图片

![图片](https://s2.loli.net/2022/06/23/gxlPVanuNFsqw8H.png)

在 Markdown 中，插入图片的语法是：\!\[alt\]\(src\)，src既可以是本地图片的绝对/相对路径，比如../images/test.png，也可以是 URL，比如：http://www.baidu.com.001.jpg，alt是图片的注释，可以为空。



## 拖拽图片

![hhh](https://s2.loli.net/2022/06/23/43tYn2sA9WPfo8N.jpg)

支持直接从文件夹将图片文件拖拽进typora


上传图片用插件 PicGo

## 嵌入内容

![](Typora001.assets/视频嵌入代码.png)

<iframe src="//player.bilibili.com/player.html?aid=754115200&bvid=BV1kk4y1m7sT&cid=220773148&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>



## 表格

<table>
    <thead>
        <tr>
            <th>名称</th>
            <th>值</th>
            <th>备注</th>
        </tr>
    </thead>
    <tbody>
       <!-- 省略 tbody 内容 -->
    </tbody>
</table>


## Ctrl + T 插入表格

| 名称 | 年龄 | 性别 |
| ---- | ---- | ---- |
| 大古 | 20   | 男   |
| 飞鸟 | 18   | 男   |


