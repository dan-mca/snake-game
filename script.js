// get canvas from html
const canvas = document.getElementById('gameCanvas');

// set canvas context to 2d
const ctx = canvas.getContext('2d');

// snake starting co-ordinates
const snake = [
    {x: 300, y:150},
    {x: 290, y:150},
    {x: 280, y:150},
    {x: 270, y:150}
]

// horizontal and vertical speed
let xSpeed = 10;
let ySpeed = 0;

let xFood = 100;
let yFood = 100;

let gameSpeed = 150;
let gameScore = 0;
let status = 'alive';

function drawGame(ms=gameSpeed) {
    if(status === 'dead') return;
    if (gameOver()) return;
    clear();
    draw();
    move();
    drawFood();
    foodEaten();
    
    setTimeout(drawGame, ms);
    console.log(xFood, yFood);
    console.log(snake.length)
}

// clear the canvas
function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// end game if snake hits canvas border
function gameOver() {
    // IF x <= 0 or >= 600, end the game
    if (snake[0].x < 0 || snake[0].x >= canvas.width- 1
        || snake[0].y < 0 || snake[0].y >= canvas.height) {
        
        ctx.font = '30px sans-serif'
        ctx.fillStyle = 'red';
        ctx.textAlign = 'center'
        ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
        
        return true;
    }
    //  IF y <= 0 or >= 300, end the game
    // if () {return true;}
}

// if first segment of snake collides with food, randomly move food
function foodEaten() {
    if(xFood === snake[0].x && yFood === snake[0].y) {
        xFood = Math.ceil(Math.floor(Math.random() * canvas.width)/10)*10;
        yFood = Math.ceil(Math.floor(Math.random() * canvas.height)/10)*10;
        return true
        //console.log(xFood, yFood);
        // gameScore += 1;
    }
}

// automatically move the snake
function move() {
    const snakeBody = 
    {x: snake[0].x + xSpeed, y:snake[0].y + ySpeed};
    snake.unshift(snakeBody);
    if(foodEaten()) {
        document.getElementById('length').innerHTML = `Snake Length: ${snake.length}`;
        gameScore += 1;
        document.getElementById('score').innerHTML = `Score: ${gameScore}`;
    } else {
    snake.pop();
    }
}

// add food randomly to canvas
function drawFood() {
    ctx.fillStyle = 'green';
    ctx.fillRect(xFood, yFood, 10, 10);
}



// control snake with arrow keys
document.addEventListener('keydown', function(event) {
    console.log(event);
    // IF left arrow pressed and snake is not moving right, move snake 10px right
    if(event.key == 'ArrowLeft') {
        xSpeed = -10;
        ySpeed = 0;
    }

    // IF right arrow pressed and snake is not moving left, move snake 10px left
    if(event.key == 'ArrowRight') {
        xSpeed = 10;
        ySpeed = 0;
    }

    // IF up arrow pressed and snake is not moving down, move snake 10px up
    if(event.key == 'ArrowUp') {
        xSpeed = 0;
        ySpeed = -10;
    }

    // IF down arrow pressend and snake is not moving up, move snake 10px down
    if(event.key == 'ArrowDown') {
        xSpeed = 0;
        ySpeed = 10;
    }
})

// draw snake
function drawSnake(snakePart) {
    ctx.fillStyle = 'red';
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
}

// draw snake on canvas
function draw() {
    snake.forEach(drawSnake);
}


drawGame();

// TODO:

// 5. ability to reset game when game over
// 6. allow user to set game difficulty - change gameSpeed accordingly



