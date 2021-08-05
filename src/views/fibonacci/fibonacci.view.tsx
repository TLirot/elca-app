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

        if(this.isInvalidNumber(eventValue)){
            this.setErrorAndClearValue();
        } else{
            this.setValueAndClearError(eventValue);
        }
    }

    isInvalidNumber(value: string): boolean{
        return Boolean(value.match(/[^0-9]/));
    }

    setValueAndClearError(value: string): void {
        this.setState({
            inputValue: value,
            error: "",
        });
    }

    setErrorAndClearValue(): void {
        this.setState({
            error: "Please type only whole numbers.",
            inputValue: "",
        })
    }

    renderFibonacci(value: string): string {
        if (value === "" || this.isInvalidNumber(value)) {
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
