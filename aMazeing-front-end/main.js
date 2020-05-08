
var cols, rows; //these variables are the columns and rows 
var s = 25 // this is the size of a cell 
var grid = []
var current;
var stack = []
var next;
var img;



function setup(){ // this function sets up the canvas 
    createCanvas(500,500)
    cols = floor(width/s)
    rows = floor(height/s)
    frameRate()

    

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
    
    let endpoint = grid[index(19,19)]

    current.visited = true
    current.highlight()
    endpoint.highlight()

    next = current.checkNeighbors(current.i, current.j)
    if(next){
        next.visited = true

        changeGameLoaded()

        stack.push(current)

        removeWalls(current,next)

        current = next

    } else if(stack.length > 0){
        current = stack.pop()
    }
    // changeGameLoaded(grid)
} // ends draw function


function index(i,j){ // needed to make the program think of the array as one dimmensional
    if(i < 0 || j < 0 || i > cols -1 || j > rows - 1){
        return -1
    }
    return i + j * cols 
} // ends index function

var currentColor =  Math.floor(Math.random() * 255)

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
        fill(currentColor,0,0)
        rect(x,y,s,s)
    }


    this.show = function(){
        var x = this.i*s;
        var y = this.j*s;
        stroke(0, 0,0);
        
        
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
        fill(color1,color2,color3); //simple color coordinates
        rect(x,y,s,s);
        }
    } // ends show function
} // ends Cells function    
var color1 = Math.floor(Math.random()*180)
var color2 = Math.floor(Math.random() * (255 - 100) ) + 100
var color3 = Math.floor(Math.random()*255)

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

//Create Start Button

var button = document.createElement("button")
button.innerHTML = "Start Timer"
var time = document.getElementById("timer")
time.append(button)


button.addEventListener("click",function(event){
    timerStarted = true
    setTimer()
    button.remove()
})


document.addEventListener("keydown", function(e){


    if(e.keyCode === 39 && truthArray.length === 399 && timerStarted === true){ // right 
        e.preventDefault()
        var rightNeighbor = grid[index(current.i+1,current.j)]
        if(rightNeighbor.walls[3]==false){
    current.i += 1}
    endOfGame(current)
    } else if(e.keyCode === 37 && truthArray.length === 399 && timerStarted === true){
        e.preventDefault()
        if(current.i < 0){
            current.i +=1}       
        var leftNeighbor = grid[index(current.i-1,current.j)];
        if(leftNeighbor.walls[1]==false)
        current.i -= 1
    endOfGame(current)
    }else if(e.keyCode === 38 && truthArray.length === 399 && timerStarted === true){
        e.preventDefault()
        var bottomNeighbor = grid[index(current.i,current.j-1)];
        if(bottomNeighbor.walls[2]==false)
    current.j -= 1
    endOfGame(current)
   
    }else if(e.keyCode === 40 && truthArray.length === 399 && timerStarted === true){
        e.preventDefault()
        var bottomNeighbor = grid[index(current.i,current.j+1)];
        if(bottomNeighbor.walls[0]==false)
    current.j += 1
    endOfGame(current)
    }
})

function endOfGame(current){
    if(current.i === 19 && current.j === 19){
    current.i = 0;
    current.j = 0;
    gameLoaded = false
    location.reload()}
}


let truthArray = []

function changeGameLoaded(){
        truthArray.push(next.visited) 
    }



var counter = 0
var timeleft = 35
var timerStarted = false 

function setTimer(){
if(timerStarted === true){
    var timer = select('#timer');

    function timeIt(){
        counter ++ 
        timer.html(timeleft - counter)
        if(counter === timeleft){
            location.reload()
        }
    }

    setInterval(timeIt, 1000)}// this says that we want the event 'timeIt' to happen every 1000 milliseconds
}














