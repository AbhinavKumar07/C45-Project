const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var ball,ballImage;
var fidgetSpinnerImage,fidgetSpinnerGroup;
var leftArrowImage,leftArrowGroup;
var rightArrowImage,rightArrowGroup;
var starImage,starGroup;
var tableImage,tableGroup;
var restart,restartImage;
var ground, invisibleGround, ceiling;

var gameState = play;
var play = 1 , end = 0;

var distance = 0;
var score = 0;

function preload() {
ballImage=loadImage("sprites/ball.png");
fidgetSpinnerImage= loadImage("sprites/fidgetSpinner.jpg");
leftArrowImage= loadImage("sprites/leftArrow.png");
rightArrowImage= loadImage("sprites/rightArrow.png");
starImage= loadImage("sprites/star.png");
tableImage= loadImage("sprites/table.jpg");
restartImage = loadImage("sprites/restartImage.jpg");
}

function setup() {
  createCanvas(800, 700);

  //The ball
  ball = createSprite(100,300,40,40);
  ball.addImage(ballImage);
  ball.scale = 0.1;
	
  //Ground
  ground = createSprite(400,410,800,3);
  ground.x = ground.width/2;
  ground.velocityX = -30;

  invisibleGround = createSprite(400,420,800,3);
  invisibleGround.visible = false;

  ceiling = createSprite(400,0,800,1);

  //Groups for different obstacle types
  fidgetSpinnerGroup = new Group();
  leftArrowGroup = new Group();
  rightArrowGroup = new Group();
  starGroup = new Group();
  tableGroup = new Group();
}

function draw(){
  background("blue");
 if(gameState = play){

  //Calculating and displaying distance and score
  textSize(25);
  text("Distance:"+ Math.round(distance),20,50);

  distance += 0.4;

  if (starGroup.isTouching(ball)) {
    score = score + 1;
    starGroup.destroyEach();
    console.log(score);
  }
  text("Score:" + score , 650,50);

  //Creating an infinite ground
  if (ground.x < 400) {
    ground.x = ground.width/2;
  }

  //Automatically adjusting the ball's y-coordinate when it falls below the ground
  if (ball.y >= 388.8) {
    ball.y = 388.8;
  } 

  //Ground and ceiling collisions
  ball.collide(invisibleGround);
  ball.bounceOff(ceiling);

  //The ball's ability to jump with gravity making it fall again
  if (keyCode === 32){
    ball.velocityY = -12;
  }
  ball.velocityY += 1; 

  //Ground speed when ball interacts with the speed arrows
    if(leftArrowGroup.isTouching(ball)){
     ground.velocityX = ground.velocityX - 0.5;
    } else if (rightArrowGroup.isTouching(ball)) {
     ground.velocityX += 0.5;        
    }

  //Game state changes to end if ball touches fidget spinner,table or ceiling
    if (fidgetSpinnerGroup.isTouching(ball)||tableGroup.isTouching(ball)|| ball.isTouching(ceiling)){
      gameState = end;
    }
  }
    if(gameState = end){
      //Disabling features that would exist in play state except for score and distance text and displaying reset button


    }
  

  createFidgetSpinners();
  createleftArrows();
  createRightArrows();
  createStars();
  createTables();

  drawSprites();
}

function createFidgetSpinners(){
    //Spawning fidget spinners
    if (frameCount % 140 === 0) {
      var randY = random(10,407);
      var fidgetSpinner = createSprite(800,randY,20,20);
      fidgetSpinner.addImage("fidgetSpinner",fidgetSpinnerImage);
      fidgetSpinner.velocityX = -12;
      fidgetSpinner.scale = 0.03;
      fidgetSpinner.depth = ball.depth;
  
      fidgetSpinnerGroup.add(fidgetSpinner);
  
  //Speed arrows will change the complete environment, not just the speed of the ground
      if(leftArrowGroup.isTouching(ball)){
          fidgetSpinnerGroup.setVelocityXEach = fidgetSpinnerGroup.velocityX - 0.5;
      } else if (rightArrowGroup.isTouching(ball)) {
          fidgetSpinnerGroup.setVelocityXEach += 0.5;        
      }
    }
  }

function createleftArrows(){
  //Spawning left arrows
  if (frameCount % 50 === 0 ) {
    var randY = random(10,400);
    var leftArrow = createSprite(800,randY,5,5);
    leftArrow.addImage("leftArrow",leftArrowImage);
    leftArrow.velocityX = -12;
    leftArrow.scale = 0.15;
    leftArrow.depth = ball.depth;

    leftArrowGroup.add(leftArrow);

//Speed arrows will change the complete environment, not just the speed of the ground
    if(leftArrowGroup.isTouching(ball)){
        leftArrowGroup.setVelocityXEach = leftArrowGroup.velocityX - 0.5;
    } else if (rightArrowGroup.isTouching(ball)) {
      leftArrowGroup.setVelocityXEach += 0.5;        
    }
  }
}

function createRightArrows(){
  //Spawning right arrows
  if (frameCount % 60 === 0 ) {
    var randY = random(10,400);
    var rightArrow = createSprite(800,randY,5,5);
    rightArrow.addImage("rightArrow",rightArrowImage);
    rightArrow.velocityX = -12;
    rightArrow.scale = 0.15;
    rightArrow.depth = ball.depth;

    rightArrowGroup.add(rightArrow);

//Speed arrows will change the complete environment, not just the speed of the ground
    if(leftArrowGroup.isTouching(ball)){
      rightArrowGroup.setVelocityXEach = rightArrowGroup.velocityX - 0.5;
    } else if (rightArrowGroup.isTouching(ball)) {
        rightArrowGroup.setVelocityXEach += 0.5;        
    }
  }
}

function createStars(){
  //Spawning stars
  if (frameCount % 100 === 0 ) {
    var randY = random(10,400);
    var star = createSprite(800,randY,5,5);
    star.addImage("star",starImage);
    star.velocityX = -12;
    star.scale = 0.15;
    star.depth = ball.depth;

    starGroup.add(star);

//Speed arrows will change the complete environment, not just the speed of the ground
    if(leftArrowGroup.isTouching(ball)){
        starGroup.setVelocityXEach = starGroup.velocityX - 0.5;
    } else if (rightArrowGroup.isTouching(ball)) {
        starGroup.setVelocityXEach += 0.5;        
    }
  }
}

function createTables(){
  //Spawning tables
  if (frameCount % 50 === 0 ) {
  var table = createSprite(800,400,30,10);
  table.addImage("table",tableImage);
    table.velocityX = -12;
    table.scale = 0.1;
    table.depth = ball.depth;
  
    tableGroup.add(table);

  //Speed arrows will change the complete environment, not just the speed of the ground
    if(leftArrowGroup.isTouching(ball)){
        tableGroup.setVelocityXEach = tableGroup.velocityX - 0.5;
    } else if (rightArrowGroup.isTouching(ball)) {
        tableGroup.setVelocityXEach += 0.5;        
    }
  }
}