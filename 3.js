// support.js
class Container {
    static of(value) {
        return new Container(value)
    }
    constructor(value) {
        this._value = value
    }
    map(fn) {
        return Container.of(fn(this._value))
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
        return this.isNothing() ? this : Maybe.of(fn(this._value))
    }
}
module.exports = { Maybe, Container }

//#region 练习1
//app.js
const fp = require('lodash/fp')
// const {Maybe, Container} = require('./support')
let maybe = Maybe.of([5, 6, 1])
let exl = (value) => {
    // 你需要实现的函数
    let r = maybe.map(x => fp.map(fp.add(value))(x))
    console.log(r)
}
exl(2);
//#endregion

//#region 练习2
let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
let ex2 = () => {
    //你需要实现的函数
    let r = xs.map(x => fp.first(x))
    console.log(r)
}
ex2()
//#endregion

//#region 练习3
let safeProp = fp.curry(function (x, o) {
    return Maybe.of(o[x])
})
let user = { id: 2, name: 'Albert' }
let ex3 = () => {
    //你需要实现的函数
    let r = safeProp('name')(user).map(x => fp.first(x))
    console.log(r)
}
ex3()
//#endregion

//#region 练习4
let ex4 = function (n) {
    let r = Maybe.of(n).map(x => parseInt(x))
    console.log(r)
}
ex4()
//#endregion