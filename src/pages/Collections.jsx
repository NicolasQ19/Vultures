import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
export default function Collections() {
  return (
    <main className="page collections-page">
      <div className="page-title">
        <span className="eyebrow">UNA EXPLORACIÓN CONTINUA</span>
        <h1>COLECCIONES</h1>
      </div>
      <Link to="/shop" className="collection-feature">
        <img src="/images/campaign.png" alt="Editorial de la colección 001 en el desierto" />
        <div>
          <span className="eyebrow">VOL. 001 / 2026</span>
          <h2>
            EL NUEVO
            <br />
            UNIFORME.
          </h2>
          <span className="text-link">
            EXPLORÁ LA COLECCIÓN <ArrowUpRight />
          </span>
        </div>
      </Link>
    </main>
  );
}
