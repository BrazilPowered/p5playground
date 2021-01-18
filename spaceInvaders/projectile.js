class Projectile{
  constructor(x,y,){
    this.x     = x;		//xpos
    this.y     = y;		//ypos
      this.radius=4;		//r
    this.width = this.radius*2;	//ellipse width  =2r
    this.height= this.radius*2;	//ellipse height =2r
    this.color = [180,220,255,255];	//RGBalpha
    
    this.energy=10;		//Amount to add/remove from droppers
  }
  
  //How this should look every frame
  display(){
    //no outline but full color fill
    noStroke();
    fill(this.color);
    ellipse(this.x,this.y,this.radius*2,this.radius*2 );
  }
  
  //TODO: add a speed component to adjust instead of changing this 10
  move(){
    this.y-=10;
    //this.energy-=1;
  }
  
  //How to tell when you've hit something-> dist between 2 circles is < r1+r2
  hits(shape){
    var d = dist(this.x, this.y, shape.x, shape.y);
    if(d < this.radius + shape.radius){
      return true;
    } else{
      return false;
    }
  }
  
  //Tell game to remove this projectile by setting energy to 0
  evaporate(){
    this.energy=0;
  }
}
