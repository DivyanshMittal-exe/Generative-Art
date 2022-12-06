var x = 0;
var y = 0;
var spacing = 9;


var canvas = document.getElementById('textCanvas')
var ctx = canvas.getContext('2d');

var cw = window.innerWidth;
var ch = window.innerHeight;

canvas.width = cw;
canvas.height = ch;



ctx.font = "bold 250px Helvetica";

var text = "Divyansh"
// ctx.fillText(text, 10, 30);
var textWidth = ctx.measureText(text).width;
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = 'rgba(255,255,255,1)';

ctx.fillText(text , (canvas.width/2) - (textWidth / 2), (canvas.height/2));



// var imgd = ctx.getImageData('(canvas.width/2) - (textWidth / 2), (canvas.height/2), (textWidth / 2), 300);
// var pix = imgd.data;

// console.log(pix);
// for (let i = 0; i < pix.length; i += 4) {
//     console.log(pix[i]);
//     // if(pix[i] != 0){
//     //     console.log(pix[i]);
//     // }
//     // console.log("RUnn");
// }


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

let c;
let img;

let pg,pg2;

function preload() {
    maskImage = loadImage(ctx.canvas.toDataURL());
  }

function setup(){


    seed = Date.now();

  //  initangle = -1*random(PI);noise(i/scale,j/scale,seed)
   initangle = noise(100,100,seed)*TAU - PI;

    c = createCanvas(window.innerWidth, window.innerHeight);

    pg = createGraphics(window.innerWidth, window.innerHeight);
    pg2 = createGraphics(window.innerWidth, window.innerHeight);


    // ctx.canvas.width = ctx.measureText(text).width;
    background('rgb(41, 50, 65)');

    pg2.image(maskImage, 0, 0);
}




function draw(){



    for (let i = 0; i < 1000; i++) {
        draw2();
        
    }

    var mI = pgMask(pg, pg2);

    image(mI, 0, 0);



}

function draw2(){


        let RandCol = color[Math.floor(Math.random()*100 %color.length)]
        pg.stroke(RandCol)

        let ang = map(noise(i/scale,j/scale,seed),0,1,0,TAU) + initangle;
        // let ang = map(noise(i/scale,j/scale,seed),0,1,0,TAU);
        let vec = p5.Vector.fromAngle(ang,random(strokelength));
        pg.strokeWeight(strokeW);
        pg.strokeCap(PROJECT);
        
        pg.line(i,j,i+vec.x,j+vec.y);

        i+=strokeW;
        if(i > width){
          i = 0;
          j+= strokeW;
        }
        if( j > height){
        //   noLoop();
        }
        

}



function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    setup();
    
  }
  

function pgMask(_content,_mask){
    //Create the mask as image
    var img = createImage(_mask.width,_mask.height);
    img.copy(_mask, 0, 0, _mask.width, _mask.height, 0, 0, _mask.width, _mask.height);
    //load pixels
    img.loadPixels();
    for (var i = 0; i < img.pixels.length; i += 4) {
      // 0 red, 1 green, 2 blue, 3 alpha
      // Assuming that the mask image is in grayscale,
      // the red channel is used for the alpha mask.
      // the color is set to black (rgb => 0) and the
      // alpha is set according to the pixel brightness.
      var v = img.pixels[i];
      img.pixels[i] = 0;
      img.pixels[i+1] = 0;
      img.pixels[i+2] = 0;
      img.pixels[i+3] = v;
    }
    img.updatePixels();
    
    //convert _content from pg to image
    var contentImg = createImage(_content.width,_content.height);
    contentImg.copy(_content, 0, 0, _content.width, _content.height, 0, 0, _content.width, _content.height);
    // create the mask
    contentImg.mask(img)
    // return the masked image
    return contentImg;
  }


