import { UploadOutlined } from '@ant-design/icons';
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { read, utils } from 'xlsx';
import { fileState } from '../../helper/autodraw/atom';

function ReadFile() {
    const [data,setData] = useRecoilState(fileState);
    const [file,setFile] = useState({});
    const [error, setError] = useState('');

    const fileUploadButton = () => {
        document.getElementById('fileButton').click();
        document.getElementById('fileButton').onchange = () =>{      
            setFile({fileUploadState:document.getElementById('fileButton').value});
        }
    }

    const handleOpenFile = (e) => {
        const files = e.target.files;

        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    setData(rows)
                }
            }
            reader.readAsArrayBuffer(file);
        }else{
            setError("Can't read this file")
        }
    }

    return (
        <>
            <div 
                className="dndnode" 
                draggable
                onClick={fileUploadButton}
            >
                <UploadOutlined />&nbsp;
                Open File [CSV, XLXS]
                <input 
                    id="fileButton" 
                    type="file" 
                    onChange={handleOpenFile}
                    hidden 
                    name={'file'}
                />
            </div>
            <span>{error}</span>
        </>
    )
}

export default ReadFile