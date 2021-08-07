import axios, { AxiosResponse } from "axios";
import { HttpRequest } from "./http-request";

describe("HttpRequest =>", () => {

    beforeEach(() => {
        jest.restoreAllMocks();
    });

    describe("get =>", () => {
        it("Should call axios get with the url and return the response.", async () => {
            const response: AxiosResponse<unknown> = {
                data: {}
            } as AxiosResponse<unknown>;
            const axiosGet = jest.spyOn(axios, "get").mockResolvedValue(response);
            const url = "my_url";

            const result = await new HttpRequest().get(url);

            expect(axiosGet).toHaveBeenCalledTimes(1);
            expect(axiosGet).toHaveBeenCalledWith(url);
            expect(result).toBe(response);
        });
    });
});
