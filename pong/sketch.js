
var puck;
var paddleLeft;     //Paddle Object on Left
var paddleRight;    //Paddle Object on Right
var paddleWidth;    //How much space behind paddle center to goal?
var LeftGoalLine;      //xPosition of Left Goal
var rightGoalLine;     //xPosition of Right Goal
var paddlesSpeeed;  //How fast should the paddle move on any key press?
var puckSpeed;      //puck speed
var scoreSize;       //How big should the score appear?

//sounds
var hoorayStart;
var bloop;
var winningSound;

function preload(){
    //sounds
    soundFormats('mp3');
    hoorayStart = loadSound("assets/HoorayStart");
    hoorayStart.playMode("untilDone");
    bloop       = loadSound("assets/bloop");
    winningSound= loadSound("assets/Success_Glockenspiel");
}

function setup(){
    var canvas = createCanvas(windowWidth, windowHeight);
    puckSpeed=0;
    puck=new Puck(puckSpeed);
    paddleWidth  = 24;
    paddleLeft = new EdgePaddle("LEFT");
    paddleRight= new EdgePaddle("RIGHT");
    paddlesSpeed=8;
    scoreSize=48;

}

function draw(){
    background(51);
    puck.update();

    paddleLeft.move();
    paddleRight.move();
    paddleLeft.show();
    paddleRight.show();
    puck.show();

    if(puck.hits(paddleLeft)){
        paddleLeft.reflect(puck);
        puck.vel.setMag(puck.speed+paddleLeft.score);
    }else if (puck.hits(paddleRight)){
        paddleRight.reflect(puck);
        puck.vel.setMag(puck.speed+paddleLeft.score);
    }

    
    //TODO: add a max score for game win/game-over
    if(puck.isScoring()){
        if(puck.pos.x < puck.diameter){//is on Left side
            paddleRight.score++;
        }
        else if(puck.pos.x > width-puck.diameter){    //is on Right side
            paddleLeft.score++;
        }
        puck.reset();
    }

    fill(255);
    textSize(scoreSize)
    text(paddleLeft.score,width/2-scoreSize*2,scoreSize);
    text(paddleRight.score,width/2+scoreSize*2,scoreSize)

}

function keyPressed(){
    if(keyCode===UP_ARROW){
        paddleRight.ySpeed= -paddlesSpeed;
    }else if(keyCode===DOWN_ARROW){
        paddleRight.ySpeed= paddlesSpeed;
    }
    if(key == 'w'){
        paddleLeft.ySpeed= -paddlesSpeed;
    }else if(key == 's'){
        paddleLeft.ySpeed= paddlesSpeed;
    }
}

function keyReleased(){
    
    if(keyCode===UP_ARROW){
        if(keyIsDown(DOWN_ARROW)){
            paddleRight.ySpeed=paddlesSpeed;
        }else{
            paddleRight.ySpeed=0;
        }
    }
    if(keyCode===DOWN_ARROW){
        if(keyIsDown(UP_ARROW)){
            paddleRight.ySpeed= -(paddlesSpeed);
        } else{
            paddleRight.ySpeed=0;
        }   
    }

    keyW = 87; //key code for the letter w for KeyIsDowm
    keyS = 83; //key code for the letter s for KeyIsDowm

    if(key=='w'){
        if(keyIsDown(keyS)){
            paddleLeft.ySpeed=paddlesSpeed;
        }else{
            paddleLeft.ySpeed=0;
        }
    }
    if(key=='s'){
        if(keyIsDown(keyW)){
            paddleLeft.ySpeed= -(paddlesSpeed);
        } else{
            paddleLeft.ySpeed=0;
        }   
    }

}

function mouseReleased(){
    setup();
    //workaround so song will play before first play round...
    //we have to both set puck speed AND reset it for vel to work
    puck.speed=10;
    puck.reset();
    hoorayStart.play();
}