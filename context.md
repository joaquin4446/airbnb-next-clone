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

## Especificación visual — Home — Captura móvil 375 px

### Alcance y nivel de certeza

- **Dato verificable del archivo:** la imagen `airbnb-home-mobile.png` fue proporcionada como referencia. La herramienta que pudo abrirla reportó dimensiones de **393 × 687 px**; por tanto, la imagen fuente no mide exactamente 375 px de ancho. La implementación se especificará y probará a 375 px, que es el ancho base solicitado.
- **Limitación de inspección:** en esta sesión no fue posible leer visualmente los píxeles ni el texto de la captura. Para no inventar detalles, no se atribuyen a la imagen colores exactos, orden visible, textos, medidas, imágenes ni iconos. La descripción funcional previa de este documento y los requisitos académicos sirven para la **propuesta**, pero no se consideran observaciones de la captura.
- Las decisiones debajo se identifican como **Propuesta académica (pendiente de cotejar con la captura)**. Para una réplica visual exacta, hace falta volver a adjuntar una versión visible de la imagen.

### Observaciones de la referencia

| Elemento | Observación verificable |
| --- | --- |
| Archivo | Referencia proporcionada como `airbnb-home-mobile.png`. |
| Dimensiones reportadas | 393 × 687 px. |
| Vista a especificar | Home móvil; ancho de implementación solicitado: 375 px. |
| Composición, textos, colores, tipografía, imágenes, iconos y espaciado | No verificables en esta sesión; no se presentan como rasgos observados. |

### Propuesta académica de composición mobile-first

Orden propuesto para el flujo vertical: **`HomePage` → `SiteHeader` (marca y controles) → `SearchBar` → `CategoryFilter` → `ListingGrid` → `ListingCard` por alojamiento**. El estado de carga reemplaza temporalmente el contenido de la cuadrícula; el estado sin coincidencias conserva los controles y muestra un mensaje. No se propone una barra inferior fija porque no puede confirmarse en la imagen.

- **Lienzo:** ancho completo; contenido fluido a 375 px, sin scroll horizontal. Fondo blanco o gris casi blanco. Márgenes laterales de referencia propuestos: 16–24 px; espacios verticales entre bloques: 16–24 px.
- **Cabecera:** marca/logotipo a la izquierda y acciones compactas a la derecha; búsqueda en un control identificable, con área táctil aproximada de 44 px o superior. Si el ancho móvil no permite mantener marca, búsqueda e iconos en una línea legible, la búsqueda pasa a una segunda fila; confirmar la disposición exacta al cotejar la captura.
- **Categorías:** fila desplazable horizontalmente, sin ajustar todas las opciones a la fuerza ni ensanchar la página. Cada opción combina icono sencillo y etiqueta; la activa se diferencia con contraste y un indicador inferior o borde. Ocultar visualmente la barra de scroll sin deshabilitar el gesto.
- **Tarjetas:** una columna en móvil, ancho disponible y separación vertical de aproximadamente 24–32 px. Propuesta: foto panorámica con relación cercana a 1:1, esquinas redondeadas; control de favorito superpuesto; título/ubicación en bloque de texto y precio por noche y valoración en línea o filas próximas. La proporción y la superposición del favorito deben validarse con la captura real.
- **Tipografía y color (propuestos, no muestreados):** sans-serif legible; encabezados y título de alojamiento con peso semibold, metadatos secundarios en gris medio, texto principal casi negro. Usar una paleta neutra con un acento coral/rojo para acciones destacadas; no asumir códigos de color exactos de Airbnb. Priorizar contraste accesible y jerarquía por tamaño/peso en lugar de color solamente.
- **Desde 768 px:** ampliar el contenedor, conservar cabecera y filtros, y pasar la cuadrícula a varias columnas; propuesta inicial de 2 columnas en tablet y 3–4 en escritorio según ancho disponible. No fijar alturas de tarjetas: mantenerlas fluidas y consistentes mediante proporción de imagen.

### Componentes y responsabilidades

Todos los nombres son propuestos. En la implementación, cada componente tendrá su propio archivo bajo `/components`, será funcional y se declarará con `const`. Los tipos compartidos se ubicarán en `/types`; los datos de demostración y funciones puras podrán vivir en `/lib`.

| Componente | Responsabilidad | Props propuestas | Interacciones / notas |
| --- | --- | --- | --- |
| `HomePage` (`app/page.tsx`) | Componer la página y coordinar el ciclo de carga y filtros. No es componente compartido de presentación. | No requiere props de ruta. | `useState` para búsqueda, categoría, carga y alojamientos cargados; `useEffect` inicia el temporizador de carga y lo limpia al desmontar. Filtrado derivado de los datos y estados actuales; no duplicar resultados filtrados en estado. |
| `SiteHeader` | Estructurar marca, acceso a búsqueda y acciones de usuario en la cabecera. | `brandName: string`; `query: string`; `onQueryChange: (value: string) => void`; `onSearchSubmit?: () => void`; opcionalmente `actions: HeaderAction[]`. | Cambios del campo se notifican al padre. Los botones de menú/perfil son controles accesibles; en prototipo pueden abrir un menú simple o quedar como acciones explícitamente no implementadas. |
| `SearchBar` | Renderizar un campo de búsqueda controlado, etiqueta/placeholder accesible y botón de limpiar cuando haya texto. Puede componerse dentro de `SiteHeader`. | `value: string`; `onChange: (value: string) => void`; `placeholder?: string`; `onSubmit?: () => void`. | Actualiza el texto en cada `onChange` para filtrar en tiempo real. Enter/botón envía búsqueda si se implementa; limpiar restaura todos los resultados de la categoría activa. |
| `CategoryFilter` | Presentar y seleccionar categorías en una banda horizontal. | `categories: Category[]`; `activeCategoryId: string`; `onCategoryChange: (id: string) => void`. | Un solo filtro activo; botones con `aria-pressed`, foco visible y scroll horizontal táctil. La opción «Todas» desactiva el filtro por categoría. |
| `ListingGrid` | Distribuir resultados y manejar variantes visuales de carga y vacío. | `listings: Listing[]`; `isLoading: boolean`; `emptyMessage?: string`. | No administra filtros; presenta `LoadingSkeleton` durante la carga, mensaje de vacío sin coincidencias o mapa de tarjetas. Grid de 1 columna en móvil y varias desde 768 px. |
| `ListingCard` | Mostrar resumen seleccionable de un alojamiento y enlazar al detalle. Reutilizable en `/catalog`. | `listing: Listing`; `href: string`; opcionalmente `onFavoriteToggle?: (listingId: string) => void`; `isFavorite?: boolean`. | El enlace principal navega con `Link` de Next.js a `/rooms/[id]`; el botón de favorito no debe anidar un botón dentro del enlace. Foto con texto alternativo, título, ubicación, valoración/estrellas y precio por noche. |
| `RatingStars` | Representar valoración numérica con estrellas, desacoplando la tarjeta del detalle. | `rating: number`; `reviewCount?: number`; `size?: "sm" \| "md"`; `showCount?: boolean`. | Presentación sin estado; proporcionar etiqueta accesible con la nota y reseñas. Reutilizable en tarjeta y detalle. |
| `LoadingSkeleton` | Comunicar carga simulada sin presentar tarjetas como contenido real. | `count?: number`; opcionalmente `variant?: "listing"`. | Sin interacción. Usar bloques con proporciones similares a las tarjetas, animación sutil opcional y `aria-busy`/texto accesible de carga. |
| `EmptyState` | Explicar que la búsqueda/filtro no encontró alojamientos y ofrecer recuperación. | `title: string`; `description?: string`; `onClearFilters?: () => void`. | Botón opcional limpia consulta y categoría mediante callback. |

### Jerarquía prevista

```text
HomePage (app/page.tsx; coordina estados y datos)
├── SiteHeader
│   └── SearchBar
├── CategoryFilter
└── ListingGrid
    ├── LoadingSkeleton (mientras isLoading)
    ├── EmptyState (si no hay coincidencias)
    └── ListingCard × N
        └── RatingStars
```

`ListingGrid` muestra exactamente una de sus variantes: carga, vacío o lista. `SiteHeader` y `CategoryFilter` permanecen disponibles mientras se cargan los resultados, según propuesta. `ListingCard` encapsula la presentación de cada resultado y se comparte con Catálogo; datos, filtros y estado de carga pertenecen a la página o a una capa superior, no a la tarjeta.

### Estado, filtros y carga simulada

- `query: string`: texto controlado del buscador. Coincidencia insensible a mayúsculas sobre título, ubicación y categoría; filtrar en cada cambio sin botón obligatorio.
- `activeCategoryId: string`: identificador seleccionado, inicialmente el de «Todas». El filtrado por categoría se combina con la búsqueda mediante AND.
- `isLoading: boolean`: comienza en `true`; `useEffect` configura `setTimeout` para simular la respuesta y cambia a `false`. Retornar `clearTimeout` en la limpieza. La duración es solo demostrativa (propuesta: 500–900 ms), no un requisito visual de la captura.
- `listings: Listing[]`: puede residir en estado si se simula carga asíncrona; si los datos se importan sin demora, derivar el subconjunto filtrado y no mutar la fuente.
- Favoritos son opcionales para esta etapa: si se implementan, mantener un `Set<string>` de IDs en estado de página y pasarlo a cada tarjeta. No se infiere la presencia del corazón en la captura.
- Accesibilidad: etiqueta del campo de búsqueda, botones nativos, estado seleccionado anunciado, foco visible, texto alternativo en fotografías y aviso de carga/vacío comprensible sin depender solo de iconos.

### Interfaces TypeScript y datos ficticios propuestos

Ubicación sugerida: `/types/listing.ts` y `/lib/listings.ts`. Usar IDs estables y URL de imagen local o de fuente aprobada por `next/image`; preparar imágenes de ejemplo dentro de `public/` para evitar depender de un backend.

```ts
export interface Category {
  id: string; // "all", "beach", "cabins"…
  label: string;
  icon?: string; // clave de icono para un mapa local, no SVG arbitrario
}

export interface Listing {
  id: string;
  title: string;
  location: string;
  categoryId: string;
  imageUrl: string;
  imageAlt: string;
  pricePerNight: number;
  currency: "EUR" | "USD";
  rating: number;
  reviewCount: number;
}

export interface HeaderAction {
  id: string;
  label: string;
  icon: string;
}
```

Semillas ilustrativas (contenido inventado, no transcrito de la referencia): «Casa luminosa junto al mar» / Cádiz / playa / 128 EUR / 4.92; «Cabaña entre montañas» / Huesca / cabañas / 96 EUR / 4.87; «Apartamento en el centro» / Madrid / ciudad / 112 EUR / 4.78. Completar cada entrada con `id`, recuento de reseñas e imagen local de demostración con texto alternativo. Mantener imágenes, precios y ubicaciones claramente ficticios y coherentes con `Listing`.

### Reutilización prevista en Catálogo y Detalle

- **Catálogo:** reutiliza `ListingCard`, `RatingStars` y el modo de cuadrícula de `ListingGrid`. Catálogo conserva fuera de la tarjeta su ordenación por precio, conteo, estado de orden y `MapPlaceholder`; Home no necesita estos controles. La lista ya ordenada se pasa a la cuadrícula.
- **Detalle:** reutiliza `RatingStars` para la nota y reseñas. No reutiliza `ListingCard` como estructura principal: Detalle necesita galería, información del anfitrión, amenidades y reserva. Puede usar el mismo `Listing` como resumen o ampliar a tipos de detalle después.
- Mantener la tarjeta independiente de dónde proviene la lista y darle un `href` o identificador de destino para que no dependa de estados internos de Home.

### Pendiente antes de implementar fidelidad visual

Volver a inspeccionar la imagen visible y sustituir/confirmar las hipótesis visuales: composición exacta de la cabecera y búsqueda, etiquetas y orden de categorías, cantidad de tarjetas visibles, proporción y recorte de fotos, presencia/posición de favoritos, textos, tipografía, colores, radios y márgenes. Esta sección define arquitectura y comportamiento; sus medidas visuales son una guía inicial, no una medición de la captura.
