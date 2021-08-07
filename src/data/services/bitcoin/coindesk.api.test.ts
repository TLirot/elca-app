import { CoindeskApi } from "./coindesk.api";

describe("CoindeskApi =>", () => {

    describe("coinsStatus =>", () => {

        it("Should return the correct endpoint", () => {
            const endpoint = "https://api.coindesk.com/v1/bpi/currentprice.json";

            expect(new CoindeskApi().coinsStatus()).toBe(endpoint);
        });
    });
});
