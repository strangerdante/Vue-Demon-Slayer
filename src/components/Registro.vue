<template>
  <div class="flex flex-wrap">
  <form class="max-w-md mx-auto p-8">
    <div class="mb-4">
      <div class="flex items-center mb-2 text-white">
        <label for="person-type" class="mr-2">Tipo de persona:</label>
        <div>
          <label class="inline-flex items-center">
            <input type="radio" id="natural" name="person-type" value="natural" checked v-model="opcionSeleccionada">
            <span class="ml-2">Natural</span>
          </label>
        </div>
        <div>
          <label class="inline-flex items-center ml-6">
            <input type="radio" id="juridica" name="person-type" value="juridica" v-model="opcionSeleccionada">
            <span class="ml-2">Jurídica</span>
          </label>
        </div>
      </div>
    </div>
    <div class="mb-4" v-if="opcionSeleccionada === 'natural'">
      <label for="name" class="block text-white mb-1">Nombre</label>
      <input type="text" id="name" name="name" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gris" required>
    </div>
    <div class="mb-4" v-if="opcionSeleccionada === 'natural'">
      <label for="last-name" class="block text-white mb-1">Apellidos</label>
      <input type="text" id="last-name" name="last-name" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gris" required>
    </div>
    <div class="mb-4" v-if="opcionSeleccionada === 'juridica'">
      <label for="name" class="block text-white mb-1">Razon social</label>
      <input type="text" id="name" name="name" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gris" required>
    </div>
    <div class="mb-4" v-if="opcionSeleccionada === 'juridica'">
      <label for="last-name" class="block text-white mb-1">Nit</label>
      <input type="text" id="last-name" name="last-name" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gris" required>
    </div>    
    <div class="mb-4">
      <label for="phone" class="block text-white mb-1">Teléfono</label>
      <input type="tel" id="phone" name="phone" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gris" required>
    </div>

    <div class="mb-4">
      <label for="email" class="block text-white mb-1">Email</label>
      <input type="email" id="email" name="email" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gris" required>
    </div>
    <div class="mb-4">
      <label for="password" class="block text-white mb-1">Contraseña</label>
      <input type="password" id="password" name="password" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gris" required>
    </div>
    <div class="mb-4">
      <label for="confirm-password" class="block text-white mb-1">Confirmar contraseña</label>
      <input type="password" id="confirm-password" name="confirm-password" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gris" required>
    </div>
    <router-link to="/sidebar">
    <div class="mt-6">
      <button type="submit" class="bg-rosa-brillante hover:bg-morado-electrico text-morado-oscuro w-full py-2 px-3 rounded">
        Registrar
      </button>
    </div>
    </router-link>

    <div class="hidden">
  <!-- Bloque texto con linea  -->
    <div class="flex items-center mt-6">
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
          <a class="inline-block align-baseline font-bold text-sm text-white hover:text-morado-electrico " href="#">
              ¿Quieres registrarte?  <span class="text-rosa-brillante"> Registrate </span>
          </a>
      </div>

  </div>
  </form>
</div>
</template>

<script>
export default {
  name: 'Registro',
  data() {
    return {
      opcionSeleccionada: 'natural',
    };
  }
};
</script>

