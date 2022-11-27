import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useColorMode } from '@chakra-ui/react'
import React from 'react'


function DarkLight() {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <div 
            className="dndnode" 
            draggable
            onClick={toggleColorMode}
        >

            {colorMode === 'light' ? (
                <>
                    <MoonIcon />&nbsp;
                    Dark
                </>
            ) : (
                <>
                    <SunIcon />&nbsp;
                    Light
                </>
            )}
        </div>
    )
}

export default DarkLight