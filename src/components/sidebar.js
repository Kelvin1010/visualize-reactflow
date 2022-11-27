import { AreaChartOutlined, BarChartOutlined, DotChartOutlined, LineChartOutlined, PieChartOutlined, BorderInnerOutlined } from '@ant-design/icons';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, useColorMode, useColorModeValue } from '@chakra-ui/react';
import DarkLight from './dark-light';
import DownloadImageButton from './download-image';
import { 
  AreaBasicChartWrapper,
  AreaStackedChartWrapper,
  BarGroupChartWrapper,
  BarStackedChartWrapper,
  BarWrapper,
  Bubble3dChartWrapper,
  BubblePlotChartWrapper,
  CodeNodeWrapper, 
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
  ScatterPlotChartWrapper, 
  SliceWrapper, 
  SortWrapper, 
  StatsWrapper, 
  StepLineChartWrapper, 
  TextNodeWrapper, 
  TreeMapsChartWrapper
} from "./nodes";
import ReadFile from "./read-files/ReadFile";

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
                <DownloadImageButton />
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
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        <DotChartOutlined /> Scatter and Bubble
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
                        <BorderInnerOutlined /> Heatmap
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
                        <BorderInnerOutlined /> Advanced Plots
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
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
                            <BorderInnerOutlined /> Radar
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel>
                        hhhh
                      </AccordionPanel>
                    </AccordionItem>
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