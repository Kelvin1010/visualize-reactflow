import { DownloadOutlined } from '@ant-design/icons';
import { useColorModeValue } from '@chakra-ui/react';
import { toPng } from 'html-to-image';
import React from 'react'

function DownloadImagePNG(dataUrl) {
    const a = document.createElement('a');

    a.setAttribute('download', 'reactflow.png');
    a.setAttribute('href', dataUrl);
    a.click();
}

function DownloadImageButton() {

    const handleClickToDownLoadImage = () => {
        toPng(document.querySelector('.react-flow'), {
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
        }).then(DownloadImagePNG);
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
        Image Png
      </div>
    )
}

export default DownloadImageButton