<template>
  <div class="container">
    <swiper :pagination="true" :modules="modules" class="mySwiper">
      <swiper-slide
        ><img src="../assets/slider-1.png" alt="Slide 1"
      /></swiper-slide>
      <swiper-slide
        ><img src="../assets/slider-2.png" alt="Slide 2"
      /></swiper-slide>
      <swiper-slide
        ><img src="../assets/slider-3.png" alt="Slide 3"
      /></swiper-slide>
    </swiper>
    <div class="text-center text-white">
      <h1 class="text-7xl lg:text-8xl font-bold">
        Demon<span class="text-morado-electrico">Slayer.</span>
      </h1>
      <p class="text-md lg:text-xl mt-2">
        Explora a fondo el universo de Demon Slayer:<br />
        accede a información detallada de personajes, clanes y tecnicas.<br />
        ¡Sumérgete en este mundo épico!
      </p>
    </div>
  </div>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

export default {
  name: "Carousel",
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Pagination],
    };
  },
};
</script>

<style>
#app {
  height: 100%;
}
html,
body {
  position: relative;
  height: 100%;
}

body {
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #3e1149;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;

    } */

.swiper-pagination-bullet {
  background-color: white;
}
</style>
