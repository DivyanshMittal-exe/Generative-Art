let r_mul = 10;

let strokeW = 16;
let scale = 500;
let strokelength = 40;
let noiseFac = 300;
let noiseMod = 90;
let seed;
let initangle;
let curvefac = 230;
let curvemod = 30;
let curvemap = 6;
let i = 0;
let j = 0;

let color = ['#e07a5f','#f4f1de','#81b29a','#f2cc8f'];


function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
   seed = Date.now();

  //  initangle = -1*random(PI);noise(i/scale,j/scale,seed)
   initangle = noise(100,100,seed)*TAU - PI;
  //  initangle = PI /2;
  background('#f4f1de');
}
function draw(){
  for (let i = 0; i < 5; i++) {
      draw2();
      
  }
}
function draw2(){
    // loadPixels()
    
    
    
   
    // for(let i = 0;i<width;i+=strokeW){
    //   for(let j = 0;j<height;j+=strokeW){

        let RandCol = color[Math.floor(Math.random()*100 %color.length)]
        stroke(RandCol)

        let ang = map(noise(i/scale,j/scale,seed),0,1,0,TAU) + initangle;
        // let ang = map(noise(i/scale,j/scale,seed),0,1,0,TAU);
        let vec = p5.Vector.fromAngle(ang,random(strokelength));
        strokeWeight(strokeW);
        strokeCap(PROJECT);
        
        // let NoiseX =map(Math.floor(noise(i/scale,j/scale,seed+100)*curvefac)%curvemod , 0 , curvemod,-1*curvemap,curvemap);
        // let NoiseY = map(Math.floor(noise(i/scale,j/scale,seed+500)*curvefac)%curvemod , 0 , curvemod,-1*curvemap,curvemap);
        // let NoisenX = map(Math.floor(noise((i+vec.x)/scale,(j+vec.y)/scale,seed+100)*curvefac)%curvemod , 0 , curvemod,-1*curvemap,curvemap);
        // let NoisenY = map(Math.floor(noise((i+vec.x)/scale,(j+vec.y)/scale,seed+500)*curvefac)%curvemod , 0 , curvemod,-1*curvemap,curvemap);

        // curve(i + NoiseX ,j + NoiseY,i,j, i+vec.x,j+vec.y,i+vec.x + NoisenX,j+vec.y + NoisenY);
        line(i,j,i+vec.x,j+vec.y);

        i+=strokeW;
        if(i > width){
          i = 0;
          j+= strokeW;
        }
        if( j > height){
          noLoop();
        }
        

  //     }
  //   }
    
  // noLoop();
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  
}