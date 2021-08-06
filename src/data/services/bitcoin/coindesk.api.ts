export class CoindeskApi {
    private baseUrl = "https://api.coindesk.com/"

    coinsStatus (): string {
        return this.baseUrl + "v1/bpi/currentprice.json";
    }
}
