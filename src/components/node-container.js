import React, { useEffect, useRef, useState } from 'react';
import produce from "immer";
import { Box, CloseButton, Divider, Stack, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { DragHandleIcon } from "@chakra-ui/icons";
import { getConnectedEdges, Handle, useNodes, useReactFlow, useStoreApi, useUpdateNodeInternals } from 'reactflow';
import { useRecoilState } from 'recoil';
import { atomState } from '../helper/atom';
import ModalNodes from './modals/modal-nodes';
import styled from 'styled-components';
import InfoNode from './info-node';
import { NodeResizer, NodeResizeControl } from '@reactflow/node-resizer';
import '@reactflow/node-resizer/dist/style.css';
import { select } from 'd3-selection';
import { drag } from 'd3-drag';

const controlStyle = {
    background: 'transparent',
    border: 'none',
};


const Node = styled.div`
    .react-flow__handle {
        z-index: 2;
        border-radius: unset;
        border: none;
        background-color: ${(props) => (props.selected ? props.theme.primary : props.theme.nodeBorder)};
    }
    .node-container{
        background-color: ${(props) => props.theme.bgNode}
        color: ${(props) => props.theme.textColor}
    }
    .ant-upload{
        color: ${(props) => props.theme.colorbuttonImg}
    }
`


function NodeContainer({
    children,
    label,
    id,
    isConnectable,
    isLeftHandle = false,
    className = "node-container",
    type,
    selected
}) {

    const rotateControlRef = useRef(null);
    const updateNodeInternals = useUpdateNodeInternals();
    const [rotation, setRotation] = useState(0);
    const [resizable, setResizable] = useState(true);
    const [rotatable, setRotatable] = useState(true);

    const [atoms, setAtoms] = useRecoilState(atomState);
    const atom = atoms.find((a) => a.id === id)?.data;

    const { getEdges, getNode } = useReactFlow();
    const store = useStoreApi();


    function handleDeleteNode() {
        const { onNodesDelete, onNodesChange, onEdgesChange, onEdgesDelete } = store.getState();
        const nodesToRemove = [getNode(id)];

        const connectedEdges = getConnectedEdges(nodesToRemove, getEdges());
        const edgesToRemove = [...connectedEdges];
        const edgeIdsToRemove = edgesToRemove.reduce((res, edge) => {
            if (!res.includes(edge.id)) {
                res.push(edge.id);
            }
            return res;
        }, []);

        if (edgeIdsToRemove.length > 0) {
            onEdgesDelete?.(edgesToRemove);

            if (onEdgesChange) {
                const edgeChanges = edgeIdsToRemove.map((id) => ({
                id,
                type: "remove",
                }));
                onEdgesChange(edgeChanges);
            }
        }

        if (nodesToRemove.length > 0) {
        onNodesDelete?.(nodesToRemove);

        if (onEdgesChange) {
            const nodeChanges = nodesToRemove.map((n) => ({
                id: n.id,
                type: "remove",
                }));
                onNodesChange(nodeChanges);
            }
        }

        setAtoms(
        produce((draft) => {
            const index = draft.findIndex((n) => n.id === nodesToRemove[0].id);
            if (index !== -1) draft.splice(index, 1);
        }),
        );
        store.setState({ nodesSelectionActive: false });
    }

    function handleCallback(params) {
        setAtoms(
        produce((draft) => {
            const index = draft.findIndex((n) => n.id === id);
            if (index !== -1) draft[index].data = params;
        }),
        );
    }

    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
        return React.cloneElement(child, {
            onCallback: handleCallback,
            id,
            isConnectable,
        });
        }
        return child;
    });

    const bg = useColorModeValue('black', 'white')
    const textNode = useColorModeValue('white', 'black');

    useEffect(() => {
        if (!rotateControlRef.current) {
            return;
        }
    
        const selection = select(rotateControlRef.current);
        const dragHandler = drag().on('drag', (evt) => {
            const dx = evt.x - 100;
            const dy = evt.y - 100;
            const rad = Math.atan2(dx, dy);
            const deg = rad * (180 / Math.PI);
            setRotation(180 - deg);
            updateNodeInternals(id);
        });
    
        selection.call(dragHandler);
    },[id, updateNodeInternals])

    return (
        <Node selected={selected}  className={className}>
            <NodeResizeControl style={controlStyle} minWidth={200} minHeight={100}>
                <ResizeIcon />
            </NodeResizeControl>
            {isLeftHandle && <Handle type="target" position="left" className="handle-left" isConnectable={isConnectable} />}
            <Box 
                boxShadow="sm" 
                color={textNode} 
                backgroundColor={bg} 
                className={className}
                height={'100%'} 
                width={'100%'} 
            >
                <Stack padding="4" direction="row" justify="space-between" alignItems="center" className="custom-drag-handle">
                <Box display="flex" alignItems="center" fontSize="lg">
                    <DragHandleIcon mr="2" />
                    <Text fontSize="xl">{label}</Text>
                </Box>
                <Box display={'flex'} alignItems={'center'}>
                    <InfoNode />
                    <ModalNodes data={atom} />
                    <CloseButton onClick={handleDeleteNode} />
                </Box>
                </Stack>
                <Divider />
                <Box padding="4">{childrenWithProps}</Box>
                <Divider />
                {atom?.output?.length > 0 && (
                <Box padding="4">
                    [DATASET] {atom.output?.length} rows | {Object?.keys(atom.output?.[0])?.length} columns
                </Box>
                )}
            </Box>
            {!OUTPUT_TYPE_NODE.includes(type) && (
                <Handle type="source" position="right" className="handle-right" isConnectable={isConnectable} />
            )}
        </Node>
    )
}

export default NodeContainer;


export const INPUT_TYPE_NODE = ["example-data", "file", "http", "paste"];
export const TRANSFORM_TYPE_NODE = ["slice", "filter", "export"];
export const OUTPUT_TYPE_NODE = ["group-chart"];

function ResizeIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="#ff0071"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ position: 'absolute', right: 5, bottom: 5 }}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <polyline points="16 20 20 20 20 16" />
        <line x1="14" y1="14" x2="20" y2="20" />
        <polyline points="8 4 4 4 4 8" />
        <line x1="4" y1="4" x2="10" y2="10" />
      </svg>
    );
}