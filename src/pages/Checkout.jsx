import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Check } from "lucide-react";
import { products, money } from "../data";
import { useStore } from "../store";
import OrderSummary from "../components/OrderSummary";
const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  delivery: "standard",
  notes: "",
};
export default function Checkout() {
  const { cart, clear } = useStore();
  const [form, setForm] = useState(initialForm),
    [errors, setErrors] = useState({}),
    [order, setOrder] = useState("");
  const submit = (e) => {
    e.preventDefault();
    const next = {};
    [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "postalCode",
    ].forEach((k) => {
      if (!form[k].trim()) next[k] = "Este campo es obligatorio.";
    });
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Ingresá un correo electrónico válido.";
    if (form.phone && !/^[+()\d\s-]{7,25}$/.test(form.phone))
      next.phone = "Ingresá un número de teléfono válido.";
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(Object.keys(next)[0])?.focus();
      return;
    }
    setOrder(`VLT-${Date.now().toString().slice(-7)}`);
    clear();
    window.scrollTo(0, 0);
  };
  if (order)
    return (
      <main className="page confirmation">
        <span className="confirmation-mark">
          <Check size={32} />
        </span>
        <span className="eyebrow">PEDIDO {order}</span>
        <h1>
          YA SOS PARTE
          <br />
          DE ESTE MUNDO.
        </h1>
        <p>Gracias, {form.firstName}. Tu pedido de prueba está confirmado.</p>
        <p>
          Detalles de confirmación: {form.email}
          <br />
          No se realizó ningún cobro. Esta es una compra de demostración.
        </p>
        <Link className="button" to="/shop">
          VOLVER A LA COLECCIÓN <ArrowUpRight size={17} />
        </Link>
      </main>
    );
  if (!cart.length)
    return (
      <main className="page empty-state">
        <h1>TU CARRITO ESTÁ VACÍO.</h1>
        <p>Agregá un esencial antes de finalizar la compra.</p>
        <Link className="button" to="/shop">
          COMPRAR AHORA <ArrowRight size={16} />
        </Link>
      </main>
    );
  return (
    <main className="page checkout-page">
      <div className="page-title">
        <span className="eyebrow">UN PASO MÁS CERCA.</span>
        <h1>FINALIZAR COMPRA</h1>
      </div>
      <div className="checkout-layout">
        <form onSubmit={submit} noValidate>
          <h2>TUS DATOS</h2>
          <div className="form-grid">
            {[
              ["firstName", "Nombre"],
              ["lastName", "Apellido"],
              ["email", "Correo electrónico"],
              ["phone", "Teléfono"],
              ["address", "Dirección"],
              ["city", "Ciudad"],
              ["postalCode", "Código postal"],
            ].map(([key, label]) => (
              <label className={key === "address" ? "wide" : ""} key={key}>
                {label}
                <input
                  id={key}
                  name={key}
                  value={form[key]}
                  type={
                    key === "email" ? "email" : key === "phone" ? "tel" : "text"
                  }
                  autoComplete={
                    {
                      firstName: "given-name",
                      lastName: "family-name",
                      email: "email",
                      phone: "tel",
                      address: "street-address",
                      city: "address-level2",
                      postalCode: "postal-code",
                    }[key]
                  }
                  onChange={(e) => {
                    setForm({ ...form, [key]: e.target.value });
                    setErrors({ ...errors, [key]: "" });
                  }}
                  aria-invalid={!!errors[key]}
                  aria-describedby={errors[key] ? `${key}-error` : undefined}
                />
                {errors[key] && (
                  <span className="field-error" id={`${key}-error`}>
                    {errors[key]}
                  </span>
                )}
              </label>
            ))}
          </div>
          <h2>ENTREGA</h2>
          <label className="form-label">
            Método de entrega
            <select
              value={form.delivery}
              onChange={(e) => setForm({ ...form, delivery: e.target.value })}
            >
              <option value="standard">
                Envío estándar — 3 a 5 días hábiles
              </option>
              <option value="pickup">Retiro en el estudio — gratis</option>
            </select>
          </label>
          <label className="form-label">
            Mensaje / Notas
            <textarea
              rows="4"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="¿Hay algo que debamos saber?"
            />
          </label>
          <p className="checkout-note">
            Esta compra es de prueba. No se requieren datos de pago y
            no se realizará ningún cobro.
          </p>
          <button className="button" type="submit">
            CONFIRMAR PEDIDO <ArrowRight size={17} />
          </button>
        </form>
        <div>
          <div className="checkout-items">
            {cart.map((item) => {
              const p = products.find((p) => p.id === item.id);
              return (
                <div key={item.key}>
                  <img src={p.image} alt={p.name} />
                  <p>
                    {p.name}
                    <small>
                      {item.size} / {item.color} / CANT. {item.quantity}
                    </small>
                  </p>
                  <span>{money(p.price * item.quantity)}</span>
                </div>
              );
            })}
          </div>
          <OrderSummary checkout pickup={form.delivery === "pickup"} />
        </div>
      </div>
    </main>
  );
}
