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

// draw snake
function drawSnake(snakePart) {
    ctx.fillStyle = 'red';
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
}

// draw snake on canvas
function draw() {
    snake.forEach(drawSnake);
}

draw();

