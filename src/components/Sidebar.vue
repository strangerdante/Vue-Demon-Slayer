<template>
  <div class="min-h-screen bg-tinta-950">
    <Navbar :abierto="sidebarOpen" @toggle-sidebar="toggleSidebar" />

    <!-- Overlay para cerrar el panel en móvil -->
    <Transition name="fade">
      <div
        v-if="sidebarOpen"
        class="fixed inset-0 z-40 bg-tinta-950/70 backdrop-blur-sm lg:hidden"
        @click="sidebarOpen = false"
      ></div>
    </Transition>

    <aside
      id="default-sidebar"
      class="fixed right-0 top-0 z-50 h-screen w-[85%] max-w-xs border-l border-tinta-700 bg-tinta-900 shadow-2xl shadow-black/50 transition-transform duration-300 ease-out lg:w-80 lg:max-w-none"
      :class="sidebarOpen ? 'translate-x-0' : 'translate-x-full'"
      :aria-hidden="!sidebarOpen"
      :inert="!sidebarOpen || undefined"
    >
      <div class="flex h-full flex-col overflow-y-auto px-5 py-4">
        <div class="mb-6 flex h-12 items-center justify-between">
          <h2 class="text-xl font-bold text-washi-50">Filtros</h2>
          <button type="button" class="btn-icon -mr-2" aria-label="Cerrar filtros" @click="sidebarOpen = false">
            <i class="fas fa-xmark text-lg" aria-hidden="true"></i>
          </button>
        </div>

        <nav aria-label="Filtrar personajes">
          <p class="eyebrow mb-3">Mostrar</p>
          <ul class="space-y-1">
            <li v-for="filtro in filtros" :key="filtro.id">
              <button
                type="button"
                class="group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors duration-150"
                :class="
                  filtroActivo === filtro.id
                    ? 'bg-tinta-700 text-washi-50'
                    : 'text-washi-200 hover:bg-tinta-800 hover:text-washi-50'
                "
                :aria-pressed="filtroActivo === filtro.id"
                @click="aplicarFiltro(filtro.id)"
              >
                <span
                  v-if="filtroActivo === filtro.id"
                  class="absolute inset-y-2 left-0 w-0.5 rounded-full"
                  :class="filtro.punto"
                  aria-hidden="true"
                ></span>
                <span class="h-2 w-2 shrink-0 rounded-full" :class="filtro.punto" aria-hidden="true"></span>
                <span class="flex-1 font-medium">{{ filtro.etiquetaLarga }}</span>
                <span class="text-sm tabular-nums text-washi-400">{{ conteos[filtro.id] }}</span>
              </button>
            </li>
          </ul>
        </nav>

        <div class="mt-auto border-t border-tinta-700 pt-4">
          <div class="mb-3 flex items-center gap-3 px-1">
            <span
              class="flex h-9 w-9 items-center justify-center rounded-full bg-fuji-400/15 font-semibold uppercase text-fuji-300"
              aria-hidden="true"
            >
              {{ usuario.charAt(0) }}
            </span>
            <div class="min-w-0">
              <p class="text-xs text-washi-400">Sesión iniciada como</p>
              <p class="truncate font-medium text-washi-50">{{ usuario }}</p>
            </div>
          </div>
          <button type="button" class="btn-secondary w-full" @click="salir">
            <i class="fas fa-arrow-right-from-bracket" aria-hidden="true"></i>
            Cerrar sesión
          </button>
        </div>
      </div>
    </aside>

    <Contenido :sidebarOpen="sidebarOpen" />
  </div>
</template>

<script>
import Contenido from "./Contenido.vue";
import Navbar from "./Navbar.vue";
import { FILTROS, conteoPorFiltro } from "../personajes";
import { cerrarSesion, obtenerSesion } from "../auth";

export default {
  name: "Sidebar",
  components: { Contenido, Navbar },
  data() {
    return {
      sidebarOpen: false,
      filtroActivo: "todos",
      usuario: obtenerSesion()?.usuario || "Invitado",
      filtros: FILTROS,
      conteos: conteoPorFiltro,
    };
  },
  mounted() {
    document.addEventListener("click", this.handleOutsideClick);
    document.addEventListener("keydown", this.alPresionarTecla);
    window.addEventListener("filtro-cambiado", this.sincronizarFiltro);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleOutsideClick);
    document.removeEventListener("keydown", this.alPresionarTecla);
    window.removeEventListener("filtro-cambiado", this.sincronizarFiltro);
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    handleOutsideClick(event) {
      if (!this.sidebarOpen) return;
      const sidebar = document.getElementById("default-sidebar");
      const toggle = document.getElementById("sidebar-toggle");
      if (!sidebar?.contains(event.target) && !toggle?.contains(event.target)) {
        this.sidebarOpen = false;
      }
    },
    alPresionarTecla(e) {
      if (e.key === "Escape") this.sidebarOpen = false;
    },
    aplicarFiltro(filtro) {
      this.filtroActivo = filtro;
      window.dispatchEvent(new CustomEvent("filtro-personajes", { detail: { filtro } }));
      this.sidebarOpen = false;
    },
    sincronizarFiltro(event) {
      this.filtroActivo = event.detail.filtro;
    },
    salir() {
      cerrarSesion();
      this.$router.push({ name: "login" });
    },
  },
};
</script>
