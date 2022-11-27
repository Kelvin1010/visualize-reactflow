import { selector } from "recoil";
import { themeState } from "./atom";

export const colorRl = selector({
    key:'darklight',
    get : ({get}) => {
        const colorRl = get(themeState)
        return colorRl
    }
});