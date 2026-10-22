import React, { useState, useEffect, createContext, useContext } from "react";
import { products } from "../data";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

function leerCarritoGuardado() {
  const texto = localStorage.getItem("vulture-cart");
  if (!texto) return [];

  let guardado;
  try {
    guardado = JSON.parse(texto);
  } catch {
    return [];
  }
  if (!Array.isArray(guardado)) return [];

  const validos = [];
  for (const item of guardado) {
    const producto = products.find((p) => p.id === item.id);
    if (!producto) continue;
    if (!producto.sizes.includes(item.size)) continue;
    if (!producto.colors.includes(item.color)) continue;
    if (!(item.quantity > 0)) continue;

    validos.push({
      key: item.id + "-" + item.size + "-" + item.color,
      id: item.id,
      size: item.size,
      color: item.color,
      quantity: Math.min(item.quantity, producto.stock),
    });
  }
  return validos;
}

function unidadesEnCarrito(carrito, id) {
  let total = 0;
  for (const item of carrito) {
    total += item.id === id ? item.quantity : 0;
  }
  return total;
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(leerCarritoGuardado);

  useEffect(() => {
    localStorage.setItem("vulture-cart", JSON.stringify(cart));
  }, [cart]);

  let count = 0;
  let subtotal = 0;
  for (const item of cart) {
    const producto = products.find((p) => p.id === item.id);
    count += item.quantity;
    subtotal += producto.price * item.quantity;
  }

  function add(producto, size, color) {
    if (unidadesEnCarrito(cart, producto.id) >= producto.stock) {
      return "Todas las unidades disponibles ya están en tu carrito.";
    }

    const key = producto.id + "-" + size + "-" + color;
    const yaEsta = cart.find((item) => item.key === key);

    setCart(
      yaEsta
        ? cart.map((item) =>
            item.key === key ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [...cart, { key, id: producto.id, size, color, quantity: 1 }],
    );
  }

  function quantity(key, delta) {
    const item = cart.find((i) => i.key === key);
    const producto = products.find((p) => p.id === item.id);

    if (delta > 0 && unidadesEnCarrito(cart, producto.id) >= producto.stock) {
      return "Alcanzaste la cantidad máxima disponible.";
    }

    setCart(
      cart.map((i) =>
        i.key === key ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i,
      ),
    );
  }

  function remove(key) {
    setCart(cart.filter((item) => item.key !== key));
  }

  function clear() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{ cart, count, subtotal, add, quantity, remove, clear }}
    >
      {children}
    </CartContext.Provider>
  );
}
