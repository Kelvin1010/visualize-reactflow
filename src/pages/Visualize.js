import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Box, useColorModeValue } from '@chakra-ui/react'
import { nanoid } from 'nanoid';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactFlow, { addEdge, Background, Controls, getRectOfNodes, MarkerType, MiniMap, Position, updateEdge, useEdgesState, useNodesInitialized, useNodesState, useReactFlow } from 'reactflow'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled, { ThemeProvider } from 'styled-components';
import { createGraphLayout } from '../components/algorithms-layout/layout-elkjs';
import EdgesContainer from '../components/edges-container';
import GroupContainer from '../components/group-container';
import Header from '../components/header';
import NodeAutodrawContainer from '../components/node-autodraw-container';
import { 
    AreaBasicChartWrapper,
    AreaStackedChartWrapper,
    BarGroupChartWrapper,
    BarStackedChartWrapper,
    BarWrapper,
    BasicLineChartWrapper,
    Bubble3dChartWrapper,
    BubblePlotChartWrapper,
    CodeNodeWrapper,
    ColumnBasicChartWrapper,
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
    PieDarkThemeChartWrapper,
    RadarBasicChartWrapper,
    RoseBasicChartWrapper,
    RoseGroupChartWrapper,
    RoseStackedChartWrapper,
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
import { infoNodeState } from '../helper/info-node/atom';
import { variant } from '../helper/variant/stateRecoil';
import { darkTheme, lightTheme } from '../theme/theme';



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
    "column-basic-chart": ColumnBasicChartWrapper,
    "column-stacked-chart": ColumnStackedChartWrapper,
    "percent-column-chart": PercentColumnChartWrapper,
    "basic-line-chart": BasicLineChartWrapper,  
    "multiple-line-plot-animation-chart": MultipleLinePlotAnimationWrapper,
    "step-line-chart": StepLineChartWrapper,
    "heatmap-shapesize-chart": HeatmapShapezieChartWrapper,
    merge: MergeWrapper,
    sort: SortWrapper,
    "group-node": GroupWrapper,
    "tree-map-chart": TreeMapsChartWrapper,
    stats: StatsWrapper,
    "pie-chart": PieChartWrapper,
    "pie-dark-chart": PieDarkThemeChartWrapper,
    "rose-basic-chart": RoseBasicChartWrapper,
    "rose-group-chart": RoseGroupChartWrapper,
    "rose-stacked-chart": RoseStackedChartWrapper,
    "code-node": CodeNodeWrapper,
    "text-node": TextNodeWrapper,
    "image-node": ImageNodeWrapper,
    groupNode: GroupContainer,
    nodeautodraw: NodeAutodrawContainer,
    "radar-basic-chart": RadarBasicChartWrapper,
};

const edgeTypes = {
    edgescontainer: EdgesContainer,
};

const rfStyle = {
    backgroundColor: "black",
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const ReactFlowStyled = styled(ReactFlow)`
    background-color: ${(props) => props.theme.bg}
`

function Visualize() {

    const setValueAtom = useSetRecoilState(atomState);
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const selectedNodes = Array.from(nodes).filter((n) => n.selected);
    const getWandH = getRectOfNodes(selectedNodes);
    const filehere = useRecoilValue(file);
    const modalColor = useColorModeValue('white', 'black');
    const backgroundColorReactFlow = useColorModeValue('black','white');
    const variantValue = useRecoilValue(variant);
    const [infoNode, setInfoNode] = useRecoilState(infoNodeState);
    const [mode, setMode] = useState('dark');
    const theme = mode === 'dark' ? darkTheme : lightTheme;

    const handleToggleModeBackGround = () => {
        setMode((m) => (m === 'dark' ? 'light' : 'dark'));
    };

    const onConnect = useCallback((connection) => setEdges((eds) => addEdge({
        ...connection, 
        type: 'edgescontainer', 
        animated:true, 
        label:'Connected',
        markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 15,
            height: 15,
            color: 'red',
        },
    }, eds)), [setEdges]);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onEdgeUpdate = useCallback(
        (oldEdge, newConnection) => setEdges((els) => updateEdge(oldEdge, newConnection, els)),
        []
    );

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


    //create group
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

    function handleNodeClick(event,node){
        // event.stopImmediatePropagation();
        setInfoNode(node);
    } 

    return (
        <Box className='visualize'>
            <Header/>
            <div className='dndflow'>
                <Sidebar />
                <div className='reactflow-wrapper' ref={reactFlowWrapper} id="download-image">
                    <ThemeProvider theme={theme}>
                        {/* <div className='themeColorBg'>
                        {mode ==='dark' ? <MoonIcon color={'white'} onClick={handleToggleModeBackGround}/> : <SunIcon color={'black'} onClick={handleToggleModeBackGround} />}
                        </div> */}
                        <ReactFlowStyled
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onInit={setReactFlowInstance}
                            onDrop={onDrop}
                            onNodeClick={handleNodeClick}
                            onDragOver={onDragOver}
                            onConnect={onConnect}
                            onEdgeUpdate={onEdgeUpdate}
                            onMouseUp={handleCreateGroup}
                            nodeTypes={nodeTypes}
                            edgeTypes={edgeTypes}
                            style={{
                                backgroundColor: modalColor
                            }}
                            fitView
                        >
                            <Background 
                                variant={variantValue}
                                style={{
                                    color: backgroundColorReactFlow
                                }}
                            />
                            <Controls />
                            <MiniMap style={{ backgroundColor: backgroundColorReactFlow }} zoomable pannable/>
                        </ReactFlowStyled>
                    </ThemeProvider>
                </div>
            </div>
        </Box>
    )
}

export default Visualize