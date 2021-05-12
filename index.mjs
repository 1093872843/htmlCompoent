/*
 * @Author: your name
 * @Date: 2021-05-06 10:00:58
 * @LastEditTime: 2021-05-12 18:54:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \html\index.js
 */

function test () {
    console.log('start')
     setTimeout(() => {
         console.log('children2')
         Promise.resolve().then(() => {console.log('children2-1')})
     }, 0)
     setTimeout(() => {
         console.log('children3')
         Promise.resolve().then(() => {console.log('children3-1')})
     }, 0)
     Promise.resolve(console.log('chi')).then(() => {console.log('children1')})
     console.log('end') 
 }
 
 test()





