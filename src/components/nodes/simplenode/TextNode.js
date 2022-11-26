import React, { useState } from 'react'
import NodeContainer from '../../node-container';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function TextNode() {

  const [editorState, setEditorState] = useState('');

  return (
    <div>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={setEditorState}
      />;
    </div>
  )
}

export default TextNode


function Sidebar({ onDragStart }) {
    return (
      <div className="dndnode" onDragStart={(event) => onDragStart(event, "text-node")} draggable>
        Text Node
      </div>
    );
}
  
export function TextNodeWrapper(props) {
    return (
        <NodeContainer {...props} label="Text Node" isLeftHandle className="chart-container text-editor">
          <TextNode />
        </NodeContainer>
    );
}
TextNodeWrapper.Sidebar = Sidebar;