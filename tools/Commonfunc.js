/*
 * @Author: your name
 * @Date: 2021-05-07 10:00:03
 * @LastEditTime: 2021-05-07 11:29:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \html\plugin\Commonfunc.js
 */
/**
 * @description: 节流,n秒内只会执行一次
 * @param {*} func
 * @param {*} intervalTime
 * @return {*}
 */
function throttle(func, intervalTime) {
    let timer = null
    return function () {
        if (!timer) {
            timer = setTimeout(() => {
                func(this, arguments);
                clearTimeout(timer);
                timer = null;
            }, intervalTime)
        }
    }
}


/**
 * @description: 防抖,n秒内只会执行一次，多次触发会刷新时间
 * @param {*} func
 * @param {*} intervalTime
 * @return {*}
 */
export function debounce(func, intervalTime) {
    let timer = null
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, arguments);
        }, intervalTime)
    }
}


/**
 * @description: 
 * @param {*} date
 * @param {*} format
 * @return {*}
 */
function formatDate(date, format) {

}



