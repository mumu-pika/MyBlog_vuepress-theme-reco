---
title: js实现深拷贝
date: 2022-9-21
tags:
 - JS
categories:
 - JS
---

::: tip 摘要
记录JS中实现深拷贝的原理<br>
:::


<!-- more  正文部分 -->
```js
// 复杂数据结构，处理深拷贝，object1 => clonedObject 属性修改, 互不影响
let obj1 = {
  array: [1, 2],
  arrayOfObj: [{ a: 3, b: 4 }],
  obj: { c: 5 },
  fn: function () { console.log(6) },
  reg: /7/,

  // ES6 Map, Set
  map: new Map([['d', 8], ['e', 9]]),
  set: new Set([10, 11]),

  num: 12,
  nulVal: null, // JS中null是属于对象, 有点bug
}

// 出现循环引用, 这种情况是可以发生的，就如数据结构中的循环链表，每个节点node就是一个object
// 这里obj1 和 obj2 互相引用
let obj2 = {}
obj2.to  = obj1
obj1.to =  obj2

// JSON序列化 => 反序列化 => 序列化
let cloned = JSON.parse(JSON.stringify(obj1))
console.log("JSON序列化以后", cloned)
// 我们会发现 function, RegExp, Set, Map,没有拷贝过来，【因为这些是JSON中本不存在的数据类型】

// 使用工具库 lodash underscore, 这类是第三方的工具库, 实际工作中可能需要我们呢自己封装

// 定义缓存map
// 使用WeakMap是为了使用弱引用，避免对象已经清理, 而map中对于对象的引用未清除的情况
let cached = new WeakMap()


function deepClone(obj) {
  // 宏观思维, 处理不同类型， 两大分类：基本 + 引用
  // 注意null也是对象
  // 基本数据类型 + null + function name(params)
  // 注意！  !null 是输出true, 所以这里需要加上!obj这个判断
  // 同理 !obj 还可以判断 undefined, 空串
  if (typeof obj != 'object' || !obj) {
    return obj
  }

  // 判断是否缓存中有值，如果有，返回处理后的值，不向下执行，避免无限递归
  if (cached.has(obj)) {
    return cached.get(obj)
  }


  // 大致规则是es6之后的类型判断很多都能使用instanceof
  // 判断正则表达式类型
  if (obj instanceof RegExp) {
    let tmp = new RegExp(obj)
    cached.set(obj, tmp)
    return tmp
  }
  // 判断Map类型
  else if (obj instanceof Map) {
    let tmp = new Map()
    // 做缓存
    cached.set(obj, tmp)
    // 遍历Map类型的obj
    // 或者使用forEach()方法来遍历，是map和set独有的
    // obj.forEach((val,key)=>{tmp.set(deepClone(key), deepClone(val))})
    // 因为map的key和val是有可能是引用数据类型的，所以这里需要递归的调用
    for (let [k, v] of obj) {
      tmp.set(deepClone(k), deepClone(v))
    }
    return tmp
  }
  // 判断Set类型
  else if (obj instanceof Set) {
    let tmp = new Set()
    // 做缓存
    cached.set(obj, tmp)
    // 遍历Set类型的obj
    for (let v of obj) {
      tmp.add(deepClone(v))
    }
    return tmp
  }
  else {
    // 数组和对象 {} []  new Object || Array() obj.constructor
    let tmp = new obj.constructor()
    cached.set(obj, tmp)
    // 遍历数组或对象
    for (let key in obj) {
      tmp[key] = deepClone(obj[key])
    }
    return tmp
  }
}

let clonedObj = deepClone(obj1)
console.log("deepClone之后", clonedObj)
```