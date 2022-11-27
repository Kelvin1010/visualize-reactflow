import React, { useRef, useState } from "react";
import { read, utils } from "xlsx";
import { Box, Button, Input, Text, useColorModeValue, VisuallyHidden } from "@chakra-ui/react";
import { convertCsvToJson } from "../../../helper/convert";
import NodeContainer from "../../node-container";


function FileData({ onCallback }) {
  const [file, setFile] = useState(null);
  const fileInput = useRef(null);
  const colorButton = useColorModeValue('black','black')


  function handleChangeInput(e) {
    var file = e.target.files[0];
    var reader = new FileReader();

    if (file.name.split(".")[1] === "onnx") {
      onCallback({ result: file });
      setFile(file);
      return;
    }

    reader.addEventListener("loadend", () => {
      if (file.type === "application/json") {
        onCallback({ output: JSON.parse(reader.result) });
        return;
      }

      if (file.type === "text/csv") {
        onCallback({ output: convertCsvToJson(reader.result) });
        return;
      }

      var wb = read(reader.result);
      var sheets = wb.SheetNames;
      if (sheets.length > 0) {
        var output = utils.sheet_to_json(wb.Sheets[sheets[0]]);
        onCallback({ output });
      }
    });

    if (file.type === "application/json" || file.type === "text/csv") {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
    setFile(file);
  }

  function handleClick() {
    fileInput.current.click();
  }

  return (
    <Box textAlign="center">
      <Button mb="4" onClick={handleClick} color={colorButton}>
        Open file dialog
      </Button>
      {file?.name && <Text>Name file: {file.name}</Text>}
      <VisuallyHidden>
        <Input ref={fileInput} type="file" onChange={handleChangeInput} />
      </VisuallyHidden>
    </Box>
  );
}

function Sidebar({ onDragStart }) {

  return (
    <div className="dndnode" onDragStart={(event) => onDragStart(event, "file")} draggable>
      Nhập File
    </div>
  );
}

export function FileDataWrapper(props) {
  return (
    <NodeContainer {...props} label="Nhập File">
      <FileData />
    </NodeContainer>
  );
}

FileDataWrapper.Sidebar = Sidebar;
