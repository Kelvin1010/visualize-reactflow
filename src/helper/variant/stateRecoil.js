import { selector } from "recoil";
import { variantState } from "./atom";

export const variant = selector({
    key:'variant',
    get : ({get}) => {
        const variant = get(variantState)
        return variant
    }
});