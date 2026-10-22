import "./Navbar.css";
import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, ArrowUpRight, X, Menu, Search } from "lucide-react";
import { useCart } from "../context/CartContext";
import Offcanvas from "react-bootstrap/Offcanvas";

const paginas = [
  { to: "/", texto: "INICIO" },
  { to: "/shop", texto: "TIENDA" },
  { to: "/contacto", texto: "CONTACTO" },
];

export default function Navbar() {
  const { count } = useCart();

  const [menuAbierto, setMenuAbierto] = useState(false);
  const [buscadorAbierto, setBuscadorAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMenuAbierto(false);
    setBuscadorAbierto(false);
    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);

  function manejarBusqueda(e) {
    e.preventDefault();
    navigate("/shop?q=" + encodeURIComponent(busqueda));
    setBuscadorAbierto(false);
  }

  return (
    <>
      <header className="header">
        <Link to="/" className="wordmark" aria-label="Inicio de Vulture">
          VULTURE<span className="brand-dot">®</span>
        </Link>
        <nav className="desktop-nav">
          {paginas.map((pagina) => (
            <NavLink key={pagina.to} to={pagina.to} end={pagina.to === "/"}>
              {pagina.texto}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="search-toggle"
            onClick={() => setBuscadorAbierto(!buscadorAbierto)}
          >
            BUSCAR
          </button>
          <Link to="/cart">CARRITO ({count})</Link>
          <button
            className="mobile-toggle"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label="Abrir navegación"
          >
            {menuAbierto ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {buscadorAbierto && (
        <form onSubmit={manejarBusqueda} className="search-panel">
          <Search size={20} />
          <input
            autoFocus
            placeholder="BUSCAR EN LA COLECCIÓN"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            aria-label="Buscar productos"
          />
          <button type="submit">
            <ArrowRight size={22} />
          </button>
          <button
            type="button"
            onClick={() => setBuscadorAbierto(false)}
            aria-label="Cerrar búsqueda"
          >
            <X size={20} />
          </button>
        </form>
      )}

      <Offcanvas
        show={menuAbierto}
        onHide={() => setMenuAbierto(false)}
        placement="end"
        className="mobile-nav"
        backdrop={false}
      >
        <Offcanvas.Body>
          <span className="eyebrow">EXPLORÁ VULTURE</span>
          {paginas.map((pagina) => (
            <Link key={pagina.to} to={pagina.to}>
              {pagina.texto} <ArrowUpRight />
            </Link>
          ))}
          <Link to="/cart">
            CARRITO ({count}) <ArrowUpRight />
          </Link>
          <span className="eyebrow">ESENCIALES PARA CADA DÍA Y MÁS ALLÁ.</span>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
