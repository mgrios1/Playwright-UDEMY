import {test, expect} from '@playwright/test';
import { LoginPage } from '../../pageobjets/login/LoginPage';

test('login', async ({page}) => {
    await page.goto('http://127.0.0.1:5501/login.html');

    // await page.locator('input#username').fill('user'); //localizar en la pagina, por css selector
    // await page.locator('input#password').fill('pass');
    // await page.locator('//button[@type=\'submit\']').click(); //localizar en la pagina, por xpath
    //se coloca \ antes de cada coma porque marca error por xpath por muchas comas
    
    const loginPage = new LoginPage(page); //Se crea una instancia de la clase LoginPage, pasando el objeto page como parametro, para poder utilizar los metodos de la clase LoginPage en el test
    await loginPage.fillusername(); 
    await loginPage.fillpassword();
    await loginPage.clickLoginButton(); //Se llama al metodo clickLoginButton de la clase LoginPage, para hacer clic en el boton de inicio de sesion

    await page.locator('//button[text()="Añadir transacción"]').click(); //localizar en la pagina, por xpath, buscando el boton que contiene el texto "Añadir trans

    await page.waitForLoadState('load'); //espera a que la pagina cargue completamente, para evitar errores de localizacion de elementos

    await page.locator('//button[contains(text(),\'Añadir transacción\')]').click();
    //localiza en la pagina mediante el contenido del texto del boton, en este caso "Añadir transacción"
    await page.locator('id=date').fill('2026-08-05'); 
    //Se usa id=valor por que es un valor unico en la pagina, es mas rapido y eficiente que css selector o xpath
    await page.locator('id=amount').fill('500'); 
    await page.locator('id=description').fill('Descripcion de prueba'); 
    await page.locator('//button[contains(text(),"Guardar")]').click(); //se coloca " en lugar de ' porque marca error por xpath.
    //Se localiza el boton de guardar mediante xpath, buscando el boton que contiene el texto "Guardar"

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