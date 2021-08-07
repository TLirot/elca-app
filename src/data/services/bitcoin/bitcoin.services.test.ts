import { HttpRequest } from "../../http-request";
import { CurrentCoinsStatus, ECCurrentCoinsStatus } from "./models/current-coins-status.model";
import { AxiosResponse } from "axios";
import { CoindeskMapper } from "./mappers/coindesk.mapper";
import { BitcoinServices } from "./bitcoin.services";
import { CoindeskApi } from "./coindesk.api";

describe("BitcoinServices =>", () => {
    describe("coinStatus =>", () => {
        it("Should call HttpRequest.get and return the value mapped to ECCurrentCoinsStatus", async () => {
            const url = "my_endpoint";
            const coinsStatus = jest.spyOn(CoindeskApi.prototype, "coinsStatus").mockReturnValue(url);

            const returnGet: CurrentCoinsStatus = {
                bpi: {
                    GBP: {}
                }
            } as CurrentCoinsStatus;
            const get = jest.spyOn(HttpRequest.prototype, "get").mockResolvedValue({
                data: returnGet,
            } as unknown as AxiosResponse<{ [x: string]: unknown; }>)

            const returnMapper: ECCurrentCoinsStatus = {
                bpi: {
                    EUR: {}
                }
            } as ECCurrentCoinsStatus;
            const toECCurrentCoinsStatus = jest.spyOn(CoindeskMapper.prototype, "toECCurrentCoinsStatus").mockReturnValue(returnMapper);

            const result = await new BitcoinServices().coinStatus();

            expect(coinsStatus).toHaveBeenCalledTimes(1);
            expect(coinsStatus).toHaveBeenCalledWith();
            expect(get).toHaveBeenCalledTimes(1);
            expect(get).toHaveBeenCalledWith(url);
            expect(toECCurrentCoinsStatus).toHaveBeenCalledTimes(1);
            expect(toECCurrentCoinsStatus).toHaveBeenCalledWith(returnGet);
            expect(result).toBe(returnMapper);
        });
    });
});
