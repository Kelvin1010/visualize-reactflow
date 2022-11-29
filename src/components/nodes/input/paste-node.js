import React, { useState } from "react";
import { FormControl, FormLabel, Select, Stack, Textarea, useColorModeValue } from "@chakra-ui/react";
import { convertCsvToJson } from "../../../helper/convert";
import NodeContainer from "../../node-container";

const selectPaste = ["JSON", "CSV"];

function PasteData({ onCallback }) {
  const [dataType, setDataType] = useState("JSON");
  const [error, setError] = useState(false);

  function handleChangeDataType(event) {
    setDataType(event.target.value);
  }

  function handleChangeTextarea(event) {
    const { value } = event.target;
    setError(false);
    try {
      if (dataType === "JSON") {
        onCallback({ output: JSON.parse(value) });
        return;
      }

      if (dataType === "CSV") {
        onCallback({ output: convertCsvToJson(value) });
        return;
      }
    } catch (e) {
      setError(true);
    }
  }

  const colorButton = useColorModeValue('black', 'white')

  return (
    <Stack>
      <FormControl>
        <FormLabel>Data type</FormLabel>
        <Select onChange={handleChangeDataType} value={dataType}>
          {selectPaste.map((value) => (
            <option key={value} value={value} style={{
              color: colorButton
            }}>
              {value}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl isInvalid={error}>
        <Textarea onChange={handleChangeTextarea} />
      </FormControl>
    </Stack>
  );
}

function Sidebar({ onDragStart }) {
  return (
    <div className="dndnode" onDragStart={(event) => onDragStart(event, "paste")} draggable>
      Dán
    </div>
  );
}

export function PasteDataWrapper(props) {
  return (
    <NodeContainer {...props} label="Dán">
      <PasteData />
    </NodeContainer>
  );
}

PasteDataWrapper.Sidebar = Sidebar;
