import { Box, FormControl, FormLabel, Select, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { Pie } from '@ant-design/plots';
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

function PieDarkThemeChart({ onCallback, id }) {

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
        appendPadding: 10,
        data,
        theme: 'dark',
        angleField: 'y',
        colorField: 'x',
        radius: 0.8,
        innerRadius: 0.64,
        meta: {
          value: {
            formatter: (v) => `¥ ${v}`,
          },
        },
        label: {
          type: 'inner',
          offset: '-50%',
          autoRotate: false,
          style: {
            textAlign: 'center',
            fill: '#fff',
          },
          formatter: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
        },
        statistic: {
          title: {
            offsetY: -8,
            style: {
              color: '#fff',
            },
          },
          content: {
            style: {
              color: '#fff',
            },
            offsetY: -4,
          },
        },
        pieStyle: {
          lineWidth: 0,
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
                  <Pie {...config} />
              </Stack>
          )}
        </Box>
    )
}

export default PieDarkThemeChart

function Sidebar({ onDragStart }) {
    return (
      <div className="dndnode" onDragStart={(event) => onDragStart(event, "pie-dark-chart")} draggable>
        Biểu đồ tròn dark background
      </div>
    );
}
 

export function PieDarkThemeChartWrapper(props) {
    return (
      <NodeContainer {...props} label="Biểu đồ tròn dark background" isLeftHandle className="chart-container">
        <PieDarkThemeChart />
      </NodeContainer>
    );
}
  
PieDarkThemeChartWrapper.Sidebar = Sidebar;