var i = 0;
var j = 0;
let seed;

let hfac = 10;
let hmin = 2.5;
let maxTreeH,minTreeH;
let modfac =7;
let gradH;
let Nfac = 80;
let hmapmin;


function rain(){
    // 
}



function makeLeaf(h,angle,delta){
    push()
    translate(0,delta);
    let l = (h-delta)/Math.tan(angle)
    line(-l,0,l,0);
    let tot  = random(3) + 4;
    for (let k = 0; k < tot; k++){
        noFill()
        let leafH = random(delta);
        let leafW = random(l);
        bezier(-leafW,-leafH,-leafW,0,leafW,0,leafW,-leafH);
        

    }
    if (h > 2*delta){
        makeLeaf(h-delta,angle,delta);
    }
    pop();

}


function makeTree(x,y){
    push();
    
    translate(x,y);
    rotate(PI);
    
    let angle = (random(5) + 80)*PI/180;
    let TreeHeight =  random(maxTreeH) + minTreeH;
    let totLeafs = Math.floor(15 + random(12));
    let delta = TreeHeight/totLeafs;
    strokeWeight(4);
    line(0,0,0,TreeHeight);
    strokeWeight(1);
    translate(0,delta/4);


    makeLeaf(TreeHeight-delta/4,angle,delta);


    pop();

}



function setup(){
    createCanvas(window.innerWidth, window.innerHeight);
    background('#3d405b');
    maxTreeH = height/3;
    minTreeH = height/5;
    // angleMode(DEGREES);
    seed = Date.now();
    hmapmin = -height/20;
    push();
    // rotate(PI);
    fill(255)

    gradH = height/1400;

    beginShape()
    vertex(0,height)
    for(let t=0; t < width;t++){
        let v = map(noise(t/Nfac,seed),0,1,hmapmin+height -height/hmin, hmapmin+ height/hfac+height -height/hmin);
        vertex(t, v);

    }
    vertex(width,height);
    endShape(CLOSE);
    pop()
    
    
}

function draw(){
    if (i <= 70){
        if(i%modfac == 0){
            background('rgba(255,255,255,0.15)');
        }
        let x = random(width);
        let y = random(height/hfac) + height -height/hmin;
        y+=i*gradH;

        

        makeTree(x,y);
        i++;
        
        
    }else{
        noLoop
    }

}


function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    setup();
    i = 0;
    j = 0;
    
  }
  