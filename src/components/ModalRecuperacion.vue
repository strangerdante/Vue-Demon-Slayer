<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="visible"
        class="fixed inset-0 z-50 flex items-center justify-center bg-tinta-950/80 p-4 backdrop-blur-sm"
        @click.self="cerrar"
      >
        <div
          ref="dialogo"
          class="surface w-full max-w-md p-6 shadow-2xl shadow-black/50 focus-visible:ring-0"
          role="dialog"
          aria-modal="true"
          aria-labelledby="titulo-recuperacion"
          tabindex="-1"
        >
          <div class="flex items-start justify-between gap-4">
            <h2 id="titulo-recuperacion" class="text-xl font-bold text-washi-50">
              Recuperar contraseña
            </h2>
            <button type="button" class="btn-icon -mr-2 -mt-2" aria-label="Cerrar" @click="cerrar">
              <i class="fas fa-xmark text-lg" aria-hidden="true"></i>
            </button>
          </div>

          <p class="mt-3 leading-relaxed text-washi-400">
            Esta es una demo: las cuentas se guardan solo en este navegador y no
            tienen un correo asociado, así que no podemos restablecer la contraseña.
          </p>
          <p class="mt-3 leading-relaxed text-washi-400">
            Si no la recuerdas, crea una cuenta nueva en unos segundos.
          </p>

          <div class="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button type="button" class="btn-secondary" @click="cerrar">Volver</button>
            <button type="button" class="btn-primary" @click="$emit('crear-cuenta')">
              Crear cuenta nueva
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
export default {
  name: "ModalRecuperacion",
  props: {
    visible: { type: Boolean, default: false },
  },
  emits: ["cerrar", "crear-cuenta"],
  watch: {
    visible(abierto) {
      if (abierto) {
        document.addEventListener("keydown", this.alPresionarTecla);
        this.$nextTick(() => this.$refs.dialogo?.focus());
      } else {
        document.removeEventListener("keydown", this.alPresionarTecla);
      }
    },
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.alPresionarTecla);
  },
  methods: {
    cerrar() {
      this.$emit("cerrar");
    },
    alPresionarTecla(e) {
      if (e.key === "Escape") this.cerrar();
    },
  },
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-active [role="dialog"],
.modal-leave-active [role="dialog"] {
  transition: transform 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from [role="dialog"],
.modal-leave-to [role="dialog"] {
  transform: scale(0.97) translateY(6px);
}
</style>
