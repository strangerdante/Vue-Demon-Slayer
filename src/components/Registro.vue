validarEmail() { const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; return
emailRegex.test(this.email); },
<template>
  <div class="w-full">
    <!-- Formulario de Registro -->
    <form class="space-y-4">
      <!-- Header con logo -->
      <div class="text-center mb-6">
        <div class="relative h-40 flex items-center justify-center">
          <img
            src="../assets/login.png"
            alt="logo login"
            class="mx-auto w-40 sm:w-52 drop-shadow-lg absolute top-1/2 transform -translate-y-1/2"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent rounded-full blur-xl"
          ></div>
        </div>
        <h1 class="text-2xl font-bold text-white mt-4 mb-2">
          Crear una cuenta
        </h1>
      </div>

      <!-- Mensaje de éxito/error -->
      <div
        v-if="mensaje"
        :class="mensajeClases"
        class="p-4 rounded-xl flex items-center"
      >
        <i :class="mensajeIcono" class="mr-3"></i>
        <span>{{ mensaje }}</span>
      </div>

      <!-- Campo Usuario -->
      <div class="relative group">
        <input
          v-model="usuario"
          class="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl py-3 px-4 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300 peer pt-5"
          id="usuario"
          type="text"
          placeholder="Usuario"
          :class="{
            'border-red-400 focus:ring-red-400': usuario && !validarUsuario,
          }"
        />
        <label
          class="absolute text-sm text-white/70 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-pink-400"
          for="usuario"
        >
          <i class="fas fa-user mr-2"></i>Nombre de usuario
        </label>
        <div
          v-if="usuario && !validarUsuario"
          class="flex items-center mt-2 text-red-400 text-sm"
        >
          <i class="fas fa-exclamation-circle mr-2"></i>
          <span>El nombre de usuario debe tener al menos 3 caracteres</span>
        </div>
        <div
          v-if="usuarioExiste"
          class="flex items-center mt-2 text-red-400 text-sm"
        >
          <i class="fas fa-exclamation-circle mr-2"></i>
          <span>Este nombre de usuario ya está en uso</span>
        </div>
      </div>

      <!-- Campo Contraseña -->
      <div class="relative group">
        <input
          v-model="contrasena"
          class="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl py-3 px-4 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300 peer pt-5"
          id="password"
          :type="mostrarContrasena ? 'text' : 'password'"
          placeholder="contraseña"
          :class="{
            'border-red-400 focus:ring-red-400':
              contrasena && !validarContrasena,
          }"
        />
        <label
          class="absolute text-sm text-white/70 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-pink-400"
          for="password"
        >
          <i class="fas fa-lock mr-2"></i>Contraseña
        </label>
        <button
          type="button"
          @click="mostrarContrasena = !mostrarContrasena"
          class="absolute right-4 top-4 text-white/70 hover:text-white transition-colors"
        >
          <i :class="mostrarContrasena ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
        </button>
        <div
          v-if="contrasena && !validarContrasena"
          class="flex items-center mt-2 text-red-400 text-sm"
        >
          <i class="fas fa-exclamation-circle mr-2"></i>
          <span>La contraseña debe tener al menos 6 caracteres</span>
        </div>
      </div>

      <!-- Campo Confirmar Contraseña -->
      <div class="relative group">
        <input
          v-model="confirmarContrasena"
          class="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl py-3 px-4 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300 peer pt-5"
          id="confirm-password"
          :type="mostrarConfirmarContrasena ? 'text' : 'password'"
          placeholder="confirmar contraseña"
          :class="{
            'border-red-400 focus:ring-red-400':
              confirmarContrasena && !validarConfirmacion,
          }"
        />
        <label
          class="absolute text-sm text-white/70 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-pink-400"
          for="confirm-password"
        >
          <i class="fas fa-lock mr-2"></i>Confirmar contraseña
        </label>
        <button
          type="button"
          @click="mostrarConfirmarContrasena = !mostrarConfirmarContrasena"
          class="absolute right-4 top-4 text-white/70 hover:text-white transition-colors"
        >
          <i
            :class="
              mostrarConfirmarContrasena ? 'fas fa-eye-slash' : 'fas fa-eye'
            "
          ></i>
        </button>
        <div
          v-if="confirmarContrasena && !validarConfirmacion"
          class="flex items-center mt-2 text-red-400 text-sm"
        >
          <i class="fas fa-exclamation-circle mr-2"></i>
          <span>Las contraseñas no coinciden</span>
        </div>
      </div>

      <!-- Botón de registro -->
      <button
        @click.prevent="registrar"
        :disabled="!formularioValido || registrando"
        class="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-400/50 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
        type="submit"
      >
        <i v-if="registrando" class="fas fa-spinner fa-spin mr-2"></i>
        <i v-else class="fas fa-user-plus mr-2"></i>
        {{ registrando ? "Creando cuenta..." : "Crear Cuenta" }}
      </button>

      <!-- Enlace a login -->
      <div class="text-center pt-6 border-t border-white/20">
        <p class="text-white/80 text-sm">
          ¿Ya tienes una cuenta?
          <button
            @click="volverLogin"
            class="text-pink-400 hover:text-pink-300 font-semibold ml-1 transition-colors duration-200"
            type="button"
          >
            Inicia sesión aquí
          </button>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Registro",
  data: () => ({
    usuario: "",
    contrasena: "",
    confirmarContrasena: "",
    mostrarContrasena: false,
    mostrarConfirmarContrasena: false,
    mensaje: "",
    tipoMensaje: "",
    registrando: false,
    usuarios: [],
  }),
  computed: {
    validarUsuario() {
      return this.usuario.length >= 3;
    },
    validarEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(this.email);
    },
    validarContrasena() {
      return this.contrasena.length >= 6;
    },
    validarConfirmacion() {
      return (
        this.contrasena === this.confirmarContrasena &&
        this.contrasena.length > 0
      );
    },
    usuarioExiste() {
      return this.usuarios.some(
        (user) => user.usuario.toLowerCase() === this.usuario.toLowerCase()
      );
    },
    formularioValido() {
      return (
        this.validarUsuario &&
        this.validarContrasena &&
        this.validarConfirmacion &&
        !this.usuarioExiste
      );
    },
    mensajeClases() {
      return {
        "bg-green-500/20 border border-green-400 text-green-300":
          this.tipoMensaje === "exito",
        "bg-red-500/20 border border-red-400 text-red-300":
          this.tipoMensaje === "error",
      };
    },
    mensajeIcono() {
      return {
        "fas fa-check-circle": this.tipoMensaje === "exito",
        "fas fa-exclamation-circle": this.tipoMensaje === "error",
      };
    },
  },
  mounted() {
    this.cargarUsuarios();
  },
  methods: {
    cargarUsuarios() {
      try {
        const usuariosGuardados = localStorage.getItem("usuarios");
        if (usuariosGuardados) {
          this.usuarios = JSON.parse(usuariosGuardados);
        }
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
        this.usuarios = [];
      }
    },
    guardarUsuarios() {
      try {
        localStorage.setItem("usuarios", JSON.stringify(this.usuarios));
      } catch (error) {
        console.error("Error al guardar usuarios:", error);
        throw new Error("No se pudo guardar el usuario");
      }
    },
    async registrar() {
      if (!this.formularioValido) return;

      this.registrando = true;
      this.mensaje = "";

      try {
        // Simular delay de red
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Verificar nuevamente si el usuario existe (por si cambió durante el registro)
        if (this.usuarioExiste) {
          throw new Error("Este nombre de usuario ya está en uso");
        }

        // Crear nuevo usuario
        const nuevoUsuario = {
          id: Date.now(), // ID único basado en timestamp
          usuario: this.usuario.trim(),
          contrasena: this.contrasena, // En producción, usar hash
          fechaRegistro: new Date().toISOString(),
          activo: true,
        };

        // Agregar a la lista y guardar
        this.usuarios.push(nuevoUsuario);
        this.guardarUsuarios();

        // Mostrar mensaje de éxito
        this.mostrarMensaje(
          "¡Cuenta creada exitosamente! Bienvenido.",
          "exito"
        );

        // Limpiar formulario
        this.limpiarFormulario();

        // Emitir evento de registro exitoso después de un delay
        setTimeout(() => {
          this.$emit("registro-exitoso", {
            usuario: nuevoUsuario.usuario,
          });
        }, 2000);
      } catch (error) {
        console.error("Error en el registro:", error);
        this.mostrarMensaje(
          error.message || "Error al crear la cuenta. Inténtalo de nuevo.",
          "error"
        );
      } finally {
        this.registrando = false;
      }
    },
    volverLogin() {
      this.$emit("volver-login");
    },
    mostrarMensaje(texto, tipo) {
      this.mensaje = texto;
      this.tipoMensaje = tipo;

      // Auto-ocultar mensaje después de 5 segundos
      setTimeout(() => {
        this.mensaje = "";
        this.tipoMensaje = "";
      }, 5000);
    },
    limpiarFormulario() {
      this.usuario = "";
      this.contrasena = "";
      this.confirmarContrasena = "";
      this.mostrarContrasena = false;
      this.mostrarConfirmarContrasena = false;
    },
    // Método utilitario para obtener todos los usuarios (para debugging)
    obtenerUsuarios() {
      return this.usuarios;
    },
    // Método para eliminar un usuario (opcional, para administración)
    eliminarUsuario(usuarioId) {
      this.usuarios = this.usuarios.filter((user) => user.id !== usuarioId);
      this.guardarUsuarios();
    },
  },
};
</script>

<style scoped>
/* Estilos consistentes con el componente de Login */
.group:hover .peer {
  border-color: rgba(236, 72, 153, 0.5);
}

/* Efectos adicionales para feedback visual */
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}

input.border-red-400:focus {
  animation: shake 0.5s ease-in-out;
}

/* Animación para mensajes */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
