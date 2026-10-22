import "./Checkout.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Check } from "lucide-react";
import { products, money } from "../data";
import { useCart } from "../context/CartContext";
import OrderSummary from "../components/OrderSummary";

export default function Checkout() {
  const { cart, clear } = useCart();

  const [datos, setDatos] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    delivery: "standard",
    notes: "",
  });
  const [errores, setErrores] = useState({});
  const [pedido, setPedido] = useState("");

  function manejarCambio(e) {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
    setErrores({ ...errores, [name]: "" });
  }

  function validar() {
    const nuevos = {};
    const obligatorios = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "postalCode",
    ];

    for (const campo of obligatorios) {
      if (!datos[campo].trim()) nuevos[campo] = "Este campo es obligatorio.";
    }

    if (datos.email.trim() && !datos.email.includes("@"))
      nuevos.email = "Ingresá un correo electrónico válido.";
    if (datos.phone.trim() && datos.phone.length < 7)
      nuevos.phone = "Ingresá un número de teléfono válido.";

    return nuevos;
  }

  function manejarEnvio(e) {
    e.preventDefault();
    const nuevos = validar();
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) return;
    setPedido("VLT-" + Date.now().toString().slice(-7));
    clear();
    window.scrollTo(0, 0);
  }

  if (pedido) {
    return (
      <main className="page confirmation">
        <span className="confirmation-mark">
          <Check size={32} />
        </span>
        <span className="eyebrow">PEDIDO {pedido}</span>
        <h1>
          YA SOS PARTE
          <br />
          DE ESTE MUNDO.
        </h1>
        <p>Gracias, {datos.firstName}. Tu pedido de prueba está confirmado.</p>
        <p>Detalles de confirmación: {datos.email}</p>
        <Link className="button" to="/shop">
          VOLVER A LA COLECCIÓN <ArrowUpRight size={17} />
        </Link>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="page empty-state">
        <h1>TU CARRITO ESTÁ VACÍO.</h1>
        <p>Agregá un esencial antes de finalizar la compra.</p>
        <Link className="button" to="/shop">
          COMPRAR AHORA <ArrowRight size={16} />
        </Link>
      </main>
    );
  }
  
  return (
    <main className="page checkout-page">
      <div className="page-title">
        <span className="eyebrow">UN PASO MÁS CERCA.</span>
        <h1>FINALIZAR COMPRA</h1>
      </div>
      <div className="checkout-layout">
        <form onSubmit={manejarEnvio} noValidate>
          <h2>TUS DATOS</h2>
          <div className="form-grid">
            <label>
              Nombre
              <input
                id="firstName"
                name="firstName"
                value={datos.firstName}
                onChange={manejarCambio}
              />
              {errores.firstName && (
                <span className="field-error">{errores.firstName}</span>
              )}
            </label>
            <label>
              Apellido
              <input
                id="lastName"
                name="lastName"
                value={datos.lastName}
                onChange={manejarCambio}
              />
              {errores.lastName && (
                <span className="field-error">{errores.lastName}</span>
              )}
            </label>
            <label>
              Correo electrónico
              <input
                id="email"
                name="email"
                type="email"
                value={datos.email}
                onChange={manejarCambio}
              />
              {errores.email && (
                <span className="field-error">{errores.email}</span>
              )}
            </label>
            <label>
              Teléfono
              <input
                id="phone"
                name="phone"
                type="tel"
                value={datos.phone}
                onChange={manejarCambio}
              />
              {errores.phone && (
                <span className="field-error">{errores.phone}</span>
              )}
            </label>
            <label className="wide">
              Dirección
              <input
                id="address"
                name="address"
                value={datos.address}
                onChange={manejarCambio}
              />
              {errores.address && (
                <span className="field-error">{errores.address}</span>
              )}
            </label>
            <label>
              Ciudad
              <input
                id="city"
                name="city"
                value={datos.city}
                onChange={manejarCambio}
              />
              {errores.city && (
                <span className="field-error">{errores.city}</span>
              )}
            </label>
            <label>
              Código postal
              <input
                id="postalCode"
                name="postalCode"
                value={datos.postalCode}
                onChange={manejarCambio}
              />
              {errores.postalCode && (
                <span className="field-error">{errores.postalCode}</span>
              )}
            </label>
          </div>
          <h2>ENTREGA</h2>
          <label className="form-label">
            Método de entrega
            <select
              name="delivery"
              value={datos.delivery}
              onChange={manejarCambio}
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
              name="notes"
              rows="4"
              value={datos.notes}
              onChange={manejarCambio}
              placeholder="¿Hay algo que debamos saber?"
            />
          </label>
          <p className="checkout-note">
            Esta compra es de prueba. No se requieren datos de pago y no se
            realizará ningún cobro.
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
          <OrderSummary checkout pickup={datos.delivery === "pickup"} />
        </div>
      </div>
    </main>
  );
}
