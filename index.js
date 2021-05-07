/*
 * @Author: your name
 * @Date: 2021-05-06 10:00:58
 * @LastEditTime: 2021-05-07 12:45:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \html\index.js
 */

function sayHi() {
   console.log("sayHi");
}
sayHi = debounce(sayHi, 1000)
console.log("脚本");
