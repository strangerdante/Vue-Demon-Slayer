import { createRouter, createWebHistory } from "vue-router";
import InicioSesion from "./components/InicioSesion.vue";
import Sidebar from "./components/Sidebar.vue";

const routes = [
  { path: "/", component: InicioSesion },
  { path: "/sidebar", component: Sidebar },
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;