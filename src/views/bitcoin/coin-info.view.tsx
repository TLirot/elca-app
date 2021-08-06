import { Component, CSSProperties, ReactNode } from "react";
import { ECPriceModel } from "../../data/services/bitcoin/models/price.model";
import { Card } from "../../components/layout/card";
import { ArrowBarLeft, ArrowDownCircleFill, ArrowUpCircleFill } from "react-bootstrap-icons";
import { Col, Row } from "react-bootstrap";
import dayjs from "dayjs";

export interface CoinInfoViewProps extends ECPriceModel {
    updateISOTime: string;
}

export interface CoinInfoViewState {
    diff: number;
}

export class CoinInfoView extends Component<CoinInfoViewProps, CoinInfoViewState> {

    readonly defaultDiff = 0;

    readonly state: CoinInfoViewState = {
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

    componentDidUpdate (prevProps: Readonly<CoinInfoViewProps>) {
        if (this.props.rate_float !== prevProps.rate_float) {
            this.calculateDiff(prevProps.rate_float);
        }
    }

    calculateDiff (prevRateFloat: number): void {
        const diff = ((prevRateFloat - this.props.rate_float) / prevRateFloat) * 100;
        this.setState({ diff });
    }

    render (): ReactNode {
        return (
            <Card title={`${this.props.code} / ${this.props.description}`}>
                <Row className={"justify-content-between"}>
                    <Col className={"col-auto"}>
                        <img
                            src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2WR24fnzSsiHf1TmpIWQn_E3qgJTLBcsK5w&usqp=CAU"}
                            alt="bitcoin"
                            style={{ height: "50px", width: "250px" }}
                        />
                    </Col>
                    <Col className={"col-auto align-self-center"}>
                        {`${this.props.rate} €`}
                    </Col>
                </Row>
                <Row className={"justify-content-end"}>
                    <Col className={"col-auto align-self-center"}>
                        {`${this.state.diff} %`}
                    </Col>
                    <Col className={"col-auto"}>
                        {this.icon}
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col className={"col-auto"}>
                        {dayjs(this.props.updateISOTime).format("MMM-DD HH:mm")}
                    </Col>
                </Row>
            </Card>
        )
    }
}
