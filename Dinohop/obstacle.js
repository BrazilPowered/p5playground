class Obstacle{
    constructor(img,size,pathHeight,speed){
        this.pathHeight=pathHeight;
        this.size= size;
        this.x= width+this.size;
        this.y= this.pathHeight;
        this.speed = speed;
        this.img=img;
    }

    show(){
        push();
        noFill();
        ellipseMode(CENTER);
        imageMode(CENTER);
        var ratio=this.img.width/this.img.height;
        if(ratio<this.img.height/this.img.width){
            image(this.img,this.x,this.y,this.size*ratio,this.size);
        }else{
            ratio=this.img.height/this.img.width;
            image(this.img,this.x,this.y,this.size,this.size*ratio);
        }
        
        circle(this.x,this.y,this.size*ratio);//,this.size);
        pop();
    }

    move(){
        this.x -= this.speed;
    }

}