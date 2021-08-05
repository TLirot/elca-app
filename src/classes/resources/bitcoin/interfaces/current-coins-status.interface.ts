import { Coins } from "./coins.interface";
import { TimeData } from "./time-data.interface";

export interface CurrentCoinsStatus {
    time: TimeData,
    disclaimer: string,
    charName: string,
    bpi: Coins,
}
