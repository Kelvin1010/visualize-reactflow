import { selector } from "recoil";
import { edgeState } from "./atom";

export const edges = selector({
    key:'edges',
    get : ({get}) => {
        const edges = get(edgeState)
        return edges
    }
});