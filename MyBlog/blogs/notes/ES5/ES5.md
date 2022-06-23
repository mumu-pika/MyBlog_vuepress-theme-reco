---
title: ES5严格模式相关
date: 2020-2-12
tags:
 - ES5
 - 严格模式
categories:
 - ES5
---


::: tip 摘要
这是ES5的严格模式，对比与ES6<br>
:::


<!-- more  正文部分 -->

# ES5

>ECMAScript 5最早引入了“严格模式”（strict mode）的概念。通过严格模式，可以在函数内部存在的错误，及时捕获一些可能导致编程错误的ECMAScript 行为。
>理解严格模式的规则非常重要，ECMAScript的下一个版本将以严格模式为基础制定。支持严格模式的浏览器包括IE10+、Firefox 4+、Safari 5.1+和Chrome



## 严格模式的作用

- 消除 JavaScript 语法的一些不合理、不严谨之处，减少一些怪异行为
- 消除代码运行的一些不安全之处，保证代码运行的安全
- 提高编译器效率，增加运行速度
- 为未来新版本的 JavaScript 做好铺垫



## 严格模式的开启

想要开启严格模式，直接在作用域开始的位置写上字符串 "use strict";

在全局模式下开启：

```js
"use strict"
```



在局部模式下开启（在函数中打开严格模式）：

```js
function fn(){
	"use strict";
    // more codes
}
```

## 严格模式特点：

## 一、将过失转化成异常

在严格模式下, 某些先前被接受的过失错误将会被认为是异常. JavaScript被设计为能使新人开发者更易于上手, 所以有时候会给本来错误操作赋予新的不报错误的语义(non-error semantics). 有时候这可以解决当前的问题, 但有时候却会给以后留下更大的问题. 严格模式则把这些失误当成错误, 以便可以发现并立即将其改正.

### 1、严格模式下无法再意外创建全局变量

>普通的JavaScript里面给一个错误命名的变量名赋值会使全局对象新增一个属性并继续“工作”（尽管将来可能会失败：在现代的JavaScript中有可能）。严格模式中意外创建全局变量被抛出错误替代：
>
>```js
>"use strict";
>// 假如有一个全局变量叫做mistypedVariable
>mistypedVaraible = 17; // 因为变量名拼写错误
>// 这一行代码就会抛出 ReferenceError
>```
>
>



### 2、静默失败的赋值操作抛出异常

- 严格模式会使引起静默失败的赋值操作抛出异常

>静默失败是指不报错也没有任何效果
>
>NaN 是一个不可写的全局变量. 在正常模式下, 给 NaN 赋值不会产生任何作用; 开发者也不会受到任何错误反馈. 但在严格模式下, 给 NaN 赋值会抛出一个异常. 任何在正常模式下引起静默失败的赋值操作 (给不可写属性赋值, 给只读属性(getter-only)赋值, 给不可扩展对象(non-extensible object)的新属性赋值) 都会抛出异常:
>
>```js
>"use strict";
> 
>// 给不可写属性赋值
>var obj1 = {};
>Object.defineProperty(obj1, "x", { value: 42, writable: false });
>obj1.x = 9; // 抛出TypeError错误
> 
>// 给只读属性赋值
>var obj2 = { get x() { return 17; } };
>obj2.x = 5; // 抛出TypeError错误
> 
>// 给不可扩展对象的新属性赋值
>var fixed = {};
>Object.preventExtensions(fixed);
>fixed.newProp = "ohai"; // 抛出TypeError错误
>```



### 3、删除不可删除的属性时会抛出异常

```js
"use strict";
delete Object.prototype; // 抛出TypeError错误
```



### 4、一个对象内的所有属性名在对象内必须唯一

>正常模式下重名属性是允许的，最后一个重名的属性决定其属性值。因为只有最后一个属性起作用，当代码要去改变属性值而不是修改最后一个重名属性的时候，复制这个对象就产生一连串的bug。在严格模式下，重名属性被认为是语法错误：
>
>```js
>"use strict";
>var o = { p: 1, p: 2 }; // !!! 语法错误
>```



### 5、函数的参数名唯一

>正常模式下, 最后一个重名参数名会掩盖之前的重名参数. 之前的参数仍然可以通过 `arguments[i] 来访问`, 还不是完全无法访问. 然而, 这种隐藏毫无意义而且可能是意料之外的 (比如它可能本来是打错了), 所以在严格模式下重名参数被认为是语法错误
>
>```js
>function sum(a, a, c) { // !!! 语法错误
>  "use strict";
>  return a + a + c; // 代码运行到这里会出错
>}
>```
>
>



### 6、禁止八进制数字语法

>ECMAScript并不包含八进制语法, 但所有的浏览器都支持这种以零(`0`)开头的八进制语法: `0644 === 420` 还有 `"\045" === "%"`.在ECMAScript 6中支持为一个数字加"`0`o"的前缀来表示八进制数.
>
>```
>var a = 0o10; // ES6: 八进制
>```



### 7、禁止设置primitive值的属性

>ECMAScript 6中的严格模式禁止设置[primitive](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive)值的属性.不采用严格模式,设置属性将会简单忽略(no-op),采用严格模式,将抛出[TypeError](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)错误
>
>primitive 指的是原始的，也就是基本数据类型

>```javascript
>(function() {
>  "use strict";
> 
>  false.true = "";              //TypeError
>  (14).sailing = "home";        //TypeError
>  "with".you = "far away";      //TypeError
>})();
>```



## 二、简化变量的使用

严格模式简化了代码中变量名字映射到变量定义的方式. 很多编译器的优化是依赖存储变量X位置的能力：这对全面优化JavaScript代码至关重要. JavaScript有些情况会使得代码中名字到变量定义的基本映射只在运行时才产生. 严格模式移除了大多数这种情况的发生, 所以编译器可以更好的优化严格模式的代码.

### 1、禁用with

with所引起的问题是块内的任何名称可以映射(map)到with传进来的对象的属性, 也可以映射到包围这个块的作用域内的变量(甚至是全局变量), 这一切都是在运行时决定的: 在代码运行之前是无法得知的. 严格模式下, 使用 with 会引起语法错误, 所以就不会存在 with 块内的变量在运行时才决定引用到哪里的情况了:

```js
!function () {
	with({ x: 1 }) {
		console.log(x);  //1
	}
}()
 
!function () {
	'use strict';
	with({ x: 1 }) {
		console.log(x);  //SyntaxError !!! 语法错误
  // 如果没有开启严格模式，with中的这个x会指向with上面的那个x，还是obj.x？
  // 如果不运行代码，我们无法知道，因此，这种代码让引擎无法进行优化，速度也就会变慢。
	}
}()
```



## 2、禁止删除声明变量

`delete name` 在严格模式下会引起语法错误：

```javascript
"use strict";
 
var x;
delete x; // !!! 语法错误
 
eval("var y; delete y;"); // !!! 语法错误
```



### 3、arguments变为参数的静态副本

非严格模式下，arguments对象里的元素和对应的参数是指向同一个值的`引用`

```js
!function(a) {
	arguments[0] = 100;
	console.log(a);  //100
}(1);
 
!function(a) {
	'use strict';
	arguments[0] = 100;
	console.log(a);  //1
}(1);
```



但是：传的`参数`是`对象`除外。arguments和形参共享传递。

```js
!function(a) {
	'use strict';
	console.log(a.x);  //1
	arguments[0].x = 100;
	console.log(a.x);  //100
}({x: 1});
```



### 4、eval变成独立作用域

在正常模式下,  代码 eval("var x;") 会给上层函数(surrounding function)或者全局引入一个新的变量 x . 这意味着, 一般情况下,  在一个包含 eval 调用的函数内所有没有引用到参数或者局部变量的名称都必须在运行时才能被映射到特定的定义 (因为 eval 可能引入的新变量会覆盖它的外层变量). 在严格模式下 eval 仅仅为被运行的代码创建变量, 所以 eval 不会使得名称映射到外部变量或者其他局部变量:

```js
!function() {
    eval('var evalVal = 2;');
    console.log(typeof evalVal);  //number
}();
	
!function() {
    'use strict';
    eval('var evalVal = 2;');
    console.log(typeof evalVal);  //undefined
}();
```



### 5、不再支持arguments.callee

正常模式下，arguments.callee 指向当前正在执行的函数。这个作用很小：直接给执行函数命名就可以了！此外，arguments.callee 十分不利于优化，例如内联函数，因为 arguments.callee 会依赖对非内联函数的引用。在严格模式下，arguments.callee 是一个不可删除属性，而且赋值和读取时都会抛出异常：

```js
"use strict";
var f = function() { return arguments.callee; };
f(); // 抛出类型错误
```



#### 6、this指向undefined

一般函数调用(不是对象的方法调用，也不使用apply/call/bind等修改this)，this指向undefined，而不是全局对象

```js
!function () {
    function fun() { return this; }
    console.log( fun() );  //Window
}();
 
!function () {
    'use strict';
    function fun() { return this; }
    console.log( fun() );  //undefined
}();
```

