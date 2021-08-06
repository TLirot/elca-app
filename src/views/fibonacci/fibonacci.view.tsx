import { ChangeEvent, Component, ReactNode } from "react";
import { Col, Form, Row } from "react-bootstrap";

interface FibonacciViewState {
    fibonacciNumbers: number[];
    error: string;
    inputValue: string;
}

export class FibonacciView extends Component<Record<never, never>, FibonacciViewState> {

    readonly state: Readonly<FibonacciViewState> = {
        fibonacciNumbers: [],
        error: "",
        inputValue: "",
    }

    constructor (props: Record<never, never>) {
        super(props);

        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(event: ChangeEvent<HTMLInputElement>): void {
        const eventValue: string = event.currentTarget.value;

        if(this.isValidNumber(eventValue)){
            this.setValueAndClearError(eventValue);
        } else{
            this.setErrorAndClearValue();
        }
    }

    isValidNumber(value: string): boolean {
        return !value.match(/[^0-9]/) && Number(value) <= 500;
    }

    setValueAndClearError(value: string): void {
        this.setState({
            inputValue: value,
            error: "",
        });
    }

    setErrorAndClearValue(): void {
        this.setState({
            error: "Please type a whole number equal or less than 500.",
            inputValue: "",
        });
    }

    renderFibonacci(value: string): string {
        if (value === "" || !this.isValidNumber(value)) {
            return "";
        } else {
            return this.fibonacci(Number(value)).toString();
        }
    }

    fibonacci(length: number): number[] {
        let fibonacciList = [0, 1];

        if (length === 0) return [0];
        if (length === 1) return [1];
        if (length >= 2){
            for (let i = 2; i < length; i++) {
                fibonacciList[i] = fibonacciList[i - 2] + fibonacciList[i - 1];
            }
        }
        return fibonacciList;
    }

    render (): ReactNode {
        return (
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Number</Form.Label>
                    <Form.Control type="text" onChange={this.handleOnChange} value={this.state.inputValue}/>
                    <Form.Text>{this.state.error}</Form.Text>
                </Form.Group>
                <Row>
                    <Col className={"col-auto"}>
                        {this.renderFibonacci(this.state.inputValue)}
                    </Col>
                </Row>
            </Form>
        );
    }
}
