# Informe de QA — Airbnb Clone

**Fecha de ejecución:** 26 de noviembre de 2026  
**Alcance:** revisión funcional y técnica de Inicio (`/`), Catálogo (`/catalog`) y Detalle (`/rooms/[id]`).  
**Entorno:** Windows, Next.js 16.4.6, React 19.3.0, viewport móvil 375 × 812 y escritorio 1280 × 900.  
**Nota:** se verificó el comportamiento en navegador integrado con una instancia local real; no se afirma inspección visual pixel a pixel de las imágenes de referencia, que no fueron accesibles visualmente en esta revisión.

## Resumen ejecutivo

- **CUMPLE:** 12 criterios.
- **NO CUMPLE:** 0 criterios.
- **REQUIERE PRUEBA MANUAL:** 1 criterio (fidelidad visual exacta frente a referencias no inspeccionables).
- `npx tsc --noEmit`, `npm run lint`, `npm run build` y `git diff --check` finalizaron sin errores.
- Corrección aplicada: `app/page.tsx` ahora declara el componente con `const`, conforme a las convenciones del proyecto.
- `context.md` no se modificó. No se realizó commit ni push.

## Matriz de los 13 criterios oficiales

| # | Criterio | Estado | Evidencia / resultado |
|---|---|---|---|
| 1 | Inicio, Catálogo y Detalle tienen rutas independientes y accesibles | **CUMPLE** | Build reporta `/`, `/catalog` y `/rooms/[id]`; se visitaron Home, Catálogo y detalle localmente. La ruta de ID desconocido mostró el estado not-found. |
| 2 | Inicio presenta búsqueda funcional | **CUMPLE** | En navegador a 375 px, Home mostró 8 tarjetas; buscar texto inexistente activó el estado vacío; borrar filtros y seleccionar «Todas» restauró 8. |
| 3 | Las categorías filtran resultados | **CUMPLE** | Seleccionar «Playa» redujo el resultado a 2 tarjetas. Los botones exponen `aria-pressed`. |
| 4 | Búsqueda y categoría se combinan; existe recuperación del estado vacío | **CUMPLE** | Con «Playa» activa, buscar «Cabaña» produjo 0 coincidencias (intersección AND). «Borrar filtros» restableció la lista. |
| 5 | Inicio carga resultados con estado simulado y cleanup | **CUMPLE** | Código usa `useEffect`, `setTimeout` de 700 ms y `clearTimeout`; la interfaz contiene skeleton accesible. Se observó la página tras la carga. |
| 6 | Tarjetas muestran datos accesibles y son reutilizadas entre Inicio y Catálogo | **CUMPLE** | Ambos consumen `ListingGrid`, que renderiza `ListingCard`; imagen con alt, título, ubicación, rating y precio. Navegación interna con `next/link`. |
| 7 | Catálogo muestra recuento, orden por precio y placeholder de mapa | **CUMPLE** | Navegador: 8 alojamientos; orden ascendente `[102,118,131,142,154,176,236,289]` y descendente `[289,236,176,154,142,131,118,102]`; región «Mapa de alojamientos» visible. |
| 8 | Detalle corresponde al ID y presenta galería, información, anfitrión y amenidades | **CUMPLE** | Desde Catálogo se abrió `casa-mar-cadiz`; encabezado, ubicación, valoración, anfitrión Lucía y lista de amenidades fueron visibles. El detalle rural se cargó con su propio título/datos al visitar su ruta en la inspección inicial. |
| 9 | Galería y reserva simulada son interactivas, con límites y sin pago | **CUMPLE** | En móvil, anterior desde 1/3 pasó a 3/3 y siguiente volvió a 1/3; contador de huéspedes pasó de 1 a 2 y regresó a 1; el límite inferior deshabilita reducir. CTA mostró mensaje de demostración; el texto indica que no hay cobro. En inspección del detalle rural, el máximo de 4 tenía «Aumentar» deshabilitado. |
| 10 | Carga de Detalle y manejo de ID desconocido | **CUMPLE** | `RoomDetailPage` usa timeout y limpieza. En navegador `/rooms/no-existe` presentó «Alojamiento no encontrado» y enlace de retorno. |
| 11 | Componentes funcionales declarados con `const`, organizados por archivo | **CUMPLE** | Se corrigió `app/page.tsx`: `const Home = () => <HomePage />; export default Home;`. Rutas y componentes inspeccionados se mantienen separados por responsabilidad. |
| 12 | Estilos Tailwind, enlaces internos Next y adaptación sin overflow | **CUMPLE** | No se encontraron atributos `style=` ni navegación `window.location`; enlaces de navegación observados usan `Link`. `scrollWidth <= clientWidth` tanto a 375 × 812 en Home/Detalle como a 1280 × 900 en Catálogo. |
| 13 | Fidelidad visual frente a las capturas de referencia | **REQUIERE PRUEBA MANUAL** | No fue posible inspeccionar visualmente los píxeles de las referencias en esta sesión. Se comprobó responsividad funcional y ausencia de overflow, pero no se certifica equivalencia visual pixel a pixel. |

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

Cambios de trabajo esperados: `app/page.tsx` y este `QA_REPORT.md`. `context.md` permanece intacto. No se creó commit ni se ejecutó push.
