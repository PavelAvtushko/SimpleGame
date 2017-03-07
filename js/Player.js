class Player {
    constructor(speed, health) {
        this.X = 2;
        this.Y = 0;
        this.PositionX = 60;
        this.PositionY = 200;
        this.width = 152;
        this.height = 108;
        this.speed = speed;
        this.moveUp = false;
        this.moveDown = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.spriteFlag = 1;
        this.sizeCoefficient = 0.8
        this.life = 3;
        this.health = health;
        this.healthDefault = health;
        this.score = 0;
    }

    moveToDirection() {
        if(this.moveUp && this.PositionY >= 10) {
            this.PositionY -= this.speed;
        }
        
        if(this.moveDown && this.PositionY <= 440) {
            this.PositionY += this.speed;
        }
        
        if(this.moveLeft && this.PositionX >= 10) {
            this.PositionX -= this.speed;
        }

        if(this.moveRight && this.PositionX <= 820) {
            this.PositionX += this.speed;
        }
    }

    draw(playerImage, Images) {
        playerImage.clearRect(0, 0, 960, 550);
        
        if (this.spriteFlag < 8) {
            playerImage.drawImage(Images.spriteImage, this.X, this.Y, this.width,
            this.height, this.PositionX, this.PositionY, this.width * this.sizeCoefficient, this.height * this.sizeCoefficient);
        }

        else {
            playerImage.drawImage(Images.spriteImage, this.X + 150, this.Y, this.width,
                this.height, this.PositionX, this.PositionY, this.width * this.sizeCoefficient, this.height * this.sizeCoefficient);
            if (this.spriteFlag === 16) {
                this.spriteFlag = 1;
            }  
        }
        ++this.spriteFlag;
    }

    move() {
        this.moveToDirection();
    }
}
