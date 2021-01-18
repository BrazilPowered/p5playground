let marginSize = 50;     //Spinner size = lesser of width|height minus this size

var loadLabelButton;
var labelFile;
var labels    =[];

let maxSpeed =.5;
let maxBrakeSpeed=.1;
let brakeSpeed=.03//.01;

var longest;        //will be set to the length of the longest side of the window
var spinner;
var spinnerSize;
/******************/
let specialControls=true;
var slidersVisualOffset;                     //Add space for sliders @ bottom 
var sliderSlices;                            //CONTROL num of spaces on spinner
var sliderBrakeSpeed;                        //CONTROL speed of spin
var sliderSpeed;                             //CONTROL num of spaces on spinner
var toggleRemoves;                           //CONTROL whether or not to remove a name on click

var slices;   //=10;
let maxSlices=50;
/*****************/
var bgcolor = 220;
var bgimg;        //img for background
//Color dictionary-- apparently these are hrd to make on the fly
let colordict=[
  // R, G  , B
  [200, 200, 200],
  [242, 133, 0  ],
  [213, 255, 0  ],
  [255, 0  , 86 ],
  [158, 0  , 142],
  [14 , 76 , 161],
  [255, 229, 2  ],
  [0  , 95 , 57 ],
  [0  , 255, 0  ],
  [149, 0  , 58 ],
  [255, 147, 126],
  [164, 36 , 0  ],
  [255, 90 , 180],
  [145, 208, 203],
  [98 , 14 , 0  ],
  [107, 104, 130],
  [0  , 0  , 255],
  [0  , 125, 181],
  [106, 130, 108],
  [0  , 174, 126],
  [194, 140, 159],
  [190, 153, 112],
  [0  , 143, 156],
  [95 , 173, 78 ],
  [255, 0  , 0  ],
  [255, 0  , 246],
  [255, 2  , 157],
  [104, 61 , 59 ],
  [255, 116, 163],
  [150, 138, 232],
  [152, 255, 82 ],
  [167, 87 , 64 ],
  [1  , 255, 254],
  [255, 238, 232],
  [254, 137, 0  ],
  [189, 198, 255],
  [1  , 208, 255],
  [187, 136, 0  ],
  [117, 68 , 177],
  [165, 255, 210],
  [255, 166, 254],
  [119, 77 , 0  ],
  [122, 71 , 130],
  [38 , 52 , 0  ],
  [0  , 71 , 84 ],
  [67 , 0  , 44 ],
  [181, 0  , 255],
  [255, 177, 103],
  [255, 219, 102],
  [144, 251, 146],
  [126, 45 , 210],
  [189, 211, 147],
  [229, 111, 254],
  [222, 255, 116],
  [0  , 255, 120],
  [0  , 155, 255],
  [0  , 100, 1  ],
  [0  , 118, 255],
  [133, 169, 0  ],
  [0  , 185, 23 ],
  [120, 130, 49 ],
  [0  , 255, 198],
  [255, 110, 65 ],
  [232, 94 , 190],
  ];

function preload(){
  labels = loadStrings('./assets/names1.txt');
}

function setup() {
  loadLabelButton=createFileInput(loadLabels);
  loadLabelButton.position(20,20);
  //labels.reverse();

  if(labels.length != null && labels.length > 0){
    slices=labels.length;
  }else{
    slices=10;
  }
  if(specialControls){
//    sliderSlices = createSlider(0,maxSlices,slices,1);                          //Default is 2
    sliderSpeed  = createSlider(0.005,maxSpeed,maxSpeed,.005);           //Default speed is
    sliderBrakeSpeed= createSlider(0.005,maxBrakeSpeed,brakeSpeed,.005);        //Default speed is
    toggleRemoves= createCheckbox("Remove Winning Names?",true);        //Default speed is
    slidersVisualOffset=30;
  }else{
    slidersVisualOffset=0;
  }
  var canvas = createCanvas(windowWidth, windowHeight-slidersVisualOffset);
  canvas.mouseClicked(click_event);

  if(width<height){
    spinnerSize=width-marginSize;
    longest=height;
  }else{
    spinnerSize=height-marginSize;
    longest=width;
  }
  spinner=new Spinner(spinnerSize,slices,labels,maxSpeed);
  bgimg=loadImage('./assets/chembg.jpg');
}



function draw() {
  background(bgcolor);
  var scale = 0.8;
  text("Well look at you and your High-def screen! ;)",0,15);
  text("Contact the web Admin for a backgroun to cover this up",0,height-15);

  imageMode(CORNERS);
  //    img     centerX    centerY    
  image(bgimg, width-bgimg.width, height-bgimg.height, width, height);

  stroke(0);
  strokeWeight(1);
  //spinner.slices =sliderSlices.value(); //control num slices with a slider
  spinner.brakerate = sliderBrakeSpeed.value();//control spin braking with a slider
  spinner.maxSpeed  = sliderSpeed.value();
  spinner.draw();
  spinner.spin(); // always spin, though rot speed may == 0

  
}


function click_event(){
  //if(loadLabelButton.mousePressed()){
  //////console.log("here"+ (!spinner.isSpinning())+" "+spinner.rmWinner);
  if(!spinner.isSpinning() && spinner.rmWinner==true){
    console.log(spinner.names);
    console.log(spinner.nearestSliceToPointer());
    spinner.remove(spinner.nearestSliceToPointer());
  }
  if(spinner.isSpinning()){
    spinner.brakes=true;
  }else{
    //TODO: check && skip if clicking over file upload button
    spinner.brakes=false;
    spinner.speed+=0.01;
  }
}

//Looking for a text-only list of names separated by a newline
function loadLabels(file){
  //print(file);  //prints object and contents to console
  bgcolor= floor(random(0,255));
  labels = file.data.split("\n");
  labels.reverse();
  //If the line contains an Asterisk (*) remove it from slices (in case of absences).
  for(i=labels.length-1; i>=0; i--){
    if(labels[i].length <=0 || labels[i].indexOf('*') >= 0){
      labels.splice(i,1);
    }
  }
  labels.unshift("Click to Spin!");
  spinner = new Spinner(spinnerSize,labels.length,labels,maxSpeed,true);
}
