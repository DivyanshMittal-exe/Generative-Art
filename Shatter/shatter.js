

let stck,stckL;
let indexI = 0;
let indexF = 0;
let noiseScale = 100;
let noiseColorScale = 50000;
let brkpoint;
let hsbrange = 40;

let shatterp1,shatterp2;
let seed;

function makeShape(a1,a2,a3,a4){
    let colorN = round(noise((a1.x + a1.y + a2.x + a2.y + a3.x + a3.y + a4.x + a4.y)/noiseColorScale,seed)*10*360*hsbrange*hsbrange) % (360*hsbrange*hsbrange);
    let h = round(colorN/(hsbrange*hsbrange));
    let s = round(colorN%(hsbrange*hsbrange)/hsbrange);
    let b = colorN%hsbrange;
    // console.log(h);
    fill(color(h,100-hsbrange+b,100-hsbrange+s));
    stroke(255);
    quad(a1.x,a1.y,a2.x,a2.y,a3.x,a3.y,a4.x,a4.y);
    

}

function Shatter(point){
    let p1,p2,p3,p4;
    // if(control){
        p1 = point[0];
        p2 = point[1];
        p3 = point[2];
        p4 = point[3];
    // }else{
    //     p1 = point[3];
    //     p2 = point[0];
    //     p3 = point[1];
    //     p4 = point[2];
    // }
    let t = noise((p1.x+p2.x+p3.x+p4.x)/noiseScale,(p1.y+p2.y+p3.y+p4.y)/noiseScale,seed);
    shatterp1 = createVector(p1.x*t + p2.x*(1-t),p1.y*t + p2.y*(1-t));
    t = noise((p1.y+p2.y+p3.y+p4.y)/noiseScale,(p1.x+p2.x+p3.x+p4.x)/noiseScale ,seed);
    shatterp2 = createVector(p3.x*t + p4.x*(1-t),p3.y*t + p4.y*(1-t));
    let alpha,beta;
    if(random() < 0.5){
        alpha = indexF%stckL;
        indexF +=1;
        beta = indexF%stckL;
        indexF +=1;
    }else{
        beta = indexF%stckL;
        indexF +=1;
        alpha = indexF%stckL;
        indexF +=1;
    }

    // console.log(p1,p2,p3,p4);

    stck[alpha] = [p4,p1,shatterp1,shatterp2];
    stck[beta] = [shatterp2,shatterp1,p2,p3];
    makeShape(p4,p1,shatterp1,shatterp2);
    makeShape(shatterp2,shatterp1,p2,p3);



}


function setup(){
    createCanvas(window.innerWidth, window.innerHeight);

    background('#3d405b');
    console.log(width,height);
    brkpoint = Math.min(width,height)/22;

    noiseColorScale = Math.max(width,height)*38;
    seed = Date.now();

    stck = new Array(width*height);

    stckL = stck.length;
    for(let i = 0; i < stck.length; i++){
      stck[i] = new Array(4);
    }
    let a = createVector(0,0);
    let b = createVector(width,0);
    let c = createVector(width,height);
    let d = createVector(0,height);

    stck[indexF%stckL] = [a,b,c,d];
    indexF+=1;
    // console.log(stck);
    colorMode(HSB);


    
}

function draw(){

    if(indexI != indexF){
    
        let cur;
        if(random() < 0.5){
          cur = stck[indexI%stckL];
          indexI+=1;
    
        }else{
          indexF-=1;
          cur = stck[indexF%stckL];
        }
        if(Math.min(dist(cur[0].x,cur[0].y,cur[1].x,cur[1].y),dist(cur[1].x,cur[1].y,cur[2].x,cur[2].y),dist(cur[2].x,cur[2].y,cur[3].x,cur[3].y),dist(cur[0].x,cur[0].y,cur[3].x,cur[3].y)) > brkpoint){
            // if(cur[4]%2){
            //     Shatter(cur,0);
            // }else{
            //     Shatter(cur,1);
            // }
            Shatter(cur);
        }
        
        
        
    }
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    indexI = 0;
    indexF = 0;
    setup();

   
  }
  