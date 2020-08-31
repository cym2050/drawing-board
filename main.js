
var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d');

setCanvasSize()
window.onresize = function () {
    setCanvasSize()
}

function setCanvasSize () {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
}



// context.fillStyle = 'red'
// context.strokeStyle = 'green'

function drawCircle (x, y, radius) {
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI*2)
    context.fill()
}
function drawLine (x1, y1, x2, y2, width = 10) {
    context.beginPath()
    context.lineWidth = width;
    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    context.stroke()
    context.closePath()
}

var useing = false
var lastPosition = { x: 0, y: 0 }

canvas.onmousedown = function(e) {
    drawCircle(e.clientX, e.clientY)
    useing = true
    lastPosition.x = e.clientX
    lastPosition.y = e.clientY
}

canvas.onmousemove = function(e) {
    if (useing) {
        x = e.clientX
        y = e.clientY
        drawCircle(x, y, 5)
        drawLine(lastPosition.x, lastPosition.y, x, y)
        lastPosition = { x: x, y: y }
    }
}

canvas.onmouseup = function(e) {
    useing = false
}

