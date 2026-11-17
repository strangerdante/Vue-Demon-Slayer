<template>
  <nav
    class="fixed inset-x-0 top-0 z-30 border-b border-tinta-700 bg-tinta-950/85 backdrop-blur-md"
  >
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
      <router-link
        :to="{ name: 'personajes' }"
        class="flex items-center gap-2.5 rounded-lg"
      >
        <img src="../assets/logo.png" alt="" class="h-8 w-8" />
        <span class="font-display text-lg font-bold text-washi-50">Demon Slayer</span>
        <span class="hidden h-5 w-px bg-tinta-600 sm:block" aria-hidden="true"></span>
        <span class="hidden text-sm font-medium text-washi-400 sm:block">
          Archivo de personajes
        </span>
      </router-link>

      <button
        id="sidebar-toggle"
        type="button"
        class="btn-secondary"
        :aria-expanded="abierto"
        aria-controls="default-sidebar"
        @click="$emit('toggle-sidebar')"
      >
        <i class="fas fa-sliders" aria-hidden="true"></i>
        <span class="hidden sm:inline">Filtros</span>
        <span class="sr-only sm:hidden">Abrir filtros</span>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    abierto: { type: Boolean, default: false },
  },
  emits: ["toggle-sidebar"],
};
</script>
