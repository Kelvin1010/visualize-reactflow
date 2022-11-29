import { Box, Text, Select, Stack, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getConnectedEdges, getIncomers, useEdges, useNodes, useReactFlow } from "reactflow";
import { useRecoilValue } from "recoil";
import { atomState } from "../../../helper/atom";
import { HandleLeft } from "../../handle-left";
import NodeContainer from "../../node-container";

const initialState = {
  column1: "",
  column2: "",
};

function MergeNode({ onCallback, id, isConnectable }) {
  const { getNode } = useReactFlow();
  const allNodes = useNodes();
  const allEdges = useEdges();
  const [input, setInput] = useState(initialState);
  const [[column1, column2], setColumns] = useState([[], []]);
  const [merged, setMerged] = useState(0);
  const nodeParents = getIncomers(getNode(id), allNodes, allEdges);
  const connectedEdges = getConnectedEdges([getNode(id)], allEdges);
  const atoms = useRecoilValue(atomState);
  const atomParents = nodeParents.map((parent) => atoms.find((n) => n.id === parent.id));

  useEffect(() => {
    if (atomParents.length > 0 && connectedEdges.length > 0) {
      var edgeCol1 = connectedEdges.find((e) => e.targetHandle === "column1");
      if (edgeCol1)
        var columnsParent1 = Object.keys(atoms.find((a) => a.id === edgeCol1.source)?.data?.output?.[0] ?? {});
      var edgeCol2 = connectedEdges.find((e) => e.targetHandle === "column2");
      if (edgeCol2)
        var columnsParent2 = Object.keys(atoms.find((a) => a.id === edgeCol2.source)?.data?.output?.[0] ?? {});

      var parentData = atomParents;
      if (atomParents.length === 2) {
        parentData = atomParents[0].id === edgeCol1.source ? atomParents : [atomParents[1], atomParents[0]];
      }

      var initialInput = {
        column1: input.column1 === initialState.column1 ? columnsParent1?.[0] : input.column1,
        column2: input.column2 === initialState.column2 ? columnsParent2?.[0] : input.column2,
      };
      let { output, merged } = merge(parentData, initialInput);
      setInput(initialInput);
      setMerged(merged);
      onCallback({ output, input: initialInput });
      setColumns([columnsParent1 ?? [], columnsParent2 ?? []]);
    }

    if (atomParents.length === 0) {
      setInput(initialState);
      setColumns([[], []]);
      onCallback({ output: null, input: null });
    }
  }, [atomParents.length, connectedEdges.length, atomParents?.[0]?.data, atomParents?.[1]?.data]);

  function handleChangeInput(event) {
    var { value, name } = event.target;
    var edgeCol1 = connectedEdges.find((e) => e.targetHandle === "column1");
    var parentData = atomParents;
    if (atomParents.length === 2) {
      parentData = atomParents[0].id === edgeCol1.source ? atomParents : [atomParents[1], atomParents[0]];
    }
    var { output, merged } = merge(parentData, { ...input, [name]: value });
    setInput({ ...input, [name]: value });
    setMerged(merged);
    onCallback({ output, input: { ...input, [name]: value } });
  }

  const colorButtonMerge = useColorModeValue('black','white');

  return (
    <Stack>
      <Box position="relative">
        <Select name="column1" value={input.column1} onChange={handleChangeInput}>
          {column1.length > 0 ? (
            column1.map((value) => (
              <option key={value + "col1"} value={value} style={{ color: colorButtonMerge }} >
                {value}
              </option>
            ))
          ) : (
            <option value={""} disabled>
              ← kết nối dataset...
            </option>
          )}
        </Select>
        <HandleLeft isConnectable={isConnectable} id="column1" />
      </Box>
      <Box position="relative">
        <Select name="column2" value={input.column2} onChange={handleChangeInput}>
          {column2.length > 0 ? (
            column2.map((value) => (
              <option key={value + "col2"} value={value}>
                {value}
              </option>
            ))
          ) : (
            <option value={""} disabled>
              ← kết nối dataset...
            </option>
          )}
        </Select>
        <HandleLeft isConnectable={isConnectable} id="column2" />
      </Box>

      {(column1.length > 0 || column2.length > 0) && <Text fontSize="md">merged {merged} rows</Text>}
    </Stack>
  );
}

let setNull = (obj) => Object.keys(obj).reduce((prev, curr) => ({ ...prev, [curr]: null }), []);

function merge(input, { column1, column2 }) {
  var data1 = input[0]?.data?.output ?? [];
  var data2 = input?.[input.length === 1 ? 0 : 1]?.data?.output ?? [];
  var ids = new Set(data1.map((i1) => i1[column1]));

  return {
    output: data1?.map((i1) => ({
      ...setNull(data2?.[0] ?? []),
      ...data2.find((i2) => i2[column1] === i2[column2]),
      ...i1,
    })),
    merged: data2.filter((i2) => ids.has(i2[column2])).length,
  };
}

function Sidebar({ onDragStart }) {
  return (
    <div className="dndnode" onDragStart={(event) => onDragStart(event, "merge")} draggable>
      Hợp nhất
    </div>
  );
}

export function MergeWrapper(props) {
  return (
    <NodeContainer {...props} label="Hợp nhất">
      <MergeNode />
    </NodeContainer>
  );
}

MergeWrapper.Sidebar = Sidebar;
