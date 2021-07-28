let maxHeight = 10;
let heightFac = 60;
let angle  = 25*Math.PI/180;
let roofFac = 0.6;
let cityArray;
let sinVal;
let cosVal;


function makeWindow(dx,dy,ax,ay,lev){
  
  for(let i = 0; i < 2*lev;i++){
    if(random()<0.5){
        if(random()<0.5){
          fill('#e9c46a')
        }else{
          fill('#4095aa')
        }
        if(i >= lev){
          let p2x = (3*ax+2*dx)/5
         
          let p1x = (4*ax+1*dx)/5
          
          let p1y = ay + (i-lev)*heightFac + heightFac/3
          let p2y = dy + (i-lev)*heightFac + 2*heightFac/3
          let p3y = ay + (i-lev)*heightFac + 2*heightFac/3
          let p4y = dy + (i-lev)*heightFac + 3*heightFac/3

          quad(p1x,p1y,p1x,p3y,p2x,p4y,p2x,p2y)
        }else{
          let p1x = (2*ax+3*dx)/5
         
          let p2x = (1*ax+4*dx)/5
          
         

          let p1y = ay + (i)*heightFac + heightFac/3

          point(p1x,p1y)
          // line(p1x,p1y,0,0)
          let p2y = dy + (i)*heightFac + 2*heightFac/3

          // line(p2x,p2y,0,0)
          let p3y = ay + (i)*heightFac + 2*heightFac/3
          let p4y = dy + (i)*heightFac + 3*heightFac/3

          quad(p1x,p1y,p1x,p3y,p2x,p4y,p2x,p2y)
        }
    }  
  }


}

function city(i,j){
    this.x = i;
    this.y = j;
    this.levels = (round(Math.random()*1024))%maxHeight + 1 
    this.height = (this.levels) *heightFac;
    console.log(this.height);
    this.roof = round(Math.random(100)) %2;
    this.side = round(Math.random(100)) %2;

    this.drawBuild = function(){
      push()

      translate(this.x,this.y - this.height);
      

      let p1x = 0;
      let p1y = 0;

      let p2x = heightFac*cosVal;
      let p2y = -heightFac*sinVal;

      let p3x = heightFac*cosVal;
      let p3y = heightFac*sinVal;

      let p4x = 2*heightFac*cosVal;
      let p4y = 0;

      if (this.roof == 1){
          
        if(this.side == 1){
          let rf1x = (p1x + p3x)/2; 
          let rf1y = (p1y + p3y)/2 - roofFac*heightFac; 

          let rf2x = (p2x + p4x)/2; 
          let rf2y = (p2y + p4y)/2 - roofFac*heightFac;

          fill('#1d1465');
          quad(p1x,p1y,p2x,p2y,rf2x,rf2y,rf1x,rf1y)
          quad(p3x,p3y,p4x,p4y,rf2x,rf2y,rf1x,rf1y)

          fill('#1d1465');
          quad(p3x,p3y,p3x,p3y + this.height,p4x,p4y +  this.height,p4x,p4y)
          makeWindow(p4x,p4y,p3x,p3y,this.levels)


          fill('#383d9e');

          beginShape();
            vertex(p3x,p3y);
            vertex(p3x,p3y + this.height);
            vertex(p1x,p1y + this.height);
            vertex(p1x,p1y);
            vertex(rf1x,rf1y);
          endShape();
          makeWindow(p1x,p1y,p3x,p3y,this.levels)


        }else{
          let rf1x = (p1x + p2x)/2; 
          let rf1y = (p1y + p2y)/2 - roofFac*heightFac; 

          let rf2x = (p3x + p4x)/2; 
          let rf2y = (p3y + p4y)/2 - roofFac*heightFac;
          
          fill('#383d9e')

          
          quad(p2x,p2y,p4x,p4y,rf2x,rf2y,rf1x,rf1y)
          quad(p1x,p1y,p3x,p3y,rf2x,rf2y,rf1x,rf1y)

          fill('#383d9e')
          quad(p1x,p1y,p1x,p1y + this.height,p3x,p3y + this.height,p3x,p3y)
          makeWindow(p1x,p1y,p3x,p3y,this.levels)


          fill('#1d1465');
          beginShape();
            vertex(p3x,p3y);
            vertex(p3x,p3y + this.height);
            vertex(p4x,p4y + this.height);
            vertex(p4x,p4y);
            vertex(rf2x,rf2y);
          endShape();

          makeWindow(p4x,p4y,p3x,p3y,this.levels)
        }

      }else{
        fill('#383d9e');

        quad(p1x,p1y,p3x,p3y,p4x,p4y,p2x,p2y)
        fill('#1d1465')
        quad(p3x,p3y,p3x,p3y + this.height,p4x,p4y + this.height,p4x,p4y);
        makeWindow(p4x,p4y,p3x,p3y,this.levels)

        fill('#383d9e')
        quad(p1x,p1y,p1x,p1y + this.height,p3x,p3y + this.height,p3x,p3y)
        makeWindow(p1x,p1y,p3x,p3y,this.levels)
      }
      pop();
    }
}


function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  angle = (Math.random()*10 + 20)*PI/180
  sinVal = Math.sin(angle)
  cosVal = Math.cos(angle)
  
  let max = round(width*height/(heightFac*heightFac*cosVal*sinVal))
  background(0);
  

  cityArray = new Array(max)
  let k = 0;
  let j = 0;
  let i = 0;
  let tally = 0
  for(let j = heightFac*sinVal ;j < height + maxHeight*heightFac ; j+=heightFac*sinVal){
    for(;i < width; i+= 2*heightFac*cosVal){
      if(k > max){
        break;
      }

      cityArray[k] = new city(i,j);
      k+=1;
      
    }
    if(tally%2 == 0){
      i = -heightFac*cosVal
    }else{
      i = 0
    }
    tally ++;
  }

  // cityArray = new city(width/2,height/2);
  // cityArray.drawBuild();
  // cityArray[round(cityArray.length/3)].drawBuild()
  
}
let ind = 0;
function draw(){
  stroke('#656256')
  if(ind > cityArray.lenght){
  noLoop();

  }else{
    cityArray[ind].drawBuild();

  }

  ind+=1;
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}