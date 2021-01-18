class Snake{
  constructor(size,x,y){
    this.pos=createVector(x,y);   //position as a vector coordinate
    this.size=size;               //Scale up size with game
    this.dir=createVector(1,0);   //direction as a unit vector
    this.tail=[];                 //limited history of previous head pos
    this.color=[200,180,255,255]; //RGBa
    //console.log(this.pos);
    this.justAte=false;           //Used to know when to grow the snake
    this.alive=true;              //Snake health indicator for game end
    this.movedThisFrame=false;   //If snake moved, don't let it move twice in one frame.
  }
  
  display(){
    /*****************HEAD*****************/
    fill(255);//White
    square(this.pos.x,this.pos.y,size);//Draw Head first
    
    /*****Eyes facing forward*****/
    fill(0);
    //coordinate the center of the eyes...
    let x =this.pos.x+(this.size/2)+(this.dir.x*this.size/4);
    let y =this.pos.y+(this.size/2)+(this.dir.y*this.size/4)
    
    //...then spread the eyes on x or y, depending on dir
    square(x+(this.dir.y*this.size/4),
           y+(this.dir.x*this.size/4),floor(size/8));
    square(x-(this.dir.y*this.size/4),
           y-(this.dir.x*this.size/4),floor(size/8));
    /**************************************/
    
    
    
    /*****************TAIL*****************/
    fill(this.color);
    for(var i=this.tail.length-1; i>=0; i--){
        square(this.tail[i].x,this.tail[i].y,this.size);
      }
    /**************************************/
    this.movedThisFrame=false;             //When being drawn, a new frame will clearly occur.
    }
  
  //Returns true is snake head is < 1 diameter from 'food'
  isEating(food){
    //workaround so snake can eat food(obj with Vec) and tail(Vec)
    var x,y;
    if(!(food.pos==null)){
      x=food.pos.x;
      y=food.pos.y;
    }else{
      x=food.x;
      y=food.y;
    }
    
    var d = dist(this.pos.x,this.pos.y,x,y);
    if(d<this.size){
      this.justAte=true;
      return true;
    }/*else{
      this.justAte=false;
    }*/
    return false;
  }
  
  /*REDUNDANT-- Snake which hits wall will detect overlapping tail anyway
  hitCanvasEdge(){
    if((this.pos.x < 0 || this.pos.x >width ) ||
       (this.pos.y < 0 || this.pos.y >height))
      return true;
    //else
    return false;
  }
  ************/
  
  //stores current head position as newest tail position, adding to length
  growTail(){
    this.tail.push(createVector(this.pos.x,this.pos.y));
  }
  
  //control motion of snake
  move(){
    //prevent erratic movement from combo keypresses
    this.movedThisFrame=true;

    //Check if player got points
    //Comes 1st to save on # computation loops checking food pos
    if(snake.isEating(food)){
      snake.growTail();
      food.changeLocation();
    }else{
    //We do NOT shift (shorten) oldest tail pos if just ate
    //if(!(this.justAte))
      //Then add current head as a new tail position to maintain length
      if(this.tail.length > 0 || this.justAte)
      this.growTail();
      this.tail.shift();
    }

    //Tail is updated, so move the head within canvas.size minus 1size
    this.pos.x=constrain((this.pos.x+(this.dir.x*this.size)),0,
                        (floor((width/this.size)) *this.size)-this.size);
    this.pos.y=constrain((this.pos.y+(this.dir.y*this.size)),0,
                        (floor((height/this.size))*this.size)-this.size);

  //Check if snake is Eating itself or hits wall**
  for(var i=this.tail.length-1; i>=0; i--){
    if (this.tail[i].equals(food.pos)){
      food.changeLocation();
      console.log('got it!');
      var i=this.tail.length-1;
    }
    if(this.isEating(this.tail[i])){
      this.die();
    }
  }//Note** hitting walls causes tail overlap in loop above
  
  //If we just moved, we didn't just eat; reset the eaten status
  this.justAte=false;
}

  //What happens when the snake dies?
  die(){
    console.log("Oh no, Mister Snake!");
    console.log("Score: "+this.tail.length);
    this.dir=createVector(0,0);
    this.alive=false;
    //this.tail=[];
  }
}
