import { CurrentCoinsStatus, ECCurrentCoinsStatus } from "../models/current-coins-status.model";
import dayjs from "dayjs";
import { CoindeskMapper } from "./coindesk.mapper";

describe("CoindeskMapper =>", () => {
    describe("toECCurrentCoinsStatus =>", () => {
       it("Should map CurrentCoinsStatus to ECCurrentCoinsStatus", () => {
           const data: CurrentCoinsStatus = {
               bpi: {
                   EUR: {
                       rate_float: 1,
                       rate: "1",
                       description: "eur description",
                       code: "EUR",
                   },
                   GBP: {
                       rate_float: 2,
                       rate: "2",
                       description: "gbp description",
                       code: "GBP",
                   },
                   USD: {
                       rate_float: 3,
                       rate: "3",
                       description: "usd description",
                       code: "USD",
                   }
               },
               time: {
                   updatedISO: "2021-08-07T12:45:00+00:00",
               }
           } as CurrentCoinsStatus;
           const resultMapper: ECCurrentCoinsStatus = {
               bpi: {
                   EUR: {
                       rate_float: data.bpi.EUR.rate_float,
                       rate: data.bpi.EUR.rate,
                       description: data.bpi.EUR.description,
                       code: data.bpi.EUR.code,
                   },
                   GBP: {
                       rate_float: data.bpi.GBP.rate_float,
                       rate: data.bpi.GBP.rate,
                       description: data.bpi.GBP.description,
                       code: data.bpi.GBP.code,
                   },
                   USD: {
                       rate_float: data.bpi.USD.rate_float,
                       rate: data.bpi.USD.rate,
                       description: data.bpi.USD.description,
                       code: data.bpi.USD.code,
                   },
               },
               time: {
                   updatedISO: dayjs(data.time.updatedISO),
               }
           }

           expect(new CoindeskMapper().toECCurrentCoinsStatus(data)).toStrictEqual(resultMapper);
       });
    });
});
