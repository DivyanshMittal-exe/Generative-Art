let p;
let parray = []

function setup(){
    let canvas = createCanvas(windowWidth,windowHeight);

    totalParticles = Math.floor(window.innerWidth/10);
    for (let i = 0; i < totalParticles; i++) {
        parray.push(new Partictle());
    }
}

function draw(){
    // console.log("Works")
    background(56,23,43);
    parray.forEach(particle => {
        particle.draw();
        particle.update();
        particle.makeStroke();
    });
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
 }

class Partictle{
    constructor(){
        this.pos = createVector(random(width),random(height));

        this.vel = createVector(random(-2,2),random(-2,2));

        this.size = 10;
    }

    update(){
        this.pos.add(this.vel);
        if(this.pos.x <0 || this.pos.x > width){
            this.vel.x *= -1;
        }
        if(this.pos.y <0 || this.pos.y > height){
            this.vel.y *= -1;
        }
    }

    draw(){
        noStroke();
        fill('rgba(255,255,255,0.5)');
        circle(this.pos.x,this.pos.y,this.size);
    }

    makeStroke(){
        let total = 0;
        parray.forEach(par => {
            const len = dist(this.pos.x,this.pos.y,par.pos.x,par.pos.y);
            if (len < 120 && total <10){
                stroke('rgba(255,255,255,0.1)');
                line(this.pos.x,this.pos.y,par.pos.x,par.pos.y);
                total++;
            }
        });
    }
}   

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    setup();
    
  }