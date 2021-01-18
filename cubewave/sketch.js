var angle=0;
size=60;
let greatColumns=[];
let magicAngle;
let maxW;
let maxH;

function setup(){
  let canvas = createCanvas(windowWidth,windowHeight,WEBGL);
  frameRate(30);
  rectMode(CENTER);
  magicAngle=atan(1 / sqrt(2));
  
  maxW=width/2;
  maxH=height/2;
  
  /*shift the great columns to match centered coord translation
  for(i=0;i<width/size;i++){
    append(greatColumns, new GreatColumn((i*size),0,size,0));
    greatColumns[i].xShift=-1*((maxW)-(size/2));
    }
  }*/
  
  //shift the great columns to match centered coord translation
  for(i=0;i<width/size;i++){
    append(greatColumns, []);
    for(j=0;j<height/size;j++){
      append(greatColumns[i], new GreatColumn((i*size),(j*size),size,0));
      greatColumns[i][j].xShift=-1*((maxW)-(size/2));
    }
  }
}

function draw(){
  background(155,155,250);
  
  //make it look fun with orthographic projection
  ortho(-500, 800, -600, 500, -100, 1000);
  directionalLight(200,200,255,0,-1,0);
  //let d = dist(0,0, maxW,maxH);
  
  //translate default coordinates to the center of the canvas
  translate(-maxW-size/2,0,0);//-maxH-size/2,0);
  
  rotateX(-PI/5);
  rotateY(magicAngle);
  
  //add an offset to each column's angle for a wave effect
  let offset=0;
  for(z=0; z<greatColumns.length;z++){
    translate(0,0,size);//-maxH-size/2,0);
    for(x=0; x<greatColumns[z].length; x++){
      let d = dist(greatColumns[z][x].x,greatColumns[z][x].y,maxW,maxH);
      let offset=map(d,0,maxH,-PI,PI);
      let a=angle+offset;
      //map sine func values to a palpable length
      let h=floor(map(sin(a),-1,1,200,550));
      translate(size,0,0);
      normalMaterial();
      greatColumns[z][x].height=h;
      greatColumns[z][x].display();
    }
    translate(-(size*greatColumns[z].length),0,0);
  }
  angle -= 0.15;
}


class GreatColumn{
  constructor(x,y,w,h){
    this.width=w-2;
    this.height=h;
    this.x=x;
    this.y=y;
    this.xShift=0;
  }
  display(){
    //rect(this.x+this.xShift,this.y,this.width,this.height);
    box(this.width,this.height,this.width);
  }
  toString(){
    return "\n------------"+
           "\nX:      "+this.x+
           "\nY:      "+this.y+
           "\nWidth:  "+this.width+
           "\nHeight: "+this.height+
           "\n------------";
  }
}
