import { CloseIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';
import React from 'react'
import { Handle, useReactFlow } from 'reactflow';
import { useRecoilValue } from 'recoil';
import { file } from '../helper/autodraw/stateRecoil';

function GroupContainer({data,isConnectable,id}) {
    const filehere = useRecoilValue(file);
    const reactFlowInstance = useReactFlow();
  
    const getNodeIdandDeleteNode = (e) => {
        reactFlowInstance.setNodes((nds) =>nds.filter((nd) => !!nd.id && !nd.selected))
    }
  
    const takeTypeNode = [...filehere?.map((item) => item?.op_type)]
    const unique = takeTypeNode.filter((v, i, a) => a.indexOf(v) === i);
  
    return (
      <div>
        <Handle
            type='target'
            position='top'
            className='inputHandle'
            isConnectable={isConnectable}
            onConnect={(params) => console.log('handle Connect', params)}
        />
        <>
            <Box color={'white'} maxW={'sm'} borderWidth='1px' borderRadius={'lg'}>
                <CloseIcon onClick={getNodeIdandDeleteNode}/>
                <Box p='6'>
                <p color='white'>{data.label}</p>
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
    </div>
    )
}

export default GroupContainer