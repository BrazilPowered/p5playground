class Ship{
    constructor(size,maxSpeed){
        this.pos=createVector(width/2,height/2);
        this.radius=size;
        this.heading=0; //Direction of "front"
        this.rotation=0;//PI/2; //in radians

        this.velocity=createVector(0,0);    //current speed
        this.acceleration=createVector(0,0);//current Change in spd
        this.maxSpeed=maxSpeed;             //maxSpeed allowed
        this.throttle=false;                //is accelerating?

        this.alive=true;

        //gameOptions
        this.hasDrag=true;
    }

    render(){
        //start a buffered Drawing State
        push();
        //////
        noFill();
        stroke(255);

        //Translate ship coords to appear at this.rotation angle
        translate(ship.pos.x,ship.pos.y);
        rotate(this.heading+PI/2);
        this.moveForward();
        //triangle pointing up @these3points
        triangle(-this.radius,this.radius,
                  this.radius,this.radius,
                  0,          -this.radius);

        ///////restore original drawing state;
        pop();
    }
    setRotation(angle){
        this.rotation=angle;
    }
    //TODO: reset heading to zero on full rotation;prevent infinite adding
    turn(){
        this.heading+=this.rotation;
    }
    moveForward(){
        //See if we're accelerating
        if(ship.throttle){
            this.accelerate(1);
        }else{
            this.acceleration=createVector(0,0);
        }
        //move us to the new position based on velocity vector
        this.pos=p5.Vector.add(this.pos,this.velocity);
        //If applicable:add drag for slow deceleration @1% per frame
        if(this.hasDrag){
            this.velocity.mult(.99);
        }      
    }
    //F=ma
    accelerate(acc){
        //this.acceleration.y =constrain(this.acceleration.y+acc,
        //                              0,this.maxSpeed);
        this.acceleration.add(p5.Vector.fromAngle(this.heading));
        this.acceleration.setMag(1);
        this.velocity.add(this.acceleration);
        //INSTEAD OF THIS COMPONENT NIGHTMARE, try....
        /*this.velocity.y = constrain(this.velocity.y,
                                    -this.maxSpeed,this.maxSpeed);
        this.velocity.x = constrain(this.velocity.x,
            -this.maxSpeed,this.maxSpeed);
        */
        //...this as a limiter
        this.velocity.limit(10);
    }
    //deccelerate(){
    //    this.velocity.mult(.99);
    //}
    engageThrottle(){
        this.throttle=true;
    }
    releaseThrottle(){
        this.throttle=false;
    }

    hits(obj){
        var d = dist(this.pos.x,this.pos.y,obj.pos.x,obj.pos.y);

        if(d<this.radius+obj.radius){
            this.alive=false;
            return true;
        }//else
        return false;
    }
}