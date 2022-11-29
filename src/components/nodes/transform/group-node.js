import { Box, FormControl, FormLabel, Select, Stack, useColorModeValue } from "@chakra-ui/react";
import { groups as groupTransfrom } from "d3-array";
import { useEffect, useState } from "react";
import { getIncomers, useEdges, useNodes, useReactFlow } from "reactflow";
import { useRecoilValue } from "recoil";
import { atomState } from "../../../helper/atom";
import { HandleLeft } from "../../handle-left";
import NodeContainer from "../../node-container";

const initialState = {
  column: "",
};

function GroupNode({ onCallback, id, isConnectable }) {
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
      };
      var output = group(atomParent.data.output, initialInput);
      setInput(initialInput);
      onCallback({ output, input: initialInput });
      setColumns(columnsParent);
    }

    if (!atomParent) {
      setInput(initialState);
      setColumns([]);
      onCallback({ output: null, input: null });
    }
  }, [atomParent?.data]);

  function handleChangeInput(event) {
    var { value, name } = event.target;
    var output = group(atomParent.data.output, { ...input, [name]: value });
    setInput({ ...input, [name]: value });
    onCallback({ output, input });
  }

  const colorOption = useColorModeValue('black','white')

  return (
    <Stack>
      <FormControl>
        <FormLabel>Column name:</FormLabel>
        <Box position="relative">
          <Select name="column" value={input.column} onChange={handleChangeInput}>
            {columns.length > 0 ? (
              columns.map((value) => (
                <option key={value} value={value} style={{ color: colorOption }}>
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
    </Stack>
  );
}

function group(input, { column }) {
  return groupTransfrom(input, (input) => input[column]);
}

function Sidebar({ onDragStart }) {
  return (
    <div className="dndnode" onDragStart={(event) => onDragStart(event, "group-node")} draggable>
      Nhóm
    </div>
  );
}

export function GroupWrapper(props) {
  return (
    <NodeContainer {...props} label="Nhóm">
      <GroupNode />
    </NodeContainer>
  );
}

GroupWrapper.Sidebar = Sidebar;
