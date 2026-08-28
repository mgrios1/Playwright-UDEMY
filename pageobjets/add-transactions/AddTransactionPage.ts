import { Locator, Page } from "@playwright/test";

export class AddTransactionPage {

    private readonly addTransactionButton: Locator;
    private readonly transactionDate: Locator;
    private readonly transactionAmount: Locator;
    private readonly transactionDescription: Locator;
    private readonly saveTransactionButton: Locator;

    constructor(page: Page) {
        this.addTransactionButton = page.locator('//button[contains(text(),\'Añadir transacción\')]');
        this.transactionDate = page.locator('id=date');
        this.transactionAmount = page.locator('id=amount');
        this.transactionDescription = page.locator('id=description');
        this.saveTransactionButton = page.locator('//button[contains(text(),"Guardar")]');
    }

    async addTransaction(transactionDate: string, transactionAmount: string, transactionDescription: string) {
        await this.addTransactionButton.click();
        await this.transactionDate.fill(transactionDate);
        await this.transactionAmount.fill(transactionAmount);
        await this.transactionDescription.fill(transactionDescription);
        await this.saveTransactionButton.click();
    }

}