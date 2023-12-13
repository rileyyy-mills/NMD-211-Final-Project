let circleShape, squareShape;
let center_x, center_y;
let play, mybutton;
let gameState;
let bar;
let cup;
let score;
let orderNumber;
let icon;
let icons = [];
let infoIcon;
let infoIcons = [];
let orders = [];
let itemList = ["Swedish Vodka", "Gin", "Whiskey", "Burboun", "Milk", "Tequila"];
let ingredientList = [];
let orderTypes = [];
let isPaused = false;

class Bar {
  constructor() {
    this.x = 150;
    this.y = height;
    this.h = height * 0.20;
    this.w = width;
    this.ingredients = [];
    this.color1 = "black";
    this.slotWidth = 60;
    this.slotHeight = 6;
  }

  displayIngredients() {
    icons = [];
    for (let i = 0; i < this.ingredients.length; i++) {

      fill(this.color1);
      ellipse(this.x + (i * (5 + this.slotWidth)), height - 3, this.slotWidth, this.slotHeight);

      icon = new Icon(this.x + (i * (5 + this.slotWidth)), height - 15, 20, 30, "gray", this.ingredients[i]);
      icon.display();
      infoIcons[i].display();
      icons.push(icon);
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
    strokeWeight(2.5);
    fill(240, 230, 215)
    rect(width / 2 - 90, height * 0.2, 180, 250);

    // Display drink information on the enlarged ticket
    fill(255);
    textSize(14);
    textAlign(LEFT);
    textWrap(WORD);
    text("Drink:   " + this.name, (width / 2 - 84), current_y);
    text("History:   " + this.history, (width / 2 - 84), current_y + 20, width / 2 - 152, height * 0.2, 180);
    text("Ingredients:   " + itemList.join(", "), (width / 2 - 84), current_y + 90, width / 2 - 152, height * 0.2, 180);
    strokeWeight(2);

  }

  //Displays ticket on side of screen
  dragTicket() {

  }


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
    this.x = width / 2;
    this.y = height * 0.58;
    this.h = 100;
    this.w = 80;

    this.maxIngredients = 6;
    this.ingredientsAdded = [];
  }

  addIngredient(newIngredient) {
    this.ingredientsAdded.push(newIngredient);
  }

  display() {
    fill("brown");
    rect(this.x - this.w/2, this.y, this.w, this.h, 10, 10, 25, 25);
  }

  update() {
    let layerH = -13.5;
    let startY = (this.y+this.h-10);

    fill("gray");
    rect(this.x - (this.w-20)/2, this.y, this.w-20, this.h-10, 10, 10);

    let i;
    // For loop that adds ingredients color to cup
    for(i = 0; (i < this.ingredientsAdded.length && i < 6); i++){
      let current = this.ingredientsAdded[i];

      if(i == 0) {
        fill(current.color);
        rect(this.x - (this.w-20)/2, startY, this.w-20, layerH, 10, 10, 0, 0);
      }
      else {
        fill(current.color);
        rect(this.x - (this.w-20)/2, startY + (i * layerH), this.w-20, layerH);
      }
    }

  }
}

class CocktailGlass extends Cup{
  display() {

    // Actual glass outline
    fill("silver"); 
    beginShape();
    vertex(width / 2 + 72, height / 2 - 50);
    vertex(width / 2 + 18, height / 2 + 30);
    vertex(width / 2 + 8, height / 2 + 50);
    vertex(width / 2 + 6, height / 2 + 60);
    vertex(width / 2 + 4, height / 2 + 100);
    vertex(width / 2 + 4, height / 2 + 140);
    vertex(width / 2 + 6, height / 2 + 150);
    vertex(width / 2 + 8, height / 2 + 154);
    vertex(width / 2 + 16, height / 2 + 161);
    vertex(width / 2 + 32, height / 2 + 168);
    vertex(width / 2 + 42, height / 2 + 170);
    
    vertex(width / 2 - 42, height / 2 + 170);
    vertex(width / 2 - 32, height / 2 + 168);
    vertex(width / 2 - 16, height / 2 + 161);
    vertex(width / 2 - 8, height / 2 + 154);
    vertex(width / 2 - 6, height / 2 + 150);
    vertex(width / 2 - 4, height / 2 + 140);
    vertex(width / 2 - 4, height / 2 + 100);
    vertex(width / 2 - 6, height / 2 + 60);
    vertex(width / 2 - 8, height / 2 + 50);
    vertex(width / 2 - 18, height / 2 + 30);
    vertex(width / 2 - 72, height / 2 - 50);
    endShape();
    fill("gold");
    
    // Gold Rim
    stroke(0);
    fill("gold"); 
    beginShape();
    vertex(width / 2 - 72, height / 2 - 50);
    vertex(width / 2 + 72, height / 2 - 50);
    vertex(width / 2 + 68, height / 2 - 43);
    vertex(width / 2 - 68, height / 2 - 43);
    endShape(CLOSE);
 
    beginShape();
    vertex(width / 2 - 72, height / 2 - 48);
    vertex(width / 2 + 72, height / 2 - 48);
    vertex(width / 2 + 70, height / 2 - 45);
    vertex(width / 2 - 70, height / 2 - 45);
    endShape(CLOSE);

    // Gold Base
    arc(width / 2, height / 2 + 170, 84,6, 2*PI, PI);
  }

  update() {

    // Inside container for ingredients
    fill("white"); 
    beginShape();
    vertex(width / 2 + 65, height / 2 - 50);
    vertex(width / 2 + 16, height / 2 + 30);
    vertex(width / 2 + 8, height / 2 + 45);
    vertex(width / 2 - 8, height / 2 + 45);
    vertex(width / 2 - 16, height / 2 + 30);
    vertex(width / 2 - 65, height / 2 - 50);
    endShape();
    arc(width / 2, height / 2 + 42, 18,12, 2.1*PI, 0.9*PI);

    // For loop that adds ingredients color
  }
}

class Ingredient {
  constructor(name,history, color) {
    this.name = name;
    this.history = history;
    this.color = color;
  }
}

class Icon {
  constructor(x, y, w, h, secondaryColor, ingredient) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.primaryColor = ingredient.color;
    this.secondaryColor = secondaryColor;
    this.isDisplayed = false;
    this.hoverColor = "gold";
    this.ingredient = ingredient;
    this.curvature = 5;
  }

  display() {
    if(this.isHovered()){
      fill(this.hoverColor);
      ellipse(this.x, this.y - 2, this.w + this.w);
    }

    // Draw vodka bottle
    fill(this.primaryColor); 
    stroke(0); 
    strokeWeight(1.5); 

    // Bottle body
    rect(this.x - this.w/2, this.y - (this.h /2), this.w, this.h, this.curvature);

    // Bottle neck
    fill(this.secondaryColor);
    rect(this.x - this.w/6, this.y - (this.h /1.25), (this.w*0.33), this.h*(0.32), this.curvature*0.6);
    
    // Bottle label
    rect(this.x - this.w/2, this.y - (this.h /4), this.w, this.h/4);

    fill(255);
    textSize(12);
    textAlign(CENTER);
    textWrap(WORD);
    text(this.ingredient.name, this.x, height-50);
  }

  isHovered() {
    // Check if the mouse is over the ticket
    return mouseX > this.x && mouseX < this.x + this.w &&
      mouseY > this.y  && mouseY < this.y + this.h;
  }

  onClick() {
    cup.addIngredient(this.ingredient);
    console.log(this.ingredient.name);
  }
}

class InfoIcon extends Icon {
  display() {
    stroke("blue");
    strokeWeight(3);
    fill(" ");
    if(this.isHovered()){
      fill("gold");
    }

    ellipse(this.x,this.y,this.w, this.h);

    fill(255);
    textSize(12);
    textAlign(CENTER);
    textWrap(WORD);
    text("i", this.x, this.y-this.h/3);
    
    stroke(0);
    strokeWeight(2);

    if (this.isDisplayed) {
      fill(240, 230, 215);
      rect(width/2-75,75,150,100);

      fill(255);
      textSize(14);
      text("History of "+ this.ingredient.name +": \n" +this.ingredient.history, width/2-70, 100, 140);

    }
  }

  onClick() {
    if(this.isHovered()) {
      console.log("IS BEING DISPLAYED ONCLICK")
      this.isDisplayed = true;
    }
  }
}

function setup() {
  createCanvas(mainMenuImg.width, mainMenuImg.height);
  bar = new Bar(6);
  cup = new Cup();
  score = new Score();
  orderNumber = 0;

  ingredientList.push(new Ingredient("Light Rum", "its from somewhere!", "white"));
  ingredientList.push(new Ingredient("Dark Rum", "its from somewhere!", "darkgoldenrod"));
  ingredientList.push(new Ingredient("Coconut Rum", "its from somewhere!", "white"));
  ingredientList.push(new Ingredient("Lime Juice", "its from somewhere!", "limeGreen"));
  ingredientList.push(new Ingredient("Orange Juice", "its from somewhere!", "orange"));
  ingredientList.push(new Ingredient("Pineapple", "its from somewhere!", "yellow"));

  orderTypes.push(new Order("White Russian", "Was made in Russia and they like it because it cures their depression. Idk, prolly true.", ingredientList));

  let i;
  for(i = 0; i < 6; i++){
    infoIcon = new InfoIcon(172 + (i * (65)), height - 30, 13, 13, "gray", ingredientList[i]);
    infoIcons.push(infoIcon);
  }

  // Adds ingredients to bar setup
  for (ingred of ingredientList) {
    bar.addIngredient(ingred);
  }

  // Adds list of possible orders to players current list of ACTIVE orders
  orders.push(orderTypes[0]);
}

class Score {
  constructor() {
    this.score = 0;
    this.x = width / 2;
    this.y = 30;
  }

  display() {
    fill("white");
    stroke(0);
    textSize(35);
    textAlign(CENTER);
    textWrap(WORD);
    text("Score: " + this.score, this.x, this.y);
  }

  addPoints(points) {
    this.score += points;
  }
}

function draw() {
  runUI();
  currentMenuState = menuHIDE;
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
  score.display();
  
  bar.displayIngredients();
  cup.display();
  cup.update();

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

  for (let icon of icons) {
    if (icon.isHovered()){
      icon.onClick();
    }
  }

  for (let icon of infoIcons) {
    if (icon.isHovered() && !icon.isDisplayed) {
      icon.isDisplayed = true;
      break;
    }
    else if (icon.isHovered && icon.isDisplayed) {
      icon.isDisplayed = false;
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