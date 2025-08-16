         const levels = [
        {level:"Level-1",card:["confused","angry", "cool", "thinking", "party", "sad", "angry", "cool","thinking", "party", "sad","confused"],tries:10,initialTime:1000},
        {level:"Level-2",card:["circle", "cone", "triangle", "cylinder", "pentagon","cube", "circle", "cone","triangle", "cylinder","pentagon","cube"],tries:7,initialTime:1000},
        {level:"Level-3",card:["confused","cry","sleeping","smile","wink","smiley","confused","sleeping","smile","wink","smiley","cry"],tries:10,initialTime:1},
        {level:"Level-4",card:["apple","bananas","cherries","dragon-fruit","ellipse","hexagon","octagon","orange","trapezoid","tongue","tired","surprised","apple","bananas","cherries","dragon-fruit","ellipse","hexagon","octagon","orange","trapezoid","tongue","tired","surprised"],tries:30,initialTime:2500},
        {level:"Level-5",card:["fire","plant","wind","snowflake","drop", "prism","rhombus","grapes","pineapple","watermelon","strawberry","frustrated","rolling-eyes","smiley", "prism","rhombus","grapes","pineapple","watermelon","strawberry","frustrated","rolling-eyes","smiley","fire","plant","wind","snowflake","drop"],tries:24,initialTime:2000},
    ]
        function getSecondClass(str){
            return str.className.split(" ")[1]
        }
        function shuffle(array){
let randomArray = [];
let copy = array;
for(let z=0;;z++){
let j = Math.floor(Math.random()*array.length);
if(!randomArray.includes(j)){
    randomArray.push(j);
}
if(randomArray.length===array.length) break;
}
for(let i=0;i<array.length/2;i++){
let term = array[i];
    array[i]=array[randomArray[i]]
array[randomArray[i]]=term;
}
return array;
       }
       const play = document.getElementById("play")
       let gameWon = false;
       let gameStarted =false;
let tried = 1;
let chars = [];
let indexs = [];
let totalMatched = 0;
let currentLevel=parseInt(localStorage.getItem("currentLevel")) || 1;
let numOftries = 0;
document.getElementById("level-text").textContent=currentLevel<=5?`Level ${currentLevel}/5`:`More levels Coming Soon`;
;
play.textContent=currentLevel<=5?`Play`:`Finished All Levels`;
;
if(currentLevel>5){
play.removeAttribute("onclick")
}
       
       const home = document.getElementById("home");
       const gameStats = document.getElementById("gameStats");
        const cardsContainer =  document.getElementById("cards-container");
        const resultContainer = document.getElementById("result-container")
function addToContainer(array){
    cardsContainer.innerHTML="";
    let counter =0;
    array.forEach(el=>{
        cardsContainer.innerHTML+=`
        <div class="out-card ${el}" onclick="flip(this)" id="box-${counter}">
    <div class="in-card">
<div class="front-face">
<h1>?</h1>
</div>
<div class="back-face">
<img src="/assets--/${el}.png" alt="${el}">
</div>
    </div>
    </div>
        `;
        counter++;
    })
};
function fxGameStats(){
    gameStats.innerHTML="";
    gameStats.style.display="flex";
    gameStats.innerHTML=`<div><p>Level ${currentLevel}<p> <p>Tries ${numOftries}/${levels[currentLevel-1].tries}</p></div>
        <progress max="${levels[currentLevel-1].tries}" value="${levels[currentLevel-1].tries-numOftries}"></progress><br>
        <button type="button" id="nextLevel" onclick="startGame()">Restart Game</button>`
}
function checkWin(){
if(totalMatched===levels[currentLevel-1].card.length/2){
    gameWon=true;
    currentLevel++;
    localStorage.setItem("currentLevel",currentLevel)
   setTimeout(function(){
cardsContainer.style.display="none";
    gameStats.style.display="none";
    resultContainer.style.display="flex";
   let letter = ["W","O","N"];
   resultContainer.innerHTML=`<h1>You</h1>`;
   let newDiv = document.createElement("div");newDiv.id="won-holder";
    letter.forEach(el=>
       newDiv.innerHTML+=`<div class="out-card"> <div class="in-card"> <div class="front-face"> <h1></h1> </div> <div class="back-face"> ${el} </div> </div> </div>`)
        setTimeout(function(){
             let inCards = [...document.querySelectorAll(".in-card")]
inCards.forEach(el=>el.style.transform="rotateY(180deg)") },100)
   resultContainer.appendChild(newDiv)
   resultContainer.innerHTML+=`<button type="button" id="nextLevel" onclick="${currentLevel<=5?`startGame()`:`home()`}">${currentLevel<=5?`Continue to Level ${currentLevel}`:`Go home`}</button>`
   },1000)
   
    
}
}
function checkTryEnded(){
   if(numOftries===levels[currentLevel-1].tries && gameWon===false){
   setTimeout(function(){
cardsContainer.style.display="none";
    gameStats.style.display="none";
    resultContainer.style.display="flex";
    resultContainer.innerHTML=`<h1>Trial ended</h1>
    <button type="button" id="nextLevel" onclick="startGame()">Try Again</button>`
   },500)
    
} 
}
 function startGame(){
    gameWon=false;
    numOftries=0;
    totalMatched=0;
    resultContainer.style.display="none";
    addToContainer(shuffle(levels[currentLevel-1].card));
    let inCards = [...document.querySelectorAll(".in-card")]
        inCards.forEach(el=>el.style.transform="rotateY(180deg)")
    setTimeout(function(){
inCards.forEach(el=>el.style.transform="rotateY(0deg)")
gameStarted=true;
},levels[currentLevel-1].initialTime)
        home.style.display="none";
        cardsContainer.style.display="grid";
        fxGameStats()
    }

function flip(elem){
    if(tried<=2 && gameStarted===true){
let outCards = [...document.querySelectorAll(".out-card")]
let inCards = [...document.querySelectorAll(".in-card")]
let index = outCards.findIndex(el=>el.id===elem.id);
if(chars.length===0 || chars[0].id!==outCards[index].id){
chars.push(outCards[index])
indexs.push(index)
inCards[index].style.transform="rotateY(180deg)";
tried++;
};
if(chars.length===2){
    numOftries++;fxGameStats();
    if(getSecondClass(chars[0])===getSecondClass(chars[1]) && chars[0].id!==chars[1].id){
      chars[0].removeAttribute("onclick")
      chars[1].removeAttribute("onclick")
        chars[0].style.animation="scale .3s forwards ease .3s"
        chars[1].style.animation="scale .3s forwards ease .3s"
        totalMatched++;
        checkWin();
       tried=1;
chars =[]
indexs=[]
    }
    else{
        setTimeout(function(){
             inCards[indexs[0]].style.transform="rotateY(0deg)";
inCards[indexs[1]].style.transform="rotateY(0deg)";
tried=1;
chars =[]
indexs=[]
        },1000)
    }
} 
checkTryEnded()
}
    }
    const themes = {
     Sand: ['#ede0d4', '#3e2723', '#d4a373','#eabf96'],
    }