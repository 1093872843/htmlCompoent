/*
 * @Author: your name
 * @Date: 2021-05-06 10:00:58
 * @LastEditTime: 2021-05-06 11:58:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \html\index.js
 */
const generateDir=require( "./plugin/generatedDirectory.js")

let navData = generateDir.generateData("./canvas");
console.log("k");
let nav = document.getElementById("nav");
let ul=document.createElement("ul");
navData.array.forEach(element => {
   let li = ul.createElement("li");
   li.nodeValue=element.name;
});

nav.appendChild(ul);