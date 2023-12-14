// Got Slider class from ChatGPT to speed up development; Doesnt work yet tho
class Slider {
    constructor(x, y, length, thickness) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.thickness = thickness;
        this.handleSize = 20; 
        this.value = 0.5; // value between 0 and 1
        this.isDragging = false;
    }

    display() {
        // Draw the track
        fill(150);
        rect(this.x, this.y - this.thickness / 2, this.length, this.thickness);

        // Calculate the handle position based on the current value
        let handleX = this.x + this.value * this.length - this.handleSize / 2;

        // Draw the handle
        fill(this.isDragging ? color(221, 90, 54) : color(139, 0, 0));
        ellipse(handleX + this.handleSize / 2, this.y, this.handleSize, this.handleSize);
    }

    mousePressed() {
        // Check if the mouse is over the handle
        let handleX = this.x + this.value * this.length - this.handleSize / 2;
        let handleY = this.y;
        let d = dist(mouseX, mouseY, handleX + this.handleSize / 2, handleY);
        if (d < this.handleSize / 2) {
            console.log("SLIDER IS PRESSED");
            this.isDragging = true;
        }

    }

    mouseDragged() {
        // If the mouse is dragging, update the slider value
        if (this.isDragging) {
            console.log("SLIDER IS DRAGGING");
            let normalizedValue = constrain((mouseX - this.x) / this.length, 0, 1);
            this.value = normalizedValue;
        }
    }

    mouseReleased() {
        // Stop dragging when the mouse is released
        console.log("SLIDER IS RELEASED");
        this.isDragging = false;
    }
}

class Button {
    constructor(x, y, width, height, label, newState) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.label = label;
        this.newState = newState;
        this.isMouseOver = false;
        this.isPressed = false;
        this.newState = this.newState;
    }

    display() {
        // Check if the mouse is over the button
        this.isMouseOver = this.isMouseInside();

        // Draw the button
        stroke(255);
        strokeWeight(2);
        fill(this.isMouseOver ? color(221, 90, 54) : color(139, 0, 0));
        rect(this.x, this.y, this.width, this.height, 10);

        // Draw the label
        noStroke();
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(20);
        text(this.label, this.x + this.width / 2 - 2.5, this.y + this.height / 2 - 5);
        console.log("BUTTON DISPLAYED");
        stroke(0);
    }

    isMouseInside() {
        return mouseX > this.x && mouseX < this.x + this.width &&
            mouseY > this.y && mouseY < this.y + this.height;
    }

    mousePressed() {
        if (this.isMouseOver) {
            this.isPressed = true;
            lastMenuState = currentMenuState;
            currentMenuState = this.newState;
            buttonSound.play();
        }
        else {
            this.isPressed = false;
        }
    }
}

class IngameButton extends Button {
    mousePressed() {
        if (this.isMouseOver) {
            this.isPressed = true;
            buttonSound.play();
        }
        else {
            this.isPressed = false;
        }
    }
}

let tropicalFont;
let mainMenuImg;
let barImg;

let continueButton;
let playButton;
let scoreBoardButton;
let settingsButton;
let creditsButton;
let quitButton;
let backButton;
let volumeSlider;
let buttonSound, backgroundMusic;

let lastMenuState;
let currentMenuState;
const menuHIDE = "HIDE";
const menuMAIN = "MAIN";
const menuPAUSE = "PAUSE";
const menuSETTINGS = "SETTINGS";
const menuSCOREBOARD = "SCORE BOARD";
const menuCREDITS = "CREDITS";

function preload() {
    tropicalFont = loadFont("./fonts/TROPIKA_ISLAND.otf");
    mainMenuImg = loadImage("./images/tropical_leaves_background.png");
    barImg = loadImage("./images/BartenderTime_BarView_resized.png");
    buttonSound = loadSound("./sounds/pressButtonSound.wav");
    buttonSound.setVolume(1.1);
    backgroundMusic = loadSound("./sounds/backgroundMusic.mp3");
    backgroundMusic.setVolume(0.2);
    currentMenuState = menuMAIN;
}

function uhOh() {
    textSize(35);
    stroke(255);
    strokeWeight(4);
    fill(221, 90, 54);
    textAlign(CENTER, CENTER);
    text("Uh-oh spaghettios! \nIt appears this section is not yet complete...", (width * 0.5), (height * 0.45));
}

function runUI() {

    // Move to game.js setup at end of development so everything is in one place and is in setup
    playButton = new Button((width * 0.5) - 60, height * 0.45, 120, 35, "PLAY", menuHIDE);
    settingsButton = new Button((width * 0.5) - 60, height * 0.55, 120, 35, "SETTINGS", menuSETTINGS);
    scoreBoardButton = new Button((width * 0.5) - 60, height * 0.65, 120, 35, "SCORE BOARD", menuSCOREBOARD);
    creditsButton = new Button((width * 0.5) - 60, height * 0.75, 120, 35, "CREDITS", menuCREDITS);
    continueButton = new Button((width * 0.5) - 60, height * 0.45, 120, 35, "CONTINUE", menuHIDE);
    quitButton = new Button((width * 0.5) - 60, height * 0.75, 120, 35, "QUIT", menuMAIN);
    backButton = new Button((width * 0.5) - 60, height * 0.85, 120, 35, "BACK", lastMenuState);

    volumeSlider = new Slider((width * 0.5) - 60, height * 0.45, 100, 10);

    textFont(tropicalFont);
    background(mainMenuImg);


    if (currentMenuState == menuMAIN) {

        textSize(70);
        stroke(255);
        strokeWeight(4);
        fill(221, 90, 54);
        textAlign(CENTER,);
        text("BARTENDER TIME!", (width * 0.5), (height * 0.2));

        console.log("MAIN MENU");
        playButton.display();
        settingsButton.display();
        scoreBoardButton.display();
        creditsButton.display();
    }
    else if (currentMenuState == menuSETTINGS) {
        uhOh();
        backButton.display();
        //volumeSlider.display();
    }
    else if (currentMenuState == menuSCOREBOARD) {
        uhOh();
        backButton.display();
    }
    else if (currentMenuState == menuCREDITS) {
        uhOh();
        backButton.display();
    }
    else if (currentMenuState == menuPAUSE) {
        continueButton.display();
        quitButton.display();
    }
}

function mousePressed() {

    if (backButton.isMouseOver) {
        backButton.mousePressed();
    }
    if (playButton.isMouseOver) {
        playButton.mousePressed();
    } 
    if (settingsButton.isMouseOver) {
        settingsButton.mousePressed();
    } 
    if (scoreBoardButton.isMouseOver) {
        scoreBoardButton.mousePressed();
    } 
    if (creditsButton.isMouseOver) {
        creditsButton.mousePressed();
    }
    if (continueButton.isMouseOver) {
        continueButton.mousePressed();
    }
    if (quitButton.isMouseOver) {
        quitButton.mousePressed();
    }
    if (serveButton.isMouseOver) {
        serveButton.mousePressed();
    }
}

function mouseDragged() {
    // Handle mouseDragged for sliders
    if (currentMenuState == menuSETTINGS) {
        if (volumeSlider.isDragging) {
            volumeSlider.mouseDragged();
        }
    }
}

function mouseReleased() {
    // Handle mouseReleased for sliders
    if (currentMenuState == menuSETTINGS) {
        if (volumeSlider.isDragging) {
            volumeSlider.mouseReleased();
        }
    }
}
