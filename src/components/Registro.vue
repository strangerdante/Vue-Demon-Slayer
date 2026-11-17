<template>
  <div>
    <img src="../assets/registro.png" alt="" class="mb-8 w-48 sm:w-52" />
    <h1 class="text-3xl font-extrabold text-washi-50">Crea tu cuenta</h1>
    <p class="mt-2 text-washi-400">Solo necesitas un usuario y una contraseña.</p>

    <form class="mt-8 space-y-5" novalidate @submit.prevent="registrar">
      <Transition name="fade">
        <div v-if="mensaje" class="alert-error" role="status">
          <i class="fas fa-circle-exclamation mt-0.5" aria-hidden="true"></i>
          <span>{{ mensaje }}</span>
        </div>
      </Transition>

      <div>
        <label class="field-label" for="registro-usuario">Nombre de usuario</label>
        <input
          id="registro-usuario"
          v-model.trim="usuario"
          type="text"
          autocomplete="username"
          class="field-input"
          :class="{ 'is-invalid': errorUsuario }"
          :aria-invalid="Boolean(errorUsuario)"
        />
        <p v-if="errorUsuario" class="field-error">
          <i class="fas fa-circle-exclamation" aria-hidden="true"></i>
          {{ errorUsuario }}
        </p>
      </div>

      <div>
        <label class="field-label" for="registro-password">Contraseña</label>
        <div class="relative">
          <input
            id="registro-password"
            v-model="contrasena"
            :type="mostrarContrasena ? 'text' : 'password'"
            autocomplete="new-password"
            class="field-input pr-11"
            :class="{ 'is-invalid': contrasena && !validarContrasena }"
            :aria-invalid="Boolean(contrasena && !validarContrasena)"
          />
          <button
            type="button"
            class="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-lg text-washi-400 hover:text-washi-50"
            :aria-label="mostrarContrasena ? 'Ocultar contraseñas' : 'Mostrar contraseñas'"
            @click="mostrarContrasena = !mostrarContrasena"
          >
            <i :class="mostrarContrasena ? 'fas fa-eye-slash' : 'fas fa-eye'" aria-hidden="true"></i>
          </button>
        </div>
        <p v-if="contrasena && !validarContrasena" class="field-error">
          <i class="fas fa-circle-exclamation" aria-hidden="true"></i>
          Debe tener al menos 6 caracteres.
        </p>
      </div>

      <div>
        <label class="field-label" for="registro-confirmar">Confirmar contraseña</label>
        <input
          id="registro-confirmar"
          v-model="confirmarContrasena"
          :type="mostrarContrasena ? 'text' : 'password'"
          autocomplete="new-password"
          class="field-input"
          :class="{ 'is-invalid': confirmarContrasena && !validarConfirmacion }"
          :aria-invalid="Boolean(confirmarContrasena && !validarConfirmacion)"
        />
        <p v-if="confirmarContrasena && !validarConfirmacion" class="field-error">
          <i class="fas fa-circle-exclamation" aria-hidden="true"></i>
          Las contraseñas no coinciden.
        </p>
      </div>

      <button
        type="submit"
        class="btn-primary w-full py-3"
        :disabled="!formularioValido || registrando"
      >
        <i v-if="registrando" class="fas fa-spinner fa-spin" aria-hidden="true"></i>
        {{ registrando ? "Creando cuenta…" : "Crear cuenta" }}
      </button>
    </form>

    <p class="mt-8 text-sm text-washi-400">
      ¿Ya tienes una cuenta?
      <button type="button" class="btn-link ml-1" @click="$emit('volver-login')">
        Inicia sesión
      </button>
    </p>
  </div>
</template>

<script>
export default {
  name: "Registro",
  emits: ["volver-login", "registro-exitoso"],
  data: () => ({
    usuario: "",
    contrasena: "",
    confirmarContrasena: "",
    mostrarContrasena: false,
    mensaje: "",
    registrando: false,
    usuarios: [],
  }),
  computed: {
    validarUsuario() {
      return this.usuario.length >= 3;
    },
    usuarioExiste() {
      return this.usuarios.some(
        (u) => u.usuario.toLowerCase() === this.usuario.toLowerCase()
      );
    },
    errorUsuario() {
      if (!this.usuario) return "";
      if (!this.validarUsuario) return "Debe tener al menos 3 caracteres.";
      if (this.usuarioExiste) return "Este nombre de usuario ya está en uso.";
      return "";
    },
    validarContrasena() {
      return this.contrasena.length >= 6;
    },
    validarConfirmacion() {
      return this.contrasena.length > 0 && this.contrasena === this.confirmarContrasena;
    },
    formularioValido() {
      return (
        this.validarUsuario &&
        !this.usuarioExiste &&
        this.validarContrasena &&
        this.validarConfirmacion
      );
    },
  },
  mounted() {
    try {
      this.usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    } catch {
      this.usuarios = [];
    }
  },
  methods: {
    async registrar() {
      if (!this.formularioValido) return;
      this.registrando = true;
      this.mensaje = "";

      await new Promise((resolve) => setTimeout(resolve, 600));

      try {
        const nuevoUsuario = {
          id: Date.now(),
          usuario: this.usuario,
          contrasena: this.contrasena, // Demo local: en producción se guardaría un hash en el servidor
          fechaRegistro: new Date().toISOString(),
          activo: true,
        };
        localStorage.setItem("usuarios", JSON.stringify([...this.usuarios, nuevoUsuario]));
        this.$emit("registro-exitoso", { usuario: nuevoUsuario.usuario });
      } catch {
        this.mensaje = "No se pudo crear la cuenta. Inténtalo de nuevo.";
      } finally {
        this.registrando = false;
      }
    },
  },
};
</script>
