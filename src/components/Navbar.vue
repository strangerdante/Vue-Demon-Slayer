<template>
  <nav class="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 lg:px-6 lg:py-4 bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/30">
    <!-- Espacio vacío para balance visual -->
    <div class="w-12 lg:w-12 flex-shrink-0 h-12 lg:h-12"></div>

    <!-- Título principal -->
    <h1 class="flex-1 text-center mx-2 sm:mx-4 lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:flex-none lg:mx-0 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg leading-tight h-12 lg:h-12 flex items-center justify-center">
      <span class="block sm:hidden">Demon Slayer</span>
      <span class="hidden sm:block lg:block">Personajes de Demon Slayer</span>
    </h1>

    <!-- Botón de hamburguesa -->
    <button
      @click="$emit('toggle-sidebar')"
      type="button"
      class="flex items-center justify-center w-12 h-12 lg:w-12 lg:h-12 min-w-[3rem] bg-white/10 border border-white/20 rounded-xl text-white text-lg cursor-pointer transition-all duration-300 ease-in-out backdrop-blur-sm hover:bg-white/20 hover:border-rose-500/50 hover:scale-105 hover:shadow-lg hover:shadow-rose-500/30 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-95 touch-manipulation flex-shrink-0"
      aria-label="Abrir menú de navegación"
    >
      <i class="fas fa-bars" aria-hidden="true"></i>
    </button>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  emits: ['toggle-sidebar']
}
</script>

<style scoped>
/* Mejoras para accesibilidad */
@media (hover: none) and (pointer: coarse) {
  /* Estilos específicos para dispositivos táctiles */
  .hover\:scale-105:hover {
    transform: scale(1.02); /* Reducir el efecto hover en móviles */
  }
}

/* Optimización para pantallas muy pequeñas */
@media (max-width: 320px) {
  .text-lg {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
}
</style> 