# VULTURE

Tienda online de indumentaria urbana. Trabajo práctico de **Construcción de
Interfaces de Usuario** — Universidad Nacional de Hurlingham.

La aplicación permite explorar un catálogo de 12 productos, filtrarlos y
ordenarlos, ver el detalle de cada prenda, armar un carrito con cantidades y
completar una compra simulada mediante un formulario validado.

## Integrantes del grupo



- Logan Tobias Casals - 46194294
- Matias Nicolas Quintana - 46188287


## Tecnologías utilizadas

| Tecnología | Para qué |
| --- | --- |
| React 19 | Librería principal, componentes funcionales |
| Vite 6 | Entorno de desarrollo y compilación |
| React Router DOM 7 | Navegación entre páginas y rutas dinámicas |
| React Bootstrap 2 | Modal, Accordion y Offcanvas |
| Bootstrap 5 | Estilos base del framework |
| CSS Modules | Encapsulamiento de estilos por componente |
| lucide-react | Iconografía |

## Instalación y ejecución

Requiere [Node.js](https://nodejs.org/) 20 o superior y npm (incluido con Node.js).
Podés comprobar que estén instalados con `node --version` y `npm --version`.

1. Abrí una terminal en la carpeta del proyecto, donde está `package.json`.
   Si todavía no descargaste el repositorio, ejecutá:

```sh
git clone https://github.com/NicolasQ19/Vultures.git
cd Vultures
```

2. Instalá las dependencias:

```sh
npm install
```

Este comando descarga los paquetes en `node_modules`. Es necesario la primera
vez y cuando cambian las dependencias; no hace falta repetirlo cada vez que
iniciás el proyecto.

3. Iniciá el servidor de desarrollo:

```sh
npm run dev
```

4. Abrí [http://localhost:5173](http://localhost:5173) en el navegador.
   Si ese puerto está ocupado, Vite indicará otra dirección en la terminal.

Mantené la terminal abierta mientras usás el sitio. Los cambios en el código
se reflejan en el navegador. Para detener el servidor, presioná `Ctrl+C`.
Para volver a ejecutarlo, abrí una terminal en la misma carpeta y usá `npm run dev`.

No hace falta configurar variables de entorno ni una base de datos para
ejecutar esta versión: los productos son locales y la compra es simulada.

### Otros comandos

```sh
npm run build     # compila el sitio en dist/
npm run preview   # sirve la compilación para probarla
npm run format    # ordena el código con Prettier
```

## Funcionalidades

- **Inicio** con banner, identidad de la marca y acceso al catálogo.
- **Catálogo** de 12 productos con nombre, imagen, categoría, precio,
  descripción, stock, botón de detalle y botón de agregar al carrito.
- **Búsqueda** por nombre, **filtro** por categoría y **ordenamiento** por precio.
- **Detalle** en ruta dinámica (`/product/:id`) con selección de talle y color,
  guía de talles en modal y control de stock.
- **Carrito** con cantidades, eliminación, subtotal por producto y total general.
- **Checkout** con formulario controlado, validaciones y confirmación simulada.
- **Contacto** con un segundo formulario controlado y sus propias validaciones.
- **Responsive** para celular, tablet y escritorio.
- **Persistencia** del carrito en `localStorage` (extra opcional).

## Estructura del proyecto

```
src/
├── components/     piezas reutilizables (Navbar, Footer, ProductCard...)
├── pages/          una vista por ruta
├── context/        estado del carrito compartido entre páginas
├── styles/         variables, reset y clases globales
├── data.js         array de productos
├── App.jsx         rutas de la aplicación
└── main.jsx        punto de entrada
```
## Deploy



Al publicar como SPA, configurar el alojamiento para servir `index.html` en
rutas desconocidas.
