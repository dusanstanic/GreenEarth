import { elements } from "./searchBase";
import slide1Image from "../../image/slide1.jpg";
import slide2Image from "../../image/slide2.jpg";
import slide3Image from "../../image/slide3.jpg";

var slidesJSON = [
  {
    imageUrl: slide1Image,
    title: "Enjoy out hot summer deals",
    price: "69.99",
  },
  {
    imageUrl: slide2Image,
    title: "Enjoy out winter deals",
    price: "89.99",
  },
  {
    imageUrl: slide3Image,
    title: "Enjoy out fall deals",
    price: "49.99",
  },
];

export const renderSlide = (slide) => {
  const markup = `
    <div class="slider__slide">
        <img class="slider__img" src="${slide.imageUrl}" />
        <div class="slider__more">
            <h1 class="slider__heading heading-1">
            ${slide.title}
            </h1>
            <div
                class="slider__info"
                style="display: flex; align-items: center"
            >
                from &pound;  ${slide.price}
                <div style="display: inline-block">
                    <div style="font-size: 0.9rem">.50</div>
                </div>
            </div>
            <button class="slider__btn">Book now !</button>
        </div>
    </div>`;

  elements.slider.insertAdjacentHTML("beforeend", markup);
};

export const renderSlides = () => {
  slidesJSON.forEach(renderSlide);
};
