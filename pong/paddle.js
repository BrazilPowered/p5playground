//This class is intended for use only on 1 of 4 screen edges
//takes in one string representing the edge: LEFT RIGHT TOP BOTTOM
class EdgePaddle{
    constructor(edge){
        this.edge=edge.toUpperCase();
        
        var longside; //24 is a good width
        if(height>width){
            longside=height/12;
        }else{
            longside=width/12;
        }
        var shortside = longside/4;
        var xPos,yPos;

        
        
        if(this.edge == "LEFT" || this.edge == "RIGHT"){
            this.width =shortside;
            this.height=longside;
            if(this.edge=="LEFT"){
                xPos=   0   + this.width;
                yPos= height/2;
            }else{ //if(this.edge == "RIGHT"){
                xPos= width - this.width;
                yPos= height/2;
            }
        }else if(this.edge == "TOP" || this.edge == "BOTTOM"){
            this.width =longside;
            this.height=shortside;
            if(this.edge == "TOP"){
                xPos= width/2;
                yPos=   0   + this.height;
            }else{ //if(this.edge == "BOTTOM"){
                xPos= width/2;
                yPos= height- this.height;
            }
        }else{
            console.error("ERROR! constructor only accepts 4 input strings: LEFT RIGHT TOP BOTTOM")
            return//error! constructor only accepts
        }
        this.pos  = createVector(xPos,yPos);
        this.ySpeed=0; // constant speed var

        this.score=0;
    }

    show(){
        push();
        fill(255);
        rectMode(CENTER);
        rect(this.pos.x,this.pos.y,this.width,this.height);

        pop();
    }

    move(){
        this.pos.y = constrain(this.pos.y+this.ySpeed, this.height/2, height-this.height/2);
    }

    //bounces puck according to perfect vector angle from center of paddle to center of puck on-impact
    reflect(puck){
        //get the 180-degree angle vector by subtracting puck & paddle angle vectors
        var angleToCenterPaddle =p5.Vector.sub(puck.pos,this.pos);
        
        ///////////////Cut angle in 2 for a max -45to45-degree return ////////////////
        /////////////otherwise, set puck.vel equal to angleToCenterPaddle/////////////
        var origin              = createVector(1,0);
        var returnAngle         = -(angleToCenterPaddle.angleBetween(origin));
        if(this.edge=="LEFT"){
            returnAngle=map(returnAngle,-PI/2,PI/2,-PI/4,PI/4);
            puck.vel = p5.Vector.fromAngle(returnAngle);
        }else if(this.edge=="RIGHT"){
            if(returnAngle >= 0){
                returnAngle=map(returnAngle,PI/2,PI,3*PI/4,PI);
            }else if (returnAngle < 0){
                returnAngle=map(returnAngle,-PI/2,-PI,-3*PI/4,-PI);
            }
            puck.vel = p5.Vector.fromAngle(returnAngle);
        }else{
            puck.vel=angleToCenterPaddle;
        }
        puck.vel = p5.Vector.fromAngle(returnAngle);
        //////////////////////////////////////////////////////////////////////////////
        puck.vel.setMag(puck.speed);
    }






    
    //bounces puck at angle defined by vector from center of paddle to center of puck on-impact
    // ...combined with original puck vectoor
    /*
    ySumReflect(puck){
        //get the new vel angle by subtracting puck & paddle angle vectors
        var vec=p5.Vector.sub(puck.pos,this.pos,);
        var angle = vec.angleBetween(puck.vel);
        puck.vel=p5.Vector.fromAngle(angle % (PI/2));
        console.log("vec: "+vec +"\nang: "+ angle+"\ncAn: "+angle%(PI/2)+"PI/2"+"\nFIN: "+ puck.vel)
        puck.vel.setMag(puck.speed);
        
    }*/
}