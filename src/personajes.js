import datos from "../personajes_demon_slayer.json";

export const personajes = datos.personajes;

// Filtros disponibles (compartidos por la barra de herramientas y el panel lateral)
export const FILTROS = [
  { id: "todos", etiqueta: "Todos", etiquetaLarga: "Todos los personajes", punto: "bg-fuji-400", prueba: () => true },
  { id: "humano", etiqueta: "Humanos", etiquetaLarga: "Humanos", punto: "bg-jade-400", prueba: (p) => p.race === "Humano" },
  { id: "demonio", etiqueta: "Demonios", etiquetaLarga: "Demonios", punto: "bg-beni-400", prueba: (p) => p.race === "Demonio" },
  { id: "hashira", etiqueta: "Hashira", etiquetaLarga: "Hashira (Pilares)", punto: "bg-kin-400", prueba: (p) => p.affiliation_id === 2 },
];

export const conteoPorFiltro = Object.fromEntries(
  FILTROS.map((f) => [f.id, personajes.filter(f.prueba).length])
);

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
