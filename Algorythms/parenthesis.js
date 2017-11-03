// Given an expression string exp, write a program to examine whether the pairs and the orders of
//
// "{","}","(",")","[","]"
//
// are correct in exp.
//
//     For example, the program should print true for
//
//     exp = "[()]{}{[()()]()}"
//
//     and false for
//
//     exp = "[(])"


function isClosed(inString) {

    const parentheses = '[]{}()';
    var openParentheses = [],
        character;

    if (typeof inString !== 'string' || !inString || inString.trim().length === 0 || inString === '0')
        return false;

    for (var i = 0; character = inString[i]; i++) {

        var paramIndex = parentheses.indexOf(character);

        if (paramIndex < 0) //not a parenthesis
            continue;

        if (paramIndex % 2 === 0) { //open
            openParentheses.push(character);
        } else { //close

            if (parentheses.indexOf(openParentheses.pop()) !== --paramIndex) {
                return false;
            }
        }
    }
    return !openParentheses.length;


}

console.log(isClosed('{}[[]]{'));
