document.addEventListener("DOMContentLoaded", function() {

    const hero = document.querySelector('.hero');
    const obstacle = document.querySelector('.obstacle');
    const gravity = 2;
    let jumpPower = 0;
    let isJumping = false;
    let isMovingLeft = false;
    let isMovingRight = false;
    let heroYPosition = 0;
    let heroXPosition = 50; // Initial horizontal position
    let gameRunning = true; // New flag for game status

    function gameLoop() {
        if (!gameRunning) return;

        // Handle horizontal movement
        if (isMovingLeft) {
            moveLeft();
        }
        if (isMovingRight) {
            moveRight();
        }

        // Handle vertical movement (jumping)
        if (isJumping) {
            heroYPosition += jumpPower;
            jumpPower -= gravity;
        }

        if (heroYPosition < 0) {
            heroYPosition = 0;
            jumpPower = 0;
            isJumping = false;
        }

        hero.style.bottom = heroYPosition + 'px'; // Updates hero's vertical position
        hero.style.left = heroXPosition + 'px'; // Updates hero's horizontal position

        // Check for collisions
        if (checkCollision(hero, obstacle)) {
            handleCollision(); // Call a function to handle collision
        }

        requestAnimationFrame(gameLoop); // Loop this function
    }

    function jump() {
        if (!isJumping) {
            jumpPower = 30;
            isJumping = true;
        }
    }

    function moveLeft() {
        heroXPosition -= 5;
        // Before updating position, check if move would cause a collision
        if (checkCollision(hero, obstacle)) {
            heroXPosition += 5; // If collision, cancel the move
        } else if (heroXPosition < 0) {
            heroXPosition = 0; // Stay within game boundaries
        }
    }

    function moveRight() {
        heroXPosition += 5;
        // Before updating position, check if move would cause a collision
        if (checkCollision(hero, obstacle)) {
            heroXPosition -= 5; // If collision, cancel the move
        } else {
            const maxRight = gameCanvas.offsetWidth - hero.offsetWidth;
            if (heroXPosition > maxRight) {
                heroXPosition = maxRight; // Stay within game boundaries
            }
        }
    }

    function handleCollision() {
        // This is where you handle what happens on collision.
        // For now, we'll just log the collision.
        // You can expand this to include other collision effects.
        console.log('Collision!');
    }

    function checkCollision(a, b) {
        // Temporarily adjust hero's position to check for collision
        const prevX = heroXPosition;
        hero.style.left = heroXPosition + 'px';
        
        const aRect = a.getBoundingClientRect();
        const bRect = b.getBoundingClientRect();
        
        // Revert hero's position after checking
        heroXPosition = prevX;
        
        return (
            aRect.left < bRect.right &&
            aRect.right > bRect.left &&
            aRect.top < bRect.bottom &&
            aRect.bottom > bRect.top
        );
    }

    window.addEventListener('keydown', function(event) {
        switch (event.code) {
            case 'Space':
            case 'ArrowUp':
                jump();
                break;
            case 'ArrowLeft':
                isMovingLeft = true;
                break;
            case 'ArrowRight':
                isMovingRight = true;
                break;
        }
    });

    window.addEventListener('keyup', function(event) {
        switch (event.code) {
            case 'ArrowLeft':
                isMovingLeft = false;
                break;
            case 'ArrowRight':
                isMovingRight = false;
                break;
        }
    });

    gameLoop();
});