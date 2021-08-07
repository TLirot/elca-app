import { CoinInfoView, CoinInfoViewProps } from "./coin-info.view";
import { shallow, ShallowWrapper } from "enzyme";

const defaultProps: CoinInfoViewProps = {
    code: "GBP",
    rate: "123",
    description: "GBP Description",
    updateISOTime: "2021-08-07T12:45:00+00:00",
    rate_float: 123,
}

const initShallowComponent = (customProps: Partial<CoinInfoViewProps> = {}):
    ShallowWrapper<CoinInfoViewProps, Record<never, never>, CoinInfoView> => {
    const props = {
        ...defaultProps,
        ...customProps,
    };

    return shallow(<CoinInfoView {...props} />)
}

describe("CoinInfoView =>", () => {

    beforeEach(() => {
        jest.restoreAllMocks();
    });

    it("Should render correctly", () => {
        const wrapper = initShallowComponent();

        expect(wrapper).toMatchSnapshot();
    })
});
