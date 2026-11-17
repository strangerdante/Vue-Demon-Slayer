<template>
  <nav class="fixed inset-x-0 top-0 z-30 border-b border-tinta-700 bg-tinta-950/85 backdrop-blur-md">
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
      <router-link :to="{ name: 'personajes' }" class="flex items-center gap-2.5 rounded-lg">
        <img src="../assets/logo.png" alt="" class="h-8 w-8" />
        <span class="font-display text-lg font-bold text-washi-50">Demon Slayer</span>
        <span class="hidden h-5 w-px bg-tinta-600 sm:block" aria-hidden="true"></span>
        <span class="hidden text-sm font-medium text-washi-400 sm:block">Archivo de personajes</span>
      </router-link>

      <!-- Menú de usuario -->
      <div ref="menu" class="relative">
        <button
          ref="disparador"
          type="button"
          class="flex items-center gap-2.5 rounded-lg border border-transparent py-1.5 pl-1.5 pr-2.5 transition-colors duration-150 hover:border-tinta-600 hover:bg-tinta-800"
          :class="{ 'border-tinta-600 bg-tinta-800': abierto }"
          aria-haspopup="menu"
          :aria-expanded="abierto"
          aria-controls="menu-usuario"
          @click="alternar"
        >
          <span
            class="flex h-8 w-8 items-center justify-center rounded-full bg-fuji-400/15 text-sm font-semibold uppercase text-fuji-300"
            aria-hidden="true"
          >{{ inicial }}</span>
          <span class="hidden max-w-[10rem] truncate text-sm font-medium text-washi-50 sm:block">{{ usuario }}</span>
          <span class="sr-only sm:hidden">Menú de {{ usuario }}</span>
          <i
            class="fas fa-chevron-down text-xs text-washi-400 transition-transform duration-200"
            :class="{ 'rotate-180': abierto }"
            aria-hidden="true"
          ></i>
        </button>

        <Transition name="menu">
          <div
            v-if="abierto"
            id="menu-usuario"
            class="absolute right-0 mt-2 w-64 origin-top-right overflow-hidden rounded-xl border border-tinta-700 bg-tinta-900 shadow-2xl shadow-black/50"
            role="menu"
            aria-label="Menú de usuario"
            @keydown="navegarConTeclado"
          >
            <div class="flex items-center gap-3 border-b border-tinta-700 px-4 py-3.5">
              <span
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-fuji-400/15 font-semibold uppercase text-fuji-300"
                aria-hidden="true"
              >{{ inicial }}</span>
              <div class="min-w-0">
                <p class="truncate font-semibold text-washi-50">{{ usuario }}</p>
                <p v-if="miembroDesde" class="text-xs text-washi-400">Miembro desde {{ miembroDesde }}</p>
              </div>
            </div>

            <div class="p-1.5">
              <router-link
                :to="{ name: 'personajes', query: { filtro: 'favoritos' } }"
                role="menuitem"
                class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-washi-200 transition-colors hover:bg-tinta-800 hover:text-washi-50 focus-visible:bg-tinta-800 focus-visible:ring-0"
                @click="cerrar()"
              >
                <i class="fas fa-heart w-4 text-beni-400" aria-hidden="true"></i>
                Mis favoritos
                <span class="ml-auto rounded-full bg-tinta-700 px-2 text-xs tabular-nums text-washi-200">
                  {{ favoritos.ids.length }}
                </span>
              </router-link>
              <div class="my-1 h-px bg-tinta-700" role="separator"></div>
              <button
                type="button"
                role="menuitem"
                class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-washi-200 transition-colors hover:bg-tinta-800 hover:text-washi-50 focus-visible:bg-tinta-800 focus-visible:ring-0"
                @click="salir"
              >
                <i class="fas fa-arrow-right-from-bracket w-4 text-washi-400" aria-hidden="true"></i>
                Cerrar sesión
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </nav>
</template>

<script>
import { cerrarSesion, obtenerSesion } from "../auth";
import { usarFavoritos } from "../favoritos";

export default {
  name: "Navbar",
  data() {
    const usuario = obtenerSesion()?.usuario || "Invitado";
    let registro = null;
    try {
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      registro = usuarios.find((u) => u.usuario.toLowerCase() === usuario.toLowerCase());
    } catch {
      registro = null;
    }
    return { abierto: false, usuario, registro, favoritos: usarFavoritos() };
  },
  computed: {
    inicial() {
      return this.usuario.charAt(0);
    },
    miembroDesde() {
      if (!this.registro?.fechaRegistro) return "";
      return new Date(this.registro.fechaRegistro).toLocaleDateString("es-ES", {
        month: "long",
        year: "numeric",
      });
    },
  },
  beforeUnmount() {
    this.quitarEscuchas();
  },
  methods: {
    alternar() {
      this.abierto ? this.cerrar() : this.abrir();
    },
    abrir() {
      this.abierto = true;
      document.addEventListener("click", this.clicFuera);
      document.addEventListener("keydown", this.alPresionarEscape);
      this.$nextTick(() => this.items()[0]?.focus());
    },
    cerrar(devolverFoco = false) {
      this.abierto = false;
      this.quitarEscuchas();
      if (devolverFoco) this.$refs.disparador?.focus();
    },
    quitarEscuchas() {
      document.removeEventListener("click", this.clicFuera);
      document.removeEventListener("keydown", this.alPresionarEscape);
    },
    clicFuera(e) {
      if (!this.$refs.menu?.contains(e.target)) this.cerrar();
    },
    alPresionarEscape(e) {
      if (e.key === "Escape") this.cerrar(true);
    },
    items() {
      return [...(this.$refs.menu?.querySelectorAll('[role="menuitem"]') || [])];
    },
    navegarConTeclado(e) {
      if (!["ArrowDown", "ArrowUp", "Tab"].includes(e.key)) return;
      if (e.key === "Tab") return this.cerrar();
      e.preventDefault();
      const items = this.items();
      const i = items.indexOf(document.activeElement);
      const paso = e.key === "ArrowDown" ? 1 : -1;
      items[(i + paso + items.length) % items.length]?.focus();
    },
    salir() {
      cerrarSesion();
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
}
</style>
