let circleShape, squareShape;
let center_x, center_y;
let play, mybutton;
let gameState;
let barCounter;
let cup;

class Bar {
  constructor(ingredientSlots){
    this.x = 0;
    this.y = height;
    this.h = height * 0.20;
    this.w = width;
    this.ingredientSlots = ingredientSlots;

    this.color1 = "gray";
    this.color2 = "black";
  }

  createCounter(){
    fill(this.color1);
    rect(this.x, this.y - this.h, this.w, this.h);
  }

  setContainers(number){
    let barInnerMargin = 15;
    let containerSpacing = this.w - barInnerMargin*2 / number
    let containerWidth = ((this.w - 20) - number * 10) / number
  }
}

class Cup {
  constructor(){
    this.x = width/2 - this.w/2;
    this.y = height-20;
    this.h = 100;
    this.w = 60;

    this.material = "glass";
    this.color1 = "white";
    this.color2 = "dark gray";
  }

  createCup() {
    fill(this.color1);
    rect(this.x, this.y - this.h, this.w, this.h);
  }
}

function setup() {
  createCanvas(mainMenuImg.width, mainMenuImg.height);
  barCounter = new BarCounter();
  cup = new Cup();

  //gameState = 1;
  //center_x = width / 2;
  //center_y = height / 2;
  //circleShape = new DraggableCircle(width / 3, height / 2, 50, 0, 150, 200);
  //squareShape = new DraggableSquare((2 * width) / 3, height / 2, 50, 200, 0, 150);
}

function draw() {
  runUI();
  playGame();
}


function playGame() {
  if(currentMenuState != menuHIDE){
    return;
  }

  background(barImg);
  
  barContainer.createCounter();
}
//circleShape.display();
//squareShape.display();
//circleShape.updatePosition();
//squareShape.updatePosition();

