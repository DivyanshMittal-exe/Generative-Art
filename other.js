let day = ''

let curs = "|";

switch (new Date().getDay()) {
  case 0:
    day = "sunday";
    break;
  case 1:
    day = "monday";
    break;
  case 2:
    day = "tuesday";
    break;
  case 3:
    day = "wednesday";
    break;
  case 4:
    day = "thursday";
    break;
  case 5:
    day = "friday";
    break;
  case 6:
    day = "saturday";
}

txts = ["ace", "amazing", "astonishing", "astounding", "awe-inspiring", "awesome", "badass", "beautiful", "bedazzling", "bee's knees", "best", "breathtaking", "brilliant", "cat's meow", "cat's pajamas", "classy", "cool", "dandy", "dazzling", "delightful", "divine", "doozie", "epic", "excellent", "exceptional", "exquisite", "extraordinary", "fabulous", "fantastic", "fantabulous", "fine", "finest", "first-class", "first-rate", "flawless", "funkadelic", "geometric", "glorious", "gnarly", "good", "grand", "great", "groovy", "groundbreaking", "hunky-dory", "impeccable", "impressive", "incredible", "kickass", "kryptonian", "laudable", "legendary", "lovely", "luminous", "magnificent", "majestic", "marvelous", "mathematical", "mind-blowing", "neat", "outstanding", "peachy", "perfect", "phenomenal", "pioneering", "polished", "posh", "praiseworthy", "premium", "priceless", "prime", "primo", "rad", "remarkable", "riveting", "sensational", "shining", "slick", "smashing", "solid", "spectacular", "splendid", "stellar", "striking", "stunning", "stupendous", "stylish", "sublime", "super", "super-duper", "super-excellent", "superb", "superior", "supreme", "sweet", "swell", "terrific", "tiptop", "top-notch", "transcendent", "tremendous", "ultimate", "unreal", "well-made", "wicked", "wonderful", "wondrous", "world-class"]

let count = Math.floor(Math.random() * txts.length);
let index = 0;
let currentText = '';
let letter = '';
let art = ''
let typing = document.querySelector('#typing');
let removing = false;

(function type() {
  currentText = txts[count];
  // console.log(index,count,removing)
  // typing.textContent = "Stay bold & have "+ art + " " +letter ;
  if (letter.length == currentText.length && removing == false) {
    // count = (count + 1 + Math.floor(Math.random() * (txts.length - 1))) % txts.length;
    // index = 0;
    removing = true;
    setTimeout(type, 2000)
  } else {

    if (removing == false) {

      if (letter[0] == 'a' || letter[0] == 'e' || letter[0] == 'i' || letter[0] == 'o' || letter[0] == 'u') {
        art = "an";
      } else {
        art = "a";
      }
      
      letter = currentText.slice(0, ++index);

      let c = letter.length / currentText.length;
      let timeint = Math.floor((1.4 - Math.sin(Math.PI * c)) * 100);
      setTimeout(type, timeint)
    } else {
      if (index == 0) {
        removing = false;
        count = (count + 1 + Math.floor(Math.random() * (txts.length - 1))) % txts.length;
      } else {
        // currentText = txts[count]
        letter = letter.slice(0,--index);
        // index = 0
      }
      setTimeout(type, 30)
    }
  }

}());

(function typeCursor() {
  if (curs == "|") {
    curs = " ";
  } else {
    curs = "|";
  }
  setTimeout(typeCursor, 300)

}());

(function dispText() {
  typing.textContent = "Stay bold & have " + art + " " + letter + curs + day;
  setTimeout(dispText, 10);
}());

// let fancyend = document.querySelector('#endfancys');
// if(window.innerWidth < ){
//   fancyend
// }






// let daytoday = document.querySelector('#dayto');
// daytoday.textContent = " " + day;



// let cards = document.querySelectorAll('.card');
let contacts = document.querySelectorAll('.cntctsquare');
let cntctbox = document.querySelectorAll('.icondiv');

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

// cards.forEach(card=>{
//   appearOnScroll.observe(card)
// })

const conOptions = {
  threshold:1,
  rootMargin: "0px 0px -18% 0px"
}

// const contactObs = new IntersectionObserver(
//   function(
//     entries,contactObs 
//   ){
//     entries.forEach(entry =>{
//       if(!entry.isIntersecting){
//         return;
//       }else{
//         entry.target.classList.add('appear');
//         cntctbox.forEach(con=>{
//           con.classList.add('appear');
//         })
//         homeBox.forEach(con=>{
//           con.classList.add('appear');
//         })
//         contactObs.unobserve(entry.target);
//       }
//     })
//   },conOptions
// );

// contacts.forEach(card=>{
//   contactObs.observe(card)
// })

gsap.registerPlugin(ScrollTrigger);

let cards_g = document.querySelectorAll(".card")
cards_g.forEach(element => {
  gsap.to(element,{
    scrollTrigger:{
        trigger:element,
        
        start: "-30% 80%",
        end: "-30% 50%",
        // toggleActions:"restart none none none",
        scrub: 1,
        // markers: true
    },
    y: "0",
    opacity:1,
    // duration: 0.25,
    
    
  });
});


gsap.to(".cntctsquare",{
  scrollTrigger:{
      trigger:".cntctsquare",
      
      start: "center 60%",
      end: "center 46%",
      // toggleActions:"restart none none none",
      scrub: 1,
      // markers: true
  },
  rotate: "45",
  // opacity:1,
  // duration: 0.25,
  
  
});

cntctbox.forEach(element => {
  gsap.to(element,{
    scrollTrigger:{
      trigger:".cntctsquare",
      
      start: "center 60%",
      end: "center 46%",
      // toggleActions:"restart none none none",
      scrub: 1,
      // markers: true
  },
  rotate: "-45",
  // opacity:1,
  // duration: 0.25,
  
  
});
});



gsap.to(".homeicon",{
  scrollTrigger:{
    trigger:".cntctsquare",
    
    start: "center 60%",
    end: "center 46%",
    // toggleActions:"restart none none none",
    scrub: 1,
    // markers: true
},
rotate: "-45",
// opacity:1,
// duration: 0.25,


});