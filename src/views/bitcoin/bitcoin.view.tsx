import { Component, ReactNode } from "react";
import { CurrentCoinsStatus } from "../../data/services/bitcoin/models/current-coins-status.model";
import { BitcoinServices } from "../../data/services/bitcoin/bitcoin.services";
import { Button, Spinner } from "react-bootstrap";
import { CoinInfoView } from "./coin-info.view";

interface BitcoinViewState {
    currentCoinsStatus: CurrentCoinsStatus | undefined
}

export class BitcoinView extends Component<Record<never, never>, BitcoinViewState> {

    readonly state: Readonly<BitcoinViewState> = {
        currentCoinsStatus: undefined,
    }

    constructor (props: Record<never, never>) {
        super(props);

        this.fetchCurrentStatus = this.fetchCurrentStatus.bind(this);
    }

    async componentDidMount(): Promise<void> {
        await this.fetchCurrentStatus();
    }

    async fetchCurrentStatus(): Promise<void> {
        try {
            const result = await new BitcoinServices().coinStatus();
            this.setState({currentCoinsStatus: result});
        }catch (error){
            console.error(error);
        }
    }

    realoadData (): void {
        this.setState({currentCoinsStatus: undefined}, this.fetchCurrentStatus);
    }

    render (): ReactNode {
        return (
            this.state.currentCoinsStatus
                ?
                (
                    <div className={"row"}>
                        <div className={"col-4"}>
                            <CoinInfoView
                                {...this.state.currentCoinsStatus.bpi.EUR}
                                updateISOTime={this.state.currentCoinsStatus.time.updatedISO} />
                        </div>
                        <div className={"col-4"}>
                            <CoinInfoView
                                {...this.state.currentCoinsStatus.bpi.USD}
                                updateISOTime={this.state.currentCoinsStatus.time.updatedISO} />
                        </div>
                        <div className={"col-4"}>
                            <CoinInfoView
                                {...this.state.currentCoinsStatus.bpi.GBP}
                                updateISOTime={this.state.currentCoinsStatus.time.updatedISO} />
                        </div>
                        <div className={"row justify-content-around my-3"}>
                            <div className={"col-2"}>
                                <Button onClick={this.fetchCurrentStatus}>Reload</Button>
                            </div>
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
