var x = 0;
var y = 0;
var spacing = 30;
let total;
let colindex = [];
let index;

let color = ['#e07a5f','#f4f1de','#81b29a','#f2cc8f'];

function swap(a,b){
    let val1 = colindex[a];
    let val2 = colindex[b];
    colindex[a] = val2;
    colindex[b] = val1;

    
}

function makeCurvedpipe(x,y){
    noFill();
    index = Math.floor(x/spacing);
    stroke(color[colindex[index]]);
    bezier(x,y,x,y+spacing,x+spacing,y,x+spacing,y+spacing);
    stroke(color[colindex[index+1]]);
    bezier(x+spacing,y , x+spacing,y + spacing, x,y ,x,y+spacing);

    swap(index,index+1);
}

function setup(){
    createCanvas(window.innerWidth, window.innerHeight);

    background('#3d405b');

    total = Math.floor(width/spacing) + 2;
    for(let i = 0; i < total;i++){
        colindex[i] = Math.floor(Math.random()*100 %color.length);
        if(colindex[i] == colindex[i-1]){
            while (colindex[i]==colindex[i-1]){
                colindex[i] = Math.floor(Math.random()*100 %color.length);
            }
        }
    }
}

function draw(){
    index = Math.floor(x/spacing);
    stroke(color[colindex[index]]);
    strokeWeight(3);
    if (random(1) < 0.5) {
        line(x,y,x,y+spacing);
    }else{
        makeCurvedpipe(x,y);
        x+= spacing;
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
  