let circleShape, squareShape;
let center_x, center_y;
let play, mybutton;
let gameState;
let bar;
let cup;
let score;
let orderNumber;
let orders = [];
let itemList = ["Swedish Vodka", "Gin", "Whiskey", "Burboun", "Milk", "Olive", "Tequila"];
let ingredientList = [];
let isPaused = false;

class Bar {
  constructor() {
    this.x = 0;
    this.y = height;
    this.h = height * 0.20;
    this.w = width;
    this.ingredients = [];
    this.color1 = "black";
  }

  displayIngredients() {
    for (let i = 0; i < this.ingredients.length; i++) {
      let slotWidth = 60;
      let slotHeight = 6;
      fill(this.color1);
      ellipse(150 + (i * (5 + slotWidth)), height - 3, slotWidth, slotHeight);

      stroke(1);
      fill("olive");
      ellipse(150 + (i * (5 + slotWidth)), height - 20, 30, 30);

      fill(255);
      textSize(12);
      textAlign(LEFT);
      textWrap(WORD);
      text(this.ingredients[i].name, 131 + (i * (5 + slotWidth)), height - 35, 40);
    };
  }

  addIngredient(newIngredient) {
    if (this.ingredients.length < 6) {
      this.ingredients.push(newIngredient);
    }
  }
}

class Order {
  constructor(name, history, ingredients, image) {
    this.name = name;
    this.history = history;
    this.ingredients = ingredients;
    this.image = image;
    orderNumber = orderNumber + 1;
    this.orderNumber = orderNumber;
    this.x_location = 100;
    this.isDisplayed = false;
  }

  createTicket() {
    // Check if the ticket is hovered
    if (this.isHovered()) {
      // Draw a blurry circle behind the ticket when hovered
      noStroke();
      fill(240, 230, 215, 100);
      ellipse(this.x_location + 18, 80, 50, 50);

      // Draw a lighter ticket when pressed
      if (mouseIsPressed) {
        fill(255, 240, 225);
      } else {
        fill(240, 230, 215);
      }
    } else {
      // Draw the default ticket
      fill(240, 230, 215);
    }

    stroke(0);
    strokeWeight(2);
    rect(this.x_location, 55, 36, 50);

    // Draw evenly spaced horizontal lines
    for (let i = 1; i <= 3; i++) {
      let lineY = 55 + (i * 6); 
      stroke(0);
      line(this.x_location + 5, lineY, this.x_location + 30, lineY);
    }
  }

  previewTicket() {
    let current_y = (height * 0.25);
    stroke(0);
    strokeWeight(0.2);
    fill(240, 230, 215)
    rect(width / 2 - 90, height * 0.2, 180, 250);

    // Display drink information on the enlarged ticket
    fill(0);
    textSize(12);
    textAlign(LEFT);
    textWrap(WORD);
    text("Drink: " + this.name, (width / 2 - 84), current_y);
    text("History: " + this.history, (width / 2 - 84), current_y + 20, width / 2 - 152, height * 0.2, 180);
    text("Ingredients: " + itemList.join(", "), (width / 2 - 84), current_y + 90, width / 2 - 152, height * 0.2, 180);
  }

  /*/ Displays ticket on side of screen
  displayTicket() {
    stroke(0);
    strokeWeight(2);
    fill(240, 230, 215)
    rect(width - 180, height / 2 - 125, 180, 250);

    // Display drink information on the ticket
    fill(0);
    textSize(14);
    textAlign(LEFT);
    text("Drink: " + this.name, width - 170, height / 2 - 110);
    text("History: " + this.history, width - 170, height / 2 - 85);
    text("Ingredients: " + this.ingredients.join(", "), width - 170, height / 2 - 60);
  }*/

  isHovered() {
    // Check if the mouse is over the ticket
    return mouseX > this.x_location && mouseX < this.x_location + 36 &&
      mouseY > 55 && mouseY < 105;
  }

  display() {
    this.createTicket();
    if (this.isDisplayed) {
      this.previewTicket();
    }
  }
}

class Cup {
  constructor() {
    this.x = width / 2 - this.w / 2;
    this.y = height - 100;
    this.h = 100;
    this.w = 60;

    this.color1 = "brown";
  }

  createCup() {
    fill(this.color1);
    rect(width / 2 - 40, height * 0.58, 80, 100, 10, 10, 25, 25);
    fill("gray");
    rect(width / 2 - 30, height * 0.58, 60, 90, 10, 10);
  }

  addIngredient(ingredient) {

  }
}

class Ingredient {
  constructor(name, description, history, image) {
    this.name = name;
    this.description = description;
    this.history = history;
    this.image = image;
  }
}

function setup() {
  createCanvas(mainMenuImg.width, mainMenuImg.height);
  bar = new Bar(6);
  cup = new Cup();
  orderNumber = 0;
  score = 0;

  for (item of itemList) {
    ingredientList.push(new Ingredient(item, "this is edible!", "its from somewhere!"))
  }

  for (ingred of ingredientList) {
    bar.addIngredient(ingred);
  }

  //gameState = 1;
  //center_x = width / 2;
  //center_y = height / 2;
  //circleShape = new DraggableCircle(width / 3, height / 2, 50, 0, 150, 200);
  //squareShape = new DraggableSquare((2 * width) / 3, height / 2, 50, 200, 0, 150);
}

function draw() {
  runUI();
  //currentMenuState = menuHIDE;
  playGame();
}

function playGame() {

  if (currentMenuState != menuHIDE) {
    return;
  }

  // temporarily placed to ensure that my orders array doesn't get flooded with a million white russian drinks...
  if (orders.length > 1) {
    console.log("ORDERS COUNT:", orders.length);
    orders.pop();
  }

  background(barImg);

  fill(255);
  textSize(35);
  textAlign(center_x);
  textWrap(WORD);
  text("Score: " + score, (width / 2 - 82), 30);

  cup.createCup();
  bar.displayIngredients();
  let order = new Order("White Russian", "Was made in Russia and they like it because it cures their depression. Idk, prolly true.", ingredientList);
  orders.push(order);
  for (let order of orders) {
    order.display();
  }
}

function mouseClicked() {
  // Check if any ticket is clicked and display its preview
  for (let order of orders) {

    if (order.isHovered() && !order.isDisplayed) {
      order.isDisplayed = true;
      break;
    }
    else if (order.isHovered && order.isDisplayed) {
      order.isDisplayed = false;
      break;
    }
  }
}

function keyPressed() {
  if (keyCode === ESCAPE) {
    isPaused = !isPaused;
    if (isPaused && (currentMenuState == menuHIDE)) {
      currentMenuState = menuPAUSE;
    }
    else if (!isPaused && (currentMenuState == menuPAUSE)) {
      currentMenuState = menuHIDE;
    }
  }
}

//circleShape.display();
//squareShape.display();
//circleShape.updatePosition();
//squareShape.updatePosition();

