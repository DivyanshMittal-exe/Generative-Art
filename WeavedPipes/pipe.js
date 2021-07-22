var x = 0;
var y = 0;
var spacing = 40;
let total;
let colindex = [];
let index;
let strkw = 4;
let bezfac = spacing/5;
let linc = 4;
let lining = '#461220'
let color = ['#ffbe0b','#FB5607','#FF006E','#8338EC','#3A86FF'];

function swap(a,b){
    let val1 = colindex[a];
    let val2 = colindex[b];
    colindex[a] = val2;
    colindex[b] = val1;

    
}

function makeCurvedpipe(x,y){
    noFill();
    index = Math.floor(x/spacing);

    stroke(lining);
    strokeWeight(strkw+linc)
    bezier(x,y+3,x,y+spacing-3-bezfac,x+spacing,y+3+bezfac,x+spacing,y+spacing-3);
    strokeWeight(strkw)
    stroke(color[colindex[index]]);
    bezier(x,y,x,y+spacing-bezfac,x+spacing,y+bezfac,x+spacing,y+spacing);

    stroke(lining);
    strokeWeight(strkw+linc)
    bezier(x+spacing,y +3, x+spacing,y + spacing-3-bezfac, x,y+3+bezfac ,x,y+spacing-3);
    strokeWeight(strkw)
    stroke(color[colindex[index+1]]);
    bezier(x+spacing,y , x+spacing,y + spacing-bezfac, x,y +bezfac,x,y+spacing);

    swap(index,index+1);
}

function setup(){
    createCanvas(window.innerWidth, window.innerHeight);

    background('#DFF2D8');

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
    for (let i = 0; i < 5; i++) {
        draw2();
        
    }
  }
  function draw2(){
    strokeCap(PROJECT);

    if (random(1) < 0.5) {
        stroke(lining);
        strokeWeight(strkw+linc);
        line(x,y+3,x,y+spacing-3);
        strokeWeight(strkw);
        index = Math.floor(x/spacing);
        stroke(color[colindex[index]]);
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
  