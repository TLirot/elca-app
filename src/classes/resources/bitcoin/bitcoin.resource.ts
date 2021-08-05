import { HttpRequest } from "../../network/http-request";
import { BitcoinEndpointEnum } from "./enums/bitcoin-endpoint.enum";
import { CurrentCoinsStatus } from "./interfaces/current-coins-status.interface";

export class BitcoinResource extends HttpRequest {

    async get<T extends { [P in keyof T]: unknown } = CurrentCoinsStatus>(): Promise<T> {
        try{
            const response = await super.get<T>(BitcoinEndpointEnum.currentPrice);
            return response.data;
        }catch (error){
            console.log(error);
            throw error;
        }
    }
}
