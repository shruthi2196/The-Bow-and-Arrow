var PLAY = 0
var END = 1
var LOSE   
var gameState = PLAY
var RESET=2;

var backgroundImage,background
var bowImage,bow
var       redballoonImage,greenballoonImage,pinkballoonImage,blueballoonImage
var redballoon,greenballoon,pinkballoon,blueballoon
var balloon
var arrow ,arrowImage
var arrows,balloons
var danger,dangerImage
var gameover,gameOver
var score=0
function preload(){
  
  //LOADING IMAGES
  
  backgroundImage=loadImage("bg.jpg")
  
  bowImage =loadImage("bow2.png")
  
   redballoonImage =loadImage("redBalloon.png");
  greenballoonImage =loadImage("greenBalloon.png"); 
  pinkballoonImage =loadImage("pinkBalloon.png");
  blueballoonImage =loadImage("blueBalloon.png");
  
  arrowImage=loadImage("arrow2.png")
  
  dangerImage=loadImage("2.png");
  
  gameOver=loadImage("go1.png")
  
  r=loadImage("r.png");
  
  //CREATING GROUPS
  arrows = createGroup();
  balloons=createGroup();
  dangers=createGroup();
  
}

function setup(){

  
  //creating background
  createCanvas(800, 400);
  
  // background image
  background=createSprite(400,200)
  background.addImage(backgroundImage)
background.scale=1

  // creating bow 
  bow = createSprite(775,250,20,50);
  bow.addImage(bowImage); 
  bow.scale = 0.3;
  
  gameover=createSprite(400,170);
  gameover.scale = 0.8
  gameover.addImage(gameOver)
  gameover.visible=false;
  
  restart=createSprite(410,330);
  restart.addImage(r);
  restart.scale=0.3
  restart.visible=false;
  
}

  
function draw() {
  
  
  
  if(gameState===PLAY){
     
    //spawning balloons
    spawnBalloons();
    
    //spawning bombs
    bombs();
    
     //movement of bow
     bow.y = World.mouseY  
    
    //shooting arrow  
  if (keyWentDown("space")) {
    var arrow= createSprite(750, 100, 60, 10);
    arrow.addImage(arrowImage);
    arrow.x = 750;
    arrow.y=bow.y;
    arrow.velocityX = -10;
    arrow.scale = 0.1;
    arrow.lifetime=120
    arrows.add(arrow);
  }
   
    }
 
   if (score>9){
    gameState=END
    balloon.destroy();
    background.velocityX=0;
    bow.destroy();
    arrows.destroyEach();
  }
   
 
   edge= createEdgeSprites(); 
    
  
  
  //poping balloons
  if(arrows.isTouching(balloons)){
    balloons.destroyEach();
    score=score+1;
    arrows.destroyEach();
   }   
    
else if(balloons.collide(edge[1])){
  balloons.visible=false
    score=score-1;
  }
  
  if(arrows.isTouching(dangers)){
    gameState=LOSE
   
  }
 
  if(gameState===LOSE){
    balloon.destroy();
    arrows.destroyEach();
    dangers.destroyEach();
    gameover.visible=true;
    restart.visible=true;
 }
  
  if(mousePressedOver(restart)&&gameState===LOSE){
    gameState = RESET;
  }
  
  if(gameState===RESET){
    gameState=PLAY;
    gameover.visible=false;
    restart.visible=false;
   
    
  }
  
  if(gameState===END){
    balloon.destroy();
    bow.destroy();
    arrows.destroyEach();
    dangers.destroyEach();
    
  }
  
  drawSprites();
  
  //instructions
  strokeWeight(4)
  stroke("Black")
 
  fill("pink")
  textSize(30)
  text("THE BOW & ARROW",280,30)
 
    textSize(28)

  text("SCORE : " +score,3,30)
  
   
  textSize(12) 
  fill("black")
  strokeWeight(0.5)
  stroke("black")
  text("# PRESS SPACE TO SHOOT ARROWS",160,50)
  text("# NEW BALLOON WILL ARISE AFTER YOUR ARROW DISAPPEAR ",390,50)
  
  text("# SCORE 10 POINTS TO WIN",230,65)
  text("# YOU LOSE IF YOU SHOOT A BOMB",420,65)
  
  if(score>=10){
    textSize(25)
    text("YAYYY!!! You are the Champion of ",180,200)
    text("BALLOON BUSTER 🎈🏹",220,250)
    gameState=END;
  }
  

  
}

function bombs(){
  if(frameCount % 300 === 0 ){
    danger=createSprite(-10,random(180,380))
    danger.addImage(dangerImage);
    danger.scale=0.15
    danger.lifetime=300
    danger.velocityX=6
    
    danger.setCollider("circle",0,20,200);
    
    dangers.add(danger);
  }
}

//function to spawn balloons
function spawnBalloons(){
  
  if(frameCount % 170===0){
    balloon=createSprite(-10,random(150,380),20,20)
    balloon.velocityX=8
    balloon.lifetime = 105;
    
    balloon.scale= 0.1
    balloons.add(balloon);
    var rand = Math.round(random(1,4))
    switch(rand){
      case 1 : redBalloon();
        break;
      case 2 :greenBalloon();
        break;
       case 3 :pinkBalloon();
        break;
      case 4 : blueBalloon();
        break;      
       default:break;  
    }
    
  }
  
}
  
  function pinkBalloon() {
  balloon.addImage(pinkballoonImage);
  balloon.scale = 0.2
   }
   function redBalloon() {
  balloon.addImage(redballoonImage);
  balloon.scale = 0.15
   }
   function blueBalloon() {
  balloon.addImage(blueballoonImage);
  balloon.scale = 0.5
   }
   function greenBalloon() {
  balloon.addImage(greenballoonImage);
  balloon.scale = 0.3
   }
