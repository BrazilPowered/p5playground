//TODO: ALOT
var player;
var obstacles=[];

var playerImg;
var grounderImg;
var flyerImg;
var backgroundImg;
var bckgnd;
var bckgndX;

var pathHeight;   //How high on the background does a "path" appear?
var size;
var speed;


function preload(){
    //TODO: use tqwo sprites for player -- allows two collision circles
    //and allows sparite alternation to make feet move
    playerImg   = loadImage( "assets/tinysaurus-glasses.png");
    playerSquatImg=loadImage("assets/tinysaurus-squat.png");
    grounderImg = loadImage( "assets/PMTTYD_Fuzzy_obstacle.png");
    flyerImg    = loadImage( "assets/flyingDino.png");
    backgroundImg=loadImage( "assets/backdrop.jpg");
}

function setup(){
    var canvas = createCanvas(windowWidth, windowHeight);
    size=150;
    speed=16;
    pathHeight=height-225;
    player = new Player(playerImg,playerSquatImg,size,pathHeight,speed);

    bckgnd=[];
    bckgndX=0;
    for(var i=width;i>0;i-=backgroundImg.width)
        bckgnd.push(backgroundImg);
}

function draw(){
    if(obstacles.length < 3){
        if(random(1) < 0.001){
            obstacles.push(new Obstacle(grounderImg,100,pathHeight,speed));
        }else if(random(1) < 0.002){
            obstacles.push(new Obstacle(flyerImg,200,pathHeight-110,speed));
        }
    }

    //background(backgroundImg);
    scrollBackground();

    for(let obstacle of obstacles) {
        if (obstacle.x < -obstacle.size){
            obstacles.splice(0,1);
        }
        obstacle.move();
        obstacle.show();
        if(player.hits(obstacle)){
            console.log ("ohNo!");
        }
    }

    player.move();
    player.show();

    
}

//TODO: make a scrolling background object
function scrollBackground(){
    var totalBckgndWidth=0;
    var imgWidths=width;
    for(var i=0; i<bckgnd.length; i++){
        let img = bckgnd[i];
        image(img,bckgndX+(i*imgWidths),0,imgWidths,height);
        totalBckgndWidth+=imgWidths;
    }
    if(bckgndX < -imgWidths){
        totalBckgndWidth-=imgWidths;//subtract width from total width
        bckgndX+=imgWidths;//set X to current x of next element
        bckgnd.splice(0,1); //and remove that first element
    }
    
    if(totalBckgndWidth+bckgndX < width){
        console.log("new");
        bckgnd.push(backgroundImg); //Add more background to scroll to.
    }
    bckgndX-=speed/8;
}

function keyPressed(){
    if(key == ' '){
        player.jump();
    }
    if(keyCode === CONTROL){
        player.squat();
    }
    
}

function keyReleased(){
    if(keyCode === CONTROL){
        player.unSquat();
    }
    return false;
}