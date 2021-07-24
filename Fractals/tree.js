let str = "F+F+F+F"
let newString = "";
let rule =["F","FF+F+F+F+FF"]
let len ;
let prob = 1/4;
let a = 0.25,b = 0.5,c =0.75;
let angle ;
let probC = 0.09;

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
    turtle();

}

function turtle(){
  background(51);
  resetMatrix();
  stroke(255,200);
  translate(width/2,height/2);
  len*=0.8;
  
  
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

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  
}

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})