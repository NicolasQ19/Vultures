import React, { useState, useEffect, createContext, useContext } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowUpRight, X } from "lucide-react";
import { products } from "./data";
const legacyColors = {
  "Washed black": "Negro lavado",
  Concrete: "Gris cemento",
  "Off-white": "Blanco crudo",
  Graphite: "Grafito",
  Sand: "Arena",
};
const Store = createContext();
export const useStore = () => useContext(Store);
export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("vulture-cart") || "[]");
      return Array.isArray(saved)
        ? saved
            .map((item) => {
              const color = legacyColors[item.color] || item.color;
              const size = item.size === "ONE SIZE" ? "TALLE ÚNICO" : item.size;
              return { ...item, color, size, key: `${item.id}-${size}-${color}` };
            })
            .filter(
              (i) =>
                products.some(
                  (p) =>
                    p.id === i.id &&
                    p.sizes.includes(i.size) &&
                    p.colors.includes(i.color) &&
                    p.stock > 0,
                ) &&
                Number.isInteger(i.quantity) &&
                i.quantity > 0,
            )
            .map((i) => ({
              ...i,
              quantity: Math.min(
                i.quantity,
                products.find((p) => p.id === i.id).stock,
              ),
            }))
        : [];
    } catch {
      return [];
    }
  });
  const [toast, setToast] = useState("");
  useEffect(() => {
    localStorage.setItem("vulture-cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(""), 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);
  const count = cart.reduce((s, i) => s + i.quantity, 0),
    subtotal = cart.reduce(
      (s, i) => s + products.find((p) => p.id === i.id).price * i.quantity,
      0,
    );
  const add = (product, size, color) => {
    const held = cart
      .filter((i) => i.id === product.id)
      .reduce((s, i) => s + i.quantity, 0);
    if (held >= product.stock) {
      setToast("Todas las unidades disponibles ya están en tu carrito.");
      return;
    }
    const key = `${product.id}-${size}-${color}`;
    setCart((c) =>
      c.some((i) => i.key === key)
        ? c.map((i) => (i.key === key ? { ...i, quantity: i.quantity + 1 } : i))
        : [...c, { key, id: product.id, size, color, quantity: 1 }],
    );
    setToast(`${product.name} se agregó a tu carrito.`);
  };
  const quantity = (key, delta) => {
    const item = cart.find((i) => i.key === key);
    const p = products.find((p) => p.id === item.id);
    if (
      delta > 0 &&
      cart.filter((i) => i.id === p.id).reduce((s, i) => s + i.quantity, 0) >=
        p.stock
    ) {
      setToast("Alcanzaste la cantidad máxima disponible.");
      return;
    }
    setCart((c) =>
      c.map((i) =>
        i.key === key ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i,
      ),
    );
  };
  return (
    <Store.Provider
      value={{
        cart,
        count,
        subtotal,
        add,
        quantity,
        remove: (key) => setCart((c) => c.filter((i) => i.key !== key)),
        clear: () => setCart([]),
      }}
    >
      {children}
      {toast && (
        <div className="toast" role="status">
          <Check size={16} />
          <span>{toast}</span>
          <Link to="/cart">
            VER CARRITO <ArrowUpRight size={14} />
          </Link>
          <button
            aria-label="Cerrar notificación"
            onClick={() => setToast("")}
          >
            <X size={16} />
          </button>
        </div>
      )}
    </Store.Provider>
  );
}
