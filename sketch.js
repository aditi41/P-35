var balloon;
var bg;
var b1,b2;

function preload(){

  bg = loadImage ("Hot Air Ballon-01.png");
  b1 = loadImage ("Hot Air Ballon-02.png");
  b2 = loadAnimation ("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png");

}

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(1250,550);
  balloon = createSprite(200, 400, 50, 50);
  balloon.addImage(b1);
  balloon.scale=0.6;

  var balloonPosition = database.ref('balloon/position');
  balloonPosition.on("value",readPosition, showError);

}

function draw() {
  background(bg); 
  
  if(keyDown(LEFT_ARROW)){
    writePostion(-1,0);
    balloon.addAnimation(b2);
}
  else if(keyDown(RIGHT_ARROW)){
    writePostion(1,0);
    balloon.addAnimation(b2);
}
  else if(keyDown(UP_ARROW)){
    writePostion(0,-1);
    balloon.addAnimation(b2);
}
  else if(keyDown(DOWN_ARROW)){
    writePostion(0,+1);
    balloon.addAnimation(b2);
}
  
  drawSprites();
}

function writePostion(x,y){
database.ref('balloon/position').set({

'x' : position.x + x,
'y' : position.y + y,

})


}


function readPosition(data){
position = data.val();
console.log(position.x);
balloon.x = position.x;
balloon.y = position.y;

}

function showError(){

console.log("error in the writing to the database ");

}