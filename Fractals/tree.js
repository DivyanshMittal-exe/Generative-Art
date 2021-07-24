let str = "F+F+F+F"
let newString = "";
let rule =["F","FF+F+F+F+FF"]
let len ;
let prob = 1/4;
let a = 0.25,b = 0.5,c =0.75;
let angle ;
let probC = 0.09;
let offset_x ;
let offset_y; 
let mv = 7;
let locked = false;
let ix = 0.0;
let iy = 0.0;


String.prototype.replaceAt = function(index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}


function RuleMaker(){
  let ruleStr = "";

  for (let i = 0; i < 9 + random(6); i++) {
    let maker = random();
    if (maker < 1/3 ){
      ruleStr += "F";
    }else if(maker >= 1/3 && maker < 2/3){
      ruleStr += "+";
    }else{
      ruleStr += "-";

    }

  }
  
  

  rule[1] = ruleStr;
  console.log(ruleStr);
  

}

function generate(){
 
    for (let i = 0; i < str.length; i++) {
      let letter = str.charAt(i);
      
      
       if(letter == rule[0]){
        newString+=rule[1]

       }else{
        newString+=letter;
       }

    }
    str = newString;
    newString = ""
    console.log(str);
     len*=0.8;

    turtle();

}

function turtle(){
  background(51);
  resetMatrix();
  stroke(255,200);
  translate(offset_x,offset_y);
  
  
  for (let i = 0; i < str.length; i++) {
    let curr = str.charAt(i);
    if(curr == "F"){
      line(0,0,0,-len);
      translate(0,-len);
    }else if(curr == "+"){
      rotate(angle)
    }else if(curr == "-"){
      rotate(-angle)
    }

  }
}

function rese(){
  str = "F";
  let tot = 3+ round(random(1024))%4;
  angle = TAU/tot;
  for(let i = 1; i < tot ; i++){
    str+="+F"
  }



  resetMatrix();
  RuleMaker();
  len = height/12;
  offset_x= width/2;
  offset_y= height/2;
  
  background(51);


}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  
  let button = createButton("Generate");
  len = height/12;
  angle = PI/2;
  str = "F";
  
  let tot = 3+ round(random(1024))%4;
  angle = TAU/tot;

  for(let i = 1; i < tot ; i++){
    str+="+F"
  }

  offset_x= width/2;
  offset_y= height/2;

  button.mousePressed(generate);
  let button2 = createButton("New");
  button2.mousePressed(rese);

  button.class('btn btn-primary');
  button2.class('btn btn-primary ms-2');
  button.parent('para');
  button2.parent('para');
  translate(width/2,height);
  background(51);
  strokeCap(SQUARE)
  strokeWeight(3);
  RuleMaker();
  turtle();
  // generate();
  
  
}
function draw(){

}

function mousePressed() {
  locked = true;
   ix = mouseX;
   iy = mouseY;
   console.log("hI")
 }
 
 function mouseDragged() {
   if (locked) {
     offset_x += mouseX - ix;
     offset_y += mouseY - iy;
     ix = mouseX;
     iy = mouseY;
     turtle();
   }
 }
 
 function mouseReleased() {
   locked = false;
 }

 function mouseWheel(event) {
  console.log(event.delta);
  if(event.delta > 0){
    len*=0.98;
    turtle();
  }else{
    len/=0.98;
    turtle();


  }
 }








function keyPressed() {
  if (keyCode === LEFT_ARROW) {
      offset_x += width/mv;
      turtle();
  } else if (keyCode === RIGHT_ARROW) {
    offset_x -= width/mv;
    turtle();

  }else if (keyCode === UP_ARROW) {
    offset_y += height/mv;
    turtle();

  }else if (keyCode === DOWN_ARROW) {
    offset_y -= height/mv;
    turtle();

  }else if (keyCode === SHIFT) {
    len*=0.8;
    turtle();

  }else if (keyCode === CONTROL) {
    len/=0.8;
    turtle();

  }else if (keyCode === 32) {
    generate()
  }else if (keyCode === 13) {
    rese()
  }
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  
}

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})