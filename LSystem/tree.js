let str = "X"
let newString = "";
let rule =[["X","F+[-F-XF-X][+FF][--XF[+X]][++F-X]"],["F","FF"]]
let len ;
let prob = 1/4;
let a = 0.25,b = 0.5,c =0.75;
let angle ;
let probC = 0.09;
let offset_x ;
let offset_y; 
let mv = 6;

let locked = false;
let ix = 0.0;
let iy = 0.0;

String.prototype.replaceAt = function(index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}


function RuleMaker(){
  let ruleStr = "F[+X-";

  for (let i = 0; i < 24 + random(11); i++) {
    let maker = random();
    if (maker >= 0  && maker < a ){
      ruleStr += "-"
      a-=probC;
      if (a <= 0){
        a+=probC;
      }
    }else if (maker >= a  && maker < b){
      ruleStr += "+";
      a+=probC;
      if (a >= b){
        a-=probC
      }

    }else if (maker >= b  && maker < c){
      ruleStr += "X"
    }else if (maker >= c  && maker < 1 ){
      ruleStr += "F"
    }

  }
  for (let i = 0; i < 3 + random(3); i++) {
    let indI = round(12*random(ruleStr.length)) %(ruleStr.length-8) + 4;
    let indF=  round(12*random(ruleStr.length)) %(ruleStr.length-4-indI) + indI+3;
    if(ruleStr.charAt(indI) != "[" && ruleStr.charAt(indF) != "]" ){
      ruleStr = ruleStr.replaceAt(indI,"[");
      ruleStr = ruleStr.replaceAt(indF,"]")
    }
    
  }
  ruleStr += "]";

  rule[0][1] = ruleStr;
  console.log(ruleStr);
  

}

function generate(){
 
    for (let i = 0; i < str.length; i++) {
      let letter = str.charAt(i);
      let flag = true;
      for (let k = 0; k < rule.length; k++) {
       if(letter == rule[k][0]){
        newString+=rule[k][1]
        flag = false;
        break;
       }

        
      }
      if (flag){
        newString+=letter;
      }
      
    }
    str = newString;
    newString = ""
    console.log(str);
    len*=0.6;

    turtle();

}

function turtle(){
  background(51);
  resetMatrix();
  stroke(255,100);
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
    }else if(curr == "["){
      push();
      
    }else if(curr == "]"){
      pop();
      
    }

  }
}

function rese(){
  str = "X";
  resetMatrix();
  RuleMaker();
  len = height/8;
  if (random() < 0.5){
    angle = radians(random(16) + 14);
  }else{
    angle = -radians(random(16) + 14);

  }
  offset_x= width/2;
  offset_y= height;

  background(51);


}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  let button = createButton("Generate");
  len = height/8;
  angle = radians(random(64)-32);
  if (random() < 0.5){
    angle = radians(random(16) + 14);
  }else{
    angle = -radians(random(16) + 14);

  }

  offset_x= width/2;
  offset_y= height;

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
  strokeWeight(2);
  RuleMaker();
  turtle();
  // generate();
  
  
}
function draw(){

}
function mousePressed() {
  locked = true;
   ix = mouseX;
  //  iy = mouseY;
   console.log("hI")
 }
 
 function mouseDragged() {
   if (locked) {
     offset_x += mouseX - ix;
    //  offset_y += mouseY - iy;
     ix = mouseX;
    //  iy = mouseY;
     turtle();
   }
 }
 
 function mouseReleased() {
   locked = false;
 }


function keyPressed() {
  if (keyCode === LEFT_ARROW) {
      offset_x += width/mv;
      turtle();
  } else if (keyCode === RIGHT_ARROW) {
    offset_x -= width/mv;
    turtle();

  }else if (keyCode === UP_ARROW) {
    len/=0.8;
    turtle();

  }else if (keyCode === DOWN_ARROW) {
    len*=0.8;
    turtle();

  }else if (keyCode === 32) {
    generate()
  }else if (keyCode === 13) {
    rese()
  }

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


function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  
}

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})