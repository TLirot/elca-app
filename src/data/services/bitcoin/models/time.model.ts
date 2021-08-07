import dayjs from "dayjs";

export interface TimeModel {
    updated: string,
    updatedISO: string,
    updateduk: string,
}

export interface ECTimeModel {
    updatedISO: dayjs.Dayjs,
}
