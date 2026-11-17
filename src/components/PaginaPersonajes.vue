<template>
  <div class="min-h-screen bg-tinta-950">
    <Navbar />
    <Contenido />
  </div>
</template>

<script>
import Contenido from "./Contenido.vue";
import Navbar from "./Navbar.vue";

export default {
  name: "PaginaPersonajes",
  components: { Contenido, Navbar },
};
</script>
