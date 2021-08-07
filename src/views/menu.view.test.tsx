import { shallow, ShallowWrapper } from "enzyme";
import { MenuView } from "./menu.view";

const initShallowComponent = (): ShallowWrapper<Record<never, never>, Record<never, never>, MenuView> => {
    return shallow(<MenuView/>);
}

describe("MenuView =>", () => {

    beforeEach(() => {
        jest.restoreAllMocks();
    });

    it("Should render correctly.", () => {
        expect(initShallowComponent()).toMatchSnapshot();
    });
});
