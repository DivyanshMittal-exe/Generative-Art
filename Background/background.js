let i = 0;

let radius = 5;
let j = 2*radius;
let length = 0;
let rand = 0;


let color = ['#fcf4ec','#468ba1','#b95252','#f4c04f'];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background('#6a9a71');
//   for (let j = 2*radius; j < height; j += 3*radius) {
//     for(let i = 0; i < width;){

//   }

// }
}
function draw() {
  
  let length = Math.floor(Math.random() * width/16);

  RandCol = color[Math.floor(Math.random()*100 %color.length)]
  stroke(RandCol)
  // RandomColor = color[0];
  // console.log(RandomColor);

  strokeWeight(2*radius);
  // stroke(RandomColor)
  line(i, j, i + length, j);

  i+= length + 3*radius;

  if (i > width){
    i = 0 
    j+=3*radius
  }

  if(j > height){
    noLoop();
  }
  
  
  
  


  
}
function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  setup();
  
}