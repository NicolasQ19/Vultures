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
          src="/images/campaign.png"
          alt="Editorial de Vulture — dos modelos con ropa urbana negra de corte amplio en un paisaje árido"
        />
        <div className="hero-topline">
          <span>COLECCIÓN 001 — EL NUEVO UNIFORME</span>
          <span>INDEPENDIENTES POR NATURALEZA.</span>
        </div>
        <div className="hero-content">
          <span className="hero-kicker">HECHO PARA VOS. A TU MANERA.</span>
          <h1>
            ROPA
            <br />
            PARA OTRO
            <br />
            MUNDO<span className="headline-dot">.</span>
          </h1>
          <div className="hero-bottom">
            <p>
              ESENCIALES
              <br />
              PARA CADA DÍA
              <br />
              Y MÁS ALLÁ.
            </p>
            <Link to="/shop" className="button">
              COMPRAR AHORA <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
        <div className="hero-caption">
          <span>VULTURE / CAMPAÑA 001</span>
          <span>
            DESLIZÁ PARA EXPLORAR <ArrowDown size={13} />
          </span>
          <span>01 — 03</span>
        </div>
      </section>
      <section className="manifesto-strip">
        <span className="small-cross">✳</span>
        <p>
          MENOS, PERO MEJOR.<span> UN GUARDARROPA SIN LÍMITES.</span>
        </p>
        <span className="eyebrow">HECHO PARA DURAR. PENSADO PARA VIVIR.</span>
      </section>
      <section className="home-products">
        <div className="section-heading">
          <div>
            <span className="eyebrow">TUS PRENDAS DE CADA DÍA</span>
            <h2>
              ESENCIALES SELECCIONADOS<span className="heading-number">(04)</span>
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
            src="/images/campaign.png"
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
            Siluetas cuidadas. Materiales auténticos. Solo lo necesario.
            Hacemos ropa para tu forma de moverte por el mundo.
          </p>
          <Link className="text-link" to="/about">
            DESCUBRÍ VULTURE <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
