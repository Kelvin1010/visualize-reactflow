import { Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import NodeContainer from "../../node-container";
import sex from '../../../data/sex.json';
import countries_indicators from "../../../data/countries_indicators.json";
import ufo_signhtings from "../../../data/ufo-signhtings.json";
import continents from '../../../data/continents.json';
import gdp from '../../../data/gdp.json';
import city from '../../../data/city.json';
import city2 from '../../../data/city2.json';
import databubble from '../../../data/data-bubble.json';
import culinary from '../../../data/culinary.json';
import radar from '../../../data/radar.json';

function ExampleData({ onCallback, data }) {
  const [option, setOption] = useState("");

  useEffect(() => {
    var value = data?.input?.option ?? "countries_indicators";
    (async function () {
      const output = await fakeApi(value);
      setOption(value);
      onCallback({ output, input: { option: value } });
    })();
  }, []);

  async function handleChange(event) {
    const value = event.target.value;
    const output = await fakeApi(value);
    setOption(value);
    onCallback({ output, input: { option: value } });
  }
  
  return (
    <>
      <Select value={option} onChange={handleChange}>
        <option value="countries_indicators">Countries Indicator</option>
        <option value="culinary">Culinary</option>
        <option value="radar">Radar</option>
        <option value="data-bubble">Data Bubble</option>
        <option value="sex">Sex</option>
        <option value="city">Citys</option>
        <option value="city2">2 City</option>
        <option value="ufo_signhtings">UFO Sightings</option>
        <option value="continents">Continents</option>
        <option value="gdp">GDP</option>
      </Select>
    </>
  );
}

async function fakeApi(option) {
  switch (option) {
    case "countries_indicators":
      return countries_indicators;
    case "ufo_signhtings":
      return ufo_signhtings;
    case "continents":
      return continents;
    case "gdp":
      return gdp;
    case "city":
      return city;
    case "city2":
      return city2;
    case "data-bubble":
      return databubble
    case "culinary":
      return culinary
    case "sex":
      return sex
    case "radar":
      return radar
    default:
      return [];
  }
}

function Sidebar({ onDragStart }) {
  return (
    <div className="dndnode" onDragStart={(event) => onDragStart(event, "example-data")} draggable>
      Dữ liệu mẫu
    </div>
  );
}

export function ExampleDataWrapper(props) {

  return (
    <NodeContainer {...props} label="Dữ liệu mẫu">
      <ExampleData />
    </NodeContainer>
  );
}

ExampleDataWrapper.Sidebar = Sidebar;
