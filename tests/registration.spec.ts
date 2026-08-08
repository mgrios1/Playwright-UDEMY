import { test, expect } from '@playwright/test';

test('registration', async ({ page }) =>  {
    await page.goto('http://127.0.0.1:5500/register.html');

    await page.locator('id=name').fill('Sofia');
    await page.locator('id=last-name').fill('Niño');
    //Se localiza el input de nombre mediante id, ya que es unico en la pagina y es mas rapido y eficiente que css selector o xpath
    await page.locator("xpath=//label[contains(., 'Edad')]/following-sibling::input").fill('30');
    //Se localiza el input de edad mediante xpath, buscando el label que contiene el texto "Edad" y luego buscando el input que es su hermano siguiente, que esta en la misma jerarquia de elementos.
    await page.locator('id=country').selectOption('Mexico'); //selectoption se usa para seleccionar una opcion de un select, en este caso se selecciona la opcion "Mexico" del select con id country
    await page.locator("input[value='F']").click(); //se localiza el input de genero mediante css selector, buscando el input con value F y se hace click en el
    await page.locator('id=email').fill('maria@gmail.com');
    await page.locator('id=friday').click();
    await page.locator('id=picture').setInputFiles('images/gatito.jpg'); //se localiza el input de tipo file mediante id, y se le asigna un archivo para subirlo, la imagen esta en la carpeta images del proyecto
    
    //Promise.all() espera a que ambas promesas terminen y devuelve un array con los resultados de ambas promesas [popupPage,undefined] pero en lista.
    //Toma el primer elemento del array que devuelve Promise.all() y guárdalo en summaryPage
    const [summaryPage] = await Promise.all([

        page.waitForEvent('popup'), //se espera a que se abra una nueva ventana, ya que al hacer click en el boton de guardar se abre una nueva ventana con la informacion del registro
        page.locator('id=save-btn').click()

    ])
    
    await summaryPage.waitForLoadState(); //se espera a que la nueva ventana cargue completamente, para poder interactuar con ella
    await expect(summaryPage).toHaveTitle('Summary'); //se espera a que la nueva ventana tenga el titulo "summary", para asegurarse de que se abrio la ventana correcta
    
    await page.pause();

})