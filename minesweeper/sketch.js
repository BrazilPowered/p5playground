var columns;
var rows;
var cellSize=80;
var grid;
var totalSurprises;
var successfullyFlagged;

//standard text sizes
var textLarge=32;
var textMed  =24;
var textSmall=16;
var textTiny =8;


function setup(){
    var canvas = createCanvas(windowWidth-windowWidth%cellSize, windowHeight-windowHeight%cellSize);
    columns= (width/cellSize);
    rows   = (height/cellSize);
    grid = make2DArray(columns, rows);
    for(var i = 0;i<grid.length;i++){
        for(var j = 0; j<grid[i].length; j++){
            // Adding +(cellSize/2) so the rectMode(CENTER) draws on screen where we expect non-center to
            grid[i][j] = new Cell((i*cellSize)+(cellSize/2),(j*cellSize)+(cellSize/2),cellSize);
        }
    }
    totalSurprises=3;
    totalFlagged=0;
    successfullyFlagged=0;


    scatterSurprises(totalSurprises);
}

function draw(){
    background(42);
    grid.forEach( function(col){
        col.forEach( cell => {
            cell.show();
        });
    });
    console.log(successfullyFlagged+" "+totalFlagged+" "+totalSurprises)

    if(successfullyFlagged==totalSurprises && successfullyFlagged==totalFlagged){
        gameOver(true);
    }
}

/////////Game Rules/////////
function keyPressed(){
    if(keyCode === ENTER){
        setup();
        loop();
    }
}

function mousePressed(){

    var x=floor(getIndexFromCellCoords(mouseX+(cellSize/2)));
    var y=floor(getIndexFromCellCoords(mouseY+(cellSize/2)));
    var cell=grid[x][y];
    if(keyIsPressed && key== ' '){
        if(cell.isFlagged() && cell.surprise !=null){
            successfullyFlagged--;
        }
        
        
        if(cell.flag()){
            totalFlagged++;
        }else{
            totalFlagged--;
        }

        if(cell.isFlagged() && cell.surprise !=null){
            successfullyFlagged++;
        }
    }else if(cell.isFlagged()){
        //TODO: do nothing... maybe flash some color?
    }else{
        reveal(cell);

        console.log(cell.surprise);

        if(cell.surprise != null){
            gameOver(false);
        }
    }
/*
    grid.forEach( function(col){
        col.forEach( cell => {
            if (cell.contains(mouseX,mouseY)){
                reveal(cell);
                console.log("CELL: "+getIndexFromCell(cell))
            }
        });
    });
*/
}

//status is bool; 0 for lose, 1 for win
function gameOver(status){
    grid.forEach( function(col){
        col.forEach( cell => {
            cell.reveal();
            })
        });
    push();
    rectMode(CENTER);
    textAlign(CENTER);
    textSize(textLarge);
    rect(width/2,height/2,textLarge*18,textLarge*4,8);
    fill(0);
    if(status){
        text("You're a winner!!!!!!! =D",width/2,(height/2)-textLarge);
        textSize(textSmall);
        text("But that's no surprise...",width/2,height/2);
    
    }else{
        text("Oh Noes!!!!!!! X_X",width/2,(height/2)-textLarge);
        textSize(textSmall);
        text("You hit a pretty bad surprise...",width/2,height/2);
    }
    textSize(textMed);
    text("Hit Enter to try again.",width/2,(height/2)+textLarge+textMed);
    pop();
    
    noLoop();
}

///////////TODO: make a class for the grid
function scatterSurprises(num){
    for(i=num;i>0;i--){
        var x,y;
        do{ x=floor(random(grid.length-1));
            y=floor(random(grid[x].length-1));
        }while (grid[x][y].surprise != null);
        grid[x][y].surprise = true;
        alertNeighborCells(x,y);
    }
}

function alertNeighborCells(x,y){
    var neighbors=findNeighborCells(x,y);
    neighbors.forEach( pair => {
        grid[pair[0]][pair[1]].proximityAlert();
    })
}

//returns an array of [x,y] pairs of valid neighbor cells
//OPTIONAL cross-> Bool => 
//if true, returns neighbors from cardnial directions(up,down,left,right)
//if false or blank (null), returns complete list in a 1-layer square around cell
function findNeighborCells(x,y,ord){
    var validNeighbors=[];                      //store all neightbors here
    for(var i = x-1; i <= x+1; i++){            //for x-1 through x+1
        if(i<0 || i>= grid.length){             //skip all cells ouside grid array indices
            continue;   
        }else{                                  //else if within grid bounds:
            for(var j = y-1; j <= y+1; j++){        //for y-1 through y+1
                if(j<0 || j>=grid[x].length         //skip all cells outside grid array indices
                    || (j==y && i==x)) {            //...& this cell itself
                    continue;
                }else if(ord && i!=x && j!=y){      //if ordinal, also exclude all four
                    continue;                       //corner neighbors
                }else{
                    validNeighbors.push([i,j]);     //If here, add this valid (or ordinal) neighbor
                }
            }
        }
    }
    return validNeighbors;
}


function reveal(cell){
    var ordinal=true;                           //make this false to use ALL 8 neighbors vs NSEW
    cell.reveal();
    if(cell.proximity == 0 && !cell.surprise){
        //uncover valid 0-labelled neighbors
        xy=getIndexFromCell(cell);
        var neighbors=findNeighborCells(xy[0],xy[1],ordinal);
        neighbors.forEach(pair =>{
            var neighbor=grid[pair[0]][pair[1]];
            if(neighbor.revealed==false && !neighbor.isFlagged()){
                reveal(neighbor);
            }
        })
    }
}

function getIndexFromCell(cell){
    var x = getIndexFromCellCoords(cell.x,cell.size);
    var y = getIndexFromCellCoords(cell.y,cell.size);
    //console.log(x+" "+y);

    return [x,y];
}

//returns the expected Array-index value for a given x OR y coordinate & standard cell size
function getIndexFromCellCoords(xORyCoord,csize){
    if(csize == null){
        csize=cellSize;//could also check size of first cell in grid as a default
    }
    return (xORyCoord-(csize/2))/csize;
}



/////////////UTILITIES//////////////
//returns a 2D-array of cols x rows
function make2DArray(cols, rows){
    var array = new Array(cols);
    for(var i = 0;i<array.length;i++){
        array[i] = new Array(rows);
    }
    return array;
}