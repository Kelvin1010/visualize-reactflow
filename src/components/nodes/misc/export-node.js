import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { Button, Stack, useColorModeValue} from "@chakra-ui/react";
import { useDebounce } from "react-use";
import { useRecoilValue } from "recoil";
import { getIncomers, useEdges, useNodes, useReactFlow } from "reactflow";
import { atomState } from "../../../helper/atom";
import NodeContainer from "../../node-container";

const initialState = {};

function ExportData({ onCallback, id, isConnectable }) {
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
      if (input.column?.length && input.conditionId) {
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

  function randomString(len, charSet) {
    charSet = charSet || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var randomString = "";
    for (var i = 0; i < len; i++) {
      var randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
  }

  const fileNameCsv = `your-file-${randomString(
    10,
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  )}.csv`;

  const handleExportDataToJson = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(atomParent?.data))}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `data_${randomString(10, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789")}.json`;
    link.click();
  };
  const dataDown = [];
  dataDown.push(atomParent?.data);
  const DataCsv = dataDown[0]?.output;

  const colorbuttonExport = useColorModeValue('black', 'black');

  return (
    <Stack>
      <CSVLink filename={fileNameCsv} data={DataCsv || []}>
        <Button width={"100%"} color={colorbuttonExport}>Download csv</Button>
      </CSVLink>
      <Button onClick={handleExportDataToJson} color={colorbuttonExport}>Download json</Button>
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
    <div className="dndnode" onDragStart={(event) => onDragStart(event, "export")} draggable>
      Xuất file
    </div>
  );
}

export function ExportDataWrapper(props) {
  return (
    <NodeContainer {...props} label="Xuất file" isLeftHandle>
      <ExportData />
    </NodeContainer>
  );
}

ExportDataWrapper.Sidebar = Sidebar;
