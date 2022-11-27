import React, { useState } from 'react'
import NodeContainer from '../../node-container';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import styled from 'styled-components';

const UploadStyled = styled(Upload)`
  .ant-upload{
    color: 'red';
  }
`

function ImageNode() {

  const [fileList, setFileList] = useState([]);


  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  
  return (
    <div>
      <ImgCrop rotate >
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
          className='img-upload'
        >
          {fileList.length < 5 && '+ Upload'}
        </Upload>
      </ImgCrop>
    </div>
  )
}

export default ImageNode


function Sidebar({ onDragStart }) {
    return (
      <div className="dndnode" onDragStart={(event) => onDragStart(event, "image-node")} draggable>
        Image Node
      </div>
    );
}
  
export function ImageNodeWrapper(props) {
    return (
        <NodeContainer {...props} label="Image Node" isLeftHandle>
          <ImageNode />
        </NodeContainer>
    );
}

ImageNodeWrapper.Sidebar = Sidebar;