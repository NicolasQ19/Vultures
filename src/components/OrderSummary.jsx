import "./OrderSummary.css";
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { money } from "../data";
import { useCart } from "../context/CartContext";
export default function OrderSummary({ checkout = false, pickup = false }) {
  const { subtotal, count } = useCart();

  const shipping = pickup || subtotal >= 200000 || count === 0 ? 0 : 15000;
  return (
    <div className="order-summary">
      <span className="eyebrow">RESUMEN DEL PEDIDO</span>
      <div>
        <span>SUBTOTAL</span>
        <span>{money(subtotal)}</span>
      </div>
      <div>
        <span>ENVÍO</span>
        <span>{shipping === 0 ? "GRATIS" : money(shipping)}</span>
      </div>
      <div className="summary-total">
        <span>TOTAL</span>
        <span>{money(subtotal + shipping)}</span>
      </div>
      {checkout === false && (
        <Link to="/checkout" className="button">
          FINALIZAR COMPRA <ArrowRight size={17} />
        </Link>
      )}
      <p>Hecho con dedicación. Entregado con cuidado.</p>
      <span className="simulation-note">
        TIENDA DE DEMOSTRACIÓN — NO REQUIERE PAGO
      </span>
    </div>
  );
}
