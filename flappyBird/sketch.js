let size = 64;
let speed= 5;
let score= 0;
var bird;
var pipes=[];



function setup() {
  createCanvas(windowWidth, windowHeight);
  bird = new Bird(size);
  append(pipes, new Pipe(size, speed));
  
}

function draw() {
  background(220);
  //noStroke();
  
  bird.update();
  bird.show();
  var i;
  for(i=0; i< pipes.length;i++){
    if (pipes[i].x < (0-pipes[i].width)){
      pipes.shift();
      score+=1;
    }
    if(collides(bird, pipes[i])){
      pipes[i].color=[255,100,100,255];
      bird.alive=false;
    }
    pipes[i].update();
    pipes[i].show();
  }
  if ((pipes[i-1].x + pipes[i-1].width) < 2*width/3)
    append(pipes, new Pipe(size,speed));
  
  //this is at end so all updates are drawn before noLooping
  if(!bird.alive){
    gameOver();
  }
}

function gameOver(){
  noLoop();
  console.log("died ded!");
  console.log("Score: "+score);
  score=0;
  pipes=[new Pipe(size,speed)];
  bird = new Bird(size);
}

function collides(bird, pipe){
  if(bird.x >= pipe.x && bird.x <= (pipe.x+pipe.width)){
    if(bird.y < pipe.topLength || bird.y > pipe.bottomY){
      return true;
    }
  }
  return false;
}

function keyPressed(){
  if(key===' '){
    bird.flap();
  }
  if(keyCode===ENTER){
    loop();
  }
}
