import React from 'react';
import { EdgeLabelRenderer, getBezierPath, getConnectedEdges, getSmoothStepPath, useEdges, useNodes, useReactFlow, useStoreApi } from 'reactflow';

const foreignObjectSize = 40;

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

    const [edgePath, labelX, labelY] = getBezierPath({
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

    return (
        <>
            <path
                id={id}
                style={{ stroke: 'white', strokeWidth: 3 }}
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