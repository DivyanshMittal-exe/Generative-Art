let scl = 30;
let rows,cols;
let tfac = 1;
let tot = 400;
let noiseScale = 200;
let mass = 12;
let colorsedd;
let partarray = []

function particle(){
  this.pos = createVector(random(width),random(height));
  // this.vel = p5.Vector.random2D();
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
//   this.maxSpeed = 14;

  this.prevPos = this.pos.copy();

  this.prevdot = [this.pos.x,this.pos.y,this.pos.x,this.pos.y];

//   this.update = function(){
//     this.vel.add(this.acc);
//     this.vel.limit(this.maxSpeed);
//     // this.vel.mult(tfac);
//     this.pos.add(this.vel);
//     // this.pos.mult(tfac);
//     this.acc.mult(0);
//   }

//   this.applyForce = function(force){
//     this.acc.add(force);
    
//   }

  this.show = function(){
    // colorMode(HSB, 360, 100, 100, 10)
    
    // stroke(360,0,0,10);
    stroke('#fffafa');
    strokeWeight(4);
    // point(this.pos.x,this.pos.y);
    erase()
    strokeWeight(5);
    line(this.prevdot[0],this.prevdot[1],this.prevdot[2],this.prevdot[3])
    noErase();
    strokeWeight(4);
    line(this.pos.x,this.pos.y,this.prevPos.x,this.prevPos.y);

    this.prevdot = [this.pos.x,this.pos.y,this.prevPos.x,this.prevPos.y];
    

    this.updatePrev()
  }

  this.updatePrev= function(){
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }


  this.edges = function(){
    if(this.pos.x > width){
      this.pos.x = 0;
      this.updatePrev();
    }
    if(this.pos.x < 0){
      this.pos.x = width;
      this.updatePrev();

    }
    if(this.pos.y > height){
      this.pos.y = 0;
      this.pos.x = Math.floor(random(width*17)) %width;
      this.updatePrev();

    }
    if(this.pos.y < 0){
      this.pos.y = height ;
      this.pos.x = Math.floor(random(width*17)) %width;

      this.updatePrev();

    }
  }

    this.follow = function(){
      let val = map(noise(this.pos.x/scl/noiseScale,this.pos.y/scl/noiseScale,frameCount*0.007),0,1,-PI/3,4*PI/3);
      let f = p5.Vector.fromAngle(val);
      f.setMag(mass);
    //   this.applyForce(f); 
        this.updatePrev();
        this.pos.add(f);
    }



}


function setup() {
  createCanvas(window.innerWidth, window.innerHeight,P2D);

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


  partarray.forEach(part => {
//   part.update();
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