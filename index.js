/*
 * @Author: your name
 * @Date: 2021-05-06 10:00:58
 * @LastEditTime: 2021-05-10 17:33:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \html\index.js
//  */

//可以修改为


let person =function() {
  this.name="wang";
}
person.prototype.age=18;
let s = Symbol("a")
person.prototype[s]=77;
let a = new person();
console.log(person.prototype);
let b={
  [s]:777
}
console.log(Object.getOwnPropertyNames(person.prototype));