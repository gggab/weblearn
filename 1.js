function wait(value){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log(value)
            resolve(value)
        },1000)
    })
}
//方式一
wait('hello')
    .then(value => {
        return wait(value + 'lagou')
    })
    .then(value => {
        return wait(value + 'I love U')
    })
    .then(value => {
        console.log(value)
    })
//方式二
async function start(){
    let a = await wait('hello')
    let b = await wait('lagou')
    let c = await wait('I love U')
    console.log(a + b + c)
}
start()