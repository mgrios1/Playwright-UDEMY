import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('comprando nuevos productos', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500');

  for (let i = 0; i <= 5; i++) {
     await page.locator("//h5[contains(.,'Producto 1')]/ancestor::div[contains(@class, 'card-body')]//button").click();
  }

  await page.locator("//h5[contains(.,'Producto 2')]/ancestor::div[contains(@class, 'card-body')]//button").click();
  await page.locator("//h5[contains(.,'Producto 3')]/ancestor::div[contains(@class, 'card-body')]//button").click();

  await page.locator('button#view-cart-btn').click();

  const cantidadproducto1 = await page.locator("//tbody[@id='cart-items']//td[contains(., 'Producto 1')]//ancestor::tr//td[3]").textContent();
  const cantidadproducto2 = await page.locator("//tbody[@id='cart-items']//td[contains(., 'Producto 2')]//ancestor::tr//td[3]").textContent();
  const cantidadproducto3 = await page.locator("//tbody[@id='cart-items']//td[contains(., 'Producto 3')]//ancestor::tr//td[3]").textContent();

  expect(cantidadproducto1).toEqual('6');
  expect(cantidadproducto2).toEqual('1');
  expect(cantidadproducto3).toEqual('1');

  await page.locator('id=checkout-btn').click();

  await page.locator('id=name').fill(faker.person.fullName());
  await page.locator('id=email').fill(faker.internet.email());
  await page.locator('id=address').fill(faker.location.streetAddress());

  await page.waitForTimeout(2000); //espera 2 segundos para que se pueda ver el llenado de los campos, ya que si no se ve el llenado de los campos y se hace click en el boton de informacion de pago, no se podra ver el llenado de los campos

  await page.getByRole('link', { name: 'Información de pago' }).click();

  await page.locator('id=card-number').fill(faker.finance.creditCardNumber());
  await page.locator('id=card-expiry').fill('08-2026');
  await page.locator('id=card-cvc').fill(faker.finance.creditCardCVV());
  await page.locator('id=place-order-btn').click();

  expect(page.locator('//h4[contains(., "Tu compra fue exitosa")]')).toBeVisible();

  await page.pause();
});