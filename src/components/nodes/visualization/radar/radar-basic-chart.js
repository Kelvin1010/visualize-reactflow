import { Box, FormControl, FormLabel, Select, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { getIncomers, useEdges, useNodes, useReactFlow } from 'reactflow';
import { atomState } from '../../../../helper/atom';
import NodeContainer from '../../../node-container';
import { Move2ColumnsOfData } from '../../../data-transfer/move-columns-of-data';
import { Radar } from '@ant-design/plots';


const options = {
    reponsive: true,
};

const initialState = {
    xColumn: "",
    yColumn: "",
};

function RadarBasicChart({ onCallback, id }) {

    const { getNode } = useReactFlow();
    const allNodes = useNodes();
    const allEdges = useEdges();
    const [input, setInput] = useState(initialState);
    const [columns, setColumns] = useState([]);
    const [output, setOutput] = useState([]);
    const nodeParent = getIncomers(getNode(id), allNodes, allEdges)[0];
    const atoms = useRecoilValue(atomState);
    const atomParent = atoms.find((n) => n.id === nodeParent?.id);

    useEffect(() => {
        if (atomParent?.data) {
          var columnsParent = Object.keys(atomParent.data?.output?.[0] ?? {});
          var initialInput = {
            xColumn: columnsParent.includes(input.xColumn) ? input.xColumn : columnsParent[0],
            yColumn: columnsParent.includes(input.yColumn) ? input.yColumn : columnsParent[0],
          };
          var output = Move2ColumnsOfData(atomParent.data.output, initialInput);
          setInput(initialInput);
          setOutput(output);
          onCallback({ output: atomParent.data.output, input: initialInput });
          setColumns(columnsParent);
        }
    
        if (!atomParent) {
          setOutput([]);
          setColumns([]);
          onCallback({ output: null, input: null });
        }
    }, [atomParent?.data]);
    
    function handleChangeInput(event) {
        var { value, name } = event.target;
        var output = Move2ColumnsOfData(atomParent.data.output, { ...input, [name]: value });
        setInput({ ...input, [name]: value });
        setOutput(output);
        onCallback({ input: { ...input, [name]: value }, output: atomParent.data.output });
    }
    
    const data = output;

    const config = {
        data: data.map((d) => ({ ...d, y: Math.sqrt(d.y) })),
        xField: 'x',
        yField: 'y',
        appendPadding: [0, 10, 0, 10],
        meta: {
          star: {
            alias: 'value',
            min: 0,
            nice: true,
            formatter: (v) => Number(v).toFixed(2),
          },
        },
        xAxis: {
          tickLine: null,
        },
        yAxis: {
          label: false,
          grid: {
            alternateColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
        point: {
          size: 2,
        },
        area: {},
    };


    return (
        <Box>
            {columns.length <= 0 ? (
                <Box position="relative">
                <div>← kết nối dataset...</div>
                </Box>
            ) : (
                <Stack>
                    <FormControl>
                        <FormLabel>Title data</FormLabel>
                        <Select name="xColumn" value={input.xColumn} onChange={handleChangeInput}>
                        {columns.map((value) => (
                            <option key={value} value={value}>
                            {value}
                            </option>
                        ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Value data</FormLabel>
                        <Select name="yColumn" value={input.yColumn} onChange={handleChangeInput}>
                        {columns.map((value) => (
                            <option key={value} value={value}>
                            {value}
                            </option>
                        ))}
                        </Select>
                    </FormControl>
                    <Radar {...config} />
              </Stack>
          )}
        </Box>
    )
}

export default RadarBasicChart

function Sidebar({ onDragStart }) {
    return (
      <div className="dndnode" onDragStart={(event) => onDragStart(event, "radar-basic-chart")} draggable>
        Biểu đồ radar cơ bản
      </div>
    );
}
 

export function RadarBasicChartWrapper(props) {
    return (
      <NodeContainer {...props} label="Biểu đồ radar cơ bản" isLeftHandle className="chart-container">
        <RadarBasicChart />
      </NodeContainer>
    );
}
  
RadarBasicChartWrapper.Sidebar = Sidebar;