// Enemies our player must avoid
let allEnemies = [];

class Enemy {
    constructor() {
        this.position = [60, 140, 220];
        this.x = -100;
        this.y = this.position[Math.floor(Math.random() * this.position.length)];
        this.speed = (Math.random() * 4) + 2;
    
        this.sprite = 'images/enemy-bug.png';
        this.width = 101;
        this.height = 171;
    }

    // Update the enemy's position
    // Parameter: dt, a time delta between ticks
    update(dt) {
        this.x += this.speed;
    }

    // Draw the enemy on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Player {
    constructor() {
        this.x = 200;
        this.y = 380;
        this.sprite = 'images/char-cat-girl.png';
        this.width = 101;
        this.height = 171;
    }

    moveToDefault() {
        this.x = 200;
        this.y = 380;
    }

    // Update the player position, add message when win
    update() {
        if (this.y < 60) {
            allEnemies = [];
            this.moveToDefault();

            this.messages = ['Good job!', 'Nice!', 'You are awesome!', 'Woooooo!', 'You win!!!'];
            this.messageParagraph = document.querySelector('.message');
            this.messageParagraph.textContent = this.messages[Math.floor(Math.random() * this.messages.length)];
        }
    }

    handleInput(key) {
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

    // Draw the player on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

}

// Add new enemies
allEnemies = [new Enemy()];
setInterval(function () {
    allEnemies.push(new Enemy());
}, 1000);

let player = new Player();

// This listens for key presses and sends the keys to player.handleInput() method
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});