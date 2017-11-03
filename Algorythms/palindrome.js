// You get parameter to a method and you need to tell if its a palindrome  or not ?
//
//     - E.g. (“1223221” sas etc.)

function isPalindrome(str) {
    var reg = /[^a-zA-Z0-9]/g;
    var input = str.toLowerCase().replace(reg, '');

    if(!input || input.length ===0)
        return false;

    var letters = input.split('');

    if(letters.length === 1)
        return false;

    while (letters.length >1) {
        if (letters.pop() !== letters.shift())
            return false;

    }
    return true;
}

console.log(isPalindrome('almostomla'));