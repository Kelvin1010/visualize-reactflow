import React, { useEffect, useState } from 'react';
import Editor from "@monaco-editor/react";
import Prism from "prismjs";
import NodeContainer from '../../node-container';

function CodeNode({onCallback, id, isConnectable, ...props}) {

  const dt = `const t = j;`

  const [languageCodes, setLanguageCode] = useState('');
  const [content, setContent] = useState(props.content)

  // const handleKeyDown = (evt) => {
  //   let value = content,
  //     selStartPos = evt.currentTarget.selectionStart;

  //   console.log(evt.currentTarget);

  //   // handle 4-space indent on
  //   if (evt.key === "Tab") {
  //     value =
  //       value.substring(0, selStartPos) +
  //       "    " +
  //       value.substring(selStartPos, value.length);
  //     evt.currentTarget.selectionStart = selStartPos + 3;
  //     evt.currentTarget.selectionEnd = selStartPos + 4;
  //     evt.preventDefault();
  //     setContent(value);
  //   }
  // };

  useEffect(() => {
    Prism.highlightAll();
  }, [props.language, content]);

    return (
        <div
        >
          <div 
            style={{
              display:'flex',
              justifyContent:'space-between',
              alignItems:'center',
            }}
          >
            <p>Write your code</p>
            {/* <Select w={150} h={5} placeholder='languages' value={languageCodes} onChange={e => setLanguageCode(e.target.value)}>
              <option>javascript</option>
              <option>java</option>
              <option>python</option>
            </Select> */}
          </div>
          <div className='code-edit-container'>
            <Editor
              height="30vh"
              defaultLanguage={languageCodes}
              defaultValue="// some comment"
              onChange={(evt) => setContent(evt.target.value)}
              value={content}
            />
            {/* <pre className="code-output">
              <SyntaxHighlighter
                wrapLines={true}
                showInlineLineNumbers={true}
                language={languageCodes}
                style={docco}
                className={`language-${props.language}`}
              >
                {dt}
              </SyntaxHighlighter>
            </pre> */}
          </div>
        </div>
    )
}

function Sidebar({ onDragStart }) {
  return (
    <div className="dndnode" onDragStart={(event) => onDragStart(event, "code-node")} draggable>
      Code Node
    </div>
  );
}

export function CodeNodeWrapper(props) {
    return (
      <NodeContainer {...props} label="Code Node" isLeftHandle className="chart-container">
        <CodeNode />
      </NodeContainer>
    );
}

CodeNodeWrapper.Sidebar = Sidebar;