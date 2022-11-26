import { Box } from '@chakra-ui/react';
import React from 'react';
import { Handle, useReactFlow } from 'reactflow';
import { useRecoilValue } from 'recoil';
import { file } from '../helper/autodraw/stateRecoil';
import { CloseIcon } from '@chakra-ui/icons';

const customColorBackground = [
    'navy',
    'yellow',
    'green',
    'blue',
    'teal',
    'red',
    'blueviolet',
    'brown',
    'cornflowerblue',
    'darkcyan',
    'darkgrey',
    'indigo',
    'indianred'
]

function NodeAutodrawContainer({data,isConnectable,id}) {

    const filehere = useRecoilValue(file);
    const reactFlowInstance = useReactFlow();

    const getNodeIdandDeleteNode = (e) => {
        reactFlowInstance.setNodes((nds) =>nds.filter((nd) => !!nd.id && !nd.selected))
    }

    const takeTypeNode = [...filehere?.map((item) => item?.op_type)]
    const unique = takeTypeNode.filter((v, i, a) => a.indexOf(v) === i);

    const nodes = {}
    unique.forEach(function generate(value, index) {
        nodes[value]  = customColorBackground[index]
    })

    const bg = () => {
        return nodes[data?.typenode]
    }

    return (
        <>
            <Handle
                type='target'
                position='top'
                className='inputHandle'
                isConnectable={isConnectable}
                onConnect={(params) => console.log('handle Connect', params)}
            />
            <>
                <Box color={'white'} bg={bg} maxW={'sm'} borderWidth='1px' borderRadius={'lg'} padding={'5px'}>
                    <div 
                        style={{
                            display:'flex',
                            justifyContent:'space-between',
                            alignItems:'center',
                            backgroundColor:'black',
                            borderRadius:'3px',
                            padding:'3px'
                        }}
                    >
                        <p>{data.label}</p>
                        <CloseIcon onClick={getNodeIdandDeleteNode}/>
                    </div>
                    <Box p='6' backgroundColor={'gray'} padding={'3px'} borderRadius={'3px'} marginTop={'10px'}>
                    <p className='textContent-data'>This is Input: {data.input}</p>
                    </Box>
                    <Box p='6' backgroundColor={'gray'} padding={'3px'} borderRadius={'3px'} marginTop={'3px'}>
                    <p className='textContent-data'>This is Output: {data.output}</p>
                    </Box>
                </Box>
            </>
            <Handle
                type='source'
                position='bottom'
                className='outputHandle'
                isConnectable={isConnectable}
                onConnect={(params) => console.log('handle Connect', params)}
            />
        </>
    )
}

export default NodeAutodrawContainer