<template>
  <div class="flex">
    <div class="w-full lg:w-1/2 h-screen md:bg-gradient-to-t from-black to-morado-electrico bg-black  box-sizing: border-box">
      
      <!-- Contenido de la primera parte -->
      <Login/>
    <router-view></router-view>
    </div>
    <div class="hidden lg:block lg:w-1/2 h-screen bg-morado-oscuro box-sizing: border-box">
      
      <!-- Contenido de la segunda parte -->
      <Carousel/>
      
    </div>
  </div>
</template>>

<script>
  import Swal from 'sweetalert2'
  import Carousel from '../components/Carousel.vue';
  import Login from '../components/Login.vue'; 
  import Registro from '../components/Registro.vue'; 
  export default {
    name:'InicioSesion',
    components: {
      Carousel,
      Login,
      Registro,
    },
    data() {
      return{
        mensaje:'Hola como estas'
      }
    },

    methods: {
      showAlert() {
        Swal.fire({
          title: 'Titulo ventana',
          text: 'Has hecho exitosamente click en el boton',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
      }
    }

  }
</script>

<style scoped>

</style>

  