const canvas = document.getElementById("game")
const context = canvas.getContext("2d")
const ground = document.getElementById("ground")
const berry = document.getElementById("berry")
const headLeft = document.getElementById("head-left")
const headRight = document.getElementById("head-right")
const headUp = document.getElementById("head-up")
const headDown = document.getElementById("head-down")
const bodyV = document.getElementById("body-vertical")
const bodyH = document.getElementById("body-horizontal")
const tailLeft = document.getElementById("tail-left")
const tailRight = document.getElementById("tail-right")
const tailUp = document.getElementById("tail-up")
const tailDown = document.getElementById("tail-down")
const tile = 74

const head = {
    left: headLeft,
    right: headRight,
    up: headUp,
    down: headDown
}
const body = {
    left: bodyH,
    right: bodyH,
    up: bodyV,
    down: bodyV
}
const tail = {
    left: tailLeft,
    right: tailRight,
    up: tailUp,
    down: tailDown
}

let food = {
    x: 10,
    y: 10
}
let activeImage
function placeFood(food) {
    food.x = Math.floor(Math.random()*7)* tile + 10
    food.y = Math.floor(Math.random()*7)* tile + 10
}
let snake = []
snake[0] = {
    x: 7*tile + 10,
    y: 7*tile +10
}
let snakeX = snake[0].x
let snakeY = snake[0].y
let direction

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && direction != "down")
        direction = "up"
    else if (e.key === "ArrowDown" && direction != "up")
        direction = "down"
    else if (e.key === "ArrowLeft" && direction != "right")
        direction = "left"
    else if (e.key === "ArrowRight" && direction != "left")
        direction = "right"
})

function drawGame() {
    context.drawImage(ground, 0, 0)
    context.drawImage(berry, food.x, food.y)
    for (let i = 0; i < snake.length; i++) {
        if (i == 0)
            context.drawImage(head[direction], snake[i].x-6, snake[i].y-6, tile, tile)
            // activeImage = head[direction]
        else {
            context.fillStyle = "green"
            context.fillRect(snake[i].x-6, snake[i].y-6, tile, tile)
        }
        // else if (i == snake.length - 1)
        //     activeImage = tail[direction]
        // else activeImage = body[direction]
        // context.drawImage(activeImage, snake[i].x-6, snake[i].y-6, tile, tile)
    }

    if (snakeX === food.x && snakeY === food.y) {
        placeFood(food)
    }
    else snake.pop()

    if (snakeX < 0 || snakeX > tile*8 ||  snakeY < 10 || snakeY > tile*8)
        clearInterval(game)

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

let game = setInterval(drawGame, 120) 