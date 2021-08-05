import { Component, ReactNode } from "react";
import { Price } from "../../classes/resources/bitcoin/interfaces/price.interface";

export type CoinInfoViewProps = Price;
export interface CoinInfoViewState {
    diff: number;
}

export class CoinInfoView extends Component<CoinInfoViewProps, CoinInfoViewState> {
    render (): ReactNode {
        return <div>{JSON.stringify(this.props)}</div>;
    }
}
