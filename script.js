const canvas = document.getElementById("game")
const context = canvas.getContext("2d")
const scoreText = document.getElementById("score")
const gameOverText = document.getElementById("game-over")
gameOverText.style.display = "none"

const ground = new Image()
ground.src = "./images/ground.png"

const croissant = new Image()
croissant.src = "./images/croissant.png"

const berry = new Image()
berry.src = "./images/berry.png"

const peach = new Image()
peach.src = "./images/peach.png"

const cupcake = new Image()
cupcake.src = "./images/cupcake.png"

const headImg = {
    left: new Image(),
    right: new Image(),
    up: new Image(),
    down: new Image()
}
headImg.left.src = "./images/head-left.png"
headImg.right.src = "./images/head-right.png"
headImg.up.src = "./images/head-up.png"
headImg.down.src = "./images/head-down.png"

const body = {
    horizontal: new Image(),
    vertical: new Image(),
    corner_ul: new Image(),
    corner_ur: new Image(),
    corner_dl: new Image(),
    corner_dr: new Image(),
}
body.horizontal.src = "./images/body-horizontal.png"
body.vertical.src = "./images/body-vertical.png"
body.corner_ul.src = "./images/corner-ul.png"
body.corner_ur.src = "./images/corner-ur.png"
body.corner_dl.src = "./images/corner-dl.png"
body.corner_dr.src = "./images/corner-dr.png"

const tail = {
    left: new Image(),
    right: new Image(),
    up: new Image(),
    down: new Image()
}
tail.left.src = "./images/tail-left.png"
tail.right.src = "./images/tail-right.png"
tail.up.src = "./images/tail-up.png"
tail.down.src = "./images/tail-down.png"

const tile = 74
let activeImage
let direction = "up"
let canTurn = true
let score = 0

const food = {
    picks: [berry, peach, croissant, cupcake],
    x: Math.floor(Math.random()*7)* tile + 10,
    y: Math.floor(Math.random()*7)* tile + 10
}

let snake =  []
snake[0] = {
    x: 4*tile + 10,
    y: 4*tile + 10
}
let snakeX = snake[0].x
let snakeY = snake[0].y
let currentFood = food.picks[0]

function getRndFoodPosition(food) {
    let isOverlapping; // Bool to check if food overlaps with snake
    
    do {
        food.x = Math.floor(Math.random() * 7) * tile + 10;
        food.y = Math.floor(Math.random() * 7) * tile + 10;
        
        
        isOverlapping = false; // When the loop starts it assumes food does not overlap with snake
        for (let i = 0; i < snake.length; i++) { // Loop through the snake segments
            if (food.x === snake[i].x && food.y === snake[i].y) {
                isOverlapping = true; // If food overlaps, it becomes true.
                break;
            }
        }
    } while (isOverlapping);
}

function pickRndFood() {
    const index = Math.floor(Math.random() * food.picks.length)
    currentFood = food.picks[index]
}

function getDirection(from, to) {
    if (from.x === to.x - tile && from.y === to.y) return "right"
    if (from.x === to.x + tile && from.y === to.y) return "left"
    if (from.x === to.x && from.y === to.y - tile) return "down"
    if (from.x === to.x && from.y === to.y + tile) return "up"
}

function getCornerKey(from, to) {
    const key = `${from}_${to}`
    const map = {
        "up_right": "corner_ul",
        "right_up": "corner_dr",
        "up_left": "corner_ur",
        "left_up": "corner_dl",
        "down_left": "corner_dr",
        "left_down": "corner_ul",
        "down_right": "corner_dl", 
        "right_down": "corner_ur",
    }
    return map[key] || map[`${to}_${from}`]
}

function updateSnake() {
    if (direction === "up")
        snakeY -= tile
    if (direction === "down") 
        snakeY += tile
    if (direction === "left") 
        snakeX -= tile
    if (direction === "right") 
        snakeX += tile
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead)
}
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.key != "ArrowLeft" && e.key != "ArrowRight" && e.key != "ArrowUp" && e.key != "ArrowDown"){
        document.location.reload()
        return
    }

    if (!canTurn) return

    if ((e.key === "ArrowLeft" || e.key === "a" || e.key === "A") && direction != "right" && direction != "left") {
        direction = "left"
        canTurn = false
    }
    else if ((e.key === "ArrowRight" || e.key === "d" || e.key === "D") && direction != "left" && direction != "right") {
        direction = "right"
        canTurn = false
    }
    else if ((e.key === "ArrowUp" || e.key === "w" || e.key === "W") && direction != "down" && direction != "up") {
        direction = "up"
        canTurn = false
    }
    else if ((e.key === "ArrowDown" || e.key === "s" || e.key === "S") && direction != "up" && direction != "down") {
        direction = "down"
        canTurn = false
    }
})

function drawGame() {
    updateSnake()
    canTurn = true
    context.drawImage(ground, 0, 0)
    context.drawImage(currentFood, food.x, food.y)
    
    for (let i = 0; i < snake.length; i++) {
        const segment = snake[i]
        let dir = "up"

        //Head
        if (i === 0)
            activeImage = headImg[direction]

        //Tail
        else if (i === snake.length - 1) {
            dir = getDirection(segment, snake[i - 1])
            activeImage = tail[dir]
        }

        //Body
        else {
            const previous = snake[i - 1]
            const next = snake [i + 1]
            const from = getDirection(segment, next)
            const to = getDirection(previous, segment)
            
            if (from === "left" && to === "left" || from === "right" && to === "right")
                activeImage = body.horizontal
            else if (from === "up" && to === "up" || from === "down" && to === "down")
                activeImage = body.vertical
            else
                activeImage = body[getCornerKey(from, to)]
        }
        context.drawImage(activeImage, segment.x-6, segment.y-6, tile, tile)
    }

    // Check for wall collision
    if (snakeX < 0 || snakeX > tile*8 ||  snakeY < 10 || snakeY > tile*8){
        score = 0
        gameOverText.style.display = "block"
        clearInterval(game)
        return
    }
    
    // Check for self-collision
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snakeX && snake[i].y === snakeY) {
            score = 0;
            gameOverText.style.display = "block";
            clearInterval(game);
            return;
        }
    }

    if (snakeX === food.x && snakeY === food.y) {
        pickRndFood()
        getRndFoodPosition(food)
        score++
        scoreText.textContent = "Score: " + score
    }
    else snake.pop()

}
let game = setInterval(drawGame, 180)