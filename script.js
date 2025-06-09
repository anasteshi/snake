const canvas = document.getElementById("game")
const context = canvas.getContext("2d")

const ground = new Image()
ground.src = "images/ground.png"

const berry = new Image()
berry.src = "images/berry.png"

const headImg = {
    left: new Image(),
    right: new Image(),
    up: new Image(),
    down: new Image()
}
headImg.left.src = "images/head-left.PNG"
headImg.right.src = "images/head-right.PNG"
headImg.up.src = "images/head-up.PNG"
headImg.down.src = "images/head-down.PNG"

const body = {
    horizontal: new Image(),
    vertical: new Image(),
}
body.horizontal.src = "images/body-horizontal.png"
body.vertical.src = "images/body-vertical.png"

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
let direction = "up"

let food = {
    x: 10,
    y: 10
}

let snake =  []
snake[0] = {
    x: 4*tile + 10,
    y: 4*tile + 10
}
let snakeX = snake[0].x
let snakeY = snake[0].y

function placeFood(food) {
    food.x = Math.floor(Math.random()*7)* tile + 10
    food.y = Math.floor(Math.random()*7)* tile + 10
}

function getDirection(from, to) {
    if (from.x === to.x - tile && from.y === to.y) return "right"
    if (from.x === to.x + tile && from.y === to.y) return "left"
    if (from.x === to.x && from.y === to.y - tile) return "down"
    if (from.x === to.x && from.y === to.y + tile) return "up"
}

function updateSnake() {
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
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && direction != "right")
        direction = "left"
    else if (e.key === "ArrowRight" && direction != "left")
        direction = "right"
    else if (e.key === "ArrowUp" && direction != "down")
        direction = "up"
    else if (e.key === "ArrowDown" && direction != "up")
        direction = "down"
})

function drawGame() {
    context.drawImage(ground, 0, 0)
    context.drawImage(berry, food.x, food.y)
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
            
            if (from === "left" && to === "left" || from === "right" && to === "right" || from === "up" && to === "left" || from === "up" && to === "right" || from === "down" && to === "left" || from === "down" && to === "right")
                activeImage = body.horizontal
            else if (from === "up" && to === "up" || from === "down" && to === "down" || from === "left" && to === "down" || from === "right" && to === "down" || from === "left" && to === "up" || from === "right" && to === "up")
                activeImage = body.vertical
        }
        context.drawImage(activeImage, segment.x-6, segment.y-6, tile, tile)
    }

    if (snakeX === food.x && snakeY === food.y) {
        placeFood(food)
    }
    else snake.pop()

    updateSnake()
}
let game = setInterval(drawGame, 200) 