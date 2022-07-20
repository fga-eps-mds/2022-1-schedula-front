import { Heading, Box, Flex, Button, color } from '@chakra-ui/react';
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
        <div Background-color='#E5E5E5' style = {{margin: '55px'}}>
            <Flex 
                align="center" 
                justify="center" 
                style = {MenuHeadStyle}>
                <Heading width={210} height={51} margin = '0 auto' size='xl' textAlign='center'>
                    Schedula
                </Heading>
            </Flex>

        </div>

        
    );
}

export default lista_categoria