import { selector } from "recoil";
import { fileState } from "./atom";

export const file = selector({
    key:'fileRead',
    get : ({get}) => {
        const file = get(fileState)
        return file
    }
});