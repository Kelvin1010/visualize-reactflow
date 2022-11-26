import { Box } from '@chakra-ui/react'
import { nanoid } from 'nanoid';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactFlow, { addEdge, Background, Controls, getRectOfNodes, MarkerType, Position, useEdgesState, useNodesState, useReactFlow } from 'reactflow'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { createGraphLayout } from '../components/algorithms-layout/layout-elkjs';
import GroupContainer from '../components/group-container';
import Header from '../components/header';
import NodeAutodrawContainer from '../components/node-autodraw-container';
import { 
    AreaBasicChartWrapper,
    AreaStackedChartWrapper,
    BarGroupChartWrapper,
    BarStackedChartWrapper,
    BarWrapper,
    Bubble3dChartWrapper,
    BubblePlotChartWrapper,
    CodeNodeWrapper,
    ColumnBasicSliderChartWrapper,
    ColumnGroupChartWrapper,
    ColumnStackedChartWrapper,
    ExampleDataWrapped, 
    ExportDataWrapper, 
    FileDataWrapper, 
    FilterWrapper, 
    GroupWrapper, 
    HeatmapShapezieChartWrapper, 
    HttpRequestWrapper,
    ImageNodeWrapper,
    MergeWrapper,
    MultipleLinePlotAnimationWrapper,
    PasteDataWrapper,
    PercentBarChartWrapper,
    PercentColumnChartWrapper,
    PieChartWrapper,
    ScatterPlotChartWrapper,
    SliceWrapper,
    SortWrapper,
    StatsWrapper,
    StepLineChartWrapper,
    TextNodeWrapper,
    TreeMapsChartWrapper
} from '../components/nodes';
import Sidebar from '../components/sidebar';
import { atomState } from '../helper/atom';
import { file } from '../helper/autodraw/stateRecoil';



const nodeTypes = {
    "example-data": ExampleDataWrapped,
    file: FileDataWrapper,
    http: HttpRequestWrapper,
    export: ExportDataWrapper,
    paste: PasteDataWrapper,
    slice: SliceWrapper,
    filter: FilterWrapper,
    "scatter-plot-chart": ScatterPlotChartWrapper,
    "bubble-chart": BubblePlotChartWrapper,
    "bubble-3d-chart": Bubble3dChartWrapper,
    "area-basic-chart": AreaBasicChartWrapper,
    "area-stacked-chart": AreaStackedChartWrapper,
    "bar": BarWrapper,
    "bar-stacked-chart": BarStackedChartWrapper,
    "bar-group-chart": BarGroupChartWrapper,
    "bar-percent-chart": PercentBarChartWrapper,
    "column-group-chart": ColumnGroupChartWrapper,
    "column-basic-slider-chart": ColumnBasicSliderChartWrapper,
    "column-stacked-chart": ColumnStackedChartWrapper,
    "percent-column-chart": PercentColumnChartWrapper,
    "multiple-line-plot-animation-chart": MultipleLinePlotAnimationWrapper,
    "step-line-chart": StepLineChartWrapper,
    "heatmap-shapesize-chart": HeatmapShapezieChartWrapper,
    merge: MergeWrapper,
    sort: SortWrapper,
    "group-node": GroupWrapper,
    "tree-map-chart": TreeMapsChartWrapper,
    stats: StatsWrapper,
    "pie-chart": PieChartWrapper,
    "code-node": CodeNodeWrapper,
    "text-node": TextNodeWrapper,
    "image-node": ImageNodeWrapper,
    groupNode: GroupContainer,
    nodeautodraw: NodeAutodrawContainer,
};


const rfStyle = {
    backgroundColor: "black",
};

let id = 0;
const getId = () => `dndnode_${id++}`;

function Visualize() {

    const setValueAtom = useSetRecoilState(atomState);
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const { getIntersectingNodes } = useReactFlow();
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const selectedNodes = Array.from(nodes).filter((n) => n.selected);
    const getWandH = getRectOfNodes(selectedNodes);
    const filehere = useRecoilValue(file);

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

    const handleCreateGroup = () => {
        if(selectedNodes?.length > 1){
            const newNodeGroup = {
                id: getId(),
                data: { label: `node group-${getId()}` },
                type: 'groupTp',
                position: {x: getWandH.x, y: getWandH.y},
                style: { backgroundColor: 'rgba(0,89,220,.08)', width: Number(getWandH.width+50), height: Number(getWandH.height+50), paddingTop: '20px', color:'black', zIndex:1 }
            }
            setNodes([...nodes, newNodeGroup])
            selectedNodes?.forEach(item => {
                setNodes(nds => nds.map(node => node.id === item.id ? ({...node,
                style:{zIndex: 999},
                position: {x: 5, y: 30},
                parentNode: newNodeGroup.id, 
                extent: 'parent'
                }): node))
            })
            createGraphLayout(
                nodes,
                edges
            );
        }
    }
    
    //Take data to draw 
    useEffect(() => {
        if(filehere.length > 0) {
        let nodes = filehere.map((item) => (
            {
            id: String(item.name),
            type: 'nodeautodraw',
            data: { 
                label: `${item.name}`, 
                input: `${item.input}`,
                output: `${item.output}`,
                inof:`${item.input_name}`,
                typenode: `${item.op_type}`
            },
            position: {x: 0, y: 0},
            }
        ));
        let edges = [];
        if (Array.isArray(filehere)) {
            filehere?.forEach((item)=> {
            let inputs = item.input_name?.split(",");
            if(inputs) inputs.forEach((input)=> {
                if(!nodes.find((node)=> {return node.id == input;})) {
                nodes.push({
                    id: String(input),
                    type: `nodeautodraw`,
                    data: { 
                        label: input, 
                        input: null,
                    },
                    position: {x: 0, y: 0},
                })
                }
            })
            })
    
            filehere?.forEach((item)=> {
            let outputName = item.name;
            if (item.input_name) {
                let inputs = item.input_name?.split(",");
                inputs.forEach((input) => {
                edges.push({
                    id: String(`edge-${input}-${outputName}`),
                    target: outputName,
                    source: input,
                    animated: true,
                    type: 'step',
                    style: { stroke: 'white' },
                    markerEnd: {
                    type: MarkerType.ArrowClosed,
                    },
                })
                })
            }
            })
        }
        
        (async () => {
            const res = await createGraphLayout(
            nodes,
            edges
            );
            setNodes(res.nodes)
            setEdges(res.edges)
        })()
        }
        handleCreateGroup()
    }, [filehere])

    return (
        <Box className='visualize'>
            <Header/>
            <div className='dndflow'>
                <Sidebar />
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
                        nodeTypes={nodeTypes}
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