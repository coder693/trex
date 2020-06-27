var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obstaclesprite;
var cloud;
var ObstaclesGroup;
var CloudsGroup;
var gameState;
var PLAY;
var END;
var count;
var gameOver;
var restartGame;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  cloudimage=loadImage("cloud.png");
  groundImage = loadImage("ground2.png")
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  trexcollided=loadImage("trex_collided.png");
   restart= loadImage("restart.png");
  game= loadImage("gameOver.png");
  cloudimage=loadImage("cloud.png");
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  count=0; 
  PLAY=1;
  END=0;
  gameState = PLAY;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
   ObstaclesGroup = createGroup();
   CloudsGroup = createGroup();
  restartGame= createSprite(300,150);
  gameOver= createSprite(300, 75); 
  restartGame.addImage(restart);
  gameOver.addImage(game); 
  restartGame.scale=0.7;
  gameOver.scale=0.7;
  
  gameOver.visible = false;
  restartGame.visible = false;
}

function draw() {
  background(180);
 
textSize(15);
textFont("Georgia");
textStyle(BOLD);
  text("Score: "+ count, 50, 20);
  
  if (gameState==PLAY) 
 {
  count = count + Math.round(World.frameRate/60);
   
   if(keyDown("space")) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);
   
   
   spawnClouds();
   spawnObstacles();
     
   if(ObstaclesGroup.isTouching(trex)){
      
      gameState = END;
      
    }
 
   
 }
  
  
  else if(gameState==END)
  {
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    trex.addImage("trex2",trexcollided);
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    gameOver.visible = true;
    restartGame.visible = true;
    
  }
  if(mousePressedOver(restartGame)) {
    reset();
  }
  drawSprites();
  
  
  
}
function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restartGame.visible = false;
  
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  
  trex.addAnimation(trex_running);
  
  count = 0;
  
}

function spawnClouds()
{
  if(frameCount%60==0)
  {
    cloud = createSprite(600,320,40,10);
    cloud.y = Math.round( random(100,130));
    cloud.addImage(cloudimage);
    
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.lifetime=134; 
    CloudsGroup.add(cloud);
  }
  
  
}
function spawnObstacles()
{
  if(frameCount%60==0)
  {
     obstaclesprite = createSprite(600,160,10,40);
    obstaclesprite.velocityX = -6;
    
    //generate random obstacles
    var rand2 = Math.round( random(1,6));
   switch(rand2)
   {
     case 1: obstaclesprite.addImage("1",obstacle1);
     case 2:obstaclesprite.addImage("2",obstacle2);
     case 3: obstaclesprite.addImage("3",obstacle3);
     case 4: obstaclesprite.addImage("4",obstacle4);
     case 5:obstaclesprite.addImage("5",obstacle5);
     case 6: obstaclesprite.addImage("6",obstacle6);
   }
    
   
    obstaclesprite.scale = 0.5;
    obstaclesprite.lifetime = 100;
    ObstaclesGroup.add(obstaclesprite);
    
  }
  
  
}

