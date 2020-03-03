
var cols, rows; //these variables are the columns and rows 
var s = 25 // this is the s of a sell 
var grid = []
var current;
var stack = []
var next;




function setup(){ // this function sets up the canvas 
    createCanvas(400,400)
    cols = floor(width/s)
    rows = floor(height/s)
    frameRate(100000)

    

    for (var j = 0; j < rows; j++){
        for(var i = 0; i < cols; i++){
            var cell
            cell = new Cell(i,j)
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

    next = current.checkNeighbors(current.i, current.j)
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

function Cell(i,j){ // this is a constructor function for a cell object 
    this.i = i
    this.j = j
    this.walls = [true,true,true,true]
    this.visited = false

    this.checkNeighbors = function(i, j){
        // console.log("made it ")
        // console.log(i, j)

        
        var neighbors = [];

        var top = grid[index(i,j-1)];
        var right = grid[index(i+1,j)];
        var bottom = grid[index(i,j+1)];
        var left = grid[index(i-1,j)];

        // console.log("top", top)
        // console.log("right", right)
        // console.log("bottom", bottom)
        // console.log("left", left)




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
        } 
    } // ends checkneighbor function

    this.highlight = function(){
        var x = this.i*s;
        var y = this.j*s;
        noStroke()
        fill(100,100.0,0)
        rect(x,y,s,s)
    }

    this.show = function(){
        var x = this.i*s;
        var y = this.j*s;
        stroke(100);
        
        
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
        fill(400, 100, 255, 100); //simple color coordinates
        rect(x,y,s,s);
        }
    } // ends show function
} // ends Cells function    

function removeWalls(a,b){
    // console.log("this is A", a)
    // console.log("this is B", b)
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
document.addEventListener("keydown", function(e){
     
    if(e.keyCode === 39){ // right 
        var rightNeighbor = grid[index(current.i+1,current.j)]
        if(rightNeighbor.walls[3]==false){
    current.i += 1}
    } else if(e.keyCode === 37){
        var leftNeighbor = grid[index(current.i-1,current.j)];
        if(leftNeighbor.walls[1]==false)
    current.i -= 1
    }else if(e.keyCode === 38){
        var bottomNeighbor = grid[index(current.i,current.j-1)];
        if(bottomNeighbor.walls[2]==false)
    current.j -= 1
   
    }else if(e.keyCode === 40){
        var bottomNeighbor = grid[index(current.i,current.j+1)];
        if(bottomNeighbor.walls[0]==false)
    current.j += 1
 

    }

    // if(e.keyCode === 39) {  
    //     console.log(current.walls)
    //     current.i += 1
    // }
})


function endOfGame(current){
    if(current.i === 15 && current.j === 15){
    // fetch()
    }
}





