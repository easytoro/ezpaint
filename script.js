let gridSize = 64;
const gridState = document.querySelector("#gridState");
gridState.innerHTML = gridSize;
pickerUsed = false;
const colorPicker = document.querySelector('#colorpicker');

//State display
const container = document.querySelector('#container');
isClicked = false;
let state = "pencil";
function setState(call) {
    state = call;
}

const colorDisplay = document.querySelector("#colorState");
let currentColor = "black";
colorState.innerHTML = currentColor;

function updateColor (color) {
    colorState.innerHTML = color;
    currentColor = color;
}

const toolDisplay = document.querySelector("#toolState");
toolState.innerHTML = "pencil";

function getState () {
    toolState.innerHTML = state;
}


let mouseDown = false;
const stateDisplay = document.querySelector("#state");
stateDisplay.innerHTML = "false";

window.addEventListener("mousedown", () => {
    mouseDown = true;
    stateDisplay.innerHTML = "true";
})
window.addEventListener("mouseup", () => {
    mouseDown = false;
    stateDisplay.innerHTML = "false";
})

//Get random color
function randomColor() {
    color =  Math.floor(Math.random()*16777215).toString(16);
    return color;
}

function drawGrid(size) {
    for (let j = 0; j < size * size; j++) {
        let square = document.createElement('square');
        square.className = 'square';
        square.id = 'square';
        container.appendChild(square);

        square.addEventListener("mousedown", function () {
            if (state == "pencil"){
                if (pickerUsed == true){
                    this.style.backgroundColor = colorPicker.value;
                }
                else {
                    this.style.backgroundColor = currentColor;
                }
            }
            else if (state == "eraser"){
                this.style.backgroundColor = "white";
            }
            else if (state == "rainbow"){
                this.style.backgroundColor = "#" + randomColor();
                updateColor("random");
            }
            else if (state == "eyedropper"){
                updateColor(this.style.backgroundColor.toString());
                state = "pencil";
                document.body.style.cursor = "default";
                pickerUsed = true;
            }
        });

        square.addEventListener("mouseenter", function () {
            if (state == "pencil" && mouseDown == true){
                if (pickerUsed == true){
                    this.style.backgroundColor = colorPicker.value;
                }
                else {
                    this.style.backgroundColor = currentColor;
                }
            }
            else if (state == "eraser" && mouseDown == true){
                this.style.backgroundColor = "white";
            }
            else if (state == "rainbow" && mouseDown == true){
                this.style.backgroundColor = "#" + randomColor();
                updateColor("random");
            }
        });    
    }
}

//Erase grid children
function deleteGrid(){
    while(allSquares.length > 0){
        allSquares[0].remove();
    } 
}

function squareSize() {
    for (i = 0; i < allSquares.length; i++){

        dimension = 512/gridSize;

        allSquares[i].style.width = (dimension.toString() + 'px');
        allSquares[i].style.height = (dimension.toString() + 'px');
    }
};

//Changegrid size
const bSize = document.querySelector('#btn5');
bSize.addEventListener("click", () =>  {
    gridSize = prompt("Please enter a number");
    deleteGrid();
    gridState.innerHTML = gridSize; 
    
    drawGrid(gridSize); 
    squareSize();

    for (i = 0; i < allSquares.length; i++){
        allSquares[i].style.height = toString(512/gridSize) + "px";
        allSquares[i].style.width = toString(512/gridSize) + "px";
    }

    let newWidth = 512/gridSize.toString();
    let newHeight = 512/gridSize.toString();

    let widthString = '';
    let heightString = '';

    for (i = 0; i < gridSize; i++){
        widthString += (newWidth + "px" + " ");
        heightString += (newHeight + "px" + " ");
    }

    document.getElementById("container").style.gridTemplateColumns = widthString;
    document.getElementById("container").style.gridTemplateRows = heightString;
})


let allSquares = document.getElementsByClassName('square');

//Reset function
document.querySelector('#btn1').addEventListener("click", () => {
    for (i = 0; i < allSquares.length; i++){
        allSquares[i].style.backgroundColor = "white";
    }
});



//State functions
const bDraw = document.querySelector("#btn3");
bDraw.addEventListener("click", () => {
    setState("pencil");
    getState("pencil");
    updateColor(colorPicker.value);
})

const bRainbow = document.querySelector("#btn4");
bRainbow.addEventListener("click", () => {
    setState("rainbow");
    getState("rainbow");
    updateColor("random");
})

const bErase = document.querySelector("#btn2");
bErase.addEventListener("click", () => {
    setState("eraser");
    getState("eraser");
    updateColor("none");
})

const eyeDropper = document.querySelector("#btn7");
eyeDropper.addEventListener("click", () => {
    setState("eyedropper");
    getState("eyedropper")
    updateColor("Please click a color...");
    document.body.style.cursor = "crosshair";
})

colorPicker.addEventListener("input", () => {
    updateColor(colorPicker.value);
})


drawGrid(gridSize);