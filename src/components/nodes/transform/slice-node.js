import {
  Box,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getIncomers, useEdges, useNodes, useReactFlow } from "reactflow";
import { useRecoilValue } from "recoil";
import { atomState } from "../../../helper/atom";
import NodeContainer from "../../node-container";

function SliceNode({ onCallback, id }) {
  const { getNode } = useReactFlow();
  const [fromIndex, setFromIndex] = useState(null);
  const [toIndex, setToIndex] = useState(null);
  const allNodes = useNodes();
  const allEdges = useEdges();
  const nodeParent = getIncomers(getNode(id), allNodes, allEdges)[0];
  const atoms = useRecoilValue(atomState);
  const atomParent = atoms.find((n) => n.id === nodeParent?.id);

  useEffect(() => {
    if (atomParent?.data) {
      var from = fromIndex === null ? 0 : fromIndex;
      var to = toIndex === null ? atomParent.data?.output?.length : toIndex;
      var output = slice(atomParent.data?.output, from, to);
      setFromIndex(from);
      setToIndex(to);
      onCallback({ output, input: { fromIndex: from, toIndex: to } });
    }

    if (!atomParent) {
      setFromIndex(null);
      setToIndex(null);
      onCallback({ output: null, input: null });
    }
  }, [atomParent?.data]);

  function handleFromIndexChange(from) {
    var output = slice(atomParent.data.output, from, toIndex);
    setFromIndex(from);
    onCallback({ output, input: { toIndex, fromIndex: from } });
  }

  function handleToIndex(to) {
    var output = slice(atomParent.data.output, fromIndex, to);
    setToIndex(to);
    onCallback({ output, input: { fromIndex, toIndex: to } });
  }

  return (
    <Box>
      {fromIndex === null && toIndex === null ? (
        <Box position="relative">
          <div>← kết nối dataset...</div>
        </Box>
      ) : (
        <Stack>
          <FormControl>
            <FormLabel>From Index:</FormLabel>
            <NumberInput value={fromIndex} onChange={handleFromIndexChange}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>To Index:</FormLabel>
            <NumberInput value={toIndex} onChange={handleToIndex}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </Stack>
      )}
    </Box>
  );
}

function slice(input, from, to) {
  if (!Array.isArray(input)) {
    return [];
  }
  return input?.slice(from, to);
}

function Sidebar({ onDragStart }) {
  return (
    <div className="dndnode" onDragStart={(event) => onDragStart(event, "slice")} draggable>
      Tách dữ liệu
    </div>
  );
}

export function SliceWrapper(props) {
  return (
    <NodeContainer {...props} label="Tách dữ liệu" isLeftHandle>
      <SliceNode />
    </NodeContainer>
  );
}

SliceWrapper.Sidebar = Sidebar;
