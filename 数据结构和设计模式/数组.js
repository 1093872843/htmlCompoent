/*
 * @Author: your name
 * @Date: 2021-05-08 17:54:31
 * @LastEditTime: 2021-05-08 18:34:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \html\数据结构和设计模式\数组.js
 */


//数组扁平化
let arrayFlatten = (function (value) {
    let value = [[1, "nihao", 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];

    function funcOne(value) {
        let result = value.toString();
        return result;
    }

    function funcTwo(value) {
        let result = value.flat(Infinity);
        return result;
    }

    function funcThree(value) {
        function flatten(arr) {
            while (arr.some(item => Array.isArray(item))) {
                arr = [].concat(...arr);
            }
            return arr;
        }
        let result = flatten(value);
        return result;
    }

    return {funcOne,funcTwo,funcThree}
})()


//







