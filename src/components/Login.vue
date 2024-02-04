<template>
<div class="h-screen flex  items-center">
  <div class="max-w-md mx-auto p-2">
    <div class="text-center">
        <img src="../assets/login.png" alt="logo login" class="mx-auto w-40 sm:w-56 ">
        <p class="text-white">¡Hola te extrañamos!</p>
    </div>
    <div>
        <!-- Formulario por defecto -->
      <form v-if="!mostrarRegistro" class="px-8 pt-6 pb-8 mb-4">
        <div class="mb-4 text-right">
          <label class="block text-white text-left" for="email">
            Email
          </label>
          <input  v-model="correoIngresado" class="bg-gris shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-500" id="email" type="email" placeholder="Usuari@">
          <p class="text-red-500" v-if="correoIngresado && !compararCorreo">Email invalido</p>
        </div>

        <div class="mb-6 text-right">
          <label class="block text-white text-left" for="password">
            Contraseña
          </label>
          <input class="bg-gris shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-500" id="password" type="password" placeholder="Ingresa tu contraseña">
          <a class="inline-block align-baseline text-sm text-rosa-brillante hover:text-blue-800" href="#">
            ¿Olvido la contraseña?
          </a>
        </div>
        <router-link to="/sidebar">
          <div class="flex items-center justify-between">
            
            <button class="bg-rosa-brillante hover:bg-morado-electrico text-morado-oscuro font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="button">
              Acceder
            </button>
          </div>
        </router-link>

        <div>
        <!-- Bloque texto con linea  -->
          <div class="flex items-center mt-7">
            <div class="flex-1 h-0.5 bg-white"></div>
            <span class="px-2 text-sm text-white">Regístrate también con</span>
            <div class="flex-1 h-0.5 bg-white"></div>
          </div>
        <!-- Fin bloque texto con linea  -->
        <!-- Bloque redes sociales  -->
            <div class="flex justify-center mt-5">
                <a href="#" class="mr-10 bg-gris hover:bg-pink-700 text-white font-bold text-center py-0.5 rounded-md w-12 h-12 border-2 border-white">
                    <i class="fa fa-instagram text-4xl"></i>
                </a>
                <a href="#" class="mr-10 bg-gris hover:bg-blue-500 text-white font-bold text-center py-1 px-2 rounded-md w-12 h-12 border-2 border-white">
                    <i class="fa fa-twitter text-4xl"></i>
                </a>
                <a href="#" class="bg-gris hover:bg-blue-700 text-white font-bold text-center py-1 px-2 rounded-md w-12 h-12 border-2 border-white">
                    <i class="fa fa-facebook text-4xl"></i>
                </a>
            </div>
        <!-- Fin bloque redes sociales  -->    
        
            <div class="text-center mt-7"> 
                <a v-if="!mostrarRegistro" @click="mostrarRegistro = true" class="inline-block align-baseline font-bold text-sm text-white hover:text-morado-electrico " href="#">
                    ¿Quieres registrarte?  <span class="text-rosa-brillante"> Registrate </span>
                </a>
            </div>

        </div>

      </form>      
      <form v-if="mostrarRegistro">
        <!-- Formulario de registro -->
        <Registro/>
      </form>
    </div>
              
  </div>
</div>
</template>

<script>
import Registro from '../components/Registro.vue'
 export default {
  name:'Login',
  components:{
    Registro
  },
  data: () => ({
    correoIngresado: null,
    mostrarRegistro: false
  }),
  computed: {
    compararCorreo() {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.correoIngresado);
    },
  },
};
</script>



