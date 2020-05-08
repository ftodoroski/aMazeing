document.addEventListener("DOMContentLoaded", function(){

let guy = document.getElementById("guy")

var guyLeft = 0
let guyDown = 0

function anim(e){
if(e.keyCode == 39){ // right
    guyLeft += 10
    guy.style.left = guyLeft + 'px'
    // if(guyLeft >=4710){
    //     guyLeft -=10
    // }

} else if(e.keyCode == 37){
    guyLeft -= 10    
    guy.style.left = guyLeft + 'px'
    // if(guyLeft <=0){
    //     guyLeft +=10
    // }


}else if(e.keyCode == 38){
    guyDown -= 10    
    guy.style.top = guyDown + 'px'
    // if(guyDown <=0){
    //     guyDown +=10}
    }else if(e.keyCode == 40){
    guyDown += 10    
    guy.style.top = guyDown + 'px'
    // if(guyDown >=4710){
    //     guyDown -=10}
    }

}
document.onkeydown = anim 
})
