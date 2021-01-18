size=50;
speed=1;
pipes=[];
var gravity;
var score=0;

let soundControls=false;
let mic;                                     //SOUND CONTROL
var slidersVisualOffset;                      //SOUND CONTROL
var sliderTop;                               //SOUND CONTROL
var sliderBott;                              //SOUND CONTROL dbl thresh
var sounding = false;                        //SOUND CONTROL dbl thresh

function setup() {
  if(soundControls){
    mic=new p5.AudioIn();                       //SOUND CONTROL
    mic.start();                                //SOUND CONTROL
    sliderTop = createSlider(0,0.3,0.02,0.01);  //SOUND CONTROL
    sliderBott= createSlider(0,0.3,0.01,0.01);  //SOUND CONTROL dbl thresh
    slidersVisualOffset=30;
  }else{
    slidersVisualOffset=0;
  }
  createCanvas(windowWidth, windowHeight-slidersVisualOffset);
  pipes=[new Pipe()];
  copter = new Copter(size);
  gravity=createVector(0,0);
  img=loadImage('https://www.flaticon.com/svg/static/icons/svg/3010/3010843.svg');

}

function draw() {
  background(220);
  stroke(0);
  strokeWeight(1);
  // Gravity is scaled by mass here!
  //var gravity = createVector(0, 0.1*copter.mass);
  // Apply gravity
  copter.applyForce(gravity);
  copter.move(gravity);
  copter.checkEdges();

  var i;
  for( i=0; i < pipes.length; i++){
    if (pipes[i].x < (0-pipes[i].w)){
      pipes.shift();
      score+=1;
    }
    pipes[i].display();

    copter.checkBumps(pipes[i]);

  }
  if ((pipes[i-1].x + pipes[i-1].w) < 2*width/3)
    append(pipes, new Pipe());

  if(soundControls)
    soundControl();                               //SOUND CONTROL

}

function soundControl(){
  var vol= mic.getLevel();
  fill(0,255,0,255);                              //SOUND CONTROL
  var y = map(vol, 0,1,height,0);                 //SOUND CONTROL
  rect(width-50,y,50,height-y);                   //SOUND CONTROL
  //console.log(vol);                             //SOUND CONTROL
  var micThresholdTop = sliderTop.value();        //SOUND CONTROL
  var micThresholdBott= sliderBott.value();       //SOUND CONTROL dbl thresh
  //visual indicator of top threshold             //SOUND CONTROL
  var micThreshTopY=map(micThresholdTop,0,1,height,0);//SOUND CONTROL
  stroke(255,0,0,255);                            //SOUND CONTROL
  strokeWeight(4);                                //SOUND CONTROL
  line(width-50,micThreshTopY,width,micThreshTopY);     //SOUND CONTROL
  //Visual Indicator of bottom threshold          //SOUND CONTROL
  var micThreshBottY=map(micThresholdBott,0,1,height,0);//SOUND CONTROL dbl thresh
  stroke(0,0,255,255);                            //SOUND CONTROL dbl thresh
  strokeWeight(4);                                //SOUND CONTROL dbl thresh
  line(width-50,micThreshBottY,width,micThreshBottY); //SOUND CONTROL dbl thresh
  if(vol>micThresholdTop){// && !clapping){       //SOUND CONTROL +//dbl thresh
    sounding=true;                                //SOUND CONTROL
    gravity = createVector(0, -0.5*copter.mass);  //SOUND CONTROL
  }                                               //SOUND CONTROL
  if(vol<micThresholdBott){                       //SOUND CONTROL dbl thresh
    sounding=false;                               //SOUND CONTROL dbl thresh
    gravity=createVector(0, 0.3*copter.mass);     //SOUND CONTROL dbl thresh
  }                                               //SOUND CONTROL dbl thresh

}

function keyPressed(){
  loop();
  if (key === ' ') {
    gravity = createVector(0, -0.5*copter.mass);
  } else if (keyCode === RIGHT_ARROW) {
    copter.yVelocity = createVector(0,-1);
  }
}
function keyReleased(){
  gravity=createVector(0, 0.3*copter.mass);
}

function mouseClicked(){
  reset();
}

function reset(){
  noLoop()
  pipes=[new Pipe()];
  console.log("Score: "+score);
  score=0;
}


class Copter{
  constructor(size){
    //this.x = 100;
    this.position = createVector(100,100);
    this.mass=size;
    this.length=size+30;
    this.height=size;
    this.acceleration = createVector(0, 0);
    this.yVelocity = createVector(0,0);
    //this.acc=1;
  }
  move(gravity){


    this.acceleration.mult(speed);
    this.yVelocity.add(this.acceleration);
    this.position.add(this.yVelocity);
    //accelertion must be cleared every frame?
    this.acceleration.mult(0)
    this.display();
  }
  display(){
    rect(this.position.x,this.position.y, this.length, this.height);
    image(img,this.position.x,this.position.y,this.length,this.height,0,0);
  }
  applyForce(force){
    var f = p5.Vector.div(force,this.mass);
    this.acceleration.add(f);
  }
  checkEdges(){
    if (this.position.y > (height - this.mass*2)) {
    // A little dampening when hitting the bottom
    this.yVelocity.y *= -0.9;
    this.position.y = (height - this.mass*2);
    } else if (this.position.y < this.mass*2){
      this.yVelocity.y *= 0.9;
      this.position.y = (this.mass*2)
    }
  }
  checkBumps(pipe){
    if((this.position.x > pipe.x &&
        this.position.x < pipe.x+pipe.w) ||
       (this.position.x+this.length > pipe.x &&
        this.position.x+this.length < pipe.x+pipe.w)){
      if (pipe.topside){
        //console.log("top");
        if(this.position.y < pipe.h)
          this.die();
      }
      else if (!pipe.topside){
        //console.log("bottom");
        if(this.position.y+this.mass > height-pipe.h)
          this.die();
      }
    }
  }
  die(){
    console.log("Oh no!");
    noLoop();
    reset();
  }
}

class Pipe{
  constructor(){
    this.topside = random([0,1]);//0=bottom, 1=top
    this.h     = random(100, height-(size*4));
    this.w     = random([50,100,150]);
    this.x     = width;
    //if (speed != null)
    this.xspeed = 5;//speed;
  }

  display(){
    this.x-=this.xspeed;
    fill(255);
    if(this.topside)
      rect(this.x,0,this.w,this.h);
    else
      rect(this.x,height-this.h, this.w, this.h);

  }
}
