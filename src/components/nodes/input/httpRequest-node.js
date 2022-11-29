import React, { useState } from "react";
import { Button, FormControl, FormErrorMessage, FormLabel, Input, useColorModeValue } from "@chakra-ui/react";
import axios from "axios";
import { convertCsvToJson } from "../../../helper/convert";
import NodeContainer from "../../node-container";

function HttpRequest({ onCallback }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError(false);
    try {
      var res = await axios.get(url, { responseType: "blob" });
      if (!res.data) {
        return;
      }
      var reader = new FileReader();
      reader.addEventListener("loadend", () => {
        if (res.data.type === "application/json") {
          onCallback({ output: JSON.parse(reader.result) });
        }

        if (res.data.type === "text/csv") {
          onCallback({ output: convertCsvToJson(reader.result) });
        }
      });
      reader.readAsBinaryString(res.data);
    } catch (e) {
      console.error(e);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  function handleChangeUrl(event) {
    setUrl(event.target.value);
    if (error) {
      setError(false);
    }
  }

  const colorbuttonhttp = useColorModeValue('black','black')

  return (
    <form onSubmit={handleSubmit}>
      <FormControl isInvalid={error}>
        <FormLabel htmlFor="url">URL:</FormLabel>
        <Input id="url" value={url} onChange={handleChangeUrl} />
        <FormErrorMessage>{error && "Please check your url again."}</FormErrorMessage>
      </FormControl>
      <Button mt="4" type="submit" isLoading={loading} color={colorbuttonhttp}>
        Load Data
      </Button>
    </form>
  );
}

function Sidebar({ onDragStart }) {
  return (
    <div className="dndnode" onDragStart={(event) => onDragStart(event, "http")} draggable>
      HTTP Request
    </div>
  );
}

export function HttpRequestWrapper(props) {
  return (
    <NodeContainer {...props} label="HTTP Request">
      <HttpRequest />
    </NodeContainer>
  );
}

HttpRequestWrapper.Sidebar = Sidebar;
