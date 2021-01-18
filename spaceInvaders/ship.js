class Ship{
  constructor(){
    this.width = 20;			//wide
    this.height= 60;			//tall
    this.x     = width/2;		//xpos
    this.y     = height-this.height/2;	//ypos at bottom
    this.color = [255,255,255,255];	//RGBalpha
    this.xDir  = 0;			//lateral dir; pos=right, neg=left
    this.yDir  = 0;			//vertical dir;pos=up, neg=down b/c inverted
    this.xSpeed= 5;			//how fast to move laterally
    this.ySpeed= 2;			//how fast to move vertically
  }
  
  //How this should look every frame
  display(){
    fill(this.color);
    //The Barrel is first
    rect(this.x,this.y,this.width,this.height );
    //the ship body is a rounded rect
    rect(this.x,this.y+this.height/4,this.width*4,this.height/2,20);
  }
  
  //motion = XYpos + (XYSpeed in(*) XYDir)
  move(){
    this.x+= this.xSpeed*this.xDir;
    this.y-= this.ySpeed*this.yDir;

    //constrain position to be INSIDE the canvas, with a max motion ceiling
    this.x=constrain(this.x,0,width);
    this.y=constrain(this.y,height/2,height-this.height/2); 
  }
  
  //grow health by amt
  grow(amt){
    this.color[1]=constrain(this.color[1]+amt,0,255);
    this.color[2]=constrain(this.color[2]+amt,0,255);
    this.health  +=amt;
  }

  //shrink radius by amt
  damage(amt){
    this.color[1]=constrain(this.color[1]-amt,0,255);
    this.color[2]=constrain(this.color[2]-amt,0,255);
    this.health  -=amt;
  }
}
