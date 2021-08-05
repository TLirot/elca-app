export class CoindeskApi {
    private baseUrl  = "https://api.coindesk.com/v1/bpi/"

    coinsStatus (): string {
        return this.baseUrl + "currentprice.json";
    }
}
