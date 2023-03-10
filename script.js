const playBoard = document.querySelector(".play-board")
const scoreElement = document.querySelector(".score")
const highscoreElement = document.querySelector(".highscore")
const controls = document.querySelectorAll(".controls i")



let foodX , foodY;  
let snakeX = 5,
snakeY = 10;
let velocityX = 0,
velocityY = 0;
let snakebody = []
let gameover = false
let setintervalID;
let score = 0;
let highScore = localStorage.getItem("highscore") || 0;
highscoreElement.innerText = `High Score : ${highScore}`

const changefoodposition = () => {
    foodX = Math.floor(Math.random() * 30) +1;
    foodY = Math.floor(Math.random() * 30) +1;
}

const handlegameover = () => {
    clearInterval(setintervalID);
    alert ("Game Over Press Ok To Play")
    location.reload();
}
const changeDirection = (e) => {
    if(e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }else if(e.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }else if(e.key === "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}

controls.forEach(key => {
    key.addEventListener("click",() => changeDirection({key : key.dataset.key}))
})

const initGame = ()  => {

    if(gameover) return handlegameover();
    let htmlMarkup = `<div class="food"  style="grid-area: ${foodY} / ${foodX}"></div>`

    if(snakeX === foodX && snakeY === foodY){
        changefoodposition();
        snakebody.push([foodX, foodY]);
        score++

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("highscore",highScore)

        scoreElement.innerText = `Score : ${score}`
        highscoreElement.innerText = `High Score : ${highScore}`

    }

    for (let i = snakebody.length - 1; i > 0; i--){
        snakebody[i] = snakebody[i-1];
     }


    snakebody[0]= [snakeX,snakeY]

    snakeX+=velocityX;
    snakeY+=velocityY;

   if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
    gameover = true
   }
   
   
   
   
   
   
   
   
    for (let i = 0 ; i < snakebody.length;i++){
        htmlMarkup += `<div class="snake"  style="grid-area: ${snakebody[i][1]} / ${snakebody[i][0]}"></div>`
        if (i !== 0  && snakebody[0][1]  === snakebody[i][1] && snakebody[0][0] === snakebody[i][0]){
            gameover = true
        }

    }

    playBoard.innerHTML = htmlMarkup;
} 
changefoodposition();  
setintervalID = setInterval(initGame , 125)

document.addEventListener("keydown", changeDirection)