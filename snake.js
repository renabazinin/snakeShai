let dot = new Image();
dot.src = 'https://i.imgur.com/bdyedgv.png';

let body = new Image();
body.src = 'http://wildlifehumane.org/wp-content/uploads/2020/06/snake-skin-1000x430.png';

let appleImg = new Image();
appleImg.src = 'https://i.imgur.com/BZbYspy.png';

/*
let apple = { x: Math.floor(Math.random() * 40) * 20, y: Math.floor(Math.random() * 30) * 20 };
let snake = [{ x: 0, y: 0 }];
let direction = { x: 20, y: 0 };

let score = 0;
let time = 0;
let flagDone = false;
*/

let touchStartX = 0;
let touchStartY = 0;
function startGame(speed) {
    // Initialize or reset all game variables
    apple = { x: Math.floor(Math.random() * 40) * 20, y: Math.floor(Math.random() * 30) * 20 };
    snake = [{ x: 0, y: 0 }];
    direction = { x: 20, y: 0 };
    score = 0;
    time = 0;
    flagDone = false;
    document.getElementById('score').innerText = 'Score: 0';
    document.getElementById('timer').innerText = 'Time: 0';
    document.getElementById('game-over').style.display = 'none';
    touchStartX = 0;
    touchStartY = 0;
    // Start the game loop
    gameLoop(speed);
}


function gameLoop(speed) {
    if (flagDone) return;

    let gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';

    // Move the snake
    let head = Object.assign({}, snake[0]); // copy head
    head.x += direction.x;
    head.y += direction.y;
    snake.unshift(head);

    if (snake[0].x === apple.x && snake[0].y === apple.y) {
        // Eat the apple
        apple.x = Math.floor(Math.random() * gameBoard.clientWidth / 20) * 20;
        apple.y = Math.floor(Math.random() * gameBoard.clientHeight / 20) * 20;
        score++;
        document.getElementById('score').innerText = 'Score: ' + score;

    } else {
        // Remove the tail
        snake.pop();
    }

    // Game over
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            snake = [{ x: 0, y: 0 }];
            direction = { x: 20, y: 0 };
            gameOver();

            flagDone=true;
        }
    }

        // Game over when hitting the border
        if (head.x < 0 || head.y < 0 || head.x >= gameBoard.clientWidth || head.y >= gameBoard.clientHeight) {
            gameOver();
            return;
        }

    // Draw the apple
    let appleElement = document.createElement('img');
    appleElement.src = appleImg.src;
    appleElement.className = 'apple';
    appleElement.style.left = `${apple.x}px`;
    appleElement.style.top = `${apple.y}px`;
    gameBoard.appendChild(appleElement);

    // Draw the snake
    for (let part of snake) {
        let partElement = document.createElement('img');
        partElement.src = part === head ? dot.src : body.src;
        partElement.className = 'dot';
        partElement.style.left = `${part.x}px`;
        partElement.style.top = `${part.y}px`;
        gameBoard.appendChild(partElement);
    }

    //setTimeout(gameLoop, 50);
    //gameLoop();
    
    setTimeout(function() { gameLoop(speed); }, speed);
}

window.addEventListener('keydown', function(e) {
    switch (e.key) {
        case 'ArrowUp': 
            if (direction.y !== 20) direction = { x: 0, y: -20 };
            break;
        case 'ArrowDown': 
            if (direction.y !== -20) direction = { x: 0, y: 20 };
            break;
        case 'ArrowLeft': 
            if (direction.x !== 20) direction = { x: -20, y: 0 };
            break;
        case 'ArrowRight': 
            if (direction.x !== -20) direction = { x: 20, y: 0 };
            break;
    }
});

let gameBoard = document.getElementById('game-board');



function gameOver() {
    flagDone = true;
    document.getElementById('game-over').style.display = 'block';
    
    document.getElementById('game-over').innerHTML = 'You mannged to get score of '+score +' in time of: '+time+' seconds';
}

function resetGame() {
    snake = [{ x: 0, y: 0 }];
    direction = { x: 20, y: 0 };
    score = 0;
    time = 0;
    flagDone = false;
    document.getElementById('score').innerText = 'Score: 0';
    document.getElementById('timer').innerText = 'Time: 0';
    document.getElementById('game-over').style.display = 'none';
    gameLoop();
}

setInterval(function() {
    if (!flagDone) {
        time++;
        document.getElementById('timer').innerText = 'Time: ' + time;
    }
}, 1000);

gameLoop();




window.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

window.addEventListener('touchend', function(e) {
    let deltaX = e.changedTouches[0].clientX - touchStartX;
    let deltaY = e.changedTouches[0].clientY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) { // Horizontal swipe
        if (deltaX > 0 && direction.x !== -20) { // Swipe to the right
    
            direction = { x: 20, y: 0 };
        } else if (deltaX < 0 && direction.x !== 20) { // Swipe to the left
            direction = { x: -20, y: 0 };
        }
    } else { // Vertical swipe
        if (deltaY > 0 && direction.y !== -20) { // Swipe downwards
            direction = { x: 0, y: 20 };
        } else if (deltaY < 0 && direction.y !== 20) { // Swipe upwards
            direction = { x: 0, y: -20 };
        }
    }
});