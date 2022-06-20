---
title: React
date: 2021-3-11
tags:
 - React
categories:
 - React
---


::: tip 摘要
React的一些记录<br>
:::


<!-- more  正文部分 -->

# React

## 脚手架

### 1、创建项目并启动

>1、全局安装：npm install -g create-react-app
>
>2、切换到想创建项目的目录。 create-react-app helloreact
>
>3、进入项目文件夹：cd helloreact
>
>4、启动项目：npm start
>
>5、（可选）npm add prop-types


### todolist知识点

>1、拆分组件、实现静态组件，注意：className、style的写法
>
>2、动态初始化列表，如何确定将数据放在哪个组件的state中
>
>——某个组件使用，放在自身的state中
>
>——某些组件使用，放在他们共同的父组件state中（官方称为状态提升）
>
>3、关于父子之间通信：
>
> 1. 父 => 子  通过props
>
> 2. 子 => 父  通过props 前提父提前给子传递一个函数
>
>    4、注意 defaultChecked与check的区别 （类似的还有defaultValue和Value）
>
>defaultChecked只有在第一次指定，也就是初次渲染的时候的时候才起作用，更新的时候不受控制
>
>5、状态在哪里，操作状态的方法就在哪里


### redux精简

1、去除组件自身需要共享的状态 (这里以Count组件作为例子)



2、src下建立：

​	-redxu

​		-store.js

​		-count_reducer.js



3、store.js

 1. 引入redux 中的createStore函数，创建一个store

 2.  .createStore调用时要传入一个为其服务的reducer

 3. 记得暴露store对象


4、.count_reducer.js:

​	1、reducer的本质是一个函数， 接收：preState, action ,返回加工后的状态

​	2、reducer有两个作用：初始化状态，加工状态

​	3、reducer被第一次调用时候，是store自动触发的，

​	传递的preState是undefined，传递的action是：{type:'@@REDUX/INIT_a.2.b.4}



5、在index.js中检测store中状态的改变，一旦发生改变重新渲染</APP>

注意！！！  redux只负责管理状态，至于状态的改变驱动着页面的展示，要靠我们自己写