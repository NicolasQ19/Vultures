const photo = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`;
export const categories = [
  "TODOS",
  "BUZOS",
  "REMERAS",
  "CAMPERAS",
  "PANTALONES",
  "ACCESORIOS",
];
export const products = [
  {
    id: 1,
    name: "BUZO GRUESO CON CAPUCHA",
    category: "BUZOS",
    price: 120,
    image: photo("photo-1556821840-3a63f95609a7"),
    description:
      "El uniforme de todos los días, reinventado. Un buzo de algodón grueso con un corte amplio y relajado, hombros caídos y capucha estructurada.",
    stock: 8,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro lavado", "Gris cemento"],
  },
  {
    id: 2,
    name: "REMERA ESENCIAL",
    category: "REMERAS",
    price: 55,
    image: photo("photo-1521572163474-6864f9cf17ab"),
    description:
      "Una base simple. Tejido de algodón grueso, corte recto y cuello acanalado. Hecha para convertirse en tu prenda favorita.",
    stock: 16,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blanco crudo", "Negro lavado"],
  },
  {
    id: 3,
    name: "PANTALÓN CARGO",
    category: "PANTALONES",
    price: 145,
    image: photo("photo-1473966968600-fa801b869a1a"),
    description:
      "Funcionalidad con intención. Pantalón cargo de algodón de pierna ancha, con bolsillos bien ubicados y cintura ajustable.",
    stock: 6,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Grafito", "Arena"],
  },
  {
    id: 4,
    name: "CAMPERA ESTRUCTURADA",
    category: "CAMPERAS",
    price: 220,
    image: photo("photo-1544022613-e87ca75a784a"),
    description:
      "Una exploración de la estructura. Una campera amplia con detalles funcionales y espacio para combinar con tus prendas de todos los días.",
    stock: 0,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro lavado"],
  },
  {
    id: 5,
    name: "BUZO DE CUELLO REDONDO",
    category: "BUZOS",
    price: 105,
    image: photo("photo-1576566588028-4147f3842f27"),
    description:
      "Algodón grueso afelpado, corte amplio y terminaciones discretas. Un esencial para la media estación.",
    stock: 9,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Gris cemento", "Negro lavado"],
  },
  {
    id: 6,
    name: "REMERA LAVADA DE MANGA LARGA",
    category: "REMERAS",
    price: 75,
    image: photo("photo-1503341504253-dff4815485f1"),
    description:
      "Tejido lavado con una textura suave y familiar. Mangas largas, hombros caídos y una silueta relajada.",
    stock: 12,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro lavado", "Blanco crudo"],
  },
  {
    id: 7,
    name: "PANTALÓN DE PIERNA ANCHA",
    category: "PANTALONES",
    price: 135,
    image: photo("photo-1624378439575-d8705ad7ae80"),
    description:
      "Una línea fluida de la cintura al ruedo. Pantalón de sarga de algodón suave, pierna ancha y detalles de sastrería.",
    stock: 7,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Arena", "Grafito"],
  },
  {
    id: 8,
    name: "SOBRECAMISA DE LONA",
    category: "CAMPERAS",
    price: 165,
    image: photo("photo-1591047139829-d91aecb6caea"),
    description:
      "Entre una camisa y una campera. Lona resistente, proporciones amplias y herrajes discretos.",
    stock: 5,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Arena", "Negro lavado"],
  },
  {
    id: 9,
    name: "GORRA PARA TODOS LOS DÍAS",
    category: "ACCESORIOS",
    price: 40,
    image: photo("photo-1588850561407-ed78c282e89b"),
    description:
      "Gorra de algodón de seis paneles con tira trasera ajustable. Funcional y fácil de combinar.",
    stock: 14,
    sizes: ["TALLE ÚNICO"],
    colors: ["Negro lavado", "Arena"],
  },
  {
    id: 10,
    name: "BOLSO DE LONA",
    category: "ACCESORIOS",
    price: 65,
    image: photo("photo-1553062407-98eeb64c6a62"),
    description:
      "Espacio para todo lo que importa. Un bolso resistente para todos los días, con asas reforzadas y bolsillo interior.",
    stock: 0,
    sizes: ["TALLE ÚNICO"],
    colors: ["Negro lavado"],
  },
  {
    id: 11,
    name: "BUZO CON CAPUCHA Y CIERRE",
    category: "BUZOS",
    price: 140,
    image: photo("photo-1620799140408-edc6dcb6d633"),
    description:
      "Una prenda versátil de algodón grueso. Corte relajado, cierre de doble sentido y capucha amplia.",
    stock: 4,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Gris cemento", "Negro lavado"],
  },
  {
    id: 12,
    name: "REMERA DE CORTE RECTO",
    category: "REMERAS",
    price: 60,
    image: photo("photo-1503342217505-b0a15ec3261c"),
    description:
      "Lo esencial, sin más. Silueta corta y recta en algodón grueso, con un acabado lavado y suave.",
    stock: 10,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blanco crudo", "Grafito"],
  },
];
export const money = (amount) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
