//This class is intended for use only on 1 of 4 screen edges
//takes in one string representing the edge: LEFT RIGHT TOP BOTTOM
class EdgePaddle{
    constructor(edge){
        //TODO: scale values proportionally with 'width' and 'height
        //24 is a good width
        var paddleWidth = 24
        var paddleHeight= paddleWidth*4;
        var xPos,yPos;


        this.edge=edge.toUpperCase();
        
        
        if(this.edge == "LEFT" || this.edge == "RIGHT"){
            this.width =paddleWidth;
            this.height=paddleHeight
            if(this.edge=="LEFT"){
                xPos=   0   + this.width;
                yPos= height/2;
            }else{ //if(this.edge == "RIGHT"){
                xPos= width - this.width;
                yPos= height/2;
            }
        }else if(this.edge == "TOP" || this.edge == "BOTTOM"){
            this.width =paddleHeight;
            this.height=paddleWidth;
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
        //get the new vel angle by subtracting puck & paddle angle vectors
        puck.vel=p5.Vector.sub(puck.pos,this.pos,);
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