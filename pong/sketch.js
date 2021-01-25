
var puck;
var paddleLeft;     //Paddle Object on Left
var paddleRight;    //Paddle Object on Right
var paddleWidth;    //How much space behind paddle center to goal?
var LeftGoalLine;      //xPosition of Left Goal
var rightGoalLine;     //xPosition of Right Goal
var paddlesSpeeed;  //How fast should the paddle move on any key press?
var puckSpeed;      //puck speed
var scoreSize;       //How big should the score appear?
var scoreToWin;
var scoreSlider;    //controls how many points to win

//standard text sizes
var textLarge=32;
var textMed  =24;
var textSmall=16;
var textTiny =8;

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
    winningSoundLeft = loadSound("assets/Success_Glockenspiel");
    winningSoundRight= loadSound("assets/coin_double_trill");
}

function setup(){
    var canvas = createCanvas(windowWidth, windowHeight);
    puckSpeed=0;
    puck=new Puck(puckSpeed);
    //paddleWidth  = 24;
    paddleLeft = new EdgePaddle("LEFT");
    paddleRight= new EdgePaddle("RIGHT");
    paddlesSpeed=8;
    scoreSize=48;
    scoreToWin=20;
    //TODO: Make it so the window isn't sliding up and down because of slider
    scoreSlider = createSlider(1,50,scoreToWin,1); 
}

function draw(){
    background(51);
    puck.update();

    paddleLeft.move();
    paddleRight.move();
    paddleLeft.show();
    paddleRight.show();
    puck.show();

    //TODO: allow puck to reflect off paddle if ANY part of puck radius touches paddle top.
    if(puck.hits(paddleLeft)){
        paddleLeft.reflect(puck);
        puck.vel.setMag(puck.speed+paddleRight.score);
    }else if (puck.hits(paddleRight)){
        paddleRight.reflect(puck);
        puck.vel.setMag(puck.speed+paddleLeft.score);
    }

    
    //TODO: add a max score for game win/game-over
    if(puck.isScoring()){
        if(puck.pos.x < puck.diameter){//is on Left side
            paddleRight.score++;
            winningSoundRight.play();
        }
        else if(puck.pos.x > width-puck.diameter){    //is on Right side
            paddleLeft.score++;
            winningSoundLeft.play();
        }
        puck.reset();
    }

    fill(255);
    textSize(scoreSize)
    text(paddleLeft.score,width/2-scoreSize*2,scoreSize);
    text(paddleRight.score,width/2+scoreSize*2,scoreSize);
    
    scoreToWin=scoreSlider.value();
    tryToWin();
}

function tryToWin(){
    if(paddleLeft.score >= scoreToWin){
        showWinner(paddleLeft);
    }else if ( paddleRight.score >= scoreToWin ){
        showWinner(paddleRight);
    }//else do nothing
}

function showWinner(paddle){
    push();
    rectMode(CENTER);
    textAlign(CENTER);
    textSize(textLarge);
    rect(width/2,height/2,textLarge*18,textLarge*4,8);
    fill(0);
    text("Winner: YOU!!!!!",width/2,(height/2)-textLarge);
    textSize(textSmall);
    text("(on the "+paddle.edge.toLowerCase()+")",width/2,height/2);
    textSize(textMed);
    text("Click for a new game",width/2,(height/2)+textLarge+textMed);
    pop();
    var winnerSound;
    if(paddle.edge == "RIGHT"){
        winnerSound=winningSoundRight;
    }else if(paddle.edge == "LEFT"){
        winnerSound=winningSoundLeft;
    }
    //TODO: Add some fanfare sound or play the winner sound 3x
    winnerSound.play();
    

    noLoop();

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
    hoorayStart.play();
    loop();
    //workaround so song will play before first play round...
    //we have to both set puck speed AND reset it for vel to work
    puck.speed=15;
    puck.reset();
    paddleRight.score=0;
    paddleLeft.score=0;
}