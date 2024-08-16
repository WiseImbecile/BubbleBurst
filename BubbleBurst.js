var circles = [];
var canvas, pen, canvasColor;
var radius = 10;
var totalCircles = 0;
var click_hard = false;
var click_moderate = false;
var click_easy = false;
var click_impossible = false;
var IntervalID;
var IntervalID2;
var x1;
var x = 200; 
var y =250;
var y1=0;
var stopRec = false;
var IntervalID3;
var IntervalID4;
var IntervalID5;
var burstCount = 0;
var sum = 0;
var elapsedTime=0;

window.onload = function(){

  startGame();
  // clickEasy();
  }

function animate() {
  wipeScreen();
  update();
  createRectangle();
  collisionDetection();
  escaped();
  
}

function clickEasy(){
  document.getElementById('easy').click();
}

function buttons_disappear(){
  document.getElementById("easy").style.visibility = "hidden";
  document.getElementById("easy_text").innerHTML = "";

  document.getElementById('moderate').style.visibility = "hidden", innerHTML = " ";
  document.getElementById("moderate_text").innerHTML = "";

  document.getElementById('hard').style.visibility = "hidden";
  document.getElementById("hard_text").innerHTML = "";

  document.getElementById('impossible').style.visibility = "hidden"; innerHTML = " ";
  document.getElementById("impossible_text").innerHTML = "";
}

function startGame() {
  
  //if(difficulty == 1){
  // clickEasy()
  //}
  // animate()
  canvas = document.getElementById('myCanvas');
  pen = canvas.getContext('2d');
  canvasColor = '#EAEDDC';

  
  // IntervalID5 = setInterval(updateTimer,50);
  // IntervalID2 = setInterval(createCircleWithDelay, 2000);         // Create a new circle every 2 seconds
  //IntervalID = setInterval(animate, 200);

  }

function easy() {

  
  if (click_easy == false) {
    
    
    buttons_disappear();
    click_easy = true;
    click_moderate = false;
    click_hard = false;
    click_impossible = false;
    
    //window.location.reload();
    canvas = document.getElementById('myCanvas');
    pen = canvas.getContext('2d');
    canvasColor = '#EAEDDC';
    
    clearInterval(IntervalID)
    clearInterval(IntervalID2)
    IntervalID2 = setInterval(createCircleWithDelay, 2000);         // Create a new circle every 2 seconds
    IntervalID = setInterval(animate, 200);
    IntervalID5 = setInterval(updateTimer,50);
  }
  
  

}

function moderate (){

  
  if (click_moderate == false){
  buttons_disappear();
  click_moderate= true;
  click_hard = false;
  click_easy = false;
  click_impossible = false;

  //window.location.reload();
  canvas = document.getElementById('myCanvas');
  pen = canvas.getContext('2d');
  canvasColor = '#EAEDDC';

  clearInterval(IntervalID)
  clearInterval(IntervalID2)
  IntervalID2=setInterval(createCircleWithDelay, 2000); // Create a new circle every 2 seconds
  IntervalID=setInterval(animate, 100);
  IntervalID5 = setInterval(updateTimer,50);
  }
}

function hard (){

  
  canvas = document.getElementById('myCanvas');
  pen = canvas.getContext('2d');
  canvasColor = '#EAEDDC';
  
  if(click_hard == false) {
    //window.location.reload();
    
    buttons_disappear();
    clearInterval(IntervalID)
    clearInterval(IntervalID2)
    IntervalID2 = setInterval(createCircleWithDelay, 1000); // Create a new circle every 1 seconds
    IntervalID=setInterval(animate, 50);
    IntervalID5 = setInterval(updateTimer,50);
  }

  click_hard = true;
  click_moderate= false;
  click_easy= false;
  click_impossible = false;
}

function impossible (){
  if(click_impossible == false){

    buttons_disappear();
    //window.location.reload(true);
    canvas = document.getElementById('myCanvas');
    pen = canvas.getContext('2d');
    canvasColor = '#EAEDDC';
      
    clearInterval(IntervalID)
    clearInterval(IntervalID2)
    IntervalID2= setInterval(createCircleWithDelay, 250); // Create a new circle every 1 seconds
    IntervalID=setInterval(animate, 25);
    IntervalID5 = setInterval(updateTimer,50);
  }

  click_hard = false;
  click_moderate= false;
  click_easy= false;
  click_impossible = true;


}

function drawCircle(x1, y1, color) {
  pen.beginPath();
  pen.arc(x1, y1, radius, 0, 2 * Math.PI);
  pen.strokeStyle = color;
  pen.stroke();
  pen.fillStyle = color;
  pen.fill();
}

function getRandomColor() {
  var randomRed = Math.floor(Math.random() * 256);
  var randomGreen = Math.floor(Math.random() * 256);
  var randomBlue = Math.floor(Math.random() * 256);
  return `rgb(${randomRed},${randomGreen},${randomBlue})`;
}

function createCircleWithDelay() {
  if (totalCircles < 100) {
    createCircle();
  }
}

function createCircle() {
  var x1 = Math.random() * (canvas.width - 2 * radius) + radius;
  var color = getRandomColor();
  circles.push({ x1: x1, y1: 0, color: color, active: true }); // Adds properties to each object in array
  totalCircles++;
}

function update() {
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];
    
    if (circle.active) {
      drawCircle(circle.x1, circle.y1, circle.color);
      circle.y1 += 10;

      if (circle.y1 > canvas.height) {
        circle.active = false;
      }
    }
  }
}

function wipeScreen() {
  pen.clearRect(0, 0, canvas.width, canvas.height);
}

function createRectangle(){

  pen.beginPath();
  pen.rect(x, y, 50, 10);
  pen.strokeStyle = '#0000FF';
  pen.stroke();
  pen.fillStyle = '#0000FF';
  pen.fill();
}

function moveRight(){
  
  if( x < 400){

    x = x + 5;

  }
}

function startMoveRight() {
  IntervalID3 = setInterval(moveRight,15);
}

function startMoveLeft() {
  IntervalID4 = setInterval(moveLeft,15);
  }

function stopMove(){

  clearInterval(IntervalID3);
  clearInterval(IntervalID4);
}

function moveLeft(){

  if( x > 0) {

    x -= 5;
  
  }
}

function collisionDetection() {
  
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];

    // Check for collision between the circle and the rectangle
    if (
      circle.x1 < x + 50 &&           // Right edge of the rectangle
      circle.x1 + 2 * radius > x &&   // Left edge of the rectangle
      circle.y1 + 2 * radius > y       // Top edge of the rectangle
    ) {
      // Collision detected, mark the circle as inactive
      circle.active = false;
      burstCount = burstCount + 1;
      circle.y1=0
    }
  }
      document.getElementById('burst').innerHTML = 'Burst: ' + burstCount;
}

function escaped() {
  
  //checking to make sure objects still in Array  //checking if every object or "circle" in Array is not active
  var allCirclesInactive = circles.length > 0 && circles.every(function (circle) {
    return !circle.active;
  });


  //checks for escaped circles, increments the sum of escaped circles
  //and brings circles back to top of the screen
  for (i = 0; i < circles.length; i++) {
    if (circles[i].y1 > canvas.height) {
      sum = sum + 1; 
      circles[i].y1 = 0;
      }
  }
      document.getElementById('escaped').innerHTML = 'Escaped: ' + sum;


  if (allCirclesInactive) {
    clearInterval(IntervalID5); // Stop the timer interval
    document.getElementById('output').innerHTML = 'Game Over! You had a success percentage of ' +burstCount+ '%. Refresh the page to play again!';
  }
}


function updateTimer() {
  
  elapsedTime += 1; // Increment elapsed time by 1 millisecond
  document.getElementById('steps').innerHTML = 'Elapsed Time: ' + elapsedTime + ' ms';
}


function stopTimer() {
  if (totalCircles >= 100) {
    clearInterval(IntervalID5); // Stop the timer interval
    document.getElementById('output').innerHTML = 'Game Over! You had a success percentage of ' +burstCount+ '%. Refresh the page to play again!';
  }
}




