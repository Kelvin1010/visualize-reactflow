import { InfoIcon } from '@chakra-ui/icons'
import { Box, Button, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { infoNode } from '../helper/info-node/stateRecoil'

function InfoNode() {

    const infoNodeValue = useRecoilValue(infoNode)

    const iconButtonInfo = useColorModeValue('black','white')
    const iconInfoColor = useColorModeValue('white','black')
    const bgInfo = useColorModeValue('black', 'white');
    const textInfo = useColorModeValue('white','black')

    return (
        <>
            <Popover placement='top-start'>
                <PopoverTrigger>
                    <Button _hover={false} backgroundColor={iconButtonInfo}><InfoIcon color={iconInfoColor}/></Button>
                </PopoverTrigger>
                <PopoverContent backgroundColor={bgInfo}>
                    <PopoverHeader fontWeight='semibold'>Position Node</PopoverHeader>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody backgroundColor={bgInfo} color={textInfo}>
                    <Box>
                        <span color={'blue'}>Id:&nbsp;{infoNodeValue?.id}</span>
                        <p>x:&nbsp;{infoNodeValue?.position?.x}</p>
                        <p>y:&nbsp;{infoNodeValue?.position?.y}</p>
                    </Box>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </>
    )
}

export default InfoNode