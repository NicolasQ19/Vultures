import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, ArrowUpRight, X, Menu, Search } from "lucide-react";
import { useStore } from "../store";
export default function Header() {
  const { count } = useStore();
  const [mobile, setMobile] = useState(false),
    [search, setSearch] = useState(false),
    [query, setQuery] = useState("");
  const location = useLocation(),
    navigate = useNavigate();
  useEffect(() => {
    setMobile(false);
    setSearch(false);
    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);
  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);
  const submit = (e) => {
    e.preventDefault();
    navigate(`/shop?q=${encodeURIComponent(query)}`);
    setSearch(false);
  };
  return (
    <>
      <header className="header">
        <Link to="/" className="wordmark" aria-label="Inicio de Vulture">
          VULTURE<span className="brand-dot">®</span>
        </Link>
        <nav className="desktop-nav">
          <NavLink to="/shop">TIENDA</NavLink>
          <Link to="/collections">COLECCIONES</Link>
          <Link to="/about">NOSOTROS</Link>
        </nav>
        <div className="header-actions">
          <button
            className="search-toggle"
            onClick={() => setSearch(!search)}
            aria-expanded={search}
          >
            BUSCAR
          </button>
          <Link to="/cart">CARRITO ({count})</Link>
          <button
            className="mobile-toggle"
            onClick={() => setMobile(!mobile)}
            aria-label="Abrir navegación"
          >
            {mobile ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>
      {search && (
        <form onSubmit={submit} className="search-panel">
          <Search size={20} />
          <input
            autoFocus
            placeholder="BUSCAR EN LA COLECCIÓN"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Buscar productos"
          />
          <button type="submit">
            <ArrowRight size={22} />
          </button>
          <button
            type="button"
            onClick={() => setSearch(false)}
            aria-label="Cerrar búsqueda"
          >
            <X size={20} />
          </button>
        </form>
      )}
      {mobile && (
        <nav className="mobile-nav">
          <span className="eyebrow">EXPLORÁ VULTURE</span>
          <Link to="/shop">
            TIENDA <ArrowUpRight />
          </Link>
          <Link to="/collections">
            COLECCIONES <ArrowUpRight />
          </Link>
          <Link to="/about">
            NOSOTROS <ArrowUpRight />
          </Link>
          <Link to="/cart">
            CARRITO ({count}) <ArrowUpRight />
          </Link>
          <span className="eyebrow">ESENCIALES PARA CADA DÍA Y MÁS ALLÁ.</span>
        </nav>
      )}
    </>
  );
}
