import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './style/style.css';
import 'reactflow/dist/style.css';
import App from './App';
import { RecoilRoot } from 'recoil';
import { ReactFlowProvider } from 'reactflow/dist/esm';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <ReactFlowProvider>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </ReactFlowProvider>
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>
);

