import { CoinsModel } from "./coins.model";
import { TimeModel } from "./time.model";

export interface CurrentCoinsStatus {
    time: TimeModel,
    disclaimer: string,
    charName: string,
    bpi: CoinsModel,
}
