---
title: JS的难点重点
date: 2021-2-12
tags:
 - JS
categories:
 - JS
---


::: tip 摘要
记录JS中重点难点知识点，特别是面试必问的原理点<br>
:::


<!-- more  正文部分 -->
# 一、JS基础总结

## 01 JS基础总结

### 1）基本类型:

* String: 任意字符串
* Number: 任意的数字
* boolean: true/false
* undefined: undefined
* null: null

### 2）对象（引用）类型

* Object: 任意对象
* Function：一种特别的对象（可以执行）
* Array：一种特别的对象（数值下标，内部数据是有序的）



### 判断

#### typeof

* 可以判断undefined、数值、字符串、boolean值、function

* 不能判断：null 与 object  object 与array(因为typeof返回了object，无法判断为数组)

  事实上，typeof 对于null、object和array都是返回object 

  

  返回数据类型的字符串表达

```js
var a
console.log(a, typeof a) //undefined 'undefined'
console.log(a, typeof a, typeof a = 'undefined' ,a = undefined)
//undefined 'undefined' true true

console.log(undefined = 'undefined') 
```

#### instanceof

* 判断对象的具体类型
* B instanceof A //判断B是否是A的实例



#### = (不会做数据转换)

* 可以判断：undefined, null



### 重点问题：

#### 1、undefined与null区别？

* undefined代表定义了未赋值

* null 定义了并且赋值了null

```js
var a
console.log(a) //undefined
a = null
console.log(a) //null
```

#### 2、什么时候给变量赋值null?

* 初始赋值，表明将要赋值为对象

* 结束前赋值，让对象成为垃圾对象（被垃圾回收期回收）

```js
  //初始
  var b = null //初始赋值为null,表明将要赋值为对象
  b = 'pika' //确定对象就赋值
  //最后
  b = null //让b指向的对象成为垃圾对象（被垃圾回收器回收 ）
```

#### 3、怎么样严格区分变量类型和数据类型？

* 数据的类型

  * 基本类型
  * 对象类型

* 变量的类型（变量内存值的类型，变量本身是没有类型的）

  * 基本类型：保存的是基本类型的数据

  * 引用类型：保存的是地址值
```js
    //给变量c赋值
    var c = function(){
    }
    console.log(typeof c) // 输出'function'
```



## 02 数据_变量\_内存

### 重点问题：

#### 1、什么是数据？

* 存储在内存中代表特定信息的'东东'，本质上是0101.....

  ##### 数据的特点：可传递，可运算

  ##### 一切皆数据

  ##### 内存中所有操作的目标：数据

  * 算术运算
  * 逻辑运算
  * 数值
  * 运行函数


#### 2、什么是内存？

* 内存条通电后产生的可储存数据的空间

* 内存产生和死亡：

```js
内存条（电路板）-> 通电 -> 产生内存空间 -> 存储数据 -> 处理数据 -> 断电 -> 内存空间和数据都消失
```

* 一块小内存的2个数据 （标识+存储的数据，比如：obj:0x123）

  * 内部存储的数据
  * 地址值

* 内存分类

  * 栈 ：局部变量和全局变量
  * 堆：对象



#### 3、什么是变量？

* 可变化的量，由变量名和变量值组成
* 每个变量都对应一块小内存，变量名用来查找对应的内存。变量值就是内存中保存的数据



#### 4、内存，数据，变量三者关系？

* 内存用来存储数据的空间
* 变量是内存的标识



#### 5、赋值与内存的问题？

```js
问题： var a = xxx, a内存中到底保存的是什么？
答：
若xxx是基本数据，保存的就是这个数据
若xxx是对象，保存的就是对象的地址值
若xxx是一个变量，保存的是xxx的内存内容（可能是基本数据，也可能是地址值）
```



#### 6、关于引用变量赋值的问题？

* n个引用变量指向同一个对象，通过一个变量修改对象内部数据，其他所有变量看到的是修改之后的数据
* 2个引用变量指向同一个对象，让其中一个引用变量指向另一个对象，另一引用变量依然指向前一个对象
* 改对象，改变量

#### 7、在js调用函数时传递变量参数时，是值传递还是引用传递？

```js
var a = 3
function fn(a){
    a = a + 1
}
fn(a)
console.log(a) // 这里输出3
```

* 理解1: 都是值（基本/地址值）传递
* 理解2：可能是值传递，也可能是引用传递（地址值）

#### 8、JS引擎如何管理内存？

##### 1、内存生命周期

* 分配小内存空间，得到他的使用权
* 存储数据，可以反复操作
* 释放小内存空间

##### 2、释放内存

* 局部变量：函数执行完自动释放
* 对象：成为垃圾对象=>垃圾回收器回收

```js
function fn(){
    var b = {}
}
fn() //b是自动释放，b所指向的对象是在后面的某个时刻由垃圾回收期回收
```



## 03 对象

### 重点问题：

#### 1、什么是对象？

* 多个数据的分装体
* 用来保存多个数据的容器
* 一个对象代表现实中的一个事物

#### 2、为什么要使用对象？

* 统一管理多个数据

#### 3、对象的组成

* 属性：属性名（字符串）和属性值
* 方法：一种特别的属性（属性值是函数）

#### 4、如何访问对象内部数据 

* ​	.属性名

JS访问对象属性有两种方法.

```js
var p = {name:"Jack"}; 
alert(p.name);//点号b
alert(p[name]);//中括号
```

第一是点符号法

点号要求后面的运算元是合法的标识符（即合法的变量命名）

第二是方括号表示法。括号之间的值可以是任何表达式只有这种是动态访问属性

因此，如果属性名称存储在变量中，则可以使用中括号表示法。

中括号要求的则是一个字符串即可，不必是合法的变量命名。如4p是不合法的变量命名（因为以数字开头），但却可以作为对象属性名(前提是字符串)

##### 什么时候必须使用['属性名']的方式？

* 属性名包含特殊字符

* 变量名不确定

```js
//变量名不确定
var p = {}
var propName = ‘pika’
//p.propName = value 不能使用
P[propName] = value
```



## 04 函数

### 重点问题：

#### 1、什么是函数？

* 实现特定功能的n条语句的封装体
* 只有函数时可以执行的，其他类型的数据不能执行

#### 2、为什么要使用函数？

* 提高代码复用
* 便于阅读交流

#### 3、如何定义函数？

* 函数声明

```js
function fn1(){
  //函数声明
  console.log("函数声明")
}
```

* 表达式

```js
var fn2 = function(){
    //表达式
    console.log(“表达式”)
}
```

#### 4、如何调用（执行）函数？

```
//注意这里的test()是举例的一个函数
//这里的obj是举例的一个对象
* test() 直接调用
* obj.test() 通过对象调用
* new test() new调用
* test.call/apply(obj) 临时让test成为obj的方法进行
```



## 05 回调函数

### 重点问题：

#### 1、什么函数才是回调函数？（需满足3个条件）

* 你定义的
* 你没有调用
*  最终它执行了

#### 2、常见的回调函数？

* dom事件回调函数
* 定时器回调函数
* ajax请求回调函数
* 生命周期回调函数



## 06 IIFE

### 1、理解

全称：Immediately-Invoked Function Expression

立即调用函数表达式

```js
(function(){
    //匿名函数自调用
    var a = 3
    console.log(a + 3)
})()

//这里定义的a和上面的a相互之间不影响，因为在不同的作用域里面
var a = 4
cosole.log(a)

;(function(){
    var a = 1
    function test (){
        console.log(++a)
    }
    window.$ = function(){
        //向外暴露一个全局函数
        return{
            //相当于[test:test]
            //左边test是属性名，右边test是属性值
            test:test
        }
    }
})()

//这里我们想得到++a的输出
//$是一个函数。$执行后返回的是一个对象
$().test()
```



### 2、作用

* 隐藏实现
* 不会污染外部命名空间（一般指全局命名空间）
* 用它来编写js模块

## 07 函数的中的this

### 1、this是什么?

```js
function Person(color){
    console.log(this)
    this.color = color
    this.getColor = function(){
        console.log(this)
        return this.color
    }
    this.setColor = function(color){
        console.log(this)
        this.color = color
    }
}

Person("red") //this是谁？ window

var p = new Person("yellow") //this是谁？ p

p.getColor() //this是谁？ p

var obj = {}
p.setColor.call(obj, "black") //this是谁？ obj（call强制改变this的指向）

var test = p.setColor
test(); //this是谁？ window

function fun1(){
    function fun2(){
        console.log(this)
    }
    fun2() //this是谁 window
}

fun1()

```

* 任何函数本质上都是通过某一个对象来调用的，如果没有指定就是window
* 所有函数内部都有一个变量this
* 他的值是调用函数的当前对象

### 2、如何确定this的值？

* test()  window
* p.test() p
* new test() 新创建的对象
* p.call(obj) obj





## 08 JS分号中的问题

1、js一条语句的后面可以不加分号

2、是否加分号是编码风格问题，没有应该不应该，只有你自己喜欢不喜欢

3、在下面2种情况下不加分号会有问题

* 小括号开头的前一条语句
* 中方括号开头的前一条语句

4、解决方法：在行首加分号

5、强有力的例子：vue.js库



# 二、JS函数高级

## 01 原型和原型链

### 1、函数的prototype属性

* 每个函数对象都有一个prototype属性，它默认指向一个Object空对象（即称为：原型对象）
* new obj（）new出来的一个对象是没有prototype属性的

```js
//每个函数都有一个prototype属性，它默认指向一个Object空对象（即称为：原型对象）
function fn1(){}
function fn2(){}
fn2.prototype.test = function(){
    console.log('test()')
}
console.log(fn1.prototype)//默认指向一个Object空对象（没有我们的属性）
console.log(fn2.prototype)//指向一个object对象（有我们的属性test）
```

* 原型对象中有个属性constructor，它指向函数对象

```js
//原型对象中有个属性constructor，它指向函数对象
console.log(Date.prototype.constructor  Date)//输出true
```



### 2、给原型对象

* 作用：函数的所有实例对象自动拥有原型中的属性（方法）

* ```js
  //给原型对象添加属性（一般是方法） => 实例对象可以访问
  Fun.prototype.test = function(){
  	console.log('test()')
  }
  //创建一个实例
  var fun = new Fun()	
  fun,test()
  ```

## 02 显示原型和隐式原型

### 1、每个函数function都有一个prototype, 即显式原型（属性）

### 2、每个实例对象都有个__proto\_\_,可称为隐式原型（属性）

### 3、对象的隐式原型的值为其对应构造函数的显式原型的值 

```js
//1、每个函数function都要一个prototype，即显式原型属性，默认指向一个空的Object对象
//定义构造函数
function Fn(){} //内部语句：this.prototype ={}
console.log(Fn.prototype)

//2、每个实例对象都有一个__proto__，可称为隐式原型
//创建实例对象
var fn = new Fn() //内部语句：this.__proto__ = Fn.prototype
console.log(fn.__proto__)

//3、对象的隐式原型的值为其对应构造函数的显式原型的值
console.log(Fn.prototype = fn.__proto__) //true

//给原型添加方法
Fn.prototype.test = function(){
    console.log('test')
}

//通过实例调用原型的方法
fn.test()
```

### 4、内部结构图

![image-20220303132218240](https://s2.loli.net/2022/06/23/guDojHaqQxGZy5F.png)

### 5、总结

* 函数的prototype属性：在定义函数时自动添加的，默认值是一个空Object对象
* 对象的__proto\_\_属性：创建对象时自动添加的，默认值为构造函数的prototype属性值
* 程序员能直接操作显式原型，但不能直接操作隐式原型（ES6之前）

## 03 原型链

### 1、原型链（隐式原型链）（图解）

* 访问一个对象的属性时，
  * 先在自身属性中查找，找到返回
  * 如果没有，再沿着__proto\_\_这条链向上查找，找到返回
  * 如果最终没有找到，返回undefined

![image-20220303134312917](https://s2.loli.net/2022/06/23/cpfkPhbyqats5V1.png)

* 原型链本质上是隐式原型链
* 作用：查找对象的属性（方法）

### 2、构造函数/原型/实体对象的关系（图解）

![image-20220303135044729](https://s2.loli.net/2022/06/23/QS3hj8JAZavmKz5.png)



### 3、构造函数/原型/实体对象的关系2（图解）

* 所有函数都有显式原型和隐式原型
* ![image-20220303142201421](https://s2.loli.net/2022/06/23/MCZR6sOxYtfDLQh.png)

问题：为什么Object是实例只能用Object.prototype中都方法，无法用Object都私有方法？
答：因为我们只能顺着原型链__proto__查找原型prototype上的方法，无法访问到其私有的方法。私有的方法和属性只有自己能调用。利用hasOwnProperty()方法可以区分是自己私有的，还是原型上的方法和属性。
prototype是自己私有的属性，但是prototype指向的堆中的方法和属性不是自己私有的。

### 4、函数的显式原型指向的对象默认是空Object实例对象（除Object不满足）	

### 即: xxx.prototype instanceof Object

```js
function Fn(){}
console.log(Fn.prototype instanceof Object) //true
console.log(Object.prototype instanceof Object) //false,只有这个是例外
console.log(Function.prototype instanceof Object) //true
```

### 5、所有函数都是Function的实例（包括Function）

### 即：xxx.__proto\_\_   = Function.prototype

```js
console.log(Function.__proto__ = Function.prototype) //true
```

### 6、Object的原型对象是原型链尽头

```js
console.log(Object.prototype.__proto__)//null
```

## 04 原型链属性问题

* 读取对象的属性值时候，会自动到原型链（隐式原型链）中查找
* 设置对象属性值时候：不会查找原型链，如果当前对象中没有此属性，直接添加此属性并设置其值
* 方法一般定义在原型中，属性一般通过构造函数定义在对象本身上

```js
function Fn(){}

Fn.prototype.a = ’xxx‘
var fn1 = new Fn()
console.log(fn1.a) //xxx

var fn2 = new Fn()
fn2.a = 'yyy'
console.log(fn1.a, fn2.a)//xxx yyy

function Person(name, age){
    this.name = name
    this.age = age
}

Person.prototype.setName = function(name){
    //方法一般定义在原型里
    this.name = name
}
```

## 05 instanceof 探索

### 1、instanceof 是如何判断的

* 表达式 Ainstanceof B
* 如果B函数的显式原型对象在A对象的原型链上，返回true, 否则返回false0

## 06 面试题（原型与原型链）

### 1、测试题1

```js
function A(){}
A.prototype.n = 1
var b = new A()
A.prototype = {
    n: 2,
    m: 3
}
var c = new A()
console.log(b.n, b.m, c.n, c.m)
```



![image-20220303163024695](https://s2.loli.net/2022/06/23/I6zAKonCjWOwlSx.png)

### 2、测试题2

```js
var F = function(){}
Object.prototype.a = function(){
    console.log('a()')
}
Function.prototype.b = function(){
    console.log('b()')
}
var f = new F()
console.log(f.a())
console.log(f.b())
console.log(F.a())
console.log(F.b())

//var F =function(){} 和 var f = new F()不同！！
```

![image-20220303171236209](https://s2.loli.net/2022/06/23/6BtnEpGxLsraNbR.png)

## 07 变量提升与函数提升

变量作为window对象属性放入上下文栈中，这叫变量优先预处理，而函数的上下文后放入栈中，变量随后放入栈中，但是执行的时候是先执行栈顶的函数。

函数提升优先级高是指先执行，所以对于栈的执行顺序来说，需要在变量提升之后提升

### 1、变量声明提升

* 通过var定义(声明)的变量，在定义语句之前就可以访问到

```js
//面试题：输出a的值为多少
var a = 3
function fn(){
    console.log(a) //undefined
    var a = 4
}
fn()

//上面的代码实际执行是下面这段
var a = 3
function fn(){
    var a;
    console.log(a)
    var a = 4
}
fn()
/*****************************************/
console.log(b) //undefined 变量提升
fn2() //可调用 函数提升
fn3() //不能 变量提升

var b = 3
function fn2(){
    console.log('fn2()')
}
var fn3 = function(){
    console.log('fn3()')
}
```

### 2、函数声明提升

* 通过function声明的函数，在之前就可以直接调用

  

## 08 执行上下文

### 1、代码分类（位置）

* 全局代码
* 函数（局部）代码

### 2、全局执行上下文(在执行全局代码前做的准备工作)

* 在执行全局代码前将window确定为全局执行上下文
* 对全局数据进行预处理
* var定义传递全局变量 > undefined, 添加为window的方法
* function 声明的全局函数 > 赋值（fun）,添加为window 的方法
* this => 赋值（window）

```js
//全局执行上下文
console.log(a1, window.a1)
window.a2()
console.log(this)

var a1 = 3
function a2(){
console.log('a2()')
}

console.log(a1)

//函数执行上下文
function fn(a1){
    console.log(a1) //2
    console.log(a2) //undefined
    a3() //a3()
    console.log(this) //window
    cosole.log(arguments) //这里的arguments是封装实参的类数组对象,这里输出（2,3）
    
    var a2 = 3
    function a3(){
        console.log('a3()')
    }
}
fn(2,3)

```

### 3、函数执行上下文

* 在调用函数，准备执行函数体之前，创建对应的函数执行上下文对象（虚拟的，存在于栈中）
* 对局部数据进行预处理
  * 形参变量 > 赋值（实参）\> 添加为执行上下文的属性
  * arguments > 赋值（实参列表），添加为执行上下文的属性
  * var定义的局部变量 > undefined, 添加为执行上下文的属性
  * function声明的函数 > 赋值（fun）,添加为执行上下文的方法
  * this > 赋值（调用函数的对象）
* 开始执行函数体代码

### 4、执行上下文对象个数：n+1原则

n是函数调用次数，1是一个全局执行上下文对象



## 09 执行上下文栈(后进先出LIFO)

* 在全局代码执行之前，JS引擎就会创建一个栈来存储管理所有的执行上下文对象
* 在全局执行上下文（window）确定后，将其添加到栈中（压栈）
* 在函数执行上下文创建之后，将其添加到栈中（压栈）
* 在当前函数执行完毕后，将栈顶的对象移除（出栈）
* 当所有的代码执行完之后，栈中只剩下window

![image-20220304120906802](D:\Super_mumu\typora文档资料\JS高级.assets\image-20220304120906802.png)

![image-20220304121521915](https://s2.loli.net/2022/06/23/cQe5oaZzEUsJ1gw.png)

```js
console.log('global begin:' + i)
var i = 1
foo(1)
function foo(i){
    if(i  4){
        return
    }
    console.log('foo() begin:' + i)
    foo(i + 1) //递归调用：在函数内部调用自己
    console.log('foo() end: ' + i)
}
console.log('global end:' + i)

//上述代码依次输出什么？
//整个过程中产生了几个执行上下文？ 5
```

## 10 面试题（执行上下文与执行上下文栈）

### 1、面试题1

```js
//面试题1
function a(){}
var a
console.log(typeof a) //function 	 	

//函数提升优先级比变量提升优先级要高，且不会被变量声明覆盖，但是会被变量赋值覆盖
```

红皮书111页说道：**解析器在向执行环境中加载数据时会率先读取函数声明，并使其在执行任何代码之前可用(可访问)，即函数声明提升**、JavaScript上卷中第40页提到**函数声明是优于变量提升的**。

函数提升是声明并赋值的，而变量提升只是声明，但是函数赋值诗可以被变量赋值覆盖。

```js
console.log(getName)
var getName = 1
function getName(){
    console.log(2)
} //f getName(){console.log(2)}

/****************************/
console.log(getName) //f getName(){console.log(2)}
var getName = function(){
    console.log(3)
}
console.log(getName) //f(){cosole.log(3)}
function getName(){
    console.log(2)
}
console.log(getName)//f(){cosole.log(3)}
```

### 2、面试题2

```js
//面试题2
if (!(b in window)){
    var b = 1
}
console.log(b) //undefined
```

### 3、面试题

```js
var c = 1
function c(c){
    console.log(c)
    var c = 3
}
c(2) //c is not a function
```

## 11 作用域

### 1、理解

* 一块“地盘”，一个代码段所在的区域

* 它是静态的，相对于上下文对象，在编写代码时候就确定了

### 2、分类

* 全局作用域

* 函数作用域

* 块作用域（ES6有了，let声明的范围是块作用域）

  【块作用域就是大括号之间的范围】

```js
//没有块作用域
if(true){
    var a = 1
}
console.log(a)//1

//有块作用域
if(true){
    let b = 2
}
console.log(b)//b is not defined
```

### 3、作用域个数：n+1+m

n是函数定义次数，1是一个全局作用域，m是块作用域个数

![image-20220304133932122](https://s2.loli.net/2022/06/23/Uiz7MlsXpBgSOhV.png)

### 4、作用

* 隔离变量，不同作用域下同名变量下不会有冲突



## 12 作用域与执行上下文

### 1、区别1

* 全局作用域之外，每个函数都会创建自己的作用域，作用域在函数定义时就已经确定了，而不是在函数调用时
* 全局执行上下文环境是在全局作用域确定之后，js代码马上执行之前创建
* 函数执行上下文是在调用函数时，函数体代码执行之前创建

### 2、区别2

* 作用域是静态的，只要函数定义好了就一直存在，且不会再变化
* 上下文环境是动态的，调用函数时创建，函数调用结束时上下文环境就会自动释放

### 3、联系

* 上下文环境（对象）是从属于所在的作用域
* 全局上下文环境 => 全局作用域
* 函数上下文环境 => 对应的函数使用域

![image-20220304143640637](https://s2.loli.net/2022/06/23/CnXD1Myvte56LdW.png)

## 13 作用域链

### 1、理解

* 多个上下级关系的作用域形成的链，它的方向是从下向上的（从内到外）
* 查找变量时就是沿着作用域链来查找的

### 2、查找一个变量的查找规则

* 在当前作用域下的执行上下文中查找对应的属性，如果有直接返回，否则进入上一级
* 重复执行操作，直到全局作用域，如果还找不到就抛出找不到的异常

![image-20220304143734563](https://s2.loli.net/2022/06/23/Dy4o13IRO2cxwCG.png)

## 14 面试题（作用域与作用链）

###  1、面试题1

```js
var x = 10
function fn(){
	console.log(x)
}
function show(f){
 	var x = 20
 	f()
}
show(fn)  
//因为作用域静态，定义就确定了，所有fn()向上一级找x的值是直接找到全局x 10

/**************上下对比*************/
var x = 10
function fn(x){
	console.log(x)
}
function show(f){
 	var x = 20
 	f(x)
}
show(fn) //20
console.log(x) //10

```

### 2、面试题2

```js
 var fn = function(){
     console.log(fn)
 }
 fn()  //function(){console.log(fn)}

var obj = {
    fn2:function(){
        console.log(fn2)
    }
}

obj.fn2() //报错，fn2 Is没有用this，默认是window.fn2()，此外，这里的fn2不是变量，是属性，如果想找到需要obj.fn2


/***********上下对比*****************/
//如果想让上面的obj.fn2()找到，需要改为

var obj = {
    fn2:function(){}
}
```

## 15 闭包

```js
for(var i = 0, length = btns.length; i < length; i++){
	var btn = btns[i]
	//将btn所对应的下标保存在btn上
	btn.index = i
	btn.onclick = function(){
		alert('第' + (this.index + 1 + ‘个’))
	}
}

/**********上下对比****************/
//利用闭包
for(var i = 0, length = btns.length; i < length; i++){
	(function(i){
        var btn = btns[i]
		//将btn所对应的下标保存在btn上
		btn.index = i
		btn.onclick = function(){
		alert('第' + (this.index + 1 + ‘个’))
	}
   })(i)
}
```

### 1、如何产生闭包？

* 当一个嵌套的内部（子）函数引用了嵌套的外部（父）函数的变量（函数）时，就产生了闭包

### 2、闭包到底是什么？

闭包不是任何代码，闭包是函数运行的机制



函数执行的过程中，会形成一个全新的私有上下文



1、保护：保护自己的私有变量不受外界干扰（操作自己的私有变量和外界没有关系）

2、保存：如果当前上下文不被释放[只要让上下文中的某个东西被外部占用即可]，则存储的这些私有变量也不会被释放，可以供其下级上下文中调取使用，相当于把一些值保存起来了

我们把函数执行所带来的两大作用（两大机制），称之为闭包

* 使用Chrome调试查看
* 理解一：闭包是嵌套的内部函数（绝大部分人）
* 理解二：包含被引用变量（函数）的对象（极少数人）
* 注意：闭包存在于嵌套的内部函数中

```js
function fn1(){
	var a = 2
	function fn2(){ //执行函数定义就会产生闭包（不用调用内部函数）
		console.log(a)
	}
}
fn1()

/**********上下对比**********/
function fn1(){
	var a = 2
	var fn2 = function (){ //这个不是闭包，因为fn2是变量提升，而非函数提升，所以这里的fn2是undefined
		console.log(a)
	}
}
fn1()
```

### 3、产生闭包的条件？

* 函数嵌套

* 内部函数引用了外部函数的数据（变量/函数）

* 闭包产生不一定要内部函数执行，但闭包产生一定是执行了外部函数

  

## 16 常见的闭包

### 1、将函数作为另一个函数的返回值

### 2、将函数作为实参传递给另一个函数调用

```js
function fn1() {
    var a = 2
    function fn2() {
        a++
        var b = 3
        b++
        console.log("a = " + a + "、b = " + b)
    }
    return fn2
}
var f =fn1()
f() //a = 3、b = 4
f() //a = 4、b = 4
console.log(fn1.a) //undefined
console.log(fn2.b) //报错fn2 is not defined

/***********上下对比*****************/
function fn1(){
    var a = 2
    function fn2(){
        a++
        console.log(a)
    }
    function fn3(){
        a--
        console.log(a)
    }
    return fn3
}
var f = fn1()
f() //1
f() //0

//闭包里面只有a,没有fn2和fn3
//局部变量fn3被释放了，但是fn3所保存的函数对象的地址值返回给了全局变量f了
//闭包一直存在没有消失的原因是第31行f导致的
```

### 3、问题：

#### 1、函数执行完之后，函数内部声明的局部变量是否还存在？

一般不存在，存在于闭包之中的变量才可能存在

所以这里对于上面的例子，是存在的

原因是fn1存在于闭包之中，所以fn1内部声明的局部变量a还存在

闭包保存了函数需要的局部变量的值，便于函数调用时获取这些值

#### 2、在函数外部能直接访问函数内部的局部变量嘛？

不能，但我们可以通过闭包让外部操作它

![image-20220308175431868](https://s2.loli.net/2022/06/23/LkR8Hx5qos7fA9m.png)

![image-20220308175421288](https://s2.loli.net/2022/06/23/rJUDye4lWhk7smT.png)

### 4、闭包的作用：

* 使用函数内部的变量在函数执行完之后，仍然存活在内存中（延长了局部变量的生命周期）
* 让函数外部可以操作（读写到函数内部的数据（变量/函数））

### 5、闭包的生命周期

* 产生：在嵌套内部函数定义执行完时就产生了（不是在调用）
* 死亡：在嵌套的内部函数成为垃圾对象时

```js
function fn1(){
	var a = 2
	function fn2(){
		a++
		console.log(a)
	}
	return fn2()
}
var f = fn1()
f()//3
f()//4，这个时候闭包还存活着
f = null //闭包死亡，（包含闭包的函数对象成为了垃圾对象）
```

### 6、闭包的应用_自定义JS模块

* 具有特定功能的JS模块

* 将所有的数据和功能都封装在一个函数内部（私有的）
* 只向外暴露一个包含n个方法的对象或方法
* 模块的使用者，只需要通过模块暴露的对象调用方法来实现对应的功能

### 7、闭包的缺点

1、缺点

* 函数执行完后，函数内的局部变量没有释放，占用内存时间会变长
* 容易造成内存泄漏

2、解决

* 能不用闭包就不用
* 及时释放

#### 内存溢出（程序已经出错了, 质变）

* 一种程序运行出现的错误
* 当程序运行需要的内存超过了剩余的内存时，就会抛出内存溢出的错误

#### 内存泄漏（程序还能正常运行，还没有出错，量变）

* 占用的内存没有及时释放
* 内存泄漏积累多了就容易导致内存溢出
* 常见的内存泄漏：
  * 意外的全局变量
  * 没有及时清理的计时器或回调函数
  * 闭包

### 8、面试题

```js
//面试题1
var name = 'the window'
var object = {
    name: "MyObject",
    getNameFunc: function(){
        return function(){
            return this.name
        }
    }
}
alert(object.getNameFunc()())// the window

/**********上下对比*************/
var name2 = "the window"
var object2 = {
    name2: "My Object",
    getNameFunc: function(){
        var that = this
        return function(){
            return that.name2
        }
    }
}
alert(object2.getNameFunc()()) //My Object

//面试题2 终极！！！
function fun(n, o){
    console.log(o)
    return {
        fun: function(m){
            return fun(m, n)
        }
    }
}
var a = fun(0)
a.fun(1)
a.fun(2)
a.fun(3) //undefined, 0 ,0 ,0

var b = fun(0).fun(1).fun(2).fun(3)//undefined, 0, 1, 2

var c = fun(0).fun(1)
c.fun(2)
c.fun(3) //underfined, 0, 1, 1

```

## 17 纯函数

一类特别的函数，只要是同样的输入（实参），必定会得到同样的输出（返回）

必须遵守以下一些约束

​	1、不得改写参数数据

​	2、不会产生任何副作用，例如网络请求、输入和输出设备

​	3、不能调用Date.now()或Math.random()等不纯的方法

​	redux的render函数必须是一个纯函数



### 纯函数好处

>1、可缓存
>
>自己模拟一个memoize函数
>
>```js
>// 记忆函数（封装实现）
>
>// 获取圆的面积
>function getArea(r){
>    console.log("getArea调用啦！")
>    return Math.PI * r * r
>}
>
>function memorized (f){
>    // 缓存的地方
>    let cache = {}
>    return function (){
>        // 由于arguments是类数组结构，这里给转化为数组
>        let key = JSON.stringify(arguments)
>        cache[key] = cache[key] || f.apply(f, arguments)
>        return cache[key]
>    }
>}
>
>//这里调用记忆函数传入相同的参数会不再调用函数，而是直接返回缓存的数值
>
>let getAreaMemory = memorized(getArea)
>console.log("(1)", getAreaMemory(2))
>console.log("(2)", getAreaMemory(2))
>console.log("(3)", getAreaMemory(3))
>```
>
>
>
>2、可测试
>
>3、并行处理
>
>纯函数不需要访问共享的内存数据，所以在并行环境下可以任意运行纯函数
>
>





### 18 柯里化（Currying）

>当一个函数有多个参数的时候先传递一部分参数调用它（这部分参数以后永远不变）
>
>然后返回一个新的函数接收剩余的参数，返回结果
>
>

```js
// 函数的柯里化
function checkAge (min) {
    return function (age){
        return age >= min
    }
}

//ES6写法
let checkAge = min => (age => age >= min )
let checkAge18 = checkAge(18)

console.log(checkAge18(18))

```



#### lodash中的纯函数

```)
//lodash中的curry基本使用
const _ = require("lodash")

function getSum(a, b, c){
	return a + b + c
} 

const curried = _.curry(getSum)

console.log(curried(1,2,3))
console.log(curried(1)(2,3))
console.log(curried(1,2)(3))
```



#### 柯里化函数封装

```js
// 柯里化原理（封装）
function curry(func) {
    return function curriedFn(...args) {
        // 分情况判断,
        // 1、如果传入的形参个数少于函数所需的参数个数
        if (args.length < func.length) {
            return function () {
                //这里有已经产生了闭包，arg是缓存的变量
                // 将arguments中的参数值同后续的参数合并
                // concat是合并数组
                // Array.from()可以将一个类数组对象或者可遍历对象转换成一个真正的数组
                return curriedFn(...args.concat(Array.from(arguments)))
            }
        }
        // 2、当实际传入的形参个数大于等于所需参数个数
        return func(...args)
    }
}
```

>### 柯里化总结：
>
>* 柯里化可以让我们给一个函数传递较少的参数得到一个已经记住了某些固定参数的新参数
>* 这是一种对函数参数的‘缓存’
>* 让函数变的更灵活，让函数的粒度更小
>* 可以把多元函数转换为一元函数，可以组合使用函数产生强大的功能

## 18函数组合

>纯函数和柯里化很容易写出洋葱代码 h(g(f(x)))
>
>* 获取数组的最后一个元素再转换成大写字母   _.toUpper(\_.first(\_.reverse(array)))
>* 函数组合可以让我们把细粒度的函数重新组合生成一个新的函数

![image-20220602215841359](https://s2.loli.net/2022/06/23/Z5wXYmvE169LKlr.png)

>函数组合（compose）:如果一个函数要经过多个函数处理才能得到最终值，这个时候可以把中间过程的函数合并成一个函数
>
>函数就像数据的管道，函数组合就是把这些管道连接起来，让数据穿过多个管道形成最终结果
>
>**函数组合默认是从右到左执行**
>
> ```js
> // 函数组合
> function compose(f, g){
>     return function(value){
>         return f(g(value))
>     }
> }
> 
> // 函数一： 返回数组的反转数组
> function reverse (array){
>     return array.reverse()
> }
> 
> // 函数二：返回数组的第一个元素
> function first (array){
>     return array[0]
> }
> 
> // 这里函数组合会从右向左执行，也就是先执行reverse，再执行first
> // 所以之类functionCompose会返回array数组的反转数组的第一个元素
> let functionCompose = compose(first, reverse)
> 
> console.log(functionCompose([1,2,3,4]))
> ```



#### lodash中的组合函数

>lodash中的组合函数flow() 或者flowRight() , 他们都可以组合多个函数
>
>flow() 是从左到右运行
>
>flowRight()是从右到左运行，使用的更多一些
>
>```js
>const _ = require('lodash');
>// lodash中的组合函数
>const reverse = arr => arr.reverse()
>const first = arr => arr[0]
>const toUpper = s => s.toUpperCase()
>
>// 封装lodash中的flowRight
>function flowRight(...args) {
>    return function(initialValue){
>        // reduce(function(previousValue, currentValue, currentIndex, array) { /* ... */ }, initialValue)
>        // 这里的fn即args数组中每一个元素，每一个元素都是函数组合中的函数
>        return args.reverse().reduce(function(previousValue, fn){
>            return fn(previousValue)
>        }, initialValue)
>    }
>}
>
>// ES6写法封装flowRight
>// const flowRight = (...args) => value => args.reverse().reduce((previousValue, fn) => fn(previousValue), value)
>
>const f = flowRight(toUpper,first,reverse)
>console.log(f(['one', 'two', 'three']))
>```
>
>
>
>



## 19 高阶函数

>使用高阶函数的意义：
>
>* 抽象可以帮我们屏蔽细节，只需要关注与我们的目标
>* 高阶函数是用来抽象通用的问题

>常用的高阶函数
>
>map、every、some
>
>```js
>// map() 方法创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。
>// 封装map方法
>function map(array, fn){
>    let results = []
>    for (let value of array){
>        results.push(fn(value))
>    }
>    return results
>}
>
>// 模拟出一个平方数
>let arrA = [1, 2, 3]
>
>arrB = map(arrA, item => item * item)
>console.log(arrB)
>
>
>
>// every() 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值
>// 封裝every方法
>function every(array, fn){
>    let result = true
>    for (let value of array){
>        if(!result) break
>        result = fn(value)
>    }
>    return result
>}
>
>const isBelowThreshold = (currentValue) => currentValue < 40
>const array1 = [1, 30, 39, 50, 10, 13]
>console.log(every(array1, isBelowThreshold))
>
>
>
>// some() 方法测试数组中是不是至少有 1 个元素通过了被提供的函数测试。它返回的是一个 Boolean 类型的值。
>// 封裝some方法
>function some(array, fn){
>    let result = false
>    for (let value of array){
>        if(result) break
>        result = fn(value)
>    }
>    return result
>}
>
>// checks whether an element is even
>const even = (element) => element % 2 = 0;
>const array2 = [1, 3, 9, 7, 5];
>console.log(some(array2, even))
>
>```
>





## 20 !function(){}()

!function(){} 这种写法，是一种立即执行函数的写法。即IIFE等[设计模式](https://so.csdn.net/so/search?q=设计模式&spm=1001.2101.3001.7020)。这种函数在函数定义的地方就直接执行了。

理解IIFE设计模式的关键是要认识到，在ES6之前，JavaScript仅具有函数作用域（因此缺少块作用域），并通过闭包内部的引用传递值。ES6之后情况已不再如此，因为JavaScript的ES6版本使用let和const关键字实现了块作用域。

 (function(){})()是匿名函数，主要利用函数内的变量作用域，避免产生全局变量，影响整体页面环境，增加代码的兼容性。

(function(){})是一个标准的函数定义，但是没有赋值给任何变量。所以是没有名字的函数，叫匿名函数。没有名字就无法像普通函数那样随时随地调用了，所以在他定义完成后就马上调用他，后面的括号()是运行这个函数的意思。

如下几种写法作用是相同的：

```js
!function () { /* ... */ }();
~function () { /* ... */ }();
-function () { /* ... */ }();
+function () { /* ... */ }();
void function () { /* ... */ }();
(function (){/*...*/}());
(function (){/*...*/})();
```

!function(){}()写法和(function(){})()是相同的

!function(){}()

①函数后的();表示要执行这个函数；

②而();要求前面必须是一个表达式。（最后有js表达式的定义）。

③所以“!”的作用是将function(){}函数体转为一个函数表达式。



## 21 with语句

with语句被用于在访问一个对象的属性或方法时避免重复使用指定对象引用。

```js
with(obj){
	statements...
}
```

object指定在statements块中没有引用的情况下使用哪个对象引用。
在一个连续的程序代码中，如果多次使用某个对象的多个属性或方法，那么只要在with关键字后的括号（）中写出该对象的名称，就可以在随后的大括号{}中的程序语句中直接引用该对象的属性名或方法名，不必再在每个属性名或方法名前都加上对象实例名和“.”。



## 22 eval 函数

>eval() 函数作用：可以接受一个[字符串](https://so.csdn.net/so/search?q=字符串&spm=1001.2101.3001.7020)str作为参数，并把这个参数作为脚本代码来执行。
>（如果执行结果是一个值就返回，不是就返回undefined，如果参数不是一个字符串，则直接返回该参数）

```js
eval(“var a=1”);//声明一个变量a并赋值1。

eval(“2+3”);//执行加运算，并返回运算值。

eval(“mytest()”);//执行mytest()函数。

eval("{b:2}");//声明一个对象。如果想返回此对象，则需要在对象外面再嵌套一层小括如下：eval("({b:2})");

注意：使用eval来解析JSON格式字符串的时候，会将{}解析为代码块，而不是对象的字面量
```



>#### 函数作用域：
>
>eval()函数并不会创建一个新的作用域，并且它的作用域就是它所在的作用域，有时候需要将eval()函数的作用域设置为全局，当然可以将eval()在全局作用域中使用，这个时候可以用window.eval()的方式实现。



>#### Function和eval有什么区别？
>
>共同点：都可以讲字符串转化为js代码
>不同点：Function创建出来的函数，并不会直接调用，只有当手动去调用创建出来的函数的时候才，eval把字符串转化为代码后，直接就执行了。



# 三、面向对象高级

## 01 对象创建模式

方式一：Object构造函数模式

* 套路：先创建空Object对象，再动态添加属性/方法
* 适用场景：起始时不确定对象内部数据
* 问题：语句太多

```
var p = new Object()
p.name = 'Tom'
p.age = 12
p.setName = function(name){
this.name = name
}
```

方式二：对象字面量模式

* 套路：使用{ }创建对象，同时指定属性/方法
* 适用场景：起始时对象内部数据是确定的
* 问题：如果创建多个对象，有重复代码

```js
var p = {
    name: 'Tom'm
    age: 12,
    setName: function(name){
        this.name = name
    }
}
```

方式三：工厂模式

* 通过工厂函数动态创建对象并返回
* 适用场景：需要创建多个对象
* 问题：对象没有一个具体的类型，都是Object类型

```js
function createPerson(name,age){
	var obj = {
		name:name,
		age:age,
		setName:function(name){
			this.name = name
		}
	}
	return obj
}

```

方式四：自定义构造函数模式

* 套路：自定义构造函数，通过new创建对象
* 适用场景：需要创建多个类型确定的对象
* 问题：每个对象都有相同的数据，浪费内存

```js
function Person(name, age){
    this.name = name
    this.age = age
    this.setName = function(name){this.name = name}
}

var p1 = new Person('Tom',12)
```

方法五：构造函数 + 原型的组合模式

* 自定义构造函数，属性在函数中初始化，方法添加到原型上
* 适用场景：需要创建多个类型确定的对象

```js
function Person(name, age){
	//在构造函数中只初始化一般函数
    this.name = name
    this.age = age
}

//将相关方法添加到原型上
Person.prototype.setName = function(name){
    this.name = name
}
```

## 02 继承模式

### 方式一：原型链继承

* 步骤

1. 定义父类型构造函数
2. 给父类型的原型添加方法
3. 定义子类型的构造函数
4. 创建父类型的对象赋值给子类型的原型
5. 将子类型原型的构造属性设置为子类型
6. 给子类型原型添加方法
7. 创建子类型的对象：可以调用父类型的方法

* 关键

1. 子类型的原型为父类型的一个实例对象

![image-20220322231650338](https://s2.loli.net/2022/06/23/nkQhfCpY1E42q5D.png)



### 方式二：借用构造函数继承（假的）

* 步骤

1. 定义父类型构造函数
2. 定义子类型构造函数
3. 在子类型构造函数中调用父类型构造

* 关键

1. 在子类型构造函数中调用super()调用父类型构造函数

![image-20220322233059420](https://s2.loli.net/2022/06/23/HUEeWGj4M89ADSc.png)

### 方式三：原型链 + 借用构造函数的组合继承

1. 利用原型链实现对父类型对象的方法继承
2. 利用super()借用父类型构建函数初始化相同属性

![image-20220323101740129](https://s2.loli.net/2022/06/23/PQtc7J8D69V3Xjk.png)

# 四、线程机制与事件机制

## 01 进程与线程

### 1、进程（process）

程序一次执行，占有独有的内存一块空间

可以通过windows任务管理器查看进程

### 2、 线程 (thread)

进程内的一个独立执行单元

程序执行的一个完整流程

CPU的最小调度单元

### 3、相关知识

* 应用程序必须运行在某个进程的某个线程上
* 一个进程中至少有一个运行的线程：主线程，进程启动后自动创建
* 一个进程中可以同时运行多个线程，我们会说程序是多线程运行的
* 一个进程内的数据可以供其中的多个线程共享
* 多个进程之间的数据是不能直接共享的
* 线程池（thread pool）保存多个线程对象的容器，实现线程对象的反复利用（复用）

### 4、相关问题

#### 0、为什么js要设计成单线程？

这主要和js的用途有关，js是作为浏览器的脚本语言，主要是实现用户与浏览器的交互，以及操作dom；这决定了它只能是单线程，否则会带来很复杂的同步问题。 举个例子：如果js被设计了多线程，如果有一个线程要修改一个dom元素，另一个线程要删除这个dom元素，此时浏览器就会一脸茫然，不知所措。所以，为了避免复杂性，从一诞生，JavaScript就是单线程，这已经成了这门语言的核心特征，将来也不会改变

为了利用多核CPU的计算能力，HTML5提出Web Worker标准，允许JavaScript脚本创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。所以，这个新标准并没有改变JavaScript单线程的本质。

#### 1、何为多进程与多线程？

多进程运行：一个应用程序可以同时启动多个实例运行

多线程：在一个进程内，同时有多个线程运行

#### 2、比较单线程与多线程？

多线程：

* 优点
  * 能有效提升CPU的利用率
* 缺点
  * 创建多线程开销
  * 线程键切换开销
  * 死锁与状态同步问题

单线程：

* 优点：顺序编程简单易懂
* 缺点: 效率低

#### 3、js是单线程还是多线程运行？

* js是单线程运行的
* 但是用H5中的web worker 可以多线程运行

#### 4、浏览器运行时单线程还是多线程？

都是多线程运行的

#### 5、浏览器运行是单进程还是多进程？

有的是单进程：firefox 、老板IE

有的是多进程：chrome、新版IE

浏览器每个进程有多个线程，主要有以下线程

1）GUI 渲染线程:

负责渲染页面，解析 html，css 构成 DOM 树等，当页面重绘或者由于某种操作引起回流都会调起该线程。
和 js 引擎线程是互斥的，当 js 引擎线程在工作的时候，GUI 渲染线程会被挂起，GUI 更新被放入在 js 任务队列中，等待 js 引擎线程空闲的时候继续执行。

2）js 引擎线程:

单线程工作，负责解析运行 JavaScript 脚本。
和 GUI 渲染线程互斥，js 运行耗时过长就会导致页面阻塞。

3）事件触发线程:

当事件符合触发条件被触发时，该线程会把对应的事件回调函数添加到任务队列的队尾，等待 js 引擎处理。

4）定时器触发线程:

浏览器定时计数器并不是由 js 引擎计数的，阻塞会导致计时不准确。
开启定时器触发线程来计时并触发计时，计时完成后会被添加到任务队列中，等待 js 引擎处理。

## 02 浏览器内核

* 支撑浏览器运行的最核心的程序

* 不同浏览器内核可能不一样

  * Chrome（webkit的分支内核Blink），Safari: webkit

  * firefox: Gecko

  * IE:Trident

  * 360,搜狗等国内浏览器：Trident + webkit

* 内核有很多模块组成：

  * js引擎模块：负责js程序的编译与运行
  * html、css文档解析模块：负责页面文本的解析
  * DOM/CSS模块：负责DOM/CSS在内存中的相关处理
  * 布局和渲染模块：负责页面的布局和效果的绘制（内存中的对象）
  * 。。。。
  * 以下是分线程
  * 定时器模块：负责定时器的管理
  * 事件响应模块：负责事件的管理
  * 网络请求模块：负责ajax请求

## 03 定时器引发的思考

### 1、定时器真的是定时执行的嘛？

定时器并不能保证真正定时执行

一般会延迟一丁点（可以接受），也有可能延迟很长时间（不能接受）

### 2、定时器回调函数是在分线程执行的嘛？

在主线程执行的，js是单线程的



## 04 JS是单线程的

### 1、如何证明js执行是单线程的？

* setTimeout()的回调函数是在主线程执行的
* 定时器回调函数只有在运行栈中的代码全部执行完毕之后才有可能执行

### 2、为什么js要用单线程模式，而不用多线程？

* js的单线程和它的用途有关
* 作为浏览器脚本语言，js的主要用途是与用户互动，以及操作DOM
* 这决定了它只能是单线程，否则会带来很复杂的同步问题

### 3、代码的分类：

* 初始化代码
* 回调代码 （异步执行）

### 4、js引擎执行代码的基本流程

* 先执行初始化代码：包含一些特别的代码
  * 设置定时器
  * 绑定事件监听
  * 发送ajax请求

* 后面在某个时刻才会执行回调代码

  

## 05 事件循环模型

![image-20220323130215072](https://s2.loli.net/2022/06/23/Z2V9FgyACmuMz53.png)

![image-20220323131807670](https://s2.loli.net/2022/06/23/c1FYLiGqUEvkp5l.png)



#### 单线程执行数据，多线程处理事件

JS中用来存储待执行回调函数的队列包含2个不同特定的列队 
宏列队:用来保存待执行的宏任务(回调),比如:定时器回调/DOM事件回调/ajax回调     
微列队:用来保存待执行的微任务(回调),比如:promise的回调/MutationObserver的回调
JS执行时会区别这2个队列
JS引擎首先必须先执行所有的初始化同步任务代码
每次准备取出第一个宏任务执行前,都要将所有的微任务一个一个取出来执行。当该宏任务执行完成，会检查其中的微任务队列，如果为空则直接执行下一个宏任务，如果不为空，则依次执行微任务，执行完成才去执行下一个宏任务。
引入微任务的初衷是为了解决异步回调的问题



#### macrotask（宏任务） 

在浏览器端，其可以理解为该任务执行完后，在下一个macrotask执行开始前，浏览器可以进行页面渲染。触发macrotask任务的操作包括：dom事件回调，ajax回调，定时器回调
script(整体代码)
setTimeout、setInterval、setImmediate
I/O、UI交互事件
postMessage、MessageChannel

#### microtask（微任务）

可以理解为在macrotask任务执行后，页面渲染前立即执行的任务。触发microtask任务的操作包括：
Promise回调：Promise.then
Mutation回调：MutationObserver
process.nextTick(Node环境)

#### event loop

![image-20220323133418951](https://s2.loli.net/2022/06/23/82QKrZ6o5hcRSbX.png)

![image-20220323133633643](https://s2.loli.net/2022/06/23/L3EuVTRBHOCoI7x.png)

## 06 相关重要概念

### 1、执行栈

execution stack

所有代码都是在此空间中执行的

### 2、浏览器内核

* browser core
* js引擎模块（在主线程处理）
* 其他模块（在主/分线程处理）
* 运行原理图

### 3、任务队列 task queue

### 4、消息队列 message queue

### 5、事件队列 event queue

### 6、事件轮询 event loop

从任务队列中循环取出回调函数放入执行栈中处理（一个接一个）

### 7、事件驱动模型 event-driven interaction model

### 8、请求响应模型 request-response model



## 07 H5 Web Workers

1. H5规范提供了js分线程的实现，取名为：Web Workers，

   我们可以将一些大计算量的代码交由web worker运行而不冻结用户界面，但是子线程完全受主线程控制，且不得操作DOM，所以这个新标准并没有改变JavaScript单线程的本质

2. 相关API

   * Worker: 构造函数，加载分线程执行的js文件
   * Worker.prototype.onmessage: 用于接收另一个线程的回调函数
   * Worker.prototype.postMessage: 象另一个线程发送消息

3. 不足

   * 慢

     Worker内代码不能操作DOM（更新UI）

   * 不能跨域加载JS

   * 不是每个浏览器都支持这个特性

   ![image-20220323164631070](https://s2.loli.net/2022/06/23/r3ClAtYmGdsy5jI.png)










