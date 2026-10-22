import "./Product.css";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowUpRight, ArrowLeft, Plus, Check } from "lucide-react";
import { products, money } from "../data";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import SizeGuideModal from "../components/SizeGuideModal";
import Accordion from "react-bootstrap/Accordion";
import NotFound from "./NotFound";
const vistas = [
  { etiqueta: "la prenda completa", posicion: "center", escala: "none" },
  { etiqueta: "detalle", posicion: "top", escala: "scale(1.5)" },
  { etiqueta: "la tela", posicion: "center", escala: "scale(2)" },
];

export default function Product() {
  const { id } = useParams();
  const p = products.find((producto) => producto.id === Number(id));
  const { add, cart } = useCart();

  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState(0);
  const [error, setError] = useState("");
  const [guiaAbierta, setGuiaAbierta] = useState(false);

  useEffect(() => {
    setSize("");
    setImage(0);
    setError("");
    if (p) setColor(p.colors[0]);
  }, [id]);

  if (!p) return <NotFound />;

  let enCarrito = 0;
  for (const item of cart) {
    if (item.id === p.id) enCarrito += item.quantity;
  }
  const available = p.stock - enCarrito;

  function manejarAgregar() {
    if (!size) {
      setError("Elegí un talle.");
      return;
    }
    const problema = add(p, size, color);
    setError(problema || "");
  }
  return (
    <main className="page detail-page">
      <Link to="/shop" className="back-link">
        <ArrowLeft size={14} /> VOLVER AL CATÁLOGO
      </Link>
      <div className="breadcrumb">
        <Link to="/shop">TIENDA</Link>
        <span>/</span>
        <Link to={`/shop?category=${p.category}`}>{p.category}</Link>
        <span>/</span>
        <span>{p.name}</span>
      </div>
      <div className="detail-layout">
        <div className="detail-gallery">
          <div className="thumbnails">
            {vistas.map((vista, n) => (
              <button
                className={n === image ? "active" : ""}
                key={vista.etiqueta}
                onClick={() => setImage(n)}
                aria-label={"Ver imagen de " + vista.etiqueta}
              >
                <img
                  src={p.image}
                  alt=""
                  style={{
                    objectPosition: vista.posicion,
                    transform: vista.escala,
                  }}
                />
              </button>
            ))}
          </div>
          <div className={`detail-main-image view-${image}`}>
            <img src={p.image} alt={p.name} />
            {p.stock === 0 && <span className="sold-out">AGOTADO</span>}
          </div>
        </div>
        <div className="detail-info">
          <span className="eyebrow">VULTURE ESENCIALES / {p.category}</span>
          <h1>{p.name}</h1>
          <span className="detail-price">{money(p.price)}</span>
          <p className="description">{p.description}</p>
          <div className="option-label">
            COLOR <span>{color}</span>
          </div>
          <div className="color-options">
            {p.colors.map((c) => (
              <button
                key={c}
                className={color === c ? "active" : ""}
                onClick={() => setColor(c)}
                aria-label={c}
                title={c}
                style={{
                  background:
                    c === "Blanco crudo"
                      ? "#e8e5dc"
                      : c === "Arena"
                        ? "#baaf9a"
                        : c === "Gris cemento"
                          ? "#898782"
                          : c === "Grafito"
                            ? "#555550"
                            : "#272724",
                }}
              >
                {color === c && (
                  <Check
                    size={15}
                    color={c === "Blanco crudo" ? "#222" : "#fff"}
                  />
                )}
              </button>
            ))}
          </div>
          <div className="option-label">
            TALLE{" "}
            <button onClick={() => setGuiaAbierta(true)}>
              GUÍA DE TALLES ↗
            </button>
          </div>
          <div className="size-options">
            {p.sizes.map((s) => (
              <button
                key={s}
                className={size === s ? "active" : ""}
                onClick={() => {
                  setSize(s);
                  setError("");
                }}
              >
                {s}
              </button>
            ))}
          </div>
          {error && (
            <p className="field-error" role="alert">
              {error}
            </p>
          )}
          <p className="stock">
            <span className={available > 0 ? "stock-dot" : ""} />
            {p.stock === 0
              ? "Actualmente no disponible"
              : available === 0
                ? "No hay Stock de este Producto"
                : `${available} disponibles — listos para enviar`}
          </p>
          <button
            className="button add-button"
            disabled={available <= 0}
            onClick={manejarAgregar}
          >
            {p.stock === 0
              ? "AGOTADO"
              : available === 0
                ? "PRODUCTO SIN STOCK"
                : "AGREGAR AL CARRITO"}
            <Plus size={18} />
          </button>
          <p className="shipping-note">
            ENVÍO GRATIS EN PEDIDOS DE MÁS DE $200.000
          </p>
          <Accordion className="accordions" flush>
            <Accordion.Item eventKey="descripcion">
              <Accordion.Header>
                DESCRIPCIÓN <Plus size={15} />
              </Accordion.Header>
              <Accordion.Body>{p.description}</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="detalles">
              <Accordion.Header>
                DETALLES <Plus size={15} />
              </Accordion.Header>
              <Accordion.Body>
                Confección en algodón de primera calidad. Corte relajado.
                Diseñado para usar todos los días. Lavá con agua fría y colores
                similares, y secá al aire.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="envio">
              <Accordion.Header>
                ENVÍO <Plus size={15} />
              </Accordion.Header>
              <Accordion.Body>
                Entrega estándar en 3 a 5 días hábiles. Envío de $15.000, gratis
                en pedidos de más de $200.000. Esta es una tienda de
                demostración; no se cobran ni se envían pedidos.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
      <SizeGuideModal show={guiaAbierta} onHide={() => setGuiaAbierta(false)} />
      <section className="related">
        <div className="section-heading">
          <h2>COMPLETÁ TU LOOK</h2>
          <Link to="/shop" className="text-link">
            VER TODO <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="product-grid">
          {products
            .filter((x) => x.id !== p.id)
            .slice(0, 4)
            .map((x) => (
              <ProductCard key={x.id} product={x} />
            ))}
        </div>
      </section>
    </main>
  );
}
