import { elements } from "./view/searchBase";

import { renderSlides } from "./view/sliderView";

export const createSlider = () => {
  const slider = elements.slider;
  const slides = elements.slides;

  let slidesLength = slides.length;
  let allowShift = true;
  let index = 0;
  let posInitial = 0;
  let posX1 = 0;
  let posX2 = 0;
  let sliderWrapperWidth = 0;

  const handleResize = () => {
    const sliderWrapper = elements.sliderWrapper;
    sliderWrapperWidth = sliderWrapper.getClientRects()[0].width;
    index = 0;

    [...slides].forEach((slide) => {
      slide.style.width = `${sliderWrapperWidth}px`;
    });

    slider.style.left = `-${sliderWrapperWidth}px`;
  };

  window.addEventListener("resize", handleResize);

  handleResize();

  const firstSlide = slides[0].cloneNode(true);
  const lastSlide = slides[slides.length - 1].cloneNode(true);
  slider.prepend(firstSlide);
  slider.appendChild(lastSlide);

  const sliderNav = elements.sliderNav;
  sliderNav.addEventListener("click", (event) => {
    const direction = event.target.dataset.dir;
    shiftSlide(direction, "");
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

    slider.style.left = `${slider.offsetLeft + posX2}px`;
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
      slider.style.left = `${posInitial + sliderWrapperWidth}px`;
      index--;
    } else if (dir === "left") {
      slider.style.left = `${posInitial - sliderWrapperWidth}px`;
      index++;
    }

    allowShift = false;
  };

  const checkIndex = () => {
    slider.classList.remove("transition");

    if (index === -1) {
      slider.style.left = `-${slidesLength * sliderWrapperWidth}px`;
      index = slidesLength - 1;
    }

    if (index === slidesLength) {
      slider.style.left = `-${sliderWrapperWidth}px`;
      index = 0;
    }

    allowShift = true;
  };

  slider.addEventListener("mousedown", dragStart);
  slider.addEventListener("transitionend", checkIndex);

  setInterval(() => {
    shiftSlide("right");
  }, 5000);
};

const init = () => {
  renderSlides();
  createSlider();
};

export default init;
