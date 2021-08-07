import { CurrentCoinsStatus, ECCurrentCoinsStatus } from "../models/current-coins-status.model";

export class CoindeskMapper {

    toECCurrentCoinsStatus(data: CurrentCoinsStatus): ECCurrentCoinsStatus {
        return {
            bpi: {
                GBP: {
                    code: data.bpi.GBP.code,
                    description: data.bpi.GBP.description,
                    rate: data.bpi.GBP.rate,
                    rate_float: data.bpi.GBP.rate_float,
                },
                EUR: {
                    code: data.bpi.EUR.code,
                    description: data.bpi.EUR.description,
                    rate: data.bpi.EUR.rate,
                    rate_float: data.bpi.EUR.rate_float,
                },
                USD: {
                    code: data.bpi.USD.code,
                    description: data.bpi.USD.description,
                    rate: data.bpi.USD.rate,
                    rate_float: data.bpi.USD.rate_float,
                }
            },
            time: {
                updatedISO: data.time.updatedISO,
            }
        }
    }
}
