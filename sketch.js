var players;
var bulletDown;
var bulletUp;
var spaceShipDown;
var spaceShipUp;
var bg;

function preload() {
  bulletDown = loadImage('./imgs/bulletdown.png');
  bulletUp = loadImage('./imgs/bulletdown.png');
  spaceShipUp = loadImage('./imgs/spaceshipup.png');
  spaceShipDown = loadImage('./imgs/spaceshipdown.png');
  bg = loadImage('./imgs/bg.jpg');
}

function setup() {
  createCanvas(windowWidth -5, windowHeight -5);
  textAlign(CENTER);
  imageMode(CENTER);
  fill(255);
  players = [new Player('Player 1', width-50, height-50, spaceShipUp, bulletUp, false), new Player('Player 2', 50, 50, spaceShipDown, bulletDown,  true)];
}

function draw() {
  image(bg, width/2, height/2, width, height);
  line(0, height/2, width, height/2);
  for (let p of players) {
    p.update();
    p.show();
  }

  for (let bullet of players[0].bullets) {
    if (bullet.isHitting(players[1])) {
      players[1].died = true;
    }
  }
  
  for (let bullet of players[1].bullets) {
    if (bullet.isHitting(players[0])) {
      players[0].died = true;    
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth-5, windowHeight-5);
}

function keyPressed() {
  if (!players[0].died && keyCode === 32) {
    players[0].shoot();
  } else if (!players[1].died && keyCode === SHIFT) {
    players[1].shoot();
  }
}