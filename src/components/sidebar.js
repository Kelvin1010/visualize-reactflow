import { AreaChartOutlined, BarChartOutlined, DotChartOutlined, LineChartOutlined, PieChartOutlined, BorderInnerOutlined, HeatMapOutlined, RadarChartOutlined } from '@ant-design/icons';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, useColorModeValue } from '@chakra-ui/react';
import DarkLight from './dark-light';
import DownloadImageButton from './download-image/download-image';
import DownloadImageJpegButton from './download-image/download-image-jpeg';
import DownloadImageSvgButton from './download-image/download-image-svg';
import Edges from './edges';
import { 
  AreaBasicChartWrapper,
  AreaStackedChartWrapper,
  BarGroupChartWrapper,
  BarStackedChartWrapper,
  BarWrapper,
  BasicLineChartWrapper,
  Bubble3dChartWrapper,
  BubblePlotChartWrapper,
  CodeNodeWrapper, 
  ColumnBasicChartWrapper, 
  ColumnBasicSliderChartWrapper, 
  ColumnGroupChartWrapper, 
  ColumnStackedChartWrapper, 
  ExampleDataWrapped, 
  ExportDataWrapper, 
  FileDataWrapper, 
  FilterWrapper, 
  GroupWrapper, 
  HeatmapShapezieChartWrapper, 
  HttpRequestWrapper, 
  ImageNodeWrapper, 
  MergeWrapper, 
  MultipleLinePlotAnimationWrapper, 
  PasteDataWrapper, 
  PercentBarChartWrapper, 
  PercentColumnChartWrapper, 
  PieChartWrapper, 
  PieDarkThemeChartWrapper, 
  RadarBasicChartWrapper, 
  RoseBasicChartWrapper, 
  RoseGroupChartWrapper, 
  RoseStackedChartWrapper, 
  ScatterPlotChartWrapper, 
  SliceWrapper, 
  SortWrapper, 
  StatsWrapper, 
  StepLineChartWrapper, 
  TextNodeWrapper, 
  TreeMapsChartWrapper
} from "./nodes";
import ReadFile from "./read-files/ReadFile";
import Variant from './variant';

function Sidebar() {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    const background = useColorModeValue('white', 'black');

      return (
        <aside
          style={{
            backgroundColor: background
          }}
        >
          <Accordion defaultIndex={[0, 1, 2]} allowToggle allowMultiple>
            <AccordionItem border="none">
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Tools
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <DarkLight />
                <Edges />
                <Variant />
                <AccordionItem border="none">
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        Download Images
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <DownloadImageButton />
                    <DownloadImageJpegButton />
                    <DownloadImageSvgButton />
                  </AccordionPanel>
                </AccordionItem>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem border="none">
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Open File To Draw
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <ReadFile />
              </AccordionPanel>
            </AccordionItem>
          <AccordionItem border="none">
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Simple Node
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <CodeNodeWrapper.Sidebar onDragStart={onDragStart} />
                <TextNodeWrapper.Sidebar onDragStart={onDragStart} />
                <ImageNodeWrapper.Sidebar onDragStart={onDragStart}/>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem border="none">
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Input
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <FileDataWrapper.Sidebar onDragStart={onDragStart} />
                <PasteDataWrapper.Sidebar onDragStart={onDragStart} />
                <HttpRequestWrapper.Sidebar onDragStart={onDragStart} />
                <ExampleDataWrapped.Sidebar onDragStart={onDragStart} />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Transform
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <SliceWrapper.Sidebar onDragStart={onDragStart} />
                <FilterWrapper.Sidebar onDragStart={onDragStart} />
                <MergeWrapper.Sidebar onDragStart={onDragStart} />
                <SortWrapper.Sidebar onDragStart={onDragStart} />
                <GroupWrapper.Sidebar onDragStart={onDragStart} />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Visualization
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        <AreaChartOutlined /> Area
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <AreaBasicChartWrapper.Sidebar onDragStart={onDragStart} />
                    <AreaStackedChartWrapper.Sidebar onDragStart={onDragStart} />
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        <LineChartOutlined /> Line
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <BasicLineChartWrapper.Sidebar onDragStart={onDragStart} />
                    <MultipleLinePlotAnimationWrapper.Sidebar onDragStart={onDragStart} />
                    <StepLineChartWrapper.Sidebar onDragStart={onDragStart} />
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        <BarChartOutlined /> Column
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <ColumnBasicChartWrapper.Sidebar onDragStart={onDragStart} />
                    <ColumnBasicSliderChartWrapper.Sidebar onDragStart={onDragStart} />
                    <ColumnStackedChartWrapper.Sidebar onDragStart={onDragStart} />
                    <ColumnGroupChartWrapper.Sidebar onDragStart={onDragStart} />
                    <PercentColumnChartWrapper.Sidebar onDragStart={onDragStart} />
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        <BarChartOutlined /> Bar
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <BarWrapper.Sidebar onDragStart={onDragStart} />
                    <BarStackedChartWrapper.Sidebar onDragStart={onDragStart} />
                    <BarGroupChartWrapper.Sidebar onDragStart={onDragStart} />
                    <PercentBarChartWrapper.Sidebar onDragStart={onDragStart} />
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        <PieChartOutlined /> Pie
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <PieChartWrapper.Sidebar onDragStart={onDragStart} />
                    <PieDarkThemeChartWrapper.Sidebar onDragStart={onDragStart} />
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        <PieChartOutlined /> Rose
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <RoseBasicChartWrapper.Sidebar onDragStart={onDragStart} />
                    <RoseGroupChartWrapper.Sidebar onDragStart={onDragStart} />
                    <RoseStackedChartWrapper.Sidebar onDragStart={onDragStart} />
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        <DotChartOutlined /> Dots
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          <DotChartOutlined /> Scatter
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel>
                      <ScatterPlotChartWrapper.Sidebar onDragStart={onDragStart} />
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          <DotChartOutlined /> Bubble
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel>
                      <BubblePlotChartWrapper.Sidebar onDragStart={onDragStart} />
                      <Bubble3dChartWrapper.Sidebar onDragStart={onDragStart} />
                    </AccordionPanel>
                  </AccordionItem>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        <HeatMapOutlined /> Heatmap
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <HeatmapShapezieChartWrapper.Sidebar onDragStart={onDragStart} />
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        <RadarChartOutlined /> Radar
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <RadarBasicChartWrapper.Sidebar onDragStart={onDragStart} />
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        <BorderInnerOutlined /> Tree maps
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <TreeMapsChartWrapper.Sidebar onDragStart={onDragStart} />
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        Others
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    hhhhgfg
                  </AccordionPanel>
                </AccordionItem>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Misc
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <ExportDataWrapper.Sidebar onDragStart={onDragStart} />
                <StatsWrapper.Sidebar onDragStart={onDragStart} />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </aside>
    );
}

export default Sidebar