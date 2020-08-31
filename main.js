
var canvas = document.getElementById('canvas')
var eraser = document.getElementById('eraser')
var context = canvas.getContext('2d');

// context.fillStyle = 'red'
// context.strokeStyle = 'green'
autoSetCanvasSize()
listenToMouse()





/**鼠标事件 */
function listenToMouse () {
    var mousedown = false
    var lastPosition = { x: 0, y: 0 }
    if (document.body.ontouchstart !== undefined) {
        //触屏设备
        canvas.ontouchstart = function (e) {
            mousedown = true
            var x = e.touches[0].clientX
            var y = e.touches[0].clientY
            if (eraserEnabled) {
                context.clearRect(x-5, y-5, 10, 10)
            } else {
                drawCircle( x, y)
                lastPosition = { x: x, y: y }
            }
        }
        
        canvas.ontouchmove = function (e) {
            var x = e.touches[0].clientX
            var y = e.touches[0].clientY
            if(!mousedown) { return }
            if (eraserEnabled) {
                context.clearRect(x-5, y-5, 10, 10)
            } else {
                drawCircle(x, y, 5)
                drawLine(lastPosition.x, lastPosition.y, x, y)
                lastPosition = { x: x, y: y }
            }
        }
        
        canvas.ontouchend = function () {
            mousedown = false
        }
    } else {
        //非触屏设备
        canvas.onmousedown = function(e) {
            mousedown = true
            var x = e.clientX
            var y = e.clientY
            if (eraserEnabled) {
                context.clearRect(x-5, y-5, 10, 10)
            } else {
                drawCircle( x, y)
                lastPosition = { x: x, y: y }
            }
        }
        
        canvas.onmousemove = function(e) {
            x = e.clientX
            y = e.clientY
            if(!mousedown) { return }
            if (eraserEnabled) {
                context.clearRect(x-5, y-5, 10, 10)
            } else {
                drawCircle(x, y, 5)
                drawLine(lastPosition.x, lastPosition.y, x, y)
                lastPosition = { x: x, y: y }
            }
        }
        canvas.onmouseup = function(e) {
            mousedown = false
        } 
    }
    
}


var eraserEnabled = false
eraser.onclick = function () {
    eraserEnabled = !eraserEnabled
}

/**设置画布尺寸 */
function autoSetCanvasSize () {
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
}

/**画线、画圆 */
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