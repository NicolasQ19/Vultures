import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { money } from "../data";
export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image">
        <img
          src={product.image}
          alt={product.name.toLowerCase()}
          loading="lazy"
        />
        {!product.stock && <span className="sold-out">AGOTADO</span>}
        <span className="product-arrow">
          <ArrowUpRight size={19} />
        </span>
      </div>
      <div className="product-meta">
        <h3>{product.name}</h3>
        <span>{money(product.price)}</span>
      </div>
      <p className="product-color">
        {product.colors[0]}
        {product.colors.length > 1
          ? ` / +${product.colors.length - 1} color`
          : ""}
      </p>
    </Link>
  );
}
