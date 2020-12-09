var monkey, invground, ground, obstacle, banana, bananaGroup, obstacleGroup;
var monkeyImage, groundImage, obstacleImage, bananaImage;
var PLAY=1;
var END=0;
var warning=0.5;
var gameState=1;
var score=0;
var banaScore=0;

function preload(){ 
  groundImage=loadImage("jungle.jpg");
  monkeyImage=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  obstacleImage=loadImage("stone.png");
  bananaImage=loadImage("banana.png");
}
function setup() {
  createCanvas(400,400);
  monkey=createSprite(100,360);
  monkey.addAnimation("running",monkeyImage)
  monkey.scale=0.1;
  ground = createSprite(200,200)
  ground.addImage("ground",groundImage)
  invGround=createSprite(250,360,500,10);
  invGround.visible=false;
  obstacle=createSprite(450,360);
  banana=createSprite(450,200);
  bananaGroup=new Group();
  obstacleGroup=new Group();
}

function draw() {
  background(220);
  monkey.setCollider("circle",0,0,200);
  monkey.collide(invGround);
  if(gameState===1||gameState===0.5){
    if(ground.x===150){
      ground.x=250;
    }
    if(World.frameCount%10===0){
      score++;
    }
    ground.velocityX=-2;
    ground.depth=monkey.depth-1;
    size();
    jump();
    spawnObstacles();
    spawnBananas();
  }
  if(gameState===0){
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-3);
    obstacleGroup.setLifetimeEach(-3);
    ground.velocityX=0;
  }
  drawSprites();
  stroke("white")
  fill("white")
  textSize(20)
  text("Survival Time:"+score,200,30);
  text("Bananas Caught:"+banaScore,20,30);
}
function spawnObstacles(){
  obstacleGroup.setVelocityXEach(-2);
  obstacleGroup.add(obstacle);
  obstacle.addImage("stone",obstacleImage)
  obstacle.scale=0.1
  obstacleGroup.setLifetimeEach(150);
  if(World.frameCount%300===0){
    obstacle=createSprite(450,360);
  }
}
function spawnBananas(){
  var rand=Math.round(random(300,200));
  bananaGroup.add(banana);
  banana.addImage("banana",bananaImage)
  banana.scale=0.05
  bananaGroup.setVelocityXEach(-2);
  if(World.frameCount%200===0){
    banana=createSprite(450,rand);
  }
}
function jump() {
  if(keyDown("space")) {
    monkey.velocityY=-15;
  }
  monkey.velocityY=monkey.velocityY+0.6;
  if(monkey.isTouching(obstacleGroup)&&gameState===1){
    gameState=0.5;
    monkey.scale=0.1
  }
  if(monkey.isTouching(obstacleGroup)&&gameState===0.5){
    gameState=0;
    monkey.scale=0.1
  }
  if(monkey.isTouching(bananaGroup) && gameState===1){
    banaScore=banaScore+1;
    bananaGroup.destroyEach();
  }
}
function size() {
  switch(score){
    case 10: monkey.scale=0.12
      break;
    case 20: monkey.scale=0.13
      break;
    case 30: monkey.scale=0.14
      break;
    case 40: monkey.scale=0.15
      break;
      default: break;
  }
}