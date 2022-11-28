import { useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { EdgeLabelRenderer, getBezierPath, getConnectedEdges, getSimpleBezierPath, getSmoothStepPath, getStraightPath, useEdges, useNodes, useReactFlow, useStoreApi } from 'reactflow';
import { useRecoilValue } from 'recoil';
import { edges } from '../helper/edges/stateRecoil';


function EdgesContainer({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    data,
    markerEnd,
}) {

    const typeEdge = useRecoilValue(edges)
    function Types(){
        switch (typeEdge) {
            case 'getBezierPath':
                return getBezierPath
            case 'getSmoothStepPath':
                return getSmoothStepPath
            case 'getStraightPath':
                return getStraightPath
            case 'getSimpleBezierPath':
                return getSimpleBezierPath
            default:
                return getBezierPath;
        }
    }
    const [edgePath, labelX, labelY] = (Types())({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    

    // const hanleEdgeButtonClickToRemove = (evt, id,data) => {
    //     evt.stopPropagation();
    //     data?.setEdges((edges) => edges.filter((ed) => ed.id !== id));
    // };

    const colorEdge = useColorModeValue('black','white')

    return (
        <>
            <path
                id={id}
                style={{ stroke: colorEdge, strokeWidth: 3 }}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
            />
            <EdgeLabelRenderer>
                <div
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        background: 'teal',
                        padding: 10,
                        borderRadius: 5,
                        fontSize: 12,
                        fontWeight: 700,
                        color:'white'
                    }}
                    className="nodrag nopan"
                >
                    Connected
                </div>
            </EdgeLabelRenderer>
        </>
    )
}

export default EdgesContainer