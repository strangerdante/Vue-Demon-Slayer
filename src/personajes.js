import datos from "../personajes_demon_slayer.json";

export const personajes = datos.personajes;

// Filtros disponibles en la barra de herramientas
export const FILTROS = [
  { id: "todos", etiqueta: "Todos", punto: "bg-fuji-400", prueba: () => true },
  { id: "humano", etiqueta: "Humanos", punto: "bg-jade-400", prueba: (p) => p.race === "Humano" },
  { id: "demonio", etiqueta: "Demonios", punto: "bg-beni-400", prueba: (p) => p.race === "Demonio" },
  { id: "hashira", etiqueta: "Hashira", punto: "bg-kin-400", prueba: (p) => p.affiliation_id === 2 },
  // "favoritos" depende del usuario: recibe la lista de ids favoritos como segundo argumento
  { id: "favoritos", etiqueta: "Favoritos", icono: "fas fa-heart text-beni-400", prueba: (p, favoritos) => favoritos.includes(p.id) },
];

export const IDS_FILTROS = FILTROS.map((f) => f.id);

export function contarPorFiltro(favoritos = []) {
  return Object.fromEntries(
    FILTROS.map((f) => [f.id, personajes.filter((p) => f.prueba(p, favoritos)).length])
  );
}

// Nombres de las afiliaciones según affiliation_id de la API
export const AFILIACIONES = {
  1: "Cuerpo de Cazadores y aliados",
  2: "Hashira",
  3: "Ex Hashira",
  4: "Muzan y las Lunas Demoníacas",
  5: "Familia Araña",
  6: "Demonio sin rango",
};

// Quita acentos y pasa a minúsculas para comparar búsquedas
export function normalizar(texto = "") {
  return texto
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}
