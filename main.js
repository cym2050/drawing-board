document.querySelector('body').addEventListener('touchmove', function (ev) {
    event.preventDefault();
    }, {passive:false});

var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d');

// context.fillStyle = 'red'
// context.strokeStyle = 'green'
autoSetCanvasSize()
listenToMouse()



var eraserEnabled = false
eraser.onclick = function () {
    eraserEnabled = true 
    eraser.classList.add('active')
    brush.classList.remove('active')
}
brush.onclick = function () {
    eraserEnabled = false
    brush.classList.add('active')
    eraser.classList.remove('active')
}

clear.onclick = function () {
    context.clearRect(0, 0, canvas.width, canvas.height)
}
save.onclick = function () {
    var url = canvas.toDataURL('image/png')
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = '画作'
    a.click()
}


black.onclick = function () {
    context.fillStyle = 'black'
    context.strokeStyle = black
    black.classList.add('active')
    red.classList.remove('active')
    yellow.classList.remove('active')
    blue.classList.remove('active')
}
red.onclick = function () {
    context.fillStyle = 'red'
    context.strokeStyle = 'red'
    red.classList.add('active')
    black.classList.remove('active')
    yellow.classList.remove('active')
    blue.classList.remove('active')
}
yellow.onclick = function () {
    context.fillStyle = 'yellow'
    context.strokeStyle = 'yellow'
    yellow.classList.add('active')
    red.classList.remove('active')
    black.classList.remove('active')
    blue.classList.remove('active')
}
blue.onclick = function () {
    context.fillStyle = 'blue'
    context.strokeStyle = 'blue'
    blue.classList.add('active')
    red.classList.remove('active')
    black.classList.remove('active')
    yellow.classList.remove('active')
}

var lineWidth = 5
thin.onclick = function () {
    lineWidth = 5;
    thin.classList.add('active')
    thick.classList.remove('active')
}
thick.onclick = function () {
    lineWidth = 10;
    thick.classList.add('active')
    thin.classList.remove('active')
}

// colorInput.onclick = function (e) {
//     console.log(e.target.value);
//     context.fillStyle = String(e.target.value)
//     context.strokeStyle = String(e.target.value)
// }
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
                drawCircle( x, y, lineWidth/2)
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
                drawCircle(x, y, lineWidth/2)
                drawLine(lastPosition.x, lastPosition.y, x, y, lineWidth)
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
                drawCircle( x, y, lineWidth/2)
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
                drawCircle(x, y, lineWidth/2)
                drawLine(lastPosition.x, lastPosition.y, x, y, lineWidth)
                lastPosition = { x: x, y: y }
            }
        }
        canvas.onmouseup = function(e) {
            mousedown = false
        } 
    }
    
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
function drawLine (x1, y1, x2, y2, width) {
    context.beginPath()
    context.lineWidth = width;
    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    context.stroke()
    context.closePath()
}