import { shallow, ShallowWrapper } from "enzyme";
import { Form } from "react-bootstrap";
import { FibonacciView, FibonacciViewState } from "./fibonacci.view";
import { ChangeEvent } from "react";

let initialState: FibonacciViewState;

const initShallowComponent = (): ShallowWrapper<Record<never, never>, FibonacciViewState, FibonacciView> => {
    const wrapper = shallow<FibonacciView>(<FibonacciView/>);

    initialState = wrapper.state();

    return wrapper;
}

describe("FibonacciView =>", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });

    it("Should render correctly", () => {
        const fibonacciRenderMock = "fibonacci list";
        const inputValue = "typedValue";
        const renderFibonacci = jest.spyOn(FibonacciView.prototype, "renderFibonacci").mockReturnValue(fibonacciRenderMock);
        const wrapper = initShallowComponent();

        wrapper.setState({
            error: "error render",
            inputValue,
        });

        expect(renderFibonacci).toHaveBeenCalledTimes(2);
        expect(renderFibonacci).toHaveBeenLastCalledWith(inputValue);

        expect(wrapper.find(Form.Control).props().onChange).toBe(wrapper.instance().handleOnChange);

        expect(wrapper).toMatchSnapshot()
    });

    it("Should the initial state have fibonacciNumbers empty, inputValue empty and error empty", () => {
        const wrapper = initShallowComponent();

        expect(wrapper.state()).toStrictEqual({
            fibonacciNumbers: [],
            error: "",
            inputValue: "",
        });
    });

    describe("Functions =>", () => {
        beforeEach(() => {
            jest.spyOn(FibonacciView.prototype, "render").mockImplementation();
        });

        describe("handleOnChange =>", () => {
            const event: ChangeEvent<HTMLInputElement> = {
                currentTarget: {
                    value: "my_value",
                }
            } as ChangeEvent<HTMLInputElement>;

            it("Should call setValueAndClearError when the value is a valid number", () => {
                const isValidNumber = jest.spyOn(FibonacciView.prototype, "isValidNumber").mockReturnValue(true);
                const setValueAndClearError = jest.spyOn(FibonacciView.prototype, "setValueAndClearError").mockImplementation();

                const wrapper = initShallowComponent();
                wrapper.instance().handleOnChange(event);

                expect(isValidNumber).toHaveBeenCalledTimes(1);
                expect(isValidNumber).toHaveBeenCalledWith(event.currentTarget.value);
                expect(setValueAndClearError).toHaveBeenCalledTimes(1)
                expect(setValueAndClearError).toHaveBeenCalledWith(event.currentTarget.value)
            });

            it("Should call setErrorAndClearValue when the value is not a valid number", () => {
                const isValidNumber = jest.spyOn(FibonacciView.prototype, "isValidNumber").mockReturnValue(false);
                const setErrorAndClearValue = jest.spyOn(FibonacciView.prototype, "setErrorAndClearValue").mockImplementation();

                const wrapper = initShallowComponent();
                wrapper.instance().handleOnChange(event);

                expect(isValidNumber).toHaveBeenCalledTimes(1);
                expect(isValidNumber).toHaveBeenCalledWith(event.currentTarget.value);
                expect(setErrorAndClearValue).toHaveBeenCalledTimes(1)
                expect(setErrorAndClearValue).toHaveBeenCalledWith()
            });
        });

        describe("isValidNumber =>", () => {
            describe("true =>", () => {
                it.each<[ label: string, value: string ]>([
                    [ "less than", "100" ],
                    [ "equal to", "500" ],
                ])("Should return true when the value is a whole number %s 500", (label, value) => {
                    const wrapper = initShallowComponent();

                    const result = wrapper.instance().isValidNumber(value);

                    expect(result).toBe(true);
                });
            });

            describe("false =>", () => {
                it.each<[ value: string ]>([
                    [ "." ],
                    [ "a" ],
                    [ "-4" ],
                    [ "501" ],
                    [ "11.45" ],
                ])("Should return false when the value (%s) is not a whole number less than or equal to 500.", (value) => {
                    const wrapper = initShallowComponent();

                    const result = wrapper.instance().isValidNumber(value);

                    expect(result).toBe(false);
                });
            });
        });

        describe("setValueAndClearError =>", () => {
            it("Should update the state saving error like '' and inputValue with the passed value", () => {
                const value = "my_val";
                const wrapper = initShallowComponent();

                wrapper.instance().setValueAndClearError(value);

                expect(wrapper.state()).toStrictEqual({
                    ...initialState,
                    inputValue: value,
                    error: "",
                })
            });
        });

        describe("setErrorAndClearValue =>", () => {
            it("Should update the state saving error like 'Please type a whole number equal or less than 500.' " +
                "and inputValue like ''", () => {
                const wrapper = initShallowComponent();

                wrapper.instance().setErrorAndClearValue();

                expect(wrapper.state()).toStrictEqual({
                    ...initialState,
                    inputValue: "",
                    error: "Please type a whole number equal or less than 500.",
                })
            });
        });

        describe("renderFibonacci =>", () => {

            describe("empty string return =>", () => {
                it("Should return empty string when value is empty string", () => {
                    const wrapper = initShallowComponent();

                    const result = wrapper.instance().renderFibonacci("");

                    expect(result).toBe("");
                });

                it("Should return empty string when isValidNumber return false", () => {
                    const isValidNumber = jest.spyOn(FibonacciView.prototype, "isValidNumber").mockReturnValue(false);
                    const value = "my_val";
                    const wrapper = initShallowComponent();

                    const result = wrapper.instance().renderFibonacci(value);

                    expect(isValidNumber).toHaveBeenCalledTimes(1);
                    expect(isValidNumber).toHaveBeenCalledWith(value);
                    expect(result).toBe("");
                });
            });

            describe("fibonacci return =>", () => {
                it("Should return the fibonacci return value converted to string when isValidNumber return true" +
                    "and value is not a empty string", () => {
                    const value = "3";
                    jest.spyOn(FibonacciView.prototype, "isValidNumber").mockReturnValue(true);

                    const fibonacciReturn = [ 0, 1, 1 ];
                    const fibonacci = jest.spyOn(FibonacciView.prototype, "fibonacci").mockReturnValue(fibonacciReturn);

                    const wrapper = initShallowComponent();

                    const result = wrapper.instance().renderFibonacci(value);

                    expect(fibonacci).toHaveBeenCalledTimes(1);
                    expect(fibonacci).toHaveBeenCalledWith(Number(value));
                    expect(result).toBe(fibonacciReturn.toString());
                });
            });
        });

        describe("fibonacci", () => {
            it.each<[ secuence: number[], length: number ]>([
                [ [ 0 ], 0 ],
                [ [ 1 ], 1 ],
                [ [ 0, 1 ], 2 ],
                [ [ 0, 1, 1, 2, 3 ], 5 ],
                [ [ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34 ], 10 ],
            ])("Should return %s when length is %s", (secuence, lenght) => {
                const wrapper = initShallowComponent()

                const result = wrapper.instance().fibonacci(lenght);

                expect(result).toStrictEqual(secuence);
            });
        });
    });
});
