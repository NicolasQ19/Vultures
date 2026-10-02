# VULTURE

Tienda editorial de streetwear construida con React, React Router y Vite.

## Desarrollo

```sh
npm install
npm run dev
```

## Compilación

```sh
npm run build
npm run preview
```

## Pruebas de navegador

```sh
npx playwright install chromium
npm test
```

Opcionalmente, definir `CHROMIUM_PATH` para usar un Chromium instalado.

## Funciones

- Home editorial y páginas de colección y marca.
- 12 productos en `src/data.js`, búsqueda, categorías y precio.
- Detalle dinámico, variantes, talles y control de stock compartido entre variantes.
- Carrito persistente en localStorage con cantidades y eliminación.
- Checkout controlado con validación, envío gratuito desde USD 200 y retiro sin cargo.
- Confirmación simulada sin cobro ni backend.
- Navegación fullscreen en móvil y grillas responsive.

Los precios están expresados en USD. El stock es demostrativo y se limita por carrito; no se sincroniza con un servidor. Las miniaturas del detalle muestran acercamientos de la misma fotografía.

## Imágenes

`public/images/campaign.png`: fotografía editorial generada con la herramienta integrada imagegen. Prompt: dos modelos adultos con streetwear negro oversized en una cantera desértica beige, fotografía cinematográfica desaturada de bajo contraste, luz difusa y espacio negativo a la izquierda, sin texto ni logos.

Las fotografías de catálogo se sirven desde Unsplash. Las fuentes Inter y Barlow Condensed se cargan desde Google Fonts. Esos recursos necesitan conexión a internet; existen fuentes de sistema de respaldo.

## Estructura

- `src/components`: navegación, pie, producto y resumen reutilizables.
- `src/pages`: vistas de las rutas.
- `src/store.jsx`: estado y persistencia del carrito.
- `src/data.js`: productos y formato monetario.
- `src/styles.css`: sistema visual responsive.
- `tests/store.spec.js`: búsqueda, stock, persistencia, checkout y menú móvil.

Para desplegar como SPA, configurar el alojamiento para servir `index.html` en rutas desconocidas.
