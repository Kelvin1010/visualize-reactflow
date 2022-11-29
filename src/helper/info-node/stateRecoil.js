import { selector } from "recoil";
import { infoNodeState } from "./atom";

export const infoNode = selector({
    key:'infonode',
    get : ({get}) => {
        const infonode = get(infoNodeState)
        return infonode
    }
});