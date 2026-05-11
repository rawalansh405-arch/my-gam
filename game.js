const player = document.getElementById("player");
const game = document.querySelector(".game");
const scoreText = document.getElementById("score");

let lane = 1;
let score = 0;

const lanes = [70,170,270];

function updatePlayer(){
  player.style.left = lanes[lane] + "px";
}

updatePlayer();

window.addEventListener("keydown",(e)=>{

  if(e.key==="ArrowLeft" && lane>0){
    lane--;
    updatePlayer();
  }

  if(e.key==="ArrowRight" && lane<2){
    lane++;
    updatePlayer();
  }

});

function createObstacle(){

  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");

  const randomLane = Math.floor(Math.random()*3);

  obstacle.style.left = lanes[randomLane]+"px";

  game.appendChild(obstacle);

  let topPos = -60;

  const move = setInterval(()=>{

    topPos += 5;

    obstacle.style.top = topPos+"px";

    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if(
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ){
      alert("Game Over");
      location.reload();
    }

    if(topPos > window.innerHeight){
      obstacle.remove();
      clearInterval(move);

      score++;
      scoreText.innerText = "Score: " + score;
    }s

  },20);

}

setInterval(createObstacle,1200);s// Mobile Touch Controls
const leftBtn = document.createElement("button");
leftBtn.innerText = "⬅";
leftBtn.style.position = "absolute";
leftBtn.style.bottom = "20px";
leftBtn.style.left = "20px";
leftBtn.style.width = "80px";
leftBtn.style.height = "80px";
leftBtn.style.fontSize = "30px";
leftBtn.style.zIndex = "1000";
document.body.appendChild(leftBtn);

const rightBtn = document.createElement("button");
rightBtn.innerText = "➡";
rightBtn.style.position = "absolute";
rightBtn.style.bottom = "20px";
rightBtn.style.right = "20px";
rightBtn.style.width = "80px";
rightBtn.style.height = "80px";
rightBtn.style.fontSize = "30px";
rightBtn.style.zIndex = "1000";
document.body.appendChild(rightBtn);

leftBtn.addEventListener("touchstart", ()=>{
  if(lane > 0){
    lane--;
    updatePlayer();
  }
});

rightBtn.addEventListener("touchstart", ()=>{
  if(lane < 2){
    lane++;
    updatePlayer();
  }
});