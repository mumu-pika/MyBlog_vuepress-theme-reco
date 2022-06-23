---
title: TypeScript用法
date: 2021-7-11
tags:
 - TypeScript
categories:
 - TypeScript
---


::: tip 摘要
记录TypeScript用法<br>
:::


<!-- more  正文部分 -->
### undefined 和 null

```ts
let u: undefined = undefined
let n: null = null
```

默认情况下，null和undefined是所有类型的子类型



### 数组类型

```ts
//数组定义方式1
let arr1: number[] = [10,20,30]

//泛型写法
let arr2: Array<number> = [100, 200]
```



### 元组类型

在定义数组的时候，类型和数据的个数一开始就已经限定了

```ts
let arr3: [string,number, boolean] = ['小甜甜',100,true]

console.log(arr3[1].toFixed(2)) toFixed是保留小数点后几位的
```



### 枚举

```ts
enum Color{
	red, green, blue
}

//定义一个Color的枚举类型的变量	
let color: Color = Color.red

//枚举类型可以手动编号
enum Color{
	red=1 , green, blue
}
console.log(Color[3]) //'blue'
```



### any

想要为哪些在编程阶段还不清楚类型的变量指定一个类型。

这些值可能来自于动态的内容，比如来自用户输入或第三方代码库

```tsx
let notsure: any = 4
notsure = 'maybe a string'
```



### void

某种程度上来说，void类型和any类型相反，它表示没有任何类型，当一个函数没有返回值，通常看见其返回值类型为void

```ts
//一般用来说明函数的返回值不能是undefined和null之外的值
function fn(): void{
	console.log('fn()')
    //return undefined
    //return null
    //return 1 //error
}
```



### object

表示非原始类型，除了number、string、boolean之外的类型

```ts
//这里
function fn2(obj:object):object{
	console.log('fn2(0)',obj)
	return {}
	//return undefined
	//return null
}
console.log(fn2(new String('abc')))
```



### 联合类型 （union types)

标识取值可以为多种类型中的一种

```ts
function toString2(x;String|number):string{
	return x.toString()
}
//这里这里传String,或者number类型给toString2
```



### 类型断言

通过类型断言可以告诉编译器，已经做了必须的检查，类型断言好比其他语言中的类型转换，但是不进行特殊的数据检查和解构

类型断言的语法方式1：<类型>变量名

类型断言的语法方式2 值 as 类型

```tsx
function getString(str:number|string):number{
	if((<string>str).length){
        //这里断言了str是String类型
 		//return (<string>str),length //写法一
        return (str as String).length //写法二
    }
    else{
    	//此时说明str是number类型
        return str.toString().length
    }
                    
}
```

### 类型推断

没有明确的指定类型的时候推测出一个类型

有两种情况：

1、定义变量时赋值了，推断为对应的类型

2、定义变量时没有赋值，推断为any类型

```ts
let txt1 = 100
console.log(txt1)  //类型推断为number

let txt2  //类型推断为any

```



### 接口

接口是对象的状态(属性)和行为(方法)的抽象

接口时一种类型，一种规范，一种规则，一个能力，一种约束

```ts
interface IPerson {
	//id是只读的,是number类型，相比较于const，const是修饰变量的，而readonly是修饰属性用
	readonly id: number
	name: string
	age:number
    //在属性名sex后面加上？表示这个属性是可有可无的
	sex?:string
}
```

### 

### 函数调用签名

为了使用接口表示函数类型，我们需要给接口定义一个调用签名

它就像是一个只有参数列表和返回值类型的函数定义，参数列表里的每个参数都需要名字和类型

```ts
//定义一个接口，用来作为某个函数的类型使用
interface ISearchFunc {
	//定义一个调用签名
	（source:string, subString:string）:boolean
    
}
//定义一个函数，该类型就是上面定义的接口
const searchString:ISearchFunc = function(source:string, subString:string):boolean{
    return source.search(subString) > -1
}

```



### 类类型

```tsx
//类类型 ：类的类型可以通过接口来实现
//定义一个接口
interface IFly{
	//该方法没有任何的实现(方法中什么都没有)
	fly()
}

interface ISwim{
	swim(){}
}

//定义一个类，这个类的类型就是上面定义的接口, 实际上也可以理解为IFly接口约束了当前的这个Person类
class Person implements IFly,ISwim{
	//实现接口中的方法
	fly(){
		console。log(”I can fly“)
	}
	swim(){
		console.log("I can swim")
	}
}

const person = new Person()
person.fly()
person.swim()

//总结：类可以通过接口的方式，来定义当前这个类的类型，
//类可以实现一个接口，类可以实现多个接口

//接口可以继承其他多个接口
imterface IMyFlyAndSwim extends IFly，ISwim{
    
}
//接口和接口之间叫继承（使用的是extends关键字），类和接口之间叫实现（implements）
```

### 继承

A类继承了B类，A类叫子类，B类叫基类

子类 （派生类）

基类 （超类、父类）



### 多态

父类型的引用指向了子类型的对象，不同类型的对象针对相同的方法，产生了不同的行为



### 存取器

getter和setter



### 静态属性

static修饰



### 抽象类

abstract

抽象类：包含抽象方法（抽象方法一般没有任何的具体内容的实现），也可以包含实例方法，抽象类是不能被实例化，为了让子类进行实例化及实现

```ts
//定义一个抽象类
abstract class Animal {
	//抽象方法
	abstract eat(){
		//不能有具体实现
	}
}
```

| **参数**           | **抽象类**                                                   | **接口**                                                     |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 默认的方法实现     | 它可以有默认的方法实现                                       | 接口完全是抽象的。它根本不存在方法的实现                     |
| 实现               | 子类使用**extends**关键字来继承抽象类。如果子类不是抽象类的话，它需要提供抽象类中所有声明的方法的实现。 | 子类使用关键字**implements**来实现接口。它需要提供接口中所有声明的方法的实现 |
| 构造器             | 抽象类可以有构造器                                           | 接口不能有构造器                                             |
| 与正常Java类的区别 | 除了你不能实例化抽象类之外，它和普通Java类没有任何区别       | 接口是完全不同的类型                                         |
| 访问修饰符         | 抽象方法可以有**public**、**protected**和**default**这些修饰符 | 接口方法默认修饰符是**public**。你不可以使用其它修饰符。     |
| main方法           | 抽象方法可以有main方法并且我们可以运行它                     | 接口没有main方法，因此我们不能运行它。（java8以后接口可以有default和static方法，所以可以运行main方法） |
| 多继承             | 抽象方法可以继承一个类和实现多个接口                         | 接口只可以继承一个或多个其它接口                             |
| 速度               | 它比接口速度要快                                             | 接口是稍微有点慢的，因为它需要时间去寻找在类中实现的方法。   |
| 添加新方法         | 如果你往抽象类中添加新的方法，你可以给它提供默认的实现。因此你不需要改变你现在的代码。 | 如果你往接口中添加方法，那么你必须改变实现该接口的类。       |

### 函数

```ts
//第一种写法：函数声明，命名函数
function add(x: string, y:string):string{
	return x + y
}

//第二种写法：函数表达式，匿名函数 (简写)
const add2 = function (x:number, y:number):number{
    return x + y
}

//第三种写法：匿名函数的完整写法
const add2: ((x:number, y:number)=>number = function(x:number, y:number):number{
    return x + y
}
```



### 可选参数与默认参数

可选参数：函数在声明的时候，内部的参数使用了？进行修饰，那么就表示该参数可以传入也可以不用传入，叫可选参数



### 剩余参数 rest参数

```tsx
//...args:string[] ---剩余的参数，放在了一个字符串的数组中，args里面
function showMSg(str: string, ...args:sting[]){
    console.log(str)  //a
    console.log(args)  //b,c,d,e
}
showMsg('a','b','c','d','e')

```

### 函数重载

函数名字相同，函数的参数及个数不同



### 泛型

在定义函数、接口、类的时候，不能预先确定要使用的数据类型，而是在使用时候确定

```ts
function getArr4<T>(value:T, count:number): T[]{
	//根据数据value和数量产生一个数组
	const arr: Array<T> 
	for (let i = 0; i < count ; i++){
		arr.push(value)
	}
	return arr
}


//多个泛型参数的函数：函数中有多个泛型的参数
function getMsg <K,V> (value1: K, value2:V):[K,V] {
    return [value1,value2]
}

//泛型接口
interface IBase<T>{
    data:Array<T>
    add:(t:T) => T
    getUserId:(id:number) =>   	T
}

//泛型类
class Generic<T>{
    //默认的属性的值的类型是泛型类型
    defaultValue: T
    add: (x:T, y:T) => T
}

//泛型约束
//如果我们直接对一个泛型参数取length属性，会报错，因为这个泛型根本不知道这个属性
//定义一个接口，用来约束将来的某个类型中必须要有length这个属性
interface ILength{
    //接口中有一个属性length
    length:number
}
function getLength<T extends ILength>(x:T):number{
    return x.length
}
```



### 声明文件

当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全，接口提示等功能，什么是声明语句

```tsx
//引入第三方的库jQuery
import jQuery from 'jquery'
//定义操作
//声明文件：把声明语句放到一个单独的文件（jQuery.d.ts）中，ts会自动解析到项目中所有声明文件
declare var jQuery:(selector:string) => any

//下载声明文件： npm install @types/jquery --save-dev
```



### 内置对象

```ts
//ECMAScript的内置对象
let b:Boolean = new Boolean(1)
..
Number
String
Date
RegExp
Error

//BOM和DOM的内置对象
Window
Document
HTMLElement
DocumentFragment
Event
NodeList

```
