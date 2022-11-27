import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './style/style.css';
import 'reactflow/dist/style.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { ReactFlowProvider } from 'reactflow/dist/esm';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './theme/themeChakra';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <ReactFlowProvider>
          <ChakraProvider>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
              <App />
          </ChakraProvider>
        </ReactFlowProvider>
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();