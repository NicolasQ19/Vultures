import { test, expect } from "@playwright/test";
test("catalogue search, categories and price sorting", async ({ page }) => {
  await page.goto("/shop");
  await expect(page.locator(".product-card")).toHaveCount(12);
  await page.getByRole("button", { name: "BUZOS" }).click();
  await expect(page.locator(".product-card")).toHaveCount(3);
  await page.getByLabel("Ordenar productos").selectOption("low");
  await expect(page.locator(".product-card").first()).toContainText(
    "BUZO DE CUELLO REDONDO",
  );
  await page.getByLabel("Buscar por nombre").fill("cierre");
  await expect(page.locator(".product-card")).toHaveCount(1);
  await expect(page.locator(".product-card")).toContainText(
    "BUZO CON CAPUCHA Y CIERRE",
  );
});
test("size selection, stock limits, cart quantities and persistence", async ({
  page,
}) => {
  await page.goto("/product/11");
  await page.getByRole("button", { name: "AGREGAR AL CARRITO" }).click();
  await expect(page.getByRole("alert")).toHaveText("Elegí un talle.");
  await page.getByRole("button", { name: "M", exact: true }).click();
  await page.getByRole("button", { name: "AGREGAR AL CARRITO" }).click();
  await page.goto("/cart");
  await expect(page.locator(".quantity-control")).toContainText("1");
  for (let i = 0; i < 4; i++)
    await page.getByLabel("Aumentar cantidad de BUZO CON CAPUCHA Y CIERRE").click();
  await expect(page.locator(".quantity-control")).toContainText("4");
  await page.reload();
  await expect(page.locator(".quantity-control")).toContainText("4");
  await page.getByLabel("Disminuir cantidad de BUZO CON CAPUCHA Y CIERRE").click();
  await expect(page.locator(".summary-total")).toContainText("US$ 420");
  await page.getByRole("button", { name: "QUITAR", exact: true }).click();
  await expect(page.getByText("Tu carrito está vacío.")).toBeVisible();
  await page.goto("/product/4");
  await expect(page.getByRole("button", { name: "AGOTADO" })).toBeDisabled();
});
test("checkout validation and simulated order completion", async ({ page }) => {
  await page.goto("/product/2");
  await page.getByRole("button", { name: "L", exact: true }).click();
  await page.getByRole("button", { name: "AGREGAR AL CARRITO" }).click();
  await page.goto("/checkout");
  await page.getByRole("button", { name: "CONFIRMAR PEDIDO" }).click();
  await expect(page.locator(".field-error")).toHaveCount(7);
  const values = {
    firstName: "Alex",
    lastName: "Smith",
    email: "alex@example.com",
    phone: "+54 11 1234 5678",
    address: "123 Main Street",
    city: "Buenos Aires",
    postalCode: "1000",
  };
  for (const [key, value] of Object.entries(values))
    await page.locator(`#${key}`).fill(value);
  await page.getByLabel("Método de entrega").selectOption("pickup");
  await expect(page.locator(".summary-total")).toContainText("US$ 55");
  await page.getByRole("button", { name: "CONFIRMAR PEDIDO" }).click();
  await expect(
    page.getByText("Tu pedido de prueba está confirmado.", { exact: false }),
  ).toBeVisible();
  await expect(page.locator(".header-actions")).toContainText("CARRITO (0)");
  await expect(
    page.getByText("No se realizó ningún cobro.", { exact: false }),
  ).toBeVisible();
});
test("mobile navigation and responsive catalogue", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "ROPA PARA OTRO MUNDO." }),
  ).toBeVisible();
  await page.getByLabel("Abrir navegación").click();
  await expect(page.locator(".mobile-nav")).toBeVisible();
  await page
    .locator(".mobile-nav")
    .getByRole("link", { name: "TIENDA", exact: false })
    .click();
  await expect(page.locator(".mobile-nav")).toHaveCount(0);
  await expect(page.locator(".product-card")).toHaveCount(12);
  const fits = await page.evaluate(
    () => document.documentElement.scrollWidth <= window.innerWidth,
  );
  expect(fits).toBe(true);
});
