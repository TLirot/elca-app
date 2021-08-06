import { CoinsModel, ECCoinsModel } from "./coins.model";
import { ECTimeModel, TimeModel } from "./time.model";

export interface CurrentCoinsStatus {
    time: TimeModel,
    disclaimer: string,
    charName: string,
    bpi: CoinsModel,
}

export interface ECCurrentCoinsStatus {
    time: ECTimeModel,
    bpi: ECCoinsModel,
}
