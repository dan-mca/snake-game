// get canvas from html
const canvas = document.getElementById('gameCanvas');

// set canvas context to 2d
const ctx = canvas.getContext('2d');

// set canvas colour
ctx.fillStyle = "lightgreen";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let game;
let isActive = 1;

// snake starting co-ordinates
let snake = [
    {x: 300, y:160},
    {x: 280, y:160},
    {x: 260, y:160},
    {x: 240, y:160}
]

// horizontal and vertical speed
let xSpeed = 20;
let ySpeed = 0;

// co-ordinates of food
let xFood = 100;
let yFood = 100;

let gameScore = 0;
// let gameSpeed = 2;

let canvasText = 'Game Over';
let canvasFont ='50px sans-serif'

function startGame(gameSpeed) {
    game = setInterval(drawGame, 1000/gameSpeed);
    
}

// loop the game and functions
function drawGame() {
    console.log(isActive);
    // end game and display game over text once snake collides with itself or wall
    if (isActive === 0) {
        gameOverText();
        clearInterval(game);
        console.log('hello');
        return;
    } else {
        gameOver();
        clear();
        draw();
        move();
        drawFood();
        foodEaten();
        
        // console.log(`snake: x:${snake[0].x}, y:${snake[0].y}`);
        // console.log(`Food: x:${xFood}, y:${yFood}`);
    }
}

// clear the canvas
function clear() {
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// draw snake
function drawSnake(snakePart) {
    ctx.fillStyle = 'green';
    ctx.fillRect(snakePart.x, snakePart.y, 20, 20);
}

// draw snake on canvas
function draw() {
    snake.forEach(drawSnake);
}

// add food randomly to canvas
function drawFood() {
    // ctx.fillStyle = 'red';
    // ctx.fillRect(xFood, yFood, 20, 20);
    ctx.beginPath();
    ctx.arc(xFood+10, yFood+10, 10 ,0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
}

// game over text on canvas once game has ended
function gameOverText() {
    ctx.font = canvasFont;
    ctx.fillStyle = 'red';
    ctx.textAlign = 'center'
    ctx.fillText(canvasText, canvas.width / 2, canvas.height / 2);
}

// end game if snake hits canvas border
function gameOver() {
    for(let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            isActive = 0;
            return;
        }
             
    }
    // IF x < 0 or >= 600 or y <0 or >= 300, end the game
    if (snake[0].x <= 0|| snake[0].x >= canvas.width - 20
        || snake[0].y <= 0 || snake[0].y >= canvas.height - 20 ) {
        isActive = 0;
        return;
    }
}

// if first segment of snake collides with food, randomly move food
function foodEaten() {
    if(xFood === snake[0].x && yFood === snake[0].y) {
        xFood = (Math.ceil(Math.floor(Math.random() * canvas.width)/20)*20)-20;
        yFood = (Math.ceil(Math.floor(Math.random() * canvas.height)/20)*20)-20;
        return true
    }
}

// automatically move the snake
function move() {
    const snakeBody = 
    {x: snake[0].x + xSpeed, y:snake[0].y + ySpeed};
    // 
    snake.unshift(snakeBody);

    // when food is eaten extend the length by 1 and update score and length
    if(foodEaten()) {
        document.getElementById('length').innerHTML = `Snake Length: ${snake.length}`;
        gameScore += 1;
        document.getElementById('score').innerHTML = `Score: ${gameScore}`;
        if(gameScore % 5 == 0) {
            gameSpeed += 2;
        }
    } else {
    snake.pop();
    }
}



// control snake with arrow keys
document.addEventListener('keydown', function(event) {
    //console.log(event);
    if(event.key == 'Enter') {
        isActive = 1;
    }
    
    // IF left arrow pressed and snake is not moving right, move snake 10px right
    if(event.key == 'ArrowLeft' && xSpeed != 20) {
        xSpeed = -20;
        ySpeed = 0;
    }

    // IF right arrow pressed and snake is not moving left, move snake 10px left
    if(event.key == 'ArrowRight' && xSpeed != -20) {
        xSpeed = 20;
        ySpeed = 0;
    }

    // IF up arrow pressed and snake is not moving down, move snake 10px up
    if(event.key == 'ArrowUp' && ySpeed != 20) {
        xSpeed = 0;
        ySpeed = -20;
    }

    // IF down arrow pressend and snake is not moving up, move snake 10px down
    if(event.key == 'ArrowDown' && ySpeed != -20) {
        xSpeed = 0;
        ySpeed = 20;
    }
})


// reset game, snake position and direction

function reset() {
    clear();

    snake = [
        {x: 300, y:160},
        {x: 280, y:160},
        {x: 260, y:160},
        {x: 240, y:160}
    ]
    
    // horizontal and vertical speed
    xSpeed = 20;
    ySpeed = 0;
    
    isActive = 1;

}
// TODO:

// 5. ability to reset game when game over - fix reset() function
// 6. increase score increment as the speed increase



