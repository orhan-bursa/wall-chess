

function assert(truthy, msg, ...data) {
    if (!truthy) {
        console.error(msg, ...data)
        throw new Error(msg)
    }
}

const COLORS = {
    red: '#ae746c',
    yellow: '#e8c87d',
    brown: '#5b4946',
    black: '#2d2a25',
    gray: '#b7b5af'
}

const THEME = {
    background: COLORS.brown,
    tile: COLORS.black,
    wall: COLORS.yellow,
    line: COLORS.red,
}

const TILES = {
    countX: 9,
    countY: 9,
    width: 50,
    height: 50,
    fullCountX: 9,
    fullCountY: 13
}

const LINES = {
    width: 10,
    countVertical: 10,
    countHorizontal: 10,
    fullCountVertical: 10,
    fullCountHorizontal: 14
}
const MAP = {
    width: TILES.fullCountX * TILES.width + LINES.countVertical * LINES.width,
    height: TILES.fullCountY * TILES.height + LINES.fullCountHorizontal * LINES.width,
}

console.log(MAP)


/** @type {HTMLCanvasElement | null} */
const canvas = document.getElementById('wall-chess-canvas')
assert(!!canvas, "canvas must exist")

canvas.width = MAP.width
canvas.height = MAP.height

const ctx = canvas.getContext("2d")
assert(!!ctx, "ctx must exist")

console.log('initialized')

function drawMapLines() {
    ctx.fillStyle = THEME.line;
    //TOP and BOTTOM first horizontal lines
    ctx.fillRect(0, 0, canvas.width, LINES.width)
    ctx.fillRect(0, canvas.height - LINES.width, canvas.width, LINES.width)

    //Horizontal Lines
    for (let i = 0; i < LINES.countHorizontal; i++) {
        const offset = TILES.height * 2 + LINES.width * 2
        const spacing = TILES.height + LINES.width
        ctx.fillRect(0, offset + i * spacing, canvas.width, LINES.width)
    }
    //Vertical Lines
    for (let i = 0; i < LINES.countVertical; i++) {
        const spacing = TILES.width + LINES.width
        ctx.fillRect(i * spacing, 0, LINES.width, canvas.height)
    }
}

function drawBackground() {
    // Fill background
    ctx.fillStyle = THEME.tile;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawMapLines()
}
// function drawSprite(sprite) {
//     ctx.fillStyle = sprite.color;
//     ctx.fillRect(sprite.x, sprite.y, sprite.width, sprite.height);
// }

function update(dt) {
    // Update game state (e.g., positions, physics)
    console.log('update')
}

function render() {
    // Draw background
    drawBackground();
    // drawSprite(player);
}

let lastTime = 0;

function gameLoop(timestamp) {
    const dt = (timestamp - lastTime) / 1000; // delta time in seconds
    lastTime = timestamp;

    update(dt);
    render();
    console.log('ran once')

    //   requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
