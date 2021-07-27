let day = ''

switch (new Date().getDay()) {
  case 0:
    day = "Sunday";
    break;
  case 1:
    day = "Monday";
    break;
  case 2:
     day = "Tuesday";
    break;
  case 3:
    day = "Wednesday";
    break;
  case 4:
    day = "Thursday";
    break;
  case 5:
    day = "Friday";
    break;
  case 6:
    day = "Saturday";
}

txts = ["ace ", "amazing ", "astonishing ", "astounding ", "awe-inspiring ", "awesome ", "badass ", "beautiful ", "bedazzling ", "bee's knees ", "best ", "breathtaking ", "brilliant ", "cat's meow ", "cat's pajamas ", "classy ", "cool ", "dandy ", "dazzling ", "delightful ", "divine ", "doozie ", "epic ", "excellent ", "exceptional ", "exquisite ", "extraordinary ", "fabulous ", "fantastic ", "fantabulous ", "fine ", "finest ", "first-class ", "first-rate ", "flawless ", "funkadelic ", "geometric ", "glorious ", "gnarly ", "good ", "grand ", "great ", "groovy ", "groundbreaking ", "hunky-dory ", "impeccable ", "impressive ", "incredible ", "kickass ", "kryptonian ", "laudable ", "legendary ", "lovely ", "luminous ", "magnificent ", "majestic ", "marvelous ", "mathematical ", "mind-blowing ", "neat ", "outstanding ", "peachy ", "perfect ", "phenomenal ", "pioneering ", "polished ", "posh ", "praiseworthy ", "premium ", "priceless ", "prime ", "primo ", "rad ", "remarkable ", "riveting ", "sensational ", "shining ", "slick ", "smashing ", "solid ", "spectacular ", "splendid ", "stellar ", "striking ", "stunning ", "stupendous ", "stylish ", "sublime ", "super ", "super-duper ", "super-excellent ", "superb ", "superior ", "supreme ", "sweet ", "swell ", "terrific ", "tiptop ", "top-notch ", "transcendent ", "tremendous ", "ultimate ", "unreal ", "well-made ", "wicked ", "wonderful ", "wondrous ", "world-class "]

let count = Math.floor(Math.random() * txts.length);
let index = 0;
let currentText = '';
let letter = '';
let art = ''
let typing = document.querySelector('#typing');
(function type(){
  
  if (letter[0] == 'a' || letter[0] == 'e' || letter[0] == 'i' || letter[0] == 'o' || letter[0] == 'u'  ){
    art = "an";
  }else{
    art = "a";
  }
  currentText = txts[count]
  letter = currentText.slice(0,++index);

  let c = letter.length/currentText.length;
  
  typing.textContent = "Stay bold & have "+ art + " " +letter ;
  if(letter.length == currentText.length){
    count = (count + 1+  Math.floor(Math.random() *( txts.length - 1)) ) % txts.length;
    index = 0;
    setTimeout(type,2000)
  }else{
    let timeint =Math.floor( (1.4-Math.sin(Math.PI*c))*100);
    setTimeout(type,timeint)
  
  }
}());

// let fancyend = document.querySelector('#endfancys');
// if(window.innerWidth < ){
//   fancyend
// }






let daytoday = document.querySelector('#dayto');
daytoday.textContent = " " + day;



let cards = document.querySelectorAll('.card');
let contacts = document.querySelectorAll('.cntctsquare');
let cntctbox = document.querySelectorAll('.icondiv');
let homeBox = document.querySelectorAll('.homeicon')

const appearOptions = {
  threshold:0.2,

};

const appearOnScroll = new IntersectionObserver(
  function(
    entries,appearOnScroll 
  ){
    entries.forEach(entry =>{
      if(!entry.isIntersecting){
        return;
      }else{
        entry.target.classList.add('appear');
        
        appearOnScroll.unobserve(entry.target);
      }
    })
  },appearOptions
);

cards.forEach(card=>{
  appearOnScroll.observe(card)
})

const conOptions = {
  threshold:1,
  rootMargin: "0px 0px -18% 0px"
}

const contactObs = new IntersectionObserver(
  function(
    entries,contactObs 
  ){
    entries.forEach(entry =>{
      if(!entry.isIntersecting){
        return;
      }else{
        entry.target.classList.add('appear');
        cntctbox.forEach(con=>{
          con.classList.add('appear');
        })
        homeBox.forEach(con=>{
          con.classList.add('appear');
        })
        contactObs.unobserve(entry.target);
      }
    })
  },conOptions
);

contacts.forEach(card=>{
  contactObs.observe(card)
})