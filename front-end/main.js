
var cols, rows; //these variables are the columns and rows 
var s = 25 // this is the s of a sell 
var grid = []
var current;
var stack = []


function setup(){ // this function sets up the canvas 
    createCanvas(350,350)
    cols = floor(width/s)
    rows = floor(height/s)
    frameRate(5000)

    for (var j = 0; j < rows; j++){
        for(var i = 0; i < cols; i++){
            var cell = new Cell(i,j)
            grid.push(cell)
        } // ends second for 
    } // ends first for
    current = grid[0];
 } // ends setup



function draw(){
    background(233)
    for (var i = 0; i < grid.length; i++){
        grid[i].show()
    }
    current.visited = true
    current.highlight()

    var next = current.checkNeighbors()
    if(next){
        next.visited = true
        
        stack.push(current)

        removeWalls(current,next)

        current = next

    } else if(stack.length > 0){
        current = stack.pop()

    }

} // ends draw function

function index(i,j){ // needed to make the program think of the array as one dimmensional
    if(i < 0 || j < 0 || i > cols -1 || j > rows - 1){
        return -1
    }
    return i + j * cols 
} // ends index function

function Cell(i,j){ // this function holds the cell position, column and row
    this.i = i
    this.j = j
    this.walls = [true,true,true,true]
    this.visited = false

    this.checkNeighbors = function(){
        var neighbors = [];

        var top = grid[index(i,j-1)];
        var right = grid[index(i+1,j)];
        var bottom = grid[index(i,j+1)];
        var left = grid[index(i-1,j)];

        if(top && !top.visited){
            neighbors.push(top)
        }
        if(right && !right.visited){
            neighbors.push(right)
        }
        if(bottom && !bottom.visited){
            neighbors.push(bottom)
        }
        if(left && !left.visited){
            neighbors.push(left)
        }

        if(neighbors.length > 0 ){
            var r = floor(random(0, neighbors.length))
            return neighbors[r]
        } else {
            return undefined;
        }
    } // ends checkneighbor function
    this.highlight = function(){
        var x = this.i*s;
        var y = this.j*s;
        noStroke()
        fill(0,0.222,100)
        rect(x,y,s,s)
    }

    this.show = function(){
        var x = this.i*s;
        var y = this.j*s;
        stroke(255);
        if (this.walls[0]){
        line(x,y,x+s,y)}

        if (this.walls[1]){
        line(x+s,y,x+s,y+s)}

        if (this.walls[2]){
        line(x+s,y+s,x,y+s)}

        if (this.walls[3]){
        line(x,y+s,x,y)}

        // These 4 lines are creating lines within our grid. 
        
        if(this.visited){
        noStroke()
        fill(255, 0, 255, 100); //simple color coordinates
        rect(x,y,s,s);
        }
    } // ends show function
} // ends Cells function    

function removeWalls(a,b){
    var x = a.i - b.i 
    if(x === 1){
        a.walls[3] = false
        b.walls[1] = false 
        
    } else if(x === -1) {
        a.walls[1] = false
        b.walls[3] = false  
    }

    var y = a.j - b.j
    if(y === 1){
        a.walls[0] = false
        b.walls[2] = false 
    } else if(y === -1) {
        a.walls[2] = false
        b.walls[0] = false  
    }
}// ends removewalls


