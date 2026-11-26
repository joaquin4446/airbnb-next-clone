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

## Especificación visual — Catálogo — Captura móvil 375 px

### Alcance y certeza de la referencia

- **Archivo proporcionado:** `airbnb-catalog-mobile.png`. Al abrir el archivo local, el navegador informa dimensiones de **373 × 691 px**; la implementación académica se comprobará a 375 px.
- **Límite de inspección de esta sesión:** aunque se pudo abrir el archivo, el visor disponible no entrega los píxeles de la imagen al modelo. Por ello no es posible confirmar visualmente textos, cantidad de tarjetas visibles, colores, posición de controles, tipografía, espaciados ni presencia de elementos opcionales. No deben describirse como observaciones ni inventarse medidas exactas.
- La sección especifica la arquitectura obligatoria y una propuesta de presentación compatible con Home. La propuesta debe cotejarse con la captura visible antes de buscar fidelidad pixel a pixel. Los requisitos académicos se distinguen expresamente de lo que la imagen deja verificar.

### Descripción y estructura propuesta

El Catálogo es una página de resultados independiente de Home, bajo la ruta `/catalog`. En móvil presenta un flujo de una columna, legible y desplazable verticalmente. La jerarquía funcional propuesta es: encabezado compacto del catálogo con cantidad de resultados; control de ordenación por precio y acceso a filtros; lista de alojamientos reutilizando las tarjetas existentes; y un placeholder de mapa con la etiqueta **«Mapa»** en la parte inferior. El encabezado global `SiteHeader` no se reutiliza por defecto: contiene búsqueda y menú de Home, mientras que Catálogo necesita su propio encabezado de resultados. Si la captura evidencia que comparte marca/cabecera, esa decisión visual se ajustará al verificarla.

**No verificable en la captura con las herramientas de esta sesión:** orden visual exacto de los controles, número de resultados mostrado, control de filtros concreto, contenido que queda dentro del primer pliegue, relación de aspecto de las imágenes, ubicación del selector de orden, colores y tipografía. Los elementos de orden, conteo, tarjetas, mapa y navegación son requisitos del ejercicio, no afirmaciones sobre lo observado en la imagen. El control de filtros puede ser una acción visual accesible sin funcionalidad adicional, salvo que posteriormente se solicite implementar filtros.

### Tabla de componentes, responsabilidades y props

Los componentes propios nuevos se crearán dentro de `/components`, como funciones declaradas con `const`, con Tailwind CSS para toda la presentación y archivos acotados a una responsabilidad. Las props son contratos propuestos, no código implementado.

| Componente | Estado | Responsabilidad | Props / contrato propuesto |
| --- | --- | --- | --- |
| `CatalogPage` (`app/catalog/page.tsx`) | Nuevo | Coordinar los datos ficticios, orden, conteo y composición de la página. Será Client Component si contiene el `useState` de ordenación; puede delegar ese estado a `CatalogResults` para mantener la página de composición sencilla. | Sin props de ruta. Consume `demoListings` desde `/lib/listings`. |
| `CatalogHeader` | Nuevo | Mostrar el título o contexto de resultados y el total derivado del conjunto actualmente mostrado; no duplicar el encabezado de Home. | `resultCount: number`; opcional `title?: string`. |
| `CatalogToolbar` | Nuevo | Agrupar el selector de ordenación y una acción de filtros si la captura/requisito visual lo necesita. Mantener controles con etiquetas y objetivos táctiles accesibles. | `sortOrder: SortOrder`; `onSortChange: (order: SortOrder) => void`; opcional `onFilterClick?: () => void`. |
| `SortControl` | Nuevo, mencionado en el inventario general | Permitir seleccionar precio ascendente o descendente. Puede ser `select` nativo accesible o botones segmentados, decidido al verificar la referencia; ambas opciones deben conservar la semántica de orden. | `value: SortOrder`; `onChange: (value: SortOrder) => void`. Tipo recomendado: `type SortOrder = "price-asc" \| "price-desc"`. |
| `ListingGrid` | Existente | Renderizar las tarjetas en cuadrícula responsive. Su interfaz actual requiere `listings`, `isLoading`, `onClearFilters`, `favoriteIds` y `onFavoriteToggle`; el Catálogo puede pasar `isLoading={false}` y callbacks/estado de favoritos apropiados. Si se desea un modo catálogo sin estado vacío de filtros, evaluar luego una extensión compatible y opcional, sin romper Home. | Interfaz existente: `listings: Listing[]`; `isLoading: boolean`; `onClearFilters: () => void`; `favoriteIds: Set<string>`; `onFavoriteToggle: (listingId: string) => void`. |
| `ListingCard` | Existente | Presentar alojamiento, imagen, texto, precio, nota y favorito; navegación interna con `Link` a `/rooms/${listing.id}`. Reutilizar sin copiar su marcado ni estilos. | Interfaz existente: `listing: Listing`; `isFavorite?: boolean`; `onFavoriteToggle?: (listingId: string) => void`. El enlace se construye actualmente dentro de la tarjeta a partir de `listing.id`. |
| `MapPlaceholder` | Nuevo | Reservar una zona identificable para mapa después de los resultados; en esta etapa solo requiere mostrar la palabra «Mapa», sin mapa interactivo ni dependencia externa. | Opcional `label?: string`, por defecto «Mapa». Presentación accesible como región con nombre. |

### Jerarquía de componentes propuesta

```text
app/catalog/page.tsx (CatalogPage; proveedor de datos y estado de orden)
└── CatalogResults (opcional, si se separa la lógica interactiva)
  ├── CatalogHeader (número de resultados)
  ├── CatalogToolbar
  │   ├── SortControl (precio ascendente / descendente)
  │   └── acción de filtros (solo si corresponde a la referencia)
  ├── ListingGrid (lista ya ordenada)
  │   └── ListingCard × N
  │       └── RatingStars
  └── MapPlaceholder («Mapa»)
```

`CatalogResults` es una extracción opcional para separar presentación y estado si `CatalogPage` supera el umbral de complejidad del proyecto. No es requisito añadir una capa de abstracción si una página breve puede coordinar los datos y `useState` claramente.

### Estado React y derivación de resultados

- Estado mínimo obligatorio: `sortOrder: SortOrder`, iniciado en `"price-asc"` o en la opción de orden por defecto que se confirme con la captura. El selector actualiza el estado con `useState`.
- `sortedListings` debe derivarse de `demoListings` y `sortOrder` (por ejemplo con `useMemo`, o directamente si el conjunto es pequeño). Orden ascendente compara `pricePerNight` de menor a mayor; descendente, de mayor a menor. No mutar el array compartido: copiar antes de ordenar o trabajar sobre una copia.
- El contador se deriva de la lista que efectivamente se muestra: `sortedListings.length`. El orden no cambia el total. No hace falta estado separado para el conteo.
- Los alojamientos actuales de `/lib/listings.ts` ya son datos ficticios compatibles con `Listing`: ocho entradas con `id`, título, ubicación, categoría, `pricePerNight`, valoración, recuento de reseñas e imagen local/alt. La implementación de Catálogo debe consumir esta fuente y no duplicar fixtures ni introducir backend.
- Favoritos: son opcionales para el requisito de Catálogo. Si se desea que el botón de `ListingCard` funcione también aquí, usar `favoriteIds: Set<string>` y `toggleFavorite` en Catálogo; alternativamente, proporcionar un `Set` vacío y callback seguro. No añadir búsqueda/categorías de Home como estado de Catálogo salvo una solicitud posterior.
- No se requiere `useEffect` ni carga simulada para Catálogo: el enunciado solo requiere datos ficticios locales y ordenación con `useState`.

### Comportamientos interactivos y requisitos académicos

1. La ruta App Router será `/catalog`, implementada en `app/catalog/page.tsx` y navegable como ruta propia.
2. Mostrar el número de resultados de la colección visible, actualizado si en otra iteración se agregan filtros.
3. Permitir cambiar entre precio ascendente y descendente. El orden se refleja inmediatamente en la lista y el control expone su valor/estado accesiblemente.
4. Reutilizar `ListingCard` de Home: no copiar su markup. Las tarjetas existentes navegan con `next/link` a `/rooms/${listing.id}` y muestran imagen/alt, título, ubicación, rating, precio y acción de favorito.
5. El Catálogo pasa la colección ordenada a una cuadrícula responsive; el estado de orden no se guarda dentro de cada tarjeta.
6. Después de la lista se renderiza `MapPlaceholder`, visible con el texto «Mapa». Es solo un espacio representativo; no integrar mapas ni instalar paquetes.
7. Mantener los enlaces de tarjetas como navegación interna mediante `Link`; no usar `<a href>` convencional para navegación de la aplicación.
8. Si el toolbar incluye un botón «Filtros», dejar claro si es solo visual o implementar únicamente una interacción explícitamente requerida. No sugerir que aplica filtros funcionales inexistentes.

### Reglas responsive y dirección visual

- Mobile-first, probado en 375 px (la referencia disponible reporta 373 px). Una sola columna de tarjetas y flujo vertical; nada debe provocar overflow horizontal a nivel de documento.
- Mantener márgenes laterales y separación coherentes con Home y `ListingGrid` existente (`px-5`, `gap-y-8` como base disponible), salvo que el cotejo de la captura indique otros valores. El control de orden debe caber en el viewport y poder operarse táctilmente.
- En ancho mayor, aprovechar la cuadrícula que ya tiene `ListingGrid`: una columna por defecto, dos desde `sm`, tres desde `xl` y cuatro desde `2xl`. Confirmar con una prueba de escritorio que el encabezado, control de orden y zona de mapa siguen legibles; no fijar anchuras rígidas que causen desbordamiento.
- «Mapa» se representa como bloque de altura útil, con contraste y nombre accesible; en móvil queda después de las tarjetas, no como overlay que tape controles/resultados. Sin mapas dinámicos ni librerías externas.
- Reutilizar la paleta neutral y el acento existente solo como continuidad del producto; no registrar códigos de color, tamaños tipográficos, radios o composición de la captura como observados mientras la imagen no sea inspeccionable. Para implementación final, medir visualmente la referencia.
- Estilos exclusivamente con utilidades Tailwind, según la regla general del proyecto. Componentes definidos como funciones con `const`; evitar CSS ad hoc, bibliotecas de UI o bibliotecas de mapas.

### Componentes existentes que se reutilizan

- `ListingCard` (`components/ListingCard.tsx`): reutilización directa con los datos `Listing`; genera enlaces `/rooms/[id]`, utiliza `next/image` y `RatingStars`, y acepta estado/callback opcional de favoritos.
- `ListingGrid` (`components/ListingGrid.tsx`): reutilización posible y preferida para la cuadrícula. Su interfaz actual está acoplada a los estados de Home (`isLoading`, `onClearFilters`, `favoriteIds`, `onFavoriteToggle`) y su rama vacía muestra `EmptyState` de filtros. En implementación, pasar `isLoading={false}`, no-op para limpieza si los tipos actuales lo exigen, y un `Set`/callback de favoritos; alternativamente refactorizarlo de forma retrocompatible con props opcionales o extraer una cuadrícula de presentación compartida. No modificar ahora los componentes existentes durante esta etapa documental.
- `RatingStars` (`components/RatingStars.tsx`): se utiliza indirectamente a través de `ListingCard`, sin construir un segundo rating.
- `demoListings` y `Listing` (`lib/listings.ts`, `types/listing.ts`): fixtures y contrato actuales. `pricePerNight` es un `number` en euros; `category` usa `ListingCategoryId`. No es necesario cambiar los tipos para ordenar.
- `SiteHeader` (`components/SiteHeader.tsx`): pertenece al flujo de Home e incluye campo de búsqueda, menú de usuario y saludo. No es reutilizable como encabezado de resultados sin condicionar props/contenido; la propuesta es `CatalogHeader` propio y compacto, preservando una cabecera global solo si la captura legible lo confirma.
- No implementar en esta etapa: ruta `/catalog`, componentes, estilos, cambios en Home, detalle `/rooms/[id]`, interacción de filtros adicional, backend ni mapa real.

## Especificación visual — Detalle de habitación — Captura móvil 375 px

### Alcance, observaciones y límites

- **Referencias analizadas:** `airbnb-detail-mobile.png` (376 × 668 px), `airbnb-rom-info-mobile.png` (388 × 670 px) y `airbnb-rom-info2-mobile.png` (384 × 664 px). Los archivos no tienen todos 375 px de ancho; la vista se implementará y probará con viewport de 375 px.
- **Limitación de inspección:** se pudieron abrir como imágenes locales y verificar dimensiones, pero el visor disponible no expuso sus píxeles al análisis. Por tanto, no se puede afirmar de forma fiable qué textos, imágenes, iconos, colores, posiciones o controles exactos aparecen. Las decisiones visuales propuestas abajo no son observaciones directas. Para fidelidad pixel a pixel, revisar las imágenes en un visor visual antes de implementar.
- **Requisitos académicos no necesariamente observables en las referencias:** galería navegable con anterior/siguiente e indicador; anfitrión y amenidades; reserva simulada con selector de huéspedes y total calculado; carga mediante `useEffect`/`setTimeout`; manejo de IDs desconocidos; navegación App Router con `Link`.

### Descripción visual y jerarquía propuesta

La página pertenece a `/rooms/[id]` y presenta un alojamiento con desplazamiento vertical natural. Composición mobile-first propuesta: navegación compacta de regreso al Catálogo; galería fotográfica de ancho disponible; título, ubicación y valoración; resumen del anfitrión; descripción; amenidades; y panel de reserva con selector de huéspedes. El panel se integra en el flujo del contenido en móvil para no estrechar la lectura ni tapar la galería. No se determina si alguna referencia muestra una barra fija o una disposición distinta, dado que sus píxeles no fueron legibles en esta sesión.

Ubicación y rating se presentan cerca del título. La galería tendrá botones accesibles y un contador visible. La información larga (descripción y amenidades) se separa en bloques. En escritorio, se propone contenido a la izquierda y panel de reserva a la derecha, con galería más amplia.

### Tabla de componentes, responsabilidades y props

Los componentes nuevos serán funciones arrow declaradas con `const`, en archivos separados en `/components`, con responsabilidad acotada y objetivo inferior a ~80 líneas de JSX/lógica. Tipos específicos pueden vivir en `/types/room.ts` y fixtures en `/lib/rooms.ts`. `Listing` existente seguirá siendo la fuente de identidad, ubicación, rating y precio base.

| Componente | Responsabilidad | Props propuestas | Estado e interacciones | Responsive y dependencias |
| --- | --- | --- | --- | --- |
| `RoomDetailPage` (orquestador cliente de `/rooms/[id]`) | Simular consulta local, gestionar carga/no encontrado y coordinar la vista. | `roomId: string` derivado de `params`; no recibe el alojamiento resuelto. | `room: RoomDetail \| null`, `isLoading: boolean`; `useEffect` + `setTimeout`, con limpieza y dependencia del ID. | Mobile-first; compone componentes del detalle. Puede delegar UI a `RoomDetailView` si simplifica separar carga y presentación. |
| `RoomNavigation` | Enlace de regreso al catálogo y breadcrumb opcional. | `backHref?: string`, `backLabel?: string`. | Sin estado. | Barra compacta; usa `Link` a `/catalog`. |
| `RoomGallery` | Mostrar foto actual, navegar anterior/siguiente y comunicar índice. | `images: RoomPhoto[]`; `title: string`; `initialIndex?: number`. | `currentIndex` con `useState`; navegación circular o extremos deshabilitados, decisión a fijar al implementar; anuncio “Foto n de total”. | Móvil una imagen principal fluida; escritorio puede usar mosaico desde 768 px si hay fotos suficientes. Depende de `next/image` e `Icon`. |
| `RoomInformation` | Reunir título, ubicación, valoración, reseñas y descripción. | `listing: Listing`; `description: string`. | Sin estado; reutiliza `RatingStars`. | Título multilínea, sin truncar información esencial. Depende de `Listing` y `RatingStars`. |
| `HostInformation` | Presentar anfitrión ficticio, avatar, nombre y antigüedad/resumen. | `host: HostInfo`. | Presentacional. | Avatar compacto y texto con wrap. |
| `AmenitiesList` | Presentar amenidades de forma escaneable. | `amenities: Amenity[]`; `visibleCount?: number`. | Sin estado obligatorio. | Una columna o filas compactas en móvil; dos columnas en escritorio. El texto conserva el significado aunque haya icono. |
| `BookingCard` | Simular selección y cálculo de reserva sin backend/pagos. | `pricePerNight: number`; `currency: Currency`; `estimatedNights: number`; `cleaningFee?: number`; `maxGuests: number`; `guestCount: number`; `onGuestCountChange: (count: number) => void`; `onReserve?: () => void`. | Recibe huéspedes controlados; calcula subtotales y total a partir de datos ficticios; CTA solo confirma localmente. | En móvil queda en el flujo o en franja inferior únicamente si se valida y no tapa contenido; en escritorio puede ser tarjeta lateral. |
| `GuestSelector` | Ajustar cantidad de huéspedes dentro de límites. | `value: number`; `min?: number` (default 1); `max: number`; `onChange: (value: number) => void`. | Controlado por padre; los botones respetan mínimo/máximo. | Controles táctiles de ~44 px; etiqueta y valor legibles; no permitir menos de 1 ni superar `maxGuests`. |
| `RoomLoadingState` | Comunicar carga simulada. | `label?: string`. | Sin estado. | Reemplaza contenido mientras carga; se puede generalizar `LoadingState` solo si no rompe su contrato actual. |
| `RoomNotFound` | Informar ID inválido y ofrecer recuperación. | `roomId: string`. | Sin estado. | Mensaje legible y `Link` al catálogo; no mostrar reserva vacía. |

### Jerarquía de componentes propuesta

```text
app/rooms/[id]/page.tsx (lee params y entrega roomId)
└── RoomDetailPage (estado de carga y búsqueda local simulada)
    ├── RoomLoadingState (mientras carga) / RoomNotFound (ID inválido)
    └── RoomDetailView (composición del alojamiento)
        ├── RoomNavigation
        ├── RoomGallery
        ├── RoomInformation ── RatingStars
        ├── HostInformation
        ├── AmenitiesList
        └── BookingCard ── GuestSelector
```

`RoomDetailView` es una extracción opcional; mantenerlo solo si evita que el orquestador supere la complejidad razonable. Cada componente mantiene una responsabilidad; los valores derivados no se duplican en estado innecesario.

### Interfaces TypeScript propuestas

Los contratos siguientes son propuestas documentales; no implican modificar archivos TS/TSX en esta etapa. `Listing` aporta ID, título, ubicación, `pricePerNight`, rating, reseñas, categoría e imagen de portada:

```ts
import type { Listing } from "@/types/listing";

export type Currency = "EUR";

export interface RoomPhoto {
  src: string;
  alt: string;
}

export interface HostInfo {
  name: string;
  avatarUrl: string;
  joinedLabel: string;
  isSuperhost?: boolean;
}

export interface Amenity {
  id: string;
  label: string;
  icon?: string; // clave para un mapa de iconos local
}

export interface RoomDetail {
  listing: Listing;
  photos: RoomPhoto[];
  host: HostInfo;
  description: string;
  amenities: Amenity[];
  maxGuests: number;
  estimatedNights: number;
  cleaningFee?: number;
}

export interface GuestSelectorProps {
  value: number;
  min?: number;
  max: number;
  onChange: (value: number) => void;
}
```

La colección local se resolverá por el mismo ID estable usado en `demoListings`. Fotos, anfitrión, amenidades, máximo de huéspedes y noches/importes demostrativos son fixtures locales y ficticios. Si existe el `Listing` pero falta su detalle extendido, gestionarlo explícitamente como no encontrado o definir fallback deliberado; no inventar un detalle parcial silenciosamente.

### Interacciones y hooks

1. **Carga simulada:** `RoomDetailPage` obtiene `roomId` de la ruta. `useEffect` programa `window.setTimeout` para buscarlo en una colección local y asignar `RoomDetail` o `null`, además de apagar `isLoading`. El cleanup usa `window.clearTimeout(timer)` e incluye `roomId` en dependencias. No se utiliza fetch ni backend.
2. **Carga y error:** durante la demora se muestra `RoomLoadingState`; un ID desconocido presenta `RoomNotFound` con regreso al catálogo. Cambios de ID/desmontaje no deben permitir que un temporizador obsoleto sobrescriba la vista actual.
3. **Galería:** `RoomGallery` guarda el índice con `useState`, limita o envuelve los índices correctamente y deriva la foto visible. Botones `type="button"` etiquetados “Foto anterior”/“Foto siguiente”; contador visible y `aria-live="polite"`. Con cero fotos se usa placeholder; con una foto se ocultan o deshabilitan controles coherentemente.
4. **Huéspedes:** estado numérico controlado, inicial 1, `min=1`, `max=room.maxGuests` (por ejemplo, máximo ficticio 6 salvo que el fixture especifique otro). Botón menos no baja de 1 y más no pasa del máximo. El grupo y botones exponen su propósito accesiblemente.
5. **Estimación:** precio/noche por `Listing`; noches ficticias deterministas en `RoomDetail.estimatedNights` (p. ej., 3), sin fechas ni backend. `subtotal = pricePerNight * estimatedNights`; si se incluye limpieza, sumar `cleaningFee` una vez y mostrarla desglosada. `total = subtotal + (cleaningFee ?? 0)`. Mostrar número de huéspedes y noches aplicadas. Formatear con `Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" })`. No simular impuestos o tarifas no definidas.
6. **CTA:** botón “Reservar” o “Solicitar reserva” sin API, pagos ni persistencia. Puede mostrar confirmación local accesible (por ejemplo, `role="status"`) con huéspedes, noches y total; no afirmar que se completó una reserva real.
7. **Accesibilidad:** `alt` en imágenes, estructura semántica, controles nativos, foco visible, sin botones anidados, feedback anunciado y mensajes legibles sin depender solo del color/icono.

### Navegación y rutas

- **Home → Catálogo:** conservar el `Link` existente de Home a `/catalog`.
- **Catálogo → Detalle:** `ListingCard` ya genera `Link` a `/rooms/${listing.id}`; conservarlo, sin `window.location` ni `<a href>` para navegación interna.
- **Detalle → Catálogo:** `RoomNavigation` y `RoomNotFound` usan `Link` de `next/link` a `/catalog`.
- La ruta dinámica propuesta es `app/rooms/[id]/page.tsx`. Antes de implementarla, revisar la documentación local de Next.js 16 para la firma tipada actual de `params`; mapear el ID a `roomId` y pasar props al componente cliente de carga. La navegación debe usar App Router sin recarga completa.

### Reglas responsive y presentación

- Mobile-first y prueba en 375 px; las referencias disponibles miden 376, 388 y 384 px de ancho.
- Móvil: una columna, galería fluida y márgenes coherentes con el proyecto (`px-5` como punto inicial); título multilínea; rating/ubicación legibles; anfitrión, descripción, amenidades y reserva en flujo vertical. Sin anchos fijos superiores al viewport ni overlays que tapen contenido; validar `scrollWidth <= clientWidth`.
- Botones de galería y huéspedes con área táctil aproximada de 44 × 44 px; operables sin hover.
- Desde 768 px: ampliar contenedor; galería potencialmente en mosaico; contenido principal en dos columnas con información a la izquierda y `BookingCard` lateral, solo si el ancho permite lectura cómoda.
- El panel de reserva no tapa contenido importante en móvil. En escritorio puede ser `sticky` si no interfiere con flujo ni teclado. No asumir una barra fija móvil sin cotejar referencia y accesibilidad.
- Solo utilidades Tailwind; tipografía/paleta coherente con Home y Catálogo; sin bibliotecas de UI, pagos o mapas. Usar imágenes locales de demostración y `next/image` para assets estáticos.

### Reutilización de componentes existentes

- `RatingStars` (`components/RatingStars.tsx`): reutilizar con `rating` y `reviewCount` del `Listing`; no reimplementar estrellas.
- `Icon` (`components/Icon.tsx`): reutilizar iconos existentes cuando sean semánticamente adecuados. Si faltan flechas/amenidades, ampliar el mapa local acotadamente; no instalar paquetes de iconos.
- `Listing` y `demoListings` (`types/listing.ts`, `lib/listings.ts`): fuente autoritativa de IDs y datos base. Añadir detalle extendido en `/types` y fixture en `/lib`, asociado por `listing.id`, sin duplicar innecesariamente el modelo.
- `ListingCard`/`ListingGrid`: no son la estructura principal del detalle; el enlace desde catálogo resuelve la navegación. Se podrían usar en recomendaciones futuras, fuera del alcance actual.
- `LoadingState`: está orientado a la cuadrícula; reutilizar solo si se extrae una variante compatible, o crear `RoomLoadingState`.
- `SiteHeader`: pertenece a Home y no se reutiliza automáticamente; proponer `RoomNavigation` compacto salvo que la referencia visual cotejada requiera cabecera compartida.

### Fuera de alcance

No habrá backend, autenticación, calendario real, fechas editables, pagos, disponibilidad real, mensajes al anfitrión ni confirmación persistida. Esta sección es especificación para una etapa posterior: no implementar aún ruta ni modificar archivos TSX, TS o CSS.
