var x = 0;
var y = 0;
var spacing = 20;

function setup(){
    createCanvas(window.innerWidth, window.innerHeight);

    background('rgb(41, 50, 65)');
    
}
function draw(){
    for (let i = 0; i < 8; i++) {
        draw2();
        
    }
}
function draw2(){
    stroke('rgb(224, 251, 252)');
    strokeWeight(3);
    if (random(1) < 0.5) {
        line(x+spacing/2,y,x+spacing/2,y+spacing);
    }else{
        line(x,y+spacing/2,x+spacing,y+spacing/2);

    }
    x+= spacing;
    if (x>width){
        x = 0;
        y+= spacing;
    }
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    setup();
    
  }
  