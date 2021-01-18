class Pipe{
  constructor(size, speed){
    this.gap = size*3;
    this.x = width;
    this.width=this.gap;
    this.topLength= floor(random(height-this.gap));
    this.bottomY  = this.topLength+this.gap;
    
    this.speed=speed;
    
    this.color=[255,255,255,255];
    
  }
  
  show(){
    fill(this.color);
    //top rectangle
    rect(this.x,           0, this.width,this.topLength);
    rect(this.x,this.bottomY, this.width,height-this.bottomY);
  }
  
  update(){
    this.x-=this.speed;
  }
}
