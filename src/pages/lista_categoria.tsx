import { Heading, Flex, Button, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';


const lista_categoria: NextPage = () => {

    const MenuHeadStyle ={
        boxSizing: 'border-box', 
        borderBottom: '1px solid', 
        width: '360px', 
        height: '60px',
        borderColor: '#777777'
    }

    return(
        <>
        <div Background-color='#E5E5E5' style = {{margin: '55px'}}>
            <Flex 
                align="center" 
                justify="center" 
                style = {MenuHeadStyle}>
                <Heading width={210} height={51} margin = '0 auto' size='xl' textAlign='center'>
                    Schedula
                </Heading>
            </Flex>

            <Stack spacing={4} direction='column' align='center' width={360}>
                <Button colorScheme='orange' size='sm' w={360}>
                    Dashbord
                </Button>
                <Button colorScheme='orange' size='sm' w={360}>
                    Chamados
                </Button>
                <Button colorScheme='orange' size='sm' w={360}>
                    Registrar Chamados
                </Button>
                <Button colorScheme='orange' size='sm' w={360}>
                    Gerenciar Tipos De Problema
                </Button>
                <Button colorScheme='orange' size='sm' w={360}>
                    Tutoriais
                </Button>
            </Stack>


        </div>

        </>
    );
}

export default lista_categoria