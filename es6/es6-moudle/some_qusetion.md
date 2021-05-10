### 1.模块中的变量在多个的实例之间否共享?

* 经测试，无论是ES6模块还是commonJs模块，模块中的变量遵循值传递规则，对于基础类型，数据导出后为新的数值，无法共享，对于对象类型，更改内部变量会造成其他模实例也发生改变。
* ES6模块和commonJs模块是根据引用值创建单例模式，重复引用同一个位置的同一个文件，只会创建一个模块实例。

### 2.如何使得ES6和CommonJs混用？

一般来说，最好不要这么做，但实际上混用也很简单

* ES6模块中使用CommonJs文件:

因为import可以直接加载CommonJs模块，但是只能整体加载，因为CommonJs模块返回的是一个对象。无法被ES6模块静态解析

```javascript
// 正确
import packageMain from 'commonjs-package';

// 报错
import { method } from 'commonjs-package';
```

* CommonJs模块中使用ES6模块

需要注意的是CommonJs是同步模块，而ES6是异步模块，所以引入的时候要注意转换

```javascript
(async () => {
  await import('./my-app.mjs');
})();
```
