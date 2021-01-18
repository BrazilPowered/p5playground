var ship;
var droppers=[];
var difficulty=6;
var projectiles=[];

function setup() {
  createCanvas(600, 400);
  ship = new Ship();
  //initial baddies
  for (var i=0; i<difficulty; i++){
    droppers[i] =new Dropper(i*80+80,60);
  }
}

function draw() {
  background(51);
  rectMode(CENTER);
  ship.move();
  ship.display();
  
  onEdge=false;//to check if baddies hit screen edge
  for (var i=0; i<droppers.length; i++){
    droppers[i].display();
    droppers[i].move();
      if(hitEdge(droppers[i])){
        onEdge=true;
      }
  }
  if(onEdge){
    for (var i=0; i<droppers.length; i++){
    droppers[i].shiftDown();
    }
  }
  for (var i=projectiles.length-1; i>=0; i--){
    //display and move all projectiles
    projectiles[i].display();
    projectiles[i].move();
    //if you miss, evaporate projectiles off screen
    if( projectiles[i].y < 0 || projectiles[i].energy <=0)
    {projectiles[i].energy=0;}
    
    //check for collisions
    for (var j=0; j<droppers.length; j++){
      if(projectiles[i].hits(droppers[j])){
        console.log("hit!");
        droppers[j].damage(projectiles[i].energy);
        projectiles[i].evaporate();
        if (droppers[j].health <=0){
          droppers.splice(j,1);
        }
          
      }
    }
    //...and finally remove projectiles with dissapated energy
    if(!projectiles[i].energy){
      projectiles.splice(i,1);
    }
  }
}

//TODO: Add non-radius obj checks (rect?)
//BOOL: If obj is closer than its radius to an edge -- COLLISION!
function hitEdge(object){
  if(!(object.x == null)){
    if( !(object.radius == null)){
      if(object.x+object.radius > width || object.x < object.radius){
        return true;
      }else{
        return false;
      }
    }
  }
    
    
}


//SPACE: Fire Projectiles
//LEFT_RIGHT ARROWS:Set lateral movement dir; most recent press takes precedent
//UP_DOWN ARROWS:  Set vertical movement dir; most recent press takes precedent
//Fix allowing HOLD DOWN keys to continue movement
function keyPressed(){
  if(key === ' '){
    var projectile = new Projectile(ship.x,height-ship.height);
    projectiles.push(projectile);
  }
  
  if(keyCode===LEFT_ARROW){
      ship.xDir=-1;//neg=left
  } else if(keyCode===RIGHT_ARROW){
    ship.xDir=1;//pos=right
  }
  if(keyCode===UP_ARROW){
    ship.yDir=1;//Inversed, so pos=up
  } else if(keyCode===DOWN_ARROW){
    ship.yDir=-1;//Inversed, so neg=down
  }
}

//Fix for Ship not stoppinig whe let go of key AND
//Fix for Ship not changing direction when two arrows are pressed and only 1 is released
function keyReleased(){
  if(keyCode===LEFT_ARROW){
    if(keyIsDown(RIGHT_ARROW))
      ship.xDir=1;
    else
      ship.xDir=0;
  }
  else if (keyCode===RIGHT_ARROW ){
    if(keyIsDown(LEFT_ARROW))
      ship.xDir=-1;
    else
      ship.xDir=0;}
  if(keyCode===UP_ARROW){
    if(keyIsDown(DOWN_ARROW))
      ship.yDir=-1;
    else
      ship.yDir=0;
  } else if(keyCode===DOWN_ARROW ){
    if(keyIsDown(UP_ARROW))
      ship.yDir=1;
    else
      ship.yDir=0;
  }
}
