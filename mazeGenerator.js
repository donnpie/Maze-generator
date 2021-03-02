
let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");

let w = 30; //cell width
let h = w; //cell height
let rows = 20;
let columns = rows;
let height = h * rows;
let width = w * columns;

canvas.width = width;
canvas.height = height;

function Cell(x, y, w, i, j){
    //x, y is the top left corner
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
        //console.log(`Drawing cell: index:${this.index}, i: ${this.i}, j: ${this.j}`);
        let top = this.walls[0];
        let right = this.walls[1];
        let bottom = this.walls[2];
        let left = this.walls[3];
        //console.log(`top:${top}, right: ${right}, bottom: ${bottom}, left: ${left}`);
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
        //console.log(topIdx);
        let top = this.i > 0 ? cells[topIdx] : undefined;
        //console.log(top);
        this.neighbors.push(top);

        let rightIdx = getIndexFromRowCol(this.i, this.j + 1, columns);
        //console.log(rightIdx);
        let right = this.j != columns - 1 ? cells[rightIdx] : undefined;
        //console.log(right);
        this.neighbors.push(right);

        let bottomIdx = getIndexFromRowCol(this.i + 1, this.j, columns);
        //console.log(bottomIdx);
        let bottom = this.j < columns - 1 ? cells[bottomIdx] : undefined;
        //console.log(bottom);
        this.neighbors.push(bottom);

        let leftIdx = getIndexFromRowCol(this.i, this.j - 1, columns);
        //console.log(leftIdx);
        let left = this.j != 0 ? cells[leftIdx] : undefined;
        //console.log(left);
        this.neighbors.push(left);
    }

    // this.hasUnvisitedNeighbors = function(){
    //     //Returns true if this node has any unvisited neighbors
    //     for (let i = 0; i < this.neighbors.length; i++){
    //         if (this.neighbors[i]){
    //             if (this.neighbors[i].isVisited == false ) return true;
    //         }
    //     }
    //     return false;
    // }

    this.getUnvisitedNeighbors = function(){
        //Returns a list of unvisited neighbors
        currentCell.getNeighbors(columns, cells); //Update the neighbors property
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
    console.log(`Calling removeWall`);
    console.log(`current: index:${currentCell.index}, i: ${currentCell.i}, j: ${currentCell.j}`);
    console.log(`next: index:${nextCell.index}, i: ${nextCell.i}, j: ${nextCell.j}`);
    let currentIdx = currentCell.index;
    let nextIdx = nextCell.index;
    //figure out which wall to remove
    if (nextCell.i - currentCell.i == 1) {
        console.log("nextCell is below currentCell");
        currentCell.walls[2] = false;
        nextCell.walls[0] = false;

    } else if (nextCell.i - currentCell.i == -1) {
        console.log("nextCell is above currentCell");
        currentCell.walls[0] = false;
        nextCell.walls[2] = false;
    } else if (nextCell.j - currentCell.j == 1) {
        console.log("nextCell is right of currentCell");
        currentCell.walls[1] = false;
        nextCell.walls[3] = false;
    } else if (nextCell.j - currentCell.j == -1) {
        console.log("nextCell is left of currentCell");
        currentCell.walls[3] = false;
        nextCell.walls[1] = false;
    }
}

function DrawCells(cells){
    c.clearRect(0, 0, width, height);
    let n = cells.length;
    for (let i = 0; i < n; i++){
        //cells[i].shadeCell("#6600ff");
        cells[i].draw();
    }
}

function loopFunction(){
    console.log("Waiting...");
}

//Main program//////////////////////////////////////////////////////////
//Generate cells and draw them
cells = [];
for (let i = 0; i < rows; i++){
    for (let j = 0; j < columns; j++){
        cell = new Cell(j*w, i*w, w, i, j); //Note i and j reversed to ensure correct sequence
        //cell.shadeCell("#654321");
        cells.push(cell);
        //console.log(cell.index);
    }
}

//cells[0].draw();
//cells[].draw();
//console.log(cells[0]);
//console.log(cells[1]);
//DrawCells(cells, rows, columns);
//removeWall(cells[0], cells[1]); //right
//removeWall(cells[2], cells[1]); //left
//removeWall(cells[0], cells[20]); //below
//removeWall(cells[40], cells[20]); //above
//cells[0].draw();
//cells[1].draw();
//DrawCells(cells, rows, columns);
//c.clearRect(0, 0, width, height);


let stack = [];
let currentCell = cells[0];
currentCell.isVisited = true;
stack.push(currentCell);
let whileCounter = 0;

while (stack.length > 0) {
    console.log(`Starting while loop with whileCounter: ${whileCounter}`);
    currentCell = stack.pop();
    //currentCell.isVisited = true;
    currentCell.shadeCell('#ffff00');

    //Check if current cell has unvisited neighbors and randomly pick next next cell
    let unvisitedNeighbors = currentCell.getUnvisitedNeighbors();
    //console.log(unvisitedNeighbors);
    let n = unvisitedNeighbors.length;
    console.log(`n: ${n}`);
    if (n > 0) {
        stack.push(currentCell);
        // currentCell.shadeCell('#6600ff');
        let r = Math.floor(Math.random()*n);
        console.log(`r: ${r}`);
        let nextCell = unvisitedNeighbors[r];
        removeWall(currentCell, nextCell);
        nextCell.isVisited = true;
        stack.push(nextCell);
    }
    whileCounter++;
    DrawCells(cells, rows, columns);
    //setTimeout(loopFunction, 300);
} 


//console.log(cells.length);
//cells[6].getNeighbors(columns, cells);
//console.log(cells[6].neighbors);
//console.log(neighbors(cells[6], columns, cells));
//console.log(cells[1]);
//console.log(cells[0].index);
//console.log(cells[0]);

//c.fillRect(50, 50, 200, 200);



















