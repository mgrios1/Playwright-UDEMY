import { Locator, Page } from "@playwright/test";

//Una clase de Page Object Model (POM) para la página de inicio de sesión. Esta clase encapsula los elementos y acciones relacionados con la página de inicio de sesión, proporcionando una interfaz clara y reutilizable para interactuar con ella en las pruebas automatizadas.
//LoginPage es el nombre de la clase que representa la página de inicio de sesión. Contiene propiedades privadas para los elementos de la página (usernameTextbox, passwordTextbox y loginButton) y métodos públicos para interactuar con ellos (fillusername, fillpassword y clickLoginButton).    

export class LoginPage {

    private readonly usernameTextbox: Locator; //Propiedad privada que representa el campo de texto para el nombre de usuario. Se utiliza el tipo Locator de Playwright para localizar el elemento en la página.
    private readonly passwordTextbox: Locator; //Una propiedad es privada que representa el campo de texto para la contraseña. Se utiliza el tipo Locator de Playwright para localizar el elemento en la página.
    private readonly loginButton: Locator; //Es una variable de tipo Locator que representa el botón de inicio de sesión en la página. Se utiliza para localizar el elemento en la página y realizar acciones sobre él.

//El constructor de la clase LoginPage recibe un objeto Page de Playwright como parámetro. Este objeto representa la página web en la que se está trabajando y se utiliza para inicializar los elementos de la página (usernameTextbox, passwordTextbox y loginButton) mediante selectores CSS o XPath.
    constructor(page: Page) {
        this.usernameTextbox = page.locator('input#username'); //Se almacena en la propiedad usernameTextbox el elemento localizado mediante el selector CSS 'input#username', que representa el campo de texto para el nombre de usuario en la página de inicio de sesión.
        this.passwordTextbox = page.locator('input#password');
        this.loginButton = page.locator('//button[@type=\'submit\']');
    }

    async fillusername(){
      await this.usernameTextbox.fill('user');
    }

    async fillpassword(){
      await this.passwordTextbox.fill('pass');
    }
//El método clickLoginButton es un método público que realiza la acción de hacer clic en el botón de inicio de sesión. 
//Utiliza la propiedad loginButton para localizar el elemento y llamar al método click() de Playwright, que simula un clic en el botón.   
    async clickLoginButton(){
      await this.loginButton.click();
    }
}
