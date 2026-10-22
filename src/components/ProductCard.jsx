import styles from "./ProductCard.module.css";
import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Plus } from "lucide-react";
import { money } from "../data";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { cart, add } = useCart();

  let enCarrito = 0;
  for (const item of cart) {
    enCarrito += item.id === product.id ? item.quantity : 0;
  }
  const disponibles = product.stock - enCarrito;

  return (
    <article className={styles.productCard} data-testid="product-card">
      <Link to={"/product/" + product.id} className={styles.productImage}>
        <img
          src={product.image}
          alt={product.name.toLowerCase()}
          loading="lazy"
        />
        {product.stock === 0 && <span className="sold-out">AGOTADO</span>}
        <span className={styles.productArrow}>
          <ArrowUpRight size={19} />
        </span>
      </Link>

      <p className={styles.productCategory}>{product.category}</p>
      <div className={styles.productMeta}>
        <h3>
          <Link to={"/product/" + product.id}>{product.name}</Link>
        </h3>
        <span>{money(product.price)}</span>
      </div>
      <p className={styles.productDescription}>{product.description}</p>
      <p className={styles.productStock}>
        {product.stock === 0
          ? "SIN STOCK"
          : product.stock +
            " EN STOCK · " +
            product.colors[0] +
            (product.colors.length > 1
              ? " / +" + (product.colors.length - 1) + " color"
              : "")}
      </p>

      <div className={styles.productActions}>
        <Link to={"/product/" + product.id} className={styles.detailLink}>
          VER DETALLE
        </Link>
        <button
          className={styles.addButton}
          disabled={disponibles <= 0}
          onClick={() => add(product, product.sizes[0], product.colors[0])}
        >
          {product.stock === 0
            ? "SIN STOCK"
            : disponibles <= 0
              ? "SIN STOCK"
              : "AGREGAR"}
          <Plus size={13} />
        </button>
      </div>
    </article>
  );
}
