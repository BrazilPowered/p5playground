
var size=20;
var maxSpeed=10;
var score=0;
//Game Pieces
var ship;
var projectiles=[];
var maxFiringRange;
var asteroids=[];
let minAsSize=10;
let maxAsSize=50;
var difficulty=1;   //sets the number of starting Asteroids above default the base 5
let gameOver=false; //When true, game will pause (noLoop), then re-setup in the next loop;

function setup(){
    createCanvas(windowWidth,windowHeight);
    background(51);
    gameOver=false;
    score=0;
    ship=new Ship(size,maxSpeed);
    asteroids=generateAsteroids();
    //Firing Range is half the shortest screen dimension
    if(width>height){
        maxFiringRange=height/2;
    }else{
        maxFiringRange=width/2;
    }
    difficulty=1;
}

function draw(){
    if(gameOver){
        setup();
    }
    background(51);
    fill(255);
    for(i=asteroids.length-1;i>=0;i--){
        scoobyAtEdge(asteroids[i]);
        asteroids[i].move();
        asteroids[i].render();
        //console.log("V4a"+i+": "+asteroids[i].vertices);
        if(ship.hits(asteroids[i])){
            asteroids[i].render(true);
            endGame();
            continue;
        }
    }
    //TODO: SCOOBY Projectiles without breaking maxFiringRange
    for(i=projectiles.length-1;i>=0;i--){
        projectiles[i].update();
        projectiles[i].render();

        for(j=asteroids.length-1;j>=0;j--){
            if(projectiles[i].hits(asteroids[j])){
                //console.log("boom baby");
                score+=ceil(maxAsSize/asteroids[j].radius);
                asteroids=asteroids.concat(asteroids[j].explode());
                //console.log(asteroids);
                asteroids.splice(j,1);
                break;
            };
        }
        if(projectiles[i].pos.dist(ship.pos)>projectiles[i].firingRange){
            projectiles[i].live=false;
        }
        if(!(projectiles[i].live)){
            projectiles.splice(i,1);
        }
    }

    scoobyAtEdge(ship);
    ship.turn();
    ship.render();
    scoobyAtEdge(ship);
    text("Level: "+difficulty+"   Score:"+score, width/2, 10);

    if(asteroids.length<=0){
        difficulty++;
        score+=500;
        asteroids=generateAsteroids();
    }
}

//gamerules
function endGame(){
    noLoop();
    console.log("OH NO DIED!");
    console.log("Score: "+score);
    gameOver=true;
}

//make an array of Asteroids. Defaults to difficulty level +5
function generateAsteroids(num){
    if(num==null){
        num=difficulty;
    }
    num+=4;//So there are always at least 5 Asteroids from default level 1
    var asteroids=[];
    for(i=0;i<num;i++){
        asteroids.push(new Asteroid(0,0,minAsSize,maxAsSize));
    }
    //console.log(asteroids);
    return asteroids;
}

//At edge of canvas, magically come out other side like scooby-doo in a hotel chase
function scoobyAtEdge(obj){
    //obj radius is used to fully hide obj before flipping coords
    if(obj.pos.x>width+obj.radius){              //right
        obj.pos.x= -obj.radius;
    }else if(obj.pos.x+obj.radius<0){ //left
        obj.pos.x=width;
    }
    if(obj.pos.y>height+obj.radius){             //bottom
        obj.pos.y= -obj.radius;
    }else if(obj.pos.y+obj.radius<0){ //top
        obj.pos.y=height;
    }
}

//TODO: Let user hold-down key -- as upgrade?
function keyPressed(){
    loop();
    //TODO: Make the turning MUCH more fine
    if(keyCode===RIGHT_ARROW){
        ship.setRotation( 0.1);
    }else if(keyCode===LEFT_ARROW){
        ship.setRotation(-0.1);
    }
    if(keyCode===UP_ARROW){
        ship.engageThrottle();
    }
    if(key===' '){
        //TODO: Subtract 1 point when firing a bullet
        projectiles.push(new Projectile(ship.pos,
                                        p5.Vector.fromAngle(ship.heading),
                                        maxFiringRange,
                                        ship.radius));
    }
    if(keyCode===ENTER){
        console.log("Score: "+score);
    }
}

function keyReleased(){
    if(keyCode===LEFT_ARROW){
        if(keyIsDown(RIGHT_ARROW))
            ship.setRotation( 0.1);
        else
            ship.setRotation(0);
    }
    else if (keyCode===RIGHT_ARROW ){
        if(keyIsDown(LEFT_ARROW))
            ship.setRotation(-0.1);
        else
            ship.setRotation(0);
    }
    if(keyCode===UP_ARROW){
        ship.releaseThrottle();
    }
}