import { ViewIcon } from '@chakra-ui/icons'
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { JsonPrettyViewer } from 'react-json-friendly-viewer';
import 'react-json-friendly-viewer/style.css';


function ModalNodes({data,...props}) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [query, setQuery] = useState("");

    const keys = Object.keys(data?.output?.[0] || {})
    const iconButtonModal = useColorModeValue('black','white')
    const iconModalColor = useColorModeValue('white','black')

    return (
        <>
            <Button onClick={onOpen} _hover={false} backgroundColor={iconButtonModal}><ViewIcon color={iconModalColor} /></Button>

            <Modal 
                scrollBehavior={'inside'}
                closeOnOverlayClick={false} 
                isOpen={isOpen} 
                size='6xl'
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Data Node</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    {/* <input 
                        type={'text'} 
                        placeholder="Search..." 
                        className='search' 
                        onChange={(e) => setQuery(e.target.value)} 
                    /> */}
                    <JsonPrettyViewer 
                        style={{
                            color: iconModalColor
                        }}
                        json={data?.output || data || null} 
                        
                    />
                </ModalBody>

                <ModalFooter>
                    {/* <Button colorScheme='blue' mr={3}>
                    Save
                    </Button> */}
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalNodes