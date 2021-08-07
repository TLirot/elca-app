import { CoinDiffView, CoinDiffViewProps, CoinDiffViewState } from "./coin-diff.view";
import { shallow, ShallowWrapper } from "enzyme";
import { ReactElement } from "react";
import { ArrowBarLeft, ArrowDownCircleFill, ArrowUpCircleFill } from "react-bootstrap-icons";

const defaultProps: CoinDiffViewProps = {
    rate_float: 100,
};
let initialState: CoinDiffViewState;

const initShallowComponent = (customProps: Partial<CoinDiffViewProps> = {}):
    ShallowWrapper<CoinDiffViewProps, CoinDiffViewState, CoinDiffView> => {
    const props = {
        ...defaultProps,
        ...customProps,
    };
    const wrapper = shallow<CoinDiffView>(<CoinDiffView {...props} />);

    initialState = wrapper.state();

    return wrapper;
};

const mockRender = () => {
    jest.spyOn(CoinDiffView.prototype, "render").mockImplementation();
};

const mockDidUpdate = () => {
    jest.spyOn(CoinDiffView.prototype, "componentDidUpdate").mockImplementation();
};

describe("CoinDiffView =>", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });

    it("Should render correctly", () => {
        const icon = jest.spyOn(CoinDiffView.prototype, "icon", "get").mockReturnValue("my_icon");
        const wrapper = initShallowComponent();
        wrapper.setState({
            diff: 0.145
        });

        expect(icon).toHaveBeenCalledTimes(2);
        expect(icon).toHaveBeenNthCalledWith(1);
        expect(icon).toHaveBeenNthCalledWith(2);

        expect(wrapper).toMatchSnapshot();
    });

    describe("Getters", () => {
        beforeEach(() => {
            mockRender();
            mockDidUpdate();
        });

        describe("icon =>", () => {
            it("Should return ArrowUpCircleFill when diff is more than 0", () => {
                const wrapper = initShallowComponent();

                wrapper.setState({ diff: 1 });
                const icon = wrapper.instance().icon as ReactElement;

                expect(icon).toStrictEqual(<ArrowUpCircleFill style={wrapper.instance().styleArrowUpCircle}/>)
            });

            it("Should return ArrowDownCircleFill when diff is less than 0", () => {
                const wrapper = initShallowComponent();

                wrapper.setState({ diff: -1 });
                const icon = wrapper.instance().icon as ReactElement;

                expect(icon).toStrictEqual(<ArrowDownCircleFill style={wrapper.instance().styleArrowDownCircle}/>)
            });

            it("Should return ArrowBarLeft when diff is equal to 0", () => {
                const wrapper = initShallowComponent();

                wrapper.setState({ diff: 0 });
                const icon = wrapper.instance().icon as ReactElement;

                expect(icon).toStrictEqual(<ArrowBarLeft style={wrapper.instance().iconHeight}/>)
            });
        });
    });

    describe("Methods =>", () => {

        beforeEach(() => {
            mockRender();
            mockDidUpdate();
        });

        describe("componentDidUpdate", () => {
            it("Should call calculateDiff with prevProps.rate_float if rate_float is different after the updated", () => {
                jest.spyOn(CoinDiffView.prototype, "componentDidUpdate").mockRestore();
                const calculateDiff = jest.spyOn(CoinDiffView.prototype, "calculateDiff").mockImplementation();
                const rate_float = 1;

                const wrapper = initShallowComponent();
                wrapper.instance().componentDidUpdate({ rate_float });

                expect(calculateDiff).toHaveBeenCalledTimes(1);
                expect(calculateDiff).toHaveBeenCalledWith(rate_float);
            });
        });

        describe("calculateDiff", () => {
            it.each<[ prevRate: number, actualRate: number, result: number ]>([
                [ 50, 50, 0 ],
                [ 75, 100, 33.333333333333314 ],
                [ 150, 100, -33.33333333333334 ],
                [ 200, 100, -50 ],
                [ 125, 100, -20 ],
            ])
            ("Should update state with the percentage change between %s and %s and actual rate_float", (prevRate, actualRate, result) => {
                const wrapper = initShallowComponent({ rate_float: actualRate });
                wrapper.instance().calculateDiff(prevRate);

                expect(wrapper.state()).toStrictEqual({
                    ...initialState,
                    diff: result
                });
            });
        });
    });
});
