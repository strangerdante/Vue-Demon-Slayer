# 🗾 Vue Demon Slayer - Catálogo de Personajes

Una aplicación web moderna desarrollada con Vue.js 3 y Tailwind CSS que muestra un catálogo interactivo de personajes de Demon Slayer con paginación y filtros avanzados.

## ✨ Características

- 📱 **Diseño Responsivo**: Optimizado para móviles, tablets y escritorio
- 🎨 **UI Moderna**: Gradientes, efectos de cristal y animaciones suaves
- 📄 **Paginación**: 6 personajes por página con navegación intuitiva
- 🔍 **Filtros Avanzados**: Filtra por humanos, demonios o ver todos
- ⚡ **Rendimiento Optimizado**: Carga rápida y transiciones fluidas
- 🎯 **Interfaz Intuitiva**: Sidebar deslizable con estadísticas en tiempo real

## 🛠️ Tecnologías Utilizadas

- **Vue.js 3** - Framework JavaScript progresivo
- **Tailwind CSS** - Framework de CSS utility-first
- **Vite** - Herramienta de construcción rápida
- **Vue Router** - Enrutamiento para SPA
- **Font Awesome** - Iconos vectoriales

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Instalación

1. **Instala las dependencias**
   ```bash
   npm install
   ```

2. **Ejecuta el servidor de desarrollo**
   ```bash
   npm run dev
   ```

3. **Abre tu navegador**
   - Ve a `http://localhost:5173`
   - Navega a `/sidebar` para ver el catálogo de personajes

## 📱 Funcionalidades Implementadas

### 🎯 Sistema de Filtros
- **Todos los Personajes**: Muestra los 45 personajes disponibles
- **Solo Humanos**: Filtra únicamente personajes humanos (26 personajes)
- **Solo Demonios**: Filtra únicamente demonios (19 personajes)
- **Estadísticas en Tiempo Real**: Contadores actualizados automáticamente

### 📄 Sistema de Paginación
- **6 Personajes por Página**: Carga optimizada
- **Navegación Intuitiva**: Botones anterior/siguiente
- **Números de Página**: Acceso directo a cualquier página
- **Scroll Automático**: Al cambiar de página, vuelve al inicio

### 🎨 Tarjetas de Personajes
Cada personaje incluye:
- **Imagen de Alta Calidad**: Con efectos hover
- **Información Detallada**: Nombre, edad, género, raza
- **Descripción**: Historia y características del personaje
- **Citas Memorables**: Frases icónicas de cada personaje
- **Badges Visuales**: Indicadores de raza con colores distintivos

## 🔧 Uso de la Aplicación

1. **Accede a la aplicación**: Navega a `/sidebar`
2. **Usa el botón hamburguesa**: Para abrir el sidebar de filtros
3. **Selecciona un filtro**: 
   - "Todos los personajes" - Muestra todos (45)
   - "Humanos" - Solo humanos (26)
   - "Demonios" - Solo demonios (19)
4. **Navega entre páginas**: Usa los controles de paginación
5. **Explora personajes**: Haz hover sobre las tarjetas para efectos visuales

## 📂 Estructura del Proyecto

```
src/
├── components/
│   ├── Contenido.vue      # Componente principal con grid de personajes
│   ├── Sidebar.vue       # Barra lateral con filtros y navegación
│   ├── Navbar.vue        # Barra de navegación superior
│   └── InicioSesion.vue   # Página de inicio de sesión
├── router.js             # Configuración de rutas
├── main.js              # Punto de entrada de la aplicación
├── style.css            # Estilos globales y Tailwind
└── App.vue              # Componente raíz

personajes_demon_slayer.json  # Base de datos de personajes
```

## 🎨 Características de Diseño

### Paleta de Colores
- **Primarios**: Púrpura, Rosa, Cyan
- **Fondos**: Gradientes oscuros con transparencias
- **Acentos**: Efectos de cristal y bordes sutiles

### Animaciones
- **Hover Effects**: Escalado y cambios de color suaves
- **Transiciones**: Movimientos fluidos entre estados
- **Loading States**: Indicadores visuales de carga

### Tipografía
- **Font Family**: Inter, system-ui, sans-serif
- **Jerarquía Visual**: Diferentes tamaños y pesos para contenido
- **Legibilidad**: Alto contraste y espaciado optimizado

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Adaptaciones por Dispositivo
- **Mobile**: Sidebar overlay, grid de 1 columna
- **Tablet**: Grid de 2 columnas, navbar compacto
- **Desktop**: Grid de 3 columnas, sidebar fijo

## 🔧 Personalización

### Agregar Nuevos Personajes
1. Edita el archivo `personajes_demon_slayer.json`
2. Añade el nuevo personaje siguiendo la estructura existente:
   ```json
   {
     "id": 46,
     "name": "Nombre del Personaje",
     "age": 25,
     "gender": "Masculino/Femenino",
     "race": "Humano/Demonio",
     "description": "Descripción del personaje...",
     "img": "URL_de_la_imagen",
     "quote": "Cita memorable..."
   }
   ```

### Modificar Filtros
Los filtros se pueden personalizar en `Sidebar.vue`:
- Añadir nuevas categorías
- Modificar contadores
- Cambiar estilos de los botones

### Personalizar Paginación
En `Contenido.vue` puedes modificar:
- `personajesPorPagina`: Cantidad de personajes por página
- Lógica de navegación
- Estilos de los botones de paginación

## 🐛 Solución de Problemas

### Problemas Comunes

1. **Imágenes no cargan**
   - Verifica la conexión a internet
   - Las imágenes tienen fallback automático

2. **Filtros no funcionan**
   - Verifica que el JSON esté correctamente formateado
   - Revisa la consola del navegador por errores

3. **Estilos no se aplican**
   - Asegúrate de que Tailwind CSS esté configurado
   - Verifica que Font Awesome se haya cargado

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- **Demon Slayer API** - Por proporcionar los datos de los personajes
- **Tailwind CSS** - Por el framework de CSS
- **Vue.js Community** - Por la documentación y recursos
- **Font Awesome** - Por los iconos vectoriales

---

**¡Disfruta explorando el mundo de Demon Slayer! 🗾⚔️**

