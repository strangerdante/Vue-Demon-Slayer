// Favoritos por usuario, guardados en localStorage y compartidos de forma reactiva
// entre la cuadrícula, la ficha del personaje y el menú de usuario.
import { reactive } from "vue";
import { obtenerSesion } from "./auth";

const estado = reactive({ usuario: null, ids: [] });

const clave = (usuario) => `favoritos:${usuario.toLowerCase()}`;

// Recarga la lista si cambió el usuario de la sesión (p. ej. tras cerrar sesión y entrar con otro)
function sincronizarUsuario() {
  const usuario = obtenerSesion()?.usuario || null;
  if (usuario === estado.usuario) return;
  estado.usuario = usuario;
  try {
    estado.ids = usuario ? JSON.parse(localStorage.getItem(clave(usuario))) || [] : [];
  } catch {
    estado.ids = [];
  }
}

function guardar() {
  if (estado.usuario) localStorage.setItem(clave(estado.usuario), JSON.stringify(estado.ids));
}

export function usarFavoritos() {
  sincronizarUsuario();
  return estado;
}

export function esFavorito(id) {
  return estado.ids.includes(id);
}

export function alternarFavorito(id) {
  sincronizarUsuario();
  estado.ids = esFavorito(id) ? estado.ids.filter((x) => x !== id) : [...estado.ids, id];
  guardar();
}
