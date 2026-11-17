import { createRouter, createWebHistory } from "vue-router";
import InicioSesion from "./components/InicioSesion.vue";
import PaginaPersonajes from "./components/PaginaPersonajes.vue";
import { obtenerSesion } from "./auth";
import { personajes } from "./personajes";

const routes = [
  {
    path: "/",
    name: "login",
    component: InicioSesion,
    meta: { titulo: "Iniciar sesión", soloInvitados: true },
  },
  {
    path: "/personajes/:id(\\d+)?",
    name: "personajes",
    component: PaginaPersonajes,
    meta: { titulo: "Personajes", requiereSesion: true },
  },
  // Compatibilidad con la ruta antigua
  { path: "/sidebar", redirect: "/personajes" },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, guardada) {
    // Abrir/cerrar el detalle de un personaje no debe mover la lista
    if (to.name === from.name) return false;
    return guardada || { top: 0 };
  },
});

router.beforeEach((to) => {
  const sesion = obtenerSesion();
  if (to.meta.requiereSesion && !sesion) return { name: "login" };
  if (to.meta.soloInvitados && sesion) return { name: "personajes" };
});

router.afterEach((to) => {
  const id = Number(to.params.id);
  const personaje = id && personajes.find((p) => p.id === id);
  document.title = personaje
    ? `${personaje.name} · Demon Slayer`
    : to.meta.titulo
    ? `${to.meta.titulo} · Demon Slayer`
    : "Demon Slayer · Archivo de personajes";
});

export default router;
