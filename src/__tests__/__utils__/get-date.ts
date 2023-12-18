import { setYear } from "date-fns";

export function getFutureDate () : Date {
    return setYear(new Date(), new Date().getFullYear() + 1);
}

export function getPastDate () : Date {
    return setYear(new Date(), new Date().getFullYear() - 1);
}