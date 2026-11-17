<template>
  <div class="grid min-h-screen lg:grid-cols-2">
    <Login />
    <aside class="hidden lg:block">
      <Carousel />
    </aside>
  </div>
</template>

<script>
import Carousel from "./Carousel.vue";
import Login from "./Login.vue";

export default {
  name: "InicioSesion",
  components: { Carousel, Login },
};
</script>
