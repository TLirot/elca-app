export type CoinType = "USD" | "GBP" | "EUR";

export interface PriceModel {
    code: CoinType,
    rate: string,
    description: string,
    rate_float: number,
}

export interface ECPriceModel {
    code: CoinType,
    rate: string,
    description: string,
    rate_float: number,
}
