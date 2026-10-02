import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowUpRight, Plus, Check } from "lucide-react";
import { products, money } from "../data";
import { useStore } from "../store";
import ProductCard from "../components/ProductCard";
import NotFound from "./NotFound";
export default function Product() {
  const { id } = useParams();
  const p = products.find((p) => p.id === Number(id));
  const { add, cart } = useStore();
  const [size, setSize] = useState(""),
    [color, setColor] = useState(""),
    [image, setImage] = useState(0),
    [error, setError] = useState("");
  useEffect(() => {
    setSize("");
    setColor(p?.colors[0] || "");
    setImage(0);
    setError("");
  }, [id]);
  if (!p) return <NotFound />;
  const available =
    p.stock -
    cart.filter((i) => i.id === p.id).reduce((s, i) => s + i.quantity, 0);
  return (
    <main className="page detail-page">
      <div className="breadcrumb">
        <Link to="/shop">TIENDA</Link>
        <span>/</span>
        <span>{p.name}</span>
      </div>
      <div className="detail-layout">
        <div className="detail-gallery">
          <div className="thumbnails">
            {[0, 1, 2].map((n) => (
              <button
                className={n === image ? "active" : ""}
                key={n}
                onClick={() => setImage(n)}
                aria-label={`Ver imagen de ${n === 0 ? "la prenda completa" : n === 1 ? "detalle" : "la tela"}`}
              >
                <img
                  src={p.image}
                  alt=""
                  style={{
                    objectPosition: n === 1 ? "top" : "center",
                    transform:
                      n === 1 ? "scale(1.5)" : n === 2 ? "scale(2)" : "none",
                  }}
                />
              </button>
            ))}
          </div>
          <div className={`detail-main-image view-${image}`}>
            <img src={p.image} alt={p.name} />
            {!p.stock && <span className="sold-out">AGOTADO</span>}
          </div>
        </div>
        <div className="detail-info">
          <span className="eyebrow">VULTURE ESENCIALES / 001</span>
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
            <button
              onClick={() =>
                (document.getElementById("size-guide").open = true)
              }
            >
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
                ? "Todas las unidades disponibles están en tu carrito"
                : `${available} disponibles — listos para enviar`}
          </p>
          <button
            className="button add-button"
            disabled={available <= 0}
            onClick={() =>
              size ? add(p, size, color) : setError("Elegí un talle.")
            }
          >
            {p.stock === 0
              ? "AGOTADO"
              : available === 0
                ? "TODAS LAS UNIDADES EN EL CARRITO"
                : "AGREGAR AL CARRITO"}
            <Plus size={18} />
          </button>
          <p className="shipping-note">
            ENVÍO GRATIS EN PEDIDOS DE MÁS DE USD 200
          </p>
          <div className="accordions">
            <details>
              <summary>
                DESCRIPCIÓN <Plus size={15} />
              </summary>
              <p>{p.description}</p>
            </details>
            <details>
              <summary>
                DETALLES <Plus size={15} />
              </summary>
              <p>
                Confección en algodón de primera calidad. Corte relajado. Diseñado para usar
                todos los días. Lavá con agua fría y colores similares, y secá al aire.
              </p>
            </details>
            <details>
              <summary>
                ENVÍO <Plus size={15} />
              </summary>
              <p>
                Entrega estándar en 3 a 5 días hábiles. Envío de USD 15,
                gratis en pedidos de más de USD 200. Esta es una tienda de
                demostración; no se cobran ni se envían pedidos.
              </p>
            </details>
            <details id="size-guide">
              <summary>
                GUÍA DE TALLES <Plus size={15} />
              </summary>
              <p>Diseñado con un corte amplio. Elegí tu talle habitual.</p>
              <table>
                <thead>
                  <tr>
                    <th>TALLE</th>
                    <th>PECHO</th>
                    <th>LARGO</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["S", "110 cm", "68 cm"],
                    ["M", "116 cm", "71 cm"],
                    ["L", "122 cm", "74 cm"],
                    ["XL", "128 cm", "77 cm"],
                  ].map((r) => (
                    <tr key={r[0]}>
                      {r.map((v) => (
                        <td key={v}>{v}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </details>
          </div>
        </div>
      </div>
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
