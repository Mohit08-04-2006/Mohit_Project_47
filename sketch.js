var alienship, alienImg1, alienImg2, alienImg3, alienGroup;
var mothership, mothershipImg;
var bg, bg_img;
var blast;
var jet, jetImg;
var laser, bluel, redl, greenl, orangel;
var life = 100;
var laser, LaserGroup;
var alienLaser, alienLaserGroup;
var score = 0;
var bgSound, blastSound, shootingSound;

var t = 0;
var m = 0;

function preload(){
  blast = loadAnimation("Images/Blast_(1).png","Images/Blast_(2).png","Images/Blast_(3).png","Images/Blast_(4).png","Images/Blast_(5).png","Images/Blast_(6).png","Images/Blast_(7).png","Images/Blast_(8).png","Images/Blast_(9).png");
  mothershipImg = loadAnimation("Images/Mothership_(1).png","Images/Mothership_(2).png","Images/Mothership_(3).png","Images/Mothership_(4).png","Images/Mothership_(5).png","Images/Mothership_(6).png");
  alienImg1 = loadImage("Images/Alienship1.png");
  alienImg2 = loadImage("Images/Alienship2.png");
  alienImg3 = loadImage("Images/Alienship3.png");
  bg_img = loadImage("Images/bkImg.png");
  jetImg = loadImage("Images/jet.png");
  bluel = loadImage("Images/BlueLaser.png");
  redl = loadImage("Images/RedLaser.png");
  greenl = loadImage("Images/GreenLaser.png");
  orangel = loadImage("Images/OrangeLaser.png");
  bgSound = loadSound("Sounds/BackgroundSound.mpeg");
  blastSound = loadSound("Sounds/BlastSound.mpeg");
  shootingSound = loadSound("Sounds/ShootingSound.mpeg");

}

function setup() {
 createCanvas(displayWidth,displayHeight);
 bg = createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight);
 bg.addImage(bg_img);
 bg.velocityY = 6;

 jet = createSprite(displayWidth/2,displayHeight-100,30,40);
 jet.addImage(jetImg);
 jet.addAnimation("Blast",blast);
 jet.scale = 0.1;

 AlienLaserGroup = createGroup();
 LaserGroup = createGroup();
 alienGroup = createGroup();

}

function draw() {
  background(22,14,71);
  //bgSound.play();

 if (bg.y>displayHeight*3){
    bg.y = displayHeight/2;
 }

 jet.x = mouseX;

 if (jet.x >= displayWidth-1180 && jet.x <= displayWidth-100){
   if (keyDown("space")){
     fire();
    }
  }

  jet.depth = jet.depth + 1;

 if (AlienLaserGroup.isTouching(jet)){
   life = life-10;
   AlienLaserGroup.destroyEach();
 }

 if (life <= 0){
   jet.changeAnimation("Blast",blast);
   jet.scale = 0.5;
   bg.velocityY = 0;
  // blastSound.play();
   t = t + 1;
 }
 
 if (t >= 66){
   jet.visible = false;
 }

 if (alienGroup.y = displayHeight-640){
   if (LaserGroup.isTouching(alienGroup)){
   alienGroup.destroyEach();
   LaserGroup.destroyEach();
   score = score + 10;
  }
 }

if (score < 100){
  spawnAliens();
}

   if (score == 20){
  // MotherShip();
  }
  
  drawSprites();

  if (life >= 80){
   fill("green");
   textSize(20);
   text(""+life,jet.x-10,jet.y+90);
  }
  else if (life < 80 && life >=50){
   fill("orange");
   textSize(20);
   text(""+life,jet.x-10,jet.y+90);
  }
  else if (life < 50 && life >=20){
   fill("yellow");
   textSize(20);
   text(""+life,jet.x-10,jet.y+90);
  }
  else if (life < 20 && life >=0){
   fill("red");
   textSize(20);
   text(""+life,jet.x-10,jet.y+90);
  }
  else{
   fill("red");
   textSize(20);
   text(""+life,jet.x-20,jet.y+90);
  }

  fill("violet");
  textSize(20);
  text("score = "+score,displayWidth-120,displayHeight-700);
  text("x = "+mouseX,displayWidth-100,displayHeight-670);
  text("y = "+mouseY,displayWidth-100,displayHeight-640);

}

function spawnAliens(){
  if (frameCount%100 == 0){
    alienship = createSprite(random(displayWidth-1100,displayWidth-150),0,30,40);
    alienship.velocityY = score%2 + 10;
    //alienship.addAnimation("Blast",blast);
    var rand = Math.round(random(1,3));

    switch (rand){
      case 1: alienship.addImage(alienImg1);
              alienship.scale = 0.08;
      break;
      case 2: alienship.addImage(alienImg2);
              alienship.scale = 0.08;
      break;
      case 3: alienship.addImage(alienImg3);
              alienship.scale = 0.08;
      break;
    }

    alienship.lifetime = 125;
    alienGroup.add(alienship);
   // console.log(alienGroup[0]);

    for (var i = 0; i<5; i++){
      //console.log(alienship.y+i);
      alienLaser = createSprite(alienship.x,alienship.y+i*100,10,10);
      alienLaser.addImage(orangel);
      alienLaser.scale = 0.02;
      alienLaser.velocityY = score%2 + 15;;
      AlienLaserGroup.add(alienLaser);
     // shootingSound.play();

    }
  }
}

function fire(){
  laser = createSprite(jet.x,jet.y,10,10);
  laser.addImage(greenl);
  laser.scale = 0.02;
  laser.velocityY = -10;
  LaserGroup.add(laser);
}

function MotherShip(){
  mothership = createSprite(displayWidth/2,displayHeight/2-200,40,50);
  mothership.addAnimation("ship",mothershipImg);
  mothership.scale = 0.64; 
  m = m+1;
  console.log(m);
}
