class Projectile{
    constructor(startPosVector,startAngleVector,firingRangeInt,cannonOffsetInt){
        //Where is the projectile
        this.pos=p5.Vector.add(startPosVector,
                               p5.Vector.mult(startAngleVector,cannonOffsetInt));
        //How fast is the projectile & in what direction?
        this.velocity=startAngleVector.copy().mult(10); //head where ship points
        //Is the Projectile live?
        this.live=true;
        this.firingRange=firingRangeInt;

        //game options
        if(cannonOffsetInt != null)
            this.cannonOffset=cannonOffsetInt;
        else
            this.cannonOffset=1;
    }

    update(){

        this.pos.add(this.velocity);
    }

    render(){
        //start a buffered Drawing State
        push();
        //////
        stroke(255);
        strokeWeight(4);
        point(this.pos.x,this.pos.y);
        ///////restore original drawing state;
        pop();
    }

    hits(obj){
        var d = dist(this.pos.x,this.pos.y,obj.pos.x,obj.pos.y);
        //This is a point, so r=0
        //TODO: Add amt for offset in casde of tiny diameter
        if (d < obj.radius){
            this.live=false;
            return true;
        }//else
        return false;
    }
}