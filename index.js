//const readlineSync = require('readline-sync');

//////////////////  bring in outside required tools ////////////////
const prompt = require('readline-sync');
const wordbank = require("./word-bank.json");
////////////////////////////////////////////////////////////////////
/*
///////////////////////////////////// After 'welcome to hangman' //////////////////////////////////////
let secretWORD =  wordbank[ Math.floor(Math.random()*wordbank.length) ] ;

*/
/////////////////////////////////////////////////////////////////////////////////////////////
function  visual_displays (secretWORD) 
{
strBorder = "";   brdAry = [];  blkAry = [];  strBLANK = "" ;  hidaWrd = ""; hidAry =[] ;
for(let i = 0; i<secretWORD.length ; i++)  {brdAry[i]=`?`; blkAry[i]=" "; hidAry[i]=`*`;}
strBorder=brdAry.join(``);   strBLANK = blkAry.join(``);  hidaWrd=hidAry.join(``);

const secretBOX = (whatsTHIS) =>
 {
console.clear();
console.log(`|               ???`+ strBorder +`???`);
console.log(`|               ??` + strBLANK +  `  ??`);
console.log(`|               ?? `+ whatsTHIS +` ??`);
console.log(`|               ??` + strBLANK +  `  ??`);
console.log(`|               ???`+ strBorder +`???`);
console.log(`|`) ;
 } ;

const box_1 = () =>  {
secretBOX(hidaWrd) ;
console.log(`|  Who might you be, a mystery word perhaps? `);
console.clear();      };

const box_2 = () =>  {
secretBOX(secretWORD) ;
console.log(`|  The mystery word is revealed! End of this round of HANGMAN.   `);
console.clear();      };

}
////////////////////end visual_display //////////////////////////////////////////////////////////

// call start function    start(myQuest) ;
/////////////////////////////////////////////////////////////////////////////////////////////////


function text_Outputs (id) 
{   
    const str0_a = `                   {written by kNormPrime} {Nov. 2019} ` ;
    const str0 = `\nWelcome to Hangman!`+ str0_a+ `\nPress ctrl+c to stop\n` ;
    const str1 = `Type in your guess, then hit "enter" button.\n\n` ;
    const str2 = `\nPlease guess a letter: ` ;
    const str3 = `\nYou guessed CORRECT!\n` ;
    const str4 = `\nYou guessed WRONG...\n` ;
    const str5 = `` ;
    const situational_String = [str0,str1,str2,str3,str4,str5] ;
    return situational_String [id] ;
}
/////////////////////////////
function visual_diplays ()
{

}
////////////////////// global variables //////////////////////
let guessWRONGcount = 0 ;   let guessRIGHTcount = 0 ; 
let GUESSED_rt =[] ;  let all_GUESSES = [``] ;  //arrays of user guessed characters
let testWORD ;  //randomly generated string gets passed to and assigned in round_Initialization function
let testGuess ; //character inputted by user gets passes to and assigned in startTURN function
//////////////////////////////////////////////////////////////

function guessAgain () { console.log("get input \n\n");    }

const killplayer = ()=> {console.log("You are dead \n\n"); setTimeout(()=>{round_Initialization();},5000); } ;
const playerLives = ()=>{ setTimeout(()=>{round_Initialization();},5000); } ;

////////////////// this function mediates between turns of guess input //////////////////////////////////////////
let startTURN = (letter) => 
{   
       testGuess = inputValidator(letter) ;  // user guess gets validated, formatted to lowercase if needed

      if(testGuess === "INVALID") { gettaGUESS() ; }  // returns user to input prompt
      else { GuessPlaysGame() ;}
      //   
       
   /////// checks wrong guess count //////
  const guessesRemain = ()=>   
   {  const daEND = `\n The END. This round is concluded.` ;
      const jabb = `\n...you may have won this round, but you won't be so lucky next time...` ;
      if(guessRIGHTcount=== testWORD.length)
          { console.log(`Congratulations! You WIN!`+ daEND + jabb); playerLives() ; } 
      else if(guessWRONGcount < 7)
          {console.log(" guessAgain... ") ; guessAgain(); gettaGUESS(); }
      else {console.log(" killplayer! "  + daEND ); killplayer() ;}
   } ;
   //////////////////////////////////////
       guessesRemain();
 };
//////////////////  end startTURN function /////////////////////////////////////

///////////////////// function for getting user input //////////////////////////
function gettaGUESS ()  
{   let send_it ;
    setTimeout( ()=>
    {
    const myReQuest = prompt.question(`|  USER, enter a letter guess:   `);
    console.clear();  send_it = myReQuest ; 
    startTURN(send_it);   // take input to function that mitigates each turn or guess
    } , 5000) ;
    
} 
///////////////////// end gettaGUESS //////////////////////////////////////

/////////////////////////////////////////  start inputValidator() /////////////////////////////////////////////////////

function inputValidator (userEntry) 
{  console.log(`You have submitted: "`+userEntry+`"`);
    let target = '' ;  // return value

    //// output to USER strings
    const val_str1 = `The 1st typed character entered: "` ;
    const val_str2 = `" is not an alphabetic character.  Please re-submit a proper letter.` ;
    const val_str3 = `" has already been played in this round of HANGMAN.` ;
    const val_str4 = 'You will not be penalized, but please re-submit.' ;
    const val_str5 = `The HANGMAN game shall consider --> "` ;
    const val_str6 = `" <-- as the target letter to be tested.` ;

  let ASCIInumber = userEntry.charCodeAt(0) ;
    const a = (`a`).charCodeAt(0) , z = (`z`).charCodeAt(0) ;
    const A = (`A`).charCodeAt(0) , Z = (`Z`).charCodeAt(0) ;
    if( (ASCIInumber < A) || (ASCIInumber > Z && ASCIInumber < a) || (ASCIInumber > z) )
        { console.log(val_str1 + userEntry.charAt(0) + val_str2); 
            target = "INVALID" ;
        }
        // elseif  evaluates the found character value as true, or undefined as false
    else if( (all_GUESSES.find((val)=>{return val===(userEntry.charAt(0)).toLowerCase()  ? true:false ;})) )   
        {  console.log(val_str1 + userEntry.charAt(0) + val_str3);
            console.log(val_str4);
            target = "INVALID" ; 
        }

    else{ target = (userEntry.charAt(0)).toLowerCase(); 
          console.log(val_str5 + target + val_str6);
        }

        return target ;
}
///////////////////////////////////  end inputValidator() /////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////
function round_Initialization () 
{
    console.log( text_Outputs(0) + text_Outputs(1));  
    console.log(`The game is in play when you see: ("| USER, enter a letter guess: ")`) ; 
    setTimeout(()=>{console.log(`_`)},1000); setTimeout(()=>{console.log(`  _`)},2000); 
    setTimeout(()=>{console.log(`    _`)},3000); setTimeout(()=>{console.log(`      _`)},4000);
    setTimeout(()=>{console.clear();}, 6000);
    //////////////////////////////// paste here ////////////////////
///////////////////////////////////// After 'welcome to hangman' //////////////////////////////////////
let secretWORD =  wordbank[ Math.floor(Math.random()*wordbank.length) ] ;
//visual_displays(secretWORD).box_1()  ;
/*
strBorder = "";   brdAry = [];  blkAry = [];  strBLANK = "" ;  hidaWrd = ""; hidAry =[] ;
for(let i = 0; i<secretWORD.length ; i++)  {brdAry[i]=`?`; blkAry[i]=" "; hidAry[i]=`*`;}
strBorder=brdAry.join(``);   strBLANK = blkAry.join(``);  hidaWrd=hidAry.join(``);

const secretBOX= (whatsTHIS) =>
{
console.clear();
console.log(`|               ???`+ strBorder +`???`);
console.log(`|               ??` + strBLANK +  `  ??`);
console.log(`|               ?? `+ whatsTHIS +` ??`);
console.log(`|               ??` + strBLANK +  `  ??`);
console.log(`|               ???`+ strBorder +`???`);
console.log(`|`) ;
} ;
const tease = (`|  Who might you be, a mystery word perhaps?  `) ;
setTimeout( ()=>{ secretBOX(hidaWrd); console.log(tease); } , 4000) ;
*/

/*
let send_it ;
setTimeout( ()=>
{
const myReQuest = prompt.question(`|  USER, enter a letter guess:   `);
console.clear();  send_it = myReQuest ; 
} , 7000) ;
 */

/////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////// cut here ////////////////////
    
  // pick a new word from list  
  randWORD = secretWORD;
  // start guesses at 0                                 // reset visual displays
     guessWRONGcount = 0 ;     guessRIGHTcount = 0 ;    // visual_H_man = 0 ;
                                all_GUESSES = [``] ;  // resets each round    
   testWORD = randWORD;  // assign the value of the random word to a global variable
    
  for(let i=0; i<randWORD.length; i++) // make an array of unguessed characters
     { GUESSED_rt[i] = ` _ ` ; }
    
     setTimeout( ()=> { 
        console.log(`mystery word -->   ` + GUESSED_rt.join(``)) ;
         gettaGUESS() ; } , 7000);  // promps user and collects input

  //let temp = GUESSED_rt.forEach((val,idx,ary)=>{ ary[idx] = val + "_";})
}           
///////////////////// end round initialization function ///////////////////////////////////////

round_Initialization();


////////////////////////this function tests each letter guess against mystery word ///////////
function GuessPlaysGame ()
{  let daMain_output = "wrong!";  // to be used as a boolean test value
   all_GUESSES.push(testGuess) ; //records guess to validate against repeat guesses
   // redundancy text_Outputs(2);
    //let grabGuess = (letter) => { let guess = letter; return guess;} ;
   // let testGuess =  grabGuess(`n`);
   let daWord = testWORD.split('');   // put secret string into an array of characters
   for(let i=0; i<daWord.length; i++)
   {
   if(testGuess === daWord[i])
       {text_Outputs(3); GUESSED_rt[i]=(daWord[i]); daMain_output = 'correct!' ; guessRIGHTcount++; }
   else{text_Outputs(4);  }
   } // end for loop
            // we pass daMain_output as a boolean test value
   /* notice that the guessRIGHTcount is incremented inside the loop, as there may be more
       than one instance of the guessed letter occurring as we loop through the word
       below, the guessWRONGcount is incremented outside the loop, only showing
       that the guess failed one time due to not occuring once in the loop
    */
   let answerUSER = "" ;
   if(daMain_output !== `correct!`) 
       { answerUSER = (text_Outputs(4)); guessWRONGcount++ ; }
   else{ answerUSER = (text_Outputs(3)); }  

   let standings = {'current round standings' :  {'correct': guessRIGHTcount, 'incorrect': guessWRONGcount}   } ;
   let score = JSON.stringify(standings); 
   let alsoThis = {'bad guesses left' :  ((7-guessWRONGcount)+ ' remaining out of 7')};     
   let helpfulInfo = JSON.stringify(alsoThis); 
  // let shout = ('\ You guessed: '+ testGuess+`   `+ guessWRONGcount +" incorrect    "+ guessRIGHTcount +" correct    "+ GUESSED_rt.join(``) +'\n');

  ////////// MOST IMPORTANT OUTPUT LINEs OF CODE IN WHOLE PROGRAM  /////////////////////////////////////////////////
   let shout = ('\n You guessed: '+ testGuess+`          mystery word---> `+ GUESSED_rt.join(``)  + `\n` ) ;
   console.log(answerUSER + shout +`\t\t\t\t` +score +`\t\t\t\t\t\t `+ helpfulInfo);
   /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   console.log('hint: secret word is --> ' + testWORD);  // DELETE THIS !!!!
   
}
////////////////// end GuessPlaysGame function ///////////////////////////////////////////////////////////////////

/*
middle of program
*/
 

/*

//////////////////////////////// display at end of program  /////////////////////////////
let briefDelayIn_ms = 5000 ;
setTimeout( ()=>{ 
console.clear();      
console.log(`|               ???`+ strBorder +`???`);
console.log(`|               ??` + strBLANK +  `  ??`);
console.log(`|               ?? ` +secretWORD+` ??`);
console.log(`|               ??` + strBLANK +  `  ??`);
console.log(`|               ???`+ strBorder +`???`);               
} , briefDelayIn_ms) ;
////////////////////////////////////////////////////////////////////////////////////

*/