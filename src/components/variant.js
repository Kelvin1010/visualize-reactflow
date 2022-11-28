import { useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { useRecoilState } from 'recoil'
import { variantState } from '../helper/variant/atom'

function Variant() {

    const [variant, setVariant] = useRecoilState(variantState)
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
            }} className='select-button' onChange={(e) => setVariant(e.target.value)}>
                <option>Types background</option>
                <option value={'dots'}>Dots</option>
                <option value={'lines'}>Lines</option>
                <option value={'cross'}>Cross</option>
            </select>
        </div>
    )
}

export default Variant