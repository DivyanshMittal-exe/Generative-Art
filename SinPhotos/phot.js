let drawfac = 10;

let row = 0,
  col = 0;


function makeSin(frequency,x,y){
  push();
  translate(x,y);
  noFill();
  beginShape();
  let f;
  if( 0 <=frequency && frequency<0.1){
    f = 0;
  }else if( 0.1 <=frequency && frequency<0.4){
    f = TAU;
  }else if( 0.4 <=frequency && frequency<0.6){
    f = 2*TAU;

  }else if( 0.6 <=frequency && frequency<0.8){
    f = 3*TAU;

  }else if( 0.8 <=frequency && frequency<=1){
    f = 4*TAU;

  }
  for (let i = 0; i <= drawfac; i++) {
    vertex(i,(drawfac/2)+(drawfac/2)*Math.sin(f*i/drawfac))
  }
  endShape();
  pop();
}

function preload() {
  img = loadImage('Mona.jpg')
}

function setup() {
  var Height = document.getElementById('cnvp').offsetHeight;
  var Width = document.getElementById('cnvp').offsetWidth ;
  let w = Width;
  let h = Height;
  if (h < w){
    img.resize(0,h)
  }else{
    img.resize(w,0)
  }
  cnv = createCanvas(img.width, img.height);
  let newCanvasX = (Width - img.width ) / 2
  let newCanvasY = (Height - img.height) / 2
  cnv.position(newCanvasX, newCanvasY);
  cnv.parent('cnvp')
  background(0);



}
function draw() {
  for (let i = 0; i < 8; i++) {
    draw2();
    
  }
}
function draw2() {
  let r = 0,
    g = 0,
    b = 0,
    a = 0;
  for (let i = 0; i < drawfac; i++) {
    for (let j = 0; j < drawfac; j++) {
      let c = img.get(col + i, row + j);
      r += c[0];
      g += c[1];
      b += c[2];
      a += c[3];
    }
  }
  r /= drawfac * drawfac;
  g /= drawfac * drawfac;
  b /= drawfac * drawfac;
  a /= drawfac * drawfac;
  let strk = (r + g + b) / (3 * 255);

  stroke(color([r, g, b, a]));

  makeSin(strk,col, row)
  

  col +=  drawfac;
  if (col > img.width ) {
    col = 0;
    row +=  drawfac;
    
  }
  if (row > img.height) {
    noLoop()


  }
}

// function windowResized() {
//   resizeCanvas(window.innerWidth, window.innerHeight);

// }
  function SinTheImg(file_list){
    let file = file_list[0];
    console.log(URL.createObjectURL(file))
    img = loadImage(URL.createObjectURL(file));
    row = 0;
    col = 0;
    setup();
  }


  const fileInput = document.getElementById('file-input');

  fileInput.addEventListener('change', (e) => SinTheImg(e.target.files));
