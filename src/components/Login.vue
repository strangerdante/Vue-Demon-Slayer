<template>
  <main class="tema-tanjiro ichimatsu ichimatsu-verde flex min-h-screen flex-col px-6 py-8 sm:px-10">
    <!-- Marca -->
    <header
      class="flex items-center gap-2.5 self-start rounded-xl border border-white/10 bg-[#080a09] py-1.5 pl-1.5 pr-3.5"
    >
      <img src="../assets/logo.png" alt="" class="h-8 w-8" />
      <span class="font-display text-lg font-bold text-washi-50">Demon Slayer</span>
    </header>

    <div class="flex flex-1 items-center justify-center py-10">
      <div
        class="w-full max-w-md rounded-2xl border border-white/10 bg-[#080a09] p-7 shadow-2xl shadow-black/60 sm:p-9"
      >
        <Transition name="fade" mode="out-in">
          <!-- Login -->
          <section v-if="!mostrarRegistro" key="login">
            <img
              src="../assets/login.png"
              alt=""
              class="mb-8 w-40 sm:w-44"
            />
            <h1 class="text-3xl font-extrabold text-washi-50">Bienvenido de vuelta</h1>
            <p class="mt-2 text-washi-400">
              Inicia sesión para explorar el archivo de personajes.
            </p>

            <form class="mt-8 space-y-5" novalidate @submit.prevent="iniciarSesion">
              <Transition name="fade">
                <div v-if="mensaje" :class="`alert-${tipoMensaje}`" role="status">
                  <i :class="mensajeIcono" class="mt-0.5" aria-hidden="true"></i>
                  <span>{{ mensaje }}</span>
                </div>
              </Transition>

              <div>
                <label class="field-label" for="login-usuario">Nombre de usuario</label>
                <input
                  id="login-usuario"
                  v-model.trim="usuarioIngresado"
                  type="text"
                  autocomplete="username"
                  class="field-input"
                  :class="{ 'is-invalid': usuarioIngresado && !validarUsuario }"
                  :aria-invalid="Boolean(usuarioIngresado && !validarUsuario)"
                />
                <p v-if="usuarioIngresado && !validarUsuario" class="field-error">
                  <i class="fas fa-circle-exclamation" aria-hidden="true"></i>
                  Debe tener al menos 3 caracteres.
                </p>
              </div>

              <div>
                <div class="mb-1.5 flex items-center justify-between">
                  <label class="field-label mb-0" for="login-password">Contraseña</label>
                  <button
                    type="button"
                    class="btn-link text-sm"
                    @click="mostrarModalRecuperacion = true"
                  >
                    ¿La olvidaste?
                  </button>
                </div>
                <div class="relative">
                  <input
                    id="login-password"
                    v-model="contrasenaIngresada"
                    :type="mostrarContrasena ? 'text' : 'password'"
                    autocomplete="current-password"
                    class="field-input pr-11"
                    :class="{ 'is-invalid': contrasenaIngresada && !validarContrasena }"
                    :aria-invalid="Boolean(contrasenaIngresada && !validarContrasena)"
                  />
                  <button
                    type="button"
                    class="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-lg text-washi-400 hover:text-washi-50"
                    :aria-label="mostrarContrasena ? 'Ocultar contraseña' : 'Mostrar contraseña'"
                    @click="mostrarContrasena = !mostrarContrasena"
                  >
                    <i :class="mostrarContrasena ? 'fas fa-eye-slash' : 'fas fa-eye'" aria-hidden="true"></i>
                  </button>
                </div>
                <p v-if="contrasenaIngresada && !validarContrasena" class="field-error">
                  <i class="fas fa-circle-exclamation" aria-hidden="true"></i>
                  Debe tener al menos 6 caracteres.
                </p>
              </div>

              <button
                type="submit"
                class="btn-primary w-full py-3"
                :disabled="!formularioValido || iniciandoSesion"
              >
                <i v-if="iniciandoSesion" class="fas fa-spinner fa-spin" aria-hidden="true"></i>
                {{ iniciandoSesion ? "Iniciando sesión…" : "Iniciar sesión" }}
              </button>
            </form>

            <p class="mt-8 text-sm text-washi-400">
              ¿No tienes una cuenta?
              <button type="button" class="btn-link ml-1" @click="mostrarRegistro = true">
                Regístrate
              </button>
            </p>
          </section>

          <!-- Registro -->
          <section v-else key="registro">
            <Registro @volver-login="volverLogin" @registro-exitoso="registroCompletado" />
          </section>
        </Transition>
      </div>
    </div>

    <footer
      class="self-start rounded-lg border border-white/10 bg-[#080a09] px-3 py-1.5 text-xs text-washi-400"
    >
      © {{ anio }} Jamel Pimienta. Proyecto de fans sin fines comerciales.
    </footer>

    <ModalRecuperacion
      :visible="mostrarModalRecuperacion"
      @cerrar="mostrarModalRecuperacion = false"
      @crear-cuenta="manejarCrearCuenta"
    />
  </main>
</template>

<script>
import Registro from "./Registro.vue";
import ModalRecuperacion from "./ModalRecuperacion.vue";
import { iniciarSesion as guardarSesion } from "../auth";

export default {
  name: "Login",
  components: { Registro, ModalRecuperacion },
  data: () => ({
    usuarioIngresado: "",
    contrasenaIngresada: "",
    mostrarContrasena: false,
    mostrarRegistro: false,
    mostrarModalRecuperacion: false,
    mensaje: "",
    tipoMensaje: "",
    iniciandoSesion: false,
    temporizadorMensaje: null,
    anio: new Date().getFullYear(),
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
    mensajeIcono() {
      return {
        exito: "fas fa-circle-check",
        error: "fas fa-circle-exclamation",
        info: "fas fa-circle-info",
      }[this.tipoMensaje];
    },
  },
  beforeUnmount() {
    clearTimeout(this.temporizadorMensaje);
  },
  methods: {
    leerUsuarios() {
      try {
        return JSON.parse(localStorage.getItem("usuarios")) || [];
      } catch {
        return [];
      }
    },
    manejarCrearCuenta() {
      this.mostrarModalRecuperacion = false;
      this.mostrarRegistro = true;
    },
    async iniciarSesion() {
      if (!this.formularioValido) return;
      this.iniciandoSesion = true;
      this.mensaje = "";

      // Pequeña espera para simular la petición
      await new Promise((resolve) => setTimeout(resolve, 600));

      const usuarios = this.leerUsuarios();
      const encontrado = usuarios.find(
        (u) =>
          u.usuario.toLowerCase() === this.usuarioIngresado.toLowerCase() &&
          u.contrasena === this.contrasenaIngresada &&
          u.activo
      );

      if (!encontrado) {
        this.iniciandoSesion = false;
        this.mostrarMensaje("Usuario o contraseña incorrectos.", "error");
        return;
      }

      encontrado.ultimoAcceso = new Date().toISOString();
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      guardarSesion(encontrado.usuario);
      this.$router.push({ name: "personajes" });
    },
    registroCompletado(datosUsuario) {
      this.mostrarRegistro = false;
      this.usuarioIngresado = datosUsuario?.usuario || "";
      this.mostrarMensaje("Cuenta creada. Ya puedes iniciar sesión.", "exito");
    },
    volverLogin() {
      this.mostrarRegistro = false;
      this.usuarioIngresado = "";
      this.contrasenaIngresada = "";
      this.mostrarContrasena = false;
    },
    mostrarMensaje(texto, tipo) {
      this.mensaje = texto;
      this.tipoMensaje = tipo;
      clearTimeout(this.temporizadorMensaje);
      this.temporizadorMensaje = setTimeout(() => (this.mensaje = ""), 5000);
    },
  },
};
</script>
