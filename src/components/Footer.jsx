import React from "react";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <Link className="wordmark" to="/">
          VULTURE<span className="brand-dot">®</span>
        </Link>
        <p>
          ESENCIALES PARA CADA DÍA.
          <br />
          Y PARA TODO LO DEMÁS.
        </p>
        <div>
          <Link to="/shop">TIENDA</Link>
          <Link to="/about">SOBRE VULTURE</Link>
          <a href="mailto:studio@vulture.example">CONTACTO</a>
        </div>
        <span className="footer-location">
          DISEÑADO CON INTENCIÓN.
          <br />
          PARA VESTIR SIN REGLAS.
        </span>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} VULTURE</span>
        <span>INDEPENDIENTES POR NATURALEZA.</span>
        <span>TODOS LOS DERECHOS RESERVADOS.</span>
      </div>
    </footer>
  );
}
