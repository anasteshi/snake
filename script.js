const canvas = document.getElementById("game")
const context = canvas.getContext("2d")

const ground = new Image()
ground.src = "images/ground.png"

const berry = new Image()
berry.src = "images/berry.png"

const head = {
    left: new Image(),
    right: new Image(),
    up: new Image(),
    down: new Image()
}
head.left.src = "images/head-left.PNG"
head.right.src = "images/head-right.PNG"
head.up.src = "images/head-up.PNG"
head.down.src = "images/head-down.PNG"

const body = {
    left: new Image(),
    right: new Image(),
    up: new Image(),
    down: new Image()
}
body.left.src = "images/body-horizontal.png"
body.right.src = "images/body-horizontal.png"
body.up.src = "images/body-vertical.png"
body.down.src = "images/body-vertical.png"

const tail = {
    left: new Image(),
    right: new Image(),
    up: new Image(),
    down: new Image()
}
tail.left.src = "images/tail-left.png"
tail.right.src = "images/tail-right.PNG"
tail.up.src = "images/tail-up.PNG"
tail.down.src = "images/tail-down.PNG"

const tile = 74
let activeImage
let direction

let food = {
    x: 10,
    y: 10
}

let snake = []
snake[0] = {
    x: 7*tile + 10,
    y: 7*tile +10
}

let snakeX = snake[0].x
let snakeY = snake[0].y

function placeFood(food) {
    food.x = Math.floor(Math.random()*7)* tile + 10
    food.y = Math.floor(Math.random()*7)* tile + 10
}

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