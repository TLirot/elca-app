import { CoinType } from "../coin.type";

export interface Price {
    code: CoinType,
    rate: string,
    description: string,
    rate_float: number,
}
