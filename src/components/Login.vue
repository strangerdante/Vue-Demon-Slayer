<template>
  <div
    class="min-h-screen bg-gradient-to-t from-slate-800 via-morado-oscuro to-morado-electrico flex items-center justify-center p-4"
  >
    <div class="w-full max-w-md">
      <!-- Header con logo -->
      <div class="text-center mb-6" v-if="!mostrarRegistro">
        <div class="relative h-40 flex items-center justify-center">
          <img
            src="../assets/login.png"
            alt="logo login"
            class="mx-auto w-40 sm:w-52 drop-shadow-lg absolute top-1/2 transform -translate-y-1/2"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-purple-500/0 to-transparent rounded-full blur-xl"
          ></div>
        </div>
        <h1 class="text-2xl font-bold text-white mt-4 mb-2">
          ¡Bienvenido de vuelta!
        </h1>
      </div>

      <!-- Formulario de Login -->
      <form
        v-if="!mostrarRegistro"
        class="space-y-4"
        @submit.prevent="iniciarSesion"
      >
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
            v-model="usuarioIngresado"
            class="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl py-3 px-4 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300 peer pt-5"
            id="usuario"
            type="text"
            placeholder="usuario"
            :class="{
              'border-red-400 focus:ring-red-400':
                usuarioIngresado && !validarUsuario,
            }"
          />
          <label
            class="absolute text-sm text-white/70 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-pink-400"
            for="usuario"
          >
            <i class="fas fa-user mr-2"></i>Nombre de usuario
          </label>
          <div
            v-if="usuarioIngresado && !validarUsuario"
            class="flex items-center mt-2 text-red-400 text-sm"
          >
            <i class="fas fa-exclamation-circle mr-2"></i>
            <span>El nombre de usuario debe tener al menos 3 caracteres</span>
          </div>
        </div>

        <!-- Campo Contraseña -->
        <div class="relative group">
          <input
            v-model="contrasenaIngresada"
            class="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl py-3 px-4 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300 peer pt-5"
            id="password"
            :type="mostrarContrasena ? 'text' : 'password'"
            placeholder="contraseña"
            :class="{
              'border-red-400 focus:ring-red-400':
                contrasenaIngresada && !validarContrasena,
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
            <i
              :class="mostrarContrasena ? 'fas fa-eye-slash' : 'fas fa-eye'"
            ></i>
          </button>
          <div
            v-if="contrasenaIngresada && !validarContrasena"
            class="flex items-center mt-2 text-red-400 text-sm"
          >
            <i class="fas fa-exclamation-circle mr-2"></i>
            <span>La contraseña debe tener al menos 6 caracteres</span>
          </div>
        </div>

        <!-- Enlace olvidé contraseña -->
        <div class="text-right">
          <button
            type="button"
            @click="abrirModalRecuperacion"
            class="text-sm text-pink-400 hover:text-pink-300 transition-colors duration-200 font-medium"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <!-- Botón de acceso -->
        <button
          :disabled="!formularioValido || iniciandoSesion"
          class="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-400/50 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          type="submit"
        >
          <i v-if="iniciandoSesion" class="fas fa-spinner fa-spin mr-2"></i>
          <i v-else class="fas fa-sign-in-alt mr-2"></i>
          {{ iniciandoSesion ? "Iniciando sesión..." : "Iniciar Sesión" }}
        </button>

        <!-- Divisor -->
        <div class="relative my-5">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-white/30"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span
              class="px-4 bg-white/10 backdrop-blur-sm text-white/80 rounded-full"
            >
              O continúa con
            </span>
          </div>
        </div>

        <!-- Botones de redes sociales -->
        <div class="grid grid-cols-3 gap-4">
          <button
            type="button"
            class="group bg-white/10 backdrop-blur-sm hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 border border-white/30 text-white font-bold py-2 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            <i
              class="fab fa-instagram text-xl group-hover:scale-110 transition-transform"
            ></i>
          </button>
          <button
            type="button"
            class="group bg-white/10 backdrop-blur-sm hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 border border-white/30 text-white font-bold py-2 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            <i
              class="fab fa-twitter text-xl group-hover:scale-110 transition-transform"
            ></i>
          </button>
          <button
            type="button"
            class="group bg-white/10 backdrop-blur-sm hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 border border-white/30 text-white font-bold py-2 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            <i
              class="fab fa-facebook text-xl group-hover:scale-110 transition-transform"
            ></i>
          </button>
        </div>

        <!-- Enlace a registro -->
        <div class="text-center pt-6 border-t border-white/20">
          <p class="text-white/80 text-sm">
            ¿No tienes una cuenta?
            <button
              @click="mostrarRegistro = true"
              class="text-pink-400 hover:text-pink-300 font-semibold ml-1 transition-colors duration-200"
              type="button"
            >
              Regístrate aquí
            </button>
          </p>
        </div>
      </form>

      <!-- Formulario de registro -->
      <div v-if="mostrarRegistro" class="animate-fadeIn">
        <Registro
          @volver-login="volverLogin"
          @registro-exitoso="registroCompletado"
        />
      </div>

      <!-- Footer -->
      <div class="text-center mt-8">
        <p class="text-white/60 text-xs">
          © 2025 Jamel Pimienta. Todos los derechos reservados.
        </p>
      </div>
    </div>

    <!-- Modal de Recuperación de Contraseña -->
    <ModalRecuperacion
      :visible="mostrarModalRecuperacion"
      :usuarios="usuarios"
      @cerrar="cerrarModalRecuperacion"
      @crear-cuenta="manejarCrearCuenta"
    />
  </div>
</template>

<script>
import Registro from "../components/Registro.vue";
import ModalRecuperacion from "../components/ModalRecuperacion.vue";

export default {
  name: "Login",
  components: {
    Registro,
    ModalRecuperacion,
  },
  data: () => ({
    usuarioIngresado: "",
    contrasenaIngresada: "",
    mostrarContrasena: false,
    mostrarRegistro: false,
    mostrarModalRecuperacion: false,
    mensaje: "",
    tipoMensaje: "",
    iniciandoSesion: false,
    usuarios: [],
  }),
  computed: {
    validarUsuario() {
      return this.usuarioIngresado.length >= 3;
    },
    validarContrasena() {
      return this.contrasenaIngresada.length >= 6;
    },
    formularioValido() {
      return this.validarUsuario && this.validarContrasena;
    },
    mensajeClases() {
      return {
        "bg-green-500/20 border border-green-400 text-green-300":
          this.tipoMensaje === "exito",
        "bg-red-500/20 border border-red-400 text-red-300":
          this.tipoMensaje === "error",
        "bg-blue-500/20 border border-blue-400 text-blue-300":
          this.tipoMensaje === "info",
      };
    },
    mensajeIcono() {
      return {
        "fas fa-check-circle": this.tipoMensaje === "exito",
        "fas fa-exclamation-circle": this.tipoMensaje === "error",
        "fas fa-info-circle": this.tipoMensaje === "info",
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
    abrirModalRecuperacion() {
      this.mostrarModalRecuperacion = true;
      this.cargarUsuarios(); // Actualizar lista antes de mostrar
    },
    cerrarModalRecuperacion() {
      this.mostrarModalRecuperacion = false;
    },
    manejarCrearCuenta() {
      this.mostrarRegistro = true;
      this.cerrarModalRecuperacion();
    },
    async iniciarSesion() {
      if (!this.formularioValido) return;

      this.iniciandoSesion = true;
      this.mensaje = "";

      try {
        // Simular delay de red
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Buscar usuario en localStorage
        const usuarioEncontrado = this.usuarios.find(
          (user) =>
            user.usuario.toLowerCase() ===
              this.usuarioIngresado.toLowerCase() &&
            user.contrasena === this.contrasenaIngresada &&
            user.activo
        );

        if (usuarioEncontrado) {
          // Login exitoso
          this.mostrarMensaje(
            "¡Bienvenido de vuelta! Iniciando sesión...",
            "exito"
          );

          // Guardar sesión actual
          const sesionActual = {
            usuario: usuarioEncontrado.usuario,
            fechaLogin: new Date().toISOString(),
            activo: true,
          };
          localStorage.setItem("sesionActual", JSON.stringify(sesionActual));

          // Actualizar última fecha de acceso del usuario
          usuarioEncontrado.ultimoAcceso = new Date().toISOString();
          localStorage.setItem("usuarios", JSON.stringify(this.usuarios));

          // Redirigir después de un delay
          setTimeout(() => {
            this.$router.push("/sidebar");
          }, 2000);
        } else {
          // Credenciales incorrectas
          throw new Error("Usuario o contraseña incorrectos");
        }
      } catch (error) {
        console.error("Error en el login:", error);
        this.mostrarMensaje(
          error.message || "Error al iniciar sesión. Inténtalo de nuevo.",
          "error"
        );
      } finally {
        this.iniciandoSesion = false;
      }
    },
    registroCompletado(datosUsuario) {
      this.mostrarRegistro = false;
      this.cargarUsuarios(); // Recargar lista de usuarios
      this.mostrarMensaje(
        `¡Bienvenido ${
          datosUsuario?.usuario || ""
        }! Tu cuenta ha sido creada exitosamente.`,
        "exito"
      );
    },
    volverLogin() {
      this.mostrarRegistro = false;
      this.limpiarFormulario();
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
      this.usuarioIngresado = "";
      this.contrasenaIngresada = "";
      this.mostrarContrasena = false;
    },
    // Método para cerrar sesión (para usar en otros componentes)
    cerrarSesion() {
      localStorage.removeItem("sesionActual");
      this.$router.push("/login");
    },
    // Método para verificar si hay sesión activa
    verificarSesion() {
      const sesion = localStorage.getItem("sesionActual");
      return sesion ? JSON.parse(sesion) : null;
    },
  },
};
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

/* Efectos adicionales para inputs */
.group:hover .peer {
  border-color: rgba(236, 72, 153, 0.5);
}

/* Efectos para feedback visual */
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

/* Scrollbar personalizado general */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: rgba(236, 72, 153, 0.5);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(236, 72, 153, 0.7);
}
</style>
