class Asteroid{
    //NOTE: if Radius=0, min & max size are used to generate random Radius
    constructor(posVector,radiusInt,minAsSize,maxAsSize,verticesInt){
        //MIN & MAX size
        if(minAsSize!=null && maxAsSize !=null){
            this.minAsSize=minAsSize; //used in explode
            this.maxAsSize=maxAsSize; //used in explode
        }else{
            this.minAsSize=10; //used in explode
            this.maxAsSize=50; //used in explode
        }
        //RADIUS
        if(radiusInt){
            this.radius=radiusInt
        }else{
            this.radius=floor(random(this.minAsSize,this.maxAsSize));
        }
        //POSITION
        if(posVector){
            this.pos=posVector.copy();
        }else{
            this.pos=createVector(random(width),random(height));
        }
        //Number of VERTICES
        if(verticesInt){
            this.vertices=verticesInt;
        }else{
            this.vertices=floor(random(5,15));
        }
        this.offset=[];
        //TODO: Add perlin noise for roughness offsets
        for (var i=0;i<this.vertices;i++){
            this.offset[i] = random(-this.radius/2,this.radius/2);//-10,15
        }
        //movement
        this.velocity=p5.Vector.random2D();
    }

    move(){
        this.pos.add(this.velocity);
    }

    //if this kills something, change the color
    render(killer){
        //start a buffered Drawing State
        push();
        //////
        noFill();
        if(killer){
            color=[255,0,0];
        }else{
            color=100;
        }
        stroke(color);
        translate(this.pos.x,this.pos.y);
        
        //this.createRoundedShape();
        this.createRoughShape();

        ///////restore original drawing state;
        pop();
    }

    //creates circular shapes with random numbers of sides
    //"roughness" should be an array of values equal in length to vertices
    createRoundedShape(array){

        //defaults to no roughness
        //ignore if array is sent properly
        var roughnessOffsets=[];
        if(array===undefined){
            for(var i=0;i<this.vertices;i++)
                roughnessOffsets[i]=0;
        }else if(array.length<this.vertices){
            for(var i=array.length;i<this.vertices;i++)
                roughnessOffsets[i]=0;
        }else{
            roughnessOffsets=array;
        }


        //Create random cirshapes via vertex
        beginShape();
        for(var i=0; i<this.vertices;i++){
            var angle = map(i,0,this.vertices,0,TWO_PI);

            var r= this.radius+roughnessOffsets[i];
            var x= r*cos(angle);
            var y= r*sin(angle);
            vertex(x,y);
        }
        //the constant "CLOSE" will make sure the final two points connect
        endShape(CLOSE);
    }
    //creates rough edged & random sided shapes based loosely on circles
    createRoughShape(){
        //pass in an array of roughness values to the rounded shape func
        this.createRoundedShape(this.offset);
    }

    //if radius >
    explode(){
        var newAsteroids=[];
        var num=floor(this.radius/this.minAsSize);
        //If the radius ~= to or < 1, then no new Asteroid replaces it
        if(num <= 1){
            //TODO:Draw 'splody particle effect
        }else{
            for(num;num>0;num--){
                    newAsteroids.push(
                        new Asteroid( this.pos,
                                    constrain(floor(2*(this.radius/3)),this.minAsSize,this.maxAsSize),
                                    this.minAsSize,
                                    this.maxAsSize)
                    );
                    
                }
        }
        return newAsteroids;
    }
}