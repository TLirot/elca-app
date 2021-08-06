import { ECPriceModel, PriceModel } from "./price.model";

export interface CoinsModel {
    USD: PriceModel,
    GBP: PriceModel,
    EUR: PriceModel,
}

export interface ECCoinsModel {
    USD: ECPriceModel,
    GBP: ECPriceModel,
    EUR: ECPriceModel,
}
