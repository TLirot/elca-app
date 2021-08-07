import { shallow, ShallowWrapper } from "enzyme";
import { BitcoinView, BitcoinViewState } from "./bitcoin.view";
import { ECCurrentCoinsStatus } from "../../data/services/bitcoin/models/current-coins-status.model";
import { Button } from "react-bootstrap";
import { BitcoinServices } from "../../data/services/bitcoin/bitcoin.services";

const mockECCurrentCoinsStatus: ECCurrentCoinsStatus = {
    time: {
        updatedISO: "2021-08-07T12:45:00+00:00"
    },
    bpi: {
        GBP: {
            rate_float: 1,
            rate: "1",
            description: "GBPDescription",
            code: "GBP",
        },
        EUR: {
            rate_float: 1,
            rate: "1",
            description: "EURDescription",
            code: "EUR",
        },
        USD: {
            rate_float: 1,
            rate: "1",
            description: "USDDescription",
            code: "USD",
        }
    }
}

let initialState: BitcoinViewState;

const initShallowComponent = (): ShallowWrapper<Record<never, never>, BitcoinViewState, BitcoinView> => {
    const wrapper = shallow<BitcoinView>(<BitcoinView/>);

    initialState = wrapper.state();

    return wrapper;
};

const mockDidMount = () => {
    jest.spyOn(BitcoinView.prototype, "componentDidMount").mockImplementation();
};
const mockRender = () => {
    jest.spyOn(BitcoinView.prototype, "render").mockImplementation();
};

describe("BitcoinView =>", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });

    describe("render =>", () => {
        beforeEach(() => {
            mockDidMount();
        })

        it("Should render correctly when data is loaded", () => {
            const wrapper = initShallowComponent();

            wrapper.setState({ currentCoinsStatus: mockECCurrentCoinsStatus });

            expect(wrapper.find("#reload-button").find(Button).props().onClick).toBe(wrapper.instance().fetchCurrentStatus);
            expect(wrapper).toMatchSnapshot();
        });

        it("Should show the error message when network request has failed", () => {
            const wrapper = initShallowComponent();

            wrapper.setState({ dataError: "network error" });

            expect(wrapper).toMatchSnapshot();
        });

        it("Should show the Spinner when there is no data and there is no error", () => {
            const wrapper = initShallowComponent();

            wrapper.setState({ dataError: "", currentCoinsStatus: undefined });

            expect(wrapper).toMatchSnapshot();
        });
    });

    it("Should the initial state currentStatus undefined and dataError undefined", () => {
        mockDidMount();
        mockRender();
        const wrapper = initShallowComponent();

        expect(wrapper.state()).toStrictEqual({
            currentCoinsStatus: undefined,
            dataError: undefined,
        });
    });

    describe("Methods =>", () => {
        beforeEach(() => {
            mockDidMount();
            mockRender();
        });

        describe("componentDidMount =>", () => {
            it("Should request the data calling fetchCurrentStatus", () => {
                jest.spyOn(BitcoinView.prototype, "componentDidMount").mockRestore();
                const fetchCurrentStatus = jest.spyOn(BitcoinView.prototype, "fetchCurrentStatus").mockImplementation();

                initShallowComponent();

                expect(fetchCurrentStatus).toHaveBeenCalledTimes(1);
                expect(fetchCurrentStatus).toHaveBeenCalledWith();
            });
        });

        describe("fetchCurrentStatus =>", () => {
            it("Should request coinStatus from BitcoinServices and save the response in the state", async () => {
                const response: ECCurrentCoinsStatus = {
                    time: {
                        updatedISO: "my_time",
                    },
                } as ECCurrentCoinsStatus;

                const coinStatus = jest.spyOn(BitcoinServices.prototype, "coinStatus").mockResolvedValue(response);

                const wrapper = initShallowComponent();
                await wrapper.instance().fetchCurrentStatus();

                expect(coinStatus).toHaveBeenCalledTimes(1);
                expect(coinStatus).toHaveBeenCalledWith();

                expect(wrapper.state()).toStrictEqual({
                    ...initialState,
                    currentCoinsStatus: response,
                });
            });

            it("Should set error with 'Network error. Please wait a few minutes and reload the page.' " +
                "in state if there is a network error", async () => {
                jest.spyOn(BitcoinServices.prototype, "coinStatus").mockRejectedValue("error");
                jest.spyOn(console, "error").mockImplementation();

                const wrapper = initShallowComponent();
                await wrapper.instance().fetchCurrentStatus();

                expect(wrapper.state()).toStrictEqual({
                    ...initialState,
                    dataError: "Network error. Please wait a few minutes and reload the page."
                });
            });
        });
    });
})
