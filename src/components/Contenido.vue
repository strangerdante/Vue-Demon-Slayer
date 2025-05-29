<template>
  <div 
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 transition-all duration-300 pt-20 overflow-visible"
    :class="{ 'lg:pr-80': sidebarOpen }"
  >
    <div class="mx-auto px-4 py-8 overflow-visible max-w-7xl">

      <!-- Filtros activos -->
      <div v-if="filtroActual !== 'todos'" class="mb-6">
        <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <!-- Versión móvil -->
          <div class="md:hidden flex items-center justify-between">
            <div class="flex items-center">
              <i class="fas fa-filter text-purple-400 mr-2"></i>
              <span class="text-white font-medium text-sm mr-2">Filtro aplicado:</span>
              <span class="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs font-medium capitalize mr-2">
                {{ filtroActual === 'humano' ? 'Solo Humanos' : 
                    filtroActual === 'demonio' ? 'Solo Demonios' : 
                    filtroActual === 'hashira' ? 'Solo Hashira' : 'Todos' }}
              </span>
              <span 
                class="px-2 py-1 text-white rounded-full text-xs font-medium"
                :class="filtroActual === 'humano' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 
                        filtroActual === 'demonio' ? 'bg-gradient-to-r from-red-500 to-pink-500' : 
                        filtroActual === 'hashira' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                        'bg-gradient-to-r from-blue-500 to-cyan-500'"
              >
                {{ personajesFiltrados.length }}
              </span>
            </div>
            <button 
              @click="cambiarFiltro('todos')"
              class="text-red-400 p-2 rounded ml-2"
              title="Quitar filtro"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <!-- Versión desktop -->
          <div class="hidden md:flex items-center justify-between">
            <div class="flex items-center">
              <i class="fas fa-filter text-purple-400 mr-3"></i>
              <span class="text-white font-medium">Filtro aplicado:</span>
              <span class="ml-2 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-medium capitalize">
                {{ filtroActual === 'humano' ? 'Solo Humanos' : 
                    filtroActual === 'demonio' ? 'Solo Demonios' : 
                    filtroActual === 'hashira' ? 'Solo Hashira' : 'Todos' }}
              </span>
              <span class="ml-3 text-gray-300 text-sm">
                ({{ personajesFiltrados.length }} {{ personajesFiltrados.length === 1 ? 'personaje' : 'personajes' }})
              </span>
            </div>
            <button 
              @click="cambiarFiltro('todos')"
              class="text-red-400 px-2 py-1 rounded"
              title="Quitar filtro"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Grid de personajes -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-14 mb-12 mt-16 overflow-visible">
        <div 
          v-for="personaje in personajesPaginados" 
          :key="personaje.id"
          class="backdrop-blur-xl rounded-2xl overflow-visible pt-8"
          :style="{ 
            background: `linear-gradient(135deg, ${personaje.color}40, ${personaje.color}25, rgba(30, 41, 59, 0.6))`,
            border: `2px solid ${personaje.color}80`,
            boxShadow: `0 8px 32px ${personaje.color}30`
          }"
        >
          <!-- Imagen -->
          <div class="relative overflow-hidden -mt-20 mb-4 rounded-t-2xl">
            <img 
              :src="personaje.img" 
              :alt="personaje.name"
              class="w-full h-72 object-cover object-top shadow-2xl mx-auto"
              @error="onImageError"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
          </div>

          <!-- Contenido -->
          <div class="p-6">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-xl font-bold text-white">
                {{ personaje.name }}
              </h3>
              <!-- Badge de raza -->
              <span 
                class="px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg"
                :style="{ 
                  background: `linear-gradient(45deg, ${personaje.color}, ${personaje.color}dd)`,
                  boxShadow: `0 4px 12px ${personaje.color}40`
                }"
              >
                {{ personaje.race }}
              </span>
            </div>
            
            <div class="flex items-center mb-3 space-x-4">
              <span class="text-gray-300 text-sm">
                <i class="fas fa-birthday-cake mr-1 text-purple-400"></i>
                {{ personaje.age ? personaje.age + ' años' : 'Edad desconocida' }}
              </span>
              <span class="text-gray-300 text-sm">
                <i :class="personaje.gender === 'Masculino' ? 'fas fa-mars' : 'fas fa-venus'" 
                   class="mr-1 text-purple-400"></i>
                {{ personaje.gender }}
              </span>
            </div>

            <p class="text-gray-300 text-sm mb-4 line-clamp-3">
              {{ personaje.description }}
            </p>

            <!-- Quote -->
            <div v-if="personaje.quote" class="bg-white/5 border-l-4 border-purple-400 p-3 rounded-r-lg">
              <p class="text-gray-200 text-sm italic">
                "{{ personaje.quote }}"
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Paginación -->
      <div v-if="totalPaginas > 1" class="flex justify-center items-center space-x-2">
        <button
          v-for="pagina in paginasVisibles"
          :key="pagina"
          @click="cambiarPagina(pagina)"
          class="w-10 h-10 rounded-xl font-medium"
          :class="pagina === paginaActual 
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
            : 'bg-white/10 text-gray-300'"
        >
          {{ pagina }}
        </button>
      </div>

      <!-- Mensaje cuando no hay personajes -->
      <div v-if="personajesFiltrados.length === 0" class="text-center py-12">
        <div class="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <i class="fas fa-search text-white text-4xl"></i>
        </div>
        <h3 class="text-2xl font-bold text-white mb-2">No se encontraron personajes</h3>
        <p class="text-gray-300">Intenta con un filtro diferente</p>
      </div>
    </div>
  </div>
</template>

<script>
import personajesData from '../../personajes_demon_slayer.json';

export default {
  name: 'Contenido',
  props: {
    sidebarOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      personajes: [],
      paginaActual: 1,
      personajesPorPagina: 6,
      filtroActual: 'todos'
    };
  },
  computed: {
    totalPersonajes() {
      return this.personajes.length;
    },
    humanos() {
      return this.personajes.filter(p => p.race === 'Humano').length;
    },
    demonios() {
      return this.personajes.filter(p => p.race === 'Demonio').length;
    },
    hashira() {
      return this.personajes.filter(p => p.affiliation_id === 2).length;
    },
    personajesFiltrados() {
      if (this.filtroActual === 'todos') {
        return this.personajes;
      }
      return this.personajes.filter(personaje => {
        if (this.filtroActual === 'humano') {
          return personaje.race === 'Humano';
        } else if (this.filtroActual === 'demonio') {
          return personaje.race === 'Demonio';
        } else if (this.filtroActual === 'hashira') {
          return personaje.affiliation_id === 2;
        }
        return true;
      });
    },
    totalPaginas() {
      return Math.ceil(this.personajesFiltrados.length / this.personajesPorPagina);
    },
    personajesPaginados() {
      const inicio = (this.paginaActual - 1) * this.personajesPorPagina;
      const fin = inicio + this.personajesPorPagina;
      return this.personajesFiltrados.slice(inicio, fin);
    },
    paginasVisibles() {
      const total = this.totalPaginas;
      const actual = this.paginaActual;
      const visibles = [];
      
      if (total <= 7) {
        for (let i = 1; i <= total; i++) {
          visibles.push(i);
        }
      } else {
        if (actual <= 4) {
          for (let i = 1; i <= 5; i++) {
            visibles.push(i);
          }
          visibles.push('...', total);
        } else if (actual >= total - 3) {
          visibles.push(1, '...');
          for (let i = total - 4; i <= total; i++) {
            visibles.push(i);
          }
        } else {
          visibles.push(1, '...');
          for (let i = actual - 1; i <= actual + 1; i++) {
            visibles.push(i);
          }
          visibles.push('...', total);
        }
      }
      
      return visibles.filter(p => p !== '...');
    }
  },
  mounted() {
    this.cargarPersonajes();
    this.escucharFiltros();
  },
  beforeUnmount() {
    // Limpiar el event listener cuando el componente se desmonte
    window.removeEventListener('filtro-personajes', this.manejarFiltro);
  },
  methods: {
    cargarPersonajes() {
      this.personajes = personajesData.personajes;
    },
    cambiarPagina(pagina) {
      if (pagina >= 1 && pagina <= this.totalPaginas) {
        this.paginaActual = pagina;
        // Scroll suave al inicio
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    cambiarFiltro(filtro) {
      this.filtroActual = filtro;
      this.paginaActual = 1; // Resetear a la primera página
      
      // Emitir evento para sincronizar con el sidebar
      const evento = new CustomEvent('filtro-cambiado', {
        detail: { filtro: filtro }
      });
      window.dispatchEvent(evento);
    },
    manejarFiltro(event) {
      this.cambiarFiltro(event.detail.filtro);
    },
    escucharFiltros() {
      // Escuchar eventos del sidebar para cambiar filtros
      window.addEventListener('filtro-personajes', this.manejarFiltro);
    },
    onImageError(event) {
      // Imagen por defecto si la imagen no carga
      event.target.src = 'https://via.placeholder.com/400x600/6366f1/ffffff?text=Sin+Imagen';
    }
  },
  watch: {
    filtroActual() {
      // Resetear paginación cuando cambie el filtro
      this.paginaActual = 1;
    }
  }
};
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Animaciones personalizadas */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.6s ease-out;
}
</style>
