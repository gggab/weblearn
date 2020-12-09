const PEDING = 'peding';//等待状态
const FULFILLED = 'fulfilled';//成功状态
const REJECTED = 'rejected';//失败状态
class MyPromise {
    constructor(executor) {
        try {
            //执行器立即执行
            executor(this.resolve, this.reject)
        } catch (e) {
            this.reject(e)
        }
    }
    //保存状态
    status = PEDING;
    //成功之后的值
    value = undefined;
    //失败的原因
    reason = undefined;
    //保存成功回调
    successCallback = [];
    //保存失败回调
    failCallback = [];

    resolve = value => {
        //不是等待状态，不执行
        if (this.status !== PEDING) return;
        //修改状态为成功
        this.status = FULFILLED;
        //保存成功的值
        this.value = value;
        //先判断成功回调是否存在
        // this.successCallback && this.successCallback(value);
        while (this.successCallback.length) this.successCallback.shift()();
    }
    reject = reason => {
        //不是等待状态，不执行
        if (this.status !== PEDING) return;
        //修改状态为失败
        this.status = REJECTED;
        //保存失败的原因
        this.reason = reason;
        //先判断失败回调是否存在
        // this.failCallback && this.failCallback(reason);
        while (this.failCallback.length) this.failCallback.shift()();
    }
    then(successCallback, failCallback) {
        successCallback = successCallback ? successCallback : value => value;
        failCallback = failCallback ? failCallback : reason => { throw reason; }
        let promise2 = new MyPromise((resolve, reject) => {
            //判断状态
            if (this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = successCallback(this.value)
                        //先判断x的值是普通值还是promise对象
                        //如果是普通值，直接调用resolve
                        //如果是promise对象 查看promise返回值
                        //再根据promise返回的结果决定是调用resolve还是reject
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            } else if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = failCallback(this.reason)
                        //先判断x的值是普通值还是promise对象
                        //如果是普通值，直接调用resolve
                        //如果是promise对象 查看promise返回值
                        //再根据promise返回的结果决定是调用resolve还是reject
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            } else {
                this.successCallback.push(()=>{
                    setTimeout(() => {
                        try {
                            let x = successCallback(this.value)
                            //先判断x的值是普通值还是promise对象
                            //如果是普通值，直接调用resolve
                            //如果是promise对象 查看promise返回值
                            //再根据promise返回的结果决定是调用resolve还是reject
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
                this.failCallback.push(()=>{
                    setTimeout(() => {
                        try {
                            let x = failCallback(this.reason)
                            //先判断x的值是普通值还是promise对象
                            //如果是普通值，直接调用resolve
                            //如果是promise对象 查看promise返回值
                            //再根据promise返回的结果决定是调用resolve还是reject
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
            }
        });
        return promise2;
    }
}
function resolvePromise(promise2, x, resolve, reject) {
    //不允许自己返回自己
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    if (x instanceof MyPromise) {
        //如果返回值也是promise对象
        x.then(resolve, reject)
    } else {
        //普通值
        resolve(x)
    }
}
module.exports = MyPromise;