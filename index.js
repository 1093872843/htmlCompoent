


class Person extends Array{
    constructor(){
        super();
        let a = new Array;
        a.__proto__.constructor=Person
        return a;
    }
}

let a = new Person(1,2,5,7,6);
console.log(a);











