'use strict';


var sentence = 'TeST at the SeNTENCE';
var sentence2 = 'The At Moon MorningKJ KS kk the a';
//combine words back into sentence
const lowerCaseList = ['the', 'at', 'a', 'with'];

//Break sentence into words
function words(sentence){
    return sentence.split(' ');
}

function toSentence(words){
    var sentence='';
    for(var i = 0; i<words.length; i++){
        if(i===words.length-1){
            sentence+=words[i];
        }else {
            sentence += words[i] + ' ';
        }
    }
    return sentence;
}

function isLowerWord(word){
    var x = lowerCaseList.find(function(lowerWord){
        return word.toLowerCase()===lowerWord;
    });
    return Boolean(x);

}

function capitalizeArray(wordsArray){
    var wordsFixed = [];
    for(var i = 0; i<wordsArray.length; i++){

            if (i === 0 || i === wordsArray.length - 1) {
               wordsFixed.push(capitalize(wordsArray[i]));
            }else if(isLowerWord(wordsArray[i])) {
                wordsFixed.push(lowerCase(wordsArray[i]));
            }else {
                wordsFixed.push(capitalize(wordsArray[i]));
            }
        }
    return  toSentence(wordsFixed);
}

//capitalize word
function capitalize(word){
    var lCase = lowerCase(word);
   var firstLetter = lCase.substring(0,1).toUpperCase();
   var restOfWord = lCase.substring(1);
   return firstLetter+restOfWord;
}

//Lowercase the word
function lowerCase(word){
    return word.toLowerCase();
}
function capitalizeSentence(sentence){
    return capitalizeArray(words(sentence));
}

console.log(capitalizeSentence(sentence2));