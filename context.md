# Contexto del proyecto — Clon de interfaz de Airbnb

## Objetivo
Construir un prototipo educativo del frontend de una plataforma de alojamientos vacacionales inspirada en la experiencia de Airbnb. El propósito es analizar una interfaz conocida, convertir capturas móviles en especificaciones de componentes y desarrollar tres vistas conectadas con Next.js 16, React, TypeScript, Tailwind CSS y App Router. No habrá backend ni reservas reales.

## Usuario y necesidad
El usuario principal es una persona que busca un alojamiento para un viaje. Quiere descubrir opciones, filtrar y ordenar resultados, comparar precios y valoraciones, consultar fotografías y detalles de un alojamiento, y ajustar una reserva simulada. La experiencia debe ser clara y cómoda en un teléfono de 375 px, y adaptarse a pantallas de escritorio desde 768 px.

## Páginas

### 1. Inicio (`/`)
Presenta una barra superior con identidad visual, un campo de búsqueda funcional y controles de usuario. Debajo hay una fila horizontal de categorías (por ejemplo: Playa, Mansiones y Tendencias) que se pueden seleccionar. El contenido principal es una cuadrícula de tarjetas de alojamientos con imagen de muestra, título, ubicación, precio por noche y valoración. La búsqueda filtra por texto en tiempo real; las categorías filtran las tarjetas. Al montar la vista, una carga simulada muestra un estado de carga antes de los resultados.

### 2. Catálogo (`/catalog`)
Muestra el conjunto de alojamientos, el número de resultados y un selector para ordenar por precio ascendente o descendente. Reutiliza las tarjetas de alojamiento de Inicio. Después de las tarjetas aparece un área reservada para un mapa; en móvil es suficiente un placeholder con la palabra «Mapa». El usuario puede entrar al detalle desde cualquier tarjeta sin recarga completa del navegador.

### 3. Detalle de alojamiento (`/rooms/[id]`)
Presenta una galería de imágenes de ejemplo con botones Anterior/Siguiente, el título, la valoración con estrellas, el número de reseñas y la ubicación. Incluye información de un anfitrión ficticio, una cuadrícula de amenidades y una tarjeta de reserva con precio por noche, contador de huéspedes limitado por mínimo/máximo y un botón de llamada a la acción sin pago real. Los datos se cargan de forma simulada al montar la página en función del `id` de la ruta, mostrando un estado de carga. Hay un enlace de regreso al catálogo.

## Inventario de componentes
- `SiteHeader`: marca, búsqueda y acciones superiores.
- `SearchBar`: campo controlado y filtro de texto.
- `CategoryFilter`: lista horizontal de categorías y selección activa.
- `ListingCard`: imagen, título, ubicación, valoración, precio y enlace al detalle; compartido por Inicio y Catálogo.
- `ListingGrid`: cuadrícula responsive de tarjetas.
- `LoadingSkeleton`: indicador visual durante la carga simulada.
- `SortControl`: selector de orden del catálogo.
- `MapPlaceholder`: área visual del mapa.
- `PhotoGallery`: imágenes y controles anterior/siguiente.
- `RoomHeader`: título, estrellas, reseñas y ubicación.
- `HostInfo`: información breve del anfitrión.
- `AmenitiesGrid`: servicios y amenidades.
- `GuestCounter`: cantidad de huéspedes con límites.
- `BookingCard`: precio, huésped y CTA de reserva simulada.

Cada componente tendrá una responsabilidad concreta, se implementará como función con `const` y vivirá en su propio archivo dentro de `/components`, procurando no superar unas 80 líneas de JSX y lógica por archivo. Las interfaces y tipos de los datos principales vivirán en `/types`. Los datos ficticios compartidos podrán organizarse en `/lib`.

## Comportamiento y reglas
- Diseño mobile-first a 375 px y adaptación al escritorio desde 768 px.
- Navegación interna mediante `Link` de Next.js, sin etiquetas `<a href>` para cambiar de ruta.
- Estado React con `useState` para búsqueda, categoría, orden, galería y/o huéspedes.
- `useEffect` para simular carga inicial en Inicio y Detalle, con `setTimeout` y limpieza del temporizador.
- Uso exclusivo de utilidades Tailwind para el diseño; sin librerías de componentes prefabricados.
- Las capturas móviles originales de las tres vistas se analizarán con el agente de IA; sus especificaciones de componentes se añadirán a este documento o como comentarios antes de implementar cada vista.
- No se integrarán backend, autenticación, reservas ni pagos reales. Los alojamientos, las fotografías y los anfitriones serán datos de demostración.

## Organización prevista
- `/app` — rutas `/`, `/catalog`, `/rooms/[id]` y layout global.
- `/components` — componentes reutilizables, uno por archivo.
- `/types` — interfaces TypeScript de alojamientos, habitaciones y datos asociados.
- `/lib` — datos ficticios y funciones auxiliares cuando sean necesarios.
- `context.md` — visión, decisiones y especificaciones derivadas de capturas.

## Criterio de éxito
Las tres rutas funcionan, el diseño es fiel en su estructura a las capturas de referencia, todas las interacciones evaluadas responden correctamente, las cargas simuladas son visibles, las tarjetas se reutilizan entre Inicio y Catálogo, y el proyecto compila sin errores con Next.js 16 y TypeScript.
