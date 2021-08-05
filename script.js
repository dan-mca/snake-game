// get canvas from html
const canvas = document.getElementById('gameCanvas');

// set canvas context to 2d
const ctx = canvas.getContext('2d');

let game;
let isActive = 1;

let gameText = document.getElementById('gameText');
let gameScoreText = document.getElementById('score');
let snakeLengthText = document.getElementById('length');
let resetButton = document.getElementById('resetButton');
let highScoreText = document.getElementById('topScore');

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
let topScore = [];
let scoreMultiplier = 1;

// run the game. difficulty determines the game speed and increase in score
function startGame(gameSpeed) {
    game = setInterval(drawGame, 1000/gameSpeed);
    if (gameSpeed == 3) {
        scoreMultiplier = 1;
    } else if (gameSpeed == 6) {
        scoreMultiplier = 2;
    } else if (gameSpeed == 10) {
        scoreMultiplier = 3;
    } else {
        scoreMultiplier = 4;
    }
}

// game functions in each loop
function drawGame() {
    // when game has ended stop and display game over text
    if (isActive === 0) {
        gameText.innerHTML = 'Game Over';
        resetButton.style.display = 'block';
        clearInterval(game);
        topScore.push(gameScore);
        highScoreText.innerHTML = Math.max.apply(null, topScore);
        return;
    } else { 
        gameOver();
        gameText.innerHTML = '';
        difficultyButtons.style.display = 'none';
        clear();
        draw();
        move();
        drawFood();
        foodEaten();
    }
}


// draw snake on canvas
function draw() {
    snake.forEach(function (snakePart){
        ctx.fillStyle = 'green';
        ctx.fillRect(snakePart.x, snakePart.y, 20, 20); 
    })
}

// end game if snake collides with itself or canvas border
function gameOver() {
    for(let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            isActive = 0;
        }
    }
    // IF x < 0 or >= 600 or y <0 or >= 300, end the game
    if (snake[0].x <= -10|| snake[0].x >= canvas.width - 10
        || snake[0].y <= -10 || snake[0].y >= canvas.height - 10 ) {
        isActive = 0;
    }
}

// if first segment of snake collides with food, regenerate food in random position
function foodEaten() {
    if(xFood === snake[0].x && yFood === snake[0].y) {
        xFood = (Math.ceil(Math.floor(Math.random() * canvas.width)/20)*20)-20;
        yFood = (Math.ceil(Math.floor(Math.random() * canvas.height)/20)*20)-20;
        return true;
    }
}

// move the snake
function move() {
    // add new segment to the front of the snake based on travelling direction
    const snakeBody = {x: snake[0].x + xSpeed, y:snake[0].y + ySpeed};
    snake.unshift(snakeBody);

    // when food is eaten extend the length by 1 and update score and length
    if(foodEaten()) {
        snakeLengthText.innerHTML = `${snake.length}`;
        
        gameScore += scoreMultiplier;
        gameScoreText.innerHTML = `${gameScore}`;
    } else {
    snake.pop(); // remove last segment 
    }
}


// control snake with arrow keys
document.addEventListener('keydown', function(event) {
    // IF left arrow pressed and snake is not moving right, move snake 20px right
    if(event.key == 'ArrowLeft' && xSpeed != 20) {
        xSpeed = -20;
        ySpeed = 0;
    }

    // IF right arrow pressed and snake is not moving left, move snake 20px left
    if(event.key == 'ArrowRight' && xSpeed != -20) {
        xSpeed = 20;
        ySpeed = 0;
    }

    // IF up arrow pressed and snake is not moving down, move snake 20px up
    if(event.key == 'ArrowUp' && ySpeed != 20) {
        xSpeed = 0;
        ySpeed = -20;
    }

    // IF down arrow pressend and snake is not moving up, move snake 20px down
    if(event.key == 'ArrowDown' && ySpeed != -20) {
        xSpeed = 0;
        ySpeed = 20;
    }
})

// control snake with buttons 
document.addEventListener('click', function(event) {
    let direction = event.target.value;
    console.log(direction)

    if(direction == 'left' && xSpeed != 20) {
        xSpeed = -20;
        ySpeed = 0;
    }

    if(direction == 'right' && xSpeed != -20) {
        xSpeed = 20;
        ySpeed = 0;
    }

    if(direction == 'up' && ySpeed != 20) {
        xSpeed = 0;
        ySpeed = -20;
    }

    if(direction == 'down' && ySpeed != -20) {
        xSpeed = 0;
        ySpeed = 20;
    }
})


// add food randomly to canvas
function drawFood() {
    ctx.beginPath();
    ctx.arc(xFood+10, yFood+10, 10 ,0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
}

// clear the canvas
function clear() {
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// reset game; clear canvas and reset default variables
function reset() {
    clear();

    snake = [
        {x: 300, y:160},
        {x: 280, y:160},
        {x: 260, y:160},
        {x: 240, y:160}
    ]
    
    xSpeed = 20;
    ySpeed = 0;

    gameScore = 0;
    
    snakeLengthText.innerHTML = '0';
    gameScoreText.innerHTML = '0';
    gameText.innerHTML = '';
    
    isActive = 1;

    gameText.style.display = 'block';
    gameText.innerHTML = 'Snake';
    difficultyButtons.style.display = 'block';
    resetButton.style.display = 'none';
}