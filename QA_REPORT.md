# Informe de QA — Airbnb Clone

**Fecha de ejecución:** 26 de noviembre de 2026  
**Alcance:** revisión funcional y técnica de Inicio (`/`), Catálogo (`/catalog`) y Detalle (`/rooms/[id]`).  
**Entorno:** Windows, Next.js 16.4.6, React 19.3.0, viewport móvil 375 × 812 y escritorio 1280 × 900.  
**Nota:** se verificó el comportamiento en navegador integrado con una instancia local real; no se afirma inspección visual pixel a pixel de las imágenes de referencia, que no fueron accesibles visualmente en esta revisión.

## Resumen ejecutivo

- **CUMPLE:** 12 criterios.
- **NO CUMPLE:** 1 criterio (el `RootLayout` de `app/layout.tsx` no se declara mediante `const`).
- **REQUIERE PRUEBA MANUAL:** 0 criterios oficiales. La fidelidad visual se documenta como prueba adicional fuera de la rúbrica.
- `npx tsc --noEmit`, `npm run lint`, `npm run build` y `git diff --check` finalizaron sin errores.
- Corrección aplicada: `app/page.tsx` ahora declara el componente con `const`, conforme a las convenciones del proyecto.
- `context.md` no se modificó. No se realizó commit ni push.

## Matriz de los 13 criterios oficiales de 4Geeks

| # | Criterio oficial | Estado | Evidencia concreta |
|---|---|---|---|
| 1 | Existe `context.md` en la raíz y contiene la descripción de la interfaz, sus componentes y su usuario objetivo. | **CUMPLE** | Inspección directa de `context.md` en la raíz: incluye objetivo/usuario, las tres páginas, inventario de componentes y especificaciones. `git diff -- context.md` quedó vacío. |
| 2 | El proyecto utiliza Next.js 16, TypeScript, Tailwind CSS y App Router, sin plantilla de interfaz preconstruida. | **CUMPLE** | `package.json` especifica Next.js 16.4.6, TypeScript y Tailwind CSS 4.3.3; rutas bajo `app/`. Dependencias UI directas son Next/React, Tailwind y herramientas de tipos/lint; no hay biblioteca de componentes UI preconstruidos. |
| 3 | Existen tres rutas implementadas y navegables: `/`, `/catalog` y `/rooms/[id]`. | **CUMPLE** | Existen `app/page.tsx`, `app/catalog/page.tsx` y `app/rooms/[id]/page.tsx`; `npm run build` reportó estas rutas. Se navegó entre Home, Catálogo y detalle; también se probó un ID desconocido. |
| 4 | Toda la navegación interna usa `Link` de Next.js, sin recargas completas. | **CUMPLE** | Búsqueda en rutas y componentes encontró enlaces internos `Link` de `next/link`; no encontró `window.location` ni `<a href>`. Se abrió un detalle desde una tarjeta del Catálogo. |
| 5 | El diseño es mobile-first, correcto a 375 px y adaptable a escritorio. | **CUMPLE** | Navegador a 375 px: Home y Detalle sin overflow. Catálogo a 1280 px: sin overflow. Clases responsive del grid y páginas definen columnas y disposición por breakpoints. Esto no certifica fidelidad visual pixel a pixel. |
| 6 | `ListingCard` se reutiliza realmente en Home y Catálogo. | **CUMPLE** | Ambas páginas consumen `ListingGrid`; `ListingGrid.tsx` mapea los resultados a `ListingCard`. La misma implementación presenta tarjetas en ambas rutas. |
| 7 | `useState` se usa en al menos tres funcionalidades distintas. | **CUMPLE** | Código inspeccionado: búsqueda/categoría/favoritos en Home, orden/favoritos en Catálogo, índice de galería, menú de usuario y huéspedes/confirmación de reserva. |
| 8 | `useEffect` simula una carga de datos en al menos dos páginas, con un estado de carga visible. | **CUMPLE** | `HomePage.tsx` y `RoomDetailPage.tsx` configuran `setTimeout` en `useEffect` y limpian con `clearTimeout`. Home renderiza `LoadingState`; Detalle renderiza `RoomLoadingState` mientras espera. |
| 9 | Detalle incluye galería con navegación, cabecera, información del anfitrión, amenidades y tarjeta de reserva. | **CUMPLE** | `RoomDetailPage` compone `RoomNavigation`, `RoomGallery`, `RoomInformation`, `HostInformation`, `AmenitiesList` y `BookingCard`. En navegador se verificaron galería, datos del alojamiento y reserva de demostración. |
| 10 | Los componentes están separados en archivos individuales, cada uno con una responsabilidad clara. | **CUMPLE** | Inspección de `components/`: galería, reserva, selector, tarjetas, filtros, estados, navegación e información están separados por archivo y responsabilidad. |
| 11 | Todos los componentes son funcionales y se declaran mediante `const`, sin componentes de clase. | **NO CUMPLE** | No se encontraron componentes de clase y los componentes de rutas/UI inspeccionados son funcionales. Sin embargo, `app/layout.tsx` declara `export default function RootLayout(...)`, no mediante `const`; no cumple literalmente «todos». No se modificó por la restricción de no cambiar componentes existentes. |
| 12 | Existen interfaces o tipos TypeScript para las estructuras principales de alojamientos y habitaciones. | **CUMPLE** | `types/listing.ts` define `Listing` y categorías; `types/room.ts` define `RoomPhoto`, `HostInfo`, `Amenity`, `RoomContent` y `RoomDetail`. |
| 13 | La interfaz utiliza utilidades Tailwind; no se emplean atributos `style` ni bloques `<style>` para los estilos del producto. | **CUMPLE** | Inspección estática encontró utilidades Tailwind y no encontró atributos JSX `style=` ni elementos `<style>`. `app/globals.css` contiene importación/configuración Tailwind y estilos globales de base, no bloques `<style>` en componentes. |

### Prueba manual adicional: fidelidad visual

La comparación con las capturas originales no forma parte de estos 13 criterios. No se certifica equivalencia visual pixel a pixel: en esta revisión no fue posible inspeccionar visualmente los píxeles de las referencias. Las comprobaciones responsive no sustituyen ese cotejo.

## Errores / observaciones encontrados

1. **Convención de declaración en ruta Home:** `app/page.tsx` exportaba una función tradicional. Se ajustó a una constante arrow sin alterar el render.
2. **HomePage tiene 90 líneas y `lib/listings.ts` 92:** superan ligeramente la guía aproximada de ~80 líneas por archivo, pero no son fallos funcionales; se dejan sin refactor para evitar cambios innecesarios.
3. **Inspección interrumpida por build:** al cerrar el servidor de desarrollo para evitar conflicto con `.next`, una prueba de detalle falló por `ERR_CONNECTION_REFUSED`. Después del build se levantó de nuevo `npm run dev`, se completaron las pruebas de galería/reserva/not-found y el servidor temporal se cerró.
4. Durante navegación se registraron advertencias de precarga de fuentes de Next; no bloquearon compilación ni interacciones. No se identificó error funcional atribuible a ellas.

## Correcciones aplicadas

- `app/page.tsx`: componente raíz migrado de `function Home()` a `const Home = () => ...`.
- No se modificaron otros componentes ni `context.md`.

## Pruebas manuales ejecutadas en navegador

- **Home, 375 px:** carga de 8 tarjetas, categoría «Playa» (2), búsqueda combinada con categoría (0), estado vacío y limpieza/restauración (8); sin overflow horizontal.
- **Catálogo, 1280 px:** 8 resultados, precios ordenados correctamente en ambos sentidos, placeholder de mapa visible, navegación por tarjeta a detalle; sin overflow horizontal.
- **Detalle, 375 px:** título/datos del alojamiento, galería circular 1/3 ↔ 3/3, incremento/decremento de huéspedes, confirmación simulada y ausencia de overflow; ruta inexistente mostró estado de recuperación.
- No se hizo auditoría completa de navegación por teclado ni cotejo visual pixel a pixel. La interacción del menú de usuario y favoritos tampoco se incluyó en la pasada manual.

## Validaciones técnicas

| Comando | Resultado |
|---|---|
| `npx tsc --noEmit` | Correcto, sin salida de errores. |
| `npm run lint` | Correcto; ESLint terminó sin errores ni advertencias. |
| `npm run build` | Correcto. Next.js 16.4.6 compiló, pasó TypeScript, recopiló datos y generó páginas estáticas. Rutas reportadas: `/`, `/_not-found`, `/catalog`, `/rooms/[id]` (Partial Prerender). |
| `git diff --check` | Correcto, sin problemas de whitespace. |
| `git diff -- context.md` | Vacío; contexto sin cambios. |

## Pruebas manuales pendientes

- Comparar visualmente las tres vistas con las capturas originales a 375 px y escritorio, una vez disponibles en un visor que permita inspeccionar los píxeles.
- Completar una pasada de accesibilidad con teclado/foco y lector de pantalla; incluye menú, filtros, búsqueda y acciones de favoritos.
- Probar el selector en el extremo máximo en una segunda pasada directa de reserva (el estado máximo sí se observó en el detalle rural durante la lectura de la página).

## Estado de Git al cierre

Archivos modificados en este cierre: `QA_REPORT.md` y `README.md`. La corrección previa de `app/page.tsx` se conserva en el estado actual y no se alteró en esta tarea. `context.md` permanece intacto. No se creó commit ni se ejecutó push.
