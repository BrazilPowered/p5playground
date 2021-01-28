class Player{
    constructor(imgStand,imgSquat,size,pathHeight,speed){
        this.pathHeight=pathHeight;
        this.fullSize=size;         //img will always be fullsize
        this.size=this.fullSize;    //bounding circle will change
        this.x=100;
        this.y=this.pathHeight;
        this.yVel=0;

        this.jumpSpeed= -35;
        this.gravity = speed/6;

        this.imgStand=imgStand; //image for stand pose
        this.imgSquat=imgSquat; //image for squat pose
        this.img=this.imgStand; //img to use in next draw
    }

    jump(){
        if(this.y == this.pathHeight){
            this.yVel = this.jumpSpeed;
        }
    }

    isSquatting(){
        return this.size==this.fullSize/2;
    }

    squat(){
        this.img=this.imgSquat;
        this.size=this.fullSize/2;
    }

    unSquat(){
        this.img=this.imgStand;
        this.size=this.fullSize;
    }

    //TODO: hit hit box isn't calculating right. 
    //the dist below returns a value lower than expected
    hits(obj){
        console.log ("ohNo!"+(this.size/2),obj.size/2,dist(this.x, this.y, obj.x, obj.y));
        return dist(this.x, this.y, obj.x, obj.y) < (this.size/2)+(obj.size/2);

    }
    
    move(){
        //TODO: lerp the y acceleration a bit better on jumps
        this.y+=this.yVel;
        this.yVel+=this.gravity;
        this.y=constrain(this.y,this.pathHeight-(this.fullSize*2),this.pathHeight);
        this.yVel=constrain(this.yVel,-300,300);
    }

    show(){
        push();
        //rect(this.x,this.y,this.size,this.size);
        noFill();
        ellipseMode(CENTER);
        imageMode(CENTER);
        image(this.img,this.x,this.y,this.fullSize,this.fullSize);
        var boundingY;
        if(this.isSquatting()){
            //boundingX=this.x+this.size;
            boundingY=this.y+this.size/4;
        }else{
            //boundingX=this.x;
            boundingY=this.y;
        }
        circle(this.x,boundingY,this.size);
        //TODO: make this shape two circles?
        pop();
    
    }
}