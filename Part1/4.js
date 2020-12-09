/**
 * 1. promise 就是一个类，
 */

const MyPromise = require('./myPromise');

let promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功')
    }, 2000);
    // throw new Error('ex')
    // reject('失败')
})
function other() {
    return new MyPromise((resolve, reject) => {
        resolve('other')
    })
}
promise.then().then().then(value => {
    console.log(value)
},reason=>{
    console.log(reason.message)
})
