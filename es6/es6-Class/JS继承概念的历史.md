# 传统的继承方式

虽然ES6出来了Class取代了传统的继承模式，但是就目前来看，ES6的类仅仅是封装了ES5的构造函数加原型继承的语法糖。

我们看看之前如何继承。

这里假设我们需要一个方法，能够让我们产出我们指定属性内容的对象，仅仅是值得不同，我们会怎么做? 如下

## 如何创建一个制造对象的函数。

```javascript
function createPerson(name,age){
  let o = new Object();
  o.name = name;
  o.age = age
  o.getName = function (){
    return this.name;
  }
  return o;
}

let p = createPerson("wang",18)
console.log(p);//{ name: 'wang', age: 18, getName: [Function] }
```

这种方式的确可以解决创建了多个类似对象的问题，但是有个缺陷，返回的对象都是Object，这样我们就不能通过实例明确知道这个对象具体是一个什么类型的抽象。

### 构造函数模式

`构造函数模式`：ES中用来创建指定类型对象的方式。

`构造函数`：ES中凡是通过new 使用的函数，都能够被称作构造函数，否则是普通函数。

`构造器（constructor）`：由构造函数创建的每个实例都有一个constructor属性指向它的**创建函数**。下面的例子是Person。

每个创建的实例都是新建的，完全独立的，即a.getName!=b.getName;

~~~javascript
//上述内容可以修改为下
/*
相比之前的代码，你可能会产生少许疑惑
this: js的this指代当前作用域，并且是随着上下文范围改变的。当我们使用new 时，构造模式会返回一个
      实例对象,这时this的指向其实是这个实例对象本身.
new Object():在构造函数模式下，new 操作的创建了一个对象，所以我们就不需要显示创建了。new操作也会执行构造、函数内部的操  
             作，比如给新对象添加属性。如果函数内部没有任何代码，则返回空对象。


*/
function Person(name,age){
    this.name=name;
    this.age=age;
    this.getName=function (){
      return this.name
    }
}

let p = new Person("wang",18);
console.log(p);//Person { name: 'wang', age: 18, getName: [Function] }
console.log(p.constructor); //[Function: Person]
console.log(Person==p.constructor); //true
console.log(p instanceof Person); //true
console.log(p instanceof Object); //true

~~~

## 原型模式

`原型（prototype）`：每个**函数**都会创建一个prototype属性，这个属性是一个对象，即我们常说的原型。原型的特性在于，内部的所有属性和方法可以被实例共享,所以我们原本应当写在函数中的内容，也可以通过操作这个对象（原型）来实现。

~~~javascript
let person =function() {
  this.name="wang";
}

let a = new person();
console.log(a)  //person { name: 'wang' }
console.log(person.prototype);// person {}
~~~

原型内部也有一个`constructor`属性，指回与之关联的构造函数。

!!!!!!!!!!!!!!!!!!注意：!!!!!!!!!!!!!!!!

而通过原型新增的属性数据是共享的，是共享的，共享的，一个实例修改会影响其他实例。

---

我们之前说过，通过构造函数创建的实例是完全独立的，这就意味着每一次创建都会重新定义一边函数中的所有内容。这对于内部属性来说自然没什么问题。但是对于构造函数中的函数来说，就显得没那么必要了，反而会有点消耗性能。

那么我们只需要将函数定义使用原型模式创建即可。

`__proto__`: prototype是函数上指向原型的关键字，而__proto__是对象指向原型的关键字。即`p.__proto__ == Person.prototype`；实际上ES并没有这个__proto__的标准，但是FireFox,Safari和Chrome都暴露了这个属性,如果没有，则可以通过Object.getPrototyOf()获取原型。每次自定义构造函数并且创建实例时，实例内部的__proto__的属性被赋值为构造函数的prototype。

```javascript
function Person(name){
  this.name = name;
  this.getName=function (){
     return this.name;
  }
}
//可以修改为
function Person(){} //let Person = function(){}; 也成立
Person.prototype.name = "wang";
Person.prototype.getName = function (){
     return this.name;
  }

let p = new Person();
console.log(p);//{}
console.log(p.name);//wang
console.log(p.getName());//wang


//但这么写有点麻烦，还要一行一行的改，我们可以这样
function Person(){} 
Person.prototype = {
  name:"wang",
  getName:function (){
    return this.name;
  },
  //constructor:Person
}
/*但是这种写法会覆盖构造函数默认创建的Person.prototype，这会导致默认Person.prototype中的constructor的指向消失。
当然我们可以手动加上,不过constructor在枚举中属于不可枚举，而这个操作会导致它变为可枚举。
如果我们通过ES6兼容的浏览器，那可以加上以下代码解决这个问题*/
Object.defineProperty(Person.prototype,"constructor",{
  enumerable:false,
  value:Person
})


//原型链关系
console.log(Person.prototype);//Person { name: 'wang', getName: [Function] }
console.log(Person.prototype == p.__proto__);//true
console.log(Person.prototype.__proto__ == Object.prototype);//true
console.log(Person.prototype.__proto__);//{}
console.log(Person.prototype.__proto__ == p.__proto__.__proto__);//ture
//这样一层一层向上查找原型其实就是我们所说的原型链。
//instanceOf 实际上就是检查原型链中是否存在指定构造函数的原型。

```

`__proto__`: prototype是函数上指向原型的关键字，而__proto__是对象指向原型的关键字。

即`p.__proto__ == Person.prototype`；实际上ES并没有这个__proto__的标准，但是FireFox,Safari和Chrome都暴露了这个属性,如果没有，则可以通过Object.getPrototyOf()获取原型。每次自定义构造函数并且创建实例时，实例内部的__proto__的属性被赋值为构造函数的prototype。

~~~javascript
function Person(name){
  this.name = name;
  this.getName=function (){
     return this.name;
  }
}
let p = new Person();

//原型链关系
console.log(Person.prototype);//Person { name: 'wang', getName: [Function] }
console.log(Person.prototype == p.__proto__);//true
console.log(Person.prototype.__proto__ == Object.prototype);//true
console.log(Person.prototype.__proto__);//{}
console.log(Person.prototype.__proto__ == p.__proto__.__proto__);//ture
//这样一层一层向上查找原型其实就是我们所说的原型链。
//instanceOf 实际上就是检查原型链中是否存在指定构造函数原型。
~~~

## 继承

所谓继承，本质上时修改__proto__的指向，但是直接修改__proto__的影响是非常微妙和深远的，将会改变所有和__proto__有关的代码。所以我们可以使用Object.create(\__proto\_\_),这将会创建一个新的对象同时为它指定一个原型。

~~~javascript
const person = {
  isHuman: false,
  printIntroduction: function() {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  }
};

const me = Object.create(person);

me.name = 'Matthew'; // "name" is a property set on "me", but not on "person"
me.isHuman = true; // inherited properties can be overwritten

me.printIntroduction();//My name is Matthew. Am I human? true
~~~

`原型层级：`在通过对象访问属性时，访问会开始于对象实例本身，如果这个实例上存在给定属性，则返回对应的值，如果不存在，则在原型对象上查找值。这也是原型用于在多个实例间共享属性和方法的原理。

当实例和原型存在同名属性时，根据上述的访问规律，实例中的属性`遮蔽`原型中的属性，只返回示例中的属性。不过可以通过`delete`操作符可以删除实例上的属性。`hasOwnProperty()`会确定某个属性是来自实例，还是来自原型。

# ES6新增Class
