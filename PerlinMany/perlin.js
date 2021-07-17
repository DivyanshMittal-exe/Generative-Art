let r_mul = 10;


function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

}
let offset = 40;
let perlinfrac = 0.02;
let radius_spill = 1;
let radiusfac = 2;
let radiusMax = 100
function draw() {
    // loadPixels()
    
    colorMode(HSB);
    background(255, 0, 0);
    noFill()
    // stroke(255);
    angleMode(DEGREES);
    // background('#f4f4f6');
    translate(width/2,height/2)
    
    for (let k = 1; k <= radiusMax; k++){
          // fill('#101218')
          // stroke(0);
          
          stroke(k, 100, 100);
          beginShape();
          
          for (let i = 0; i < 360; i+=1) {
              let localOffset = map(noise(radiusMax*radiusfac + perlinfrac*k*radiusfac*Math.cos(i* Math.PI/180) ,radiusMax*radiusfac + perlinfrac*k*radiusfac*Math.sin(i* Math.PI/180) ,frameCount*0.09),0,1,0,offset);
              let x = (k*radiusfac+localOffset)*Math.cos(i* Math.PI/180);
              let y = (k*radiusfac+localOffset)*Math.sin(i* Math.PI/180);



              vertex(x,y);
          }
          
          endShape(CLOSE);
          // offset += offsetchange;
          // console.log(offset)

    }
    
  
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  
}