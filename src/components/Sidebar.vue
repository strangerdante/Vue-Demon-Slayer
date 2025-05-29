<template>
  <div class="h-screen">
    <!-- Navbar -->
    <Navbar @toggle-sidebar="toggleSidebar" />

    <!-- Overlay para cerrar sidebar en móvil -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
      @click="toggleSidebar"
    ></div>

    <!-- Sidebar -->
    <aside
      id="default-sidebar"
      class="fixed top-0 right-0 z-50 w-2/3 lg:w-80 h-screen transition-all duration-300 ease-in-out transform"
      :class="{
        'translate-x-full': !sidebarOpen,
        'translate-x-0': sidebarOpen,
      }"
    >
      <div
        class="h-full bg-gradient-to-b from-slate-800/95 to-purple-900/95 backdrop-blur-xl border-l border-white/10 shadow-2xl"
      >
        <div class="h-full px-4 sm:px-6 py-3 lg:py-4 overflow-y-auto custom-scrollbar">
          <!-- Header del sidebar -->
          <div class="mb-8 flex items-center justify-between h-12 lg:h-12">
            <div class="flex items-center">
              <h1 class="text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text font-bold text-lg sm:text-xl md:text-2xl lg:text-xl leading-tight">
                Administración
              </h1>
            </div>
            <button
              @click="toggleSidebar"
              type="button"
              class="flex items-center justify-center w-12 h-12 lg:w-12 lg:h-12 min-w-[3rem] text-white/70 hover:text-white hover:bg-white/10 focus:outline-none rounded-xl transition-all duration-300 ease-in-out backdrop-blur-sm hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-rose-500/50 focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-95 touch-manipulation flex-shrink-0"
            >
              <i class="fas fa-times text-lg" aria-hidden="true"></i>
              <span class="sr-only">Cerrar sidebar</span>
            </button>
          </div>

          <!-- Navegación -->
          <nav class="space-y-6">
            <!-- Sección Filtros -->
            <div>
              <h2
                class="text-white/70 font-semibold text-sm uppercase tracking-wider mb-4 flex items-center"
              >
                <i class="fas fa-filter mr-2 text-purple-400"></i>
                Filtros
              </h2>

              <ul class="space-y-2">
                <li>
                  <button
                    @click="aplicarFiltro('todos')"
                    class="group w-full flex items-center p-3 text-white rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
                    :class="filtroActivo === 'todos' 
                      ? 'bg-gradient-to-r from-purple-500/30 to-pink-600/30 border border-purple-400/50' 
                      : 'hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-600/20 border border-transparent hover:border-white/10'"
                  >
                    <div
                      class="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200"
                    >
                      <i class="fas fa-th-large text-white text-sm"></i>
                    </div>
                    <span class="flex-1 font-medium text-left">Todos los personajes</span>
                    <span
                      class="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-lg"
                    >
                      {{ totalPersonajes }}
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    @click="aplicarFiltro('humano')"
                    class="group w-full flex items-center p-3 text-white rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
                    :class="filtroActivo === 'humano' 
                      ? 'bg-gradient-to-r from-green-500/30 to-emerald-600/30 border border-green-400/50' 
                      : 'hover:bg-gradient-to-r hover:from-green-500/20 hover:to-emerald-600/20 border border-transparent hover:border-white/10'"
                  >
                    <div
                      class="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200"
                    >
                      <i class="fas fa-heart text-white text-sm"></i>
                    </div>
                    <span class="flex-1 font-medium text-left">Humanos</span>
                    <span
                      class="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-lg"
                    >
                      {{ cantidadHumanos }}
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    @click="aplicarFiltro('demonio')"
                    class="group w-full flex items-center p-3 text-white rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
                    :class="filtroActivo === 'demonio' 
                      ? 'bg-gradient-to-r from-red-500/30 to-pink-600/30 border border-red-400/50' 
                      : 'hover:bg-gradient-to-r hover:from-red-500/20 hover:to-pink-600/20 border border-transparent hover:border-white/10'"
                  >
                    <div
                      class="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200"
                    >
                      <i class="fas fa-fire text-white text-sm"></i>
                    </div>
                    <span class="flex-1 font-medium text-left">Demonios</span>
                    <span
                      class="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-lg"
                    >
                      {{ cantidadDemonios }}
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    @click="aplicarFiltro('hashira')"
                    class="group w-full flex items-center p-3 text-white rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
                    :class="filtroActivo === 'hashira' 
                      ? 'bg-gradient-to-r from-yellow-500/30 to-orange-600/30 border border-yellow-400/50' 
                      : 'hover:bg-gradient-to-r hover:from-yellow-500/20 hover:to-orange-600/20 border border-transparent hover:border-white/10'"
                  >
                    <div
                      class="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200"
                    >
                      <i class="fas fa-crown text-white text-sm"></i>
                    </div>
                    <span class="flex-1 font-medium text-left">Hashira (Pilares)</span>
                    <span
                      class="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full shadow-lg"
                    >
                      {{ cantidadHashira }}
                    </span>
                  </button>
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
import Navbar from './Navbar.vue';
import personajesData from '../../personajes_demon_slayer.json';

export default {
  name: "Sidebar",
  components: {
    Contenido,
    Navbar
  },
  data() {
    return {
      sidebarOpen: false,
      filtroActivo: 'todos',
      totalPersonajes: 0,
      cantidadHumanos: 0,
      cantidadDemonios: 0,
      cantidadHashira: 0,
    };
  },
  mounted() {
    // Agregar event listener para detectar clics fuera del sidebar
    document.addEventListener("click", this.handleOutsideClick);
    // Cargar estadísticas de personajes
    this.cargarEstadisticas();
    // Escuchar cambios de filtro desde Contenido
    window.addEventListener('filtro-cambiado', this.sincronizarFiltro);
  },
  beforeUnmount() {
    // Remover event listener cuando el componente se desmonta
    document.removeEventListener("click", this.handleOutsideClick);
    window.removeEventListener('filtro-cambiado', this.sincronizarFiltro);
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
    aplicarFiltro(filtro) {
      this.filtroActivo = filtro;
      // Enviar evento personalizado al componente Contenido
      const evento = new CustomEvent('filtro-personajes', {
        detail: { filtro: filtro }
      });
      window.dispatchEvent(evento);
      // Cerrar el sidebar después de aplicar el filtro
      this.sidebarOpen = false;
    },
    sincronizarFiltro(event) {
      // Sincronizar el estado del filtro activo cuando cambie desde Contenido
      this.filtroActivo = event.detail.filtro;
    },
    cargarEstadisticas() {
      // Cargar estadísticas desde el JSON
      const personajes = personajesData.personajes;
      this.totalPersonajes = personajes.length;
      this.cantidadHumanos = personajes.filter(p => p.race === 'Humano').length;
      this.cantidadDemonios = personajes.filter(p => p.race === 'Demonio').length;
      this.cantidadHashira = personajes.filter(p => p.affiliation_id === 2).length;
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
