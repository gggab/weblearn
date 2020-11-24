# 模块一：函数式编程与JS异步编程、手写Promise

## 简答题

### 一、谈谈你是如何理解JS异步编程的，EventLoop、消息队列都是做什么的，什么是宏任务，什么是微任务
js异步编程通过事件循环机制（EventLoop）和消息队列来实现。

JS引擎线程会维护一个执行栈，同步代码会依次加入到执行栈中依次执行并出栈。

JS引擎线程遇到异步函数，会将异步函数交给相应的Webapi，而继续执行后面的任务。

Webapi会在条件满足的时候，将异步对应的回调加入到消息队列中，等待执行。

执行栈为空时，JS引擎线程会去取消息队列中的回调函数（如果有的话），并加入到执行栈中执行。

完成后出栈，执行栈再次为空，重复上面的操作，这就是事件循环(event loop)机制。

macrotask：主代码块、setTimeout、setInterval等（事件队列中的每一个事件都是一个 macrotask，现在称之为宏任务队列）

microtask：Promise、process.nextTick等。

当执行栈中全部清空后会执行微任务，微任务队列清空后浏览器开始渲染，渲染完毕开始下一宏任务。

## 代码题

### 一、将下面异步代码使用Promise的方式改进

``` javascript
setTimeout(function () {
    var a = 'hello'
    setTimeout (function () {
        var b = 'lagou'
        setTimeout(function () {
            var c = 'I love U'
            console.log(a + b + c)
        }, 10)
    }, 10)
}, 10)
```
**实现代码见 1.js**

### 二、基于以下代码完成下面的四个练习

``` javascript
const fp = reuqire('lodash/fp')
//数据
// horsepower 马力，dollar_value 价格，in_stock 库存
const cars = [
    { name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true},
    { name: 'Spyker C12 Zagato', horsepower: 650, dollar_value: 648000, in_stock: false},
    { name: 'Jaguar XKR-S', horsepower: 550, dollar_value: 132000, in_stock: false},
    { name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false},
    { name: 'Aston Martin One-77', horsepower: 750, dollar_value: 1850000, in_stock: true},
    { name: 'Pagani Huayra', horsepower: 700, dollar_value: 1300000, in_stock: false}
]
```

#### 练习1：使用函数组合fp.flowRight()重新实现下面这个函数

``` javascript
let isLastInStock = function (cars) {
    // 获取最后一条数据
    let last_car = fp.last(cars)
    // 获取最后一条数据的in_stock 属性值
    return fp.prop('in_stock', last_car)
}
```

#### 练习2：使用fp.flowRight()、fp.prop()和fp.first()获取第一个car的name

#### 练习3：使用帮助函数_average重构averageDollarValue，使用函数组合的方式实现

``` javascript
let _average = function (xs) {
    return fp.reduce(fp.add, 0, xs)/xs.length
}//<-无须改动
let averageDollarValue = function (cars){
    let dollar_values = fp.map(function (car) {
        return car.dollar_value
    }, cars)
    return _average(dollar_values)
}
```

#### 练习4：使用flowRight写一个sanitizeNames()函数，返回一个下划线连接的小写字符串，把数组中的name转换为这种形式：例如：sanitizeNames(["Hello World"])=>["hello_world]

``` javascript
let _underscore = fp.replace(/\W+/g, '_')// <-- 无须改动，并在sanitizeNames中使用它
```

**实现代码见2.js**

### 三、基于下面提供的代码，完成后续的四个练习

``` javascript
// support.js
class Container{
    static of(value) {
        return new Container(value)
    }
    constructor(value) {
        this._value = value
    }
    map(fn) {
        return Container.or(fn(this._value))
    }
}
class Maybe {
    static of(x) {
        return new Maybe(x)
    }
    isNothing() {
        return this._value === null || this._value === undefined
    }
    constructor(x) {
        this._value = x
    }
    map(fn) {
        return this._isNothing()?this:Maybe.of(fn(this._value))
    }
}
module.exports = {Maybe, Container}
```

#### 练习1：使用fp.add(x,y)和fp.map(f,x)创建一个能让functor里的值增加的函数exl

``` javascript
//app.js
const fp = require('lodash/fp')
const {Maybe, Container} = require('./support')
let maybe = Maybe.of([5, 6, 1])
let exl= () => {
    // 你需要实现的函数
}
```

#### 练习2：实现一个函数ex2，能够使用fp.first获取列表的第一个元素

``` javascript
//app.js
const fp = reuqire('lodash/fp')
const {Maybe, Container} = require('./support/)
let xs = Constainer.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
let ex2 = () =>{
    //你需要实现的函数
}
```

#### 练习3：实现一个函数ex3，使用safeProp和fp.first找到user的名字的首字母

``` javascript
//app.js
const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')
let safeProp = fp.curry(function (x, o) {
    return Maybe.of(o[x])
})
let user = { id: 2, name: 'Albert' }
let ex3 = () => {
    //你需要实现的函数
}
```

#### 练习4：使用Maybe重写ex4,不要有if语句

``` javascript
//app.js
const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')
let ex4 = function (n) {
    if(n) {
        return parseInt(n)
    }
}
```

### 四、手写实现MyPromise源码
要求：尽可能还原Promise中的每一个API，并通过注释的方式描述思路和原理