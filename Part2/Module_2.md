# 一

``` javascript
var a = [];
for(let i = 0; i<10; i++) {
    a[i] = function() {
        console.log(i)
    }
}
a[6]()
```

运行结果为：10

原因：i是使用var声明，循环体中的i是全局作用域中的i，当循环结束时，全局作用域中的i变成了10，所以结果为10。

# 二、

``` javascript
var tmp = 123;
if(true) {
    console.log(tmp)
    let tmp
}
```

运行结果：报错

原因：if语句花括号中的语句在块级作用域中，块级作用域中使用let定义了tmp，let不允许变量提升，必须先声明在使用。

# 三、结合ES6新语法，用最简单的方式找出数组中的最小值

```javascript
var arr = [12, 34, 32, 89, 4]

```

# 四、

1. var与let可以声明变量，const不能声明变量，只能声明只读的常量。
2. var声明的变量不存在块级作用域，在全局内有效。let与const的声明只在其所在的代码块中有效。
3. let/const不能在同一个作用域中声明相同变量/常量，var可以多次重复声明。
4. var存在变量提升，可以先使用在声明，let/const必须先声明在使用。
5. let/const会出现暂时性死区。
6. const声明时必须初始化赋值，一旦声明其赋值的值不允许被改变。

# 五、

```javascript
var a = 10;
var obj = {
    a: 20,
    fn() {
        setTimeout(() =>{
            console.log(this.a)
        })
    }
}
obj.fn()
```

运行结果：20

原因：setTimeout中传入的是一个箭头函数，this指向obj。

# 六、

```javascript

```