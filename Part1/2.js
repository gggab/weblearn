const fp = require('lodash/fp')
//数据
// horsepower 马力，dollar_value 价格，in_stock 库存
const cars = [
    { name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true },
    { name: 'Spyker C12 Zagato', horsepower: 650, dollar_value: 648000, in_stock: false },
    { name: 'Jaguar XKR-S', horsepower: 550, dollar_value: 132000, in_stock: false },
    { name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false },
    { name: 'Aston Martin One-77', horsepower: 750, dollar_value: 1850000, in_stock: true },
    { name: 'Pagani Huayra', horsepower: 700, dollar_value: 1300000, in_stock: false }
]

//#region 练习1
let isLastInStock = fp.flowRight(fp.prop('in_stock'), fp.last)
console.log('练习1：' + isLastInStock(cars))
//#endregion

//#region 练习2
const getCarName = function (value) {
    return fp.prop('name', value)
}
console.log('练习2：' + fp.flowRight(fp.prop('name'), fp.first)(cars))
//#endregion

//#region 练习3
let _average = function (xs) {
    return fp.reduce(fp.add, 0, xs) / xs.length
}
// let averageDollarValue = function (cars){
//     let dollar_values = fp.map(function (car) {
//         return car.dollar_value
//     }, cars)
//     return _average(dollar_values)
// }

let averageDollarValue = fp.flowRight(_average, fp.map(car => car.dollar_value))
console.log('练习3：' + averageDollarValue(cars))
//#endregion

//#region 练习4
let _underscore = fp.replace(/\W+/g, '_')
const convert = fp.flowRight(fp.toLower, _underscore, fp.prop('name'))
const sanitizeNames = fp.map(car => convert(car))
console.log(sanitizeNames(cars))
//#endregion