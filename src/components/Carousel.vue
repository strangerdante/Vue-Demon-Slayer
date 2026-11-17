<template>
  <div class="ichimatsu ichimatsu-gris relative flex h-full min-h-screen flex-col items-center justify-center px-12 py-16">
    <swiper
      :modules="modules"
      effect="fade"
      :fade-effect="{ crossFade: true }"
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
      :pagination="{ clickable: true }"
      :loop="true"
      class="carrusel w-full max-w-md"
    >
      <swiper-slide v-for="slide in slides" :key="slide.src">
        <img
          :src="slide.src"
          :alt="slide.alt"
          class="mx-auto max-h-[52vh] w-auto object-contain"
        />
      </swiper-slide>
    </swiper>

    <div class="mt-10 max-w-md text-center">
      <p class="eyebrow mb-3">Archivo de personajes</p>
      <h2 class="text-5xl font-extrabold leading-none text-washi-50 xl:text-6xl">
        Demon <span class="text-fuji-400">Slayer</span>
      </h2>
      <p class="mt-4 text-base leading-relaxed text-washi-400">
        Conoce a los cazadores, los Hashira y los demonios del universo de
        Kimetsu no Yaiba: su historia, su edad y sus frases más memorables.
      </p>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, EffectFade, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import slide1 from "../assets/slider-1.png";
import slide2 from "../assets/slider-2.png";
import slide3 from "../assets/slider-3.png";

export default {
  name: "Carousel",
  components: { Swiper, SwiperSlide },
  setup() {
    return {
      modules: [Autoplay, EffectFade, Pagination],
      slides: [
        { src: slide1, alt: "Ilustración de personaje de Demon Slayer 1" },
        { src: slide2, alt: "Ilustración de personaje de Demon Slayer 2" },
        { src: slide3, alt: "Ilustración de personaje de Demon Slayer 3" },
      ],
    };
  },
};
</script>

<style scoped>
.carrusel {
  padding-bottom: 2.5rem;
}
.carrusel :deep(.swiper-slide) {
  display: flex;
  align-items: center;
  justify-content: center;
}
.carrusel :deep(.swiper-pagination-bullet) {
  width: 22px;
  height: 3px;
  border-radius: 2px;
  background: #a59e93;
  opacity: 0.4;
  transition: opacity 0.2s, background 0.2s;
}
.carrusel :deep(.swiper-pagination-bullet-active) {
  background: #b98ce0;
  opacity: 1;
}
</style>
