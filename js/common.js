window.addEventListener("DOMContentLoaded", function() {

let sec1 = document.querySelector(".service ul");
let sec2 = document.querySelector(".eAlret");
let sec3 = document.querySelector(".event");
let sec4 = document.querySelector(".contact");
let bg1 = document.querySelector(".bg1");
let bg2 = document.querySelector(".bg2");
let circle = document.querySelector(".circle");
let slideHeight = document.querySelector(".visit").scrollHeight;
let listH = document.querySelectorAll(".serviceList .tabArea li");
let slideO = document.querySelectorAll(".serviceList .swiper");
let btnN = document.querySelector(".contact .formBox .area5 .rightArea button");

btnN.addEventListener("click",function(e){
  e.preventDefault()
  document.querySelector(".contact .formBox .area5 .rightArea ul").classList.toggle("visible")
})


console.log(sec2.querySelector(".smartPhone"))

Array.from(listH).map((list, i) => {
  let listW = list.offsetWidth;
  list.style.height = listW + "px";
  list.style.marginBottom = document.querySelector(".serviceList .tabArea ul").offsetWidth / 20 +"px"
});

window.addEventListener('scroll', function() {
  if (window.pageYOffset >  sec2.offsetTop - 200){
   sec2.querySelector(".visitN").classList.add('up')
   sec2.querySelector(".visitP").classList.add('up')
  }
})

window.addEventListener("resize",function(){
  Array.from(listH).map((list, i) => {
    let listW = list.offsetWidth;
    list.style.height = listW + "px";
    list.style.marginBottom = document.querySelector(".serviceList .tabArea ul").offsetWidth / 20 +"px"
  });
  bgHeight();
  topChange()
})

listH.forEach((tab, idx, arr) => {
  tab.addEventListener("click", function(){
    arr.forEach((e) => {
      e.classList.remove('active');
    });
    this.classList.add('active');

    slideO.forEach((slide) => {
      slide.classList.remove('on');
    });

    let clickedIndex = Array.from(arr).indexOf(this);
    slideO[clickedIndex].classList.add('on');
    setTimeout(() => {
      topChange();
    }, 50);
  });
});


function bgHeight() {
  bg1.style.height = sec2.clientHeight + slideHeight  + "px";
  bg2.style.height = sec3.clientHeight + sec4.clientHeight + "px"
}

var activeIndex;
var activeSlide;
var activeSlideVideo;

let swiperVideo = new Swiper(".videoSlide", {
  slidesPerView: 3,
  spaceBetween: 30,
  centeredSlides: true,
  loop: true,
  pagination: {
    el: ".visit-swiper-pagination",
    type : 'progressbar'
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    770: {
      slidesPerView: 3,  
    },
  },
  on: {
    transitionStart: function() {
      var videos = document.querySelectorAll('.visit video');
      Array.prototype.forEach.call(videos, function(video) {
        video.pause();
      });
    },
    transitionEnd: function() {
      activeIndex = this.activeIndex;
      activeSlide = document.querySelectorAll('.visit .swiper-slide')[activeIndex];
      activeSlideVideo = activeSlide.getElementsByTagName('video')[0];
      activeSlideVideo.play();
    },
    update: function() {
      
      bgHeight();
    },
   }
});

bgHeight();

function createSwiperSlide(containerClass, pgIdxClass) {
  const container = document.querySelector(containerClass);
  const siblings = Array.from(container.parentNode.children);
  const paginationElement = siblings.find(function(element) {
    return element.classList.contains("swiper-pagination");
  });
  const nextButtonElement = siblings.find(function(element) {
    return element.classList.contains("swiper-button-next");
  });
  const prevButtonElement = siblings.find(function(element) {
    return element.classList.contains("swiper-button-prev");
  });

  return new Swiper(containerClass, {
    pagination: {
      el: paginationElement,
      type: "fraction",
    },
    navigation: {
      nextEl: nextButtonElement,
      prevEl: prevButtonElement,
    },
    loop:true,
    on: {
      slideChangeTransitionStart: function(){
        pgTop(pgIdxClass);
      },
    }
  });
}

for (let i = 1; i <= 6; i++) {
  const containerClass = ".serviceSlide" + i;
  const pgIdxClass = ".slide" + i;
  const swiper = createSwiperSlide(containerClass, pgIdxClass);
}

function pgTop(pgIdxClass) {
  var pgContainer = document.querySelector(pgIdxClass);
  var paginationMove = pgContainer.querySelector(".swiper-pagination");
  var active = pgContainer.querySelector('.swiper-slide-active');
  if (paginationMove && active) {
    paginationMove.style.top = 24 + active.scrollHeight + "px";
  }
}

function topChange(){
  var pgUpdate = document.querySelector(".slideArea .on")
  var activeUpdate = document.querySelector('.on .swiper-slide-active');
  pgUpdate.nextElementSibling.style.top = 24 + activeUpdate.scrollHeight + "px";
}


topChange()

})