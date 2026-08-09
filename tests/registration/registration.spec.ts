import { test, expect } from '@playwright/test';

test('registration', async ({ page} , testInfo ) =>  {
    await page.goto('http://127.0.0.1:5500/register.html');

    const name='Sofia';
    const lastname='Niño';
    const age='30';  
    const country='Mexico';
    const sex='F';
    const email='sofia@mail.com';

    await page.locator('id=name').fill(name);
    await page.locator('id=last-name').fill(lastname);
    //Se localiza el input de nombre mediante id, ya que es unico en la pagina y es mas rapido y eficiente que css selector o xpath
    await page.locator("xpath=//label[contains(., 'Edad')]/following-sibling::input").fill(age);
    //Se localiza el input de edad mediante xpath, buscando el label que contiene el texto "Edad" y luego buscando el input que es su hermano siguiente, que esta en la misma jerarquia de elementos.
    await page.locator('id=country').selectOption(country); //selectoption se usa para seleccionar una opcion de un select, en este caso se selecciona la opcion "Mexico" del select con id country
    await page.locator(`input[value='${sex}']`).click(); //se localiza el input de genero mediante css selector, buscando el input con value F y se hace click en el
    //se usa ` para poder usar ${sex} y asi poder cambiar el valor de sex facilmente, en caso de que se quiera cambiar el genero a M, solo se cambia el valor de la variable sex y no es necesario cambiar el codigo de localizacion del elemento.
    await page.locator('id=email').fill(email);
    await page.locator('id=friday').click();
    await page.locator('id=picture').setInputFiles('images/gatito.jpg'); //se localiza el input de tipo file mediante id, y se le asigna un archivo para subirlo, la imagen esta en la carpeta images del proyecto
    //Promise.all() espera a que ambas promesas terminen y devuelve un array con los resultados de ambas promesas [popupPage,undefined] pero en lista.
    //Toma el primer elemento del array que devuelve Promise.all() y guárdalo en summaryPage

    //testInfo.attach() se usa para adjuntar un archivo al reporte de la prueba, en este caso se adjunta un screenshot de la pagina, para poder ver el estado de la pagina en el momento de la prueba.
    /*
    await testInfo.attach('register1', {
        body: await page.screenshot(),
        contentType: 'image/png',
    });*/

    //await page.screenshot({ path: 'screenshots/registration1.png' }); //se toma un screenshot de la pagina y se guarda en la carpeta screenshots del proyecto, con el nombre registration1.png

    const [summaryPage] = await Promise.all([
        page.waitForEvent('popup'), //se espera a que se abra una nueva ventana, ya que al hacer click en el boton de guardar se abre una nueva ventana con la informacion del registro
        page.locator('id=save-btn').click()
    ])
    
    await summaryPage.waitForLoadState(); //se espera a que la nueva ventana cargue completamente, para poder interactuar con ella
    await expect(summaryPage).toHaveTitle('Summary'); //se espera a que la nueva ventana tenga el titulo "summary", para asegurarse de que se abrio la ventana correcta
    
    //Es summaryPage porque ya estamos en la nueva ventana.
    const currentName = await summaryPage.locator("//strong[contains(., 'Nombre')]/ancestor::p").textContent(); //se localiza el elemento que contiene el nombre ingresado, mediante xpath, buscando el strong que contiene el texto "Nombre" y luego buscando el p que es su ancestro, que contiene el texto completo del nombre ingresado
    const currentLastname = await summaryPage.locator("//strong[contains(., 'Apellido')]/ancestor::p").textContent();
    const currentAge = await summaryPage.locator("//strong[contains(., 'Edad')]/ancestor::p").textContent();

    expect(currentName).toContain(name); //se espera que el texto del elemento localizado contenga el valor de la variable name, que es el nombre ingresado en el formulario
    expect(currentLastname).toContain(lastname);
    expect(currentAge).toContain(age);
    await page.pause();
    /*
    await testInfo.attach('register2', {
        body: await summaryPage.screenshot(),
        contentType: 'image/png',
    });*/

    //await summaryPage.screenshot({ path: 'screenshots/registration2.png' }); 
    
})

test('registration-failure', async ({ page} , testInfo ) =>  {
    await page.goto('http://127.0.0.1:5500/register.html');

    const name='Sofia';
    const lastname='Niño';
    const age='30';  
    const country='Mexico';
    const sex='F';
    const email='sofia@mail.com';

    await page.locator('id=name').fill(name);

    expect(true).toEqual(false); //se espera que el valor booleano true sea igual a false, lo cual es falso, por lo que la prueba fallara y se generara un reporte de error

})