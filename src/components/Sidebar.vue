<template>
  <div
    class="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
  >
    <!-- Botón toggle del sidebar -->
    <button
      @click="toggleSidebar"
      type="button"
      class="fixed top-6 left-6 z-50 inline-flex items-center justify-center w-12 h-12 text-white bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400/50 transition-all duration-300 shadow-lg"
      :class="{ 'opacity-0 pointer-events-none': sidebarOpen }"
    >
      <span class="sr-only">Open sidebar</span>
      <i class="fas fa-bars text-base"></i>
    </button>

    <!-- Overlay para cerrar sidebar en móvil -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
      @click="toggleSidebar"
    ></div>

    <!-- Sidebar -->
    <aside
      id="default-sidebar"
      class="fixed top-0 left-0 z-40 w-2/3 lg:w-80 h-screen transition-all duration-300 ease-in-out transform"
      :class="{
        '-translate-x-full': !sidebarOpen,
        'translate-x-0': sidebarOpen,
      }"
    >
      <div
        class="h-full bg-gradient-to-b from-slate-800/95 to-purple-900/95 backdrop-blur-xl border-r border-white/10 shadow-2xl"
      >
        <div class="h-full px-4 sm:px-6 py-6 overflow-y-auto custom-scrollbar">
          <!-- Header del sidebar -->
          <div class="mb-8 flex items-center justify-between">
            <div class="flex items-center">
              <div
                class="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg"
              >
                <i class="fas fa-play text-white text-sm"></i>
              </div>
              <h1 class="text-white font-bold text-xl">
                anime<span
                  class="text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text"
                  >admin</span
                >
              </h1>
            </div>
            <button
              @click="toggleSidebar"
              type="button"
              class="inline-flex items-center justify-center w-8 h-8 text-white/70 hover:text-white hover:bg-white/10 focus:outline-none rounded-lg transition-all duration-200"
            >
              <i class="fas fa-times text-base"></i>
              <span class="sr-only">Cerrar sidebar</span>
            </button>
          </div>

          <!-- Navegación -->
          <nav class="space-y-6">
            <!-- Sección Categorías -->
            <div>
              <h2
                class="text-white/70 font-semibold text-sm uppercase tracking-wider mb-4 flex items-center"
              >
                <i class="fas fa-layer-group mr-2 text-pink-400"></i>
                Categorías
              </h2>

              <ul class="space-y-2">
                <li>
                  <a
                    href="#"
                    class="group flex items-center p-3 text-white rounded-xl hover:bg-gradient-to-r hover:from-pink-500/20 hover:to-purple-600/20 border border-transparent hover:border-white/10 transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <div
                      class="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200"
                    >
                      <i class="fas fa-th-large text-white text-sm"></i>
                    </div>
                    <span class="flex-1 font-medium">Ver todas</span>
                    <span
                      class="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-lg"
                    >
                      3
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="group flex items-center p-3 text-white rounded-xl hover:bg-gradient-to-r hover:from-pink-500/20 hover:to-purple-600/20 border border-transparent hover:border-white/10 transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <div
                      class="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200"
                    >
                      <i class="fas fa-plus text-white text-sm"></i>
                    </div>
                    <span class="flex-1 font-medium">Crear</span>
                  </a>
                </li>
              </ul>
            </div>

            <!-- Sección Usuario -->
            <div>
              <h2
                class="text-white/70 font-semibold text-sm uppercase tracking-wider mb-4 flex items-center"
              >
                <i class="fas fa-user mr-2 text-purple-400"></i>
                Usuario
              </h2>

              <ul class="space-y-2">
                <li>
                  <router-link
                    to="/"
                    class="group flex items-center p-3 text-white rounded-xl hover:bg-gradient-to-r hover:from-red-500/20 hover:to-pink-600/20 border border-transparent hover:border-white/10 transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <div
                      class="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200"
                    >
                      <i class="fas fa-sign-out-alt text-white text-sm"></i>
                    </div>
                    <span class="flex-1 font-medium">Cerrar sesión</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </aside>

    <!-- Contenido principal -->
    <Contenido :sidebarOpen="sidebarOpen" />
  </div>
</template>

<script>
import Contenido from './Contenido.vue';

export default {
  name: "Sidebar",
  components: {
    Contenido
  },
  data() {
    return {
      sidebarOpen: false,
    };
  },
  mounted() {
    // Agregar event listener para detectar clics fuera del sidebar
    document.addEventListener("click", this.handleOutsideClick);
  },
  beforeUnmount() {
    // Remover event listener cuando el componente se desmonta
    document.removeEventListener("click", this.handleOutsideClick);
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    handleOutsideClick(event) {
      // Verificar si el sidebar está abierto y si el clic fue fuera del sidebar
      const sidebar = document.getElementById("default-sidebar");
      const toggleButton = document.querySelector('button[type="button"]');

      if (
        this.sidebarOpen &&
        sidebar &&
        !sidebar.contains(event.target) &&
        toggleButton &&
        !toggleButton.contains(event.target)
      ) {
        this.sidebarOpen = false;
      }
    },
  },
};
</script>

<style scoped>
/* Custom scrollbar para el sidebar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(236, 72, 153, 0.5);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(236, 72, 153, 0.7);
}

/* Animaciones personalizadas */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slideIn {
  animation: slideIn 0.3s ease-out;
}
</style>
