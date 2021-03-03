//Maze generator with vanilla js
//Donn Pienaar
//2021-03-03
//
//Inspired by Coding Train:
//https://thecodingtrain.com/CodingChallenges/010.1-maze-dfs-p5.html
//
//Iterative backtracking algoritm from Wikipedia:
//https://en.wikipedia.org/wiki/Maze_generation_algorithm

function Cell(x, y, w, i, j){
    //x, y is the top left corner of the cell
    this.x = x;
    this.y = y;
    this.w = w;
    this.i = i; //row position in the grid
    this.j = j; //column position in the grid
    this.isVisited = false; 
    this.index = getIndexFromRowCol(this.i, this.j, columns);
    this.walls = [true, true, true, true]; //order is always top, right, bottom left
    this.neighbors = []; //order is always top, right, bottom left
    this.isCurrent = false;

    this.shadeCell = function(colour){
        c.beginPath();
        c.fillStyle = colour;
        c.fillRect(this.x, this.y, this.w, this.w);
    }

    this.draw = function(){
        let top = this.walls[0];
        let right = this.walls[1];
        let bottom = this.walls[2];
        let left = this.walls[3];
        c.beginPath();
        c. moveTo(this.x, this.y);
        if(top){c.lineTo(this.x + this.w, this.y);} else c.moveTo(this.x + this.w, this.y);
        if(right){c.lineTo(this.x + this.w, this.y + this.w);} else c.moveTo(this.x + this.w, this.y + this.w);
        if(bottom){c.lineTo(this.x, this.y + this.w);} else c.moveTo(this.x, this.y + this.w);
        if(left){c.lineTo(this.x, this.y);} else c.moveTo(this.x, this.y);
        
        c.strokeStyle = "#123456"; //Line colour
        c.stroke();
    }

    this.getNeighbors = function (columns, cells){
        //Must be called before using the neighbors property
        //returns a cell's neighbors
        //current cell is the cell in the middle, for which neighors are to be returned
        //columns is the number of columns in the grid
        //cells is an array of cell objects, containing all the cells in the grid
        
        this.neighbors = [];

        let topIdx = getIndexFromRowCol(this.i - 1, this.j, columns);
        let top = this.i > 0 ? cells[topIdx] : undefined;
        this.neighbors.push(top);

        let rightIdx = getIndexFromRowCol(this.i, this.j + 1, columns);
        let right = this.j != columns - 1 ? cells[rightIdx] : undefined;
        this.neighbors.push(right);

        let bottomIdx = getIndexFromRowCol(this.i + 1, this.j, columns);
        let bottom = this.j < columns - 1 ? cells[bottomIdx] : undefined;
        this.neighbors.push(bottom);

        let leftIdx = getIndexFromRowCol(this.i, this.j - 1, columns);
        let left = this.j != 0 ? cells[leftIdx] : undefined;
        this.neighbors.push(left);
    }

    this.getUnvisitedNeighbors = function(){
        //Returns a list of unvisited neighbors
        currentCell.getNeighbors(columns, cells); //First update the neighbors property
        let unvisitedNeighbors = [];
        for (let i = 0; i < this.neighbors.length; i++){
            if (this.neighbors[i]){
                if (this.neighbors[i].isVisited == false ) {
                    unvisitedNeighbors.push(this.neighbors[i]);
                }
            }
        }
        return unvisitedNeighbors;
    }
}

function getIndexFromRowCol(i, j, cols){
    //Returns the index position for a given row and column number
    //cols is the total number of columns in the array
    return j+i*cols;
}

function removeWall(currentCell, nextCell){
    let currentIdx = currentCell.index;
    let nextIdx = nextCell.index;

    if (nextCell.i - currentCell.i == 1) {
        //console.log("nextCell is below currentCell");
        currentCell.walls[2] = false;
        nextCell.walls[0] = false;

    } else if (nextCell.i - currentCell.i == -1) {
        //console.log("nextCell is above currentCell");
        currentCell.walls[0] = false;
        nextCell.walls[2] = false;

    } else if (nextCell.j - currentCell.j == 1) {
        //console.log("nextCell is right of currentCell");
        currentCell.walls[1] = false;
        nextCell.walls[3] = false;

    } else if (nextCell.j - currentCell.j == -1) {
        //console.log("nextCell is left of currentCell");
        currentCell.walls[3] = false;
        nextCell.walls[1] = false;
    }
}

function DrawCells(cells){
    c.clearRect(0, 0, width, height);
    let n = cells.length;
    for (let i = 0; i < n; i++){
        cells[i].shadeCell("#92c4e0");
        cells[i].draw();
    }
}

function step() {
    if (stack.length > 0) {
        requestAnimationFrame(step);
        currentCell = stack.pop();

        //Check if current cell has unvisited neighbors and randomly pick next next cell
        let unvisitedNeighbors = currentCell.getUnvisitedNeighbors();
        let n = unvisitedNeighbors.length;
        console.log(`n: ${n}`);

        if (n > 0) {
            stack.push(currentCell);
            let r = Math.floor(Math.random()*n);
            console.log(`r: ${r}`);
            let nextCell = unvisitedNeighbors[r];
            removeWall(currentCell, nextCell);
            nextCell.isVisited = true;
            stack.push(nextCell);
        }
        DrawCells(cells, rows, columns);
        currentCell.shadeCell('#ffff00');
    } 
}

//Main program///////////////////////////////////////////////////////////////////////////

let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");
let w = 20; //cell width
let h = w; //cell height
let rows = 30;
let columns = rows;
let height = h * rows; //height of canvas
let width = w * columns; //height of canvas

canvas.width = width;
canvas.height = height;

//Generate cells
cells = [];
for (let i = 0; i < rows; i++){
    for (let j = 0; j < columns; j++){
        cell = new Cell(j*w, i*w, w, i, j); //Note i and j reversed to ensure correct sequence (left to right)
        cells.push(cell);
    }
}

let stack = [];
let currentCell = cells[0];
currentCell.isVisited = true;
stack.push(currentCell);

//Run animation
step();
