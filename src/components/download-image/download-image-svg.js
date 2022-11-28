import React from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { useColorModeValue } from '@chakra-ui/react';
import { toSvg } from 'html-to-image';

function DownloadImageSvg(dataUrl) {
    const a = document.createElement('a');

    a.setAttribute('download', 'reactflow.svg');
    a.setAttribute('href', dataUrl);
    a.click();
}

function DownloadImageSvgButton() {

    const handleClickToDownLoadImage = () => {
        toSvg(document.querySelector('.react-flow'), {
          filter: (node) => {
            // we don't want to add the minimap and the controls to the image
            if (
              node?.classList?.contains('react-flow__minimap') ||
              node?.classList?.contains('react-flow__controls')
            ) {
              return false;
            }
    
            return true;
          },
        }).then(DownloadImageSvg);
    };

    const bg = useColorModeValue('white','black');
    const text = useColorModeValue('black','white');
    const border = useColorModeValue('black','white')
    return (
      <div 
        style={{
          backgroundColor:bg,
          color: text,
          border: border
        }} 
        className="dndnode" 
        draggable
        onClick={handleClickToDownLoadImage}
      >
        <DownloadOutlined />&nbsp;
        Image Svg
      </div>
    )
}

export default DownloadImageSvgButton