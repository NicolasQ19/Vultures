import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import { products, money } from "../data";
import { useStore } from "../store";
import OrderSummary from "../components/OrderSummary";
export default function Cart() {
  const { cart, count, quantity, remove } = useStore();
  return (
    <main className="page cart-page">
      <div className="page-title">
        <span className="eyebrow">TU DÍA A DÍA, CON INTENCIÓN.</span>
        <h1>
          CARRITO<span>({count})</span>
        </h1>
      </div>
      {!cart.length ? (
        <div className="empty-state">
          <h2>ESPACIO PARA ALGO BUENO.</h2>
          <p>Tu carrito está vacío. Encontrá tu nuevo esencial para todos los días.</p>
          <Link className="button" to="/shop">
            EXPLORÁ LA COLECCIÓN <ArrowUpRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            <div className="cart-table-header">
              <span>PRODUCTO</span>
              <span>CANTIDAD / TOTAL</span>
            </div>
            {cart.map((item) => {
              const p = products.find((p) => p.id === item.id);
              return (
                <div className="cart-item" key={item.key}>
                  <Link to={`/product/${p.id}`}>
                    <img src={p.image} alt={p.name} />
                  </Link>
                  <div className="cart-item-info">
                    <Link to={`/product/${p.id}`}>{p.name}</Link>
                    <p>
                      {item.color} / {item.size}
                    </p>
                    <span>{money(p.price)}</span>
                    <button
                      className="remove-link"
                      onClick={() => remove(item.key)}
                    >
                      QUITAR
                    </button>
                  </div>
                  <div className="cart-item-end">
                    <div className="quantity-control">
                      <button
                        aria-label={`Disminuir cantidad de ${p.name}`}
                        onClick={() => quantity(item.key, -1)}
                        disabled={item.quantity === 1}
                      >
                        <Minus size={12} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        aria-label={`Aumentar cantidad de ${p.name}`}
                        onClick={() => quantity(item.key, 1)}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <span>{money(p.price * item.quantity)}</span>
                  </div>
                </div>
              );
            })}
            <Link to="/shop" className="text-link continue-link">
              SEGUÍ EXPLORANDO <ArrowUpRight size={16} />
            </Link>
          </div>
          <OrderSummary />
        </div>
      )}
    </main>
  );
}
