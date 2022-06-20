---
title: Vue2起步
date: 2021-1-20
tags:
 - Vue2
categories:
 - Vue2
---


::: tip 摘要
这是Vue2的简要概述<br>
:::


<!-- more  正文部分 -->

## VUE是什么？

Vue 是一套用于构建用户界面的渐进式js框架

前端工程师的职责：在合适的时候发出合适的请求，在把数据展示在合适的位置

Vue可以自底向上逐层的应用

简单应用：只需一个轻量小巧的核心库

复杂应用：可以引入各种Vue插件



## Vue的特点：

1、采用组件化模式，提高代码复用率、且让代码更好维护

2、声明式编码（相比较于命令式编码），让编码人员无需直接操作DOM，提高开发效率

```js
//以下是命令式编码
//准备html字符串
let htmlStr = "";

//遍历数据拼接html字符串
persons.foreach( p =>{
    htmlStr += '<li>${p.id} - ${p.name} - ${p.name} - ${p.age}</li>'
});

//获取list元素
let list = document.getElementById('list');

//修改内容（亲自操作DOM）
list.innerHTML = htmlStr;
```

```vue
//以下是声明式编码
<ul id = "list">
    <li v-for = "p in persons">
        {{p.id} - {p.name} - {p.age}}
    </li>
</ul>
```

