class Cell{
    constructor(x,y,size){
        this.x=x;
        this.y=y;

        if(size!=null){
            this.size=size
        }else{
            this.size=20;
        }

        this.revealed =false;
        this.proximity=0;
        this.surprise;
        this.flagged=false;
    }

    //returns bool if a x,y coordinate is within this cell
    contains(x,y){
        //Since these squares are center-focued, we need some math magic:
        var radius = this.size/2
        var leftEdge =this.x-radius;
        var rightEdge=this.x+radius;
        var topEdge  =this.y-radius;
        var botEdge  =this.y+radius;
        //we aren't including borders in case of mis-clicks from user's eye
        if( x > leftEdge && x < rightEdge
        &&  y > topEdge  && y < botEdge ){
            return true;
        }//else
        return false;
    }

    proximityAlert(){
        this.proximity++;
    }

    reveal(){
        this.revealed=true;
        this.flagged=false;
    }

    flag(){
        if(this.flagged){
            this.flagged=false;
        }else{
            this.flagged=true;
        }
        return this.flagged;
    }

    isFlagged(){
        return this.flagged;
    }

    show(){
        push();
        rectMode(CENTER);
        textAlign(CENTER,CENTER);
        stroke(0);
        strokeWeight(floor(this.size/8));
        if(this.revealed){
            //draw a basic uncovered-background
            //show through to background instead
            if(this.surprise){
                fill(255,255,255);
                rect(this.x,this.y,this.size,this.size);
                fill(255,10,10);
                ellipse(this.x,this.y,this.size,this.size/2);
                //add shapes ot make a little surprise
            }else {
                fill(150,150,200);
                rect(this.x,this.y,this.size,this.size);
                if(this.proximity !=null && this.proximity > 0){
                    text(this.proximity,this.x,this.y);
                }
            }
        }else{//a basic un-revealed square
            fill(185);
            rect(this.x,this.y,this.size,this.size);
            noStroke();
            fill(255);
            rect(this.x,this.y,this.size-floor(this.size/4),this.size-floor(this.size/4));

            if(this.flagged){
                push();
                fill(255,0,0);
                stroke(0);
                strokeWeight(1);
                triangle(this.x-this.size/8,this.y-this.size/16,
                         this.x+this.size/8,this.y-(2*(this.size/16)),
                         this.x+this.size/8,this.y);
                line(this.x+this.size/8,this.y,this.x+this.size/8,this.y+this.size/8)
                pop();
            }
        }
        pop();
    }
}