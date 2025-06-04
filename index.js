
function assert(truthy, msg, ...data) {
    if (!truthy) {
        console.error(msg, ...data)
        throw new Error(msg)
    }
}


/** @type {HTMLCanvasElement | null} */
const canvas = document.getElementById('wall-chess-canvas')
assert(!!canvas, "canvas must exist")

const ctx = canvas.getContext("2d")
assert(!!ctx, "ctx must exist")

console.log('initialized')


// function update() {
//     console.log("update")
// }

// function render() {
//     console.log('render')
//     ctx.fillStyle = '#000';
//     ctx.beginPath();
//     ctx.moveTo(10, 10);
//     ctx.lineTo(200, 200);
//     ctx.closePath();
//     ctx.fill();
// }

// let loopCount = 0
// function loop() {
//     update()

//     render()
//     loopCount = loopCount + 1

//     if (loopCount > 500) {
//         loopCount = 0
//         return
//     }
//     // requestAnimationFrame(loop)
// }

// loop()
