import {test, expect} from '@playwright/test';

test('login', async ({page}) => {
    await page.goto('http://127.0.0.1:5500/login.html');

    await page.locator('input#username').fill('user'); //localizar en la pagina, por css selector
    await page.locator('input#password').fill('pass');
    await page.locator('//button[@type=\'submit\']').click(); //localizar en la pagina, por xpath
    //se coloca \ antes de cada coma porque marca error por xpath por muchas comas
    await page.locator('//button[text()="Añadir transacción"]').click();

    await page.waitForLoadState('load'); //espera a que la pagina cargue completamente, para evitar errores de localizacion de elementos

    await page.locator('//button[contains(text(),\'Añadir transacción\')]').click();
    //localiza en la pagina mediante el contenido del texto del boton, en este caso "Añadir transacción"
    await page.locator('id=date').fill('2026-08-05'); 
    //Se usa id=valor por que es un valor unico en la pagina, es mas rapido y eficiente que css selector o xpath
    await page.locator('id=amount').fill('500'); 
    await page.locator('id=description').fill('Descripcion de prueba'); 
    await page.locator('//button[contains(text(),"Guardar")]').click(); //se coloca " en lugar de ' porque marca error por xpath.

    const actualfecha = await page.locator('//tbody[@id="transactions-list"]//tr[1]//td[1]').textContent();
    //Se crea una constante para almacenar el valor de la fecha de la transaccion agregada, se localiza mediante xpath, buscando en el tbody con id transactions-list, en la primera fila y primera columna
    const actualcantidad = await page.locator('//tbody[@id="transactions-list"]//tr[1]//td[2]').textContent();
    const actualdescripcion = await page.locator('//tbody[@id="transactions-list"]//tr[1]//td[3]').textContent();
    //Se usa textContent() para obtener el valor del texto del elemento localizado

    expect(actualfecha).toEqual('2026-08-05'); //Se compara el valor obtenido con el valor esperado
    expect(actualcantidad).toEqual('500');
    expect(actualdescripcion).toEqual('Descripcion de prueba'); 

    //await page.pause();
})