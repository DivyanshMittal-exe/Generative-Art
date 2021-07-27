
let cooolor;
let tats; 
let screenP;
let indexF= 0;
let indexI= 0;
let stck;
let stckL;
let perCycle =900;

let slider;

let dirnarray = [0,1,2,3,4,5,6,7];

function shuffle(array) {
  var currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


function FillColor(r,g,b){

  while(true){

  

    let alpha = (Math.floor(random(1024))%3)-1;
    let beta = (Math.floor(random(1024))%3)-1;
    let gamma = (Math.floor(random(1024))%3)-1;
    if(r+alpha < tats && r+alpha  > 0){
      if(g+beta < tats && g+beta  > 0){
        if(b+gamma < tats && b+gamma  > 0){
          if(cooolor[r+alpha][g+beta][b+gamma] == 0){
            cooolor[r+alpha][g+beta][b+gamma] = 1;
            return [r+alpha ,g+beta ,b+gamma];
          }else{
            r+=alpha;
            g+=beta;
            b+=gamma;
          }
        }
      } 
    }
  }

}


function setup() {
  
  slider = createSlider(0, 1, 0.8,0.02);
  slider.parent('slidpar')
  // slider.position(10, 10);
  slider.style('width', '10vw');
  slider.style('background', '#fff');
  
  
  createCanvas(Math.floor(window.innerWidth), Math.floor(window.innerHeight));
  console.log(window.innerWidth, window.innerHeight)
  tats = Math.floor(1.2*Math.cbrt(width*height));
  console.log(tats);

  colorMode(RGB, tats);

  cooolor =  new Array(tats);
  for(let i = 0; i < tats; i++){
    cooolor[i] = new Array(tats);
    for(let j = 0; j < tats; j++){
      cooolor[i][j] = new Array(tats);
    }
  }


  background(tats/5);
  stck = new Array(width*height);

  stckL = stck.length;
  for(let i = 0; i < stck.length; i++){
    stck[i] = new Array(5);
  }
  screenP = new Array(width);
  for(let i = 0; i < width; i++){
    screenP[i] = new Array(height);
    for(let j = 0; j < height; j++){
      screenP[i][j] = 0;
    }
  }

  for(let i = 0; i < tats; i++){
    for(let j = 0; j < tats; j++){
      for(let k = 0; k < tats; k++){
        cooolor[i][j][k] = 0;
      }
    }
  }
  // console.log(cooolor);
  let w = Math.floor(random(width/3) + width/3);
  let h = Math.floor(random(height/3) + height/3);
  let r = Math.floor(random(1000))%tats;
  let g = Math.floor(random(1000))%tats;
  let b = Math.floor(random(1000))%tats;

  stroke(color(r,g,b,255));
  point(w,h);
  screenP[w][h] = 1;
  cooolor[r][g][b] = 1;
  stck[indexF%stckL] = [w,h,r,g,b];
  indexF+=1;
  
  // stck.push([w,h,r,g,b]);

  // console.log([w,h,r,g,b]);

}

function draw(){
  for(let i =0;i<perCycle;i++){
    drawStroke();
  }
}



function drawStroke() {
  // console.log(index);
  // console.log(stck[0]);
  if(indexI != indexF){
    
    let cur;
    if(random() < slider.value()){
      cur = stck[indexI%stckL];
      indexI+=1;

    }else{
      indexF-=1;
      cur = stck[indexF%stckL];
    }
    
    
    dirnarray = shuffle(dirnarray);
    // console.log(dirnarray)
    for(let t = 0;t<dirnarray.length;t++){
      let elele = dirnarray[t];

      if (elele==0 && cur[0] > 0 && screenP[cur[0]-1][cur[1]]==0 ){
        // console.log(cur);
  
        screenP[cur[0]-1][cur[1]]=1
        let newcolor = FillColor(cur[2],cur[3],cur[4]);
        // console.log(newcolor);
        stroke(color(newcolor[0],newcolor[1],newcolor[2],255));
        point(cur[0]-1,cur[1]);
        stck[indexF%stckL] = [cur[0]-1,cur[1],newcolor[0],newcolor[1],newcolor[2]];
        indexF+=1;
        
      }
      if (elele==1 && cur[0] < width-1 && screenP[cur[0]+1][cur[1]]==0 ){
        screenP[cur[0]+1][cur[1]]==1;
        let newcolor = FillColor(cur[2],cur[3],cur[4]);
        stroke(color(newcolor[0],newcolor[1],newcolor[2],255));
        point(cur[0]+1,cur[1]);
        // stck.push([cur[0]+1,cur[1],newcolor[0],newcolor[1],newcolor[2]]);
        stck[indexF%stckL] = [cur[0]+1,cur[1],newcolor[0],newcolor[1],newcolor[2]];
        indexF+=1;
      }
      if (elele==2 && cur[1] > 0 && screenP[cur[0]][cur[1]-1]==0 ){
        screenP[cur[0]][cur[1]-1]=1;
        let newcolor = FillColor(cur[2],cur[3],cur[4]);
        stroke(color(newcolor[0],newcolor[1],newcolor[2],255));
        point(cur[0],cur[1]-1);
        // stck.push([cur[0],cur[1]-1,newcolor[0],newcolor[1],newcolor[2]]);
        stck[indexF%stckL] = [cur[0],cur[1]-1,newcolor[0],newcolor[1],newcolor[2]];
        indexF+=1;
      }
      if (elele==3 && cur[1] <height-1 && screenP[cur[0]][cur[1]+1]==0 ){
        screenP[cur[0]][cur[1]+1]=1;
        let newcolor = FillColor(cur[2],cur[3],cur[4]);
        stroke(color(newcolor[0],newcolor[1],newcolor[2],255));
        point(cur[0],cur[1]+1);
        // stck.push([cur[0],cur[1]+1,newcolor[0],newcolor[1],newcolor[2]]);
        stck[indexF%stckL] = [cur[0],cur[1]+1,newcolor[0],newcolor[1],newcolor[2]];
        indexF+=1;
      }
      if (elele==4 && cur[0] > 0 && cur[1] > 0 && screenP[cur[0]-1][cur[1]-1]==0 ){
        screenP[cur[0]-1][cur[1]-1]=1;
        let newcolor = FillColor(cur[2],cur[3],cur[4]);
        stroke(color(newcolor[0],newcolor[1],newcolor[2],255));
        point(cur[0]-1,cur[1]-1);
        // stck.push([cur[0],cur[1]+1,newcolor[0],newcolor[1],newcolor[2]]);
        stck[indexF%stckL] = [cur[0]-1,cur[1]-1,newcolor[0],newcolor[1],newcolor[2]];
        indexF+=1;
      }
      if (elele==5 && cur[0] < width-1 && cur[1] > 0 && screenP[cur[0]+1][cur[1]-1]==0 ){
        screenP[cur[0]+1][cur[1]-1]=1;
        let newcolor = FillColor(cur[2],cur[3],cur[4]);
        stroke(color(newcolor[0],newcolor[1],newcolor[2],255));
        point(cur[0]+1,cur[1]-1);
        // stck.push([cur[0],cur[1]+1,newcolor[0],newcolor[1],newcolor[2]]);
        stck[indexF%stckL] = [cur[0]+1,cur[1]-1,newcolor[0],newcolor[1],newcolor[2]];
        indexF+=1;
      }
      if (elele==6 && cur[0] < width-1 && cur[1] < height-1 && screenP[cur[0]+1][cur[1]+1]==0 ){
        screenP[cur[0]+1][cur[1]+1]=1;
        let newcolor = FillColor(cur[2],cur[3],cur[4]);
        stroke(color(newcolor[0],newcolor[1],newcolor[2],255));
        point(cur[0]+1,cur[1]+1);
        // stck.push([cur[0],cur[1]+1,newcolor[0],newcolor[1],newcolor[2]]);
        stck[indexF%stckL] = [cur[0]+1,cur[1]+1,newcolor[0],newcolor[1],newcolor[2]];
        indexF+=1;
      }
      
      if (elele==7 && cur[0] > 0 && cur[1] < height-1 && screenP[cur[0]-1][cur[1]+1]==0 ){
        screenP[cur[0]-1][cur[1]+1]=1;
        let newcolor = FillColor(cur[2],cur[3],cur[4]);
        stroke(color(newcolor[0],newcolor[1],newcolor[2],255));
        point(cur[0]-1,cur[1]+1);
        // stck.push([cur[0],cur[1]+1,newcolor[0],newcolor[1],newcolor[2]]);
        stck[indexF%stckL] = [cur[0]-1,cur[1]+1,newcolor[0],newcolor[1],newcolor[2]];
        indexF+=1;
      }


    }
    
    
  }

  
   
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  setup()
  
}