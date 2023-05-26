import { define, html } from "../../src/index.js"

const store = {
  activeSlide: 0,
  next: (state) => ({
    ...state,
    activeSlide:
      state.activeSlide === state.slides.length - 1 ? 0 : state.activeSlide + 1,
  }),
  previous: (state) => ({
    ...state,
    activeSlide:
      state.activeSlide === 0 ? state.slides.length - 1 : state.activeSlide - 1,
  }),
}

const template = ({ activeSlide }, dispatch) => {
  return html`
    <template shadowrootmode="open">
      <style></style>
      <section class="carousel" aria-roledescription="carousel">
        <div class="controls">
          <button
            class="previous"
            aria-controls="carouselItems"
            aria-label="Previous Slide"
            onclick="${() => dispatch("previous")}"
          >
            <svg
              width="42"
              height="34"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                class="background"
                x="2"
                y="2"
                rx="5"
                ry="5"
                width="38"
                height="24"
              ></rect>
              <rect
                class="border"
                x="4"
                y="4"
                rx="5"
                ry="5"
                width="34"
                height="20"
              ></rect>
              <polygon
                points="9 14 21 8 21 11 33 11 33 17 21 17 21 20"
              ></polygon>
            </svg>
          </button>
          <button
            class="next"
            aria-controls="carouselItems"
            aria-label="Next Slide"
            onclick="${() => dispatch("next")}"
          >
            <svg
              width="42"
              height="34"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                class="background"
                x="2"
                y="2"
                rx="5"
                ry="5"
                width="38"
                height="24"
              ></rect>
              <rect
                class="border"
                x="4"
                y="4"
                rx="5"
                ry="5"
                width="34"
                height="20"
              ></rect>
              <polygon
                points="9 11 21 11 21 8 33 14 21 20 21 17 9 17"
              ></polygon>
            </svg>
          </button>
        </div>
        <div id="carouselItems" class="carousel-items" aria-live="off">
          <slot></slot>
        </div>
      </section>
    </template>
  `
}

const styles = css`
  .carousel {
    width: 100%;
    position: relative;
    list-style-type: none;
  }
  .carousel-item {
    width: 100%;
    display: none;
  }
  .carousel-item.active {
    display: block;
  }
  .controls {
    position: relative;
    top: 0;
    left: 0;
  }
  .controls svg .background {
    stroke: black;
    fill: black;
    stroke-width: 1px;
    opacity: 0.6;
  }

  .controls svg .border {
    fill: transparent;
    stroke: transparent;
    stroke-width: 2px;
  }
`

define("c8-carousel", template, store, styles)
