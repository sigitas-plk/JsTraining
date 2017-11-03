"use strict";

//No side effects
function foobar(x, y) {
    var z;
    foo();
    return [y, z];

    function foo() {
        y++;
        z = x * y;
    }
}

//console.log(foobar(20,5));

//functional closure
function foo(x, y) {
    return function bar() {
        return x + y;
    }
}

var x = foo(3, 4);
// console.log(x());
// console.log(x());


//recursion
function multiply() {
    var args = [].slice.apply(arguments);
    //preventive
    if (args.length < 2) {
        return args[0];
    }
    //baseCase
    if (args.length === 2) {
        return args[0] * args[1];
    }
    //recursion
    return args[0] * multiply.apply(this, args.slice(1));
}

//console.log(multiply(2,3,2,5,6));


// ex -4

function foo(a) {
    return function () {
        return a;
    }
}

function add(a, b) {
    return a + b;
}

function add2(fn1, fn2) {
    return add(fn1(), fn2());
}

//add2(foo(10), foo(32)); //42
//forLoop
function addn(arr) {
    var total = 0;
    for (var i = 0; i < arr.length; i++) {
        total = add2(foo(total), foo(arr[i]));
    }
    return total;
}

//recursions
function addnrecur(arr) {
    //base case
    if (arr.length == 2) {
        return add2(foo(arr[0]), foo(arr[1]));
    }
    return add2(foo(arr[0]), foo(addnrecur(arr.slice(1))));
}
function addnrecur2(arr) {
    if (arr.length == 2) {
        return add2(foo(arr[0]), foo(arr[1]));
    }
    return addnrecur2([add2(foo(arr[0]), foo(arr[1]))].concat(arr.slice(2)))
}

//with inbuilt (reduce) function
function addninbuilt(arr) {
    return arr.reduce(function (accumulator, current) {
        return add2(foo(accumulator), foo(current));
    }, 0);
}

function addninbuiltmap(arr) {
    var total = 0;
    arr.map(function (el) {
        total = add2(foo(el), foo(total));
    });
    return total;
}

function addninbuiltfuncs (arr){
    return arr.slice(1)
        .reduce(function(prev,cur){
            return function(){
                return add2(prev, cur);
            };
        },arr[0])();
}

console.log(addn([1, 1, 3, 3]));
console.log(addnrecur([1, 1, 3, 3]));
console.log(addnrecur2([1, 1, 3, 3]));
console.log(addninbuilt([1, 1, 3, 3]));
console.log(addninbuiltmap([1, 1, 2, 2]));
console.log(addninbuiltfuncs([foo(1), foo(1), foo(2), foo(2)]));