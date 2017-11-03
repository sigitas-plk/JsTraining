'use strict';

//===========================================================================================================//
// Given an array arr, find element pairs whose sum equal the second argument arg and return the sum of their indices.
// If multiple pairs are possible that have the same numeric elements but different indices, return the smallest sum of
// indices. Once an element has been used, it cannot be reused to pair with another. For example:
// pairwise([7, 9, 11, 13, 15], 20) returns 6. The pairs that sum to 20 are [7, 13] and [9, 11].
// We can then write out the array with their indices and values.
// Index	0	1	2	3	4
// Value	7	9	11	13	15
// Below we'll take their corresponding indices and add them.
// 7 + 13 = 20 → Indices 0 + 3 = 3
// 9 + 11 = 20 → Indices 1 + 2 = 3
// 3 + 3 = 6 → Return 6

function pairwise(arr, arg) {

    if (arr.length < 2 || typeof arr === 'undefined') {
        return 0;
    }

    var usedIndices = [];

    /**
     * Recursive function to collect used indices to sum values to be equal to provided argument
     * @param ind starting index
     * @param arr array to iterate over
     * @param arg number to match
     * @returns {Array}
     */
    function getPairs(ind, arr, arg) {
        /**
         * Checks if provided number is part of usedIndices array
         * @param i
         * @returns {boolean}
         */
        function isUsedIndex(i) {
            return !!usedIndices.filter(function (element) {
                return element === i;
            }).length;
        }

        for (var i = ind + 1; i < arr.length; i++) {
            if (arr[ind] + arr[i] === arg && !isUsedIndex(i) && !isUsedIndex(ind)) {
                usedIndices.push(ind, i);
            }
        }

        //stop recursion if this was 2nd last index
        if (ind === (arr.length - 2)) {
            return usedIndices;
        }
        // continue
        return getPairs(++ind, arr, arg);
    }

    return getPairs(0, arr, arg).reduce(function (sum, value) {
        return sum + value;
    }, 0);
}

console.log(pairwise([1, 4, 2, 3, 0, 5], 7));
console.log(pairwise([], 100));


//===========================================================================================================//
// Return a new array that transforms the element's average altitude into their orbital periods.
// The array will contain objects in the format {name: 'name', avgAlt: avgAlt}.
// The values should be rounded to the nearest whole number. The body being orbited is Earth.
// The radius of the earth is 6367.4447 kilometers, and the GM value of earth is 398600.4418 km3s-2.
function orbitalPeriod(arr) {
    var GM = 398600.4418,
        earthRadius = 6367.4447,
        orbitalPeriodArr = [];

    function getOrbitalPeriod(alt, radius) {
        return Math.round(2 * Math.PI * Math.sqrt(Math.pow((alt + radius), 3) / GM));
    }

    arr.forEach(function (item) {
        orbitalPeriodArr.push({name: item.name, orbitalPeriod: getOrbitalPeriod(item.avgAlt, earthRadius)});
    });

    return orbitalPeriodArr;
}

//console.log(orbitalPeriod([{name: "sputnik", avgAlt: 35873.5553}]));
//console.log(orbitalPeriod([{name: "iss", avgAlt: 413.6}, {name: "hubble", avgAlt: 556.7}, {name: "moon", avgAlt: 378632.553}]));

//===========================================================================================================//
// Fill in the object constructor with the following methods below:
// getFirstName()
// getLastName()
// getFullName()
// setFirstName(first)
// setLastName(last)
// setFullName(firstAndLast)
// Run the tests to see the expected output for each method.
// The methods that take an argument must accept only one argument and it has to be a string.
// These methods must be the only available means of interacting with the object.

var Person = function (firstAndLast) {
    var nameArr = firstAndLast.split(' '),
        _firstName = nameArr[0],
        _lastName = nameArr[1];

    /**
     * Checks if it is only 1 argument provided and if that argument is a string
     * @param str string
     * @returns {boolean} valid / invalid arguments
     */
    function isCorrectArgument(str) {
        return arguments[0].length === 1 && typeof str[0] === 'string';
    }

    this.getFullName = function () {
        return _firstName + ' ' + _lastName;
    };
    this.getFirstName = function () {
        return _firstName;
    };
    this.getLastName = function () {
        return _lastName;
    };
    this.setFirstName = function (first) {
        if (isCorrectArgument(arguments)) {
            _firstName = first;
        }
    };
    this.setLastName = function (last) {
        if (isCorrectArgument(arguments)) {
            _lastName = last;
        }
    };
    this.setFullName = function (firstAndLast) {
        if (isCorrectArgument(arguments)) {
            nameArr = firstAndLast.split(' ');
            _firstName = nameArr[0];
            _lastName = nameArr[1];
        }
    };
    return firstAndLast;
};

// var bob = new Person('Bob Ross');
// console.log(bob.getFullName());
// console.log(bob.getFirstName());
// console.log(bob.getLastName());
// bob.setLastName('Smith');
// bob.setFirstName('Mark');
// bob.setFirstName('Simon', 'Greg');
// bob.setLastName(null);
// console.log(bob.getFullName());
// bob.setFullName('Urba Mazel');
// console.log(bob.getFullName());


//===========================================================================================================//
//Return the number of total permutations of the provided string that don't have repeated consecutive letters.
// Assume that all characters in the provided string are each unique. For example, aab should return 2 because
// it has 6 total permutations (aab, aab, aba, aba, baa, baa), but only 2 of them (aba and aba) don't have
// the same letter (in this case a) repeating.


function permAlone(str) {
    if (str === '' || !str) {
        return;
    }
    var letters = str.split(''),
        words, uniqueWords,
        regex = /(.)(?=\1)/;

    /**
     * Produce array with all permutations (Heap's method) https://stackoverflow.com/questions/9960908/permutations-in-javascript#20871714
     * @param letters symbols to permute
     * @returns [[]] 2d array with all the permutations
     */
    function permute(letters) {
        var length = letters.length,
            result = [letters.slice()],
            k, p, i = 1,
            c = new Array(length).fill(0);

        while (i < length) {
            if (c[i] < i) {
                k = i % 2 && c[i];
                p = letters[i];
                letters[i] = letters[k];
                letters[k] = p;
                ++c[i];
                i = 1;
                result.push(letters.slice());
            } else {
                c[i] = 0;
                i++;
            }
        }
        return result;
    }

    words = permute(letters);
    for (var i = 0; i < words.length; i++) {
        words[i] = words[i].join('');
    }
    uniqueWords = words.filter(function (word) {
        return !regex.exec(word);
    });

    return uniqueWords.length;
}

// console.log(permAlone('aab'));
// console.log(permAlone('aaa'));
// console.log(permAlone('a'));


//===========================================================================================================//
// Compare and update the inventory stored in a 2D array against a second 2D array of a fresh delivery.
// Update the current existing inventory item quantities (in arr1). If an item cannot be found, add the new item
// and quantity into the inventory array. The returned inventory array should be in alphabetical order by item.

function updateInventory(arr1, arr2) {
    var value = 0,
        name = 1;

    /**
     * Returns index of a string in a subArray
     * @param str string to search for
     * @param arr array to search in
     * @returns {*} index of the found element or -1 if not found
     */
    function itemIndex(str, arr) {
        return arr.findIndex(function (el) {
            return el[name] === str;
        });
    }

    /**
     * Sums value if same name elements are found
     */
    function addExisting() {
        arr1.forEach(function (el) {
            var index = itemIndex(el[name], arr2);
            if (index >= 0) {
                el[value] += arr2[index][value];
            }
        });
    }

    /**
     * Adds nonexisting all nonexisting elements to first array
     */
    function addNonExisting() {
        arr2.forEach(function (el) {
            var index = itemIndex(el[name], arr1);
            if (index < 0) {
                arr1.push(el);
            }
        });
    }

    /**
     * Sorts array based on name element
     */
    function sortByAlphabet() {
        arr1.sort(function (a, b) {
            var nameA = a[name].toUpperCase(),
                nameB = b[name].toUpperCase();
            switch (nameA > nameB) {
                case true:
                    return 1;
                case false:
                    return -1;
                default:
                    return 0;
            }
        });
    }

    addExisting();
    addNonExisting();
    sortByAlphabet();
    return arr1;
}

//console.log(updateInventory([[21, "Bowling Ball"], [2, "Dirty Sock"], [1, "Hair Pin"], [5, "Microphone"]], [[2, "Hair Pin"], [3, "Half-Eaten Apple"], [67, "Bowling Ball"], [7, "Toothpaste"]]));
//console.log(updateInventory([[0, "Bowling Ball"], [0, "Dirty Sock"], [0, "Hair Pin"], [0, "Microphone"]], [[1, "Hair Pin"], [1, "Half-Eaten Apple"], [1, "Bowling Ball"], [1, "Toothpaste"]]));
//console.log(updateInventory([[21, "Bowling Ball"], [2, "Dirty Sock"], [1, "Hair Pin"], [5, "Microphone"]], []));

//===========================================================================================================//
// Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price),
// payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.
// Cid is a 2D array listing available currency.
// Return the string "Insufficient Funds" if cash-in-drawer is less than the change due. Return the string "Closed" if
// cash-in-drawer is equal to the change due.
// Otherwise, return change in coin and bills, sorted in highest to lowest order.

function checkCashRegister(price, cash, cid) {
    const divisions = [["PENNY", 0.01], ["NICKEL", 0.05], ["DIME", 0.10], ["QUARTER", 0.25], ["ONE", 1.00], ["FIVE", 5.00], ["TEN", 10.00], ["TWENTY", 20.00], ["ONE HUNDRED", 100.00]].reverse();
    const cashInDrawer = cid.reverse();
    var change = cash - price;

    /**
     * Returns exact change in USD
     * @param change to return
     * @param cid cash in a drawer
     * @param cidVal divisions array, translating string names to what amount each currency is worth
     * @returns array with change sorted from highest to lowest. If all cash in a drawer used returns string "Closed", if insufficient funds returns string "Insufficient Funds".
     */
    function getChange(change, cid, cidVal) {
        var changeArr = [];
        var name = 0;
        var value = 1;

        function isDivisible(num, div) {
            return num % div !== num;
        }

        /**
         * Looks ups first index of highest possible division which is also available in cash in a drawer
         * @param num which needs to be looked up
         * @returns index of first divisible or null if non exists.
         */
        function firstDivisibleIndex(num) {
            for (var i = 0; i < cidVal.length; i++) {
                if (isDivisible(num, cidVal[i][value]) && isEnoughInCid(i)) {
                    return i;
                }
            }
            return null;
        }

        /**
         * Subtracts from value division of the currency. Takes 2 numbers past 0 as precision point.
         * @param from number to be subtracted from
         * @param index index of divisions currency array
         * @returns {number} the value in 0.00 form
         */
        function subtract(from, index) {
            return Number((from - cidVal[index][value]).toFixed(2));
        }

        /**
         * Checks if enough cash exists in cash in a drawer
         * @param index index of cash in a drawer
         * @returns {boolean}
         */
        function isEnoughInCid(index) {
            return cid[index][value] - cidVal[index][value] >= 0;
        }

        /**
         * Checks if cash in a drawer values are all 0 (which means no cash in a drawers is left)
         * @returns {boolean}
         */
        function isCidEmpty() {
            var empty = true;
            cid.forEach(function (el) {
                if (el[1] !== 0) {
                    empty = false;
                }
            });
            return empty;
        }

        /**
         * Subtracts money from cash in a drawer
         * @param index of divisions / cash in a drawer
         */
        function subtractFromCid(index) {
            cid[index][value] = subtract(cid[index][value], index);
        }

        /**
         * Adds change to change array. If no value exists adds subArray with value. if subArray exists adds value to existing element.
         * @param index index of divisions
         */
        function addToChangeArr(index) {
            var tempArr = cidVal[index].slice();

            if (changeArr.length === 0) {
                changeArr.push(tempArr);
            } else {
                var changeIndex = changeArr.findIndex(function (el) {
                    return el[name] === tempArr[name];
                });
                if (changeIndex >= 0) {
                    changeArr[changeIndex][value] += tempArr[value];
                } else {
                    changeArr.push(tempArr);
                }
            }
        }

        var index = firstDivisibleIndex(change),
            insufficientString = 'Insufficient Funds',
            closedString = 'Closed',
            currentChange;
        if (index === null) {
            return insufficientString;
        }

        while (change >= 0) {
            currentChange = subtract(change, index);
            if (currentChange >= 0) {
                if (!isEnoughInCid(index)) {
                    index = firstDivisibleIndex(change);
                    console.log(index);
                    if (index === null) {
                        return insufficientString;
                    }
                    continue;
                }
                subtractFromCid(index);
                addToChangeArr(index);
                if (currentChange === 0) {
                    if (isCidEmpty()) {
                        return closedString;
                    }
                    return changeArr;
                }
                change = currentChange;
            } else {
                var div = firstDivisibleIndex(change);
                if (div) {
                    index = div;
                } else {
                    return insufficientString;
                }
            }
        }
    }

    return getChange(change, cashInDrawer, divisions);
}

//console.log(checkCashRegister(10, 110.00, [["PENNY", 0.05], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 0.00], ["ONE HUNDRED", 100.00]]));
//console.log(checkCashRegister(10, 50.00, [["PENNY", 0.00], ["NICKEL", 0.00], ["DIME", 0.00], ["QUARTER", 0.00], ["ONE", 0.00], ["FIVE", 0.00], ["TEN", 0.00], ["TWENTY", 0.00], ["ONE HUNDRED", 0.00]]));
//console.log(checkCashRegister(1, 1.01, [["PENNY", 0.01], ["NICKEL", 0.00], ["DIME", 0.00], ["QUARTER", 0.00], ["ONE", 0.00], ["FIVE", 0.00], ["TEN", 0.00], ["TWENTY", 0.00], ["ONE HUNDRED", 0.00]]));
//console.log(checkCashRegister( 1, 16.00, [["PENNY", 0.01], ["NICKEL", 0.00], ["DIME", 0.00], ["QUARTER", 0.00], ["ONE", 15.00], ["FIVE", 0.00], ["TEN", 0.00], ["TWENTY", 0.00], ["ONE HUNDRED", 0.00]]));
//console.log(checkCashRegister(19.50, 20.00, [["PENNY", 0.50], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0.75], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));

//===========================================================================================================//
// Create a function that takes two or more arrays and returns an array of the symmetric difference (△ or ⊕) of the provided arrays.
// Given two sets (for example set A = {1, 2, 3} and set B = {2, 3, 4}), the mathematical term "symmetric difference" of two sets
// is the set of elements which are in either of the two sets, but not in both (A △ B = C = {1, 4}). For every additional symmetric
// difference you take (say on a set D = {2, 3}), you should get the set with elements which are in either of the two the sets but not
// both (C △ D = {1, 4} △ {2, 3} = {1, 2, 3, 4}).

function sym(args) {
    var arr = Array.apply(null, arguments);

    /**
     * Finds symetric difference for 2 provided arrays
     * @param arr1
     * @param arr2
     * @returns {Array} with elemnts from both arrays which are present only in one of the given arrays
     */
    function symetricDiff(arr1, arr2) {
        var combined = onlyUnique(arr1).concat(onlyUnique(arr2));
        var symDiff = [];
        //Filter out unique elements
        for (var i = 0; i < combined.length; i++) {
            var itemIndex = symDiff.indexOf(combined[i]);
            if (itemIndex < 0) {
                symDiff.push(combined[i]);
            } else {
                symDiff.splice(itemIndex, 1);
            }
        }
        return symDiff;
    }

    /**
     * Filters out duplicate values in array
     * @param arr
     * @returns {Array}
     */
    function onlyUnique(arr) {
        return arr.filter(function (value, index, ar) {
            return arr.lastIndexOf(value) === index;
        });
    }

    return arr.reduce(function (arr1, arr2) {
        return symetricDiff(arr1, arr2);
    }, []);
}

//console.log(sym([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5]));


//===========================================================================================================//
// You are given a JSON object representing a part of your musical album collection. Each album has several properties
// and a unique id number as its key. Not all albums have complete information.
// Write a function which takes an album's id (like 2548), a property prop (like "artist" or "tracks"), and a
// value (like "Addicted to Love") to modify the data in this collection.
// If prop isn't "tracks" and value isn't empty (""), update or set the value for that record album's property.
// Your function must always return the entire collection object.
// There are several rules for handling incomplete data:
// If prop is "tracks" but the album doesn't have a "tracks" property, create an empty array before adding the
// new value to the album's corresponding property.
// If prop is "tracks" and value isn't empty (""), push the value onto the end of the album's existing tracks array.
// If value is empty (""), delete the given prop property from the album.

function updateRecords(id, prop, value) {
    // Setup
    var collection = {
        "2548": {
            "album": "Slippery When Wet",
            "artist": "Bon Jovi",
            "tracks": [
                "Let It Rock",
                "You Give Love a Bad Name"
            ]
        },
        "2468": {
            "album": "1999",
            "artist": "Prince",
            "tracks": [
                "1999",
                "Little Red Corvette"
            ]
        },
        "1245": {
            "artist": "Robert Palmer",
            "tracks": []
        },
        "5439": {
            "album": "ABBA Gold"
        }
    };
// Keep a copy of the collection for tests
    var collectionCopy = JSON.parse(JSON.stringify(collection));

    var collection = collectionCopy;

    for (var key in collection) {
        if (Number(key) === id) {
            if (value !== '') {
                if (prop !== 'tracks' && value !== '') {
                    collection[key][prop] = value;
                }
                if (prop === 'tracks') {
                    if (!collection[key].tracks) {
                        collection[key].tracks = [];
                    }
                    collection[key].tracks.push(value);
                }
            } else {
                delete collection[key][prop];
            }
        }
    }
    return collection;
}

//console.log(updateRecords(5439, "artist", "ABBA"));


//===========================================================================================================//
// Return true if the passed string is a valid US phone number.
// The user may fill out the form field any way they choose as long as it is a valid US number.
// The following are examples of valid formats for US numbers (refer to the tests below for other variants):
// 555-555-5555
// (555)555-5555
// (555) 555-5555
// 555 555 5555
// 5555555555
// 1 555 555 5555
// For this challenge you will be presented with a string such as 800-692-7753 or 8oo-six427676;laskdjf.
// Your job is to validate or reject the US phone number based on any combination of the formats provided above.
// The area code is required. If the country code is provided, you must confirm that the country code is 1.
// Return true if the string is a valid US phone number; otherwise return false.

function telephoneCheck(str) {
    var valid = false;
    var regEx = /(.?\d{1}\s?)?([(]?\d{3}[)]?)-?\s?(\d{3})-?\s?(\d{4})(\d+)?/g; //g1(country code), g2(area code), g3(3 numbers), g4(4numbers), g5(leftover numbers)
    str.replace(regEx, function (match, g1, g2, g3, g4, g5) {
        if (g1 && Number(g1) !== 1) {
            valid = false;
            return;
        }
        if (g2 && g3 && g4 && g4.length === 4 && !g5) {
            var open = g2.charAt(0) === '(';
            var closed = g2.charAt(4) === ')';
            valid = open ? closed : g2.length === 3;
        }
    });
    return valid;
}


//console.log(telephoneCheck("1 555-555-5555"));
//console.log(telephoneCheck("1 (555)-555-5555"));
//console.log(telephoneCheck("(275)76227382"));
//console.log(telephoneCheck("5555555555"));


//===========================================================================================================//
// Create a function that sums two arguments together. If only one argument is provided, then return a function that
// expects one argument and returns the sum.
// For example, addTogether(2, 3) should return 5, and addTogether(2) should return a function.
// Calling this returned function with a single argument will then return the sum:
//      var sumTwoAnd = addTogether(2);
//      sumTwoAnd(3) returns 5.
// If either argument isn't a valid number, return undefined.

function addTogether() {
    var closureA;

    function isValidNumber(x) {
        return typeof x == 'number' && x !== NaN;
    }

    if (arguments.length == 2) {
        if (isValidNumber(arguments[0]) && isValidNumber(arguments[1]))
            return arguments[0] + arguments[1];
    } else {
        if (arguments.length == 1 && isValidNumber(arguments[0])) {
            closureA = arguments[0];
            return function (y) {
                if (isValidNumber(y))
                    return closureA + y;
            };
        }
    }
}

//console.log(addTogether(2, 3));

//===========================================================================================================//
// Check if the predicate (second argument) is truthy on all elements of a collection (first argument).

function truthCheck(collection, pre) {
    return !collection.filter(function (obj) {
        return !obj[pre];
    }).toString();
}

//console.log(truthCheck([{"user": "Tinky-Winky", "sex": "male"}, {"user": "Dipsy", "sex": "male"}, {"user": "Laa-Laa", "sex": "female"}, {"user": "Po", "sex": "female"}], "sex"));

//===========================================================================================================//
// Return an English translated sentence of the passed binary string.
// The binary string will be space separated.

function binaryAgent(str) {
    return str.split(' ').map(function (binary) {
        return String.fromCharCode(parseInt(binary, 2));
    }).join('');
}

//console.log(binaryAgent("01000001 01110010 01100101 01101110 00100111 01110100 00100000 01100010 01101111 01101110 01100110 01101001 01110010 01100101 01110011 00100000 01100110 01110101 01101110 00100001 00111111"));


//===========================================================================================================//
// Find the smallest common multiple of the provided parameters that can be evenly divided by both, as well as
// by all sequential numbers in the range between these parameters.
// The range will be an array of two numbers that will not necessarily be in numerical order.
// e.g. for 1 and 3 - find the smallest common multiple of both 1 and 3 that is evenly divisible by all numbers between 1 and 3.

function smallestCommons(arr) {
    /**
     * Generates range array from - to given index
     * @param range start
     * @param rage end
     * @returns {Array}
     */
    function getRange(from, to) {
        var length;
        var starting;
        if (from < to) {
            starting = from;
            length = to - from + 1;
        } else {
            starting = to;
            length = from - to + 1;
        }
        return Array.apply(null, Array(length)).map(function (element, index) {
            return index + starting;
        });
    }

    /**
     * Find closest common multiplier for two given numbers. If startFrom present, start from the given number (efficiency)
     * @param first
     * @param second
     * @param startFrom
     * @returns {number} smallest common number
     */
    function getCommon(first, second, startFrom) {
        var a,
            b,
            indexA,
            indexB,
            multipleA,
            multipleB = 0;

        if (first > second) {
            a = first;
            b = second;
        } else {
            a = second;
            b = first;
        }

        if (startFrom) {
            indexA = Math.floor(startFrom / a) + 1;
            indexB = Math.floor(startFrom / b) + 1;
        }
        else {
            indexA = 2;
            indexB = 2;
        }
        while (true) {
            multipleA = a * indexA;
            while (multipleA > multipleB) {
                multipleB = b * indexB;
                if (multipleA === multipleB)
                    return multipleB;
                indexB++;
            }
            indexA++;
        }
    }

    /**
     * Is the provided number a common multiplier for array of given numbers
     * @param num
     * @param arr
     * @returns {boolean}
     */
    function isCommon(num, arr) {
        for (var i = 0; i < arr.length; i++) {
            if (num % arr[i] !== 0)
                return false;
        }
        return true;
    }

    var range = getRange(arr[0], arr[1]).reverse();
    var rangeEnd = range.splice(2);
    var common = getCommon(range[0], range[1]);
    while (true) {
        if (isCommon(common, rangeEnd)) {
            return common;
        } else {
            console.log(common);
            common = getCommon(range[0], range[1], common);
        }
    }
}

//console.log(smallestCommons([23, 18]));
//console.log(smallestCommons([4,10]));

//===========================================================================================================//
// Sum all the prime numbers up to and including the provided number.
// A prime number is defined as a number greater than one and having only two divisors, one and itself.
// For example, 2 is a prime number because it's only divisible by one and two.

function sumPrimes(num) {
    var primes = [];

    function isPrime(n) {
        if (n < 2) return true;
        //An integer is prime if it is not divisible by any prime less than or equal to its square root
        var p = Math.floor(Math.sqrt(n));
        for (var i = 2; i <= p; i++) {
            if (n % i === 0)
                return false;
        }
        return true;
    }

    for (var ind = 1; ind <= num; ind++) {
        if (isPrime(ind)) primes.push(ind);
    }
    return primes.reduce(function (x, y) {
        return x + y;
    });
}

//console.log(sumPrimes(10));

//===========================================================================================================//
// Given a positive integer num, return the sum of all odd Fibonacci numbers that are less than or equal to num.
// The first two numbers in the Fibonacci sequence are 1 and 1. Every additional number in the sequence is
// the sum of the two previous numbers. The first six numbers of the Fibonacci sequence are 1, 1, 2, 3, 5 and 8.
// For example, sumFibs(10) should return 10 because all odd Fibonacci numbers less than 10 are 1, 1, 3, and 5.

function sumFibs(num) {
    function getOdd(n) {
        var oddNums = [];
        var prev = 1,
            curr = 1,
            temp;
        oddNums.push(1);
        while (curr <= n) {
            if (curr % 2 !== 0) {
                oddNums.push(curr);
            }
            temp = curr;
            curr += prev;
            prev = temp;
        }
        return oddNums;
    }

    return getOdd(num).reduce(function (x, y) {
        return x + y;
    });
}

//console.log(sumFibs(4));

//===========================================================================================================//
//Convert a string to spinal case. Spinal case is all-lowercase-words-joined-by-dashes.

function spinalCase(str) {
    var regEx = /(\B[A-Z](?=[a-z]))|(\s)|([_-].)/g;
    return str.replace(regEx, function (match, g1, g2, g3) {
        if (g1) {
            return '-' + g1;
        }
        else if (g3) {
            return '-' + g3.charAt(1).toLowerCase();
        } else {
            return '-';
        }
    }).toLowerCase();
}

// console.log(spinalCase("The_Andy_Griffith_Show"));
// console.log(spinalCase('This IsSpinal_tap-two'));

//===========================================================================================================//
// We'll pass you an array of two numbers. Return the sum of those two numbers and all numbers between them.
// The lowest number will not always come first.


function sumAll(arr) {
    var total = 0,
        current,
        min = arr.reduce(function (a, b) {
            return Math.min(a, b);
        }),
        max = arr.reduce(function (a, b) {
            return Math.max(a, b);
        });
    current = min;
    while (current <= max) {
        total += current;
        current++;
    }
    return total;
}

//console.log(sumAll([1, 3]));

//===========================================================================================================//
//Convert the characters &, <, >, " (double quote), and ' (apostrophe), in a string to their corresponding HTML entities.

function convertHTML(str) {
    var regex = /([&<>"'])/gi;

    function replace(match, g1) {
        switch (g1) {
            case '&':
                return '&amp;';
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            case '"':
                return '&quot;';
            case "'":
                return '&apos;';
            default:
                return;
        }
    }

    return str.replace(regex, replace);
}

//console.log(convertHTML("'Dolce & Gabbana'"));

//===========================================================================================================//
// Write a function that takes two or more arrays and returns a new array of unique values in
// the order of the original provided arrays.
// In other words, all values present from all arrays should be included in their original
// order, but with no duplicates in the final array.
// The unique numbers should be sorted by their original order, but the final array should
// not be sorted in numerical order.

function uniteUnique(arr) {
    var rest = Array.prototype.slice.call(arguments);
    rest.forEach(function (ar) { //concat multi to single dimension array
        arr = arr.concat(ar);
    });

    function unique(ar) { //filter out duplicates
        return ar.filter(function (value, index) {
            return ar.indexOf(value) === index;
        });
    }

    return unique(arr);
}

// console.log(uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]));
// console.log(uniteUnique([1, 3, 2], [1, [5]], [2, [4]]));

//===========================================================================================================//
// Find the missing letter in the passed letter range and return it.
//     If all letters are present in the range, return undefined.

function fearNotLetter(str) {
    if (!str || str.trim().length === 0)
        return;
    var strL = str.toLowerCase();

    function getCode(i) {
        return {
            current: strL.charCodeAt(i),
            shouldBeNext: strL.charCodeAt(i) + 1,
            isNext: strL.charCodeAt(i + 1)
        };
    }

    for (var i = 0; i < strL.length; i++) {
        var n = getCode(i);
        if (n.shouldBeNext !== n.isNext && n.isNext === n.isNext)
            return String.fromCharCode(n.shouldBeNext);
    }
}

//console.log(fearNotLetter("abd"));

//===========================================================================================================//
// The DNA strand is missing the pairing element. Take each character, get its pair, and return the results as a 2d array.
// Base pairs are a pair of AT and CG. Match the missing element to the provided character.
// Return the provided character as the first element in each array.
// For example, for the input GCG, return [["G", "C"], ["C","G"],["G", "C"]]
// The character and its pair are paired up in an array, and all the arrays are grouped into one encapsulating array.

function pairElement(str) {
    if (!str || str.trim().length === 0)
        return null;
    var multiArr = [];
    var letter = {a: 'A', t: 'T', g: 'G', c: 'C'};
    var strArr = str.toUpperCase().split('');
    strArr.forEach(function (myLet) {
        switch (myLet) {
            case letter.a:
                multiArr.push([letter.a, letter.t]);
                break;
            case letter.t:
                multiArr.push([letter.t, letter.a]);
                break;
            case letter.c:
                multiArr.push([letter.c, letter.g]);
                break;
            case letter.g:
                multiArr.push([letter.g, letter.c]);
                break;
            default:
                break;
        }
    });
    return multiArr;
}

//console.log(pairElement("GCG"));

//===========================================================================================================//
// Translate the provided string to pig latin.
// Pig Latin takes the first consonant (or consonant cluster) of an English word, moves it to the
// end of the word and suffixes an "ay".
// If a word begins with a vowel you just add "way" to the end.
// Input strings are guaranteed to be English words in all lowercase.

function translatePigLatin(str) {
    var strArr = str.split(' ');

    function isStartingWithVowel(word) {
        if (word)
            return /\b[aeiou]/i.test(word);
        return false;
    }

    function replace(match, consCluster, wordEnding) {
        return wordEnding + consCluster + 'ay';
    }

    for (var i = 0; i < strArr.length; i++) {
        if (isStartingWithVowel(strArr[i]))
            strArr[i] = strArr[i] + 'way';
        else {
            var regEx = /\b([b-df-hj-n-p-t-v-z]+)([a-z]+)/;
            strArr[i] = strArr[i].replace(regEx, replace);
        }
    }
    return strArr.join(' ');
}

//console.log(translatePigLatin("ctonsonant"));

//===========================================================================================================//
// Perform a search and replace on the sentence using the arguments provided and return the new sentence.
// First argument is the sentence to perform the search and replace on.
// Second argument is the word that you will be replacing (before).
// Third argument is what you will be replacing the second argument with (after).
// NOTE: Preserve the case of the original word when you are replacing it. For example if
// you mean to replace the word "Book" with the word "dog", it should be replaced as "Dog"

function myReplace(str, before, after) {
    function isCapital(word) {
        return /[A-Z]/.test(word[0]);
    }

    function isMatch(str, str2) {
        return str.toLowerCase() === str2.toLowerCase();
    }

    function capitalise(word) {
        return word.charAt(0).toUpperCase() + word.substring(1);
    }

    var strArr = str.split(' ');
    for (var i = 0; i < strArr.length; i++) {
        if (isMatch(strArr[i], before)) {
            if (isCapital(strArr[i])) {
                strArr[i] = capitalise(after);
            } else {
                strArr[i] = after.toLowerCase();
            }
        }
    }
    return strArr.join(' ');
}

//myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped");

//===========================================================================================================//
// Make a function that looks through an array of objects (first argument) and
// returns an array of all objects that have matching property and value pairs
// (second argument). Each property and value pair of the source object has to
// be present in the object from the collection if it is to be included in the returned array.
// For example, if the first argument is [{ first: "Romeo", last: "Montague" },
// { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }],
// and the second argument is { last: "Capulet" }, then you must return
// the third object from the array (the first argument), because it contains
// the property and its value, that was passed on as the second argument.


function whatIsInAName(collection, source) {
    var arr = [];

    function hasProps(obj, obj2) {
        var isIn = false;
        for (var key in obj) {
            if (obj2.hasOwnProperty(key) && obj[key] === obj2[key])
                isIn = true;
            else
                isIn = false;
        }
        return isIn;
    }

    collection.forEach(function (obj) {
        if (hasProps(source, obj))
            arr.push(obj)
    });
    return arr;
}

//whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" });

//===========================================================================================================//
//Convert the given number into a roman numeral.
function convertToRoman(num) {
    var numBase = {
        1: 'I',
        5: 'V',
        10: 'X',
        50: 'L',
        100: 'C',
        500: 'D',
        1000: 'M'
    };

    function getLetter(x) {
        function loop(n, letter) {
            var str = '';
            while (n > 0) {
                str += letter;
                n--;
            }
            return str;
        }

        function splitZeroes(x) {
            if (typeof x !== 'number')
                x = Number(x);
            var zeroes = '';
            while (x >= 10) {
                zeroes += '0';
                x /= 10;
            }
            return {
                num: x,
                zeroes: zeroes
            };
        }

        var number = splitZeroes(x),
            cons = '',
            one = numBase['1' + number.zeroes],
            five = numBase['5' + number.zeroes];
        if (number.num > 0 && number.num <= 3) {
            cons = loop(number.num, one);
        } else if (number.num === 4) {
            cons = one + five;
        } else if (number.num >= 5 && number.num < 9) {
            cons = five + loop(number.num - 5, one);
        } else if (number.num !== 0) {
            cons = one + numBase['1' + number.zeroes + '0'];
        } else {
            cons = '';
        }
        return cons;
    }

    var numbers = num.toString().split('').reverse();
    var romanNumbers = [];
    var zeroes = '';
    for (var i = 0; i < numbers.length; i++) {
        romanNumbers.push(getLetter(numbers[i] + zeroes));
        zeroes += '0';
    }
    return romanNumbers.reverse().join('');
}

//console.log(convertToRoman(306));





















