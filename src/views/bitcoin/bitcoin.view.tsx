import { Component, ReactNode } from "react";
import { CurrentCoinsStatus } from "../../classes/resources/bitcoin/interfaces/current-coins-status.interface";
import { BitcoinResource } from "../../classes/resources/bitcoin/bitcoin.resource";
import { Spinner } from "react-bootstrap";
import { CoinInfoView } from "./coin-info.view";

interface BitcoinViewState {
    currentCoinsStatus: CurrentCoinsStatus | undefined
}

export class BitcoinView extends Component<Record<never, never>, BitcoinViewState> {

    readonly state: Readonly<BitcoinViewState> = {
        currentCoinsStatus: undefined,
    }

    async componentDidMount(): Promise<void> {
        await this.fetchCurrentStatus();
    }

    async fetchCurrentStatus(): Promise<void> {
        try {
            const result = await new BitcoinResource().get();
            this.setState({currentCoinsStatus: result});
        }catch (error){
            console.error(error);
        }
    }

    render (): ReactNode {
        return (
            this.state.currentCoinsStatus
                ?
                (
                    <div className={"row"}>
                        <div className={"col-4"}>
                            <CoinInfoView {...this.state.currentCoinsStatus.bpi.EUR} />
                        </div>
                        <div className={"col-4"}>
                            <CoinInfoView {...this.state.currentCoinsStatus.bpi.USD} />
                        </div>
                        <div className={"col-4"}>
                            <CoinInfoView {...this.state.currentCoinsStatus.bpi.GBP} />
                        </div>
                        <div className={"row"}>
                            {JSON.stringify(this.state.currentCoinsStatus)}
                        </div>
                    </div>
                )
                :
                (
                    <Spinner animation={"grow"} />
                )
        );
    }
}
