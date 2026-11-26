# Airbnb Clone — Prototipo académico

## Objetivo

Proyecto académico de frontend inspirado en la experiencia de búsqueda de alojamientos de Airbnb. Su propósito es practicar el análisis de una interfaz, el diseño responsive y la construcción de páginas reutilizables con Next.js App Router. Incluye Inicio, Catálogo y Detalle con interacciones de demostración. No es un servicio de reservas real.

## Tecnologías

- Next.js 16.4.6 con App Router
- React 19 y TypeScript
- Tailwind CSS 4
- ESLint

No se utiliza una biblioteca de interfaz preconstruida.

## Rutas

| Ruta | Descripción |
|---|---|
| `/` | Inicio con búsqueda, filtros por categoría y tarjetas de alojamientos. |
| `/catalog` | Catálogo con conteo, orden ascendente/descendente por precio y placeholder de mapa. |
| `/rooms/[id]` | Detalle dinámico con galería, información del anfitrión, amenidades y reserva simulada. |

La navegación entre páginas se realiza con `Link` de Next.js.

## Funcionalidades principales

- Búsqueda en vivo por texto y filtros combinables por categoría.
- Estados de carga y estado vacío con opción para borrar filtros.
- Tarjetas reutilizadas entre Inicio y Catálogo, con enlaces al detalle y favoritos locales.
- Ordenación del catálogo por precio ascendente o descendente.
- Galería con controles anterior/siguiente e indicador de foto.
- Selector de huéspedes limitado y total estimado en una reserva de demostración.
- Manejo de IDs de alojamiento inexistentes.
- Diseño mobile-first con adaptación a escritorio.

## Arquitectura

```text
app/
  page.tsx                 # Ruta Inicio
  catalog/page.tsx         # Ruta Catálogo
  rooms/[id]/page.tsx      # Ruta dinámica de Detalle
  layout.tsx               # Layout y metadatos globales
  globals.css              # Importación Tailwind y estilos base
components/                # Componentes funcionales y reutilizables
lib/                       # Alojamientos y contenido de demostración
public/                    # Recursos locales de imágenes
types/                     # Tipos TypeScript de Listing y Room
context.md                 # Objetivo, usuario, requisitos y especificaciones
QA_REPORT.md               # Evidencias y resultados de auditoría QA
```

## Instalación y ejecución

Requisitos: Node.js compatible con Next.js 16 y npm.

```bash
npm install
npm run dev
```

Después, abre `http://localhost:3000` en el navegador. Para detener el servidor, usa `Ctrl+C` en la terminal.

## Validaciones

```bash
npx tsc --noEmit
npm run lint
npm run build
```

- TypeScript: verifica tipos sin emitir archivos.
- Lint: ejecuta ESLint.
- Build: genera la compilación optimizada de producción.

## Responsive y reutilización

La interfaz se implementa con enfoque mobile-first y se adapta mediante breakpoints de Tailwind. Las tarjetas de alojamiento se comparten realmente entre Home y Catálogo; componentes como `RatingStars`, `LoadingState` y controles de interacción se separan en archivos propios para mantener responsabilidades concretas.

## Datos y alcance

El proyecto utiliza alojamientos, fotografías, anfitriones y amenidades ficticios/locales para demostración. No tiene backend, persistencia, autenticación, disponibilidad real, procesamiento de pagos ni reservas reales. La acción de reserva solo muestra una confirmación local y el precio es una estimación.

## Documentación del proyecto

- [`context.md`](./context.md): visión, usuario objetivo, requisitos y especificaciones de las vistas.
- [`QA_REPORT.md`](./QA_REPORT.md): matriz de la rúbrica, evidencias, validaciones técnicas y pruebas manuales.

## Capturas de pantalla

Agrega aquí capturas del proyecto para la entrega. Reemplaza las rutas de ejemplo por las imágenes guardadas en el repositorio.

### Inicio

![Captura de Inicio](./docs/screenshots/home.png)

### Catálogo

![Captura de Catálogo](./docs/screenshots/catalog.png)

### Detalle

![Captura de Detalle](./docs/screenshots/detail.png)

> Las imágenes anteriores son rutas previstas para las capturas; añade los archivos correspondientes antes de publicar si quieres que se visualicen en GitHub.

## Entrega

La entrega académica se realizará mediante el repositorio de GitHub. No se especifica una URL de despliegue.
