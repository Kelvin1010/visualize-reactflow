import { Box, FormControl, FormLabel, Input, Select, Stack, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import { getIncomers, useEdges, useNodes, useReactFlow } from "reactflow";
import { useRecoilValue } from "recoil";
import { atomState } from "../../../helper/atom";
import { HandleLeft } from "../../handle-left";
import NodeContainer from "../../node-container";

const initialState = {
  column: "",
  conditionId: "",
  conditionValue: "",
};

function FilterNode({ onCallback, id, isConnectable }) {
  const { getNode } = useReactFlow();
  const allNodes = useNodes();
  const allEdges = useEdges();
  const [input, setInput] = useState(initialState);
  const [columns, setColumns] = useState([]);
  const nodeParent = getIncomers(getNode(id), allNodes, allEdges)[0];
  const atoms = useRecoilValue(atomState);
  const atomParent = atoms.find((n) => n.id === nodeParent?.id);

  useDebounce(
    () => {
      if (input.column.length && input.conditionId) {
        var output = filter(atomParent.data.output, input);
        onCallback({ output, input });
      }
    },
    800,
    [input],
  );

  useEffect(() => {
    if (atomParent?.data) {
      var columnsParent = Object.keys(atomParent.data?.output?.[0] ?? {});
      var initialInput = {
        column: input.column === initialState.column ? columnsParent[0] : input.column,
        conditionId: input.conditionId === initialState.conditionId ? "" : input.conditionId,
        conditionValue: input.conditionValue === initialState.conditionValue ? "" : input.conditionValue,
      };
      var output = filter(atomParent.data.output, initialInput);
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
    setInput({ ...input, [name]: value });
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
      {columns.length > 0 && (
        <FormControl>
          <FormLabel>Condition:</FormLabel>
          <Select name="conditionId" value={input.conditionId} onChange={handleChangeInput} pb="2">
            <option value="" style={{ color: colorOption }}>select condition</option>
            <option value="5" style={{ color: colorOption }}>text is exactly</option>
            <option value="6" style={{ color: colorOption }}>text is not exactly</option>
            <option value="7" style={{ color: colorOption }}>text includes</option>
            <option value="8" style={{ color: colorOption }}>text does not includes</option>
            <option value="notnull" style={{ color: colorOption }}>data is not empty or null</option>
            <option value="regex" style={{ color: colorOption }}>data matches regex</option>
          </Select>
          {input.conditionId && (
            <Input name="conditionValue" value={input.conditionValue} onChange={handleChangeInput} />
          )}
        </FormControl>
      )}
    </Stack>
  );
}

function filter(input, { column, conditionId, conditionValue }) {
  if (!Array.isArray(input)) {
    return [];
  }

  switch (conditionId) {
    case "5":
      var condition = (value) => value === conditionValue;
      break;
    case "6":
      condition = (value) => value !== conditionValue;
      break;
    case "7":
      condition = (value) => value.includes(conditionValue);
      break;
    case "8":
      condition = (value) => !value.includes(conditionValue);
      break;
    case "notnull":
      condition = (value) => value !== null || value !== [];
      break;
    case "regex":
      condition = (value) => new RegExp(conditionValue).test(value);
      break;
    default:
      condition = () => true;
      break;
  }

  return input.filter((i) => condition(String(i[column])));
}

function Sidebar({ onDragStart }) {
  return (
    <div className="dndnode" onDragStart={(event) => onDragStart(event, "filter")} draggable>
      Lọc
    </div>
  );
}

export function FilterWrapper(props) {
  return (
    <NodeContainer {...props} label="Lọc">
      <FilterNode />
    </NodeContainer>
  );
}

FilterWrapper.Sidebar = Sidebar;
