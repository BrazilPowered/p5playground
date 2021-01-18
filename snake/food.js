class Food{
  //x and y are optional, as Location funstion does not require them
  constructor(size,x,y){
    this.size = size;               //Scale up size with game
    this.color= [255,80,80,255];  //RGBa
    
    this.pos;                       //define position as a vector coordinate
    this.changeLocation(x,y);       //Set Value of pos w/w-o x&y
  }
  
  display(){
    //food is a square of selected color with rounded corners of size 8
    fill(this.color);
    square(this.pos.x,this.pos.y,this.size,8);
    //...and add a shine of white in top left corner
    fill(255);
    noStroke();
    square(this.pos.x+floor(this.size/8),
           this.pos.y+floor(this.size/8),
           floor(size/8));
    //and a stem + leaf
    fill(150,80,120);
    let x=this.pos.x+(this.size/2);
    let y=this.pos.y-(this.size/6);
    let stemWidth=this.size/8;
    let stemLength=this.size/3;
    rect(x-stemWidth/2,y,stemWidth,stemLength);
    fill(50,255,80);
    ellipse(x+stemWidth,y+2*stemLength/3,stemLength,stemWidth);
    
  }
  
  //Changes location vector; pass (0,0) for a random Location
  changeLocation(x,y){
    if(x==null && y==null){
      x=floor(random( width/this.size))*size;
      y=floor(random(height/this.size))*size;
    }//else
    this.pos=createVector(x,y);
  }
}
