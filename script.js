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


let gameSpeed = 150;


function main(ms=gameSpeed) {

    if (gameOver()) return;

    setTimeout(function onTick() {
        clear();
        draw();
        move();
        main();
        drawFood();
        console.log(snake[0].x)
    }, ms)
}

// clear the canvas
function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// end game if snake hits canvas border
function gameOver() {
    // IF x <= 0 or >= 600, end the game
    if (snake[0].x < 0 || snake[0].x >= canvas.width) {return true;}
    //  IF y <= 0 or >= 300, end the game
    if (snake[0].y < 0 || snake[0].y >= canvas.height) {return true;}
}


// automatically move the snake
function move() {
    const snakeBody = 
    {x: snake[0].x + xSpeed, y:snake[0].y + ySpeed};
    snake.unshift(snakeBody);
    snake.pop();
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

// display snake on canvas initial load
draw();

// add food randomly to canvas
function drawFood() {
    xFood = Math.floor(Math.random() * canvas.width + 1);
    yFood = Math.floor(Math.random() * canvas.height + 1);
    ctx.fillStyle = 'green';
    ctx.fillRect(xFood, yFood, 10, 10);
}


// TODO:
// 1. add food randomly to canvas
// 2. remove food when snake intersects and add more food
// 3. increase size of snake
// 4. update score and size
// 5. ability to reset game when game over
// 6. allow user to set game difficulty - change gameSpeed accordingly



