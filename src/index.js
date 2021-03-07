import "./sass/main.scss";

// var fs = require("fs");

// var slidesJSON = JSON.stringify([
//   {
//     imageUrl: "./image/slide1.jpg",
//     title: "Enjoy out hot summer deals",
//     price: "69",
//   },
//   {
//     imageUrl: "./image/slide2.jpg",
//     title: "Enjoy out winter deals",
//     price: "89",
//   },
//   {
//     imageUrl: "./image/slide3.jpg",
//     title: "Enjoy out fall deals",
//     price: "49",
//   },
// ]);
// fs.writeFile("slides", slidesJSON);

import { renderSlides } from "./js/view/sliderView";

export const createSlider = () => {
  const sliderWrapper = document.querySelector(".slider");
  const slider = document.querySelector(".slider__slider");
  const slides = document.getElementsByClassName("slider__slide");
  const sliderNav = document.querySelector(".slider__nav");

  sliderNav.addEventListener("click", (event) => {
    const direction = event.target.dataset.dir;
    shiftSlide(direction, "");
  });

  let slidesLength = slides.length;
  let allowShift = true;
  let index = 0;
  let posInitial = 0;
  let posX1 = 0;
  let posX2 = 0;

  const handleResize = () => {
    const sliderWrapper1 = document.querySelector(".slider");
    const slider = document.querySelector(".slider__slider");
    const slides = [document.getElementsByClassName("slider__slide")];
    index = 0;

    const sliderWrapperWidth1 = sliderWrapper1.getClientRects()[0].width;

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.width = sliderWrapperWidth1 + "px";
    }

    sliderWrapperWidth = sliderWrapperWidth1;

    slider.style.left = -sliderWrapperWidth1 + "px";
  };

  window.addEventListener("resize", handleResize);

  let sliderWrapperWidth = sliderWrapper.getClientRects()[0].width;
  const firstSlide = slides[0].cloneNode(true);
  const lastSlide = slides[slides.length - 1].cloneNode(true);

  slider.prepend(firstSlide);
  slider.appendChild(lastSlide);

  slider.style.left = -sliderWrapperWidth + "px";
  // slider.style.width = sliderWrapperWidth * slides.length + "px";

  [...slides].forEach((slide) => {
    slide.style.width = sliderWrapperWidth + "px";
  });

  const dragStart = (event) => {
    event.preventDefault();

    posInitial = slider.offsetLeft;
    posX1 = event.clientX;

    document.onmousemove = dragAction;
    document.onmouseup = dragEnd;
  };

  const dragAction = (event) => {
    posX2 = event.clientX - posX1;
    posX1 = event.clientX;

    slider.style.left = slider.offsetLeft + posX2 + "px";
  };

  const dragEnd = () => {
    const shiftDistance = slider.offsetLeft - posInitial;

    if (shiftDistance > 100) {
      shiftSlide("right", "drag");
    } else if (shiftDistance < -100) {
      shiftSlide("left", "drag");
    } else {
      slider.style.left = posInitial + "px";
    }

    document.onmousemove = null;
    document.onmouseup = null;
  };

  const shiftSlide = (dir, action) => {
    slider.classList.add("transition");

    if (!allowShift) {
      return;
    }

    if (!action) {
      posInitial = slider.offsetLeft;
    }

    if (dir === "right") {
      slider.style.left = posInitial + sliderWrapperWidth + "px";
      index--;
    } else if (dir === "left") {
      slider.style.left = posInitial - sliderWrapperWidth + "px";
      index++;
    }

    allowShift = false;
  };

  const checkIndex = () => {
    slider.classList.remove("transition");

    if (index === -1) {
      slider.style.left = -slidesLength * sliderWrapperWidth + "px";
      index = slidesLength - 1;
    }

    if (index === slidesLength) {
      slider.style.left = -sliderWrapperWidth + "px";
      index = 0;
    }

    allowShift = true;
  };

  slider.addEventListener("mousedown", dragStart);
  slider.addEventListener("transitionend", checkIndex);

  // setInterval(() => {
  //   shiftSlide("right");
  // }, 5000);
};

renderSlides();

createSlider();
