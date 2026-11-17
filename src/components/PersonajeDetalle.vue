<template>
  <Teleport to="body">
    <Transition name="detalle">
      <div
        v-if="personaje"
        class="fixed inset-0 z-[60] flex items-end justify-center bg-tinta-950/80 backdrop-blur-sm sm:items-center sm:p-6"
        @click.self="$emit('cerrar')"
      >
        <article
          ref="dialogo"
          class="panel relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl border border-tinta-700 bg-tinta-900 shadow-2xl shadow-black/60 focus-visible:ring-0 sm:rounded-2xl md:flex-row"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="`detalle-${personaje.id}`"
          tabindex="-1"
          @keydown="alPresionarTecla"
        >
          <span
            class="absolute inset-x-0 top-0 z-10 h-0.5"
            :style="{ backgroundColor: personaje.color }"
            aria-hidden="true"
          ></span>

          <!-- Imagen -->
          <div
            class="relative h-64 shrink-0 bg-tinta-800 sm:h-80 md:h-auto md:w-[42%]"
            :style="{ backgroundImage: `radial-gradient(circle at 50% 40%, ${personaje.color}40, transparent 70%)` }"
          >
            <img
              :key="personaje.id"
              :src="personaje.img"
              alt=""
              class="h-full w-full object-contain object-bottom md:absolute md:inset-0"
              @error="onImageError"
            />
          </div>

          <!-- Información -->
          <div class="flex min-h-0 flex-1 flex-col">
            <div class="flex items-center justify-between border-b border-tinta-700 px-6 py-3">
              <p class="eyebrow">Ficha del personaje</p>
              <div class="-mr-2 flex items-center gap-1">
                <button
                  type="button"
                  class="btn-icon"
                  :class="{ 'text-beni-400 hover:text-beni-400': favorito }"
                  :aria-pressed="favorito"
                  :aria-label="favorito ? 'Quitar de favoritos' : 'Añadir a favoritos'"
                  :title="favorito ? 'Quitar de favoritos' : 'Añadir a favoritos'"
                  @click="$emit('alternar-favorito')"
                >
                  <i :class="favorito ? 'fas fa-heart' : 'fa-regular fa-heart'" class="text-lg" aria-hidden="true"></i>
                </button>
                <button type="button" class="btn-icon" aria-label="Cerrar" @click="$emit('cerrar')">
                  <i class="fas fa-xmark text-lg" aria-hidden="true"></i>
                </button>
              </div>
            </div>

            <div class="flex-1 overflow-y-auto px-6 py-6">
              <h2 :id="`detalle-${personaje.id}`" class="text-3xl font-extrabold text-washi-50 sm:text-4xl">
                {{ personaje.name }}
              </h2>

              <div class="mt-3 flex flex-wrap gap-2">
                <span class="chip">
                  <span
                    class="h-1.5 w-1.5 rounded-full"
                    :class="personaje.race === 'Demonio' ? 'bg-beni-400' : 'bg-jade-400'"
                    aria-hidden="true"
                  ></span>
                  {{ personaje.race }}
                </span>
                <span v-if="afiliacion" class="chip">
                  <span
                    v-if="personaje.affiliation_id === 2"
                    class="h-1.5 w-1.5 rounded-full bg-kin-400"
                    aria-hidden="true"
                  ></span>
                  {{ afiliacion }}
                </span>
              </div>

              <dl class="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-tinta-700 bg-tinta-700">
                <div class="bg-tinta-900 px-4 py-3">
                  <dt class="text-xs text-washi-400">Edad</dt>
                  <dd class="mt-0.5 font-semibold text-washi-50">
                    {{ personaje.age ? `${personaje.age} años` : "Desconocida" }}
                  </dd>
                </div>
                <div class="bg-tinta-900 px-4 py-3">
                  <dt class="text-xs text-washi-400">Género</dt>
                  <dd class="mt-0.5 font-semibold text-washi-50">{{ personaje.gender }}</dd>
                </div>
              </dl>

              <p class="mt-6 leading-relaxed text-washi-200">{{ personaje.description }}</p>

              <figure v-if="personaje.quote" class="mt-6">
                <blockquote
                  class="border-l-2 pl-4 font-display text-lg leading-snug text-washi-50"
                  :style="{ borderColor: personaje.color }"
                >
                  “{{ personaje.quote }}”
                </blockquote>
                <figcaption class="mt-2 pl-4 text-sm text-washi-400">— {{ personaje.name }}</figcaption>
              </figure>
            </div>

            <!-- Anterior / siguiente -->
            <div class="grid grid-cols-2 border-t border-tinta-700">
              <button
                type="button"
                class="group flex min-w-0 items-center gap-3 px-6 py-4 text-left transition-colors hover:bg-tinta-800 disabled:pointer-events-none disabled:opacity-40"
                :disabled="!anterior"
                @click="$emit('navegar', anterior)"
              >
                <i class="fas fa-arrow-left text-washi-400 group-hover:text-washi-50" aria-hidden="true"></i>
                <span class="min-w-0">
                  <span class="block text-xs text-washi-400">Anterior</span>
                  <span class="block truncate text-sm font-semibold text-washi-50">{{ anterior?.name || "—" }}</span>
                </span>
              </button>
              <button
                type="button"
                class="group flex min-w-0 items-center justify-end gap-3 border-l border-tinta-700 px-6 py-4 text-right transition-colors hover:bg-tinta-800 disabled:pointer-events-none disabled:opacity-40"
                :disabled="!siguiente"
                @click="$emit('navegar', siguiente)"
              >
                <span class="min-w-0">
                  <span class="block text-xs text-washi-400">Siguiente</span>
                  <span class="block truncate text-sm font-semibold text-washi-50">{{ siguiente?.name || "—" }}</span>
                </span>
                <i class="fas fa-arrow-right text-washi-400 group-hover:text-washi-50" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </article>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
import { AFILIACIONES } from "../personajes";

export default {
  name: "PersonajeDetalle",
  props: {
    personaje: { type: Object, default: null },
    anterior: { type: Object, default: null },
    siguiente: { type: Object, default: null },
    favorito: { type: Boolean, default: false },
  },
  emits: ["cerrar", "navegar", "alternar-favorito"],
  data: () => ({ focoPrevio: null }),
  computed: {
    afiliacion() {
      return AFILIACIONES[this.personaje?.affiliation_id];
    },
  },
  watch: {
    personaje: {
      immediate: true,
      handler(nuevo, viejo) {
        if (nuevo && !viejo) this.abrir();
        else if (!nuevo && viejo) this.cerrar();
      },
    },
  },
  beforeUnmount() {
    document.body.style.overflow = "";
  },
  methods: {
    abrir() {
      this.focoPrevio = document.activeElement;
      document.body.style.overflow = "hidden";
      this.$nextTick(() => this.$refs.dialogo?.focus());
    },
    cerrar() {
      document.body.style.overflow = "";
      this.focoPrevio?.focus?.({ preventScroll: true });
    },
    alPresionarTecla(e) {
      if (e.key === "Escape") this.$emit("cerrar");
      else if (e.key === "ArrowLeft" && this.anterior) this.$emit("navegar", this.anterior);
      else if (e.key === "ArrowRight" && this.siguiente) this.$emit("navegar", this.siguiente);
      else if (e.key === "Tab") this.atraparFoco(e);
    },
    atraparFoco(e) {
      // Mantener el foco dentro del diálogo
      const enfocables = [...this.$refs.dialogo.querySelectorAll("button:not([disabled])")];
      if (!enfocables.length) return;
      const primero = enfocables[0];
      const ultimo = enfocables[enfocables.length - 1];
      if (e.shiftKey && (document.activeElement === primero || document.activeElement === this.$refs.dialogo)) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primero.focus();
      }
    },
    onImageError(event) {
      event.target.onerror = null;
      event.target.src = "/placeholder-personaje.svg";
    },
  },
};
</script>

<style scoped>
.chip {
  @apply inline-flex items-center gap-1.5 rounded-full border border-tinta-600 px-2.5 py-0.5 text-xs font-medium text-washi-200;
}

.detalle-enter-active,
.detalle-leave-active {
  transition: opacity 0.22s ease;
}
.detalle-enter-active .panel,
.detalle-leave-active .panel {
  transition: transform 0.22s ease;
}
.detalle-enter-from,
.detalle-leave-to {
  opacity: 0;
}
.detalle-enter-from .panel,
.detalle-leave-to .panel {
  transform: translateY(12px) scale(0.985);
}
</style>
