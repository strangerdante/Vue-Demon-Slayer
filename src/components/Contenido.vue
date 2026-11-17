<template>
  <main class="min-h-screen pt-16">
    <div class="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6">
      <!-- Encabezado -->
      <header class="mb-8">
        <p class="eyebrow mb-2">Kimetsu no Yaiba</p>
        <h1 class="text-4xl font-extrabold text-washi-50 sm:text-5xl">Personajes</h1>
        <p class="mt-3 text-washi-400" aria-live="polite">
          {{ personajesFiltrados.length }}
          {{ personajesFiltrados.length === 1 ? "personaje" : "personajes" }}
          <template v-if="busquedaNormalizada"> para “{{ busqueda.trim() }}”</template>
        </p>
      </header>

      <!-- Barra de herramientas: búsqueda + filtros -->
      <div
        class="mb-10 flex flex-col gap-4 border-b border-tinta-700 pb-8 md:flex-row md:items-center md:justify-between"
      >
        <div class="relative w-full md:max-w-xs">
          <label for="buscar-personaje" class="sr-only">Buscar personaje</label>
          <i
            class="fas fa-magnifying-glass pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-washi-400"
            aria-hidden="true"
          ></i>
          <input
            id="buscar-personaje"
            ref="buscador"
            v-model="busqueda"
            type="search"
            placeholder="Buscar por nombre…"
            autocomplete="off"
            class="field-input pl-10 pr-16"
            @keydown.esc="busqueda = ''"
          />
          <button
            v-if="busqueda"
            type="button"
            class="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-washi-400 hover:bg-tinta-700 hover:text-washi-50"
            aria-label="Limpiar búsqueda"
            @click="limpiarBusqueda"
          >
            <i class="fas fa-xmark" aria-hidden="true"></i>
          </button>
          <kbd
            v-else
            class="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-tinta-600 px-1.5 text-xs text-washi-400 md:block"
          >/</kbd>
        </div>

        <div
          class="-mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0"
          role="group"
          aria-label="Filtrar por tipo"
        >
          <button
            v-for="filtro in filtros"
            :key="filtro.id"
            type="button"
            class="inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors duration-150"
            :class="
              filtroActual === filtro.id
                ? 'border-washi-200/60 bg-washi-50 text-tinta-950'
                : 'border-tinta-600 bg-tinta-800 text-washi-200 hover:border-washi-400/40 hover:text-washi-50'
            "
            :aria-pressed="filtroActual === filtro.id"
            @click="cambiarFiltro(filtro.id)"
          >
            <i v-if="filtro.icono" :class="filtro.icono" class="text-xs" aria-hidden="true"></i>
            <span v-else class="h-2 w-2 rounded-full" :class="filtro.punto" aria-hidden="true"></span>
            {{ filtro.etiqueta }}
            <span
              class="tabular-nums"
              :class="filtroActual === filtro.id ? 'text-tinta-700' : 'text-washi-400'"
            >{{ conteos[filtro.id] }}</span>
          </button>
        </div>
      </div>

      <!-- Grid de personajes -->
      <div
        v-if="personajesPaginados.length"
        :key="claveGrid"
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <article
          v-for="(personaje, i) in personajesPaginados"
          :key="personaje.id"
          class="tarjeta surface group relative flex flex-col overflow-hidden transition duration-200 focus-within:ring-2 focus-within:ring-fuji-400 focus-within:ring-offset-2 focus-within:ring-offset-tinta-950 hover:-translate-y-0.5 hover:border-tinta-600 hover:shadow-xl hover:shadow-black/40"
          :style="{ '--retraso': `${i * 40}ms` }"
        >
          <div
            class="relative h-72 overflow-hidden bg-tinta-800"
            :style="{ backgroundImage: `radial-gradient(circle at 50% 35%, ${personaje.color}33, transparent 70%)` }"
          >
            <img
              :src="personaje.img"
              alt=""
              loading="lazy"
              class="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              @error="onImageError"
            />
            <div class="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-tinta-900 to-transparent"></div>
            <span
              class="absolute inset-x-0 top-0 h-0.5"
              :style="{ backgroundColor: personaje.color }"
              aria-hidden="true"
            ></span>
            <!-- Favorito: por encima del enlace estirado (z-10) -->
            <button
              type="button"
              class="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-tinta-950/60 backdrop-blur transition duration-150 hover:scale-110 hover:bg-tinta-950/80"
              :class="esFavorito(personaje.id) ? 'text-beni-400' : 'text-washi-200 hover:text-washi-50'"
              :aria-pressed="esFavorito(personaje.id)"
              :aria-label="`${esFavorito(personaje.id) ? 'Quitar de' : 'Añadir a'} favoritos: ${personaje.name}`"
              @click="alternarFavorito(personaje.id)"
            >
              <i :class="esFavorito(personaje.id) ? 'fas fa-heart' : 'fa-regular fa-heart'" aria-hidden="true"></i>
            </button>
          </div>

          <div class="flex flex-1 flex-col p-5">
            <div class="flex items-start justify-between gap-3">
              <h2 class="text-xl font-bold leading-snug text-washi-50">
                <!-- Enlace "estirado": toda la tarjeta es clicable -->
                <router-link
                  :to="{ name: 'personajes', params: { id: personaje.id }, query: $route.query }"
                  class="rounded outline-none after:absolute after:inset-0 after:content-[''] focus-visible:ring-0"
                >
                  {{ personaje.name }}
                </router-link>
              </h2>
              <span
                class="mt-0.5 inline-flex shrink-0 items-center gap-1.5 rounded-full border border-tinta-600 px-2.5 py-0.5 text-xs font-medium text-washi-200"
              >
                <span
                  class="h-1.5 w-1.5 rounded-full"
                  :class="personaje.race === 'Demonio' ? 'bg-beni-400' : 'bg-jade-400'"
                  aria-hidden="true"
                ></span>
                {{ personaje.race }}
              </span>
            </div>

            <p class="mt-1.5 text-sm text-washi-400">
              {{ personaje.age ? personaje.age + " años" : "Edad desconocida" }}
              <span class="mx-1.5" aria-hidden="true">·</span>
              {{ personaje.gender }}
            </p>

            <p class="mt-4 line-clamp-3 text-sm leading-relaxed text-washi-200">
              {{ personaje.description }}
            </p>

            <div class="mt-auto flex items-end justify-between gap-4 pt-4">
              <blockquote
                v-if="personaje.quote"
                class="line-clamp-2 border-l-2 pl-3 text-sm italic leading-relaxed text-washi-400"
                :style="{ borderColor: personaje.color }"
              >
                “{{ personaje.quote }}”
              </blockquote>
              <span
                class="shrink-0 text-washi-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-washi-50"
                aria-hidden="true"
              >
                <i class="fas fa-arrow-right"></i>
              </span>
            </div>
          </div>
        </article>
      </div>

      <!-- Paginación -->
      <nav
        v-if="totalPaginas > 1"
        class="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-between"
        aria-label="Paginación"
      >
        <p class="text-sm text-washi-400">
          Mostrando {{ rangoInicio }}–{{ rangoFin }} de {{ personajesFiltrados.length }}
        </p>

        <div class="flex items-center gap-1.5">
          <button
            type="button"
            class="btn-icon border border-tinta-600 bg-tinta-800 disabled:pointer-events-none disabled:opacity-40"
            :disabled="paginaActual === 1"
            aria-label="Página anterior"
            @click="cambiarPagina(paginaActual - 1)"
          >
            <i class="fas fa-chevron-left text-sm" aria-hidden="true"></i>
          </button>

          <template v-for="(pagina, i) in paginasVisibles" :key="`${pagina}-${i}`">
            <span
              v-if="pagina === '…'"
              class="hidden h-10 w-8 items-center justify-center text-washi-400 sm:flex"
              aria-hidden="true"
            >…</span>
            <button
              v-else
              type="button"
              class="hidden h-10 min-w-[2.5rem] rounded-lg px-2 text-sm font-semibold tabular-nums transition-colors duration-150 sm:block"
              :class="
                pagina === paginaActual
                  ? '!block bg-fuji-400 text-tinta-950'
                  : 'border border-tinta-600 bg-tinta-800 text-washi-200 hover:border-washi-400/40 hover:text-washi-50'
              "
              :aria-current="pagina === paginaActual ? 'page' : undefined"
              :aria-label="`Página ${pagina}`"
              @click="cambiarPagina(pagina)"
            >
              {{ pagina }}
            </button>
          </template>

          <span class="px-2 text-sm text-washi-400 sm:hidden">de {{ totalPaginas }}</span>

          <button
            type="button"
            class="btn-icon border border-tinta-600 bg-tinta-800 disabled:pointer-events-none disabled:opacity-40"
            :disabled="paginaActual === totalPaginas"
            aria-label="Página siguiente"
            @click="cambiarPagina(paginaActual + 1)"
          >
            <i class="fas fa-chevron-right text-sm" aria-hidden="true"></i>
          </button>
        </div>
      </nav>

      <!-- Estado vacío -->
      <div v-if="personajesFiltrados.length === 0" class="py-20 text-center">
        <i
          :class="sinFavoritos ? 'fa-regular fa-heart' : 'fas fa-magnifying-glass'"
          class="mb-4 text-3xl text-washi-400"
          aria-hidden="true"
        ></i>
        <h2 class="text-2xl font-bold text-washi-50">
          {{ sinFavoritos ? "Aún no tienes favoritos" : "No se encontraron personajes" }}
        </h2>
        <p class="mt-2 text-washi-400">{{ mensajeVacio }}</p>
        <button type="button" class="btn-secondary mt-6" @click="reiniciar">
          {{ sinFavoritos ? "Explorar personajes" : "Ver todos los personajes" }}
        </button>
      </div>
    </div>

    <!-- Detalle del personaje -->
    <PersonajeDetalle
      :personaje="personajeSeleccionado"
      :anterior="vecinos.anterior"
      :siguiente="vecinos.siguiente"
      :favorito="Boolean(personajeSeleccionado && esFavorito(personajeSeleccionado.id))"
      @alternar-favorito="alternarFavorito(personajeSeleccionado.id)"
      @cerrar="cerrarDetalle"
      @navegar="abrirDetalle"
    />
  </main>
</template>

<script>
import PersonajeDetalle from "./PersonajeDetalle.vue";
import { FILTROS, IDS_FILTROS, contarPorFiltro, normalizar, personajes } from "../personajes";
import { alternarFavorito, esFavorito, usarFavoritos } from "../favoritos";

// Valores por defecto: no se escriben en la URL para mantenerla limpia
const POR_DEFECTO = { filtro: "todos", q: "", pagina: "1" };

export default {
  name: "Contenido",
  components: { PersonajeDetalle },
  data() {
    return {
      personajes,
      filtros: FILTROS,
      favoritos: usarFavoritos(),
      personajesPorPagina: 6,
      // La búsqueda vive en local mientras se escribe y pasa a la URL con un pequeño retardo
      busqueda: String(this.$route.query.q || ""),
      temporizadorBusqueda: null,
    };
  },
  computed: {
    // Estado leído de la URL: ?filtro=hashira&q=ren&pagina=2
    filtroActual() {
      const filtro = this.$route.query.filtro;
      return IDS_FILTROS.includes(filtro) ? filtro : POR_DEFECTO.filtro;
    },
    paginaActual() {
      const pagina = parseInt(this.$route.query.pagina, 10) || 1;
      return Math.min(Math.max(pagina, 1), Math.max(this.totalPaginas, 1));
    },
    conteos() {
      return contarPorFiltro(this.favoritos.ids);
    },
    sinFavoritos() {
      return this.filtroActual === "favoritos" && this.favoritos.ids.length === 0;
    },
    etiquetaFiltro() {
      return FILTROS.find((f) => f.id === this.filtroActual)?.etiqueta;
    },
    busquedaNormalizada() {
      return normalizar(this.busqueda);
    },
    personajesFiltrados() {
      const filtro = FILTROS.find((f) => f.id === this.filtroActual) || FILTROS[0];
      const q = this.busquedaNormalizada;
      return this.personajes.filter(
        (p) => filtro.prueba(p, this.favoritos.ids) && (!q || normalizar(p.name).includes(q))
      );
    },
    totalPaginas() {
      return Math.ceil(this.personajesFiltrados.length / this.personajesPorPagina);
    },
    rangoInicio() {
      return (this.paginaActual - 1) * this.personajesPorPagina + 1;
    },
    rangoFin() {
      return Math.min(this.paginaActual * this.personajesPorPagina, this.personajesFiltrados.length);
    },
    mensajeVacio() {
      if (this.sinFavoritos) return "Toca el corazón de cualquier personaje para guardarlo aquí.";
      if (!this.busquedaNormalizada) return "Prueba con otro filtro.";
      const en = this.filtroActual !== "todos" ? ` en ${this.etiquetaFiltro}` : "";
      return `Ningún personaje coincide con “${this.busqueda.trim()}”${en}.`;
    },
    claveGrid() {
      // Cambia al cambiar de página, filtro o búsqueda: reinicia la animación de entrada
      return `${this.filtroActual}|${this.busquedaNormalizada}|${this.paginaActual}`;
    },
    personajesPaginados() {
      const inicio = (this.paginaActual - 1) * this.personajesPorPagina;
      return this.personajesFiltrados.slice(inicio, inicio + this.personajesPorPagina);
    },
    paginasVisibles() {
      const total = this.totalPaginas;
      const actual = this.paginaActual;
      if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
      if (actual <= 4) return [1, 2, 3, 4, 5, "…", total];
      if (actual >= total - 3) return [1, "…", total - 4, total - 3, total - 2, total - 1, total];
      return [1, "…", actual - 1, actual, actual + 1, "…", total];
    },
    personajeSeleccionado() {
      const id = Number(this.$route.params.id);
      return id ? this.personajes.find((p) => p.id === id) || null : null;
    },
    vecinos() {
      // Navegación anterior/siguiente dentro de la lista filtrada actual
      const sel = this.personajeSeleccionado;
      if (!sel) return {};
      let lista = this.personajesFiltrados;
      let i = lista.findIndex((p) => p.id === sel.id);
      if (i === -1) {
        lista = this.personajes;
        i = lista.findIndex((p) => p.id === sel.id);
      }
      return { anterior: lista[i - 1] || null, siguiente: lista[i + 1] || null };
    },
  },
  watch: {
    busqueda(valor) {
      clearTimeout(this.temporizadorBusqueda);
      this.temporizadorBusqueda = setTimeout(() => {
        if (valor.trim() !== String(this.$route.query.q || "")) {
          this.actualizarUrl({ q: valor.trim(), pagina: null }, { reemplazar: true });
        }
      }, 250);
    },
    // Atrás/adelante del navegador: traer la búsqueda de la URL al campo
    "$route.query.q"(q) {
      const valor = String(q || "");
      if (normalizar(valor) !== this.busquedaNormalizada) {
        this.busqueda = valor;
      }
    },
  },
  mounted() {
    document.addEventListener("keydown", this.atajoBusqueda);
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.atajoBusqueda);
    clearTimeout(this.temporizadorBusqueda);
  },
  methods: {
    esFavorito,
    alternarFavorito,
    // Fusiona cambios en la query actual, omite los valores por defecto y conserva la ficha abierta
    actualizarUrl(cambios, { reemplazar = false } = {}) {
      const query = { ...this.$route.query, ...cambios };
      for (const [clave, valor] of Object.entries(query)) {
        if (valor == null || valor === "" || String(valor) === POR_DEFECTO[clave]) delete query[clave];
      }
      const destino = { name: "personajes", params: this.$route.params, query };
      return reemplazar ? this.$router.replace(destino) : this.$router.push(destino);
    },
    cambiarPagina(pagina) {
      if (pagina < 1 || pagina > this.totalPaginas || pagina === this.paginaActual) return;
      this.actualizarUrl({ pagina });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    cambiarFiltro(filtro) {
      if (filtro === this.filtroActual) return;
      this.actualizarUrl({ filtro, pagina: null });
    },
    limpiarBusqueda() {
      this.busqueda = "";
      this.$refs.buscador?.focus();
    },
    reiniciar() {
      clearTimeout(this.temporizadorBusqueda);
      this.busqueda = "";
      this.actualizarUrl({ filtro: null, q: null, pagina: null });
    },
    atajoBusqueda(e) {
      // "/" enfoca el buscador (si no se está escribiendo ya en un campo)
      const escribiendo = ["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName);
      if (e.key === "/" && !escribiendo && !this.personajeSeleccionado) {
        e.preventDefault();
        this.$refs.buscador?.focus();
      }
    },
    abrirDetalle(personaje) {
      this.$router.replace({ name: "personajes", params: { id: personaje.id }, query: this.$route.query });
    },
    cerrarDetalle() {
      // Si llegamos desde la lista, volver atrás; si se abrió el enlace directo, reemplazar
      const atras = window.history.state?.back;
      if (atras && atras.startsWith("/personajes")) this.$router.back();
      else this.$router.replace({ name: "personajes", query: this.$route.query });
    },
    onImageError(event) {
      event.target.onerror = null;
      event.target.src = "/placeholder-personaje.svg";
    },
  },
};
</script>

<style scoped>
.line-clamp-2,
.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-2 {
  -webkit-line-clamp: 2;
}
.line-clamp-3 {
  -webkit-line-clamp: 3;
}

/* Entrada escalonada de tarjetas al cambiar de página, filtro o búsqueda */
.tarjeta {
  animation: entrada 0.35s ease backwards;
  animation-delay: var(--retraso, 0ms);
}
@keyframes entrada {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
}
</style>
