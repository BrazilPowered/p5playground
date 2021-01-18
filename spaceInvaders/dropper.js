class Dropper{
  constructor(x,y,){
    this.x     = x;		//xpos
    this.y     = y;		//ypos
    this.radius= 30;		//r
    this.width = this.radius*2;	//ellipse width  =2r
    this.height= this.radius*2;	//ellipse height =2r
    this.color = [155,0,200,200];//RGBalpha
    
    this.health=this.radius;	//Projectile Energy Absorbed before removed from game
    this.xSpeed=2;		//lateral speed
    this.ySpeed=0;		//vertical speed
  }
  
  //What this looks like every frame
  display(){
    //only if not dead
    if(this.health>0){
      fill(this.color);
      ellipse(this.x,this.y,this.radius*2,this.radius*2 );
    }
  }
  
  //move add XYspeed # of pixels to current XYpos
  move(){
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
  
  //When time to shift down, switch lateral Speed dir & move down by this.r
  shiftDown(){
    this.xSpeed *= -1;
    this.y += this.radius;
  }
  
  //grow radius by amt
  grow(amt){
    this.radius +=amt;
    this.health +=amt;
  }
  
  //shrink radius by amt
  damage(amt){
    this.radius -=amt;
    this.health -=amt;
  }
}
