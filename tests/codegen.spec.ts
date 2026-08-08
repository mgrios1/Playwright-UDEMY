import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/login.html');
  await page.getByRole('textbox', { name: 'Nombre de usuario:' }).fill('user');
  await page.getByRole('textbox', { name: 'Contraseña:' }).fill('pass');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.waitForLoadState('load'); 
  await page.getByRole('button', { name: 'Añadir transacción' }).click();
  await page.getByRole('textbox', { name: 'Fecha:' }).fill('2026-08-06');
  await page.getByRole('spinbutton', { name: 'Monto:' }).fill('500');
  await page.getByRole('textbox', { name: 'Descripción:' }).fill('pruebas');
  await page.getByRole('button', { name: 'Guardar' }).click();
  await page.getByRole('button', { name: 'Editar' }).click();
  await page.pause();
});