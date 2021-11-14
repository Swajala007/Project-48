const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;




//var grArray = [];

var newTile;
var ladybug,ladybug_img;
var catnoir,catnoir_img;
var tile,tile_img;
var coin,coin_img;
var akuma,akuma_img;
var bg_img;
var points = 0;
//var bk_song;
var PLAY = 1;

var ground,ground_img;
var bug,bug_img;
var gameState = PLAY;

function preload()
{
  bg_img = loadImage('Paris1.jpg');
  ladybug_img = loadImage('Ladybug.png');
  catnoir_img = loadImage('Catnoir.png');
  tile_img = loadImage('Tile.png');
  coin_img = loadImage('coins.png');

  bk_song = loadSound('title song.mpeg');
  bg_song = loadSound('zt.mpeg');
  ground_img = loadImage('ground.jpg');
  akuma_img = loadImage('akuma.png');
  bug_img = loadImage('bug1.jpg');
 
 

}

function setup() 
{
  createCanvas(windowWidth,windowHeight);
  frameRate(90);
  bk_song.loop();
  bk_song.setVolume(1);

 

  engine = Engine.create();
  world = engine.world;

   
  ladybug = createSprite(590,190,50,50);
  ladybug.addImage(ladybug_img);
  ladybug.scale = 1.7;
  ladybug.setCollider("rectangle",10,199,50,40);
 // ladybug.debug = true;

 catnoir = createSprite(700,400,50,50);
 catnoir.addImage(catnoir_img);
 catnoir.scale = 1.6;
 catnoir.setCollider("rectangle",150,86,50,40);
 //catnoir.debug = true;

  tile = createSprite(560,530,50,50);
  tile.addImage(tile_img);
  tile.scale = 1.5;
  tile.setCollider("rectangle",50,20,80,25);
  //tile.debug = true;

 ground = createSprite(540,600,100,50);
 ground.addImage(ground_img);
 ground.scale = 1.5;


 bug = createSprite(630,300,100,50);
 bug.addImage(bug_img);
 bug.scale = 1;
 textSize(25);
 stroke("black");
 fill("purple");
 text("Points: "+ points,1100,50);


  coinG = new Group();
  akumaG = new Group();
 

  rectMode(CENTER);
  ellipseMode(RADIUS);
 
}


function draw() 
{
  background(bg_img);
  
  

  textSize(25);
    stroke("black");
    fill("white");
    text("Use Left & Right & Space keys to move Ladybug and a,n,d to move Catnoir",30,30);


    textSize(25);
    stroke("black");
    fill("purple");
    text("Points: "+ points,1100,50);
    
    if(ladybug.isTouching(coinG)){
      coinG.destroyEach();
      points = points+10;
    }
    if(catnoir.isTouching(coinG)){
      coinG.destroyEach();
      points = points+10;
    }
    


    if(mousePressedOver(bug)){
     gameState = PLAY;
      ground.visible = true;
      ladybug.visible = true;
      coinG.visible = true;
      tile.visible = true;
      akumaG.visible = true;
      bug.visible = false;
     
    
     
      
      
    }


   
  
    
  if(frameCount%240 === 0){
    tile.x = Math.round(random(100,1000));
    tile.y = Math.round(random(20,100));
    tile.velocityY = 2;
   tile.setCollider("rectangle",50,20,80,25);
   //tile.debug = true; 
  }
  ladybug.collide(tile);
  ladybug.collide(ground);
  catnoir.collide(tile);
  catnoir.collide(ground);
  

  if(ladybug.isTouching(akumaG)){
  /*  textSize(45);
    stroke("red");
    fill("black");
    text("GAME OVER",500,200);*/
    bk_song.stop();
    bg_song.play();
    gameOver();
    coinG.setEachVelocity(0);
    tile.setEachVelocity(0);
  
    ladybug.visible = false;
    catnoir.visible = false;
  }
  
  if(catnoir.isTouching(akumaG)){
    /*  textSize(45);
      stroke("red");
      fill("black");
      text("GAME OVER",500,200);*/
      bk_song.stop();
      bg_song.play();
      gameOver();
      coinG.setEachVelocity(0);
      tile.setEachVelocity(0);
      ladybug.visible = false;
      catnoir.visible = false;
    
      
    }
 


if(keyDown(LEFT_ARROW)){
  ladybug.x = ladybug.x-2;
}

if(keyDown(RIGHT_ARROW)){
  ladybug.x = ladybug.x+2;
}
  
  
     if(keyDown("SPACE")){
       ladybug.velocityY = -10;
     }
     ladybug.velocityY = ladybug.velocityY + 0.8;

    if(keyDown("c")){
   catnoir.y = catnoir.y-2;
 } 

 if(keyDown("n")){
  catnoir.x = catnoir.x-2;
}

if(keyDown("a")){
  catnoir.x = catnoir.x+2;
}

if(keyDown("d")){
 catnoir.velocityY = -10;
}
catnoir.velocityY = catnoir.velocityY + 0.8;

/*if(keyDown("")){
  catnoir.velocityY = -10;
}
catnoir.velocityY = catnoir.velocityY + 0.8;*/
    

  Engine.update(engine);
 
 

  spawnCoin();
  spawnAkuma();
  //showRank();
  

  drawSprites();

}

function spawnCoin(){
  if(frameCount % 250 === 0){
    var coin = createSprite(600,330,20,20);
    coin.y = Math.round(random(50,300));
    coin.x = tile.x+50;
    coin.y = tile.y;
    coin.addImage(coin_img);
    coin.scale = 0.1;
    coin.velocityY = 2;

    coin.lifeTime = 200;

    coin.depth = ladybug.depth;
    catnoir.depth = ladybug.depth+1;

    coin.depth = catnoir.depth;
    coin.depth = catnoir.depth+1;
    coinG.add(coin);
    
  }
}

function spawnAkuma(){
  if(frameCount%1000 === 0){
    akuma = createSprite(550,530);
    akuma.y = tile.y;
    akuma.x = tile.x+50;
    akuma.addImage(akuma_img);
    akuma.scale = 0.4;
    //akuma.x = 500;
   // akuma.y = Math.round(random(20,100));
    akuma.velocityY = 2;
    akuma.setCollider("rectangle",50,20,80,25);
   //akuma.debug = true; 
 
   akuma.lifeTime = 200;

    akuma.depth = ladybug.depth;
    akuma.depth = ladybug.depth+1;
    
    akuma.depth = catnoir.depth;
    akuma.depth = catnoir.depth+1;
    akumaG.add(akuma);
  }
}
 function gameOver() {
  swal({
    title: 'Game Over',
    text: `You lost`,
    imageUrl:
      'akuma.png',
    imageSize: "200x200",
    confirmButtonText: "Ok",
  },
  function (isConfirm){
    if(isConfirm){
    location.reload();
    }
  }
  );
  
}

