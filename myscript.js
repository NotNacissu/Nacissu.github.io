
const GAME_SPEED = 100;
const CANVAS_BORDER_COLOUR = 'black';
const CANVAS_BACKGROUND_COLOUR = "white";
const SNAKE_COLOUR = 'lightgreen';
const SNAKE_BORDER_COLOUR = 'darkgreen';

let snake = [
  {x: 150, y: 150},
  {x: 140, y: 150},
  {x: 130, y: 150},
  {x: 120, y: 150},
  {x: 110, y: 150}
]

// The user's score
let score = 0;
// When set to true the snake is changing direction
let changingDirection = false;
// Horizontal velocity
let dx = 10;
// Vertical velocity
let dy = 0;


// Get the canvas element
const gameCanvas = document.getElementById("gameCanvas");
// Return a two dimensional drawing context
const ctx = gameCanvas.getContext("2d");

// Start game
main();


// Call changeDirection whenever a key is pressed
document.addEventListener("keydown", changeDirection);


/**
 * Main function of the game
 */
function main() {


    setTimeout(function onTick() {
    changingDirection = false;
    clearCanvas();
    advanceSnake();
    drawSnake();


    // Call game again
    main();
    }, GAME_SPEED)
  
}

/**
 * Change the background colour of the canvas to CANVAS_BACKGROUND_COLOUR and
 * draw a border around it
 */
function clearCanvas() {
  //  Select the colour to fill the drawing
  ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
  //  Select the colour for the border of the canvas
  ctx.strokestyle = CANVAS_BORDER_COLOUR;

  // Draw a "filled" rectangle to cover the entire canvas
  ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
  // Draw a "border" around the entire canvas
  ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}





/**
     * Advances the snake by changing the x-coordinates of its parts
     * according to the horizontal velocity and the y-coordinates of its parts
     * according to the vertical veolocity
     */
function advanceSnake() {
    // Create the new Snake's head
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    // Add the new head to the beginning of snake body
    snake.unshift(head);

    // Remove the last part of snake body so that it doesnt keep extending.
    snake.pop();
}


/**
 * Draws the snake on the canvas
 */
function drawSnake() {
  // loop through the snake parts drawing each part on the canvas
  snake.forEach(drawSnakePart)
}


function drawSnakePart(snakePart) {
  // Set the colour of the snake part
  ctx.fillStyle = SNAKE_COLOUR;

  // Set the border colour of the snake part
  ctx.strokestyle = SNAKE_BORDER_COLOUR;

  // Draw a "filled" rectangle to represent the snake part at the coordinates
  // the part is located
  ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
 
  // Draw a border around the snake part
  ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}


/**
     * Changes the vertical and horizontal velocity of the snake according to the
     * key that was pressed.
     * The direction cannot be switched to the opposite direction, to prevent the snake
     * from reversing
     * For example if the the direction is 'right' it cannot become 'left'
     */
function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    /**
     * Prevent the snake from reversing
     * Example scenario:
     * Snake is moving to the right. User presses down and immediately left
     * and the snake immediately changes direction without taking a step down first
     */
    if (changingDirection) return;
    changingDirection = true;

    const keyPressed = event.keyCode;

    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    if (keyPressed === LEFT_KEY && !goingRight) {
      dx = -10;
      dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
      dx = 0;
      dy = -10;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
      dx = 10;
      dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
      dx = 0;
      dy = 10;
    }
}