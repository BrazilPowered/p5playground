//How big should the whole map be?
let gameSizeX=2000;
let gameSizeY=2000;

//var speed=1;
//var score=0;

let debug=false;             //'true' enables Debug Statements
let specialControls=false;   //enable Special Controls below Canvas
var controlsVisualOffset=30; //sets space given for controls below canvas

//Game Pieces
var blobby;
var blobbies=[];
var currentZoom=1;
var startSize = 64;
var startingFoodBlobs=50;

function setup() {
  //----EN/DIS-ABLE SPECIAL CONTROLS---
  if(specialControls){
    controlsVisualOffset=30;
  }else{
    controlsVisualOffset=0;
  }
  //-----------------------------------
  createCanvas(windowWidth, windowHeight-controlsVisualOffset);
  
  //Create idle blobbies for free points
  for(var i =0; i<startingFoodBlobs; i++){
    var x,y;
    if(debug){
      x = floor(random(-(width/2) ,width/2));
      y = floor(random(-(height/2),height/2));
    }else{
      x = floor(random(-gameSizeX/2,gameSizeX/2));
      y = floor(random(-gameSizeY/2,gameSizeY/2));
    }
    append(blobbies,new Blobby(16,x,y));
  }
  
  //Create Player. 
  //Start at Center, since view will revolve around player in center
  blobby=new Blobby(startSize, 0, 0);
  
  //Load an image to use for player
  //img=loadImage('https://www.flaticon.com/svg/static/icons/svg/3010/3010843.svg');

}

function draw() {
  background(220);
  /*****************************************\
  /*  Scale the World around Player "Blobby"
  /*****************************************/
  /*****Step1*****/
  //  Translate all coordinates of map to focus on center as 0,0
  //  NOTE: All Translations in one draw loop are cumulative in p5
  translate(width/2,height/2);
  /***************/
  /*****Step2*****/
  //  Scale all dimensions of map rather than explanding player Blobby.
  //  This keeps player blobby at set size & shrinks world around it.
  //  For best zoom-in/out visual, first interpolate (lerp) the zoom;
  //  the smaller the interpolation (lerp) val, the smoother the effect.
  var desiredZoom=startSize/blobby.radius;
  currentZoom = lerp(currentZoom,desiredZoom,0.05);
  
  scale(currentZoom);
  /***************/
  /*****Step3*****/  
  /*  Translate all coordinates of map rather than moving player
  /*  this keeps player blobby at center & moves origin instead.
  /*  Note: This must be done AFTER scale to prevent coordinate drift.
  /*  Also: Negative pos values so world moves opposite of player motion
  /***************/
  translate(-blobby.pos.x,-blobby.pos.y);
  /***************/
  /******************************************/
  
  
  //Check for eating blobbies & kill eaten blobs
  for(var i=blobbies.length-1; i>=0; i--){
    if(blobby.canEat(blobbies[i])){
      blobby.eat(blobbies[i]);
    }else{
      blobbies[i].display();
    }
    //remove any dead blobbies
    if(blobbies[i].radius<=0){
      blobbies.splice(i,1);            //removes this dead blobby
    }
  }
  
  updatePlayerFrame();
  
}

function updatePlayerFrame(){
  //Constrain player within gameSize X&Y map
  if(debug){
    blobby.pos.x=constrain(blobby.pos.x,-width/2 ,width/2);
    blobby.pos.y=constrain(blobby.pos.y,-height/2,height/2);
  }else{
    blobby.pos.x=constrain(blobby.pos.x,-gameSizeX/2,gameSizeX/2);
    blobby.pos.y=constrain(blobby.pos.y,-gameSizeY/2,gameSizeY/2);
  }
  //find movement of blobby
  blobby.update();
  //show blobby
  blobby.display();
}

/*
//Control what key presses do
function keyPressed(){
  loop();
  if (key === ' ') {
    //update to change dir to 'brake'?
    gravity = createVector(0, -0.5*copter.mass);
  } else if (keyCode === RIGHT_ARROW) {
    //start update to control with arrows
    copter.yVelocity = createVector(0,-1);
  }
}
//
function keyReleased(){
  gravity=createVector(0, 0.3*copter.mass);
}
*/
