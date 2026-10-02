import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
export default function NotFound() {
  return (
    <main className="page empty-state">
      <span className="eyebrow">404 / FUERA DEL MARCO</span>
      <h1>NO HAY NADA ACÁ.</h1>
      <Link className="button" to="/">
        VOLVER AL INICIO <ArrowUpRight size={16} />
      </Link>
    </main>
  );
}
