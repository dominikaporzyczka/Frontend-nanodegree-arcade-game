// Enemies our player must avoid
let allEnemies = [];

var Enemy = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.position = [60, 140, 220];
    this.x = -100;
    this.y = this.position[Math.floor(Math.random() * this.position.length)];
    this.speed = (Math.random() * 4) + 2;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.width = 101;
    this.height = 171;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function () {
    this.x = 200;
    this.y = 380;
    this.sprite = 'images/char-cat-girl.png';
    this.width = 101;
    this.height = 171;
}

Player.prototype.moveToDefault = function () {
    this.x = 200;
    this.y = 380;
}

Player.prototype.update = function () {
    if (this.y < 60) {
        allEnemies = [];
        this.moveToDefault();
    }
}

Player.prototype.handleInput = function (key) {
    if (key === 'left' && this.x >= 100) {
        this.x -= 100;
    }
    else if (key === 'up' && this.y >= 60) {
        this.y -= 80;
    }
    else if (key === 'right' && this.x <= 300) {
        this.x += 100;
    }
    else if (key === 'down' && this.y <= 300) {
        this.y += 80;
    }
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
allEnemies = [new Enemy()];
setInterval(function () {
    allEnemies.push(new Enemy());
}, 1000);
// Place the player object in a variable called player
let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});