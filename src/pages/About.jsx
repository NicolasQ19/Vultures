import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
export default function About() {
  return (
    <main className="page about-page">
      <span className="eyebrow">INDEPENDIENTES POR NATURALEZA.</span>
      <h1>
        OTRO
        <br />
        PUNTO DE VISTA.
      </h1>
      <div className="about-layout">
        <img
          src="/images/campaign.png"
          alt="Campaña de Vulture en un paisaje desértico"
        />
        <div>
          <span className="eyebrow">ESTO ES VULTURE.</span>
          <h2>
            MENOS RUIDO.
            <br />
            MÁS PRESENCIA.
          </h2>
          <p>
            Creemos que tu ropa debe darte espacio. Para moverte. Para pensar. Para
            ser vos.
          </p>
          <p>
            VULTURE es una exploración independiente de la ropa de todos los días. Trabajamos
            con siluetas cuidadas, una paleta discreta y materiales auténticos.
            Prendas que trascienden las temporadas y se vuelven parte de tu historia.
          </p>
          <p>Esenciales para cada día. Y para todo lo demás.</p>
          <Link className="button" to="/shop">
            EXPLORÁ LA COLECCIÓN <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </main>
  );
}
