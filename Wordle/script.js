const buttonElements = document.querySelectorAll("button");
const wordElements = document.querySelectorAll(".row");
const fiveLetterWords = ["noise", "brush", "candy", "drift", "event",
"zebra","brave","dream","paint","paste","crazy"]; // Array of 5-letter words

let wordfortheday = fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)]; 
// let wordfortheday ="apple";
let row =0;
let letter =0;
let gameover =false;
let guessedcrctly = false;
buttonElements.forEach((e)=>
{
 e.addEventListener("click",function(){
    keypress(e.attributes["data-key"].value)
 });
});

function populateword(key)
{
// console.log(wordElements[0])
if(letter<5){
wordElements[row].querySelectorAll(".cell")[letter].innerText=key;
 letter+=1;  
}

}
function checkword()
{
    let noofcrctalphabets=0;
    const letterElements = wordElements[row].querySelectorAll(".cell");
    const guessedLetters = [];
    letterElements.forEach((e,index)=>
    {
        const indofLetterinWord = wordfortheday.toLowerCase().indexOf(e.innerText.toLowerCase());
        // console.log(indofLetterinWord);
if(index ==indofLetterinWord)
{
    noofcrctalphabets+=1;
e.classList.add("cell-green");
}
else if(indofLetterinWord>0)
{
    e.classList.add("cell-orange");
}
else{
    e.classList.add("cell-red");
}
    })
    if(noofcrctalphabets==5)
    {
        gameover=true;
        guessedcrctly = true;
        alert("congratulations! you have guessed the word correctly");
    }
    else if(row==5)
    {
        gameover=true;
        alert("Better luck next time. The word was :"+wordfortheday)
    }
}
function enterword()
{
if(letter<5)
{
    alert("Finish the word");
}
else
{
   checkword(); 
   row+=1;
   letter=0;

}
}
function del()
{
    const letterElements=wordElements[row].querySelectorAll(".cell");
    for (let index = letterElements.length-1; index >=0; index--) {
        const element = letterElements[index];
        if(element.innerText!="")
        {
element.innerText="";
letter-=1;
break;
        }
        
    }
    
}
function keypress(key)
{
// console.log(key);
if(!gameover)
{
if(key.toLowerCase()=="enter")
{
    enterword();
}
else if(key.toLowerCase()=="del")
{
    del();
}
else
{
    populateword(key);
}
}
else if(gameover&&guessedcrctly==true)
{
    alert("You already guessed the word. Come tomorrow")
}
else{
    alert("Your chances are over");
}
}
