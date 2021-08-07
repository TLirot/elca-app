import { shallow, ShallowWrapper } from "enzyme";
import { BitcoinView, BitcoinViewState } from "./bitcoin.view";
import { ECCurrentCoinsStatus } from "../../data/services/bitcoin/models/current-coins-status.model";
import { Button } from "react-bootstrap";

const mockECCurrentCoinsStatus: ECCurrentCoinsStatus = {
    time: {
        updatedISO: ""
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

describe("BitcoinView =>", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });

    describe("render =>", () => {
        it("Should render correctly when data is loaded", () => {
            jest.spyOn(BitcoinView.prototype, "componentDidMount").mockImplementation();

            const wrapper = initShallowComponent();

            wrapper.setState({ currentCoinsStatus: mockECCurrentCoinsStatus });

            expect(wrapper.find("#reload-button").find(Button).props().onClick).toBe(wrapper.instance().fetchCurrentStatus);
            expect(wrapper).toMatchSnapshot();
        });

        it("Should show the error message when network request has failed", () => {
            jest.spyOn(BitcoinView.prototype, "componentDidMount").mockImplementation();

            const wrapper = initShallowComponent();

            wrapper.setState({ errorData: "network error" });

            expect(wrapper).toMatchSnapshot();
        });

        it("Should show the Spinner when there is no data and there is no error", () => {
            jest.spyOn(BitcoinView.prototype, "componentDidMount").mockImplementation();

            const wrapper = initShallowComponent();

            wrapper.setState({ errorData: "", currentCoinsStatus: undefined });

            expect(wrapper).toMatchSnapshot();
        });
    });
})
