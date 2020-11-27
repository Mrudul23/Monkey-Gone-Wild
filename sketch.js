
var monkey , monkey_running;
var backGround,backgroundImge;
var banana,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;
var ground;
var survivaltime=0;
var PLAY=1;
var END=0;
var gameState=PLAY;
var stop ;
var gameover,gameOver;
var restart,Restart;

function preload(){
  
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  stop=loadImage("sprite_1.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundImage=loadImage("jungle 1.png");
  gameover=loadImage("gameover.png");
  Restart=loadImage("restart.png");

}
function setup() {
  
  createCanvas(windowWidth,windowHeight);
  
  backGround=createSprite(0,height-40,width,20);
  backGround.addImage(backgroundImage);

  ground=createSprite(0,height-60,width,20);
  ground.visible=false;
  
  monkey=createSprite(50,height-60,10,10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.addImage("stop",stop) ;
  monkey.scale=0.2;
  monkey.setCollider("circle",0,0,280);
    
  
  gameOver=createSprite(width/2+12,height/2-100);
  gameOver.addImage(gameover);
  gameOver.scale=0.7;
  
  restart=createSprite(width/2-20,height/2+30);
  restart.addImage(Restart);
  restart.scale=0.15;
  foodGroup=createGroup();
  obstacleGroup=createGroup();
  
}

function draw() {                       
 
  
   background("skyblue");
  
  
  if(gameState===PLAY){
      
    gameOver.visible=false;
    restart.visible=false;
    
      if (monkey.isTouching(foodGroup)){
           foodGroup.destroyEach();
           score=score+1;
           }
    
           
         }
    
     spawnrocks();
     bananas();
    
     backGround.velocityX=-(4 + survivaltime * 20/100) ;
   if(backGround.x <width/2.8){
      backGround.x=width/2;
      }
    
    if(keyDown("Space") && monkey.y>height-150||touches.length > 0){
      monkey.velocityY=-13.5;
       touches = [];
      }
    
    monkey.velocityY=monkey.velocityY+0.4;
    monkey.collide(ground);
  
  if(frameCount% 33 === 0){
    survivaltime ++;
  }
    if(monkey.isTouching(obstacleGroup)){
       gameState=END;
    
    }else if(gameState===END){
      
    gameOver.visible=true;
    restart.visible=true;
    
    backGround.velocityX=0;
    monkey.setVelocity(0,0);
    obstacleGroup.setVelocityEach(0,0);
    foodGroup.destroyEach();
    obstacleGroup.setLifetimeEach(-1);
    monkey.changeImage("stop",stop);
     
    
    } 
  
 
  if (gameState===END&&touches.length >0||mousePressedOver(restart)){
    reset();
     touches = [];
  }

  
  drawSprites();
  
    textSize(30);
  fill("orange");
  stroke("red");
  strokeWeight(5);
  text("bananas collected = " + score,width-350,30);
  text("Survival Time = "+ survivaltime,width-350,70);

}

function spawnrocks(){
  if (frameCount % 120 === 0){
    obstacle=createSprite(windowWidth+20,height-90);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.23;
    obstacle.lifetime=600;
    obstacle.velocityX=-(4 + survivaltime * 20/100);
    obstacle.setCollider("circle",0,0,150);
    obstacleGroup.add(obstacle);
   
  }
 }
function bananas(){
  if(frameCount % 280 === 0){
    banana=createSprite(windowWidth+20,random(windowHeight-400,windowHeight-200));
    banana.addImage(bananaImage);
    banana.lifetime=500;
    banana.velocityX=-5;
    banana.scale=0.1;
    foodGroup.add(banana);   
   
  }
}
function reset(){
  if(gameState===END){
    gameState=PLAY;
    obstacleGroup.destroyEach();
    spawnrocks();
    bananas();
    gameOver.visible=false;
    restart.visible=false;
    monkey.changeAnimation("monkey",monkey_running);
    survivaltime=0;
    score=0;
    monkey.scale=0.2;
    
    
  }
}