import { Box } from '@chakra-ui/react'
import { nanoid } from 'nanoid';
import React, { useCallback, useRef, useState } from 'react'
import ReactFlow, { addEdge, Background, Controls, getRectOfNodes, Position, useEdgesState, useNodesState, useReactFlow } from 'reactflow'
import { useSetRecoilState } from 'recoil';
import Header from '../components/Header';
import { atomState } from '../helper/atom';

const rfStyle = {
    backgroundColor: "black",
};

function Visualize() {

    const setValueAtom = useSetRecoilState(atomState);
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const { getIntersectingNodes } = useReactFlow();
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const selectedNodes = Array.from(nodes).filter((n) => n.selected);
    const getWandH = getRectOfNodes(selectedNodes);

    const onConnect = useCallback((connection) => setEdges((eds) => addEdge(connection, eds)), [setEdges]);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        (event) => {
        event.preventDefault();

        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData("application/reactflow");

        // check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
            return;
        }

        const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });

        const newNode = {
            id: nanoid(),
            type,
            position,
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            dragHandle: ".custom-drag-handle",
            data: {},
        };

        setNodes((nds) => nds.concat(newNode));
        setValueAtom((oldAtom) => oldAtom.concat({ id: newNode.id, type, data: {} }));
        },
        [reactFlowInstance, setNodes],
    );

    const onNodeDrag = useCallback((_, node) => {
        const intersections = getIntersectingNodes(node).map((n) => n.id);

        setNodes((ns) =>
        ns.map((n) => ({
            ...n,
            className: intersections.includes(n.id) ? 'highlight' : '',
        }))
        );
    }, []);

    return (
        <Box className='visualize'>
            <Header/>
            <div className='dndflow'>
                <div className='reactflow-wrapper' ref={reactFlowWrapper}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onNodeDrag={onNodeDrag}
                        onInit={setReactFlowInstance}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onConnect={onConnect}
                        minZoom={0.2}
                        maxZoom={4}
                        style={rfStyle}
                        fitView
                    >
                        <Background />
                        <Controls />
                    </ReactFlow>
                </div>
            </div>
        </Box>
    )
}

export default Visualize