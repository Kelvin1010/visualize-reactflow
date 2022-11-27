import { Button } from '@chakra-ui/react';
import { toPng } from 'html-to-image';
import React from 'react'

function DownloadImage(dataUrl) {
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
        }).then(DownloadImage);
    };

    return (
      <div style={{
        display:'flex',
        justifyContent:'center'
      }}>
        <button className='buttonfile' onClick={handleClickToDownLoadImage}>
          Download Image
        </button>
      </div>
    )
}

export default DownloadImageButton