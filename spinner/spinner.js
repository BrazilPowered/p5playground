class Spinner{
    constructor(size,slices,names,maxSpeed,rmWinner){
        this.diameter=size;                         //How big to appear on screen

        this.position=0;                            //Where slice #1 is pointing in radians
        this.speed=0;                               //how quickly to instantaneously adjust pos
        if(maxSpeed > 0){
            this.maxSpeed=maxSpeed;                 //fastest to move while spinning
        }

        this.pointerX= (this.diameter/2)-10;        //How wide (height/2) should the pointer be
        this.pointerY=0;                            //Where is the centerline for the pointer

        //Do we want to slow down & stop?
        this.brakes=false;                          //Full spin (false), or slow down(true)?
        this.brakerate=0.02;                        //lerp step value for slowing spin




        //optional: names
        if(names != null && names.length != null && names.length>0){
            this.names=names;                       //Should be an array of strings
            this.slices=names.length;               //slices with string labels
            this.textSize=floor(100/(this.slices/3.5)); //math magic to fit text nicely in slices
            //console.log(this.textSize);                 
            this.colors= this.newColors(this.names.length);// specific colors for each slice.
        }else{
            this.slices  =slices;                   //no string-labeled slices
            this.names = null;
            this.colors= null;
        }

        this.innerSliceAngle=this.calcSliceInnerAngle();
        this.arcLength=this.calcArcLength();
        ///TODO:Make function to add new slices && reset arcLength;

        //For removing winner on each new Spin
        if (rmWinner == true){
            this.rmWinner = true;
        }else{
            this.rmWinner = false;
        }
        this.toRemove = null;

    }
    calcSliceInnerAngle(){
        return (2*PI)/this.slices;
    }

    calcArcLength(){
        var r = this.diameter/2;//radius

        return r*this.innerSliceAngle;
    }

    calcSliceEdgeLength(){
        var r = this.diameter/2;//radius
        console.log(this.innerSliceAngle);

        return r*sqrt(2-(2*cos(this.arcLength/r)));
    }


    draw(){
        push();
        translate(width/2,height/2);
        fill(255);
        stroke(0);
        this.drawSliceBody();
        this.drawPointer();
        pop();
    }

    newColors(total){
        let slicecolors=[];
        for(var i =0; i<total; i++){

            slicecolors.push(colordict[i]);
        }
        return slicecolors;
        /*[200, 30, 60]
        [29, 172, 236]
        [143, 38, 212]
        [118, 222, 4]
        [250, 250, 10]
        [252, 117, 13]
        [24, 165, 68]
        [126, 162, 231]*/
    }

    isSpinning(){
        // The second two are to stop an infinitesimat infinite spin rate
        if(this.speed == 0 || (this.speed < 0.0001 && this.speed > -0.0001)){
            //should end infinite lerp calulation...but doesn't?
            this.speed=0;
            this.brakes=0;

            /*******Inlcude if you want a box showing winner when spinner stops******/
            //this.drawWinner(true);
            //console.log("winner!")

            /*******Inlcude if you want the winner to disappear when spinner starts again******/
            //this.drawWinner(true);
            //console.log("winner!")

            return false;
        }//else
        //console.log("speed:"+this.speed);
        return true;
    }

    /******Used to draw a box showing the selected winner *******/
    drawWinner(showColorBool){
        var winner=this.nearestSliceToPointer();
        var x = width/4;
        var y = -height/2;
        var w = x;
        var h = height/8;
        var fontSize=32;
        push();
        if(showColorBool != null){
            fill(this.colors[winner]);
        }else{
            fill(200);
        }
        //rectMode(CENTER);
        rect(x, y, w, h, 20);
        textSize(fontSize);
        textAlign(CENTER);
        stroke(0);
        strokeWeight(5);
        text(this.names[winner],x+(w/2),y+(h/2)+(fontSize/3));
        pop();
    }

    spin(){
        //run the code first so we can draw the winner 
        if(this.isSpinning()){
            if(this.brakes){
                this.speed=lerp(this.speed,0,this.brakerate);
            }else{
                this.speed=lerp(this.speed,this.maxSpeed,0.01);
            }
        }
        this.position+=this.speed;
        //console.log(this.position);
        if( this.position> 2*PI || this.position < -2*PI )
        this.position = this.position%(2*PI);
        
    }

    drawSliceBody(){
        var winner = this.nearestSliceToPointer();
        //One Push State to  Rotate  the Spinner body
        push();
        //One Push State to  DRAW  the Spinner body
        push();
        rotate(this.position);
        //One Push State to  DRAW  the Spinner body
        push();
        fill(255);
        //Arrow pointing to far Right slice, [(edge,0),(edge+x,y),(edge+x,-y)]
        var radius = this.diameter/2;
        var triangleEdgeLength= this.calcSliceEdgeLength();
        for(var i=0;i<this.slices;i++){
            if(i==winner){
                fill(255);

            }else{
                fill(this.colors[i]);
            }
            triangle(0,0,
                        radius,triangleEdgeLength/2,
                        radius,-(triangleEdgeLength/2)
                        );
            fill(0);
            
            var label=i;
            if(this.names !=null && this.names[i]!=null){
                //divide by 3 aligns this vertically in the triangle
                label=this.names[i];
            }//else label will just be i, the number of this slice


            /**Consistently sized labels *
            textSize(this.textSize);
            text(label,0+this.textSize*2.5,this.textSize/3);
            /**************************  */
            
            /**Dynamically sized Labels  */
            var sizing=triangleEdgeLength/radius;
            textSize(floor(triangleEdgeLength/((label.length+1)*sizing)));
            textAlign(RIGHT);
            text(label,radius-this.textSize,this.textSize/3);
            /**************************  */

            rotate(-this.innerSliceAngle);
        }
        pop();
        pop();

        /*******Inlcude if you want a box showing a zoom in of who is 'winning'******/
        //this.drawWinner();
    }

    nearestSliceToPointer(){
////HERER
        //Find which one is pointed to before rotations/transformations
        var winner=floor((this.position+(this.innerSliceAngle/2))/this.innerSliceAngle);
        //Our math trick means th last half of the highest index will be out of range
        //it SHOULD loop around back to the first index
        //this is a wrokaround to pretend this linear array is circular
        if(winner >= this.slices){
            winner %= this.slices;
        }
        //console.log("Nearest slice: "+winner);
        return winner
    }


    drawPointer(){
        //Arrow pointing to far Right slice, [(edge,0),(edge+x,y),(edge+x,-y)]
        var rightEdgeOfCircle = this.diameter/2;
        var triangleEdgeLength= this.diameter/8;
        triangle(rightEdgeOfCircle-10,0,
                    rightEdgeOfCircle+triangleEdgeLength,triangleEdgeLength/2,
                    rightEdgeOfCircle+triangleEdgeLength,-(triangleEdgeLength/2)
                    );
    }
    

////////////////////////////

    drawCircleBody(){
        //Draw the Spinner body
        push();
        ellipseMode(CENTER);
        //circle(0,0,this.diameter);
        noStroke();
        rotate(this.position);
        //Draw the Spinner body
        beginShape();
        for(var i=0; i<this.slices;i++){
            var angle = map(i,0,this.slices,0,TWO_PI);

            var r= this.diameter/2;
            var x= r*cos(angle);
            var y= r*sin(angle);
            vertex(x,y);
            //curveVertex(x,y);
        }
        //the constant "CLOSE" will make sure the final two points connect
        endShape(CLOSE);
        pop();
    }
    
    //removes a slice & associated 
    remove(slice){
        this.names.splice(slice,1);
        this.colors.splice(slice,1);
        this.slices = this.names.length;
        this.innerSliceAngle=this.calcSliceInnerAngle();
        this.arcLength=this.calcArcLength();

    }
}