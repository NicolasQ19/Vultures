import "./Contact.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Check } from "lucide-react";

export default function Contact() {
  const [datos, setDatos] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "consulta",
    mensaje: "",
  });
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  function manejarCambio(e) {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
    setErrores({ ...errores, [name]: "" });
  }

  function validar() {
    const nuevos = {};
    if (!datos.nombre.trim()) nuevos.nombre = "Este campo es obligatorio.";
    if (!datos.email.trim()) nuevos.email = "Este campo es obligatorio.";
    else if (!datos.email.includes("@"))
      nuevos.email = "Ingresá un correo electrónico válido.";
    if (!datos.telefono.trim()) nuevos.telefono = "Este campo es obligatorio.";
    if (!datos.mensaje.trim()) nuevos.mensaje = "Contanos en qué te ayudamos.";
    return nuevos;
  }

  function manejarEnvio(e) {
    e.preventDefault();
    const nuevos = validar();
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) return;
    setEnviado(true);
    window.scrollTo(0, 0);
  }

  if (enviado) {
    return (
      <main className="page confirmation">
        <span className="confirmation-mark">
          <Check size={32} />
        </span>
        <span className="eyebrow">MENSAJE RECIBIDO</span>
        <h1>
          GRACIAS POR
          <br />
          ESCRIBIRNOS.
        </h1>
        <p>
          Gracias, {datos.nombre}. Recibimos tu mensaje y te respondemos a{" "}
          {datos.email} dentro de las próximas 48 horas hábiles.
        </p>
        <Link className="button" to="/shop">
          VOLVER A LA COLECCIÓN <ArrowUpRight size={17} />
        </Link>
      </main>
    );
  }

  return (
    <main className="page contact-page">
      <div className="page-title">
        <span className="eyebrow">ESTAMOS DEL OTRO LADO.</span>
        <h1>CONTACTO</h1>
        <p>Escribinos y te respondemos dentro de las 48 horas hábiles.</p>
      </div>

      <div className="contact-layout">
        <form onSubmit={manejarEnvio} noValidate>
          <h2>TU MENSAJE</h2>
          <div className="form-grid">
            <label>
              Nombre y apellido
              <input
                id="nombre"
                name="nombre"
                value={datos.nombre}
                onChange={manejarCambio}
              />
              {errores.nombre && (
                <span className="field-error">{errores.nombre}</span>
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
                id="telefono"
                name="telefono"
                type="tel"
                value={datos.telefono}
                onChange={manejarCambio}
              />
              {errores.telefono && (
                <span className="field-error">{errores.telefono}</span>
              )}
            </label>
            <label>
              Motivo
              <select
                name="asunto"
                value={datos.asunto}
                onChange={manejarCambio}
              >
                <option value="consulta">Consulta general</option>
                <option value="pedido">Estado de un pedido</option>
                <option value="cambio">Cambios y devoluciones</option>
                <option value="talles">Dudas con los talles</option>
              </select>
            </label>
            <label className="wide">
              Mensaje
              <textarea
                id="mensaje"
                name="mensaje"
                rows="5"
                value={datos.mensaje}
                onChange={manejarCambio}
                placeholder="Contanos en qué podemos ayudarte."
              />
              {errores.mensaje && (
                <span className="field-error">{errores.mensaje}</span>
              )}
            </label>
          </div>
          <p className="contact-note">
            Este es un sitio de demostración. El formulario no envía datos a
            ningún servidor.
          </p>
          <button className="button" type="submit">
            ENVIAR MENSAJE <ArrowRight size={17} />
          </button>
        </form>

        <aside className="contact-info">
          <img
            src="/imagenes/bannerHero.png"
            alt="Campaña de Vulture en un paisaje desértico"
          />
          <span className="eyebrow">ESTO ES VULTURE.</span>
          <h2>
            MENOS RUIDO.
            <br />
            MÁS PRESENCIA.
          </h2>
          <p>
            Somos una exploración independiente de la ropa de todos los días.
            Siluetas cuidadas, paleta discreta y materiales auténticos.
          </p>
          <dl>
            <dt>CORREO</dt>
            <dd>ciu@vulture.com.ar</dd>
            <dt>TELÉFONO</dt>
            <dd>+54 11 66129771</dd>
            <dt>ESTUDIO</dt>
            <dd>
              Hurlingham, Buenos Aires
              <br />
              Lunes a viernes de 10 a 18 h
            </dd>
          </dl>
        </aside>
      </div>
    </main>
  );
}
