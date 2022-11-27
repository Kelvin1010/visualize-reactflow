import React, { useEffect, useState } from 'react';
import { Box, FormControl, FormLabel, Select, Stack } from "@chakra-ui/react";
import { useRecoilValue } from 'recoil';
import { Scatter } from '@ant-design/plots';
import { getIncomers, useEdges, useNodes, useReactFlow } from 'reactflow';
import { atomState } from '../../../../helper/atom';
import { Move4ColumnsOfData } from '../../../data-transfer/move-columns-of-data';
import NodeContainer from '../../../node-container';



const options = {
    reponsive: true,
};
  
const initialState = {
    xColumn: "",
    yColumn: "",
    zColumn: "",
    kColumn: "",
};



function Bubble3dChart({ onCallback, id }) {

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
            zColumn: columnsParent.includes(input.zColumn) ? input.zColumn : columnsParent[0],
            kColumn: columnsParent.includes(input.kColumn) ? input.kColumn : columnsParent[0],
        };
        var output =  Move4ColumnsOfData(atomParent.data.output, initialInput);
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
        var output =  Move4ColumnsOfData(atomParent.data.output, { ...input, [name]: value });
        setInput({ ...input, [name]: value });
        setOutput(output);
        onCallback({ input: { ...input, [name]: value }, output: atomParent.data.output });
    }

    const data = output;

    const config = {
        appendPadding: 30,
        data,
        xField: 'x',
        yField: 'y',
        colorField: 'z',
        color: ['r(0.4, 0.3, 0.7) 0:rgba(255,255,255,0.5) 1:#5B8FF9', 'r(0.4, 0.4, 0.7) 0:rgba(255,255,255,0.5) 1:#61DDAA'],
        sizeField: 'k',
        size: [5, 20],
        shape: 'circle',
        yAxis: {
          nice: true,
          line: {
            style: {
              stroke: '#eee',
            },
          },
        },
        xAxis: {
          grid: {
            line: {
              style: {
                stroke: '#eee',
              },
            },
          },
          line: {
            style: {
              stroke: '#eee',
            },
          },
        },
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
                    <FormLabel>x-axis</FormLabel>
                    <Select name="xColumn" value={input.xColumn} onChange={handleChangeInput}>
                    {columns.map((value) => (
                        <option key={value} value={value}>
                        {value}
                        </option>
                    ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>y-axis</FormLabel>
                    <Select name="yColumn" value={input.yColumn} onChange={handleChangeInput}>
                    {columns.map((value) => (
                        <option key={value} value={value}>
                        {value}
                        </option>
                    ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>z-axis</FormLabel>
                    <Select name="zColumn" value={input.zColumn} onChange={handleChangeInput}>
                    {columns.map((value) => (
                        <option key={value} value={value}>
                        {value}
                        </option>
                    ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>k-axis</FormLabel>
                    <Select name="kColumn" value={input.kColumn} onChange={handleChangeInput}>
                    {columns.map((value) => (
                        <option key={value} value={value}>
                        {value}
                        </option>
                    ))}
                    </Select>
                </FormControl>
                <Scatter {...config} />
                </Stack>
            )}
        </Box>
    )
}

export default Bubble3dChart



function Sidebar({ onDragStart }) {
    return (
      <div className="dndnode" onDragStart={(event) => onDragStart(event, "bubble-3d-chart")} draggable>
        Biểu đồ cột bubble 3D
      </div>
    );
}
  
export function Bubble3dChartWrapper(props) {
    return (
      <NodeContainer {...props} label="Biểu đồ bubble 3D" isLeftHandle className="chart-container">
        <Bubble3dChart />
      </NodeContainer>
    );
}
  
Bubble3dChartWrapper.Sidebar = Sidebar;