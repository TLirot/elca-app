import { Component, ReactNode } from "react";
import { ECPriceModel } from "../../data/services/bitcoin/models/price.model";
import { Card } from "../../components/layout/card";
import { Col, Row } from "react-bootstrap";
import dayjs from "dayjs";
import { CoinDiffView } from "./coin-diff.view";

export interface CoinInfoViewProps extends ECPriceModel {
    updateISOTime: dayjs.Dayjs;
}

export class CoinInfoView extends Component<CoinInfoViewProps> {

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
                    <CoinDiffView rate_float={this.props.rate_float}/>
                </Row>
                <hr/>
                <Row>
                    <Col className={"col-auto"}>
                        {this.props.updateISOTime.format("MMM-DD HH:mm")}
                    </Col>
                </Row>
            </Card>
        )
    }
}
