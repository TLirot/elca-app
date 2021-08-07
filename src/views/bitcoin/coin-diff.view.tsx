import { Component, CSSProperties, Fragment, ReactNode } from "react";
import { Col } from "react-bootstrap";
import { ArrowBarLeft, ArrowDownCircleFill, ArrowUpCircleFill } from "react-bootstrap-icons";

interface CoinDiffViewProps {
    rate_float: number;
}

interface CoinDiffViewState {
    diff: number;
}

export class CoinDiffView extends Component<CoinDiffViewProps, CoinDiffViewState> {

    readonly defaultDiff = 0;

    readonly state: Readonly<CoinDiffViewState> = {
        diff: this.defaultDiff,
    }

    readonly iconHeight: CSSProperties = { fontSize: "50px" };

    readonly styleArrowUpCircle: CSSProperties = { ...this.iconHeight, color: "green" };

    readonly styleArrowDownCircle: CSSProperties = { ...this.iconHeight, color: "red" };

    get icon (): ReactNode {
        let icon: ReactNode = <ArrowBarLeft style={this.iconHeight}/>;
        if (this.state.diff > this.defaultDiff) {
            icon = <ArrowUpCircleFill style={this.styleArrowUpCircle}/>
        } else if (this.state.diff < 0) {
            icon = <ArrowDownCircleFill style={this.styleArrowDownCircle}/>
        }
        return icon;
    }

    componentDidUpdate (prevProps: Readonly<CoinDiffViewProps>) {
        if (this.props.rate_float !== prevProps.rate_float) {
            this.calculateDiff(prevProps.rate_float);
        }
    }

    calculateDiff (prevRateFloat: number): void {
        const diff = ((prevRateFloat - this.props.rate_float) / prevRateFloat) * 100;
        this.setState({ diff });
    }

    render () {
        return (
            <Fragment>
                <Col className={"col-auto align-self-center"}>
                    {`${this.state.diff} %`}
                </Col>
                <Col className={"col-auto"}>
                    {this.icon}
                </Col>
            </Fragment>
        );
    }
}
