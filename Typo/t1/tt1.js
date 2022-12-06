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

let c;
let img;

let pg,pg2;

function preload() {
    maskImage = loadImage(ctx.canvas.toDataURL());
  }

function setup(){
    c = createCanvas(window.innerWidth, window.innerHeight);

    pg = createGraphics(window.innerWidth, window.innerHeight);
    pg2 = createGraphics(window.innerWidth, window.innerHeight);

    // ctx.canvas.width = ctx.measureText(text).width;
    background('rgb(41, 50, 65)');

    pg2.image(maskImage, 0, 0);
    pg2.filter(OPAQUE);


    let inp = createInput('');
    inp.position((width/2) - (width/10), 10);
    inp.size((width/5));
    inp.input(myInputEvent);
}


function myInputEvent(){
    // ctx.fillText(text, 10, 30);


    var textWidth = ctx.measureText(text).width;
    ctx.fillStyle = 'rgba(0,0,0,1)';

    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(255,255,255,1)';
    
    text = this.value()

    ctx.fillText(text , (width/2) - (textWidth / 2), (height/2));

    pg2 = createGraphics(window.innerWidth, window.innerHeight);
    
    // preload();

    maskImage = loadImage(ctx.canvas.toDataURL());

    console.log(maskImage);
    pg2.image(maskImage, 0, 0);
    pg2.filter(OPAQUE);

console.log(pg2)
    // setup();


    
}



function draw(){

    for (let i = 0; i < 800; i++) {
        draw2();
    }

    pg2.image(maskImage, 0, 0);
    pg2.filter(OPAQUE);

    var mI = pgMask(pg, pg2);
    

    image(mI, 0, 0);
    // // saveCanvas(c, 'myCanvas.jpg');
    // photo = loadImage('myCanvas.jpg');


    // photo.mask(maskImage);
    // image(photo, 0, 0);


    // image(img, 0, 0);
    //  filter(OPAQUE);

    // let pink = color(255, 102, 204);
    // loadPixels();
    // pixelDensity(1);

    // let d = pixelDensity();
    // // console.log(d);
    // let fullIMg = 4 * (width * d) * (height* d);
    // console.log(fullIMg);
    // for (let i = 0; i < fullIMg; i += 4) {
    // if (pix[i] > 0 ){
    //     pixels[i]     = pixels[i];
    //     pixels[i + 1] = pixels[i+1];
    //     pixels[i + 2] = pixels[i+2];
    //     pixels[i + 3] = pixels[i+3];
    // }

    // }
    // updatePixels();


}


function draw2(){
    pg.strokeWeight(1);
    pg.stroke('rgb(224, 251, 252)');
    if (random(1) < 0.5) {
        pg.line(x,y,x+spacing,y+spacing);
    }else{
        pg.line(x,y+spacing,x+spacing,y);

    }
    x+= spacing;
    if (x>width){
        x = 0;
        y+= spacing;
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


  function keyTyped() {
    console.log(key)
    if (key == 's') {
      saveCanvas('photo', 'png');
    }
  }