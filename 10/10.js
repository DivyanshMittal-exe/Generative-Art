var x = 0;
var y = 0;
var spacing = 25;

function setup(){
    createCanvas(window.innerWidth, window.innerHeight);

    background('rgb(41, 50, 65)');
    
}
function draw(){
    for (let i = 0; i < 5; i++) {
        draw2();
        
    }
}
function draw2(){
    strokeWeight(5);
    stroke('rgb(224, 251, 252)');
    if (random(1) < 0.5) {
        line(x,y,x+spacing,y+spacing);
    }else{
        line(x,y+spacing,x+spacing,y);

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
  