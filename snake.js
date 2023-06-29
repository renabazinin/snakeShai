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
let snake = [{ x: 0, y: 0 }];
let direction = { x: 20, y: 0 };
let time = 0;
let flagDone=true;
let touchStartX = 0;
let touchStartY = 0;
let apple = { x: Math.floor(Math.random() * 40) * 20, y: Math.floor(Math.random() * 30) * 20 };

let isGameon =false;

function startGame(speed) {

   if(isGameon)
   {
    return;
   }
   isGameon=true
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
    document.getElementById('easy').classList.remove('big-button');
    document.getElementById('hard').classList.remove('big-button');
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
        case 'w':
            if (direction.y !== 20) direction = { x: 0, y: -20 };
            break;
        case 'ArrowDown': 
        case 's':
            if (direction.y !== -20) direction = { x: 0, y: 20 };
            break;
        case 'ArrowLeft': 
        case 'a':
            if (direction.x !== 20) direction = { x: -20, y: 0 };
            break;
        case 'ArrowRight': 
        case 'd':
            if (direction.x !== -20) direction = { x: 20, y: 0 };
            break;
    }
});

let gameBoard = document.getElementById('game-board');



function gameOver() {
    isGameon=false;
    document.getElementById('easy').classList.add('big-button');
    document.getElementById('hard').classList.add('big-button');
    flagDone = true;
    document.getElementById('game-over').style.display = 'block';
    
    document.getElementById('game-over').innerHTML = 'GameOver\nscore: '+score +' time: '+time+' sec';
}

function resetGame() {
    isGameon=false;
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








window.onload = function() {

    document.getElementById('up').addEventListener('click', function() {
   
        if (direction.y !== 20) direction = { x: 0, y: -20 };
    });

    document.getElementById('down').addEventListener('click', function() {
        if (direction.y !== -20) direction = { x: 0, y: 20 };
    });

    document.getElementById('left').addEventListener('click', function() {
        if (direction.x !== 20) direction = { x: -20, y: 0 };
    });

    document.getElementById('right').addEventListener('click', function() {
        if (direction.x !== -20) direction = { x: 20, y: 0 };
    });

    
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

window.addEventListener('touchmove', function(e) {
    e.preventDefault();
}, { passive: false });


        // Disable arrow key scrolling
        window.addEventListener("keydown", function(e) {
            // Prevent default behavior for arrow keys
            if ([37, 38, 39, 40].includes(e.keyCode)) {
                e.preventDefault();
            }
        });
}
