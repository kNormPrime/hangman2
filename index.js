//const readlineSync = require('readline-sync');
const prompt = require('readline-sync');
const wordbank = require("./word-bank.json");
// Wait for user's response.

//console.log(`Let's get down to business...\n`);
//console.log(`... or perhaps not.`) ;
//console.log(wordbank) ;
const myQuest = prompt.question(`who might u b ?`);
console.log(myQuest);
console.log(`<--- is stupid. `);