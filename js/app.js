let _slideUp = (target, duration) => {
  target.style.transitionProperty = "height, margin, padding"; /* [1.1] */
  target.style.transitionDuration = duration + "ms"; /* [1.2] */

  target.style.height = target.offsetHeight + "px"; /* [3] */
  target.offsetHeight;
  target.style.overflow = "hidden"; /* [7] */
  target.style.height = 0; /* [4] */
  target.style.paddingTop = 0; /* [5.1] */
  target.style.paddingBottom = 0; /* [5.2] */
  target.style.marginTop = 0; /* [6.1] */
  target.style.marginBottom = 0; /* [7.2] */

  window.setTimeout(() => {
    target.style.display = "none"; /* [8] */
    target.style.removeProperty("height"); /* [9] */
    target.style.removeProperty("padding-top"); /* [10.1] */
    target.style.removeProperty("padding-bottom"); /* [10.2] */
    target.style.removeProperty("margin-top"); /* [11.1] */
    target.style.removeProperty("margin-bottom"); /* [11.2] */
    target.style.removeProperty("overflow"); /* [12] */
    target.style.removeProperty("transition-duration"); /* [13.1] */
    target.style.removeProperty("transition-property"); /* [13.2] */
  }, duration);
};

let _slideDown = (target, duration) => {
  target.style.removeProperty("display"); /* [1] */
  let display = window.getComputedStyle(target).display;
  if (display === "none") {
    /* [2] */
    display = "block";
  }
  target.style.display = display;
  let height = target.offsetHeight; /* [3] */
  target.style.overflow = "hidden"; /* [7] */
  target.style.height = 0; /* [4] */
  target.style.paddingTop = 0; /* [5.1] */
  target.style.paddingBottom = 0; /* [5.2] */
  target.style.marginTop = 0; /* [6.1] */
  target.style.marginBottom = 0; /* [6.2] */
  target.offsetHeight;

  target.style.transitionProperty = "height, margin, padding"; /* [9.1] */
  target.style.transitionDuration = duration + "ms"; /* [9.2] */
  target.style.height = height + "px"; /* [10] */
  target.style.removeProperty("padding-top"); /* [11.1] */
  target.style.removeProperty("padding-bottom"); /* [11.2] */
  target.style.removeProperty("margin-top"); /* [12.1] */
  target.style.removeProperty("margin-bottom"); /* [12.2] */
  window.setTimeout(() => {
    target.style.removeProperty("height"); /* [13] */
    target.style.removeProperty("overflow"); /* [14] */
    target.style.removeProperty("transition-duration"); /* [15.1] */
    target.style.removeProperty("transition-property"); /* [15.2] */
  }, duration);
};

let _slideToggle = (target, duration = 500) => {
  if (window.getComputedStyle(target).display === "none") {
    return _slideDown(target, duration);
  } else {
    return _slideUp(target, duration);
  }
};

function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});

const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

if (isMobile.any()) {
  document.body.classList.add("_mobile");
  
 

} else {
  document.body.classList.add("_pc");
}

function ibg() {
  let ibg = document.querySelectorAll("._ibg");
  for (var i = 0; i < ibg.length; i++) {
    if (ibg[i].querySelector("img")) {
      ibg[i].style.backgroundImage =
        "url(" + ibg[i].querySelector("img").getAttribute("src") + ")";
    }
  }
}

ibg();

//Анимация при скоре (добавление класа при достижении 1/4 блока)
const anim_items = document.querySelectorAll("._anim-items");
if (anim_items.length > 0) {
  window.addEventListener("scroll", animOnScroll);
  function animOnScroll(params) {
    for (let index = 0; index < anim_items.length; index++) {
      const animElement = anim_items[index];
      const animElementHeigt = animElement.offsetHeight;
      const animItemOffset = offset(animElement).top;
      const animStart = 4;

      let animStartPoint =
        document.documentElement.clientHeight - animElementHeigt / animStart;
      if (animElementHeigt > document.documentElement.clientHeight) {
        animStartPoint =
          document.documentElement.clientHeight -
          document.documentElement.clientHeight / animStart;
      }
      if (
        pageYOffset > animItemOffset - animStartPoint &&
        pageYOffset < animItemOffset + animElementHeigt
      ) {
        animElement.classList.add("_active");
      } else {
        if (!animElement.classList.contains("_noAnimAgain"))
          animElement.classList.remove("_active");
      }
    }
  }

  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }

  setTimeout(() => {
    animOnScroll();
  }, 300);
}

window.onload = () => {
  const headerBurger = document.querySelector(".header__burger");
  const burgerMenu = document.querySelector(".header__nav");
  const startVidBtn = document.querySelector(".video__start-btn.icon-start");
  const pauseVidBtn = document.querySelector(".video__pause-btn.icon-pause");
  const mainVideo = document.querySelector(".video__vid video");
  const videoBg = document.querySelector(".video__bg");

  if (headerBurger) {
    headerBurger.addEventListener("click", function () {
      burgerMenu.classList.toggle("_active");
      this.classList.toggle("_active");
      document.body.classList.toggle("_isLocked");
    });
  }

  if (mainVideo && videoBg) {
    startVidBtn.addEventListener("click", function () {
      this.style.display = "none";
      pauseVidBtn.style.display = "flex";
      videoBg.style.display = "none";
      mainVideo.play();
    });
    pauseVidBtn.addEventListener("click", function () {
      this.style.display = "none";
      startVidBtn.style.display = "flex";
      videoBg.style.display = "block";
      mainVideo.pause();
    });
  }

  let user = {
    address: "Jello",
  };

  console.log(user.address);
  // console.log(user.address.data.dick);
  console.log(user.address?.data?.dick);
};

//заготавка под свайпер и объявление и адаптация слайдеров ==============
let sliders = document.querySelectorAll("._swiper");
if (sliders.length > 0) {
  for (let index = 0; index < sliders.length; index++) {
    let slider = sliders[index];
    if (!slider.classList.contains("swiper-bild")) {
      let sliderItems = slider.children;

      if (sliderItems.length > 0) {
        for (const child of sliderItems) {
          child.classList.add("swiper-slide");
        }
      }

      let slider_content = slider.innerHTML;
      let SwiperWrapper = document.createElement("div");
      SwiperWrapper.classList.add("swiper-wrapper");
      SwiperWrapper.innerHTML = slider_content;
      slider.innerHTML = "";
      slider.appendChild(SwiperWrapper);
      slider.classList.add("swiper-bild");

      let btnPrev = document.createElement("div");
      btnPrev.className = "swiper-button-prev";
      slider.appendChild(btnPrev);
      let btnNext = document.createElement("div");
      btnNext.className = "swiper-button-next";
      slider.appendChild(btnNext);

      if (slider.classList.contains("_swiper_scroll")) {
        let sliderScroll = document.createElement("div");
        sliderScroll.classList.add("swiper-scrollbar");
        slider.appendChild(sliderScroll);
      }
    }
  }
}

function slide_Bind_content(params) {}

//=============================================================


if (document.querySelector(".about-page__swiper")) {
  new Swiper(".about-page__swiper", {
    //Отстутпы между слайдами
    spaceBetween: 10,
    //Слайды на пролисьывание (сколько будет листаться)
    slidesPerGroup: 1,
    //Сколько слайдов будет видно
    slidesPerView: 3,
    //Кол-во колонок
    grid: {
        rows: 2,
      },
    // centeredSlides:true
    speed: 800,
    //Возможные варианты:flip slide cube coverflow fade
    effect: "slide",
    loop: false,
    // navigation: {
    //   nextEl: ".swiper-button-next",
    //   prevEl: ".swiper-button-prev",
    // },
    //Точки буллиты
    pagination:{
        el:'.about-page__slider-pagintaion',
        clickable:true,
    
    },
    grabCursor: false,
    keyboard: {
      // Включаем управление клавиатурой
      enabled: true,
      //Только при поле зрения
      onlyInViewport: true,
      pageUpDown: true,
    },
    autoHeight: false,
    breakpoints: {
      0: {
        slidesPerView: 2,
        grid:{
            rows:1,
        }
      },
      450:{
        slidesPerView: 2,
          grid:{
              rows:2,
          }
      },
      990: {
        slidesPerView: 3,
      },
    },
    watchOverlow:true,
    observer: true,
  });
}
