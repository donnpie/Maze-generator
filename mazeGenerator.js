
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

function Cell(x, y, w){
    //x, y is the top left corner
    this.x = x;
    this.y = y;
    this.w = w;

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
    
}

// cell = new Cell(10, 10, w);
// cell.draw()


//Generate cells and draw them
cells = [];
for (let i = 0; i < rows; i++){
    for (let j = 0; j < columns; j++){
        cell = new Cell(i*w, j*w, w);
        //cell.shadeCell("#654321");
        cell.draw(true, true, false, false);
        cells.push(cell);

    }
}






//c.fillRect(50, 50, 200, 200);



















