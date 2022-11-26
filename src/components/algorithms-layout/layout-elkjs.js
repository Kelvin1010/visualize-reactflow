import Elk from "elkjs";
import { isEdge, isNode } from "reactflow";

const DEFAULT_WIDTH = 172;
const DEFAULT_HEIGHT = 36;

export const createGraphLayout = async (elementNodes, elementEdges) => {
  
    const nodes = []
    const edges = []
    const elk = new Elk({
        defaultLayoutOptions: {
        "elk.algorithm": "layered",
        "elk.direction": "DOWN", // TYPE: 	UNDEFINED / RIGHT / LEFT / DOWN / UP
        "elk.spacing.nodeNode": "35",
        "elk.padding": "[top=200,left=100,bottom=25,right=25]",
        "elk.layered.spacing.nodeNodeBetweenLayers": "75",
        "elk.layered.spacing": "50",
        "elk.spacing": "50",
        "elk.spacing.individual": "50",
        "elk.edgeRouting": "SPLINES",
        }
    });

    elementNodes?.forEach((el) => {
        if (isNode(el)) {
        nodes.push({
            ...el,
            id: el.id,
            width: el.__rf?.width ?? DEFAULT_WIDTH,
            height: el.__rf?.height ?? DEFAULT_HEIGHT
        });
        }
    });

    elementEdges?.forEach((el) => {
        if(isEdge(el)){
        edges.push({
            ...el,
            id: el.id,
            target: el.target,
            source: el.source
        });
        }
    })

    const newGraph = await elk.layout({
        id: "root",
        children: nodes,
        edges: edges
    });

    nodes?.map((el) => {
        if (isNode(el)) {
        const node = newGraph?.children?.find((n) => n.id === el.id);
        el.sourcePosition = "right";
        el.targetPosition = "left";
        if (node?.x && node?.y && node?.width && node?.height) {
            el.position = {
            x: node.x - node.width / 2 + Math.random() / 1000,
            y: node.y - node.height / 2
            };
        }
        }
        return el;
    });
    return {nodes, edges}
};



