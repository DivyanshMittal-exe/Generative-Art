let scale = 3;
let drawfac = 10;
let strkfac = 5;
let defstrk = 1

function preload(){
  img = loadImage('Mona.jpg')
}

function setup() {
  cnv = createCanvas(img.width/scale, img.height/scale);
  let newCanvasX = (window.innerWidth - img.width/scale)/2
  let newCanvasY = (window.innerHeight - img.height/scale)/2
  cnv.position(newCanvasX,newCanvasY);
  background(0);
  for(let col = 0 ; col < img.width;col+=scale + drawfac){
    for(let row = 0 ; row < img.height;row+=scale + drawfac){
      let r = 0,g=0,b=0,a=0;
      for(let i = 0 ; i < scale + drawfac;i++){
        for(let j = 0 ; j < scale + drawfac;j++){
          let c = img.get(col + i,row + j);
          r+=c[0];
          g+=c[1];
          b+=c[2];
          a+=c[3];
        }
      }
      r/=(scale + drawfac)*(scale + drawfac);
      g/=(scale + drawfac)*(scale + drawfac);
      b/=(scale + drawfac)*(scale + drawfac);
      a/=(scale + drawfac)*(scale + drawfac);
      let strk = (r+g+b)/(3*255)*strkfac;
      
      strokeWeight(defstrk + strk);
      stroke(color([r,g,b,a]));
      // stroke(color([(r+g+b)/3,(r+g+b)/3,(r+g+b)/3,a]));
      // console.log(c);
      point(col/scale,row/scale);
    }
  
  }

}
// function draw() {
//     background(220);
//     console.log(img.width);
//     console.log(img.height)
// }

// function windowResized() {
//   resizeCanvas(window.innerWidth, window.innerHeight);
  
// }