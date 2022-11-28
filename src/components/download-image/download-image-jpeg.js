import React from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { useColorModeValue } from '@chakra-ui/react';
import { toJpeg } from 'html-to-image';

function DownloadImageJpeg(dataUrl) {
    const a = document.createElement('a');

    a.setAttribute('download', 'reactflow.jpeg');
    a.setAttribute('href', dataUrl);
    a.click();
}

function DownloadImageJpegButton() {

    const handleClickToDownLoadImage = () => {
        toJpeg(document.querySelector('.react-flow'), {
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
        }).then(DownloadImageJpeg);
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
        Image Jpeg
      </div>
    )
}

export default DownloadImageJpegButton