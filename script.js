const canvas = document.getElementById("game")
const context = canvas.getContext("2d")
const ground = document.getElementById("ground")
const berry = document.getElementById("berry")
const tile = 74

let food = {
    x: 10,
    y: 10
}
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
        context.fillStyle = "red"
        context.fillRect(snake[i].x-6, snake[i].y-6, tile, tile)
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

let game = setInterval(drawGame, 100) 