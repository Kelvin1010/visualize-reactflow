import React, { useEffect, useState } from 'react'
import { Box, FormControl, FormLabel, Select, Stack } from "@chakra-ui/react";
import { useRecoilValue } from 'recoil';
import { Treemap } from '@ant-design/plots';
import { getIncomers, useEdges, useNodes, useReactFlow } from 'reactflow';
import { atomState } from '../../../../helper/atom';
import NodeContainer from '../../../node-container';
import { Move2ColumnsOfData } from '../../../data-transfer/move-columns-of-data';

const options = {
    reponsive: true,
};
  
const initialState = {
    xColumn: "",
    yColumn: "",
};

function TreeMapsChart({ onCallback, id }) {

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

    const data = {
        name: 'root',
        children: output,
    };
    console.log(data)
    const config = {
        data,
        colorField: 'x',
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
                <Treemap {...config} />
                </Stack>
            )}
        </Box>
    )
}

export default TreeMapsChart


function Sidebar({ onDragStart }) {
    return (
      <div className="dndnode" onDragStart={(event) => onDragStart(event, "tree-map-chart")} draggable>
        Biểu đồ Tree Maps
      </div>
    );
}
  
export function TreeMapsChartWrapper(props) {
    return (
      <NodeContainer {...props} label="Biểu đồ Tree Maps" isLeftHandle className="chart-container">
        <TreeMapsChart />
      </NodeContainer>
    );
}
  
TreeMapsChartWrapper.Sidebar = Sidebar;