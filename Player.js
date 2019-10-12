class Player {
  constructor(nome, x, y, img, bulletImg, up) {
    this.nome = nome;
    this.x = x;
    this.y = y;
    this.up = up;
    this.speed = 5;
    this.sz = 30;
    this.bullets = [];
    this.died = false;
    this.img = img;
    this.bulletImg = bulletImg;
  }

  shoot() {
    let bulletSpeed = this.up ? 5 : - 5;
    this.bullets.push(new Bullet(this.x, this.y, 5, bulletSpeed, this.bulletImg));
  }

  moveX(pix) {
    this.x += pix;
    if (this.x + (this.sz / 2) > width) {
      this.x = width - (this.sz / 2);
    } else if (this.x - (this.sz / 2) < 0) {
      this.x = 0 + (this.sz / 2);
    }
  }

  moveY(pix) {
    let ballEdgeY = this.up ? this.y - (this.sz / 2) : this.y + (this.sz / 2);
    let limitY = this.up ? height/2-this.sz/2 : height/2+this.sz/2;
    this.y += pix;
    
    if (ballEdgeY > height) {
      this.y = height - (this.sz / 2);
    } else if (ballEdgeY < 0) {
      this.y = 0 + (this.sz / 2);
    } else if(this.up && this.y > limitY) {
      this.y = limitY;
    } else if(!this.up && this.y < limitY) {
      this.y = limitY;
    }
  }

  update() {
    // w = 87; a = 65; d = 68; s = 83

    for (let i = this.bullets.length -1; i >= 0; i--) {
      this.bullets[i].update();
      
      if (this.bullets[i].isOffScreen()) {
         this.bullets.splice(i, 1);
      }
    }

    if (!this.died) {
      if (this.up) {
        if (keyIsDown(LEFT_ARROW)) {
          this.moveX(-this.speed);
        }
        if (keyIsDown(RIGHT_ARROW)) {
          this.moveX(this.speed);
        }
        if (keyIsDown(UP_ARROW)) {
          this.moveY(-this.speed);
        }
        if (keyIsDown(DOWN_ARROW)) {
          this.moveY(this.speed);
        }
      } else {
        if (keyIsDown(65)) {
          this.moveX(-this.speed);
        }
        if (keyIsDown(68)) {
          this.moveX(this.speed);
        }
        if (keyIsDown(87)) {
          this.moveY(-this.speed);
        }
        if (keyIsDown(83)) {
          this.moveY(this.speed);
        }
      }
    }
  }


  show() {
    if (!this.died) {
      let namePosY = this.up ? this.y - this.sz: this.y + this.sz;
      text(this.nome, this.x, namePosY);
      image(this.img, this.x, this.y, this.sz, this.sz);

      for (let i = this.bullets.length -1; i >= 0; i--) {
        this.bullets[i].show();
      }
    } else {
      text('DEAD', this.x, this.y); 
    }
  }

}