const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    velocityX: 5,
    velocityY: 5,
    speed: 7,
    color: 'WHITE'
};

const userPaddle = {
    x: 0,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    color: 'WHITE',
    score: 0
};

const aiPaddle = {
    x: canvas.width - 10,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    color: 'WHITE',
    score: 0
};

function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
}

function drawPaddle(x, y, width, height, color) {
    drawRect(x, y, width, height, color);
}

function drawBall(x, y, radius, color) {
    drawCircle(x, y, radius, color);
}

function drawScore(x, y, score) {
    ctx.fillStyle = '#fff';
    ctx.font = '35px Arial';
    ctx.fillText(score, x, y);
}

function drawNet() {
    for (let i = 0; i <= canvas.height; i += 15) {
      drawRect(canvas.width / 2 - 1, i, 2, 10, '#fff');
    }
}

function update() {
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // Simple AI to control the aiPaddle (improve this to make the game challenging)
    aiPaddle.y += (ball.y - (aiPaddle.y + aiPaddle.height / 2)) * 0.1;

    // Collision detection on paddles
    let player = (ball.x < canvas.width / 2) ? userPaddle : aiPaddle;
    if (collision(ball, player)) {
        // Ball hit the paddle
    }

    // Wall collision (top and bottom)
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.velocityY = -ball.velocityY;
    }

    // Reset ball if it goes past paddle (left or right)
    if (ball.x + ball.radius < 0) {
        // AI scores
        aiPaddle.score++;
        resetBall();
    } else if (ball.x - ball.radius > canvas.width) {
        // Player scores
        userPaddle.score++;
        resetBall();
    }
}

function collision(b, p) {
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    if (b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom) {
        // Reverse ball velocity
        b.velocityX = (p === userPaddle ? 1 : -1) * ball.speed;

        // Calculate angle of impact
        let collidePoint = b.y - (p.y + p.height / 2);
        collidePoint = collidePoint / (p.height / 2);

        // Calculate the angle in Radians
        let angleRad = collidePoint * Math.PI / 4;

        // Change the X and Y velocity direction
        let direction = (p === userPaddle ? 1 : -1);
        b.velocityX = direction * ball.speed * Math.cos(angleRad);
        b.velocityY = ball.speed * Math.sin(angleRad);

        // Speed up the ball every time it hits a paddle
        ball.speed += 0.1;

        return true;
    }

    return false;
}

function resetBall() {
    // if (ball.x + ball.radius < 0) {
    //   aiPaddle.score++; // AI scores
    // } else if (ball.x - ball.radius > canvas.width) {
    //   userPaddle.score++; // Player scores
    // }
  
    // Reset the ball position and speed
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speed = 7;
    ball.velocityX = -ball.velocityX;
    ball.velocityY = -ball.velocityY;
}

// Control the user paddle with mouse move
canvas.addEventListener('mousemove', (event) => {
    userPaddle.y = event.clientY - canvas.getBoundingClientRect().top - userPaddle.height / 2;
});

function render() {
    // Clear the canvas
    drawRect(0, 0, canvas.width, canvas.height, '#000');

    // Draw the net (optional, but looks nice)
    drawNet();

    // Draw the scores
    drawScore(canvas.width / 4, canvas.height / 6, userPaddle.score);
    drawScore(3 * canvas.width / 4, canvas.height / 6, aiPaddle.score);

    // Draw the paddles
    drawPaddle(userPaddle.x, userPaddle.y, userPaddle.width, userPaddle.height, userPaddle.color);
    drawPaddle(aiPaddle.x, aiPaddle.y, aiPaddle.width, aiPaddle.height, aiPaddle.color);

    // Draw the ball
    drawBall(ball.x, ball.y, ball.radius, ball.color);
}

function game() {
    update(); // Update the game logic
    render(); // Render the game
}

// Start the game loop
let framePerSecond = 50;
let loop = setInterval(game, 1000 / framePerSecond);