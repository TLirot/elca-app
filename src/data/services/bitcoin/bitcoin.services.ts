import { HttpRequest } from "../../http-request";
import { CurrentCoinsStatus, ECCurrentCoinsStatus } from "./models/current-coins-status.model";
import { CoindeskApi } from "./coindesk.api";
import { CoindeskMapper } from "./mappers/coindesk.mapper";

export class BitcoinServices {

    private httpRequest = new HttpRequest();

    async coinStatus (): Promise<ECCurrentCoinsStatus> {
        try {
            const url = new CoindeskApi().coinsStatus();
            const response = await this.httpRequest.get<CurrentCoinsStatus>(url);
            return new CoindeskMapper().toECCurrentCoinsStatus(response.data);
        } catch (error) {
            throw error;
        }
    }
}
