import { Box, FormControl, FormLabel, Select, Stack, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getIncomers, useEdges, useNodes, useReactFlow } from "reactflow";
import { useRecoilValue } from "recoil";
import { atomState } from "../../../helper/atom";
import { HandleLeft } from "../../handle-left";
import NodeContainer from "../../node-container";

const initialState = {
  column: "",
  order: "asc",
};

function SortNode({ onCallback, id, isConnectable }) {
  const { getNode } = useReactFlow();
  const allNodes = useNodes();
  const allEdges = useEdges();
  const [input, setInput] = useState(initialState);
  const [columns, setColumns] = useState([]);
  const nodeParent = getIncomers(getNode(id), allNodes, allEdges)[0];
  const atoms = useRecoilValue(atomState);
  const atomParent = atoms.find((n) => n.id === nodeParent?.id);

  useEffect(() => {
    if (atomParent?.data) {
      var columnsParent = Object.keys(atomParent.data?.output?.[0] ?? {});
      var initialInput = {
        column: input.column === initialState.column ? columnsParent[0] : input.column,
        order: input.order === initialState.order ? "asc" : input.order,
      };
      var output = sort(atomParent.data.output, initialInput);
      setColumns(columnsParent);
      setInput(initialInput);
      onCallback({ output, input: initialInput });
    }
    if (!atomParent) {
      setInput(initialState);
      setColumns([]);
      onCallback({ output: null, input: null });
    }
  }, [atomParent?.data]);

  function handleChangeInput(event) {
    var { value, name } = event.target;
    var output = sort(atomParent.data.output, { ...input, [name]: value });
    setInput({ ...input, [name]: value });
    onCallback({ output, input });
  }

  const colorOptionSort = useColorModeValue('black', 'white')

  return (
    <Stack>
      <FormControl>
        <FormLabel>Column name:</FormLabel>
        <Box position="relative">
          <Select name="column" value={input.column} onChange={handleChangeInput}>
            {columns.length > 0 ? (
              columns.map((value) => (
                <option key={value} value={value} style={{ color: colorOptionSort }}>
                  {value}
                </option>
              ))
            ) : (
              <option value={""} disabled>
                ← kết nối dataset...
              </option>
            )}
          </Select>
          <HandleLeft isConnectable={isConnectable} />
        </Box>
      </FormControl>
      <FormControl>
        <FormLabel>Order:</FormLabel>
        <Box position="relative">
          <Select name="order" value={input.order} onChange={handleChangeInput}>
            <option value="asc"  style={{ color: colorOptionSort }}>Ascending</option>
            <option value="desc"  style={{ color: colorOptionSort }}>Descending</option>
          </Select>
        </Box>
      </FormControl>
    </Stack>
  );
}

function sort(input, { column, order }) {
  if (!Array.isArray(input)) {
    return [];
  }

  return [...input]?.sort(function handleSort(a, b) {
    if (typeof a[column] === "number") {
      return a[column] - b[column];
    }

    var nameA = String(a[column]).toUpperCase();
    var nameB = String(b[column]).toUpperCase();

    if (nameA < nameB) {
      return order === "asc" ? -1 : 1;
    }

    if (nameA > nameB) {
      return order === "asc" ? 1 : -1;
    }

    return 0;
  });
}

function Sidebar({ onDragStart }) {
  return (
    <div className="dndnode" onDragStart={(event) => onDragStart(event, "sort")} draggable>
      Sắp xếp
    </div>
  );
}

export function SortWrapper(props) {
  return (
    <NodeContainer {...props} label="Sắp xếp">
      <SortNode />
    </NodeContainer>
  );
}

SortWrapper.Sidebar = Sidebar;
