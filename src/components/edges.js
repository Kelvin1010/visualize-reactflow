import { useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { useRecoilState } from 'recoil'
import { edgeState } from '../helper/edges/atom';


function Edges() {
    const [edge, setEdge] = useRecoilState(edgeState);
    const bgbuttonVa = useColorModeValue('white','black')
    
    return (
        <div
            style={{
                display:'flex',
                justifyContent:'center'
            }}
        >
            <select style={{
                backgroundColor: bgbuttonVa,
                textAlign:'center'
            }} className='select-button' onChange={(e) => setEdge(e.target.value)}>
                <option>Types Edges</option>
                <option value={'getBezierPath'}>Bezier Path</option>
                <option value={'getSimpleBezierPath'}>Simple Bezier Path</option>
                <option value={'getSmoothStepPath'}>Smooth Step Path</option>
                <option value={'getStraightPath'}>Straight Path</option>
            </select>
        </div>
    )
}

export default Edges