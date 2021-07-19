
let points = [];
let CoolorArray = Array(256).fill().map(()=>Array(256).fill().map(() => Array(256).fill(0)));


function makeCoolor(Coolor){
  // console.log(Coolor);

  while(true){
  let dirn = Math.floor(random(100))%4;
  if(dirn == 0 && Coolor[0] < 255 && CoolorArray[Coolor[0]+1][Coolor[1]][Coolor[2]] == 0){
    CoolorArray[Coolor[0]+1][Coolor[1]][Coolor[2]]  = 1;
    return [Coolor[0]+1 , Coolor[1] , Coolor[20]]

  }else if(dirn == 1 && Coolor[0] >0  && CoolorArray[Coolor[0]-1][Coolor[1]][Coolor[2]] == 0){
    CoolorArray[Coolor[0]-1][Coolor[1]][Coolor[2]]  = 1;
    return [Coolor[0]-1 , Coolor[1] , Coolor[2] ]

  }else if(dirn == 2 && Coolor[1] < 255  && CoolorArray[Coolor[0]][Coolor[1]+1][Coolor[2]] == 0){
    CoolorArray[Coolor[0]][Coolor[1]+1][Coolor[2]]  = 1;
    return [Coolor[0] , Coolor[1]+1 , Coolor[2] ]

  }else if(dirn == 3 && Coolor[1] >0   && CoolorArray[Coolor[0]][Coolor[1]-1][Coolor[2]] == 0){
    CoolorArray[Coolor[0]][Coolor[1]-1][Coolor[2]]  = 1;
    return [Coolor[0] , Coolor[1]-1 , Coolor[2] ]

  }else if(dirn == 4 && Coolor[2] < 255  && CoolorArray[Coolor[0]][Coolor[1]][Coolor[2]+1] == 0){

    CoolorArray[Coolor[0]][Coolor[1]][Coolor[2]+1]  = 1;
    return [Coolor[0] , Coolor[1] , Coolor[2] + 1]

  }else if(dirn == 5 && Coolor[2] >0   && CoolorArray[Coolor[0]][Coolor[1]][Coolor[2]-1] == 0){
    CoolorArray[Coolor[0]][Coolor[1]][Coolor[2] -1]  = 1;
    return [Coolor[0] , Coolor[1] , Coolor[2] -1]

  }
}
}

function setup() {
  
  createCanvas(20, 20);
  // createCanvas(window.innerWidth, window.innerHeight);
  background('rgba(0,0,0, 0.00)');
  loadPixels();

  // background(0);
  let initX = Math.floor(random(width));
  let initY = Math.floor(random(height));
  // console.log(array);
  let initR =  Math.floor(random(255));
  let initG =  Math.floor(random(255));
  let initB =  Math.floor(random(255));
  points.push([initX,initY]);
  pix_val = (initX + initY*width)*4;
  pixels[pix_val] = initR;
  pixels[pix_val+1] = initG;
  pixels[pix_val+2] = initB;
  pixels[pix_val+3] = 1;
  console.log(pix_val)
  console.log(pixels[pix_val])
  updatePixels();

}

function draw() {
  console.log(points)
  // loadPixels();
  if(points.length > 0){
    let point = points.pop();
    console.log(point);
    // let Coolor = []
    let pix_val = (point[0] + point[1]*width)*4
    let Coolor = [pixels[pix_val+0],pixels[pix_val+1],pixels[pix_val+2]];
  console.log(pix_val)
  console.log(pixels[pix_val])


    console.log(Coolor);
    pix_val = (point[0] - 1 + point[1]*width)*4
    console.log(pixels[pix_val+3])
    if (point[0] > 0 && pixels[pix_val+3] == 0){
      let new_col = makeCoolor(Coolor);
      points.push([point[0] - 1,point[1]]);
      pixels[pix_val] = new_col[0];
      pixels[pix_val+1] = new_col[1];
      pixels[pix_val+2] = new_col[2];
      pixels[pix_val+3] = 1;

    }

    pix_val = (point[0] + 1 + point[1]*width)*4
    if (point[0]+1 <width && pixels[pix_val+3] == 0){
      let new_col = makeCoolor(Coolor);
      points.push([point[0] + 1,point[1]]);
      pixels[pix_val] = new_col[0];
      pixels[pix_val+1] = new_col[1];
      pixels[pix_val+2] = new_col[2];
      pixels[pix_val+3] = 1;

    }

    pix_val = (point[0] + width + point[1]*width)*4
    if (point[1]+1 <height && pixels[pix_val+3] == 0){
      let new_col = makeCoolor(Coolor);
      points.push([point[0],point[1] + 1]);
      pixels[pix_val] = new_col[0];
      pixels[pix_val+1] = new_col[1];
      pixels[pix_val+2] = new_col[2];
      pixels[pix_val+3] = 1;

    }
    pix_val = (point[0] - width + point[1]*width)*4
    if (point[1] > 0 && pixels[pix_val+3] == 0){
      let new_col = makeCoolor(Coolor);
      points.push([point[0],point[1] - 1]);
      pixels[pix_val] = new_col[0];
      pixels[pix_val+1] = new_col[1];
      pixels[pix_val+2] = new_col[2];
      pixels[pix_val+3] = 1;

    }
  }

  updatePixels();
   
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  
}