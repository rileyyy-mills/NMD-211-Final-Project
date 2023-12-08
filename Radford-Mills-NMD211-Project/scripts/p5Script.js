class Draggable {

    constructor(x, y, size, r, g, b) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.r = r;
        this.g = g;
        this.b = b;
        this.isDragging = false;
    }

    checkIfMouseOver() {
        let d = dist(mouseX, mouseY, this.x, this.y);
        return d < this.size / 2;
    }

    updatePosition() {
        if (this.isDragging) {
            this.x = mouseX;
            this.y = mouseY;
        }
    }
}

class DraggableCircle extends Draggable {
    display() {
        fill(this.r, this.g, this.b);
        ellipse(this.x, this.y, this.size, this.size);
    }
}

class DraggableSquare extends Draggable {
    display() {
        fill(this.r, this.g, this.b);
        rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    }

    checkIfMouseOver() {
        // Check if the mouse is over the square shape
        return mouseX > this.x - this.size / 2 &&
            mouseX < this.x + this.size / 2 &&
            mouseY > this.y - this.size / 2 &&
            mouseY < this.y + this.size / 2;
    }
}


class Shape {
    constructor(x, y, size, r, g, b) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.r = r;
        this.g = g;
        this.b = b;
    }
}

class Circle extends Shape {
    display() {
        fill(this.r, this.g, this.b);
        ellipse(this.x, this.y, this.size, this.size);
    }
}

class Square extends Shape {

    setCornerRadius(newRadius) {
        this.cr = newRadius;
    }

    display() {
        fill(this.r, this.g, this.b);
        rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size, this.cr);
    }
}

class Rectangle extends Square {

    display() {
        fill(this.r, this.g, this.b);
        rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size/2, this.cr);
    }
}

/*function mousePressed() {
    if (circleShape.checkIfMouseOver()) {
        circleShape.isDragging = true;
    }

    if (squareShape.checkIfMouseOver()) {
        squareShape.isDragging = true;
    }
}

function mouseReleased() {
    circleShape.isDragging = false;
    squareShape.isDragging = false;
}*./




/*class Draggable {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.dragging = false;
        this.rollover = false;
        this.offsetX = 0;
        this.offsetY = 0;
        this.w = w;
        this.h = h;
    }

    intersect(other) {
        return (this.x < other.x + other.w &&
            this.y < other.y + other.h &&
            this.x + this.w > other.x &&
            this.y + this.h > other.y

        );
    }

    over() {
        //is the mouse over the shape
        if (mouseX < this.x + this.w && mouseX > this.x && mouseY > this.y && mouseY < this.y + this.h) {

            this.rollover = true;
        } else {
            this.rollover = false;
        }
    }
    update() {
        if (this.dragging) {
            this.x = mouseX + this.offsetX;
            this.y = mouseY + this.offsetY;
        }
    }

    display() {
        stroke(0);
        if (this.dragging) {
            fill('purple');
        } else if (this.rollover) {
            fill('pink');
        } else {
            fill('blue');
        }
        rect(this.x, this.y, this.w, this.h);
    }

    pressed() {
        //has been clicked on
        if (mouseX < this.x && mouseX > this.x + this.w && mouseY < this.y && mouseY > this.y + this.h) {
            this.dragging = true;
            this.offsetX = this.x - mouseX;
            this.offsetY = this.y - mouseY;
            //keeping track of where it's moved to

        }
    }

    release() {
        //quit dragggin me around
        this.dragging = false;
    }
}

let shape1, shape2;
let score = 0;
let wasIntersecting = false;

function setup() {
    createCanvas(640, 360);
    shape1 = new Draggable(50, 100, 50, 50);
    shape2 = new Draggable(150, 100, 50, 50);
}
function draw() {
    background(255);
    shape1.over();
    shape1.update();
    shape1.display();

    shape2.over();
    shape2.update();
    shape2.display();

    intersected();

    textSize(32);
    fill(0);
    text(score, width / 2, height / 6);

}

function intersected() {
    let isIntersecting = shape1.intersect(shape2);
    if (isIntersecting && !wasIntersecting) {
        score += 1;
    }
    wasIntersecting = isIntersecting; //update 
}

function mousePressed() {
    shape1.pressed();
    shape2.pressed();
}

function mouseReleased() {
    shape1.release();
    shape2.release();
}*/