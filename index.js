
//////////////////// HANGMAN GAME //////////////////////////////////////////////////////////////
/////////////////////////program////////////////////////// by kNormPrime, Nov 2019 //////////////

//////////////////  bring in outside required tools ////////////////
const prompt = require('readline-sync');
const wordbank = require("./word-bank.json");
////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////// global variables //////////////////////
let guessWRONGcount = 0 ;   let guessRIGHTcount = 0 ; 
let GUESSED_rt =[] ;  let all_GUESSES = [``] ;  //arrays of user guessed characters
let testWORD ;  //randomly generated string gets passed to and assigned in round_Initialization function
let testGuess ; //character inputted by user gets passes to and assigned in startTURN function
let rounds_played = 0 ;  let rounds_won = 0 ;  // displays after round conclusion
let newRound_or_Continue = 1 ;  // condition for continuing or new round
//////////////////////////////////////////////////////////////

function text_Outputs (id) 
{   
    const str0_a = `                   {written by kNormPrime} {Nov. 2019} ` ;
    const str0 = `\nWelcome to Hangman!`+ str0_a+ `\nPress ctrl+c to stop\n` ;
    const str1 = `Type in your guess, then hit "enter" button.\n\n` ;
    const str2 = `\nPlease guess a letter: ` ;
    const str3 = `\nYou guessed CORRECT!\n` ;
    const str4 = `\nYou guessed WRONG...\n` ;
    const str5 = `\nYou have won `+ rounds_won + ` round(s) out of ` + rounds_played + ` round(s) played. ` ;
    const str6 = `\nThe mystery word was -->  ` ;
    const daEND = `\n The END. This round is concluded.` ;
    const situational_String = [str0,str1,str2,str3,str4,str5,str6, daEND] ;
    return situational_String [id] ;
}
/////////////////////////////
// more output strings put into functions
function guessAgain () { console.log (`\nround in progress...`);    }

const killplayer = (word)=> {rounds_played++ ; console.log("You are dead..."); 
                         console.log(text_Outputs(6) + word + text_Outputs(7) + text_Outputs(5));  } ;
const playerLives = (word)=>{rounds_played++ ; rounds_won++ ; 
                        console.log(text_Outputs(6) + word + text_Outputs(7) + text_Outputs(5));   } ; 

                      

////////////////// this function mediates between turns of guess input //////////////////////////////////////////
let startTURN = (letter) => 
{   
       testGuess = inputValidator(letter) ;  // user guess gets validated, formatted to lowercase if needed

      if(testGuess === "INVALID") { gettaGUESS() ; }  // returns user to input prompt
      else { GuessPlaysGame() ;}
      //  after above input validation occurs, GuessPlaysGame runs and alters
      //  global variables guessRIGHTcount and guessWRONGcount,
      //   which are then analyzed by guessesRemain below 
      // it will return appropriate output to the user,
      // as well as pass a parameter off  for use determining
      //  continuance of round or new round 
       
   /////// checks wrong guess count //////
  const guessesRemain = ()=>   
   {  let swtchParam ;
    
      const jabb = `\n...you may have won this round, but you won't be so lucky next time...` ;
      
     if(guessRIGHTcount=== testWORD.length && guessWRONGcount < 6) {swtchParam = 1 ;}
     else if (guessRIGHTcount !== testWORD.length && guessWRONGcount >= 6 ) {swtchParam = 2;}
     else {swtchParam = 0 ;}


        let round_control;
      switch (swtchParam)
      {case 1:
        {round_control = 1 ; console.log(`\n Congratulations! You WIN!`+  jabb); playerLives(testWORD) ;}
        break ;
       case 2:
         {round_control = 1 ; console.log("\n killplayer! "  ); killplayer(testWORD) ;}
         break ;
       default:
          {round_control = 2 ; console.log("\n guessAgain... ") ; guessAgain(); }      
       } //end switch
       return round_control ;
   } ;   // end guessesRemain
   //////////////////////////////////////
       newRound_or_Continue = guessesRemain();  
       
       return continue_OR_new(newRound_or_Continue) ;
 };
//////////////////  end startTURN function /////////////////////////////////////

function continue_OR_new (what2do)
{  let doThis ;
    if(what2do === 1) { doThis = round_Initialization() ; }
    else if(what2do === 2) { doThis = gettaGUESS() ; }

    return setTimeout( ()=>{return  doThis ; } , 4000) ;
}
   continue_OR_new(newRound_or_Continue) ; // 1st time at game start
    


///////////////////// function for getting user input //////////////////////////
function gettaGUESS ()  
{   let send_it ;
    setTimeout( ()=>
    {console.log(`mystery word -->   ` + GUESSED_rt.join(``)) ;
    const myReQuest = prompt.question(`|  USER, enter a letter guess:   `);
    console.clear();  send_it = myReQuest ; 
    startTURN(send_it);   // take input to function that mitigates each turn or guess
    } , 1000) ;
    
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
    // pick a new word from list 
let secretWORD =  wordbank[ Math.floor(Math.random()*wordbank.length) ] ;

   // set the random word to a global variable
  testWORD = secretWORD.toLowerCase(); // noticed a word in wordbank with capitalized letter
  // start guesses at 0                                 // reset visual displays
     guessWRONGcount = 0 ;     guessRIGHTcount = 0 ;    // visual_H_man = 0 ;
      GUESSED_rt = [``] ;     // must reset here, because if a prior round's word is
                                  // larger than the next round's, letters won't be cleared by the loop below  
      all_GUESSES = [``] ;  // resets each round    
   
    
  for(let i=0; i<testWORD.length; i++) // make an array of unguessed characters
     { GUESSED_rt[i] = ` _ ` ; }

     console.log( text_Outputs(0) + text_Outputs(1));  
     console.log(`The game is in play when you see: ("| USER, enter a letter guess: ")`) ; 
    ////////// After 'welcome to hangman' /////////   
     console.log(`\nnew round started...`);
         gettaGUESS() ;  // promps user and collects input

}           
///////////////////// end round initialization function ///////////////////////////////////////




////////////////////////this function tests each letter guess against mystery word ///////////
function GuessPlaysGame ()
{  let condition_of_input = "wrong!";  // to be used as a boolean test value
   all_GUESSES.push(testGuess) ; //records guess to validate against repeat guesses
  
   let daWord = testWORD.split('');   // put secret string into an array of characters
   for(let i=0; i<daWord.length; i++)
   {
   if(testGuess === daWord[i])
       {text_Outputs(3); GUESSED_rt[i]=(daWord[i]); condition_of_input = 'correct!' ; guessRIGHTcount++; }
   else{text_Outputs(4);  }
   } // end for loop
            // we pass condition_of_input as a boolean test value
   /* notice that the guessRIGHTcount is incremented inside the loop, as there may be more
       than one instance of the guessed letter occurring as we loop through the word
       below, the guessWRONGcount is incremented outside the loop, only showing
       that the guess failed one time due to not occuring once in the loop
    */
   let answerUSER = "" ;
   if(condition_of_input !== `correct!`) 
       { answerUSER = (text_Outputs(4)); guessWRONGcount++ ; }
   else{ answerUSER = (text_Outputs(3)); }  

   let standings = {'current round standings' :  {'correct' : guessRIGHTcount,  'incorrect' : guessWRONGcount}   } ;
   let score = JSON.stringify(standings); 
   let alsoThis = {'bad guesses left' :  ((6-guessWRONGcount)+ ' remaining out of 6')};     
   let helpfulInfo = JSON.stringify(alsoThis); 
  

  ////////// MOST IMPORTANT OUTPUT LINEs OF CODE IN WHOLE PROGRAM  /////////////////////////////////////////////////
   let shout = ('\n You guessed: '+ testGuess+`          mystery word---> `+ GUESSED_rt.join(``)  + `\n` ) ;
   console.log(answerUSER + shout +`\t\t\t\t` +score +`\t\t\t\t\t\t\t\t\t `+ helpfulInfo);
   /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

   // If you would like to view the secret word while playing, un-comment line below...
   // console.log('hint: secret word is --> ' + testWORD);  // comment out !!!!
   
}
////////////////// end GuessPlaysGame function ///////////////////////////////////////////////////////////////////


//////////////////////////////  END PROGRAM ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


