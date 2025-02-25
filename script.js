const newBtn=document.querySelector(".btn");
const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");

let currentPlayer;
let gameGrid;

const winningPositions =[
    [0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];

function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];

    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents= "all";
        box.classList = `box box${index+1}`;
    })
    newBtn.classList.remove("active")
    gameInfo.innerText=`Current Player-${currentPlayer}`;
}
initGame()
function swap(){
    if(currentPlayer==="X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }
    gameInfo.innerText=`Current Player-${currentPlayer}`;
}

function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        swap();
        checkGameover();
    }
    
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    });
});

function checkGameover(){
    let answer="";
    winningPositions.forEach((postion)=>{
        if(gameGrid[postion[0]]!=="" && gameGrid[postion[1]]!=="" && gameGrid[postion[2]]!==""  && (
            gameGrid[postion[0]]===gameGrid[postion[1]] && gameGrid[postion[1]]===gameGrid[postion[2]]
        )){
            if(gameGrid[postion[0]]==="X"){
                answer="X";
            }
            else{
                answer="O";
            }

            boxes.forEach((box,index)=>{
                box.style.pointerEvents="none";

            })
            boxes[postion[0]].classList.add("win");
            boxes[postion[1]].classList.add("win");
            boxes[postion[2]].classList.add("win");

        }
    })

    if(answer !== "" ) {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newBtn.classList.add("active");
        return;
    }
    
    //We know, NO Winner Found, let's check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" )
            fillCount++;
    });
    
    //board is Filled, game is TIE
    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
        newBtn.classList.add("active");
    }
}


newBtn.addEventListener("click",initGame)
