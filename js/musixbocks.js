window.addEventListener("load", windowLoadHandler, false);
//For debug messages
var Debugger = function() { };
Debugger.log = function(message) {
    try {
        console.log(message);
    }
    catch (exception) {
        return;
    }
}

function windowLoadHandler() {
    canvasApp();
}

function canvasSupport() {
    return Modernizr.canvas;
}

function canvasApp() {
    if (!canvasSupport()) {
        return;
    }

    // All the cool stuff happens here

    var theCanvas = document.getElementById("canvasOne");
    var context = theCanvas.getContext("2d");
    var squares;
    var mouseX;
    var mouseY;
    var timer;
    var counter;

    init();

    // Functions

    function init() {

        squares = [];

        makeSquares();

        drawScreen();

        theCanvas.addEventListener("click", clickListener, false);
        // theCanvas.addEventListener("mousedown", mouseDownListener, false);
        // theCanvas.addEventListener("mousemove", mouseMoveListener, false);
    }

    function makeSquares() {
        var tempX;
        var tempY;
        var tempShape;
        var borderX = 100;
        var borderY = 100;

        for(var x = 0;x<16;x++)
        {
            for (var y = 0; y < 16; y++)
            {
                tempX = (x * 30 + 8) + borderX;
                tempY = (y * 30 + 8) + borderY;
                tempShape = new SimpleSquareParticle(tempX, tempY);
                tempShape.on = 0;
                squares.push(tempShape);

                // innerCtx.fillRect((x*30 + 8) + borderX,(y*30 + 8) + borderY,22,22);
            }
        }

    }

    function drawShapes() {
        var i;
        counter = 0;
        for (i=0; i < squares.length; i++) {
            //the drawing of the shape is handled by a function inside the external class.
            //we must pass as an argument the context to which we are drawing the shape.
            squares[i].drawToContext(context);
            counter+=squares[i].on;
        }
        console.log(counter + " squares active");
        if (counter == 0) {
            clearInterval(timer);
            console.log("Timer cleared");
            context.fillStyle = "blue"
            context.fillRect(400,0,20,20);
        }
    }

    function drawScreen() {
        //bg
        context.fillStyle = "#000000";
        context.fillRect(0,0,theCanvas.width,theCanvas.height);
        context.fillStyle = "red"
        context.fillRect(400,0,20,20);
        drawShapes();
    }

    function findSquares(evt) {
        var i;
        //getting mouse position correctly
        var bRect = theCanvas.getBoundingClientRect();
        mouseX = (evt.clientX - bRect.left)*(theCanvas.width/bRect.width);
        mouseY = (evt.clientY - bRect.top)*(theCanvas.height/bRect.height);

        for (i=0; i < squares.length; i++) {
            if (squares[i].hitTest(mouseX, mouseY)) {
               // var mousePos = getMousePos(theCanvas, evt);
                squares[i].on = !squares[i].on;
                return i;
            }
        }
    }

    function clickListener(evt) {
        var i = findSquares(evt);
        var message = 'Square: ' + i;
        writeMessage(theCanvas, message, false);
        drawScreen();
    }






    function writeMessage(canvas, message, locationNear) {
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, 500, 30);
        context.font = '18pt Calibri';
        context.fillStyle = 'black';
        if (locationNear) {
            context.fillText(message, 10, 25);
        }
        else {
            context.fillText(message,100, 25);
        }

    }















}