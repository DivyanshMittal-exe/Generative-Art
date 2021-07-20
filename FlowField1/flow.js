let scl = 20;
let rows,cols;
let tfac = 1;
let tot = 4000;
let noiseScale = 100;
let mass = 2;
let colorsedd;
let partarray = []

function particle(){
  this.pos = createVector(random(width),random(height),P2D);
  // this.vel = p5.Vector.random2D();
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  this.maxSpeed = 8;

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
    stroke(color,hue,sat, 0.1);
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
      this.pos.x = 0;
      this.pos.y += random(height/20) -height/40 ;

      this.updatePrev();
    }
    if(this.pos.x < 0){
      this.pos.x = width;
      this.pos.y += random(height/20) -height/40 ;

      this.updatePrev();

    }
    if(this.pos.y > height){
      this.pos.y = 0;
      this.pos.x += random(width/20) -width/40 ;
      this.updatePrev();

    }
    if(this.pos.y < 0){
      this.pos.y = height ;
      this.pos.x += random(width/20) -width/40 ;


      this.updatePrev();

    }
  }

    this.follow = function(){
      let val = noise(this.pos.x/scl/noiseScale,this.pos.y/scl/noiseScale,frameCount*0.001)*TWO_PI*12  ;
      let f = p5.Vector.fromAngle(val);
      f.setMag(mass);
      this.applyForce(f); 


    }



}


function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  colorsedd = random(300);
  cols = Math.floor(width/scl);
  rows = Math.floor(height/scl);
  for (let i = 0; i < tot; i++) {
    
    partarray[i] = new particle()
  }
  background(0);
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