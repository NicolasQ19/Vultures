import "./Home.css";
import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { products } from "../data";
import ProductCard from "../components/ProductCard";
export default function Home() {
  return (
    <>
      <section className="hero">
        <img
          className="hero-image"
          src="/imagenes/bannerHero.png"
          alt="Editorial de Vulture — dos modelos con ropa urbana negra de corte amplio en un paisaje árido"
        />
        <div className="hero-content">
          <h1>
            ESENCIALES
            <br />
            PARA
            <br />
            CADA DÍA<span className="headline-dot">.</span>
          </h1>
          <div className="hero-bottom">
            <Link to="/shop" className="button">
              COMPRAR AHORA <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      <section className="home-products">
        <div className="section-heading">
          <div>
            <span className="eyebrow">TUS PRENDAS DE CADA DÍA</span>
            <h2>
              ESENCIALES SELECCIONADOS
              <span className="heading-number">(04)</span>
            </h2>
          </div>
          <Link to="/shop" className="text-link">
            VER TODO <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="product-grid">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
      <section className="editorial">
        <div className="editorial-image">
          <img
            src="/imagenes/bannerHero.png"
            alt="El nuevo uniforme de Vulture"
            loading="lazy"
          />
          <span>VULTURE STUDIOS / VOL. 001</span>
        </div>
        <div className="editorial-copy">
          <span className="eyebrow">LA FILOSOFÍA</span>
          <h2>
            MENOS RUIDO.
            <br />
            MÁS PRESENCIA.
          </h2>
          <p>
            Siluetas cuidadas. Materiales auténticos. Solo lo necesario. Hacemos
            ropa para tu forma de moverte por el mundo.
          </p>
          <Link className="text-link" to="/contacto">
            ESCRIBINOS <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
