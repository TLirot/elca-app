import { HttpRequest } from "../../http-request";
import { CurrentCoinsStatus, ECCurrentCoinsStatus } from "./models/current-coins-status.model";
import { CoindeskApi } from "./coindesk.api";

export class BitcoinServices {

    private httpRequest = new HttpRequest();

    async coinStatus (): Promise<ECCurrentCoinsStatus> {
        try {
            const url = new CoindeskApi().coinsStatus();
            const response = await this.httpRequest.get<CurrentCoinsStatus>(url);
            //TODO mapper
            return response.data as ECCurrentCoinsStatus;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
