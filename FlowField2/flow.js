let scl = 20;
let rows,cols;
let tfac = 1;
let tot = 3000;
let noiseScale = 100;
let torusScale = 10;
let mass = 1;
let colorsedd;
let partarray = []
let larges;
let smalls;
let x,y,z;
let noiseNew;

function particle(){
  this.pos = createVector(random(width),random(height),P2D);
  // this.vel = p5.Vector.random2D();
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  this.maxSpeed = 5;

  this.prevPos = this.pos.copy();

  this.update = function(){
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    // this.vel.mult(tfac);
    this.pos.add(this.vel);
    // this.pos.mult(tfac);
    this.acc.mult(0);
  }

  this.applyForce = function(force){
    this.acc.add(force);
    
  }

  this.show = function(){
    colorMode(HSB, 360, 100, 100, 10)
    let color = Math.floor(noise(this.pos.x/scl/noiseScale,this.pos.y/scl/noiseScale,colorsedd)*3000) %360  ;
    let hue = 50 +  Math.floor(noise(this.pos.x/scl/noiseScale,this.pos.y/scl/noiseScale,frameCount*0.001)*3000) %50 ;
    let sat = 50 + Math.floor(noise(this.pos.x/scl/noiseScale,this.pos.y/scl/noiseScale,frameCount*0.001)*3000)  %50 ;
    stroke(color,hue,sat, 0.5);
    strokeWeight(1);
    // point(this.pos.x,this.pos.y);
    line(this.pos.x,this.pos.y,this.prevPos.x,this.prevPos.y);
    this.updatePrev()
  }

  this.updatePrev= function(){
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }


  this.edges = function(){
    if(this.pos.x > width){
      this.pos.y += random(height/40) -height/80 ;
      this.pos.x = 0;

      this.updatePrev();
    }
    if(this.pos.x < 0){
      this.pos.x = width;
      this.pos.y += random(height/40) -height/80 ;

      this.updatePrev();

    }
    if(this.pos.y > height){
      this.pos.x += random(width/40) -width/80 ;
      this.pos.y = 0;
      this.updatePrev();

    }
    if(this.pos.y < 0){
      this.pos.x += random(width/40) -width/80 ;
      this.pos.y = height ;
      this.updatePrev();

    }
  }

    this.follow = function(){
      if(width > height){
        let alpha = this.pos.x/width * TWO_PI;
        let beta = this.pos.y/height * TWO_PI;
        x = (width/torusScale/height + 1/torusScale*Math.cos(beta))*Math.cos(alpha);
        y = (width/torusScale/height + 1/torusScale*Math.cos(beta))*Math.sin(alpha);
        z = 1/torusScale*Math.sin(beta);
      }else{
        let alpha = this.pos.x/height * TWO_PI;
        let beta = this.pos.y/width * TWO_PI;
        x = (height/torusScale/width + 1/torusScale*Math.cos(beta))*Math.cos(alpha);
        y = (height/torusScale/width + 1/torusScale*Math.cos(beta))*Math.sin(alpha);
        z = 1/torusScale*Math.sin(beta);
      }

      // let val = noise(this.pos.x/scl/noiseScale,this.pos.y/scl/noiseScale,frameCount*0.001)*TWO_PI*12  ;
      let val = noiseNew.noise4D(x,y,z,frameCount*0.001)*TWO_PI*12  ;
      let f = p5.Vector.fromAngle(val);
      f.setMag(mass);
      this.applyForce(f); 


    }



}


function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  noiseNew = new OpenSimplexNoise(Date.now());
  colorsedd = random(300);
  cols = Math.floor(width/scl);
  rows = Math.floor(height/scl);
  for (let i = 0; i < tot; i++) {
    
    partarray[i] = new particle()
  }
  background(0);

  larges = Math.max(width,height);
  smalls = Math.min(width,height)

}

function draw() {
 colorMode(RGB,255,255,255,100);
 background(0,0,0,0.1);



  partarray.forEach(part => {
  part.update();
  part.edges();
  part.show();
  
  part.follow();
  // console.log(part.vel)

  
});
 
    
  // fr.html(frameRate());
  console.log(frameRate());

}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  
}