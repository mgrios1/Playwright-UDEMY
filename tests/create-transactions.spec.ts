import {test, expect} from '@playwright/test';

test('login', async ({page}) => {

    await page.goto('http://127.0.0.1:5500/login.html');
    await page.locator('input#username').fill('user'); 
    await page.locator('input#password').fill('pass');
    await page.locator('//button[@type=\'submit\']').click(); 
    await page.locator('//button[text()="Añadir transacción"]').click();
    await page.waitForLoadState('load'); 

    
    for(let i = 0; i <= 30; i++){ 

        await page.locator('//button[contains(text(),\'Añadir transacción\')]').click();
        await page.locator('id=date').fill('2026-08-05'); 
        await page.locator('id=amount').fill('500'); 
        await page.locator('id=description').fill('Descripcion de prueba'); 
        await page.locator('//button[contains(text(),"Guardar")]').click(); 

    }

    //let indica que se va a declarar una variable que puede cambiar de valor, en este caso se declara la variable i que se va a usar en el bucle for para contar las iteraciones
    //Se usa un bucle for para repetir el proceso de agregar transacciones 30 veces, se usa <= 30 para que se ejecute 31 veces, ya que el contador empieza en 0
    //i = 0 es menor o igual a 30, se ejecuta el bloque de codigo dentro del bucle, luego se incrementa i en 1 (i++), hasta que i sea mayor a 30 y se salga del bucle  

    await page.pause();

})