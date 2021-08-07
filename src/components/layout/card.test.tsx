import { Card, CardProps } from "./card";
import { shallow, ShallowWrapper } from "enzyme";

const defaultProps: CardProps = {
    children: (<div>children</div>),
    title: "my title",
}
const initShallowComponent = (customProps: Partial<CardProps> = {}): ShallowWrapper => {

    const { children, ...restProps } = {
        ...defaultProps,
        ...customProps,
    };

    return shallow(<Card {...restProps}> {children} </Card>);
}

describe("Card =>", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });

    describe("render =>", () => {
        it("Should render the title and the children.", () => {
            expect(initShallowComponent()).toMatchSnapshot();
        });

        it("Should render only the children.", () => {
            expect(initShallowComponent({ title: undefined })).toMatchSnapshot();
        });
    });
});
