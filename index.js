/*
 * @Author: your name
 * @Date: 2021-05-06 10:00:58
 * @LastEditTime: 2021-05-12 14:16:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \html\index.js
 */
let a = 0
let b = async () => {
//这里不理解为什么a输出是10，不应该是11吗？
  a =  await (a+  10)
  console.log('2', a) // -> '2' 10
}

b()
a++
console.log('1', a) // -> '1' 1

class a{


}

function _new(obj,...args){
    let ret = Object.create(obj.prototype);
    ret = obj.apply(ret,args);
    return ret;
}