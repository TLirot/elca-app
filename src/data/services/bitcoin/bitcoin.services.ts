import { HttpRequest } from "../../http-request";
import { CurrentCoinsStatus } from "./models/current-coins-status.model";
import { CoindeskApi } from "./coindesk.api";

export class BitcoinServices {

    private httpRequest = new HttpRequest();

    async coinStatus(): Promise<CurrentCoinsStatus> {
        try{
            const url = new CoindeskApi().coinsStatus();
            const response = await this.httpRequest.get<CurrentCoinsStatus>(url);
            return response.data;
        }catch (error){
            console.log(error);
            throw error;
        }
    }
}
