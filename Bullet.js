class Bullet {

  constructor(x, y, sz, speed, img) {
    this.x = x;
    this.y = y;
    this.sz = 10;
    this.speed = speed;
    this.img = img;
  }

  update() {
    this.y += this.speed;
  }
  
  isOffScreen() {
     return this.y > height | this.y < 0; 
  }

  show() {
    image(this.img, this.x, this.y, this.sz, this.sz);
  }

  isHitting(player) {
    let d = dist(this.x, this.y, player.x, player.y);
    let radius = this.sz/2;
    let playerRadius = player.sz/2;
    
    if (d < radius + playerRadius) {
      return true;
    }
    return false;
  }

}