
let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");

let w = 30; //cell width
let h = w; //cell height
let rows = 5;
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
    this.neighbors = []; //order is always top, right, bottom left
    this.UnvisitedNeighbors = []; //order is always top, right, bottom left
    this.isCurrent = false;

    this.shadeCell = function(colour){
        c.beginPath();
        c.fillStyle = colour;
        c.fillRect(this.x, this.y, this.w, this.w);
    }

    this.draw = function(top, right, bottom, left){
        c.beginPath();
        c. moveTo(this.x, this.y);
        if(top){c.lineTo(this.x + this.w, this.y);} else c.moveTo(this.x + this.w, this.y);
        if(right){c.lineTo(this.x + this.w, this.y + this.w);} else c.moveTo(this.x + this.w, this.y + this.w);
        if(bottom){c.lineTo(this.x, this.y + this.w);} else c.moveTo(this.x, this.y + this.w);
        if(left){c.lineTo(this.x, this.y);} else c.moveTo(this.x, this.y);
        
        c.strokeStyle = "#123456";
        c.stroke();
    }

    this.eraseBorder = function(side){
        //removes the border on the specified side
        switch(side){
            case 'top':
                break;
            case 'right':
                break;
            case 'bottom':
                break;
            case 'left':
                break;
        }
        c.beginPath();
        c. moveTo(this.x, this.y);
        if(top){c.lineTo(this.x + this.w, this.y);} else c.moveTo(this.x + this.w, this.y);
        if(right){c.lineTo(this.x + this.w, this.y + this.w);} else c.moveTo(this.x + this.w, this.y + this.w);
        if(bottom){c.lineTo(this.x, this.y + this.w);} else c.moveTo(this.x, this.y + this.w);
        if(left){c.lineTo(this.x, this.y);} else c.moveTo(this.x, this.y);
        
        c.strokeStyle = "#123456";
        c.stroke();
    }
    

    this.getNeighbors = function (columns, cells){
        //Must be called before using the neighbors property
        //returns a cell's neighbors
        //cell is the cell in the middle, for which neighors are to be returned
        //columns is the number of columns in the grid
        //cells in an array of cell objects, containing all the cells in the grid
        
        this.neighbors = [];

        let topIdx = getIndexFromRowCol(this.i - 1, this.j, columns);
        console.log(topIdx);
        let top = this.i > 0 ? cells[topIdx] : undefined;
        //console.log(top);
        this.neighbors.push(top);

        let rightIdx = getIndexFromRowCol(this.i, this.j + 1, columns);
        console.log(rightIdx);
        let right = this.j != columns - 1 ? cells[rightIdx] : undefined;
        //console.log(right);
        this.neighbors.push(right);

        let bottomIdx = getIndexFromRowCol(this.i + 1, this.j, columns);
        console.log(bottomIdx);
        let bottom = this.j < columns - 1 ? cells[bottomIdx] : undefined;
        //console.log(bottom);
        this.neighbors.push(bottom);

        let leftIdx = getIndexFromRowCol(this.i, this.j - 1, columns);
        console.log(leftIdx);
        let left = this.j != 0 ? cells[leftIdx] : undefined;
        //console.log(left);
        this.neighbors.push(left);
    }

    this.hasUnvisitedNeighbors = function(){
        //Returns true if this node has any unvisited neighbors
        for (let i = 0; i < this.neighbors.length; i++){
            if (this.neighbors[i]){
                if (this.neighbors[i].isVisited == false ) return true;
            }
        }
        return false;
    }

    this.getUnvisitedNeighbors = function(){
        //Returns a list of unvisited neighbors
        this.UnvisitedNeighbors = [];
        for (let i = 0; i < this.neighbors.length; i++){
            if (this.neighbors[i]){
                if (this.neighbors[i].isVisited == false ) this,this.UnvisitedNeighbors.push(this.neighbors[i]);
            }
        }
        return false;
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
    //figure out which wall to remove
    if (nextCell.i - currentCell.i == 1) {
        // nextCell is below currentCell
        currentCell.draw(true, true, false, true);
        nextCell.draw(false, true, , true);

    } else if (nextCell.i - currentCell.i == 0) {

    } else () {

    }

}

//Generate cells and draw them
cells = [];
for (let i = 0; i < rows; i++){
    for (let j = 0; j < columns; j++){
        cell = new Cell(i*w, j*w, w, i, j);
        //cell.shadeCell("#654321");
        cell.draw(true, true, false, false);
        cells.push(cell);
        //console.log(cell.index);
    }
}

let stack = [];
let i = 0;
let currentCell;
currentCell = cells[i];
stack.push(currentCell);

do {
    currentCell = stack.pop();
    currentCell.isVisited = true;
    currentCell.shadeCell('#ffff00');

    //Check if current cell has unvisited neighbors and randomly pick next next cell
    currentCell.getNeighbors(columns, cells);
    let nextCell;
    if (currentCell.hasUnvisitedNeighbors()){
        stack.push(currentCell);
        currentCell.shadeCell('#6600ff');
        let unvisitedNeighbors = currentCell.getUnvisitedNeighbors;
        let n = unvisitedNeighbors.lenght;
        let r = Math.floor(Math.random()*n);
        nextCell = unvisitedNeighbors[r];
        removeWall(currentCell, nextCell);
    }

} while (stack.length > 0);


//console.log(cells.length);
cells[6].getNeighbors(columns, cells);
console.log(cells[6].neighbors);
//console.log(neighbors(cells[6], columns, cells));
console.log(cells[1]);
//console.log(cells[0].index);
//console.log(cells[0]);






//c.fillRect(50, 50, 200, 200);



















