import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowRight, X, Search, ChevronDown } from "lucide-react";
import { products, categories, money } from "../data";
import ProductCard from "../components/ProductCard";
export default function Shop() {
  const [params, setParams] = useSearchParams();
  const category = params.get("category") || "TODOS",
    query = params.get("q") || "";
  const [sort, setSort] = useState("featured");
  const visible = products
    .filter(
      (p) =>
        (category === "TODOS" || p.category === category) &&
        p.name.toLowerCase().includes(query.toLowerCase()),
    )
    .sort((a, b) =>
      sort === "low"
        ? a.price - b.price
        : sort === "high"
          ? b.price - a.price
          : a.id - b.id,
    );
  const update = (key, value) => {
    const next = new URLSearchParams(params);
    value ? next.set(key, value) : next.delete(key);
    setParams(next);
  };
  return (
    <main className="shop-page page">
      <div className="page-title">
        <span className="eyebrow">COLECCIÓN 001 / EL NUEVO UNIFORME</span>
        <h1>
          LA COLECCIÓN<span>({products.length})</span>
        </h1>
        <p>Esenciales pensados para tu día a día.</p>
      </div>
      <div className="shop-layout">
        <aside className="categories">
          <span className="eyebrow">EXPLORÁ</span>
          {categories.map((c) => (
            <button
              key={c}
              className={category === c ? "selected" : ""}
              onClick={() => update("category", c === "TODOS" ? "" : c)}
            >
              {c}
              <span>
                {c === "TODOS"
                  ? products.length
                  : products.filter((p) => p.category === c).length}
              </span>
            </button>
          ))}
        </aside>
        <div className="catalogue">
          <div className="catalogue-toolbar">
            <span>
              {category === "TODOS" ? "TODOS LOS PRODUCTOS" : category} ({visible.length}
              )
            </span>
            <label className="sort-label">
              ORDENAR POR{" "}
              <select
                aria-label="Ordenar productos"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="featured">DESTACADOS</option>
                <option value="low">PRECIO: MENOR A MAYOR</option>
                <option value="high">PRECIO: MAYOR A MENOR</option>
              </select>
              <ChevronDown size={12} />
            </label>
          </div>
          <div className="catalogue-search">
            <Search size={15} />
            <input
              aria-label="Buscar por nombre"
              placeholder="Buscar en la colección"
              value={query}
              onChange={(e) => update("q", e.target.value)}
            />
            {query && (
              <button aria-label="Limpiar búsqueda" onClick={() => update("q", "")}>
                <X size={15} />
              </button>
            )}
          </div>
          <div className="product-grid">
            {visible.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          {!visible.length && (
            <div className="empty-state">
              <h2>NO ENCONTRAMOS RESULTADOS.</h2>
              <p>Probá con otro nombre o explorá todos los esenciales.</p>
              <button className="button" onClick={() => setParams({})}>
                VER TODOS LOS PRODUCTOS <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
