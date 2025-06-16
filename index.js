

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
    gray: '#b7b5af',
    scarlet: '#782822'
}

const THEME = {
    background: COLORS.brown,
    tile: COLORS.black,
    wall: COLORS.yellow,
    line: COLORS.red,
    pawn: COLORS.scarlet
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
}

const WALLS = {
    countTop: 9,
    countBottom: 9,
    countTotal: 18,
    thickness: LINES.width,
    length: LINES.width + TILES.width * 2
}


const TOP_OFFSET = 2 * TILES.height + 2 * LINES.width
const TOP_OFFSET_TO_TILES = TOP_OFFSET + LINES.width
const LEFT_OFFSET = 2 * TILES.width + 2 * LINES.width
const LEFT_OFFSET_TO_TILES = LEFT_OFFSET + LINES.width

const SPACING_X = TILES.width + LINES.width
const SPACING_Y = TILES.height + LINES.width

const MAP = {
    width: TILES.countX * TILES.width + LINES.countVertical * LINES.width + 2 * LEFT_OFFSET,
    height: TILES.countY * TILES.height + LINES.countHorizontal * LINES.width + 2 * TOP_OFFSET,
}

/** @type {HTMLCanvasElement | null} */
const canvas = document.getElementById('wall-chess-canvas')
assert(!!canvas, "canvas must exist")

canvas.width = MAP.width
canvas.height = MAP.height

const ctx = canvas.getContext("2d")
assert(!!ctx, "ctx must exist")

console.log('initialized')

/** @type {Array<'a'|'b'|'c'|'d'|'e'|'f'|'g'|'h'|'i'>}*/
const xAxisNames = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
/** @type {Array<'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'>}*/
const yAxisNames = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

/**
 * @param {Tuple<xAxisNames[number] | yAxisNames[number]> } between
 * @param {Tuple<xAxisNames[number] | yAxisNames[number]> } along
*/
function drawWall(between, along) {

}

function drawInitialWalls() {
    //TOP walls
    for (let i = 0; i < WALLS.countTop; i++) {
        const x = LEFT_OFFSET + i * SPACING_X
        const y = LINES.width

        ctx.fillStyle = THEME.wall
        ctx.fillRect(x, y, WALLS.thickness, WALLS.length)
    }

    //BOTTOM walls
    for (let i = 0; i < WALLS.countBottom; i++) {
        const x = LEFT_OFFSET + SPACING_X + i * SPACING_X
        const y = canvas.height - TOP_OFFSET

        ctx.fillStyle = THEME.wall
        ctx.fillRect(x, y, WALLS.thickness, WALLS.length)
    }

}

/**
 * @param {{ x: number, y: number, radius?: number, counterclockwise?: boolean, color?:string }} args
 */
function drawPawn({ x, y, radius = TILES.width / 3, color = THEME.pawn }) {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
}

function drawInitialPawns() {
    const topPawn = {
        x: LEFT_OFFSET_TO_TILES + 4 * SPACING_X + TILES.width / 2,
        y: TILES.height
    }
    const bottomPawn = {
        x: LEFT_OFFSET_TO_TILES + 4 * SPACING_X + TILES.width / 2,
        y: canvas.height - TILES.height
    }
    drawPawn({ ...topPawn })
    drawPawn({ ...bottomPawn })
}



function drawMapLines() {
    ctx.fillStyle = THEME.line;
    //TOP and BOTTOM first horizontal lines
    ctx.fillRect(0, 0, canvas.width, LINES.width)
    ctx.fillRect(0, canvas.height - LINES.width, canvas.width, LINES.width)

    ctx.fillRect(0, 0, LINES.width, canvas.height)
    ctx.fillRect(canvas.width - LINES.width, 0, LINES.width, canvas.height)

    // LEFT and RIGHT empty spaces
    ctx.fillRect(0, TOP_OFFSET, LEFT_OFFSET, canvas.height - TOP_OFFSET * 2)
    ctx.fillRect(canvas.width - LEFT_OFFSET, TOP_OFFSET, LEFT_OFFSET, canvas.height - TOP_OFFSET * 2)


    //Horizontal Lines
    for (let i = 0; i < LINES.countHorizontal; i++) {
        const offset = TOP_OFFSET
        const spacing = SPACING_Y
        ctx.fillRect(0, offset + i * spacing, canvas.width, LINES.width)
    }
    //Vertical Lines
    for (let i = 0; i < LINES.countVertical; i++) {
        const offset = LEFT_OFFSET
        const spacing = SPACING_X
        ctx.fillRect(offset + i * spacing, 0, LINES.width, canvas.height)
    }
}
function drawBackground() {
    ctx.fillStyle = THEME.tile;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

}
function writeTileAxisNames() {

    ctx.fillStyle = 'white';
    ctx.font = '14px sans-serif';
    for (let i = 0; i < TILES.countX; i++) {
        const offsetX = LEFT_OFFSET_TO_TILES + TILES.width / 2 - 5
        const offsetY = TOP_OFFSET_TO_TILES - TILES.width / 2
        const spacingX = SPACING_X
        const x = offsetX + i * spacingX
        const y = offsetY

        ctx.fillText(xAxisNames[i].toUpperCase(), x, y);
    }
    for (let i = 0; i < TILES.countY; i++) {
        const offsetX = LEFT_OFFSET_TO_TILES
        const offsetY = TOP_OFFSET_TO_TILES
        const spacingY = SPACING_Y

        const x = offsetX - TILES.width / 2
        const y = offsetY + i * spacingY + TILES.width / 2 + 5

        ctx.fillText(yAxisNames[i], x, y);
    }
}

/**
 * @param {xAxisNames[number]} xName
 * @param {yAxisNames[number]} yName
*/
function getTileByAxisNames(xName, yName) {
    const xIndex = xAxisNames.indexOf(xName)
    const yIndex = yAxisNames.indexOf(yName)

    const x = xIndex === -1 ? 0 : LEFT_OFFSET_TO_TILES + xIndex * SPACING_X
    const y = yIndex === -1 ? 0 : TOP_OFFSET_TO_TILES + yIndex * SPACING_Y

    return {
        x,
        y,
        xName,
        yName,
        corners: {
            'top-left': {
                x,
                y
            },
            'top-right': {
                x: x + TILES.width,
                y
            },
            'bottom-right': {
                x: x + TILES.width,
                y: y + TILES.height
            },
            'bottom-left': {
                x,
                y: y + TILES.height
            }
        },
        center: {
            x: x + TILES.width / 2,
            y: y + TILES.height / 2
        }
    }

}

function update(dt) {
    // Update game state (e.g., positions, physics)
    console.log('update')
}
function render() {
    drawBackground()
    drawMapLines()
    writeTileAxisNames()
    drawInitialWalls()
    drawInitialPawns()
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
