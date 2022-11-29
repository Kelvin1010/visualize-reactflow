import { Box, FormControl, FormLabel, Select, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";
import isString from "lodash/isString";
import round from "lodash/round";
import { useRecoilValue } from "recoil";
import * as d3 from "d3-array";
import NodeContainer from "../../node-container";
import { getIncomers, useEdges, useNodes, useReactFlow } from "reactflow";
import { atomState } from "../../../helper/atom";
import { HandleLeft } from "../../handle-left";

const initialState = {
  column: "",
};

function StatsNode({ onCallback, id, isConnectable }) {
  const { getNode } = useReactFlow();
  const allNodes = useNodes();
  const allEdges = useEdges();
  const [input, setInput] = useState(initialState);
  const [columns, setColumns] = useState([]);
  const [output, setOutput] = useState({});
  const nodeParent = getIncomers(getNode(id), allNodes, allEdges)[0];
  const atoms = useRecoilValue(atomState);
  const atomParent = atoms.find((n) => n.id === nodeParent?.id);

  useEffect(() => {
    if (atomParent?.data) {
      var columnsParent = Object.keys(atomParent.data?.output?.[0] ?? {});
      var initialInput = {
        column: input.column === initialState.column ? columnsParent[0] : input.column,
      };
      var output = statsTransform(atomParent.data.output, initialInput);
      setInput(initialInput);
      setOutput(output);
      onCallback({ output, input: initialInput });
      setColumns(columnsParent);
    }

    if (!atomParent) {
      setInput(initialState);
      setColumns([]);
      setOutput({});
      onCallback({ output: null, input: null });
    }
  }, [atomParent?.data]);

  function handleChangeInput(event) {
    var { value, name } = event.target;
    var output = statsTransform(atomParent.data.output, { ...input, [name]: value });
    setInput({ ...input, [name]: value });
    setOutput(output);
  }

  const colorOption = useColorModeValue('black', 'white')

  return (
    <Stack>
      <FormControl>
        <FormLabel>Tên cột:</FormLabel>
        <Box position="relative">
          <Select name="column" value={input.column} onChange={handleChangeInput}>
            {columns.length > 0 ? (
              columns.map((value) => (
                <option key={value} value={value} style={{
                  color: colorOption
                }}>
                  {value}
                </option>
              ))
            ) : (
              <option value={""} disabled>
                ← liên kết dataset…
              </option>
            )}
          </Select>
          {!isEmpty(output) && (
            <Stack py={4} spacing="3">
              <Stack justify="space-between" direction="row">
                <Text>Min</Text>
                <Text>{output.min}</Text>
              </Stack>
              <Stack justify="space-between" direction="row">
                <Text>Max</Text>
                <Text>{output.max}</Text>
              </Stack>
              <Stack justify="space-between" direction="row">
                <Text>Average</Text>
                <Text>{output.average}</Text>
              </Stack>
              <Stack justify="space-between" direction="row">
                <Text>Median</Text>
                <Text>{output.median}</Text>
              </Stack>
              <Stack justify="space-between" direction="row">
                <Text>Sum</Text>
                <Text>{output.sum}</Text>
              </Stack>
              <Stack justify="space-between" direction="row">
                <Text>Variance</Text>
                <Text>{output.variance}</Text>
              </Stack>
            </Stack>
          )}
          <HandleLeft isConnectable={isConnectable} />
        </Box>
      </FormControl>
    </Stack>
  );
}

function statsTransform(input, { column }) {
  if (!Array.isArray(input)) {
    return {};
  }

  var data = input?.map((i) => i[column]);
  if (data.some((i) => isString(i))) {
    return {
      min: "NaN",
      max: "NaN",
      average: "NaN",
      median: "NaN",
      sum: "0.00",
      variance: "NaN",
    };
  }

  return {
    min: round(d3.min(data), 2),
    max: round(d3.max(data), 2),
    average: round(d3.mean(data), 2),
    median: round(d3.median(data), 2),
    sum: round(d3.sum(data), 2),
    variance: round(d3.variance(data), 2),
  };
}

function Sidebar({ onDragStart }) {
  return (
    <div className="dndnode" onDragStart={(event) => onDragStart(event, "stats")} draggable>
      Thống kê
    </div>
  );
}

export function StatsWrapper(props) {
  return (
    <NodeContainer {...props} label="Thống kê">
      <StatsNode />
    </NodeContainer>
  );
}

StatsWrapper.Sidebar = Sidebar;
