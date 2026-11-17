// Utilidades de sesión (demo: los datos viven en localStorage del navegador).
const CLAVE_SESION = "sesionActual";

export function obtenerSesion() {
  try {
    const sesion = JSON.parse(localStorage.getItem(CLAVE_SESION));
    return sesion?.activo ? sesion : null;
  } catch {
    return null;
  }
}

export function iniciarSesion(usuario) {
  localStorage.setItem(
    CLAVE_SESION,
    JSON.stringify({ usuario, fechaLogin: new Date().toISOString(), activo: true })
  );
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION);
}
