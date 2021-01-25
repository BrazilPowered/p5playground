class Puck{
    constructor(speed){
        this.speed=speed;   //scalar Magnitude value for velocity vector
        this.pos;           //position (vector)
        this.vel;           //velocity (vector)
        this.reset();       //...to initialize above values

         //How big around?
        if(height>width){
            this.diameter = height/40;
        }else{
            this.diameter = width/40;
        }
        this.radius = this.diameter/2;
    }

    show(){
        fill(255);
        circle(this.pos.x,this.pos.y, this.diameter);
    }

    update(){
        this.pos.add(this.vel);
        if(this.hittingTopBottomWalls()){
            this.reflect(true);
        }
    }

    hittingTopBottomWalls(){
        if(this.pos.y < this.radius){
            this.pos.y=this.radius;          //prevents the snowman wall-walk effect bug
            return true;
        }else if(this.pos.y > height-this.radius){
            this.pos.y=height-this.radius;   //prevents the snowman wall-walk effect bug
            return true;
        }//else
        return false;
    }

    //returns true if scoring
    isScoring(){
        if(this.pos.x > this.radius && this.pos.x < width-this.radius){
            return false;
        }//else
        return true;
    }

    //pass boolean values on whether to reflect on the x-axis(false) or y-axis (true)
    reflect(boolY){
        var vec; //reflection vector
        if(boolY){   //else if x but FALSE y
            vec=createVector(1,-1);
        }else{// if (!boolY){
            vec=createVector(-1,1);
        }
        this.vel.mult(vec);
        return true;//check for success if you want
    }

    //check if touching paddle: 'paddle'
    hits(paddle){
        var puckHeight=this.pos.y;
        var d = dist(this.pos.x,puckHeight, paddle.pos.x,puckHeight);
        //we only care about x, so puck.y will be constant for this check
        if(d < this.radius+(paddle.width/2)){  
            //Then check if within the bounds of the paddle && an extar cushion for puck radius
            if(puckHeight < paddle.pos.y+(paddle.height/2) + this.radius && 
               puckHeight > paddle.pos.y-(paddle.height/2) - this.radius){
                bloop.play();
                return true;
           }
        }//else
        return false;
    }

    //TODO: Add parameter to check which paddle scored last;
    //send puck slowly to other paddle && wait for motion until
    //that paddle makes it's first button press
    reset(){
        //start at center
        this.pos= createVector(width/2, height/2);
        //we want to make sure the puck doesnt start too vertical
        var rads;
        var boundary = 3*PI/8;
        do{
            rads=radians(ceil(random(360)));
        }while( ! ((rads >2*PI-boundary || rads <    boundary) || 
                  (rads >  PI-boundary && rads < PI+boundary)));
        this.vel= p5.Vector.fromAngle(rads);
        this.vel.setMag(this.speed);
        //console.log(this.vel.x, this.vel.y)
        this.mostRecentPaddle=null;
    }
}