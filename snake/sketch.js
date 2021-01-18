var size=100;     //scale the game by this value
var snake;       //the main snake in the game
var food;        //the food used in game
//var specFood;    //Special food with bonus?

//These two vars control game speed
var speed;       //divides the motion delay slowing snake (high is fast)
var count;       //used to count animation frames to skip
var score=0;     //used only to make code clearer

var textLarge=32;
var textMed  =24;
var textSmall=16;
var textTiny =8;

function setup() {
  //Canvas should be full size of window in increments of game "size"
  createCanvas(windowWidth- (windowWidth%size),
               windowHeight-(windowHeight%size));
  snake = new Snake(size,0,0);             //Snake of game size starts@x,y
  food  = new Food(size);                  //Food that will move throughout
  
  //Control Game speed
  frameRate(8);                 //MAXIMUM game speed
  speed=8;                      //Divide animation delay by this value
  count=ceil(frameRate()/speed);//Delay animation this many ticks
  textAlign(CENTER);
}

function draw() {
  background(51);  
  /******Game Speed*****/
  //Only when snake moves
  if(count>0)
  {count--;}
  else{
    count=ceil(frameRate()/speed);
    playGameFrame();
  }
  /*********************/

  food.display();
  snake.display();
  score=snake.tail.length;
  fill(255);
  text("Score: "+score, width/2, 10);
  //So did snake die?
  if(!snake.alive){
    endGame();
  }
}

function playGameFrame(){
  if(!snake.movedThisFrame){
    snake.move();
  }
}

function endGame(){
  push();
  rectMode(CENTER);
  textSize(textLarge);
  rect(width/2,height/2,textLarge*18,textLarge*4,8);
  fill(0);
  text("GAME OVER",width/2,(height/2)-textLarge);
  textSize(textMed);
  text("Score: "+score,width/2,height/2);
  textSize(textLarge);
  text("Hit ENTER for a new game",width/2,(height/2)+textLarge+textMed);
  pop();
  noLoop();
  //setup();//only "ENTER" will start new loop, calling "setup" function
}


//LEFT_RIGHT ARROWS:Set lateral movement dir
//UP_DOWN ARROWS:  Set vertical movement dir
function keyPressed(){
  /*if(key === ' '){
    var projectile = new Projectile(ship.x,height-ship.height);
    projectiles.push(projectile);
  }*/

  if(keyCode===LEFT_ARROW){
    snake.dir=createVector(-1,0);//neg=left
  } else if(keyCode===RIGHT_ARROW){
    snake.dir=createVector(1,0); //pos=right
  }
  else if(keyCode===UP_ARROW){
    snake.dir=createVector(0,-1);//Screen coords are inverted, so neg=up
  } else if(keyCode===DOWN_ARROW){
    snake.dir=createVector(0,1); //Screen coords are inverted, so pos=down
  }
  snake.move();

  if(keyCode===ENTER){
    setup();
    loop();
  }
}


