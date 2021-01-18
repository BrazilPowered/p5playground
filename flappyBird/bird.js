class Bird{
  constructor(size){
    this.size     = size;
    this.x        = this.size*2;
    this.y        = height/2;
    this.velocity = 0;
    this.gravity  = 1;
    this.color    = [50,255,50,200];
    this.alive    = true;
  }
  
  flap(){
    this.velocity = -10;
  }
  
  show(){
    fill(this.color);
    circle(this.x,this.y,this.size)
  }
  
  update(){
    this.velocity += this.gravity;
    this.y += this.velocity;
    
    this.y = constrain(this.y,0+(this.size/2),height-(this.size/2));
  }
}
