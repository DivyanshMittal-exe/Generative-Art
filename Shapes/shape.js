var x = 0;
var y = 0;
var spacing = 30;
let total;
let colindex = [];
let index;

let color = ['#e07a5f','#f4f1de','#81b29a','#f2cc8f'];


function makeleftT(x,y){
    index = Math.floor(Math.random()*100) %color.length;
    fill(color[index]);
    square(x, y, spacing);
    index += Math.floor(Math.random()*100) % (color.length-1)
    index %= color.length;

    index = Math.floor(Math.random()*100) %color.length;

    fill(color[index]);
    triangle(x, y, x + spacing, y, x + spacing, y + spacing);
}
function makerightT(x,y){
    index = Math.floor(Math.random()*100) %color.length;
    fill(color[index]);
    square(x, y, spacing);
    index += Math.floor(Math.random()*100) % (color.length-1)
    index %= color.length;

    index = Math.floor(Math.random()*100) %color.length;

    fill(color[index]);
    triangle(x, y, x + spacing, y , x , y + spacing);
}
function smallsq(x,y){
    index = Math.floor(Math.random()*100) %color.length;
    fill(color[index]);
    square(x, y, spacing);
    index += Math.floor(Math.random()*100) % (color.length-1)

    index %= color.length;

    index = Math.floor(Math.random()*100) %color.length;

    fill(color[index]);
    square(x, y, spacing/2);
    square(x + spacing/2 , y + spacing/2, spacing/2);
    
}

function sqcircle(x,y){
    index = Math.floor(Math.random()*100) %color.length;
    fill(color[index]);
    square(x, y, spacing);
    index += Math.floor(Math.random()*100) % (color.length-1)

    index %= color.length;

    index = Math.floor(Math.random()*100) %color.length;

    fill(color[index]);
    circle(x + spacing/2, y+ spacing/2,  spacing/2);
}

function setup(){
    createCanvas(window.innerWidth, window.innerHeight);

    background('#3d405b');

    
}

function draw(){
    noStroke();

    if (random(1) < 0.25) {
        makeleftT(x,y);
    }else if (random(1) >= 0.25 && random(1) < 0.5) {
        makerightT(x,y);
    }else if (random(1) >= 0.5 && random(1) < 0.75) {
        smallsq(x,y);
    }else{
        sqcircle(x,y);
    }
    x+= spacing;
    if (x>width){
        x = 0;
        y+= spacing;
    }
    // if(y > height){
    //     noLoop();
    // }
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    setup();
    x = 0;
    y = 0;
    
  }
  