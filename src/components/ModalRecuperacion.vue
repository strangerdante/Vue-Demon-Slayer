<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center sm:p-4 z-50"
    @click="cerrarModal"
  >
    <div
      class="bg-gradient-to-br from-slate-800/90 to-purple-900/90 backdrop-blur-lg border border-white/20 rounded-2xl p-3 sm:p-6 w-full max-w-md mx-4 animate-modalIn"
      @click.stop
    >
      <!-- Header del modal -->
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-bold text-white flex items-center">
          <i class="fas fa-key mr-3 text-pink-400"></i>
          Recuperar Contraseña
        </h3>
        <button
          @click="cerrarModal"
          class="text-white/70 hover:text-white transition-colors p-1"
        >
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>

      <!-- Contenido del modal -->
      <div class="space-y-4">
        <!-- Información -->
        <div class="bg-blue-500/20 border border-blue-400/30 rounded-xl p-4">
          <div class="flex items-start">
            <i class="fas fa-info-circle text-blue-400 mr-3 mt-0.5"></i>
            <div class="text-blue-300 text-sm">
              <p class="font-medium mb-1">Usuarios Registrados:</p>
              <p>
                Aquí puedes ver todos los usuarios que se han registrado en el
                sistema.
              </p>
            </div>
          </div>
        </div>

        <!-- Lista de usuarios -->
        <div class="max-h-64 overflow-y-auto custom-scrollbar">
          <div v-if="usuarios.length === 0" class="text-center py-8">
            <i class="fas fa-users text-white/30 text-4xl mb-3"></i>
            <p class="text-white/70 text-sm">
              No hay usuarios registrados aún.
            </p>
          </div>
          <div v-else class="space-y-3">
            <div
              v-for="user in usuarios"
              :key="user.id"
              class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 hover:bg-white/15 transition-all duration-200"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div
                    class="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mr-3"
                  >
                    <i class="fas fa-user text-white text-sm"></i>
                  </div>
                  <div>
                    <div class="text-white font-medium">
                      {{ user.usuario }}
                    </div>
                    <div class="text-white/60 text-xs">
                      Registrado: {{ formatearFecha(user.fechaRegistro) }}
                    </div>
                    <div v-if="user.ultimoAcceso" class="text-white/50 text-xs">
                      Último acceso: {{ formatearFecha(user.ultimoAcceso) }}
                    </div>
                  </div>
                </div>
                <div class="flex items-center">
                  <span
                    :class="
                      user.activo
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    "
                    class="px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {{ user.activo ? "Activo" : "Inactivo" }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mensaje de ayuda -->
        <div
          class="bg-yellow-500/20 border border-yellow-400/30 rounded-xl p-4"
        >
          <div class="flex items-start">
            <i class="fas fa-lightbulb text-yellow-400 mr-3 mt-0.5"></i>
            <div class="text-yellow-300 text-sm">
              <p class="font-medium mb-1">¿No recuerdas tu usuario?</p>
              <p>
                Contacta al administrador del sistema o crea una nueva cuenta.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Botones del modal -->
      <div class="flex gap-3 mt-6">
        <button
          @click="cerrarModal"
          class="flex-1 bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-3 sm:py-3 sm:px-4 rounded-xl transition-all duration-200 border border-white/20"
        >
          <i class="fas fa-arrow-left mr-2"></i>
          Volver
        </button>
        <button
          @click="crearCuenta"
          class="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium py-2 px-3 sm:py-3 sm:px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02]"
        >
          <i class="fas fa-user-plus mr-2"></i>
          Crear Cuenta
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalRecuperacion",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    usuarios: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["cerrar", "crear-cuenta"],
  methods: {
    cerrarModal() {
      this.$emit("cerrar");
    },
    crearCuenta() {
      this.$emit("crear-cuenta");
    },
    formatearFecha(fechaISO) {
      const fecha = new Date(fechaISO);
      return fecha.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
};
</script>

<style scoped>
@keyframes modalIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-modalIn {
  animation: modalIn 0.3s ease-out;
}

/* Custom scrollbar para el modal */
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
</style>
