class Ball {
  
  constructor(){
    this.x = random(50,width-50);
    this.y = random(50,height-50);
    this.size = random(10,50);
    this.color = color(random(0,255),random(0,255),random(0,255));
  }
  
  show(){
   
    noStroke();
    fill(this.color)
    ellipse(this.x, this.y, this.size, this.size)
    
  }
  
  move(){
    this.x = this.x + random(-2,2);
    this.y = this.y + random(-2,2);
    
  }
  
  clicked(mX, mY){
    
    var loc = dist(mX, mY,this.x,this.y);
    
    if(loc < this.size){
      console.log("loc"+ Math.round(this.size))
      return true;
    }
    else{
      return false;
    }
      
    
  }
}


var balls = [];
var score = 0;
var count = 10;
var gameState = "play";
var gradient, board;

function preload(){
  
  gradient = loadImage("gradient.png");
  board = loadImage("board.png")
  
}

function setup() {
  createCanvas(400,400);
  
  for(var i = 0; i< 20; i++){
    
    var ball = new Ball();
    balls.push(ball);
  }
  

}

function draw() {
  background(gradient);
  
   fill("black")  
   textSize(25);
   text("Score: "+ score,100,20)
   //text(mouseX +"," + mouseY,mouseX, mouseY);
  
   text("timer: "+ count, 250,20);
  
  if(gameState === "play"){
  
    for(var i = 0; i< balls.length; i++){

      balls[i].show();
      balls[i].move();
    }

    // timer
    console.log(frameCount);

    if(frameCount % 20 ===0){
      count--;
    }
    
    if(count === 0){
      gameState = "end";
    }
 
  } else if(gameState === "end"){
    background(board);
    textSize(30);
    
    text("Your score: "+score,120,50);
    
    text("Game Over", 120,200);
    
    
    fill("blue");
    text("Press 'R' to restart", 100,240);
    
  }
 
   
}


function mousePressed(){
  
  for (var i = balls.length - 1; i >= 0; i--) {
    if (balls[i].clicked(mouseX, mouseY)) {
      
      console.log(balls[i].size)
      
      if(balls[i].size <= 12){
        score = score +5;
      }      
      else{
        score++;
      }
      balls.splice(i, 1);
     
    }
  }
}

function keyPressed(){
  
  if(gameState === "end" && keyCode === 82){
    gameState = "play";
    score = 0;
    count =10;
  }
}

      

 

 
  
