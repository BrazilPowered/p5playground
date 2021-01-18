//NOTE: This class uses a bool 'debug' gate around debug statements
//To use these statements, set debug=true in your parent script
class Blobby{
  
  constructor(diameter,x,y){
    if(diameter != null){
      this.radius=diameter/2;                    //initial radius & health
    }else{
      this.radius=5; //--> 10/2
    }
    if(x!=null && y!=null){
      this.pos=createVector(x,y);
    }else{
      this.pos=createVector(width/2,height/2);   //position
    }
    this.velocity=createVector(0,0);
    this.maxVelocity=3;
    this.lerpVel=true; //Non-native feature
    //this.player=true;//Act different for playersvs idle?
  }
  
  //Sets motion vectors for Blobby
  
  update(){
    //Added optional Interpolation (lerp) to fix jerkiness on turn bug
    if(this.lerpVel){
      var desiredVelocity=createVector(mouseX-(width/2),mouseY-(height/2));
      //let lerping set the magnitude until maxed out
      desiredVelocity.setMag(this.maxVelocity);
      this.velocity.lerp(desiredVelocity,0.08);
    }else{
      this.velocity=createVector(mouseX-(width/2),mouseY-(height/2));
      //must set mag immediately if not interpolating or vel explodes
      this.velocity.setMag(this.maxVelocity);
    }

    //this.velocity.setMag(3);
    this.pos.add(this.velocity);
  }

  display(){
    fill(255)
    ellipse(this.pos.x, this.pos.y,this.radius*2,this.radius*2);
    //image(img,this.position.x,this.position.y,this.length,this.height,0,0);
  }
  
  
  canEat(blob){
    var d= p5.Vector.dist(this.pos,blob.pos);
    
    if(d<(this.radius)+(blob.radius)){
       return true
    }//else
      return false;
  }
  
  //Sums the surface Areas of blobs (rounded up)
  eat(obj){
    if(obj.radius>0 && obj.radius < this.radius){
      this.radius=this.radiusFromSurfaceArea(this.addSurfaceAreas(this,obj));
      //IGNORE unless debug is true
      if(debug){
        this.radius+=obj.radius;
      }
      obj.radius=0;
      return true;
    }//else
    return false;
  }
  
  //returns surface areas of two blob objects added together
  addSurfaceAreas(blobA,blobB){
    return (blobA.radius*blobA.radius*PI)+
           (blobB.radius*blobB.radius*PI);
  }
  
  radiusFromSurfaceArea(surfaceArea){
    return ceil(sqrt(surfaceArea/PI));
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
    //console.log("Oh no!");
    //noLoop();
    //while(this.radius>0){
    //  this.radius-=10;
    //}
    this.radius=0;
    
  }
}
