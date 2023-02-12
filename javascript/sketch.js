let balls = []; // Array to store multiple balls
let draggingBall = null; 

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch-container"); //move our canvas inside this HTML element
}

function draw() {
  background(255);
  for (let i = 0; i < balls.length; i++) {
    for (let j = 0; j < balls.length; j++) {
      if (i !== j) {
        balls[i].bounce(balls[j]);
      }
    }
    balls[i].update();
    balls[i].display();
  }
}

function mouseClicked() {
  balls.push(new Ball(createVector(mouseX, mouseY), createVector(random(-2, 2), random(-2, 2))));
}

function mousePressed() {
  for (let i = 0; i < balls.length; i++) {
    let distance = balls[i].location.dist(createVector(mouseX, mouseY));
    if (distance < balls[i].diameter/2) {
      draggingBall = balls[i];
    }
  }
}

function mouseDragged() {
  if (draggingBall) {
    draggingBall.location.x = mouseX;
    draggingBall.location.y = mouseY;
  }
}

function mouseReleased() {
  //draggingBall = null;
}

class Ball {
  constructor(location, velocity) {
    this.location = location;
    this.velocity = velocity;
    this.diameter = random(20, 80);
    this.mass = this.diameter /100;
    this.r = random(100,200);
    this.g = random(50,200);
    this.b = random(50,200);
    this.a = random(40,80);
  }

  update() {
    this.location.add(this.velocity);
    if (this.location.x + this.diameter/2 > width || this.location.x - this.diameter/2 < 0) {
      this.velocity.x = -this.velocity.x;
    }
    if (this.location.y + this.diameter/2 > height || this.location.y - this.diameter/2 < 0) {
      this.velocity.y = -this.velocity.y;
    }

    // Bounce off edges (updated from last term to work better with canvas resize)
    // if (this.location.x > width){
    //   this.location.x = width;
    //   this.velocity.x = this.velocity.x * -1;
    // }
    // if (this.location.x < 0) {
    //   this.location.x = 0;
    //   this.velocity.x = this.velocity.x * -1;
    // }
    // if (this.location.y < 0) {
    //   this.location.y = 0;
    //   this.velocity.y = this.velocity.y * -1;
    // }
    // if (this.location.y > height) {
    //   this.location.y = height;
    //   this.velocity.y = this.velocity.y * -1; 
    // }

  }

  display() {
    noStroke();
    fill(this.r, this.g, this.b, this.a);
    ellipse(this.location.x, this.location.y, this.diameter, this.diameter);
  }

  bounce(other) {
    let distance = this.location.dist(other.location);
    if (distance < this.diameter/2 + other.diameter/2) {
      let direction = p5.Vector.sub(this.location, other.location);
      direction.normalize();
      direction.mult(-1);
      let force = direction.copy();
      force.mult(-0.5 * (this.mass + other.mass));
      this.velocity.add(force);
      force.mult(-1);
      other.velocity.add(force);
    }
  }
}
    

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function handleButtonPress() {
  if(!feeding){
    //set food to random value
    for( let i=0 ; i < 10; i++){
      let f = new Food(random(width), random(height));
      foodFeed.push(f);
    }
    feeding = true;
    button.html("FEEDING");
    button.addClass("inactive");
    setTimeout(feedingF, 1000);
  }
}

function feedingF() {
    feeding = false;
    button.html("FEED");
    button.removeClass("inactive");
  
} 

//Add Gui
function addGUI() {
  //add a button
  button = createButton("FEED");
  button.addClass("button");
  //Add the play button to the parent gui HTML element
  button.parent("gui-container");
  //Adding a mouse pressed event listener to the button 
  button.mousePressed(handleButtonPress); 

}