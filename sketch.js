
var monkey , monkey_running
var banana ,bananaImage,bananaGroup, obstacle, obstacleImage,stoneImage;
var  obstacleGroup;
var score = 0;
var ground,groundImage,a;
var survivalTime

var gamestate = "play";



function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("obstacle.png");
  groundImage = loadImage("forest.jpg")
  
  
  
  
  bananaGroup = new Group ();
  obstacleGroup = new Group ();
 
}



function setup() {
  createCanvas(600,460)
  

  monkey = createSprite(36,240,20,20)
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.15;

  ground = createSprite(200,400,10000,50);
  ground.velocityX = -4;
  ground.visible = false;
  
  a = createSprite(300,200,100,100)
  a.velocityX = -4
  a.addImage("forest",groundImage);
  a.scale = 1.2
  a.depth = monkey.depth
  monkey.depth =monkey.depth + 1
  
  
  var SurvivalTime = 0;
  
  monkey.debug = false;
  monkey.setCollider("rectangle",0,  -50,200,200)
  
  
  
    

  
}


function draw() {
  background ("lightblue");
  
  if (gamestate === "play"){
      console.log(monkey.y)
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    if (a.x < 100){
      a.x=a.width/2
    }
  
  stroke ("white");
  strokeWeight(3);
  textSize(20);
  fill("black");
  text("score : " + score ,370,50);

  if(keyDown("space")&& monkey.y >= 330 ) {
        monkey.velocityY = -17 ;
    }
  
  monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.collide(ground); 
  if (bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      score = score + 1;    
      monkey.scale *= 2
    }
    if (obstacleGroup.isTouching(monkey)|| bananaGroup.x > 600){
      monkey.scale = monkey.scale/2
      monkey.y = monkey.height/2
       
    }
    if(monkey.scale >=  0.3){
      monkey.scale = 0.1            
    }
    
     if(monkey.scale < 0.04){
    stroke("black")
    strokeWeight(10)
    fill("white")
    text("GAME OVER",200,200)
    text("RELOAD TO START AGAIN",300,300) 
    ground.velocityX = 0;
    obstacleGroup.destroyEach()
    bananaGroup.destroyEach()
    a.destroy();
    monkey.destroy()   
    }
  
    
   
      
  banana(); 
  stones();
       
  drawSprites();
    
     }
  }


function banana (){
     
    
  if(frameCount % 130 === 0){
    var banana = createSprite (500,400,10,10);
    banana.y = Math.round(random(200,250));
    banana.velocityX  = -6;
    banana.addImage("eating",bananaImage);   
    banana.scale = 0.1;
    banana.debug = false;
    banana.setCollider("rectangle",0,0,600,700);
    
    
    bananaGroup.add(banana);
    

  }  
          
             
    } 

function stones (){ 
  
  if (frameCount % 120 === 0){
    var obstacle = createSprite (500,370,10,10)
    obstacle. addImage("stones",stoneImage);   
    obstacle.scale = 0.2;
    
    obstacle.debug =  false;
    obstacle.setCollider("rectangle",0,0,400,400);
    
    
    obstacle.velocityX = -6;
     
    obstacleGroup.add(obstacle);
    
  
  }
  
  }





