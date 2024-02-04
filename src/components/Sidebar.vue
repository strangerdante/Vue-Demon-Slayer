<template>
   <div class="h-screen bg-black">
     <button @click="toggleSidebar" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
       <span class="sr-only">Open sidebar</span>
       <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
       </svg>
     </button>
 
     <aside @click="toggleSidebar" id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform" aria-label="Sidebar" :class="{ '-translate-x-full': !sidebarOpen, 'translate-x-0': sidebarOpen }">
    <div class="h-full px-3 py-2 overflow-y-auto bg-morado-oscuro dark:morado-oscuro">
       <ul class="space-y-2 font-medium">
          <li class="mb-6 flex items-center font-bold text-lg">
          <img src="../assets/logo.png" alt="Logo" class="mr-4">
          <h1 class="text-white ">anime<span class="text-morado-electrico">yabu.</span></h1>
          </li>
 
          <li>
             <span class="ml-2 text-white font-bold">Categorias</span>
          </li>
          <li>
             <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-rosa-brillante dark:hover:bg-rosa-brillante">
                <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                <span class="flex-1 ml-3 whitespace-nowrap">Ver todas</span>
                <span class="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-white bg-morado-electrico rounded-full">3</span>
             </a>
          </li>
          <li>
             <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-rosa-brillante dark:hover:bg-rosa-brillante">
                <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                <span class="flex-1 ml-3 whitespace-nowrap">Crear</span>
             </a>
          </li>
 
          <li>
             <router-link to="/" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-rosa-brillante dark:hover:bg-rosa-brillante">
                <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"></path></svg>
                <span class="flex-1 ml-3 whitespace-nowrap font-bold">Cerrar sesion</span>
             </router-link>
          </li>
       </ul>
    </div>
     </aside>
 
 <div class="p-4 sm:ml-64">
    <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
       <div class="grid grid-cols-3 gap-4 mb-4">
          <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-morado-oscuro hover:bg-rosa-brillante">
             <p class="text-sm md:text-2xl text-gray-400 dark:text-white">ACCION</p>
          </div>
          <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-morado-oscuro  hover:bg-rosa-brillante">
             <p class="text-sm md:text-2xl text-gray-400 dark:text-white">AVENTURA</p>
          </div>
          <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-morado-oscuro  hover:bg-rosa-brillante">
             <p class="text-sm md:text-2xl text-gray-400 dark:text-white">COMEDIA</p>
          </div>
       </div>
       <div class="grid grid-cols-3 gap-4 mb-4">
          <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-morado-oscuro  hover:bg-rosa-brillante">
             <p class="text-sm md:text-2xl text-gray-400 dark:text-white">TERROR</p>
          </div>
          <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-morado-oscuro  hover:bg-rosa-brillante">
             <p class="text-sm md:text-2xl text-gray-400 dark:text-white">ROMANCE</p>
          </div>
          <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-morado-oscuro  hover:bg-rosa-brillante">
             <p class="text-sm md:text-2xl text-gray-400 dark:text-white">MISTERIO</p>
          </div>
       </div>
    </div>
 </div>
   </div>
 </template>
 
 <script>
 export default {
   name: 'Sidebar',
   data() {
     return {
       sidebarOpen: false
     };
   },
   methods: {
     toggleSidebar() {
       this.sidebarOpen = !this.sidebarOpen;
     }
   }
 };
 </script>
 
 <style scoped>
 /* Estilos del sidebar */
 </style>