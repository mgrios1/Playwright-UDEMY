import {test, expect} from '@playwright/test';
import { LoginPage } from '../../pageobjets/login/LoginPage';
import { AddTransactionPage } from '../../pageobjets/add-transactions/AddTransactionPage';
import { faker } from '@faker-js/faker';

test('login', async ({page}) => {
    await page.goto('http://127.0.0.1:5501/login.html');

    const transactionDate = '2026-08-05';
    const transactionAmount = faker.number.int({ min: 1, max: 500 }).toString();
    const transactionDescription = faker.food.description();

    const loginPage = new LoginPage(page); //Se crea una instancia de la clase LoginPage, pasando el objeto page como parametro, para poder utilizar los metodos de la clase LoginPage en el test
    await loginPage.doLogin('user', 'pass'); //Se llama al metodo doLogin de la clase LoginPage, pasando el nombre de usuario y la contraseña como parametros, para realizar el flujo completo de inicio de sesión
    
    await page.waitForLoadState('load'); //espera a que la pagina cargue completamente, para evitar errores de localizacion de elementos

    const addTransactionPage = new AddTransactionPage(page); //Se crea una instancia de la clase AddTransactionPage, pasando el objeto page como parametro, para poder utilizar los metodos de la clase AddTransactionPage en el test
    await addTransactionPage.addTransaction(transactionDate, transactionAmount, transactionDescription); //Se llama al metodo addTransaction de la clase AddTransactionPage, pasando la fecha, cantidad y descripcion como parametros, para agregar una nueva transaccion

    const actualfecha = await page.locator('//tbody[@id="transactions-list"]//tr[1]//td[1]').textContent();
    //Se crea una constante para almacenar el valor de la fecha de la transaccion agregada, se localiza mediante xpath, buscando en el tbody con id transactions-list, en la primera fila y primera columna
    const actualcantidad = await page.locator('//tbody[@id="transactions-list"]//tr[1]//td[2]').textContent();
    const actualdescripcion = await page.locator('//tbody[@id="transactions-list"]//tr[1]//td[3]').textContent();
    //Se usa textContent() para obtener el valor del texto del elemento localizado

    expect(actualfecha).toEqual('2026-08-05'); //Se compara el valor obtenido con el valor esperado
    expect(actualcantidad).toEqual(transactionAmount);
    expect(actualdescripcion).toEqual(transactionDescription); 

    //await page.pause();
})

test('login failed', async ({page}) => {
    await page.goto('http://127.0.0.1:5501/login.html');

    const transactionDate = '2026-08-05';
    const transactionAmount = faker.number.int({ min: 1, max: 500 }).toString();
    const transactionDescription = faker.food.description();

    const loginPage = new LoginPage(page); //Se crea una instancia de la clase LoginPage, pasando el objeto page como parametro, para poder utilizar los metodos de la clase LoginPage en el test
    await loginPage.doLogin('user', 'invalid'); //Se llama al metodo doLogin de la clase LoginPage con una contraseña invalida, para probar el flujo de inicio de sesion fallido
    
    await page.waitForLoadState('load'); //espera a que la pagina cargue completamente, para evitar errores de localizacion de elementos

    const addTransactionPage = new AddTransactionPage(page); //Se crea una instancia de la clase AddTransactionPage, pasando el objeto page como parametro, para poder utilizar los metodos de la clase AddTransactionPage en el test
    await addTransactionPage.addTransaction(transactionDate, transactionAmount, transactionDescription); //Se llama al metodo addTransaction de la clase AddTransactionPage, pasando la fecha, cantidad y descripcion como parametros, para agregar una nueva transaccion

    const actualfecha = await page.locator('//tbody[@id="transactions-list"]//tr[1]//td[1]').textContent();
    //Se crea una constante para almacenar el valor de la fecha de la transaccion agregada, se localiza mediante xpath, buscando en el tbody con id transactions-list, en la primera fila y primera columna
    const actualcantidad = await page.locator('//tbody[@id="transactions-list"]//tr[1]//td[2]').textContent();
    const actualdescripcion = await page.locator('//tbody[@id="transactions-list"]//tr[1]//td[3]').textContent();
    //Se usa textContent() para obtener el valor del texto del elemento localizado

    expect(actualfecha).toEqual('2026-08-05'); //Se compara el valor obtenido con el valor esperado
    expect(actualcantidad).toEqual(transactionAmount);
    expect(actualdescripcion).toEqual(transactionDescription); 

    //await page.pause();
})